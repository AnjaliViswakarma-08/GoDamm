import { motion } from "framer-motion";
import { useState } from "react";

const nodes = [
  { label: "React UI", angle: 0, color: "#06B6D4", icon: "⚛️" },
  { label: "Deployment", angle: 60, color: "#34D399", icon: "🚀" },
  { label: "Auth / JWT", angle: 120, color: "#F472B6", icon: "🔐" },
  { label: "Spring Boot", angle: 180, color: "#818CF8", icon: "⚙️" },
  { label: "MySQL", angle: 240, color: "#FBBF24", icon: "🗃️" },
  { label: "Redis Cache", angle: 300, color: "#DC382D", icon: "⚡" },
];

export default function AnimatedDiagram() {
  const [hovered, setHovered] = useState<number | null>(null);
  const radius = 160;

  return (
    <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center select-none">
      {/* Background glow rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-cyan-500/10"
          style={{
            width: ring * 120 + 80,
            height: ring * 120 + 80,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.02, 1] }}
          transition={{ duration: 3 + ring, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* SVG connection lines with traveling particles */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 500"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="particleGlow">
            <stop offset="0%" stopColor="#BDF4FF" stopOpacity={1} />
            <stop offset="100%" stopColor="#BDF4FF" stopOpacity={0} />
          </radialGradient>
          {nodes.map((_, i) => {
            const rad = (nodes[i].angle * Math.PI) / 180;
            const ex = 250 + Math.cos(rad) * radius;
            const ey = 250 + Math.sin(rad) * radius;
            return (
              <linearGradient
                key={`lg-${i}`}
                id={`line-grad-${i}`}
                x1="250"
                y1="250"
                x2={ex}
                y2={ey}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#CDBDFF" stopOpacity={0.6} />
                <stop offset="100%" stopColor={nodes[i].color} stopOpacity={0.6} />
              </linearGradient>
            );
          })}
        </defs>

        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const ex = 250 + Math.cos(rad) * radius;
          const ey = 250 + Math.sin(rad) * radius;
          return (
            <g key={`line-${i}`}>
              <motion.line
                x1={250}
                y1={250}
                x2={ex}
                y2={ey}
                stroke={`url(#line-grad-${i})`}
                strokeWidth={hovered === i ? 3 : 1.5}
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
              />
              <motion.circle
                r={4}
                fill="url(#particleGlow)"
                initial={{ cx: 250, cy: 250 }}
                animate={{
                  cx: [250, ex, 250],
                  cy: [250, ey, 250],
                }}
                transition={{
                  delay: i * 0.4,
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Central Orchestrator */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        animate={{
          boxShadow: [
            "0 0 20px 4px rgba(205,189,255,0.3), 0 0 60px 10px rgba(189,244,255,0.1)",
            "0 0 40px 8px rgba(205,189,255,0.5), 0 0 80px 20px rgba(189,244,255,0.2)",
            "0 0 20px 4px rgba(205,189,255,0.3), 0 0 60px 10px rgba(189,244,255,0.1)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-900/80 via-[#0F131F] to-cyan-900/80 backdrop-blur-xl flex flex-col items-center justify-center border border-purple-400/30">
          <span className="text-2xl mb-1">🎯</span>
          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
            Orchestrator
          </span>
        </div>
      </motion.div>

      {/* Orbiting Nodes */}
      {nodes.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <motion.div
            key={node.label}
            className="absolute left-1/2 top-1/2 z-10 cursor-pointer"
            style={{
              x: x - 44,
              y: y - 44,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.15 }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
          >
            <div
              className="w-[88px] h-[88px] rounded-2xl backdrop-blur-xl flex flex-col items-center justify-center gap-1 border transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${node.color}20, ${node.color}08)`,
                borderColor: hovered === i ? `${node.color}80` : `${node.color}30`,
                boxShadow:
                  hovered === i
                    ? `0 0 30px 6px ${node.color}40, inset 0 0 20px ${node.color}10`
                    : `0 0 15px 2px ${node.color}15`,
              }}
            >
              <span className="text-xl">{node.icon}</span>
              <span className="text-[10px] font-semibold text-white/90 text-center leading-tight px-1">
                {node.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
