import { useState } from "react";
import type { FormEvent } from "react";
import type { Transaction } from "../../types/transaction";

type NewTransaction = Omit<Transaction, "id">;

interface TransactionFormProps {
  onAdd: (transaction: NewTransaction) => void;
  onCancel: () => void;
}

function TransactionForm({ onAdd, onCancel }: TransactionFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!title.trim()) {
      setError("Please enter a transaction title.");
      return;
    }

    if (!amount || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    if (!date) {
      setError("Please select a date.");
      return;
    }

    onAdd({
      title: title.trim(),
      amount: numericAmount,
      type,
      category,
      date,
    });

    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);
    setError("");
    onCancel();
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <h2>Add Transaction</h2>
          <p>Record your income or expenses.</p>
        </div>

        <button type="button" onClick={onCancel}>
          ✕
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="title">Transaction title</label>
        <input
          id="title"
          type="text"
          placeholder="e.g. Monthly allowance"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount (GH₵)</label>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Transaction type</label>
          <select
            id="type"
            value={type}
            onChange={(event) =>
              setType(event.target.value as "income" | "expense")
            }
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Education">Education</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Allowance">Allowance</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="date">Transaction date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" className="submit-button">
          Add Transaction
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;