import { HabitRow } from "./HabitRow";
import { Panel } from "../ui/Panel";

export function DueHabitsPanel({ dueHabits, loading, onComplete }) {
  return (
    <Panel eyebrow="Today" title="Due habits" action={loading && <span className="loading-pill">Loading</span>}>
      <div className="habit-list">
        {dueHabits.length === 0 && <p className="empty-state">No habits are due right now.</p>}
        {dueHabits.map((habit) => (
          <HabitRow key={habit.id} habit={habit} onComplete={onComplete} />
        ))}
      </div>
    </Panel>
  );
}
