import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const PERIODS = ["today", "week", "month", "year"];

const formatDate = (value) => {
  if (!value) return "Not completed yet";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
};

const apiRequest = async (path, { token, ...options } = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload =
        mode === "register"
          ? form
          : {
              email: form.email,
              password: form.password,
            };
      const data = await apiRequest(`/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      localStorage.setItem("habit_token", data.token);
      onAuth(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="brand-lockup">
          <span className="brand-mark">H</span>
          <div>
            <h1>Habit Due</h1>
            <p>Only see the habits that need your attention today.</p>
          </div>
        </div>

        <form className="auth-form" onSubmit={submit}>
          <div className="segmented-control" aria-label="Authentication mode">
            <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
              Login
            </button>
            <button type="button" className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
              Register
            </button>
          </div>

          {mode === "register" && (
            <label>
              Name
              <input
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Your name"
              />
            </label>
          )}

          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              required
              minLength={6}
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Minimum 6 characters"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-action" disabled={loading}>
            {loading ? "Working..." : mode === "register" ? "Create Account" : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

function HabitForm({ editingHabit, onSubmit, onCancel }) {
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

function ContributionGrid({ days }) {
  return (
    <div className="contribution-grid" aria-label="Consistency chart">
      {days.map((day) => (
        <span
          key={day.date}
          className={`day-cell level-${day.level}`}
          title={`${day.date}: ${day.completed}/${day.dueCount} completed`}
        />
      ))}
    </div>
  );
}

function PieChart({ stats }) {
  const percent = stats?.completionPercentage || 0;
  return (
    <div className="pie-wrap">
      <div className="pie-chart" style={{ "--percent": `${percent}%` }}>
        <span>{percent}%</span>
      </div>
      <div className="pie-legend">
        <span>
          <i className="dot complete" /> Completed {stats?.completed || 0}
        </span>
        <span>
          <i className="dot missed" /> Remaining {stats?.missed || 0}
        </span>
      </div>
    </div>
  );
}

function Dashboard({ user, token, onLogout }) {
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

  const loadDashboard = useCallback(async (selectedPeriod = period) => {
    setLoading(true);
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
      setLoading(false);
    }
  }, [headers, period]);

  useEffect(() => {
    Promise.resolve().then(() => loadDashboard(period));
  }, [loadDashboard, period]);

  const saveHabit = async (habit) => {
    try {
      if (editingHabit) {
        await apiRequest(`/habits/${editingHabit.id}`, {
          ...headers,
          method: "PUT",
          body: JSON.stringify(habit),
        });
      } else {
        await apiRequest("/habits", {
          ...headers,
          method: "POST",
          body: JSON.stringify(habit),
        });
      }
      setEditingHabit(null);
      setMessage("");
      await loadDashboard();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const completeHabit = async (habitId) => {
    try {
      await apiRequest(`/habits/${habitId}/complete`, {
        ...headers,
        method: "POST",
      });
      setMessage("Nice. That habit is logged for today.");
      await loadDashboard();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await apiRequest(`/habits/${habitId}`, {
        ...headers,
        method: "DELETE",
      });
      await loadDashboard();
    } catch (err) {
      setMessage(err.message);
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
      <header className="topbar">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Hi, {user.name}</h1>
        </div>
        <button className="ghost-action" onClick={logout}>
          Logout
        </button>
      </header>

      {message && <div className="notice">{message}</div>}

      <section className="metric-grid">
        <article>
          <span>Due today</span>
          <strong>{summary?.dueToday ?? 0}</strong>
        </article>
        <article>
          <span>Completed today</span>
          <strong>{summary?.completedToday ?? 0}</strong>
        </article>
        <article>
          <span>Current streak</span>
          <strong>{summary?.currentStreak ?? 0}</strong>
        </article>
        <article>
          <span>Highest streak</span>
          <strong>{summary?.highestStreak ?? 0}</strong>
        </article>
        <article>
          <span>Total habits</span>
          <strong>{summary?.totalHabits ?? 0}</strong>
        </article>
      </section>

      <section className="workspace">
        <div className="main-column">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Today</p>
                <h2>Due habits</h2>
              </div>
              {loading && <span className="loading-pill">Loading</span>}
            </div>

            <div className="habit-list">
              {dueHabits.length === 0 && <p className="empty-state">No habits are due right now.</p>}
              {dueHabits.map((habit) => (
                <article className="habit-row" key={habit.id}>
                  <div>
                    <h3>{habit.name}</h3>
                    <p>
                      Every {habit.repeatInterval} day{habit.repeatInterval > 1 ? "s" : ""} · Last done{" "}
                      {formatDate(habit.lastCompletedDate)}
                    </p>
                  </div>
                  <button className="primary-action compact" onClick={() => completeHabit(habit.id)}>
                    Done
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">All Habits</p>
                <h2>Manage schedule</h2>
              </div>
            </div>
            <HabitForm
              key={editingHabit?.id || "new-habit"}
              editingHabit={editingHabit}
              onSubmit={saveHabit}
              onCancel={() => setEditingHabit(null)}
            />
            <div className="manage-list">
              {habits.map((habit) => (
                <article className="manage-row" key={habit.id}>
                  <div>
                    <h3>{habit.name}</h3>
                    <p>
                      {habit.status} · next due {formatDate(habit.nextDueDate)}
                    </p>
                  </div>
                  <div className="row-actions">
                    <button className="ghost-action compact" onClick={() => setEditingHabit(habit)}>
                      Edit
                    </button>
                    <button className="danger-action compact" onClick={() => deleteHabit(habit.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="side-column">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Consistency</p>
                <h2>Last 120 days</h2>
              </div>
            </div>
            <ContributionGrid days={consistency} />
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Analytics</p>
                <h2>Completion</h2>
              </div>
            </div>
            <div className="segmented-control">
              {PERIODS.map((item) => (
                <button key={item} className={period === item ? "active" : ""} onClick={() => changePeriod(item)}>
                  {item}
                </button>
              ))}
            </div>
            <PieChart stats={stats} />
            <dl className="stats-list">
              <div>
                <dt>Total due</dt>
                <dd>{stats?.totalDue || 0}</dd>
              </div>
              <div>
                <dt>Completed</dt>
                <dd>{stats?.completed || 0}</dd>
              </div>
              <div>
                <dt>Missed</dt>
                <dd>{stats?.missed || 0}</dd>
              </div>
            </dl>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">History</p>
                <h2>Recent logs</h2>
              </div>
            </div>
            <div className="history-list">
              {history.slice(0, 8).map((log) => (
                <div key={log._id}>
                  <span>{log.habitId?.name || "Habit"}</span>
                  <time>{formatDate(log.date)}</time>
                </div>
              ))}
              {history.length === 0 && <p className="empty-state">No completions yet.</p>}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("habit_token"));
  const [checkingSession, setCheckingSession] = useState(Boolean(token));

  useEffect(() => {
    if (!token) return;

    apiRequest("/auth/me", { token })
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("habit_token");
        setToken("");
      })
      .finally(() => setCheckingSession(false));
  }, [token]);

  if (checkingSession) {
    return <main className="loading-screen">Loading your habits...</main>;
  }

  if (!user || !token) {
    return (
      <AuthScreen
        onAuth={(nextUser, nextToken) => {
          setUser(nextUser);
          setToken(nextToken);
        }}
      />
    );
  }

  return <Dashboard user={user} token={token} onLogout={() => setUser(null)} />;
}

export default App;
