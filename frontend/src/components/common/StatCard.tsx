import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'amber' | 'red';
}

const colorStyles = {
  blue: {
    glow: 'rgba(205, 189, 255, 0.3)',
    icon: 'text-[#CDBDFF]',
    accent: 'bg-[#CDBDFF]'
  },
  green: {
    glow: 'rgba(189, 244, 255, 0.3)',
    icon: 'text-[#BDF4FF]',
    accent: 'bg-[#BDF4FF]'
  },
  amber: {
    glow: 'rgba(253, 224, 71, 0.3)',
    icon: 'text-[#FDE047]',
    accent: 'bg-[#FDE047]'
  },
  red: {
    glow: 'rgba(255, 171, 243, 0.3)',
    icon: 'text-[#FFABF3]',
    accent: 'bg-[#FFABF3]'
  }
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  const styles = colorStyles[color];

  return (
    <div 
      className="glass-card p-6 relative group overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:border-[rgba(255,255,255,0.15)]"
      style={{ boxShadow: `0 0 20px ${styles.glow}` }}
    >
      {/* Background Accent Blur */}
      <div className={`absolute -right-4 -top-4 w-16 h-16 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${styles.accent}`}></div>
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#CBC3D9] opacity-60 mb-2 font-bold">{title}</p>
          <p className={`text-3xl font-black tracking-tighter ${styles.icon} drop-shadow-[0_0_8px_${styles.glow}]`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] ${styles.icon} group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {/* Progress Bar (Visual Only for Aesthetics) */}
      <div className="mt-6 h-1 w-full bg-[rgba(255,255,255,0.03)] rounded-full overflow-hidden">
        <div 
          className={`h-full opacity-60 rounded-full ${styles.accent}`}
          style={{ width: '65%', boxShadow: `0 0 10px ${styles.glow}` }}
        ></div>
      </div>
    </div>
  );
};