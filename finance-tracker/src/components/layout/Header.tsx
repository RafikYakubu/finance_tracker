import { Search, Bell, Plus } from "lucide-react";
import { useTransactionForm } from "../../context/TransactionFormContext";

function Header() {
  const { openForm } = useTransactionForm();

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

        <button
          className="add-transaction-button"
          onClick={openForm}
        >
          <Plus size={18} />
          <span>Add Transaction</span>
        </button>
      </div>
    </header>
  );
}

export default Header;