export function ContributionGrid({ days }) {
  return (
    <div className="contribution-grid" aria-label="Consistency chart">
      {days.map((day) => (
        <span
          key={day.date}
          className={`day-cell level-${day.level}`}
          title={`${day.date}: ${day.completed}/${day.dueCount} completed`}
        />
      ))}
    </div>
  );
}
