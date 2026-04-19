import React, { useState } from 'react';
import { Fingerprint, ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from './AuthLayout';

interface ForgotPasswordOtpPageProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onVerified: () => void;
  onBackToForgotPassword: () => void;
}

export const ForgotPasswordOtpPage: React.FC<ForgotPasswordOtpPageProps> = ({
  darkMode,
  onToggleTheme,
  onVerified,
  onBackToForgotPassword,
}) => {
  const { verifyOtp, pendingEmail, otpFlow } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyOtp(otp);
      onVerified();
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isReady = Boolean(pendingEmail) && otpFlow === 'forgot-password';

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle={`Enter the 6-digit OTP sent to ${pendingEmail || 'your email'} to continue.`}
      darkMode={darkMode}
      onToggleTheme={onToggleTheme}
    >
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(205,189,255,0.05)] border border-[rgba(205,189,255,0.1)] mb-4 relative group">
          <div className="absolute inset-0 bg-[#CDBDFF] opacity-10 blur-xl rounded-full group-hover:opacity-20 transition-opacity"></div>
          <Fingerprint className="w-8 h-8 text-[#CDBDFF] relative z-10" />
        </div>
        <h2 className="text-3xl font-black text-[var(--on-surface)] uppercase tracking-tighter mb-1">Verify OTP</h2>
        <p className="text-xs text-[var(--on-surface-low)] opacity-80 uppercase tracking-[0.2em] font-bold">Password reset verification</p>
      </div>

      {!isReady ? (
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-[rgba(255,68,68,0.1)] border border-[rgba(255,68,68,0.2)] text-red-400 text-center text-[10px] font-bold uppercase tracking-wider">
            No OTP request found. Please request OTP again.
          </div>
          <button
            type="button"
            onClick={onBackToForgotPassword}
            className="w-full py-2 text-[var(--on-surface-low)] hover:text-[var(--on-surface)] transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-3 h-3" />
            BACK TO FORGOT PASSWORD
          </button>
        </div>
      ) : (
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-3 group">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--on-surface-low)] opacity-80 text-center block w-full">6-DIGIT OTP</label>
            <div className="relative flex justify-center">
              <input
                value={otp}
                onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                maxLength={6}
                pattern="\d{6}"
                placeholder="000000"
                className="w-full sm:w-64 py-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl focus:border-[#CDBDFF] focus:ring-1 focus:ring-[#CDBDFF]/20 outline-none text-[var(--on-surface)] text-4xl font-black tracking-[0.5em] text-center placeholder:text-[var(--on-surface-low)] placeholder:opacity-60 transition-all"
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#CDBDFF] to-transparent opacity-20 blur-sm"></div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-[rgba(255,68,68,0.1)] border border-[rgba(255,68,68,0.2)] text-red-400 text-center text-[10px] font-bold uppercase tracking-wider">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              disabled={loading || otp.length < 6}
              className="btn-primary w-full flex items-center justify-center gap-2 group/btn disabled:opacity-30 disabled:grayscale disabled:scale-100"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  <span>VERIFY OTP</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBackToForgotPassword}
              className="w-full py-2 text-[var(--on-surface-low)] hover:text-[var(--on-surface)] transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <ArrowLeft className="w-3 h-3" />
              BACK TO FORGOT PASSWORD
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};
