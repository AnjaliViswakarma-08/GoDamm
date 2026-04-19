import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Barcode,
  BellRing,
  BookOpen,
  CheckCircle2,
  Moon,
  Package,
  ShieldCheck,
  Sun,
  XCircle,
} from 'lucide-react';

interface LandingPageProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onGoToLogin: () => void;
  onGoToRegister: () => void;
}

type WarehouseStep = {
  step: string;
  title: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
};

const warehouseSteps: WarehouseStep[] = [
  {
    step: '01',
    title: 'Easy Stock Entry',
    summary: 'Scan barcode, update quantity, done in seconds.',
    icon: Barcode,
    tone: 'from-[#1D4E89]/30 to-[#1F7C58]/20',
  },
  {
    step: '02',
    title: 'Low Stock Alerts',
    summary: 'Get notified before fast-selling items run out.',
    icon: BellRing,
    tone: 'from-[#1D4E89]/25 to-[#58DCA8]/20',
  },
  {
    step: '03',
    title: 'Daily Sales Summary',
    summary: 'See daily sale and margin without manual math.',
    icon: BookOpen,
    tone: 'from-[#2866B0]/25 to-[#2CA772]/20',
  },
];

const oldWayPoints = [
  'Stock count checked from old notebook pages',
  'Manual calculations lead to avoidable mistakes',
  'No clear signal before key items go out of stock',
  'Sales trend is hard to understand quickly',
];

const newWayPoints = [
  'Live stock count visible for owner and staff',
  'Low-stock warnings show what to reorder first',
  'Daily summary gives fast business clarity',
  'Secure record stays available whenever needed',
];

const OrbitChip: React.FC<{
  className: string;
  icon: React.ReactNode;
  label: string;
  counterSpin?: { duration: number; parentClockwise: boolean };
}> = ({ className, icon, label, counterSpin }) => {
  const counterRotate = counterSpin ? (counterSpin.parentClockwise ? -360 : 360) : 0;

  return (
    <div className={`absolute ${className}`}>
      <motion.div
        className="px-3 py-1.5 rounded-xl border border-[var(--lp-orbit-chip-border)] bg-[var(--lp-orbit-chip-bg)] backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.18)] flex items-center gap-2"
        animate={counterSpin ? { rotate: counterRotate } : undefined}
        transition={
          counterSpin
            ? {
                repeat: Infinity,
                duration: counterSpin.duration,
                ease: 'linear',
              }
            : undefined
        }
      >
        <span className="text-[var(--lp-orbit-chip-icon)]">{icon}</span>
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.08em] uppercase text-[var(--on-surface)] whitespace-nowrap">
          {label}
        </span>
      </motion.div>
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({
  darkMode,
  onToggleTheme,
  onGoToLogin,
  onGoToRegister,
}) => {
  const themeVars = {
    '--lp-accent-blue': darkMode ? '#65B3FF' : '#0E7490',
    '--lp-accent-green': darkMode ? '#58DCA8' : '#166534',
    '--lp-accent-soft': darkMode ? '#4DE0A0' : '#166534',
    '--lp-badge-bg': darkMode ? 'rgba(30,122,85,0.10)' : 'rgba(22,101,52,0.10)',
    '--lp-badge-border': darkMode ? 'rgba(30,122,85,0.30)' : 'rgba(22,101,52,0.26)',
    '--lp-card-border': darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.12)',
    '--lp-orbit-chip-border': darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.16)',
    '--lp-orbit-chip-bg': darkMode ? 'rgba(20,24,38,0.82)' : 'rgba(255,255,255,0.92)',
    '--lp-orbit-chip-icon': darkMode ? '#CBD5E1' : '#334155',
    '--lp-orbit-ring': darkMode ? 'rgba(148,163,184,0.30)' : 'rgba(100,116,139,0.28)',
    '--lp-orbit-dash': darkMode ? 'rgba(148,163,184,0.35)' : 'rgba(100,116,139,0.32)',
    '--lp-orbit-dot': darkMode ? '#94A3B8' : '#475569',
    '--lp-orbit-glow': darkMode ? 'rgba(148,163,184,0.26)' : 'rgba(100,116,139,0.22)',
    '--lp-orbit-core-glow': darkMode ? 'rgba(148,163,184,0.24)' : 'rgba(100,116,139,0.20)',
    '--lp-orbit-halo-a': darkMode ? 'rgba(148,163,184,0.28)' : 'rgba(100,116,139,0.24)',
    '--lp-orbit-halo-b': darkMode ? 'rgba(148,163,184,0.16)' : 'rgba(100,116,139,0.14)',
    '--lp-ring-blue': darkMode ? 'rgba(101,183,255,0.35)' : 'rgba(14,116,144,0.30)',
    '--lp-ring-green': darkMode ? 'rgba(88,220,168,0.35)' : 'rgba(22,101,52,0.30)',
    '--lp-hero-glow-a': darkMode ? '#1E4C86' : '#0E7490',
    '--lp-hero-glow-b': darkMode ? '#1E7A55' : '#15803D',
    '--lp-line-start': darkMode ? 'rgba(29,78,137,0.78)' : 'rgba(14,116,144,0.75)',
    '--lp-line-mid': darkMode ? 'rgba(88,220,168,0.95)' : 'rgba(22,101,52,0.86)',
    '--lp-line-end': darkMode ? 'rgba(29,78,137,0.78)' : 'rgba(14,116,144,0.75)',
    '--lp-step-chip-bg': darkMode ? 'rgba(30,76,134,0.20)' : 'rgba(14,116,144,0.12)',
    '--lp-step-chip-border': darkMode ? 'rgba(30,76,134,0.30)' : 'rgba(14,116,144,0.25)',
    '--lp-step-icon-bg': darkMode ? 'rgba(30,76,134,0.15)' : 'rgba(14,116,144,0.10)',
    '--lp-step-icon-border': darkMode ? 'rgba(30,76,134,0.20)' : 'rgba(14,116,144,0.20)',
    '--lp-step-number': darkMode ? '#7CC4FF' : '#0E7490',
    '--lp-final-grad-a': darkMode ? 'rgba(14,52,96,0.55)' : 'rgba(14,116,144,0.78)',
    '--lp-final-grad-b': darkMode ? 'rgba(22,88,64,0.5)' : 'rgba(21,128,61,0.72)',
    '--lp-final-glow-a': darkMode ? 'rgba(101,179,255,0.20)' : 'rgba(14,116,144,0.28)',
    '--lp-final-glow-b': darkMode ? 'rgba(88,220,168,0.20)' : 'rgba(22,101,52,0.28)',
    '--lp-final-panel-bg': darkMode ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.90)',
    '--lp-final-panel-border': darkMode ? 'rgba(255,255,255,0.20)' : 'rgba(14,116,144,0.24)',
    '--lp-final-panel-heading': darkMode ? '#FFFFFF' : '#0F172A',
    '--lp-final-panel-text': darkMode ? 'rgba(255,255,255,0.90)' : '#1E293B',
    '--lp-final-check': darkMode ? '#9AF0CA' : '#166534',
    '--lp-final-primary-bg': darkMode ? '#FFFFFF' : '#0E7490',
    '--lp-final-primary-text': darkMode ? '#0D2C51' : '#FFFFFF',
    '--lp-final-secondary-bg': darkMode ? 'rgba(255,255,255,0.10)' : 'rgba(14,116,144,0.08)',
    '--lp-final-secondary-border': darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(14,116,144,0.24)',
    '--lp-final-secondary-text': darkMode ? '#FFFFFF' : '#0F172A',
  } as React.CSSProperties;

  return (
    <div
      className="landing-page min-h-screen bg-[var(--bg-main)] text-[var(--on-surface)] relative overflow-x-hidden transition-colors duration-500"
      style={themeVars}
    >
      <div
        className="ambient-glow ambient-glow-primary fixed top-[-20%] left-[-10%] w-[55%] h-[55%] opacity-20 blur-[130px] pointer-events-none"
        style={{ backgroundColor: 'var(--lp-hero-glow-a)' }}
      />
      <div
        className="ambient-glow ambient-glow-secondary fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] opacity-20 blur-[140px] pointer-events-none"
        style={{ backgroundColor: 'var(--lp-hero-glow-b)' }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-4 pointer-events-none bg-[var(--bg-main)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 pointer-events-auto">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left"
          >
            <div className="logo-container group cursor-pointer">
              <img
                src="/logo.png"
                alt="Godamm logo"
                className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
            </div>
            <div className="hidden min-[380px]:block">
              <p className="text-[11px] sm:text-xs font-black text-[var(--on-surface)] tracking-tight">GoDamm</p>
              <p className="hidden sm:block text-[10px] text-[var(--on-surface-low)] uppercase tracking-[0.18em] opacity-70">
                Warehouse
              </p>
            </div>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={onToggleTheme}
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              title={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              className="flex items-center justify-center w-10 h-10 rounded-2xl glass-card border-[rgba(255,255,255,0.05)] text-[var(--on-surface-low)] hover:text-[var(--on-surface)] hover:bg-white/5 transition-all duration-300"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#FDE047]" /> : <Moon className="w-4 h-4 text-[#60A5FA]" />}
            </button>
            <button
              onClick={onGoToLogin}
              className="px-3 sm:px-5 py-2.5 rounded-2xl border border-[var(--border)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--on-surface)] hover:bg-white/5 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={onGoToRegister}
              className="group inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#1E4C86] to-[#1E7A55] text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-all shadow-[0_10px_30px_rgba(30,76,134,0.35)] hover:shadow-[0_12px_36px_rgba(30,122,85,0.35)]"
            >
              Register
              <ArrowRight className="hidden min-[380px]:block w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-28 sm:pt-32 pb-14">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_440px] gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="space-y-7"
            >
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-badge-border)] bg-[var(--lp-badge-bg)] px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[var(--lp-accent-soft)]">
                 Dukkan walo ka apna GoDaam
              </span>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight tracking-[-0.03em] text-[var(--on-surface)]">
                  Peace of mind for stock. More time for your customers.
                </h1>
                <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--on-surface-low)]">
                  GoDaam helps you track inventory, spot low-stock items, and read daily sales clearly without
                  notebook confusion.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={onGoToRegister}
                  className="group inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1D4E89] to-[#1F7C58] text-sm font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(29,78,137,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  Start Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onGoToLogin}
                  className="inline-flex justify-center items-center px-6 py-3.5 rounded-2xl border border-[var(--border)] text-sm font-bold uppercase tracking-[0.14em] text-[var(--on-surface)] hover:bg-white/5 transition-all"
                >
                  Already have account? Sign In
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="glass-card px-4 py-4 border-[var(--lp-card-border)]">
                  <p className="text-xs uppercase tracking-[0.13em] text-[var(--on-surface-low)]">Stock clarity</p>
                  <p className="mt-1 text-xl font-black text-[var(--on-surface)]">Live count</p>
                  <p className="text-xs text-[var(--on-surface-low)]">Know what is available instantly</p>
                </div>
                <div className="glass-card px-4 py-4 border-[var(--lp-card-border)]">
                  <p className="text-xs uppercase tracking-[0.13em] text-[var(--on-surface-low)]">Reorder speed</p>
                  <p className="mt-1 text-xl font-black text-[var(--on-surface)]">Faster</p>
                  <p className="text-xs text-[var(--on-surface-low)]">Low-stock alert before shelves go empty</p>
                </div>
                <div className="glass-card px-4 py-4 border-[var(--lp-card-border)]">
                  <p className="text-xs uppercase tracking-[0.13em] text-[var(--on-surface-low)]">Daily closing</p>
                  <p className="mt-1 text-xl font-black text-[var(--on-surface)]">Less stress</p>
                  <p className="text-xs text-[var(--on-surface-low)]">No manual sale and margin calculation</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="relative"
            >
              <div className="relative mx-auto w-full max-w-[430px] aspect-square">
                <div
                  className="absolute -inset-10 rounded-full blur-3xl opacity-60"
                  style={{ background: 'radial-gradient(circle, var(--lp-orbit-glow) 0%, transparent 62%)' }}
                />

                <motion.div
                  className="absolute -inset-2 rounded-full opacity-45 blur-lg"
                  style={{
                    background:
                      'conic-gradient(from 90deg, var(--lp-orbit-halo-a), transparent 26%, var(--lp-orbit-halo-b) 50%, transparent 78%, var(--lp-orbit-halo-a))',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
                />

                <div className="absolute inset-0 rounded-full border border-[var(--lp-orbit-ring)]" />

                <motion.div
                  className="absolute inset-[12%] rounded-full border border-dashed border-[var(--lp-orbit-dash)]"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 26, ease: 'linear' }}
                />

                <motion.div
                  className="absolute inset-[12%] rounded-full border border-[var(--lp-orbit-ring)] z-[2]"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                >
                  <OrbitChip
                    className="-top-3 left-1/2 -translate-x-1/2"
                    icon={<Barcode className="w-3.5 h-3.5" />}
                    label="Stock In"
                    counterSpin={{ duration: 18, parentClockwise: true }}
                  />
                  <OrbitChip
                    className="top-1/2 -right-7 -translate-y-1/2"
                    icon={<BellRing className="w-3.5 h-3.5" />}
                    label="Alert"
                    counterSpin={{ duration: 18, parentClockwise: true }}
                  />
                  <OrbitChip
                    className="-bottom-3 left-1/2 -translate-x-1/2"
                    icon={<BookOpen className="w-3.5 h-3.5" />}
                    label="Summary"
                    counterSpin={{ duration: 18, parentClockwise: true }}
                  />
                  <OrbitChip
                    className="top-1/2 -left-7 -translate-y-1/2"
                    icon={<ShieldCheck className="w-3.5 h-3.5" />}
                    label="Secure"
                    counterSpin={{ duration: 18, parentClockwise: true }}
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-[-2%] rounded-full border border-dashed border-[var(--lp-orbit-dash)] z-[3]"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                >
                  <OrbitChip
                    className="-top-3 left-1/2 -translate-x-1/2"
                    icon={<Package className="w-3.5 h-3.5" />}
                    label="Reorder"
                    counterSpin={{ duration: 14, parentClockwise: false }}
                  />
                  <OrbitChip
                    className="bottom-[8%] right-[8%]"
                    icon={<BellRing className="w-3.5 h-3.5" />}
                    label="Fast"
                    counterSpin={{ duration: 14, parentClockwise: false }}
                  />
                  <OrbitChip
                    className="bottom-[8%] left-[8%]"
                    icon={<BookOpen className="w-3.5 h-3.5" />}
                    label="Daily"
                    counterSpin={{ duration: 14, parentClockwise: false }}
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-[30%] rounded-full border border-[var(--lp-orbit-ring)]"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0.25, 0.7] }}
                  transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex flex-col items-center justify-center">
                    <div
                      className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full blur-2xl opacity-45"
                      style={{
                        background:
                          'radial-gradient(circle, var(--lp-orbit-core-glow) 0%, transparent 70%)',
                      }}
                    />
                    <img
                      src="/logo-full.png"
                      alt="GoDaam core"
                      className="relative w-40 sm:w-44 max-w-[72%] h-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.30)]"
                      style={darkMode ? { filter: 'brightness(0) saturate(100%) invert(100%)' } : undefined}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--lp-accent-blue)]">Apne GoDamm ka Malik</p>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight text-[var(--on-surface)]">
              From shelf to sale to reorder, every move is visible.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--on-surface-low)] leading-relaxed">
              A cleaner operational flow your team can follow quickly during rush hours.
            </p>
          </motion.div>

          <div className="relative mt-10">
            <div
              className="pointer-events-none absolute left-16 right-16 top-[76px] hidden lg:block h-[2px] opacity-70"
              style={{
                background:
                  'linear-gradient(90deg, var(--lp-line-start), var(--lp-line-mid), var(--lp-line-end))',
              }}
            />

            <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
              {warehouseSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    key={step.step}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${step.tone}`} />
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--lp-step-chip-bg)] border border-[var(--lp-step-chip-border)] text-[var(--lp-step-number)] text-xs font-black tracking-[0.14em]">
                      {step.step}
                    </div>
                    <div className="mt-4 flex items-start gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[var(--lp-step-icon-bg)] border border-[var(--lp-step-icon-border)] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[var(--lp-accent-blue)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black tracking-tight text-[var(--on-surface)]">{step.title}</h3>
                        <p className="mt-2 text-sm text-[var(--on-surface-low)] leading-relaxed">{step.summary}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--lp-accent-green)]">Old way vs new way</p>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight text-[var(--on-surface)]">
              Move from notebook guesswork to trusted daily control.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-5 mt-10">
            <motion.article
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="glass-card p-6 border-[var(--lp-card-border)]"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-red-400">Old way</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-[var(--on-surface)]">Notebook and memory</h3>
              <ul className="mt-5 space-y-3">
                {oldWayPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[var(--on-surface-low)] leading-relaxed">
                    <XCircle className="w-4 h-4 mt-0.5 text-red-400 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="glass-card p-6 border-[rgba(86,221,168,0.35)]"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#6EE7B7]">New way</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-[var(--on-surface)]">Apna GoDaam system</h3>
              <ul className="mt-5 space-y-3">
                {newWayPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[var(--on-surface-low)] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#6EE7B7] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[2.25rem] border border-[var(--border)]"
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, var(--lp-final-grad-a), var(--lp-final-grad-b))',
              }}
            />
            <div
              className="absolute -top-16 -right-10 w-64 h-64 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--lp-final-glow-a)' }}
            />
            <div
              className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--lp-final-glow-b)' }}
            />

            <div className="relative z-10 p-7 sm:p-10 lg:p-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B5E0FF]">Classic, clean, dependable</p>
                <h2 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight text-white">
                  Give your shop a smarter system that still feels simple.
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
                  Start with your existing products, set low-stock limits, and get better daily control without changing
                  how your shop works.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white/95">
                  <Package className="w-4 h-4" />
                  Built for real local stores, not complex enterprise setups.
                </div>
              </div>

              <div
                className="p-5 sm:p-6 rounded-3xl border backdrop-blur-xl"
                style={{
                  backgroundColor: 'var(--lp-final-panel-bg)',
                  borderColor: 'var(--lp-final-panel-border)',
                  boxShadow: darkMode
                    ? '0 18px 45px rgba(0,0,0,0.22)'
                    : '0 16px 36px rgba(14,116,144,0.16)',
                }}
              >
                <h3 className="text-lg font-black tracking-tight" style={{ color: 'var(--lp-final-panel-heading)' }}>
                  Why users switch
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm" style={{ color: 'var(--lp-final-panel-text)' }}>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--lp-final-check)' }} />
                    <span>Simple interface for owner and staff.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--lp-final-check)' }} />
                    <span>Clear low-stock and sale insights daily.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--lp-final-check)' }} />
                    <span>Secure records with less manual error.</span>
                  </li>
                </ul>

                <div className="mt-6 space-y-2.5">
                  <button
                    onClick={onGoToRegister}
                    className="w-full group inline-flex justify-center items-center gap-2 px-6 py-3 rounded-2xl text-sm font-extrabold uppercase tracking-[0.14em] transition-all"
                    style={{
                      backgroundColor: 'var(--lp-final-primary-bg)',
                      color: 'var(--lp-final-primary-text)',
                      boxShadow: darkMode
                        ? '0 10px 30px rgba(255,255,255,0.25)'
                        : '0 10px 30px rgba(14,116,144,0.30)',
                    }}
                  >
                    Start Free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={onGoToLogin}
                    className="w-full inline-flex justify-center items-center px-6 py-3 rounded-2xl border text-sm font-bold uppercase tracking-[0.14em] transition-all"
                    style={{
                      borderColor: 'var(--lp-final-secondary-border)',
                      backgroundColor: 'var(--lp-final-secondary-bg)',
                      color: 'var(--lp-final-secondary-text)',
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 text-center relative z-10">
        <div className="inline-flex items-center px-4 py-2 glass-card text-[10px] sm:text-xs text-[var(--on-surface-low)] opacity-70 border-[rgba(255,255,255,0.03)]">
          GoDamm - Made in Love  - An Inventory Management System
        </div>
      </footer>
    </div>
  );
};
