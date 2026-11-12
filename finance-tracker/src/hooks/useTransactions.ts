import { useEffect, useState } from "react";
import type { Transaction } from "../types/transaction";
import { initialTransactions } from "../data/initialTransactions";

type NewTransaction = Omit<Transaction, "id">;

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem("transactions");

    if (savedTransactions) {
      try {
        return JSON.parse(savedTransactions) as Transaction[];
      } catch {
        return initialTransactions;
      }
    }

    return initialTransactions;
  });

  // Save transactions whenever they change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Add a transaction
  const addTransaction = (transaction: NewTransaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };

    setTransactions((previousTransactions) => [
      newTransaction,
      ...previousTransactions,
    ]);
  };

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    setTransactions((previousTransactions) =>
      previousTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
  };
}