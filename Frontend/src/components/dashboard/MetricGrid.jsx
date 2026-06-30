import { MetricCard } from "../ui/MetricCard";

export function MetricGrid({ summary }) {
  const metrics = [
    ["Due today", summary?.dueToday ?? 0],
    ["Completed today", summary?.completedToday ?? 0],
    ["Current streak", summary?.currentStreak ?? 0],
    ["Highest streak", summary?.highestStreak ?? 0],
    ["Total habits", summary?.totalHabits ?? 0],
  ];

  return (
    <section className="metric-grid">
      {metrics.map(([label, value]) => (
        <MetricCard key={label} label={label} value={value} />
      ))}
    </section>
  );
}
