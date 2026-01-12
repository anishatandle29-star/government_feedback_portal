import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { ComplaintsPage } from './components/ComplaintsPage';
import { SimilarReportsPage } from './components/SimilarReportsPage';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AppProvider } from './context/AppContext';

type Page = 'login' | 'dashboard' | 'complaints' | 'similar-reports' | 'analytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const renderPage = () => {
    if (!isAuthenticated && currentPage !== 'login') {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'dashboard':
        return (
          <Dashboard
            onNavigateToComplaints={() => setCurrentPage('complaints')}
            onNavigateToSimilarReports={() => setCurrentPage('similar-reports')}
            onNavigateToAnalytics={() => setCurrentPage('analytics')}
          />
        );
      case 'complaints':
        return <ComplaintsPage onBack={() => setCurrentPage('dashboard')} />;
      case 'similar-reports':
        return <SimilarReportsPage onBack={() => setCurrentPage('dashboard')} />;
      case 'analytics':
        return <AnalyticsDashboard onBack={() => setCurrentPage('dashboard')} />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen">
        {renderPage()}
      </div>
    </AppProvider>
  );
}