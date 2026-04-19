import { motion } from "framer-motion";

interface ArchFlowStepProps {
  icon: string;
  label: string;
  sublabel?: string;
  color: string;
  index: number;
  isLast?: boolean;
}

export default function ArchFlowStep({
  icon,
  label,
  sublabel,
  color,
  index,
  isLast = false,
}: ArchFlowStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="flex flex-col items-center relative group"
    >
      {/* Node */}
      <motion.div
        whileHover={{
          scale: 1.1,
          boxShadow: `0 0 30px 8px ${color}30`,
        }}
        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl border transition-all duration-300 cursor-default"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          borderColor: `${color}30`,
          boxShadow: `0 0 15px 2px ${color}10`,
        }}
      >
        {icon}
      </motion.div>

      {/* Label */}
      <span className="mt-3 text-xs md:text-sm font-semibold text-white/90 text-center">
        {label}
      </span>
      {sublabel && (
        <span className="text-[10px] text-slate-500 text-center mt-0.5">
          {sublabel}
        </span>
      )}

      {/* Arrow connector */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.4 }}
          className="w-px h-8 md:h-10 mt-2 origin-top"
          style={{
            background: `linear-gradient(180deg, ${color}60, transparent)`,
          }}
        />
      )}
    </motion.div>
  );
}
