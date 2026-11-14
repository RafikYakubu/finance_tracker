import { BrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import { TransactionsProvider } from "./context/TransactionsContext";

function App() {
  return (
    <BrowserRouter>
      <TransactionsProvider>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </TransactionsProvider>
    </BrowserRouter>
  );
}

export default App;