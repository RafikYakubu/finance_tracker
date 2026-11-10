const Dashboard = () => {
  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <div>
          <h2>Financial Overview</h2>
          <p>Track and manage your money effectively.</p>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <p>Total Balance</p>
          <h2>GH₵ 12,500.00</h2>
          <span>Available balance</span>
        </div>

        <div className="summary-card">
          <p>Total Income</p>
          <h2>GH₵ 8,000.00</h2>
          <span>This month</span>
        </div>

        <div className="summary-card">
          <p>Total Expenses</p>
          <h2>GH₵ 3,500.00</h2>
          <span>This month</span>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;