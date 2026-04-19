import React, { useState } from 'react';
import { Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from './AuthLayout';

interface ForgotPasswordPageProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOtpRequested: () => void;
  onBackToLogin: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  darkMode,
  onToggleTheme,
  onOtpRequested,
  onBackToLogin,
}) => {
  const { startForgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await startForgotPassword(email);
      onOtpRequested();
    } catch (err: any) {
      setError(err.message || 'Unable to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your account email and we will send an OTP to reset your password."
      darkMode={darkMode}
      onToggleTheme={onToggleTheme}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[var(--on-surface)] uppercase tracking-tighter mb-1">Forgot Password</h2>
        <p className="text-xs text-[var(--on-surface-low)] opacity-80 uppercase tracking-[0.2em] font-bold">OTP will be sent to your email</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2 group">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--on-surface-low)] opacity-80 ml-1 group-focus-within:text-[#CDBDFF] transition-colors">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--on-surface-low)] opacity-60 group-focus-within:text-[#CDBDFF] group-focus-within:opacity-100 transition-all" />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              placeholder="owner@shop.com"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] focus:border-[#CDBDFF] focus:ring-1 focus:ring-[#CDBDFF]/20 outline-none text-[var(--on-surface)] font-bold tracking-wider placeholder:text-[var(--on-surface-low)] placeholder:opacity-60 transition-all"
            />
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
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#17004b] border-t-transparent rounded-full animate-spin"></div>
              SENDING OTP...
            </span>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              <span>SEND OTP</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full py-2 text-[var(--on-surface-low)] hover:text-[var(--on-surface)] transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="w-3 h-3" />
          BACK TO LOGIN
        </button>
      </form>
    </AuthLayout>
  );
};
