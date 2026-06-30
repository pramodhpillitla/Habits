export function StatsList({ stats }) {
  return (
    <dl className="stats-list">
      <div>
        <dt>Total due</dt>
        <dd>{stats?.totalDue || 0}</dd>
      </div>
      <div>
        <dt>Completed</dt>
        <dd>{stats?.completed || 0}</dd>
      </div>
      <div>
        <dt>Missed</dt>
        <dd>{stats?.missed || 0}</dd>
      </div>
    </dl>
  );
}
