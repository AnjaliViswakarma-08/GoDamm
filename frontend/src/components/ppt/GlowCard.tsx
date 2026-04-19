import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface GlowCardProps {
  title: string;
  description: string;
  link: string;
  icon?: string;
  accentColor?: string;
  delay?: number;
}

export default function GlowCard({
  title,
  description,
  link,
  icon,
  accentColor = "#BDF4FF",
  delay = 0,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      whileHover={{
        scale: 1.04,
        y: -8,
      }}
      className="relative group"
    >
      {/* Hover glow explosion */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `radial-gradient(circle, ${accentColor}30, transparent 70%)`,
        }}
      />

      <Link
        to={link}
        className="relative block rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 min-w-[260px] max-w-xs overflow-hidden transition-all duration-500 group-hover:border-white/[0.15]"
        style={{
          boxShadow: `0 4px 30px ${accentColor}08`,
        }}
      >
        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 group-hover:opacity-25 transition-opacity duration-500"
          style={{ background: accentColor }}
        />

        {icon && (
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}

        <h3
          className="text-xl font-bold mb-2 transition-colors duration-300"
          style={{ color: accentColor }}
        >
          {title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300" style={{ color: accentColor }}>
          <span>Explore</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}
