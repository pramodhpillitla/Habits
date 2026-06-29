import HabitLog from "../models/habitLog.model.js";
import { getCompletionStats, getConsistency, getStreaks, getSummary } from "../services/habit.service.js";

export const summary = async (req, res) => {
  const data = await getSummary(req.user._id);
  return res.json(data);
};

export const stats = async (req, res) => {
  const period = ["today", "week", "month", "year"].includes(req.query.period)
    ? req.query.period
    : "today";
  const data = await getCompletionStats(req.user._id, period);
  return res.json(data);
};

export const consistency = async (req, res) => {
  const days = Math.min(Math.max(Number(req.query.days) || 120, 30), 365);
  const data = await getConsistency(req.user._id, days);
  return res.json({ days: data });
};

export const streaks = async (req, res) => {
  const data = await getStreaks(req.user._id);
  return res.json(data);
};

export const history = async (req, res) => {
  const logs = await HabitLog.find({ userId: req.user._id, completed: true })
    .populate("habitId", "name repeatInterval")
    .sort({ date: -1 })
    .limit(200);

  return res.json({ logs });
};
