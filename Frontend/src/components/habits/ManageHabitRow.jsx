import { Activity, Edit2, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/date";

export function ManageHabitRow({ habit, onEdit, onDelete }) {
  return (
    <article className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm transition-colors hover:border-blue-200">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0">
          <Activity size={20} strokeWidth={2.25} />
        </div>
        <div className="min-w-0">
          <h3 className="text-slate-800 font-semibold text-base truncate">{habit.name}</h3>
          <p className="text-slate-500 text-[13px] mt-0.5 truncate">
            {habit.status} • next: {formatDate(habit.nextDueDate)}
          </p>
        </div>
      </div>
      <div className="flex gap-1.5 md:gap-2 shrink-0">
        <button 
          onClick={() => onEdit(habit)}
          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          aria-label="Edit"
        >
          <Edit2 size={18} strokeWidth={2} />
        </button>
        <button 
          onClick={() => onDelete(habit.id)}
          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          aria-label="Delete"
        >
          <Trash2 size={18} strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}
