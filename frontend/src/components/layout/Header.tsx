import React, { useState } from 'react';
import { LayoutDashboard, Package, Truck, ShoppingCart, LogOut, Sun, Moon, Edit2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { AppTab } from '../../routes/paths';

interface HeaderProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  storeName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  darkMode,
  onToggleTheme,
  onLogout,
  storeName: initialStoreName
}) => {
  const { updateStoreName } = useAuth();
  const [isEditingStore, setIsEditingStore] = useState(false);
  const [newStoreName, setNewStoreName] = useState(initialStoreName || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
    { id: 'suppliers', label: 'Suppliers', icon: <Truck className="w-4 h-4" /> },
    { id: 'sell', label: 'Sales', icon: <ShoppingCart className="w-4 h-4" /> }
  ];

  const handleUpdateStoreName = async () => {
    if (!newStoreName.trim() || newStoreName === initialStoreName) {
      setIsEditingStore(false);
      return;
    }

    setIsUpdating(true);
    try {
      await updateStoreName(newStoreName);
      setIsEditingStore(false);
    } catch (error) {
      console.error('Failed to update store name:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none bg-[var(--bg-main)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
           <div className="logo-container group cursor-pointer" onClick={() => onTabChange('dashboard')}>
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl"></div>
           </div>
           
           <div className="min-w-[120px]">
              {isEditingStore ? (
                <div className="flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200">
                  <input
                    autoFocus
                    type="text"
                    value={newStoreName}
                    onChange={(e) => setNewStoreName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateStoreName()}
                    disabled={isUpdating}
                    className="bg-[var(--surface)] border border-[var(--border)] rounded px-2 py-0.5 text-xs text-[var(--on-surface)] focus:outline-none focus:ring-1 focus:ring-[#CDBDFF] w-full"
                  />
                  <button onClick={handleUpdateStoreName} disabled={isUpdating} className="text-emerald-400 hover:scale-110">
                    <Check className="w-3 h-3" />
                  </button>
                  <button onClick={() => { setIsEditingStore(false); setNewStoreName(initialStoreName || ''); }} className="text-red-400 hover:scale-110">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group/name">
                  <div>
                    <h1 className="text-sm font-black text-[#DFE2F3] tracking-tighter leading-none">{initialStoreName || 'My Shop'}</h1>
                    <span className="text-[10px] text-[#CDBDFF] font-bold tracking-[0.2em] opacity-40">GoDamm</span>
                  </div>
                  <button 
                    onClick={() => setIsEditingStore(true)}
                    className="p-1 rounded bg-white/5 opacity-0 group-hover/name:opacity-100 hover:bg-[#CDBDFF]/20 transition-all"
                  >
                    <Edit2 className="w-2.5 h-2.5 text-[#CDBDFF]" />
                  </button>
                </div>
              )}
           </div>
        </div>

        {/* Global Navigation */}
        <nav className="p-1.5 flex items-center gap-1 rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'text-[#17004b] z-10' 
                  : 'text-[#CBC3D9] opacity-40 hover:opacity-100'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#CDBDFF] rounded-xl -z-10 shadow-[0_0_15px_rgba(205,189,255,0.5)]"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              {tab.icon}
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* System Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            title={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl glass-card border-[rgba(255,255,255,0.05)] text-[#CBC3D9] hover:text-[#DFE2F3] hover:bg-white/5 transition-all duration-300"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#FDE047]" /> : <Moon className="w-4 h-4 text-[#60A5FA]" />}
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[0.2em]">
              {darkMode ? 'Light' : 'Dark'}
            </span>
          </button>
          
          <button
            onClick={onLogout}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[rgba(255,68,68,0.08)] border border-[rgba(255,68,68,0.15)] text-red-400 hover:bg-red-500 hover:text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};