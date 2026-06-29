import express from "express";
import { consistency, history, stats, streaks, summary } from "../controllers/analytics.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.get("/summary", summary);
router.get("/stats", stats);
router.get("/consistency", consistency);
router.get("/streaks", streaks);
router.get("/history", history);

export default router;
