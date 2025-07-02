import express from "express";
const router = express.Router();
import auth from "../middleware/authMiddleware.js";
import { searchFoods, logDiaryEntry, getDashboard } from "../controllers/dairyController.js";


router.get("/foods", auth, searchFoods);
router.post("/diary", auth, logDiaryEntry);
router.get("/dashboard", auth, getDashboard);

export default router;
