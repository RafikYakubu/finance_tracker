import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { useTransactions } from "../context/TransactionsContext";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
import TransactionForm from "../components/transactions/TransactionForm";

import type { Transaction } from "../types/transaction";

type NewTransaction = Omit<Transaction, "id">;

function Transactions() {
  const {
    transactions,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const { currency, dateFormat } = useSettings();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" || transaction.type === filter;

    return matchesSearch && matchesFilter;
  });

  const handleUpdate = (updatedData: NewTransaction) => {
    if (!editingTransaction) return;

    updateTransaction(editingTransaction.id, updatedData);
    setEditingTransaction(null);
  };

  return (
    <div className="transactions-page">
      <div className="page-heading">
        <div>
          <h2>Transactions</h2>
          <p>Manage and track all your financial activities.</p>
        </div>
      </div>

      {editingTransaction && (
        <TransactionForm
          key={editingTransaction.id}
          initialData={editingTransaction}
          onAdd={() => {}}
          onUpdate={handleUpdate}
          onCancel={() => setEditingTransaction(null)}
        />
      )}

      <div className="transaction-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All Transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
      </div>

      <div className="transactions-table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Category</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td>
  <span className="category-badge">
    {transaction.category}
  </span>
</td>
                  <td>{formatDate(transaction.date, dateFormat)}</td>
                  <td>
                    <span className={`transaction-badge ${transaction.type}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td>
                    <strong className={`transaction-amount ${transaction.type}`}>
  {transaction.type === "income" ? "+" : "-"}
  {formatCurrency(transaction.amount, currency)}
</strong>
                  </td>
                  <td>
                    <div className="transaction-actions">
                      <button
                        className="edit-button"
                        title="Edit transaction"
                        onClick={() => setEditingTransaction(transaction)}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        className="delete-button"
                        title="Delete transaction"
                        onClick={() => {
                          const confirmed = window.confirm(
                            "Are you sure you want to delete this transaction?"
                          );

                          if (confirmed) {
                            deleteTransaction(transaction.id);
                          }
                        }}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="empty-state">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;