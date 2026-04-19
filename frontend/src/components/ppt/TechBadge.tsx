import { motion } from "framer-motion";

interface TechBadgeProps {
  label: string;
  icon?: string;
  color?: string;
  delay?: number;
}

export default function TechBadge({
  label,
  icon,
  color = "#BDF4FF",
  delay = 0,
}: TechBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, type: "spring" }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border bg-white/[0.02] backdrop-blur-md cursor-default transition-all duration-300"
      style={{
        borderColor: `${color}20`,
      }}
    >
      {icon && <span className="text-sm">{icon}</span>}
      <span className="text-xs font-semibold" style={{ color }}>
        {label}
      </span>
    </motion.div>
  );
}
