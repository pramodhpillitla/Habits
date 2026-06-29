import Habit from "../models/habit.model.js";
import HabitLog from "../models/habitLog.model.js";
import { addDays, getPeriodRange, startOfDay, toDateKey } from "../utils/date.js";

export const sanitizeHabit = (habit, lastLog = null, today = new Date()) => {
  const lastCompletedDate = lastLog?.date ? startOfDay(lastLog.date) : null;
  const nextDueDate = lastCompletedDate
    ? addDays(lastCompletedDate, habit.repeatInterval)
    : startOfDay(habit.createdAt);
  const due = startOfDay(today) >= nextDueDate;

  return {
    id: habit._id,
    name: habit.name,
    repeatInterval: habit.repeatInterval,
    status: due ? "due" : "waiting",
    lastCompletedDate,
    nextDueDate,
    createdAt: habit.createdAt,
    updatedAt: habit.updatedAt,
  };
};

export const getHabitsWithStatus = async (userId, { dueOnly = false } = {}) => {
  const habits = await Habit.find({ userId, deletedAt: null }).sort({ createdAt: 1 });
  const logs = await HabitLog.aggregate([
    { $match: { userId, completed: true } },
    { $sort: { date: -1 } },
    { $group: { _id: "$habitId", date: { $first: "$date" } } },
  ]);

  const lastByHabit = new Map(logs.map((log) => [String(log._id), { date: log.date }]));
  const items = habits.map((habit) => sanitizeHabit(habit, lastByHabit.get(String(habit._id))));

  return dueOnly ? items.filter((habit) => habit.status === "due") : items;
};

export const getDueHabitIdsForDate = async (userId, date = new Date()) => {
  const day = startOfDay(date);
  const habits = await Habit.find({
    userId,
    deletedAt: null,
    createdAt: { $lte: day },
  }).select("_id repeatInterval createdAt");

  const logs = await HabitLog.find({
    userId,
    completed: true,
    date: { $lte: day },
  })
    .sort({ date: 1 })
    .select("habitId date");

  const datesByHabit = new Map();
  logs.forEach((log) => {
    const key = String(log.habitId);
    const list = datesByHabit.get(key) || [];
    list.push(startOfDay(log.date));
    datesByHabit.set(key, list);
  });

  return habits
    .filter((habit) => {
      const completions = datesByHabit.get(String(habit._id)) || [];
      if (completions.length === 0) {
        return startOfDay(habit.createdAt) <= day;
      }

      const lastCompletion = completions[completions.length - 1];
      return addDays(lastCompletion, habit.repeatInterval) <= day;
    })
    .map((habit) => habit._id);
};

export const getCompletionStats = async (userId, period = "today") => {
  const { start, end } = getPeriodRange(period);
  const completedLogs = await HabitLog.find({
    userId,
    completed: true,
    date: { $gte: start, $lte: end },
  }).select("habitId date");

  let totalDue = 0;
  const completedDueKeys = new Set();
  const completedKeys = new Set(completedLogs.map((log) => `${toDateKey(log.date)}:${log.habitId}`));

  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const dueHabitIds = await getDueHabitIdsForDate(userId, date);
    totalDue += dueHabitIds.length;
    dueHabitIds.forEach((habitId) => {
      const key = `${toDateKey(date)}:${habitId}`;
      if (completedKeys.has(key)) {
        completedDueKeys.add(key);
      }
    });
  }

  const completed = completedDueKeys.size;
  const missed = Math.max(totalDue - completed, 0);
  const completionPercentage = totalDue === 0 ? 0 : Math.round((completed / totalDue) * 100);

  return { period, totalDue, completed, missed, completionPercentage };
};

export const getConsistency = async (userId, days = 120) => {
  const today = startOfDay();
  const start = addDays(today, -(days - 1));
  const logs = await HabitLog.find({
    userId,
    completed: true,
    date: { $gte: start, $lte: today },
  }).select("date habitId");

  const completedByDate = new Map();
  logs.forEach((log) => {
    const key = toDateKey(log.date);
    completedByDate.set(key, (completedByDate.get(key) || 0) + 1);
  });

  const chart = [];
  for (let date = new Date(start); date <= today; date.setDate(date.getDate() + 1)) {
    const key = toDateKey(date);
    const dueCount = (await getDueHabitIdsForDate(userId, date)).length;
    const completed = completedByDate.get(key) || 0;
    const level = dueCount === 0 ? 0 : Math.min(4, Math.ceil((completed / dueCount) * 4));
    chart.push({ date: key, dueCount, completed, level });
  }

  return chart;
};

export const getStreaks = async (userId) => {
  const consistency = await getConsistency(userId, 365);
  let currentStreak = 0;
  let highestStreak = 0;
  let running = 0;

  consistency.forEach((day) => {
    const successful = day.dueCount > 0 && day.completed >= day.dueCount;
    if (successful) {
      running += 1;
      highestStreak = Math.max(highestStreak, running);
    } else if (day.dueCount > 0) {
      running = 0;
    }
  });

  for (let index = consistency.length - 1; index >= 0; index -= 1) {
    const day = consistency[index];
    if (day.dueCount === 0) {
      continue;
    }
    if (day.completed >= day.dueCount) {
      currentStreak += 1;
      continue;
    }
    break;
  }

  return { currentStreak, highestStreak };
};

export const getSummary = async (userId) => {
  const [allHabits, dueHabits, todayStats, streaks] = await Promise.all([
    Habit.countDocuments({ userId, deletedAt: null }),
    getHabitsWithStatus(userId, { dueOnly: true }),
    getCompletionStats(userId, "today"),
    getStreaks(userId),
  ]);

  return {
    totalHabits: allHabits,
    dueToday: dueHabits.length,
    completedToday: todayStats.completed,
    ...streaks,
  };
};
