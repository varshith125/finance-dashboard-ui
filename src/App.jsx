import { useState, useEffect } from 'react';
import useFinanceStore from './store/useFinanceStore';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './components/pages/DashboardPage';
import TransactionsPage from './components/pages/TransactionsPage';
import InsightsPage from './components/pages/InsightsPage';

export default function App() {
  const { darkMode } = useFinanceStore();
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apply dark/light class to root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [darkMode]);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':    return <DashboardPage />;
      case 'transactions': return <TransactionsPage />;
      case 'insights':     return <InsightsPage />;
      default:             return <DashboardPage />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        active={page}
        onNavigate={setPage}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <Header
          page={page}
          onMenuOpen={() => setSidebarOpen(true)}
        />
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
