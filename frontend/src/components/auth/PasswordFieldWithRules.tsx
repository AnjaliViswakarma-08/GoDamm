import React, { useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { evaluatePasswordRules } from '../../utils/passwordRules';

interface PasswordFieldWithRulesProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}

const ruleLabels = [
  { key: 'hasMinLength', label: 'At least 8 characters' },
  { key: 'hasUppercase', label: 'One uppercase letter' },
  { key: 'hasLowercase', label: 'One lowercase letter' },
  { key: 'hasNumber', label: 'One number' },
  { key: 'hasSpecial', label: 'One special character' },
] as const;

export const PasswordFieldWithRules: React.FC<PasswordFieldWithRulesProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const rules = useMemo(() => evaluatePasswordRules(value), [value]);

  return (
    <div className="space-y-3">
      <label htmlFor={id} className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--on-surface-low)] opacity-80 ml-1">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] focus:border-[#BDF4FF] focus:ring-1 focus:ring-[#BDF4FF]/20 outline-none text-[var(--on-surface)] font-bold tracking-wider placeholder:text-[var(--on-surface-low)] placeholder:opacity-60 transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--on-surface-low)] hover:text-[var(--on-surface)] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          title={showPassword ? 'Hide password' : 'Show password'}
          disabled={disabled}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[rgba(148,163,184,0.12)] p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {ruleLabels.map((rule) => {
            const passed = rules[rule.key];

            return (
              <div key={rule.key} className="flex items-center gap-2 text-sm">
                <span className={`w-2.5 h-2.5 rounded-full border ${passed ? 'bg-emerald-500 border-emerald-500' : 'border-[var(--on-surface-low)] opacity-80'}`} />
                <span className={passed ? 'text-emerald-500 font-semibold' : 'text-[var(--on-surface-low)]'}>{rule.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
