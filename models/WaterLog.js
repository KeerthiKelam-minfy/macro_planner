import mongoose from 'mongoose';

const WaterLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  log_date: { type: Date, default: Date.now }
});

export default mongoose.model('WaterLog', WaterLogSchema);
