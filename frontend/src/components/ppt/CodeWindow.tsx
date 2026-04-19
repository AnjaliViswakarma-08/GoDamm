import { motion } from "framer-motion";

interface CodeWindowProps {
  title: string;
  language?: string;
  children: string;
  accentColor?: string;
}

export default function CodeWindow({
  title,
  language = "typescript",
  children,
  accentColor = "#06B6D4",
}: CodeWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden border border-white/[0.06] bg-black/60 backdrop-blur-xl"
      style={{ boxShadow: `0 4px 40px ${accentColor}08` }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-slate-500 ml-2 font-mono">{title}</span>
        </div>
        <span className="text-[10px] text-slate-600 font-mono uppercase tracking-wider">
          {language}
        </span>
      </div>

      {/* Code content */}
      <pre className="p-5 text-xs md:text-sm font-mono overflow-x-auto leading-relaxed">
        <code className="text-cyan-300/90">{children}</code>
      </pre>
    </motion.div>
  );
}
