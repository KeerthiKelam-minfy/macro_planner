import mongoose from "mongoose";

const weightLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  log_date: {
    type: Date,
    required: true
  }
});

export default mongoose.model("WeightLog", weightLogSchema);
