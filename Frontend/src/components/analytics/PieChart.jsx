export function PieChart({ stats }) {
  const percent = stats?.completionPercentage || 0;

  return (
    <div className="pie-wrap">
      <div className="pie-chart" style={{ "--percent": `${percent}%` }}>
        <span>{percent}%</span>
      </div>
      <div className="pie-legend">
        <span>
          <i className="dot complete" /> Completed {stats?.completed || 0}
        </span>
        <span>
          <i className="dot missed" /> Remaining {stats?.missed || 0}
        </span>
      </div>
    </div>
  );
}
