import React from 'react';
import { Moon, Sun, Shield, Store } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  darkMode: boolean;
  whiteLogoInDarkMode?: boolean;
  onToggleTheme: () => void;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  darkMode,
  whiteLogoInDarkMode = false,
  onToggleTheme,
  children,
}) => {
  return (
    <div className="auth-shell min-h-screen bg-[var(--bg-main)] text-[var(--on-surface)] selection:bg-[var(--primary)] selection:text-white flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Background Elements */}
      <div className="ambient-glow ambient-glow-primary absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#5D21DF] opacity-20 blur-[150px] animate-pulse pointer-events-none"></div>
      <div className="ambient-glow ambient-glow-secondary absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00E5FF] opacity-10 blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Brand & Visuals */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:block"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 glass-card border-[rgba(255,255,255,0.05)] mb-8">
             <Store className="w-5 h-5 text-[var(--primary)]" />
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">For Local Shops</span>
          </div>

          <div className="mb-6">
            <img
              src="/logo-full.png"
              alt="GoDamm logo"
              className="w-80 h-auto object-contain"
              style={darkMode && whiteLogoInDarkMode ? { filter: 'brightness(0) saturate(100%) invert(100%)' } : undefined}
            />
          </div>
          
          <h1 className="text-4xl font-black tracking-tight mb-3 text-[var(--on-surface)]">Inventory Management</h1>

          <p className="text-lg text-[var(--on-surface-low)] opacity-80 max-w-md font-medium leading-relaxed mb-8">
            {subtitle}
          </p>

          <div className="flex gap-4">
             <div className="h-12 w-12 rounded-2xl glass-card flex items-center justify-center border-[rgba(255,255,255,0.1)]">
                <Shield className="w-6 h-6 text-[var(--primary)]" />
             </div>
             <div className="space-y-1">
                <div className="text-xs font-bold text-[var(--on-surface)] uppercase tracking-wider">Secure Login</div>
                <div className="text-[10px] text-[var(--on-surface-low)] opacity-60 uppercase tracking-[0.15em]">Protected with OTP verification</div>
             </div>
          </div>
        </motion.div>

        {/* Right Side: Auth Card */}
        <div className="relative">
           {/* Decorative Outer Glow */}
           <div className="absolute -inset-4 bg-gradient-to-r from-[#CDBDFF] to-[#00E5FF] opacity-10 blur-3xl rounded-3xl group-hover:opacity-20 transition duration-1000 animate-pulse"></div>
           
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="glass-card p-10 border-[rgba(255,255,255,0.1)] relative overflow-hidden"
           >
             {/* Header inside card (Mobile visible) */}
             <div className="md:hidden mb-8">
                <h2 className="text-3xl font-black text-[#DFE2F3] uppercase tracking-tighter">{title}</h2>
             </div>
             
             <div className="absolute top-0 right-0 p-4">
                <button
                  onClick={onToggleTheme}
                  className="p-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(205,189,255,0.3)] transition-all"
                >
                  {darkMode ? <Sun className="w-4 h-4 text-[#FDE047]" /> : <Moon className="w-4 h-4 text-[#60A5FA]" />}
                </button>
             </div>

             <div className="relative z-10">
                {children}
             </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
};
