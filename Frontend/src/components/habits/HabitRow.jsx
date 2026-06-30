import { formatDate } from "../../utils/date";

export function HabitRow({ habit, onComplete }) {
  return (
    <article className="habit-row">
      <div>
        <h3>{habit.name}</h3>
        <p>
          Every {habit.repeatInterval} day{habit.repeatInterval > 1 ? "s" : ""} - Last done{" "}
          {formatDate(habit.lastCompletedDate)}
        </p>
      </div>
      <button className="primary-action compact" onClick={() => onComplete(habit.id)}>
        Done
      </button>
    </article>
  );
}
