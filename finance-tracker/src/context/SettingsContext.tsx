import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";

type Theme = "light" | "dark";

interface SettingsContextType {
  currency: string;
  setCurrency: (currency: string) => void;

  dateFormat: DateFormat;
  setDateFormat: (format: DateFormat) => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;
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

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("dateFormat", dateFormat);
  }, [dateFormat]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{
        currency,
        setCurrency,
        dateFormat,
        setDateFormat,
        theme,
        setTheme,
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