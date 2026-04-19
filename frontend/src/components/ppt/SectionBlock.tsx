import { motion } from "framer-motion";

interface SectionBlockProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  accentColor?: string;
}

export default function SectionBlock({
  title,
  subtitle,
  children,
  accentColor = "#CDBDFF",
}: SectionBlockProps) {
  return (
    <section className="w-full max-w-5xl mx-auto my-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 overflow-hidden"
      >
        {/* Accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{
            background: `linear-gradient(180deg, ${accentColor}, transparent)`,
          }}
        />

        {/* Ambient corner glow */}
        <div
          className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: accentColor }}
        />

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-white mb-2 relative"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-slate-400 mb-6 text-sm md:text-base"
          >
            {subtitle}
          </motion.p>
        )}
        <div className="space-y-4 relative">{children}</div>
      </motion.div>
    </section>
  );
}
