import { useEffect, useState } from "react";
import { AuthScreen } from "./components/auth/AuthScreen";
import { Dashboard } from "./components/dashboard/Dashboard";
import { apiRequest } from "./utils/api";
import "./App.css";

import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/ui/Layout";
import { Home } from "./pages/Home";
import { Manage } from "./pages/Manage";
import { Analytics } from "./pages/Analytics";

function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    apiRequest("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => {
        setUser(null);
      })
      .finally(() => setCheckingSession(false));
  }, []);

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

  if (!user) {
    return (
      <AuthScreen
        onAuth={(nextUser) => {
          setUser(nextUser);
        }}
      />
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} onLogout={() => setUser(null)} />}>
            <Route index element={<Home />} />
            <Route path="manage" element={<Manage />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
