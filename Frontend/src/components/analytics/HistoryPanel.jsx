import { formatDate } from "../../utils/date";
import { Panel } from "../ui/Panel";

export function HistoryPanel({ history }) {
  return (
    <Panel eyebrow="History" title="Recent logs">
      <div className="history-list">
        {history.slice(0, 8).map((log) => (
          <div key={log._id}>
            <span>{log.habitId?.name || "Habit"}</span>
            <time>{formatDate(log.date)}</time>
          </div>
        ))}
        {history.length === 0 && <p className="empty-state">No completions yet.</p>}
      </div>
    </Panel>
  );
}
