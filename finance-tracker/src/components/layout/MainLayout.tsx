import { useState } from "react";
import type { ReactNode } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "./Sidebar";
import Header from "./Header";

import TransactionForm from "../transactions/TransactionForm";

import { TransactionFormContext } from "../../context/TransactionFormContext";
import { useTransactions } from "../../context/TransactionsContext";

function MainLayout({ children }: { children: ReactNode }) {
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { addTransaction } = useTransactions();

  const closeForm = () => setShowForm(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <TransactionFormContext.Provider
      value={{
        showForm,
        openForm: () => setShowForm(true),
        closeForm,
      }}
    >
      <div className="app-layout">
        <button
          className="mobile-menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {sidebarOpen && (
          <div
            className="mobile-sidebar-overlay"
            onClick={closeSidebar}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className="main-content">
          <Header />

          <div className="page-content">
            {showForm && (
              <div
                className="transaction-modal-overlay"
                onClick={closeForm}
              >
                <div
                  className="transaction-modal-content"
                  onClick={(event) => event.stopPropagation()}
                >
                  <TransactionForm
                    onAdd={addTransaction}
                    onCancel={closeForm}
                  />
                </div>
              </div>
            )}

            {children}
          </div>
        </main>
      </div>
    </TransactionFormContext.Provider>
  );
}

export default MainLayout;