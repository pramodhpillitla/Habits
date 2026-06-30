export function DashboardHeader({ user, onLogout }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Dashboard</p>
        <h1>Hi, {user.name}</h1>
      </div>
      <button className="ghost-action" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}
