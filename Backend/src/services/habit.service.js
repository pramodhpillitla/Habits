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

const getBulkAnalytics = async (userId, start, end) => {
  const habits = await Habit.find({ userId }).select("_id repeatInterval createdAt deletedAt");
  const logs = await HabitLog.find({ 
    userId, 
    completed: true, 
    date: { $lte: end } 
  }).sort({ date: 1 }).select("habitId date");

  const completionsByHabit = new Map();
  logs.forEach(log => {
    const key = String(log.habitId);
    if (!completionsByHabit.has(key)) completionsByHabit.set(key, []);
    completionsByHabit.get(key).push(startOfDay(log.date).getTime());
  });

  const results = new Map();
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dayTime = startOfDay(d).getTime();
    let dueCount = 0;
    let completedCount = 0;

    habits.forEach(habit => {
      const createdTime = startOfDay(habit.createdAt).getTime();
      if (createdTime > dayTime) return;

      if (habit.deletedAt) {
        const deletedTime = startOfDay(habit.deletedAt).getTime();
        if (dayTime > deletedTime) return;
      }

      const completions = completionsByHabit.get(String(habit._id)) || [];
      
      let lastCompletionBefore = null;
      let completedToday = false;

      for (let i = 0; i < completions.length; i++) {
        const cTime = completions[i];
        if (cTime < dayTime) {
          lastCompletionBefore = cTime;
        } else if (cTime === dayTime) {
          completedToday = true;
        }
      }

      let isDue = false;
      if (lastCompletionBefore === null) {
        isDue = true;
      } else {
        const nextDueTime = addDays(new Date(lastCompletionBefore), habit.repeatInterval).getTime();
        if (nextDueTime <= dayTime) isDue = true;
      }

      if (isDue) {
        dueCount++;
        if (completedToday) completedCount++;
      }
    });

    results.set(toDateKey(d), { dueCount, completedCount, dateStr: toDateKey(d) });
  }

  return results;
};

export const getCompletionStats = async (userId, period = "today") => {
  const { start, end } = getPeriodRange(period);
  const todayTime = startOfDay().getTime();

  const bulkData = await getBulkAnalytics(userId, start, end);
  
  let potentialTotalDue = 0;
  let completed = 0;
  let missed = 0;

  for (const data of bulkData.values()) {
    potentialTotalDue += data.dueCount;
    completed += data.completedCount;
    
    const dayTime = new Date(data.dateStr).getTime();
    if (dayTime < todayTime) {
      missed += Math.max(data.dueCount - data.completedCount, 0);
    }
  }

  const completionPercentage = potentialTotalDue === 0 ? 0 : Math.round((completed / potentialTotalDue) * 100);

  return { period, totalDue: potentialTotalDue, completed, missed, completionPercentage };
};

export const getConsistency = async (userId, days = 120) => {
  const today = startOfDay();
  const start = addDays(today, -(days - 1));
  const bulkData = await getBulkAnalytics(userId, start, today);

  const chart = [];
  for (let date = new Date(start); date <= today; date.setDate(date.getDate() + 1)) {
    const key = toDateKey(date);
    const data = bulkData.get(key) || { dueCount: 0, completedCount: 0 };
    const level = data.dueCount === 0 ? 0 : Math.min(4, Math.ceil((data.completedCount / data.dueCount) * 4));
    chart.push({ date: key, dueCount: data.dueCount, completed: data.completedCount, level });
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
    if (day.dueCount === 0) continue;
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
