import { useState } from "react";
import { Plus } from "lucide-react";
import { HabitForm } from "./HabitForm";
import { ManageHabitRow } from "./ManageHabitRow";

export function ManageHabitsPanel({ habits, editingHabit, onSave, onCancelEdit, onEdit, onDelete }) {
  const [showForm, setShowForm] = useState(false);

  const handleSave = (data) => {
    onSave(data);
    setShowForm(false);
  };

  const isFormOpen = editingHabit || showForm;

  return (
    <div className="relative pb-24">
      {isFormOpen && (
        <div className="mb-6 bg-white p-6 rounded-[32px] shadow-sm shadow-slate-200/50 border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">{editingHabit ? "Edit Habit" : "New Habit"}</h3>
          <HabitForm
            key={editingHabit?.id || "new-habit"}
            editingHabit={editingHabit}
            onSubmit={handleSave}
            onCancel={() => {
              onCancelEdit();
              setShowForm(false);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {habits.map((habit) => (
          <ManageHabitRow key={habit.id} habit={habit} onEdit={onEdit} onDelete={onDelete} />
        ))}
        {habits.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No habits yet. Tap + to create one!
          </div>
        )}
      </div>

      {!isFormOpen && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed md:absolute bottom-24 md:bottom-0 right-6 md:right-0 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] shadow-lg shadow-blue-600/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-40"
          aria-label="Add new habit"
        >
          <Plus size={32} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
