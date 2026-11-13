import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

import type { Transaction } from "../types/transaction";

import { initialTransactions } from "../data/initialTransactions";

type NewTransaction = Omit<Transaction, "id">;

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: NewTransaction) => void;
  updateTransaction: (id: string, transaction: NewTransaction) => void;
  deleteTransaction: (id: string) => void;
}

const TransactionsContext =
  createContext<TransactionsContextType | undefined>(undefined);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({
  children,
}: TransactionsProviderProps) {

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const savedTransactions = localStorage.getItem("transactions");

      if (savedTransactions) {
        const parsedTransactions: unknown = JSON.parse(savedTransactions);

        if (Array.isArray(parsedTransactions)) {
          return parsedTransactions as Transaction[];
        }
      }
    } catch {
      console.error("Could not load saved transactions.");
    }

    return initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (transaction: NewTransaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };

    setTransactions((previous) => [
      newTransaction,
      ...previous,
    ]);
  };

  const updateTransaction = (
    id: string,
    updatedTransaction: NewTransaction
  ) => {
    setTransactions((previous) =>
      previous.map((transaction) =>
        transaction.id === id
          ? { ...updatedTransaction, id }
          : transaction
      )
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionsProvider"
    );
  }

  return context;
}