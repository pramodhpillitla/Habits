import { CheckCircle2, Activity } from "lucide-react";
import { formatDate } from "../../utils/date";

export function HabitRow({ habit, onComplete }) {
  return (
    <article className="flex items-center justify-between p-4 bg-white rounded-[24px] shadow-sm shadow-slate-200/50 border border-slate-100 transition-transform active:scale-[0.98]">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 shrink-0">
          <Activity size={24} strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <h3 className="text-slate-800 font-bold text-[17px] truncate">{habit.name}</h3>
          <p className="text-slate-500 text-sm mt-0.5 truncate">
            Every {habit.repeatInterval} day{habit.repeatInterval > 1 ? "s" : ""} • Last: {formatDate(habit.lastCompletedDate)}
          </p>
        </div>
      </div>
      <button 
        onClick={() => onComplete(habit.id)}
        className="w-12 h-12 flex items-center justify-center shrink-0 rounded-full border-2 border-slate-100 text-slate-300 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 transition-colors"
        aria-label="Complete habit"
      >
        <CheckCircle2 size={26} strokeWidth={2.5} />
      </button>
    </article>
  );
}
