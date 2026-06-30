import { CheckCircle2, Activity } from "lucide-react";
import { formatDate } from "../../utils/date";

export function HabitRow({ habit, onComplete }) {
  return (
    <article className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm transition-colors hover:border-blue-200">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
          <Activity size={20} strokeWidth={2.25} />
        </div>
        <div className="min-w-0">
          <h3 className="text-slate-800 font-semibold text-base truncate">{habit.name}</h3>
          <p className="text-slate-500 text-[13px] mt-0.5 truncate">
            Every {habit.repeatInterval} day{habit.repeatInterval > 1 ? "s" : ""} • Last: {formatDate(habit.lastCompletedDate)}
          </p>
        </div>
      </div>
      <button 
        onClick={() => onComplete(habit.id)}
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0 rounded-full text-slate-300 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        aria-label="Complete habit"
      >
        <CheckCircle2 size={26} strokeWidth={2} />
      </button>
    </article>
  );
}
