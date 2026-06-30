import { useState } from "react";

export function HabitForm({ editingHabit, onSubmit, onCancel }) {
  const [name, setName] = useState(editingHabit?.name || "");
  const [repeatInterval, setRepeatInterval] = useState(editingHabit?.repeatInterval || 1);

  const submit = (event) => {
    event.preventDefault();
    onSubmit({ name, repeatInterval: Number(repeatInterval) });
    setName("");
    setRepeatInterval(1);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <label className="flex flex-col gap-2 text-slate-700 font-bold text-sm">
        Habit Name
        <input 
          required 
          value={name} 
          onChange={(event) => setName(event.target.value)} 
          placeholder="Drink water"
          className="w-full min-h-[48px] px-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-normal"
        />
      </label>
      <label className="flex flex-col gap-2 text-slate-700 font-bold text-sm">
        Repeat Every
        <div className="flex items-center gap-3">
          <input
            required
            type="number"
            min="1"
            max="365"
            value={repeatInterval}
            onChange={(event) => setRepeatInterval(event.target.value)}
            className="w-24 min-h-[48px] px-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-normal text-center"
          />
          <span className="text-slate-500 font-semibold">days</span>
        </div>
      </label>
      <div className="flex gap-3 pt-2">
        <button className="flex-1 min-h-[48px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-colors">
          {editingHabit ? "Update" : "Create"}
        </button>
        {editingHabit && (
          <button type="button" className="flex-1 min-h-[48px] bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
