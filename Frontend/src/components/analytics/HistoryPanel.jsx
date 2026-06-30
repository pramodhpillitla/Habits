import { formatDate } from "../../utils/date";
import { Panel } from "../ui/Panel";
import { Activity } from "lucide-react";

export function HistoryPanel({ history }) {
  return (
    <Panel eyebrow="History" title="Recent logs">
      <div className="flex flex-col gap-3 mt-4">
        {history.slice(0, 8).map((log) => (
          <div key={log._id} className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Activity size={18} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-800 text-[15px] truncate">{log.habitId?.name || "Habit"}</h4>
              <time className="text-slate-500 text-xs font-semibold block">{formatDate(log.date)}</time>
            </div>
          </div>
        ))}
        {history.length === 0 && (
          <div className="text-center py-10 bg-slate-50 border border-slate-100 rounded-[24px] text-slate-500 font-medium">
            No completions yet. Time to get started!
          </div>
        )}
      </div>
    </Panel>
  );
}
