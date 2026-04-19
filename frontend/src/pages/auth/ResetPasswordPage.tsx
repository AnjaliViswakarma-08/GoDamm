import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from './AuthLayout';
import { PasswordFieldWithRules } from '../../components/auth/PasswordFieldWithRules';
import { evaluatePasswordRules } from '../../utils/passwordRules';

interface ResetPasswordPageProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onPasswordReset: () => void;
  onBackToLogin: () => void;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  darkMode,
  onToggleTheme,
  onPasswordReset,
  onBackToLogin,
}) => {
  const { resetForgotPassword, pendingEmail, otpFlow } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordRules = useMemo(() => evaluatePasswordRules(password), [password]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!passwordRules.isValid) {
      setError('Password does not meet the required rules.');
      return;
    }

    setLoading(true);

    try {
      await resetForgotPassword(password);
      onPasswordReset();
    } catch (err: any) {
      setError(err.message || 'Unable to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isReady = Boolean(pendingEmail) && otpFlow === 'forgot-password';

  return (
    <AuthLayout
      title="Set New Password"
      subtitle="Create a new strong password to secure your shop account."
      darkMode={darkMode}
      onToggleTheme={onToggleTheme}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[var(--on-surface)] uppercase tracking-tighter mb-1">Set New Password</h2>
        <p className="text-xs text-[var(--on-surface-low)] opacity-80 uppercase tracking-[0.2em] font-bold">Account: {pendingEmail || 'Unknown email'}</p>
      </div>

      {!isReady ? (
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-[rgba(255,68,68,0.1)] border border-[rgba(255,68,68,0.2)] text-red-400 text-center text-[10px] font-bold uppercase tracking-wider">
            Password reset session is missing or expired. Please request OTP again.
          </div>
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full py-2 text-[var(--on-surface-low)] hover:text-[var(--on-surface)] transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-3 h-3" />
            BACK TO LOGIN
          </button>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <PasswordFieldWithRules
            id="reset-password"
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
            className="btn-primary w-full flex items-center justify-center gap-2 group/btn disabled:opacity-30 disabled:grayscale disabled:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#17004b] border-t-transparent rounded-full animate-spin"></div>
                UPDATING PASSWORD...
              </span>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>SET PASSWORD</span>
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
      )}
    </AuthLayout>
  );
};
