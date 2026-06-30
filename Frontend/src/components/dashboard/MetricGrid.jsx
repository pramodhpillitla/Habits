import { MetricCard } from "../ui/MetricCard";

export function MetricGrid({ summary }) {
  const metrics = [
    { label: "Due Today", value: summary?.dueToday ?? 0, color: "blue" },
    { label: "Completed", value: summary?.completedToday ?? 0, color: "green" },
    { label: "Current Streak", value: summary?.currentStreak ?? 0, color: "orange" },
    { label: "Highest Streak", value: summary?.highestStreak ?? 0, color: "purple" },
  ];

  return (
    <section className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
      {metrics.map((m) => (
        <div key={m.label} className="snap-start shrink-0 w-[140px] md:w-[160px]">
          <MetricCard label={m.label} value={m.value} color={m.color} />
        </div>
      ))}
    </section>
  );
}
