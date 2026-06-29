import Habit from "../models/habit.model.js";
import HabitLog from "../models/habitLog.model.js";
import { getHabitsWithStatus } from "../services/habit.service.js";
import { startOfDay } from "../utils/date.js";

const validateHabitInput = ({ name, repeatInterval }) => {
  if (!name?.trim()) {
    return "Habit name is required";
  }

  const interval = Number(repeatInterval);
  if (!Number.isInteger(interval) || interval < 1 || interval > 365) {
    return "Repeat interval must be a whole number from 1 to 365";
  }

  return null;
};

export const listHabits = async (req, res) => {
  const dueOnly = req.query.due === "true";
  const habits = await getHabitsWithStatus(req.user._id, { dueOnly });
  return res.json({ habits });
};

export const createHabit = async (req, res) => {
  const error = validateHabitInput(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const habit = await Habit.create({
    userId: req.user._id,
    name: req.body.name.trim(),
    repeatInterval: Number(req.body.repeatInterval),
  });

  const habits = await getHabitsWithStatus(req.user._id);
  const habitWithStatus = habits.find((item) => String(item.id) === String(habit._id));
  return res.status(201).json({ habit: habitWithStatus ?? habit });
};

export const updateHabit = async (req, res) => {
  const error = validateHabitInput(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id, deletedAt: null },
    {
      name: req.body.name.trim(),
      repeatInterval: Number(req.body.repeatInterval),
    },
    { new: true }
  );

  if (!habit) {
    return res.status(404).json({ message: "Habit not found" });
  }

  const habits = await getHabitsWithStatus(req.user._id);
  return res.json({ habit: habits.find((item) => String(item.id) === String(habit._id)) });
};

export const deleteHabit = async (req, res) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id, deletedAt: null },
    { deletedAt: new Date() },
    { new: true }
  );

  if (!habit) {
    return res.status(404).json({ message: "Habit not found" });
  }

  return res.json({ message: "Habit deleted" });
};

export const completeHabit = async (req, res) => {
  const habit = await Habit.findOne({ _id: req.params.id, userId: req.user._id, deletedAt: null });
  if (!habit) {
    return res.status(404).json({ message: "Habit not found" });
  }

  try {
    const log = await HabitLog.create({
      userId: req.user._id,
      habitId: habit._id,
      date: startOfDay(),
      completed: true,
    });

    return res.status(201).json({ log });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This habit is already completed today" });
    }

    throw error;
  }
};
