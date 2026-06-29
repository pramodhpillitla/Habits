import express from "express";
import {
  completeHabit,
  createHabit,
  deleteHabit,
  listHabits,
  updateHabit,
} from "../controllers/habit.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.get("/", listHabits);
router.post("/", createHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.post("/:id/complete", completeHabit);

export default router;
