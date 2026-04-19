import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  accentColor?: string;
  delay?: number;
}

export default function StatCounter({
  value,
  label,
  suffix = "",
  accentColor = "#BDF4FF",
  delay = 0,
}: StatCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayVal, setDisplayVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayVal(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, value, {
            duration: 2,
            delay,
            ease: "easeOut",
          });
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative flex flex-col items-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl min-w-[140px] group hover:border-white/[0.12] transition-all duration-500"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10"
        style={{ background: `${accentColor}10` }}
      />

      <span
        className="text-4xl md:text-5xl font-black tabular-nums"
        style={{ color: accentColor }}
      >
        {displayVal}
        {suffix}
      </span>
      <span className="text-slate-400 text-sm mt-2 font-medium">{label}</span>
    </motion.div>
  );
}
