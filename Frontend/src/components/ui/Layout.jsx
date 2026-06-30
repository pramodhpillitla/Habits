import { NavLink, Outlet } from "react-router-dom";
import { CheckSquare, LayoutDashboard, Settings } from "lucide-react";
import { DashboardHeader } from "../dashboard/DashboardHeader";

export function Layout({ user, onLogout }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20 md:pb-0 md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white shadow-xl shadow-slate-200/40 z-10">
        <div className="p-6">
          <DashboardHeader user={user} onLogout={onLogout} />
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <CheckSquare size={20} />
            <span>Analytics</span>
          </NavLink>
          <NavLink
            to="/manage"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <Settings size={20} />
            <span>Manage</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative h-screen overflow-y-auto overflow-x-hidden bg-[#f4f6fa]">
        {/* Mobile Header */}
        <div className="md:hidden bg-blue-600 px-6 pt-10 pb-16 rounded-b-[40px] shadow-lg shadow-blue-600/20">
          <DashboardHeader user={user} onLogout={onLogout} />
        </div>
        
        <div className="md:p-8 md:max-w-5xl mx-auto -mt-6 md:mt-0 relative z-10">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-50 rounded-t-[30px]">
        <div className="flex justify-around items-center h-20 px-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                isActive ? "bg-blue-50 text-blue-600" : "text-slate-400"
              }`
            }
          >
            <LayoutDashboard size={24} className={({isActive}) => isActive ? "mb-1" : ""} />
            {({ isActive }) => isActive && <div className="w-1 h-1 rounded-full bg-blue-600 mt-1"></div>}
          </NavLink>
          
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                isActive ? "bg-blue-50 text-blue-600" : "text-slate-400"
              }`
            }
          >
            <CheckSquare size={24} />
            {({ isActive }) => isActive && <div className="w-1 h-1 rounded-full bg-blue-600 mt-1"></div>}
          </NavLink>
          
          <NavLink
            to="/manage"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                isActive ? "bg-blue-50 text-blue-600" : "text-slate-400"
              }`
            }
          >
            <Settings size={24} />
            {({ isActive }) => isActive && <div className="w-1 h-1 rounded-full bg-blue-600 mt-1"></div>}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
