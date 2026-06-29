export const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const startOfDay = (value = new Date()) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const addDays = (value, days) => {
  const date = startOfDay(value);
  date.setDate(date.getDate() + Number(days));
  return date;
};

export const toDateKey = (value = new Date()) => startOfDay(value).toISOString().slice(0, 10);

export const daysBetween = (from, to) => {
  const start = startOfDay(from);
  const end = startOfDay(to);
  return Math.round((end - start) / MS_PER_DAY);
};

export const getPeriodRange = (period = "today", referenceDate = new Date()) => {
  const now = startOfDay(referenceDate);
  const start = new Date(now);
  const end = new Date(now);

  if (period === "week") {
    const day = start.getDay();
    const offset = day === 0 ? 6 : day - 1;
    start.setDate(start.getDate() - offset);
    end.setDate(start.getDate() + 6);
  } else if (period === "month") {
    start.setDate(1);
    end.setMonth(start.getMonth() + 1, 0);
  } else if (period === "year") {
    start.setMonth(0, 1);
    end.setFullYear(start.getFullYear(), 11, 31);
  }

  return { start, end };
};
