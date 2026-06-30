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
    <div className="space-y-8 px-4 md:px-0 mt-4 md:mt-0">
      {/* Date Header for Mobile */}
      <div className="md:hidden text-center mb-6">
        <p className="text-blue-100 text-sm font-medium">Today</p>
        <h2 className="text-white text-3xl font-bold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</h2>
      </div>

      <MetricGrid summary={summary} />
      
      <div className="mt-8">
        <DueHabitsPanel dueHabits={dueHabits} loading={loading} onComplete={completeHabit} />
      </div>
    </div>
  );
}
