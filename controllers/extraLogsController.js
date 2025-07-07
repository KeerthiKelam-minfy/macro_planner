import WaterLog from "../models/WaterLog.js";
import WeightLog from "../models/WeightLog.js";

// Log water intake
const logWater = async (req, res) => {
  const { amount, log_date } = req.body;

  try {
    const entry = new WaterLog({
      user: req.user.id,
      amount,
      log_date
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Log weight
const logWeight = async (req, res) => {
  const { weight, log_date } = req.body;

  try {
    const entry = new WeightLog({
      user: req.user.id,
      weight,
      log_date
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get water log for a specific day
const getWaterForDate = async (req, res) => {
  const date = new Date(req.query.date);
  const start = new Date(date.setHours(0, 0, 0, 0));
  const end = new Date(date.setHours(23, 59, 59, 999));

  try {
    const data = await WaterLog.find({
      user: req.user.id,
      log_date: { $gte: start, $lte: end }
    });

    const total = data.reduce((sum, item) => sum + item.amount, 0);
    res.json({ total_water: total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get weight log for a specific day
const getWeightForDate = async (req, res) => {
  const date = new Date(req.query.date);
  const start = new Date(date.setHours(0, 0, 0, 0));
  const end = new Date(date.setHours(23, 59, 59, 999));

  try {
    const latest = await WeightLog.findOne({
      user: req.user.id,
      log_date: { $gte: start, $lte: end }
    }).sort({ log_date: -1 });

    res.json({ weight: latest?.weight || null });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { logWater, getWaterForDate, logWeight, getWeightForDate };
