import { createContext, useContext } from "react";

interface TransactionFormContextType {
  showForm: boolean;
  openForm: () => void;
  closeForm: () => void;
}

export const TransactionFormContext =
  createContext<TransactionFormContextType | undefined>(undefined);

export const useTransactionForm = () => {
  const context = useContext(TransactionFormContext);

  if (!context) {
    throw new Error(
      "useTransactionForm must be used inside TransactionFormContext.Provider"
    );
  }

  return context;
};