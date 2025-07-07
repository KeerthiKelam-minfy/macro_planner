import express from "express";
import { logWater, getWaterForDate, logWeight, getWeightForDate } from "../controllers/extraLogsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Water endpoints
router.post("/water", authMiddleware, logWater);
router.get("/water", authMiddleware, getWaterForDate);

// Weight endpoints
router.post("/weight", authMiddleware, logWeight);
router.get("/weight", authMiddleware, getWeightForDate);

export default router;
