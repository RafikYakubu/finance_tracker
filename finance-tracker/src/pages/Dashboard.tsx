import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import SummaryCard from "../components/dashboard/SummaryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";

import { useTransactions } from "../context/TransactionsContext";
import { useSettings } from "../context/SettingsContext";

import {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
} from "../utils/calculations";

import { formatCurrency } from "../utils/formatCurrency";

function Dashboard() {
  const { transactions } = useTransactions();
  const { currency } = useSettings();

  const balance = calculateBalance(transactions);
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);

  return (
    <div className="dashboard">
      <div className="summary-grid">
        <SummaryCard
          title="Total Balance"
          amount={formatCurrency(balance, currency)}
          icon={Wallet}
          description="Your available balance"
          variant="balance"
        />

        <SummaryCard
          title="Total Income"
          amount={formatCurrency(income, currency)}
          icon={TrendingUp}
          description="Money coming in"
          variant="income"
        />

        <SummaryCard
          title="Total Expenses"
          amount={formatCurrency(expenses, currency)}
          icon={TrendingDown}
          description="Money going out"
          variant="expense"
        />
      </div>

      <RecentTransactions transactions={transactions} />
    </div>
  );
}

export default Dashboard;