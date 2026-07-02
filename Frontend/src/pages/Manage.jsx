import { useEffect, useState, useMemo } from "react";
import { apiRequest } from "../utils/api";
import { ManageHabitsPanel } from "../components/habits/ManageHabitsPanel";
import toast from "react-hot-toast";

export function Manage() {
  const [habits, setHabits] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null);
  const [habitToDelete, setHabitToDelete] = useState(null);

  const loadData = async () => {
    try {
      const data = await apiRequest("/habits");
      setHabits(data.habits);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load habits");
    }
  };

  useEffect(() => { loadData(); }, []);

  const saveHabit = async (habit) => {
    try {
      const path = editingHabit ? `/habits/${editingHabit.id}` : "/habits";
      await apiRequest(path, { method: editingHabit ? "PUT" : "POST", body: JSON.stringify(habit) });
      setEditingHabit(null);
      loadData();
      toast.success(editingHabit ? "Habit updated!" : "Habit created!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to save habit");
    }
  };

  const requestDelete = (habitId) => {
    setHabitToDelete(habitId);
  };

  const confirmDelete = async () => {
    if (!habitToDelete) return;
    const habitId = habitToDelete;
    setHabitToDelete(null);
    
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
    try {
      await apiRequest(`/habits/${habitId}`, { method: "DELETE" });
      loadData();
      toast.success("Habit deleted!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete habit");
      loadData();
    }
  };

  return (
    <div className="flex flex-col h-full flex-1 w-full max-w-3xl mx-auto">
      {/* Header matching the Behance App style */}
      <div className="px-6 md:px-0 mb-8 mt-2 md:mt-4 shrink-0 relative h-28 md:h-36 flex items-center">
        <div className="z-10 relative w-[55%]">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
            Manage
          </h2>
          <p className="text-blue-100 text-sm md:text-base font-medium tracking-wide ml-0.5 mt-0.5 drop-shadow">
            Customize your routines
          </p>
        </div>
        
        <div className="absolute right-0 bottom-[-16px] w-[50%] md:w-[45%] h-[140%] flex justify-end items-end pointer-events-none">
          <img 
            src="/bg-manage.png" 
            alt="Manage Illustration" 
            className="w-full h-full object-contain mix-blend-multiply opacity-95"
          />
        </div>
      </div>

      {/* Immersive white rounded panel taking up the rest of the height */}
      <div className="flex-1 bg-[#f8fafc] rounded-t-[40px] md:rounded-t-[48px] pt-8 md:pt-10 px-5 md:px-10 pb-24 md:pb-10 relative">
        <ManageHabitsPanel
          habits={habits}
          editingHabit={editingHabit}
          onSave={saveHabit}
          onCancelEdit={() => setEditingHabit(null)}
          onEdit={setEditingHabit}
          onDelete={requestDelete}
        />
      </div>

      {habitToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl shadow-slate-900/10 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Habit</h3>
            <p className="text-slate-500 mb-6 font-medium">Are you sure you want to delete this habit? This action cannot be undone.</p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setHabitToDelete(null)}
                className="flex-1 min-h-[48px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 min-h-[48px] bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all active:scale-[0.98]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
