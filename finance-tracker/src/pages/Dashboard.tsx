import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import SummaryCard from "../components/dashboard/SummaryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";

import { initialTransactions } from "../data/initialTransactions";

import {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
} from "../utils/calculations";

import { formatCurrency } from "../utils/formatCurrency";

function Dashboard() {
  const transactions = initialTransactions;

  const balance = calculateBalance(transactions);
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);

  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Here's an overview of your finances.</p>
        </div>
      </div>

      <div className="summary-grid">
        <SummaryCard
          title="Total Balance"
          amount={formatCurrency(balance)}
          icon={Wallet}
          description="Your available balance"
          variant="balance"
        />

        <SummaryCard
          title="Total Income"
          amount={formatCurrency(income)}
          icon={TrendingUp}
          description="Money coming in"
          variant="income"
        />

        <SummaryCard
          title="Total Expenses"
          amount={formatCurrency(expenses)}
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