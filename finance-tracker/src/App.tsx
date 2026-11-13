import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import { TransactionsProvider } from "./context/TransactionsContext";

function App() {
  return (
    <TransactionsProvider>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </TransactionsProvider>
  );
}

export default App;