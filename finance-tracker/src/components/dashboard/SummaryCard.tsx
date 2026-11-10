import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  amount: string;
  icon: LucideIcon;
  description: string;
  variant: "balance" | "income" | "expense";
}

function SummaryCard({
  title,
  amount,
  icon: Icon,
  description,
  variant,
}: SummaryCardProps) {
  return (
    <div className={`summary-card ${variant}`}>
      <div className="summary-card-top">
        <span>{title}</span>

        <div className="summary-icon">
          <Icon size={20} />
        </div>
      </div>

      <h2>{amount}</h2>
      <p>{description}</p>
    </div>
  );
}

export default SummaryCard;