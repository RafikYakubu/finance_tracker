import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import { useSettings } from "../context/SettingsContext";
import { useTransactions } from "../context/TransactionsContext";

import {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
} from "../utils/calculations";

import { formatCurrency } from "../utils/formatCurrency";


function Analytics() {
  const { transactions } = useTransactions();
    const { currency } = useSettings();
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  const balance = calculateBalance(transactions);

  // Monthly income and expense calculations
  const monthlyData = transactions.reduce(
    (result, transaction) => {
      const date = new Date(transaction.date);

      if (isNaN(date.getTime())) return result;

      const month = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

      let existingMonth = result.find((item) => item.month === month);

      if (!existingMonth) {
        existingMonth = {
          month,
          income: 0,
          expenses: 0,
          timestamp: new Date(date.getFullYear(), date.getMonth()).getTime(),
        };

        result.push(existingMonth);
      }

      if (transaction.type === "income") {
        existingMonth.income += transaction.amount;
      } else {
        existingMonth.expenses += transaction.amount;
      }

      return result;
    },
    [] as {
      month: string;
      income: number;
      expenses: number;
      timestamp: number;
    }[]
  ).sort((a, b) => a.timestamp - b.timestamp);

  // Expense breakdown by category
  const categoryData = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((result, transaction) => {
      const existingCategory = result.find(
        (item) => item.name === transaction.category
      );

      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else {
        result.push({
          name: transaction.category,
          value: transaction.amount,
        });
      }

      return result;
    }, [] as { name: string; value: number }[]);

  const COLORS = [
    "#0f766e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
  ];



  return (
    <div className="analytics-page">
      <div className="page-heading">
        <div>
          <h2>Analytics</h2>
          <p>Understand your financial activities and spending habits.</p>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="analytics-summary-grid">
        <div className="analytics-summary-card">
          <span>Total Income</span>
          <h3>{formatCurrency(income, currency)}</h3>
        </div>

        <div className="analytics-summary-card">
          <span>Total Expenses</span>
          <h3>{formatCurrency(expenses, currency)}</h3>
        </div>

        <div className="analytics-summary-card">
          <span>Net Balance</span>
          <h3>{formatCurrency(balance, currency)}</h3>
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="analytics-chart-card">
        <div className="analytics-card-heading">
          <div>
            <h3>Income vs Expenses</h3>
            <p>Monthly financial comparison</p>
          </div>
        </div>

        <div className="analytics-chart">
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
  formatter={(value) =>
    formatCurrency(Number(value ?? 0), currency)
  }
/>
                <Legend />
                <Bar
                  dataKey="income"
                  fill="#0f766e"
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  fill="#ef4444"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="analytics-empty-state">
              Add transactions to see your monthly comparison.
            </p>
          )}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="analytics-chart-card">
        <div className="analytics-card-heading">
          <div>
            <h3>Spending Trends</h3>
            <p>Track how your finances change over time.</p>
          </div>
        </div>

        <div className="analytics-chart">
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
  formatter={(value) =>
    formatCurrency(Number(value ?? 0), currency)
  }
/>
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#0f766e"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="analytics-empty-state">
              Add transactions to see your spending trends.
            </p>
          )}
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="analytics-chart-card">
        <div className="analytics-card-heading">
          <div>
            <h3>Expense Breakdown</h3>
            <p>See where your money goes.</p>
          </div>
        </div>

        <div className="analytics-chart pie-chart-container">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
  formatter={(value) =>
    formatCurrency(Number(value ?? 0), currency)
  }
/>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="analytics-empty-state">
              Add expense transactions to see your spending breakdown.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;