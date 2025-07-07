import Food from "../models/Food.js";
import DiaryEntry from "../models/diaryEntry.js";
import mongoose from "mongoose";

const searchFoods = async (req, res) => {
  try {
    const foods = await Food.find({
      name: { $regex: req.query.search || "", $options: "i" }
    }).limit(20);
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const logDiaryEntry = async (req, res) => {
  const { food, quantity, meal_type, log_date } = req.body;

  try {
    const entry = new DiaryEntry({
      user: req.user.id,
      food,
      quantity,
      meal_type,
      log_date
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// uses aggregation pipeline
const getDashboard = async (req, res) => {
  const date = new Date(req.query.date);
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  try {
    const dailyData = await DiaryEntry.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          log_date: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $lookup: {
          from: "foods",
          localField: "food",
          foreignField: "_id",
          as: "foodDetails"
        }
      },
      { $unwind: "$foodDetails" },
      {
        $group: {
          _id: "$user",
          total_calories: { $sum: { $multiply: ["$quantity", "$foodDetails.calories_per_unit"] } },
          total_protein: { $sum: { $multiply: ["$quantity", "$foodDetails.protein_per_unit"] } },
          total_carbs: { $sum: { $multiply: ["$quantity", "$foodDetails.carbs_per_unit"] } },
          total_fat: { $sum: { $multiply: ["$quantity", "$foodDetails.fat_per_unit"] } }
        }
      }
    ]);

    res.json(dailyData[0] || {});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export {searchFoods, logDiaryEntry, getDashboard}