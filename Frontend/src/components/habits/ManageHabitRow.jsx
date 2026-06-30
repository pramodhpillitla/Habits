import { Activity, Edit2, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/date";

export function ManageHabitRow({ habit, onEdit, onDelete }) {
  return (
    <article className="flex items-center justify-between p-4 bg-white rounded-[24px] shadow-sm shadow-slate-200/50 border border-slate-100">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 shrink-0">
          <Activity size={24} strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <h3 className="text-slate-800 font-bold text-[17px] truncate">{habit.name}</h3>
          <p className="text-slate-500 text-sm mt-0.5 truncate">
            {habit.status} • next: {formatDate(habit.nextDueDate)}
          </p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button 
          onClick={() => onEdit(habit)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          aria-label="Edit"
        >
          <Edit2 size={18} strokeWidth={2.5} />
        </button>
        <button 
          onClick={() => onDelete(habit.id)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          aria-label="Delete"
        >
          <Trash2 size={18} strokeWidth={2.5} />
        </button>
      </div>
    </article>
  );
}
