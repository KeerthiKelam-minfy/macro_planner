import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js"
import profileRoute from './routes/profileRoutes.js'
import diaryRoute from './routes/dairyRoutes.js'
import extraLogsRoutes from "./routes/extraLogsRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api", diaryRoute)
app.use("/api/logs", extraLogsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
