import { useState } from "react";
import type { ReactNode } from "react";

import Sidebar from "./Sidebar";

import { TransactionFormContext } from "../../context/TransactionFormContext";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <TransactionFormContext.Provider
      value={{
        showForm,
        openForm: () => setShowForm(true),
        closeForm: () => setShowForm(false),
      }}
    >
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <div className="page-content">
            {children}
          </div>
        </main>
      </div>
    </TransactionFormContext.Provider>
  );
}

export default MainLayout;