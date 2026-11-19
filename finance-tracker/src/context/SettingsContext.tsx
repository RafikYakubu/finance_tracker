import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";

interface SettingsContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  dateFormat: DateFormat;
  setDateFormat: (format: DateFormat) => void;
}

const SettingsContext = createContext<
  SettingsContextType | undefined
>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({
  children,
}: SettingsProviderProps) {
  const [currency, setCurrency] = useState<string>(() => {
    return localStorage.getItem("currency") || "GHS";
  });

  const [dateFormat, setDateFormat] = useState<DateFormat>(() => {
    const savedFormat = localStorage.getItem("dateFormat");

    if (
      savedFormat === "DD/MM/YYYY" ||
      savedFormat === "MM/DD/YYYY" ||
      savedFormat === "YYYY-MM-DD"
    ) {
      return savedFormat;
    }

    return "DD/MM/YYYY";
  });

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("dateFormat", dateFormat);
  }, [dateFormat]);

  return (
    <SettingsContext.Provider
      value={{
        currency,
        setCurrency,
        dateFormat,
        setDateFormat,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
}
