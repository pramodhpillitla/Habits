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
    <form className="habit-form" onSubmit={submit}>
      <label>
        Habit
        <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Drink water" />
      </label>
      <label>
        Every
        <div className="interval-input">
          <input
            required
            type="number"
            min="1"
            max="365"
            value={repeatInterval}
            onChange={(event) => setRepeatInterval(event.target.value)}
          />
          <span>days</span>
        </div>
      </label>
      <div className="form-actions">
        <button className="primary-action">{editingHabit ? "Update" : "Add"}</button>
        {editingHabit && (
          <button type="button" className="ghost-action" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
