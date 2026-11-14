import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartNoAxesCombined,
  Settings,
  Wallet,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Wallet size={24} />
        <h2>FinTrack</h2>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-link">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div className="nav-link">
          <ArrowLeftRight size={20} />
          <span>Transactions</span>
        </div>

        <div className="nav-link">
          <ChartNoAxesCombined size={20} />
          <span>Analytics</span>
        </div>

        <div className="nav-link">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <p>Personal Finance Tracker</p>
        <span>Version 1.0.0</span>
      </div>
    </aside>
  );
}

export default Sidebar;