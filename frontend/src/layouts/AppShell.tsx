import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { InventoryProvider } from '../context/InventoryContext';
import { useAuth } from '../context/AuthContext';
import { AppTab, resolveActiveTab, ROUTES, TAB_TO_PATH } from '../routes/paths';

interface AppShellProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({ darkMode, onToggleTheme }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (tab: AppTab) => {
    navigate(TAB_TO_PATH[tab]);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.LOGIN, { replace: true });
  };

  return (
    <InventoryProvider>
      <div className="app-shell min-h-screen bg-[var(--bg-main)] text-[var(--on-surface)] selection:bg-[var(--primary)] selection:text-white flex flex-col relative overflow-x-hidden transition-colors duration-500">
        <div className="ambient-glow ambient-glow-primary fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5D21DF] opacity-10 blur-[120px] pointer-events-none"></div>
        <div className="ambient-glow ambient-glow-secondary fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00E5FF] opacity-5 blur-[120px] pointer-events-none"></div>

        <Header
          activeTab={resolveActiveTab(location.pathname)}
          onTabChange={handleTabChange}
          darkMode={darkMode}
          onToggleTheme={onToggleTheme}
          onLogout={handleLogout}
          storeName={user?.storeName}
        />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 relative z-10">
          <Outlet />
        </main>

        <footer className="py-8 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 glass-card text-[10px] sm:text-xs text-[var(--on-surface-low)] opacity-70 border-[rgba(255,255,255,0.03)]">
            Godamm - Made in Love  - An Inventory Management System
          </div>
        </footer>
      </div>
    </InventoryProvider>
  );
};
