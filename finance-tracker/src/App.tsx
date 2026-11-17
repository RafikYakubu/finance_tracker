import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { SettingsProvider } from "./context/SettingsContext";

import { TransactionsProvider } from "./context/TransactionsContext";

function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
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

          <Route
            path="/analytics"
            element={
              <MainLayout>
                <Analytics />
              </MainLayout>
            }
          />



          <Route
  path="/settings"
  element={
    <MainLayout>
      <Settings />
    </MainLayout>
  }
/>
        </Routes>
      </TransactionsProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}
    

export default App;