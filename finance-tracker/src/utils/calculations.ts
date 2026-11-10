import type { Transaction } from "../types/transaction";

export const calculateTotalIncome = (
  transactions: Transaction[]
): number => {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const calculateTotalExpenses = (
  transactions: Transaction[]
): number => {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const calculateBalance = (
  transactions: Transaction[]
): number => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);

  return income - expenses;
};