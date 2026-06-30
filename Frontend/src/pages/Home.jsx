import { useEffect, useState, useMemo } from "react";
import { apiRequest } from "../utils/api";
import { DueHabitsPanel } from "../components/habits/DueHabitsPanel";
import { MetricGrid } from "../components/dashboard/MetricGrid";

export function Home({ token }) {
  const [dueHabits, setDueHabits] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const headers = useMemo(() => ({ token }), [token]);

  const loadData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const [due, summaryData] = await Promise.all([
        apiRequest("/habits?due=true", headers),
        apiRequest("/analytics/summary", headers)
      ]);
      setDueHabits(due.habits);
      setSummary(summaryData);
    } catch (err) {
      console.error(err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [headers]);

  const completeHabit = async (habitId) => {
    setDueHabits((prev) => prev.filter((h) => h.id !== habitId));
    try {
      await apiRequest(`/habits/${habitId}/complete`, { ...headers, method: "POST" });
      loadData(false);
    } catch (err) {
      console.error(err);
      loadData(false);
    }
  };

  return (
    <div className="flex flex-col h-full flex-1 w-full max-w-3xl mx-auto">
      {/* Date Header matching the Behance App style */}
      <div className="px-6 md:px-0 mb-8 mt-2 md:mt-4 shrink-0 relative h-32 md:h-40 flex items-center">
        <div className="z-10 relative w-[55%] flex flex-col items-start">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
            {new Date().toLocaleDateString('en-US', { day: 'numeric' })}
          </h2>
          <p className="text-blue-100 text-base md:text-lg font-medium tracking-wide ml-0.5 mt-0.5 drop-shadow">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <div className="mt-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl inline-flex items-center gap-2 shadow-sm border border-white/10">
            <span className="text-white font-bold text-base leading-none">{dueHabits.length}</span>
            <span className="text-blue-100 text-[10px] md:text-xs uppercase tracking-wider font-bold leading-none">Due</span>
          </div>
        </div>
        
        <div className="absolute right-0 bottom-[-16px] w-[50%] md:w-[45%] h-[130%] flex justify-end items-end pointer-events-none z-0">
          <img 
            src="/bg-image.jpg" 
            alt="Dashboard Illustration" 
            className="w-full h-full object-contain mix-blend-multiply opacity-95"
          />
        </div>
      </div>
      
      {/* Immersive white rounded panel taking up the rest of the height */}
      <div className="flex-1 bg-[#f8fafc] rounded-t-[40px] md:rounded-t-[48px] pt-8 md:pt-10 px-5 md:px-10 pb-24 md:pb-10 relative">
        <div className="mb-6 md:mb-8">
          <MetricGrid summary={summary} />
        </div>
        <DueHabitsPanel dueHabits={dueHabits} loading={loading} onComplete={completeHabit} />
      </div>
    </div>
  );
}
