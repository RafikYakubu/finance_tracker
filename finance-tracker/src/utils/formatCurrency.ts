export const formatCurrency = (
  amount: number,
  currency: string = "GHS"
): string => {
  const localeMap: Record<string, string> = {
    GHS: "en-GH",
    USD: "en-US",
    EUR: "en-DE",
    GBP: "en-GB",
  };

  return new Intl.NumberFormat(localeMap[currency] || "en-GH", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};