import AnimatedDiagram from "../../components/ppt/AnimatedDiagram";
import SectionBlock from "../../components/ppt/SectionBlock";
import GlowCard from "../../components/ppt/GlowCard";
import StatCounter from "../../components/ppt/StatCounter";
import { motion } from "framer-motion";
import {
  User,
  Atom,
  Globe,
  ShieldCheck,
  Cpu,
  Zap,
  Database,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ArchStep {
  Icon: LucideIcon;
  label: string;
  color: string;
  detail: string;
}

const archFlow: ArchStep[] = [
  {
    Icon: User,
    label: "User Opens the App",
    color: "#BDF4FF",
    detail: "A user opens GoDamm on their phone or laptop. The app loads instantly because it's hosted on Vercel's global CDN — like having a copy of the app in every city.",
  },
  {
    Icon: Atom,
    label: "The App Shows Up (React)",
    color: "#06B6D4",
    detail: "React builds the beautiful screens you see — the dashboard, product list, sell page. It remembers if you're logged in using a special token (JWT) stored in your browser.",
  },
  {
    Icon: Globe,
    label: "Talking to the Server (API Call)",
    color: "#A78BFA",
    detail: "When you add a product or sell something, the app sends a message to our server over a secure HTTPS connection. Nginx acts like a security guard at the door — only allowing requests from our app.",
  },
  {
    Icon: ShieldCheck,
    label: "Who Are You? (Authentication)",
    color: "#F472B6",
    detail: "The server checks your identity. First time? You register with email + password. Then we send a 6-digit OTP to your email. Only after you enter it correctly do we let you in and give you a secret JWT pass.",
  },
  {
    Icon: Cpu,
    label: "Doing the Work (Business Logic)",
    color: "#818CF8",
    detail: "This is the brain. Selling a product? It checks if you have enough stock, subtracts the quantity in one atomic step (so two people can't buy the last item), and updates your profit — all in a split second.",
  },
  {
    Icon: Zap,
    label: "Speed Boost (Redis Cache)",
    color: "#34D399",
    detail: "Instead of asking the database every single time, we remember recent answers in Redis. Your product list? Cached. Your profit? Cached. When you change something, we clear the old answer so you always see fresh data.",
  },
  {
    Icon: Database,
    label: "The Vault (MySQL Database)",
    color: "#FBBF24",
    detail: "Everything is safely stored here — your products, suppliers, sales history, profit records. Each user's data is completely separate (like having your own private locker). Schema changes are versioned with Flyway so nothing ever breaks.",
  },
];

const techStack = [
  { label: "React 18", icon: "⚛️", color: "#61DAFB", category: "Frontend" },
  { label: "TypeScript", icon: "🔷", color: "#3178C6", category: "Frontend" },
  { label: "Vite", icon: "⚡", color: "#646CFF", category: "Frontend" },
  { label: "Tailwind CSS", icon: "🎨", color: "#06B6D4", category: "Frontend" },
  { label: "Framer Motion", icon: "✨", color: "#FF0055", category: "Frontend" },
  { label: "Java 17", icon: "☕", color: "#ED8B00", category: "Backend" },
  { label: "Spring Boot", icon: "🍃", color: "#6DB33F", category: "Backend" },
  { label: "Spring Security", icon: "🔐", color: "#6DB33F", category: "Backend" },
  { label: "MySQL 8", icon: "🐬", color: "#4479A1", category: "Data" },
  { label: "Redis", icon: "⚡", color: "#DC382D", category: "Data" },
  { label: "Docker", icon: "🐳", color: "#2496ED", category: "DevOps" },
  { label: "GitHub Actions", icon: "🚀", color: "#2088FF", category: "DevOps" },
  { label: "AWS EC2", icon: "☁️", color: "#FF9900", category: "DevOps" },
  { label: "Nginx", icon: "🌐", color: "#009639", category: "DevOps" },
];

const categories = ["Frontend", "Backend", "Data", "DevOps"];
const categoryColors: Record<string, string> = {
  Frontend: "#06B6D4",
  Backend: "#6DB33F",
  Data: "#FBBF24",
  DevOps: "#A78BFA",
};

export default function Overview() {
  return (
    <>
      {/* ─────────── HERO SECTION ─────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[75vh] text-center pt-16 pb-10">
        {/* Rotating accent rings */}
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-purple-500/[0.06]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[380px] h-[380px] md:w-[520px] md:h-[520px] rounded-full border border-cyan-500/[0.05]"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs font-semibold text-purple-300 tracking-wider uppercase">
            System Architecture Walkthrough
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-5 leading-[0.95]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">
            GoDamm
          </span>
          <br />
          <span className="text-white/90 text-3xl md:text-5xl lg:text-6xl font-bold">
            Inventory Command Center
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          A full-stack, production-grade inventory management system —
          from pixel-perfect UI to atomic SQL transactions. Built for
          <span className="text-cyan-300"> speed</span>,
          <span className="text-purple-300"> security</span>, and
          <span className="text-pink-300"> scale</span>.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-6 bg-gradient-to-b from-slate-500 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────── STATS BAR ─────────── */}
      <section className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 px-4">
        <StatCounter value={12} label="Modules" suffix="+" accentColor="#CDBDFF" delay={0} />
        <StatCounter value={24} label="API Endpoints" accentColor="#BDF4FF" delay={0.1} />
        <StatCounter value={5} label="Security Layers" accentColor="#F472B6" delay={0.2} />
        <StatCounter value={3} label="Cache Tiers" accentColor="#34D399" delay={0.3} />
        <StatCounter value={99} label="Uptime %" suffix="%" accentColor="#FBBF24" delay={0.4} />
      </section>

      {/* ─────────── TECH STACK — GROUPED ─────────── */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
        >
          Tech Stack
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: categoryColors[cat] }}
              >
                {cat}
              </h3>
              <div className="flex flex-col gap-2">
                {techStack
                  .filter((t) => t.category === cat)
                  .map((t) => (
                    <div
                      key={t.label}
                      className="flex items-center gap-2.5 py-1"
                    >
                      <span className="text-base">{t.icon}</span>
                      <span className="text-sm text-white/80 font-medium">
                        {t.label}
                      </span>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────── ANIMATED ORBIT DIAGRAM ─────────── */}
      <section className="flex flex-col items-center mb-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-white mb-2"
        >
          System Topology
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-400 text-sm mb-6"
        >
          Every component, connected and orchestrated
        </motion.p>
        <AnimatedDiagram />
      </section>

      {/* ─────────── HOW IT WORKS — STORYTELLING FLOW ─────────── */}
      <section className="w-full max-w-6xl mx-auto my-20 px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] mb-5">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-semibold text-purple-300 tracking-wider uppercase">
              Architecture Flow
            </span>
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            How GoDamm Works
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Follow a user's journey — from opening the app to storing data safely
          </p>
        </motion.div>

        {/* Flow timeline */}
        <div className="relative">
          {/* Vertical glowing timeline line */}
          <div
            className="absolute left-8 md:left-10 top-0 bottom-0 w-px z-0"
            style={{
              background: "linear-gradient(180deg, #BDF4FF30, #A78BFA40, #F472B640, #818CF840, #34D39940, #FBBF2430, transparent)",
            }}
          />

          <div className="flex flex-col gap-6">
            {archFlow.map((step, i) => {
              const StepIcon = step.Icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.55, ease: "easeOut" }}
                  className="relative flex items-start gap-6 md:gap-8 group"
                >
                  {/* Icon orb */}
                  <div className="relative flex-shrink-0 z-10">
                    {/* Glow behind orb */}
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                      style={{ background: step.color }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `${step.color}15`,
                        border: `1.5px solid ${step.color}35`,
                        boxShadow: `0 0 30px 6px ${step.color}18, inset 0 0 20px ${step.color}08`,
                      }}
                    >
                      <StepIcon
                        className="w-7 h-7 md:w-9 md:h-9"
                        style={{ color: step.color }}
                        strokeWidth={1.8}
                      />
                    </motion.div>

                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black border-2"
                      style={{
                        background: `${step.color}20`,
                        borderColor: `${step.color}50`,
                        color: step.color,
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 rounded-2xl p-6 md:p-7 transition-all duration-500 group-hover:translate-x-1"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}06, transparent 60%)`,
                      border: `1px solid ${step.color}15`,
                      boxShadow: `0 4px 24px ${step.color}06`,
                    }}
                  >
                    <h4
                      className="text-lg md:text-xl font-bold mb-2 tracking-tight group-hover:brightness-125 transition-all duration-300"
                      style={{ color: step.color }}
                    >
                      {step.label}
                    </h4>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
                      {step.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── THREE PILLARS ─────────── */}
      <section className="flex flex-col items-center mt-12 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Explore the Pillars
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Dive deep into each layer of the architecture
          </p>
        </motion.div>

        <div className="flex gap-6 flex-wrap justify-center px-4">
          <GlowCard
            title="Frontend"
            description="React SPA with glassmorphic UI, JWT auth flows, and real-time state management"
            link="/ppt/frontend"
            icon="⚛️"
            accentColor="#06B6D4"
            delay={0}
          />
          <GlowCard
            title="Backend"
            description="Spring Boot microkernel with atomic transactions, caching, and multi-tenant isolation"
            link="/ppt/backend"
            icon="⚙️"
            accentColor="#A78BFA"
            delay={0.1}
          />
          <GlowCard
            title="Deployment"
            description="CI/CD pipeline with Docker, GitHub Actions, EC2, Nginx, and Certbot HTTPS"
            link="/ppt/deployment"
            icon="🚀"
            accentColor="#34D399"
            delay={0.2}
          />
        </div>
      </section>
    </>
  );
}
