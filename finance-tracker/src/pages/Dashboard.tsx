import { useState } from "react";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
} from "lucide-react";

import SummaryCard from "../components/dashboard/SummaryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import TransactionForm from "../components/transactions/TransactionForm";

import { useTransactions } from "../hooks/useTransactions";

import {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
} from "../utils/calculations";

import { formatCurrency } from "../utils/formatCurrency";

function Dashboard() {
  const { transactions, addTransaction } = useTransactions();

  const [showForm, setShowForm] = useState(false);

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

        <button
          className="add-transaction-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>

      {showForm && (
        <TransactionForm
          onAdd={addTransaction}
          onCancel={() => setShowForm(false)}
        />
      )}

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