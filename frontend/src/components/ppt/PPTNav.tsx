import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { label: "Overview", to: "/ppt" },
  { label: "Frontend", to: "/ppt/frontend" },
  { label: "Backend", to: "/ppt/backend" },
  { label: "Deployment", to: "/ppt/deployment" },
];

export default function PPTNav() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-40 bg-black/70 backdrop-blur-2xl border-b border-white/[0.06] flex items-center justify-between h-14 px-6 md:px-12"
    >
      {/* Logo */}
      <NavLink to="/ppt" className="flex items-center gap-2.5 group">
        <img
          src="/logo-full.png"
          alt="GoDamm logo"
          className="h-7 w-auto object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
        />
        <span className="text-sm font-bold text-white tracking-wide">
          GoDamm
        </span>
      </NavLink>

      {/* Nav links */}
      <ul className="flex gap-1 md:gap-2">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/ppt"}
              className={({ isActive }) =>
                `relative px-3 md:px-5 py-1.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white/80"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="ppt-nav-active"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="ppt-nav-dot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                      style={{ boxShadow: "0 0 8px 2px rgba(6,182,212,0.5)" }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right-side actions */}
      <div className="hidden md:flex items-center gap-3">
        <a
          href="https://github.com/AnjaliViswakarma-08/GoDamm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          Source Code
        </a>
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/20 text-white hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-300"
        >
          Launch App →
        </Link>
      </div>
    </motion.nav>
  );
}
