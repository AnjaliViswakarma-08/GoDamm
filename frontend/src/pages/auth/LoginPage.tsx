import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from './AuthLayout';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';

interface LoginPageProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onGoToRegister: () => void;
  onGoToForgotPassword: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  darkMode,
  onToggleTheme,
  onGoToRegister,
  onGoToForgotPassword,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Use your email and password to open your shop dashboard."
      darkMode={darkMode}
      whiteLogoInDarkMode
      onToggleTheme={onToggleTheme}
    >
      <div className="mb-8">
         <h2 className="text-3xl font-black text-[var(--on-surface)] uppercase tracking-tighter mb-1">Welcome Back</h2>
         <p className="text-xs text-[var(--on-surface-low)] opacity-80 uppercase tracking-[0.2em] font-bold">Login to continue</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2 group">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--on-surface-low)] opacity-80 ml-1 group-focus-within:text-[#CDBDFF] transition-colors">Email</label>
          <div className="relative">
             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--on-surface-low)] opacity-60 group-focus-within:text-[#CDBDFF] group-focus-within:opacity-100 transition-all" />
             <input 
               value={email} 
               onChange={e => setEmail(e.target.value)} 
               type="email" 
               required 
               placeholder="owner@shop.com"
               className="w-full pl-12 pr-4 py-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] focus:border-[#CDBDFF] focus:ring-1 focus:ring-[#CDBDFF]/20 outline-none text-[var(--on-surface)] font-bold tracking-wider placeholder:text-[var(--on-surface-low)] placeholder:opacity-60 transition-all" 
             />
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--on-surface-low)] opacity-80 ml-1 group-focus-within:text-[#CDBDFF] transition-colors">Password</label>
          <div className="relative">
             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--on-surface-low)] opacity-60 group-focus-within:text-[#CDBDFF] group-focus-within:opacity-100 transition-all" />
             <input 
               value={password} 
               onChange={e => setPassword(e.target.value)} 
               type="password" 
               required 
               placeholder="••••••••"
               className="w-full pl-12 pr-4 py-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] focus:border-[#CDBDFF] focus:ring-1 focus:ring-[#CDBDFF]/20 outline-none text-[var(--on-surface)] font-bold tracking-wider placeholder:text-[var(--on-surface-low)] placeholder:opacity-60 transition-all" 
             />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onGoToForgotPassword}
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--on-surface-low)] hover:text-[var(--on-surface)] transition-colors"
            >
              FORGOT PASSWORD?
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-[rgba(255,68,68,0.1)] border border-[rgba(255,68,68,0.2)] text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></div>
             {error}
          </div>
        )}

        <button 
          disabled={loading} 
          className="btn-primary w-full flex items-center justify-center gap-2 group/btn"
        >
          {loading ? (
             <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#17004b] border-t-transparent rounded-full animate-spin"></div>
               SIGNING IN...
             </span>
          ) : (
            <>
               <LogIn className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              <span>SIGN IN</span>
            </>
          )}
        </button>

        <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[rgba(255,255,255,0.05)]"></div>
            <span className="flex-shrink mx-4 text-[10px] font-bold text-[#CBC3D9] opacity-20 uppercase tracking-[0.3em]">OR</span>
            <div className="flex-grow border-t border-[rgba(255,255,255,0.05)]"></div>
        </div>

        <button 
          type="button" 
          onClick={onGoToRegister} 
          className="w-full py-4 rounded-xl border border-[rgba(255,255,255,0.05)] text-[var(--on-surface-low)] hover:text-[var(--on-surface)] hover:bg-[rgba(255,255,255,0.02)] transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
        >
          <UserPlus className="w-4 h-4" />
          CREATE NEW ACCOUNT
        </button>
      </form>
    </AuthLayout>
  );
};
