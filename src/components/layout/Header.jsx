import { Moon, Sun, Shield, Eye, Menu, Download } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { applyFilters } from '../../utils/calculations';
import { formatDate } from '../../utils/formatters';

const PAGE_TITLES = {
  dashboard:    { title: 'Dashboard',    subtitle: 'Your financial overview' },
  transactions: { title: 'Transactions', subtitle: 'Track every transaction' },
  insights:     { title: 'Insights',     subtitle: 'Understand your spending' },
};

export default function Header({ page, onMenuOpen }) {
  const { role, setRole, darkMode, toggleDarkMode, transactions, filters, sorting } = useFinanceStore();
  const { title, subtitle } = PAGE_TITLES[page] || PAGE_TITLES.dashboard;

  // CSV export
  const handleExport = () => {
    const filtered = applyFilters(transactions, filters, sorting);
    const header = 'Date,Description,Category,Type,Amount\n';
    const rows = filtered
      .map((t) => `"${formatDate(t.date)}","${t.description}",${t.category},${t.type},${t.amount}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${formatDate(new Date().toISOString().slice(0,10))}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Mobile hamburger */}
        <button className="mobile-menu-btn" onClick={onMenuOpen}>
          <Menu size={18} />
        </button>
        <div>
          <div className="header-title">{title}</div>
          <div className="header-subtitle">{subtitle}</div>
        </div>
      </div>

      <div className="header-actions">
        {/* Export CSV */}
        <button className="btn btn-secondary btn-sm" onClick={handleExport} title="Export CSV">
          <Download size={13} />
          Export
        </button>

        {/* Role selector */}
        <select
          className="role-selector"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          id="role-selector"
        >
          <option value="viewer">👁 Viewer</option>
          <option value="admin">🛡 Admin</option>
        </select>

        {/* Role badge */}
        <span className={`badge badge-${role}`}>
          {role === 'admin' ? <Shield size={10} /> : <Eye size={10} />}
          {role === 'admin' ? 'Admin Mode' : 'Viewer'}
        </span>

        {/* Dark/Light toggle */}
        <button className="theme-btn" onClick={toggleDarkMode} title="Toggle theme">
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
