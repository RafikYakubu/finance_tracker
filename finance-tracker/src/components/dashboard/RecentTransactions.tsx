import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/formatCurrency";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <div className="recent-transactions">
      <div className="section-heading">
        <h3>Recent Transactions</h3>
        <button>View all</button>
      </div>

      <div className="transaction-list">
        {transactions.slice(0, 5).map((transaction) => (
          <div className="transaction-row" key={transaction.id}>
            <div className="transaction-info">
              <div className="transaction-avatar">
                {transaction.title.charAt(0)}
              </div>

              <div>
                <h4>{transaction.title}</h4>
                <span>
                  {transaction.category} · {transaction.date}
                </span>
              </div>
            </div>

            <span
              className={
                transaction.type === "income"
                  ? "transaction-income"
                  : "transaction-expense"
              }
            >
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;