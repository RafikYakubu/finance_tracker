import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";

import { TransactionsProvider } from "./context/TransactionsContext";

function App() {
  return (
    <BrowserRouter>
      <TransactionsProvider>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />

          <Route
            path="/transactions"
            element={
              <MainLayout>
                <Transactions />
              </MainLayout>
            }
          />
        </Routes>
      </TransactionsProvider>
    </BrowserRouter>
  );
}

export default App;