import { LogOut } from "lucide-react";

export function DashboardHeader({ user, onLogout }) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-blue-200 text-xs font-semibold tracking-wide uppercase mb-1">Dashboard</p>
        <h1 className="text-white text-2xl font-bold tracking-tight">Hi, {user.name}</h1>
      </div>
      <button 
        onClick={onLogout}
        className="p-2.5 bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 rounded-xl transition-colors"
        aria-label="Logout"
      >
        <LogOut size={18} strokeWidth={2} />
      </button>
    </header>
  );
}
