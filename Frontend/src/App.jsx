import { useEffect, useState } from "react";
import { AuthScreen } from "./components/auth/AuthScreen";
import { Dashboard } from "./components/dashboard/Dashboard";
import { apiRequest } from "./utils/api";
import "./App.css";

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
    return (
      <main className="loading-screen flex items-center justify-center min-h-screen bg-[#0f172a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Loading your habits...</p>
        </div>
      </main>
    );
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
