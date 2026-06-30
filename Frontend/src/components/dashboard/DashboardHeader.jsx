import { LogOut } from "lucide-react";

export function DashboardHeader({ user, onLogout }) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-blue-200 text-sm font-medium tracking-wide uppercase mb-1">Dashboard</p>
        <h1 className="text-white text-3xl font-bold tracking-tight">Hi, {user.name}</h1>
      </div>
      <button 
        onClick={onLogout}
        className="p-3 bg-blue-500/30 hover:bg-blue-500/50 text-white rounded-2xl backdrop-blur-sm transition-colors"
        aria-label="Logout"
      >
        <LogOut size={20} strokeWidth={2.5} />
      </button>
    </header>
  );
}
