type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";

export const formatDate = (
  date: string,
  format: DateFormat = "DD/MM/YYYY"
): string => {
  if (!date) return "";

  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return date;
  }

  switch (format) {
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;

    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;

    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;

    default:
      return date;
  }
};