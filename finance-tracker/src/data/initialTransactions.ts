import type { Transaction } from "../types/transaction";

export const initialTransactions: Transaction[] = [
  {
    id: "1",
    title: "Monthly Allowance",
    amount: 1500,
    type: "income",
    category: "Allowance",
    date: "2026-11-10",
  },
  {
    id: "2",
    title: "Food and Groceries",
    amount: 250,
    type: "expense",
    category: "Food",
    date: "2026-11-09",
  },
  {
    id: "3",
    title: "Freelance Payment",
    amount: 800,
    type: "income",
    category: "Freelance",
    date: "2026-11-08",
  },
  {
    id: "4",
    title: "Transportation",
    amount: 100,
    type: "expense",
    category: "Transport",
    date: "2026-11-07",
  },
  {
    id: "5",
    title: "Internet Subscription",
    amount: 150,
    type: "expense",
    category: "Bills",
    date: "2026-11-06",
  },
  {
    id: "6",
    title: "Books",
    amount: 120,
    type: "expense",
    category: "Education",
    date: "2026-11-05",
  },
];