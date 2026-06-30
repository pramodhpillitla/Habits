import { formatDate } from "../../utils/date";

export function ManageHabitRow({ habit, onEdit, onDelete }) {
  return (
    <article className="manage-row">
      <div>
        <h3>{habit.name}</h3>
        <p>
          {habit.status} - next due {formatDate(habit.nextDueDate)}
        </p>
      </div>
      <div className="row-actions">
        <button className="ghost-action compact" onClick={() => onEdit(habit)}>
          Edit
        </button>
        <button className="danger-action compact" onClick={() => onDelete(habit.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
