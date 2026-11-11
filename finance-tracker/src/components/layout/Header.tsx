import { Search, Bell, Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        <h1>Dashboard</h1>
        
      </div>

      <div className="header-actions">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search transactions..." />
        </div>

        <button className="notification-button">
          <Bell size={20} />
        </button>

        <button className="add-transaction-button">
          <Plus size={18} />
          <span>Add Transaction</span>
        </button>
      </div>
    </header>
  );
};

export default Header;