import { HabitForm } from "./HabitForm";
import { ManageHabitRow } from "./ManageHabitRow";
import { Panel } from "../ui/Panel";

export function ManageHabitsPanel({ habits, editingHabit, onSave, onCancelEdit, onEdit, onDelete }) {
  return (
    <Panel eyebrow="All Habits" title="Manage schedule">
      <HabitForm
        key={editingHabit?.id || "new-habit"}
        editingHabit={editingHabit}
        onSubmit={onSave}
        onCancel={onCancelEdit}
      />
      <div className="manage-list">
        {habits.map((habit) => (
          <ManageHabitRow key={habit.id} habit={habit} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </Panel>
  );
}
