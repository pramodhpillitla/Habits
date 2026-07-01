import { MetricCard } from "../ui/MetricCard";

export function MetricGrid({ summary }) {
  if (!summary) {
    return (
      <section className="grid grid-cols-2 gap-3 md:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse bg-slate-200/50 h-28 w-full rounded-[24px]"></div>
        ))}
      </section>
    );
  }

  const metrics = [
    { label: "Due Today", value: summary?.dueToday ?? 0, color: "blue" },
    { label: "Completed", value: summary?.completedToday ?? 0, color: "green" },
    { label: "Current Streak", value: summary?.currentStreak ?? 0, color: "orange" },
    { label: "Highest Streak", value: summary?.highestStreak ?? 0, color: "purple" },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:gap-4">
      {metrics.map((m) => (
        <MetricCard key={m.label} label={m.label} value={m.value} color={m.color} />
      ))}
    </section>
  );
}
