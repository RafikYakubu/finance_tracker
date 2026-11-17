import { Link } from "react-router-dom";
import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/formatCurrency";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="recent-transactions">
      <div className="section-heading">
        <div>
          <h3>Recent Transactions</h3>
          <p>Your latest financial activities</p>
        </div>

        <Link to="/transactions" className="view-all-button">
          View all
        </Link>
      </div>

      <div className="transaction-list">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction) => (
            <div className="transaction-row" key={transaction.id}>
              <div className="transaction-info">
                <div className="transaction-avatar">
                  {transaction.title.charAt(0).toUpperCase()}
                </div>

                <div className="transaction-details">
                  <h4>{transaction.title}</h4>
                  <span>
                    {transaction.category} · {transaction.date}
                  </span>
                </div>
              </div>

              <span
                className={`recent-transaction-amount ${transaction.type}`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          ))
        ) : (
          <div className="recent-empty-state">
            <p>No transactions yet.</p>
            <span>Your recent financial activities will appear here.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentTransactions;