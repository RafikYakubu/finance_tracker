import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartNoAxesCombined,
  Settings,
  Wallet,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Wallet size={24} />
        </div>
        <h2>FinTrack</h2>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">MENU</p>

        <a href="#" className="nav-link active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>

        <a href="#" className="nav-link">
          <ArrowLeftRight size={20} />
          <span>Transactions</span>
        </a>

        <a href="#" className="nav-link">
          <ChartNoAxesCombined size={20} />
          <span>Analytics</span>
        </a>

        <p className="nav-label settings-label">PREFERENCES</p>

        <a href="#" className="nav-link">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <p>Personal Finance Tracker</p>
        <span>Version 1.0.0</span>
      </div>
    </aside>
  );
};

export default Sidebar;