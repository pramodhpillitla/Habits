import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../../utils/api";
import { AnalyticsPanel } from "../analytics/AnalyticsPanel";
import { ConsistencyPanel } from "../analytics/ConsistencyPanel";
import { HistoryPanel } from "../analytics/HistoryPanel";
import { DueHabitsPanel } from "../habits/DueHabitsPanel";
import { ManageHabitsPanel } from "../habits/ManageHabitsPanel";
import { DashboardHeader } from "./DashboardHeader";
import { MetricGrid } from "./MetricGrid";

export function Dashboard({ user, token, onLogout }) {
  const [habits, setHabits] = useState([]);
  const [dueHabits, setDueHabits] = useState([]);
  const [summary, setSummary] = useState(null);
  const [consistency, setConsistency] = useState([]);
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [period, setPeriod] = useState("today");
  const [editingHabit, setEditingHabit] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const headers = useMemo(() => ({ token }), [token]);

  const loadDashboard = useCallback(
    async (selectedPeriod = period, showLoading = true) => {
      if (showLoading) setLoading(true);
      try {
        const [allHabits, due, summaryData, consistencyData, statsData, historyData] = await Promise.all([
          apiRequest("/habits", headers),
          apiRequest("/habits?due=true", headers),
          apiRequest("/analytics/summary", headers),
          apiRequest("/analytics/consistency?days=120", headers),
          apiRequest(`/analytics/stats?period=${selectedPeriod}`, headers),
          apiRequest("/analytics/history", headers),
        ]);

        setHabits(allHabits.habits);
        setDueHabits(due.habits);
        setSummary(summaryData);
        setConsistency(consistencyData.days);
        setStats(statsData);
        setHistory(historyData.logs);
      } catch (err) {
        setMessage(err.message);
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [headers, period]
  );

  useEffect(() => {
    Promise.resolve().then(() => loadDashboard(period));
  }, [loadDashboard, period]);

  const saveHabit = async (habit) => {
    try {
      const path = editingHabit ? `/habits/${editingHabit.id}` : "/habits";
      await apiRequest(path, {
        ...headers,
        method: editingHabit ? "PUT" : "POST",
        body: JSON.stringify(habit),
      });
      setEditingHabit(null);
      setMessage("");
      loadDashboard(period, false);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const completeHabit = async (habitId) => {
    setDueHabits((prev) => prev.filter((h) => h.id !== habitId));
    setMessage("Nice. That habit is logged for today.");
    
    try {
      await apiRequest(`/habits/${habitId}/complete`, {
        ...headers,
        method: "POST",
      });
      loadDashboard(period, false);
    } catch (err) {
      setMessage(err.message);
      loadDashboard(period, false);
    }
  };

  const deleteHabit = async (habitId) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
    setDueHabits((prev) => prev.filter((h) => h.id !== habitId));
    
    try {
      await apiRequest(`/habits/${habitId}`, {
        ...headers,
        method: "DELETE",
      });
      loadDashboard(period, false);
    } catch (err) {
      setMessage(err.message);
      loadDashboard(period, false);
    }
  };

  const changePeriod = async (nextPeriod) => {
    setPeriod(nextPeriod);
    try {
      setStats(await apiRequest(`/analytics/stats?period=${nextPeriod}`, headers));
    } catch (err) {
      setMessage(err.message);
    }
  };

  const logout = async () => {
    await apiRequest("/auth/logout", { ...headers, method: "POST" }).catch(() => {});
    localStorage.removeItem("habit_token");
    onLogout();
  };

  return (
    <main className="app-shell">
      <DashboardHeader user={user} onLogout={logout} />
      {message && <div className="notice">{message}</div>}

      <MetricGrid summary={summary} />

      <section className="workspace">
        <div className="main-column">
          <DueHabitsPanel dueHabits={dueHabits} loading={loading} onComplete={completeHabit} />
          <ManageHabitsPanel
            habits={habits}
            editingHabit={editingHabit}
            onSave={saveHabit}
            onCancelEdit={() => setEditingHabit(null)}
            onEdit={setEditingHabit}
            onDelete={deleteHabit}
          />
        </div>

        <aside className="side-column">
          <ConsistencyPanel consistency={consistency} />
          <AnalyticsPanel period={period} stats={stats} onPeriodChange={changePeriod} />
          <HistoryPanel history={history} />
        </aside>
      </section>
    </main>
  );
}
