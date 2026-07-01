import express from "express";
import { z } from "zod";
import {
  completeHabit,
  createHabit,
  deleteHabit,
  listHabits,
  updateHabit,
} from "../controllers/habit.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

const habitSchema = z.object({
  name: z.string().trim().min(1, "Habit name is required"),
  repeatInterval: z.coerce.number().int().min(1).max(365, "Repeat interval must be from 1 to 365"),
});

router.use(protect);
router.get("/", listHabits);
router.post("/", validate(habitSchema), createHabit);
router.put("/:id", validate(habitSchema), updateHabit);
router.delete("/:id", deleteHabit);
router.post("/:id/complete", completeHabit);

export default router;
