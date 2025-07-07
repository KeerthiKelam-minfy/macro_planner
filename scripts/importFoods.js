import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import csv from 'csv-parser';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import Food from '../models/Food.js';
import connectDB from "../config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectDB();

const results = [];

fs.createReadStream(path.join(__dirname, 'foods.csv'))
  .pipe(csv())
  .on('data', (data) => {
    results.push({
      name: data.name,
      serving_unit: data.serving_unit,
      calories_per_unit: parseFloat(data.calories_per_unit),
      protein_per_unit: parseFloat(data.protein_per_unit),
      carbs_per_unit: parseFloat(data.carbs_per_unit),
      fat_per_unit: parseFloat(data.fat_per_unit),
      is_veg: data.is_veg === 'true'
    });
  })
  .on('end', async () => {
    try {
      await Food.insertMany(results);
      console.log('✅ Food data imported successfully!');
    } catch (err) {
      console.error('❌ Error inserting data:', err);
    } finally {
      mongoose.connection.close();
    }
  });
