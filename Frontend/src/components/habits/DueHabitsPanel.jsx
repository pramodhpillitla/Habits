import { HabitRow } from "./HabitRow";
import { Panel } from "../ui/Panel";

export function DueHabitsPanel({ dueHabits, loading, onComplete }) {
  return (
    <Panel eyebrow="Today" title="Due habits" action={loading && <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">Loading</span>}>
      <div className="space-y-4">
        {dueHabits.length === 0 && (
          <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-center text-slate-500 font-medium">
            No habits are due right now. Awesome!
          </div>
        )}
        {dueHabits.map((habit) => (
          <HabitRow key={habit.id} habit={habit} onComplete={onComplete} />
        ))}
      </div>
    </Panel>
  );
}
