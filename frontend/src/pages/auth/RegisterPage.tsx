import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from './AuthLayout';
import { Mail, Store, LogIn, Sparkles } from 'lucide-react';
import { PasswordFieldWithRules } from '../../components/auth/PasswordFieldWithRules';
import { evaluatePasswordRules } from '../../utils/passwordRules';

interface RegisterPageProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onRegistered: () => void;
  onGoToLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ darkMode, onToggleTheme, onRegistered, onGoToLogin }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRules = useMemo(() => evaluatePasswordRules(password), [password]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!passwordRules.isValid) {
      setError('Please set a stronger password before creating account.');
      return;
    }

    setLoading(true);
    try {
      await register({ email, storeName, password });
      onRegistered();
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your shop account in a few easy steps."
      darkMode={darkMode}
      whiteLogoInDarkMode
      onToggleTheme={onToggleTheme}
    >
      <div className="mb-8">
         <h2 className="text-3xl font-black text-[var(--on-surface)] uppercase tracking-tighter mb-1">Create Account</h2>
         <p className="text-xs text-[var(--on-surface-low)] opacity-80 uppercase tracking-[0.2em] font-bold">Start managing your shop</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2 group">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--on-surface-low)] opacity-80 ml-1 group-focus-within:text-[#BDF4FF] transition-colors">Email</label>
          <div className="relative">
             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--on-surface-low)] opacity-60 group-focus-within:text-[#BDF4FF] group-focus-within:opacity-100 transition-all" />
             <input 
               value={email} 
               onChange={e => setEmail(e.target.value)} 
               type="email" 
               required 
               placeholder="owner@shop.com"
               className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] focus:border-[#BDF4FF] focus:ring-1 focus:ring-[#BDF4FF]/20 outline-none text-[var(--on-surface)] font-bold tracking-wider placeholder:text-[var(--on-surface-low)] placeholder:opacity-60 transition-all" 
             />
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--on-surface-low)] opacity-80 ml-1 group-focus-within:text-[#BDF4FF] transition-colors">Shop Name</label>
          <div className="relative">
             <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--on-surface-low)] opacity-60 group-focus-within:text-[#BDF4FF] group-focus-within:opacity-100 transition-all" />
             <input 
               value={storeName} 
               onChange={e => setStoreName(e.target.value)} 
               required 
               placeholder="Anjan Kirana Store"
               className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] focus:border-[#BDF4FF] focus:ring-1 focus:ring-[#BDF4FF]/20 outline-none text-[var(--on-surface)] font-bold tracking-wider placeholder:text-[var(--on-surface-low)] placeholder:opacity-60 transition-all" 
             />
          </div>
        </div>

        <PasswordFieldWithRules
          id="register-password"
          label="Create Password"
          value={password}
          onChange={(nextPassword) => {
            setPassword(nextPassword);
            if (error) {
              setError('');
            }
          }}
          placeholder="Create a strong password"
          required
          autoComplete="new-password"
          disabled={loading}
        />

        {error && (
          <div className="p-3 rounded-lg bg-[rgba(255,68,68,0.1)] border border-[rgba(255,68,68,0.2)] text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></div>
             {error}
          </div>
        )}

        <button 
          disabled={loading || !passwordRules.isValid} 
          className="btn-primary w-full flex items-center justify-center gap-2 group/btn !from-[#BDF4FF] !to-[#00A3BF] !text-[#002A30]"
          style={{ boxShadow: '0 0 20px rgba(189, 244, 255, 0.4)' }}
        >
          {loading ? (
             <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#002A30] border-t-transparent rounded-full animate-spin"></div>
               CREATING ACCOUNT...
             </span>
          ) : (
            <>
               <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
              <span>CREATE ACCOUNT</span>
            </>
          )}
        </button>

        <button 
          type="button" 
          onClick={onGoToLogin} 
          className="w-full py-2 text-[var(--on-surface-low)] hover:text-[var(--on-surface)] transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          <LogIn className="w-3 h-3" />
          BACK TO LOGIN
        </button>
      </form>
    </AuthLayout>
  );
};
