import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

interface SettingsContextType {
  currency: string;
  setCurrency: (currency: string) => void;
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

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (
    <SettingsContext.Provider
      value={{
        currency,
        setCurrency,
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