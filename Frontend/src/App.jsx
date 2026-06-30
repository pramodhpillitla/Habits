import { useEffect, useState } from "react";
import { AuthScreen } from "./components/auth/AuthScreen";
import { Dashboard } from "./components/dashboard/Dashboard";
import { apiRequest } from "./utils/api";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/ui/Layout";
import { Home } from "./pages/Home";
import { Manage } from "./pages/Manage";
import { Analytics } from "./pages/Analytics";

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
      <main className="loading-screen flex items-center justify-center min-h-screen bg-[#f4f6fa]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading your habits...</p>
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={() => { setUser(null); setToken(""); }} />}>
          <Route index element={<Home token={token} />} />
          <Route path="manage" element={<Manage token={token} />} />
          <Route path="analytics" element={<Analytics token={token} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
