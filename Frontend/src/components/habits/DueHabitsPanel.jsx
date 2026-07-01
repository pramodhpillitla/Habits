import { HabitRow } from "./HabitRow";
import { Panel } from "../ui/Panel";

export function DueHabitsPanel({ dueHabits, loading, onComplete }) {
  if (loading) {
    return (
      <Panel eyebrow="Today" title="Due habits">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-slate-200/50 h-24 w-full rounded-2xl"></div>
          ))}
        </div>
      </Panel>
    );
  }

  return (
    <Panel eyebrow="Today" title="Due habits">
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
