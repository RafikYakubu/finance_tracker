import {
  Palette,
  Database,
  Globe,
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";
function Settings() {

    const {
  currency,
  setCurrency,
  dateFormat,
  setDateFormat,
  theme,
  setTheme,
} = useSettings();

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

        <div className="settings-option">
          <div>
            <h4>Application Data</h4>
            <p>Manage your locally stored financial information.</p>
          </div>

          <span className="settings-status">Stored locally</span>
        </div>
      </section>
    </div>
  );
}

export default Settings;