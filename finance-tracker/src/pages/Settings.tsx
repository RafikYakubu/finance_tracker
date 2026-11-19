import {
  Palette,
  Database,
  Globe,
  Download,
  Trash2,
  RotateCcw,
} from "lucide-react";

import { useSettings } from "../context/SettingsContext";
import { useTransactions } from "../context/TransactionsContext";


function Settings() {

  const {
  currency,
  setCurrency,
  dateFormat,
  setDateFormat,
  theme,
  setTheme,
} = useSettings();

 const {
  transactions,
  clearTransactions,
  restoreTransactions,  
} = useTransactions();
  const exportTransactions = () => {
  const headers = [
    "ID",
    "Title",
    "Amount",
    "Type",
    "Category",
    "Date",
  ];

  const rows = transactions.map((transaction) => [
    transaction.id,
    transaction.title,
    transaction.amount,
    transaction.type, 
    transaction.category,
    transaction.date,
  ]);

  const escapeCSV = (value: string | number) => {
    let text = String(value);

    // Prevent spreadsheet formula injection in text fields.
    if (/^[\s]*[=+\-@]/.test(text)) {
      text = `'${text}`;
    }

    return `"${text.replace(/"/g, '""')}"`;
  };

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "fintrack-transactions.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

const handleClearTransactions = () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete all transactions? This action cannot be undone."
  );

  if (confirmed) {
    clearTransactions();
  }
};

const handleRestoreTransactions = () => {
  const confirmed = window.confirm(
    "Are you sure you want to restore the original demo transactions? Your current transactions will be replaced."
  );

  if (confirmed) {
    restoreTransactions();
  }
};

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <div>
          <h2>Settings</h2>
          <p>Manage your application preferences and data.</p>
        </div>
      </div>

      {/* GENERAL PREFERENCES */}
      <section className="settings-section">
        <div className="settings-section-heading">
          <Globe size={20} />
          <div>
            <h3>General Preferences</h3>
            <p>Customize how FinTrack displays your information.</p>
          </div>
        </div>

        <div className="settings-option">
          <div>
            <h4>Currency</h4>
            <p>Choose your preferred currency.</p>
          </div>

          <select
  value={currency}
  onChange={(e) => setCurrency(e.target.value)}
>
  <option value="GHS">Ghana Cedi (GH₵)</option>
  <option value="USD">US Dollar ($)</option>
  <option value="EUR">Euro (€)</option>
  <option value="GBP">British Pound (£)</option>
</select>
        </div>

        <div className="settings-option">
          <div>
            <h4>Date Format</h4>
            <p>Choose how dates appear throughout the application.</p>
          </div>

        <select
  value={dateFormat}
  onChange={(e) =>
    setDateFormat(
      e.target.value as "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD"
    )
  }
>
  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
</select>

        </div>
      </section>

      {/* APPEARANCE */}
      <section className="settings-section">
        <div className="settings-section-heading">
          <Palette size={20} />
          <div>
            <h3>Appearance</h3>
            <p>Personalize the look and feel of FinTrack.</p>
          </div>
        </div>

        <div className="settings-option">
          <div>
            <h4>Theme</h4>
            <p>Choose your preferred application theme.</p>
          </div>

          <select
  value={theme}
  onChange={(e) =>
    setTheme(e.target.value as "light" | "dark")
  }
>
  <option value="light">Light Mode</option>
  <option value="dark">Dark Mode</option>
</select>
        </div>
      </section>

      {/* DATA MANAGEMENT */}
      <section className="settings-section">
        <div className="settings-section-heading">
          <Database size={20} />
          <div>
            <h3>Data Management</h3>
            <p>Manage your financial records.</p>
          </div>
        </div>

        {/* APPLICATION DATA */}
<div className="settings-option">
  <div>
    <h4>Application Data</h4>
    <p>Manage your locally stored financial information.</p>
    <p>{transactions.length} transaction(s) currently stored.</p>
  </div>

  <span className="settings-status">Stored locally</span>
</div>

{/* EXPORT */}
<div className="settings-option">
  <div>
    <h4>Export Transactions</h4>
    <p>Download your financial records as a CSV file.</p>
  </div>

  <button
    className="settings-action-button"
    onClick={exportTransactions}
    disabled={transactions.length === 0}
  >
    <Download size={16} />
    Export CSV
  </button>
</div>

{/* CLEAR DATA */}
<div className="settings-option">
  <div>
    <h4>Clear All Transactions</h4>
    <p>Remove all currently stored transactions.</p>
  </div>

  <button
    className="settings-danger-button"
    onClick={handleClearTransactions}
    disabled={transactions.length === 0}
  >
    <Trash2 size={16} />
    Clear Data
  </button>
</div>


<div className="settings-option">
  <div>
    <h4>Restore Demo Data</h4>
    <p>Replace your current records with the original sample transactions.</p>
  </div>

  <button
    className="settings-action-button"
    onClick={handleRestoreTransactions}
  >
    <RotateCcw size={16} />
    Restore Data
  </button>
</div>

      </section>
    </div>
  );
}

export default Settings;