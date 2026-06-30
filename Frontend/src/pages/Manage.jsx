import { useEffect, useState, useMemo } from "react";
import { apiRequest } from "../utils/api";
import { ManageHabitsPanel } from "../components/habits/ManageHabitsPanel";

export function Manage({ token }) {
  const [habits, setHabits] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null);
  const headers = useMemo(() => ({ token }), [token]);

  const loadData = async () => {
    try {
      const data = await apiRequest("/habits", headers);
      setHabits(data.habits);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadData(); }, [headers]);

  const saveHabit = async (habit) => {
    try {
      const path = editingHabit ? `/habits/${editingHabit.id}` : "/habits";
      await apiRequest(path, { ...headers, method: editingHabit ? "PUT" : "POST", body: JSON.stringify(habit) });
      setEditingHabit(null);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteHabit = async (habitId) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
    try {
      await apiRequest(`/habits/${habitId}`, { ...headers, method: "DELETE" });
      loadData();
    } catch (err) {
      console.error(err);
      loadData();
    }
  };

  return (
    <div className="space-y-6 px-4 md:px-0 mt-4 md:mt-0">
      <div className="md:hidden text-center mb-6">
        <h2 className="text-white text-2xl font-bold">Manage Habits</h2>
      </div>
      <ManageHabitsPanel
        habits={habits}
        editingHabit={editingHabit}
        onSave={saveHabit}
        onCancelEdit={() => setEditingHabit(null)}
        onEdit={setEditingHabit}
        onDelete={deleteHabit}
      />
    </div>
  );
}
