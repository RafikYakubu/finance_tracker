import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartNoAxesCombined,
  Settings,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-logo">
        <Wallet size={24} />
        <h2>FinTrack</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-link" onClick={onClose}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/transactions" className="nav-link" onClick={onClose}>
          <ArrowLeftRight size={20} />
          <span>Transactions</span>
        </NavLink>

        <NavLink to="/analytics" className="nav-link" onClick={onClose}>
          <ChartNoAxesCombined size={20} />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/settings" className="nav-link" onClick={onClose}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p>Personal Finance Tracker</p>
        <span>Version 1.0.0</span>
      </div>
    </aside>
  );
}

export default Sidebar;