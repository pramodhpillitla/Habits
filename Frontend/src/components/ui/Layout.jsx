import { NavLink, Outlet } from "react-router-dom";
import { CheckSquare, LayoutDashboard, Settings } from "lucide-react";
import { DashboardHeader } from "../dashboard/DashboardHeader";

export function Layout({ user, onLogout }) {
  return (
    <div className="fixed inset-0 flex flex-col bg-blue-600 md:flex-row font-sans overflow-hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-blue-700/30 border-r border-blue-500/20 z-10">
        <div className="p-8">
          <DashboardHeader user={user} onLogout={onLogout} />
        </div>
        <nav className="flex-1 px-6 space-y-2 mt-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl font-medium md:font-semibold transition-colors ${
                isActive ? "bg-white text-blue-600 shadow-sm" : "text-blue-100 hover:bg-blue-500/30"
              }`
            }
          >
            <LayoutDashboard size={20} strokeWidth={2} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl font-medium md:font-semibold transition-colors ${
                isActive ? "bg-white text-blue-600 shadow-sm" : "text-blue-100 hover:bg-blue-500/30"
              }`
            }
          >
            <CheckSquare size={20} strokeWidth={2} />
            <span>Analytics</span>
          </NavLink>
          <NavLink
            to="/manage"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl font-medium md:font-semibold transition-colors ${
                isActive ? "bg-white text-blue-600 shadow-sm" : "text-blue-100 hover:bg-blue-500/30"
              }`
            }
          >
            <Settings size={20} strokeWidth={2} />
            <span>Manage</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative h-full overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar">
        {/* Mobile Header */}
        <div className="md:hidden px-6 pt-10 pb-8 z-10 shrink-0">
          <DashboardHeader user={user} onLogout={onLogout} />
        </div>
        
        {/* Outlet Wrapper */}
        <div className="flex-1 flex flex-col md:pt-10">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50">
        <div className="flex justify-around items-center h-16 px-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${
                isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard size={24} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && <div className="absolute bottom-2 w-1 h-1 rounded-full bg-blue-600"></div>}
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${
                isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <CheckSquare size={24} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && <div className="absolute bottom-2 w-1 h-1 rounded-full bg-blue-600"></div>}
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/manage"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${
                isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Settings size={24} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && <div className="absolute bottom-2 w-1 h-1 rounded-full bg-blue-600"></div>}
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
