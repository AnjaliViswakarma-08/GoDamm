import { motion } from "framer-motion";

interface FlowStepProps {
  step: string;
  title: string;
  code?: string;
  description?: string;
  accentColor?: string;
}

export default function FlowStep({
  step,
  title,
  code,
  description,
  accentColor = "#06B6D4",
}: FlowStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex items-start gap-5 group"
    >
      {/* Connector line */}
      <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />

      {/* Step badge */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white relative z-10"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
          boxShadow: `0 0 20px 3px ${accentColor}30`,
        }}
      >
        {step}
      </motion.div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-200 transition-colors duration-300">
          {title}
        </div>
        {description && (
          <p className="text-slate-400 text-sm mb-2">{description}</p>
        )}
        {code && (
          <motion.pre
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="bg-black/50 border border-white/[0.06] rounded-xl p-4 text-cyan-300/90 text-xs overflow-x-auto mt-2 font-mono leading-relaxed"
            style={{
              boxShadow: `inset 0 0 30px ${accentColor}05`,
            }}
          >
            {code}
          </motion.pre>
        )}
      </div>
    </motion.div>
  );
}
