import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PPTNav from "../../components/ppt/PPTNav";
import PPTFooter from "../../components/ppt/PPTFooter";
import ParticleField from "../../components/ppt/ParticleField";

export default function PPTLayout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0F131F] to-[#0A0E1A] text-white relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-pink-500/[0.03] blur-[100px]" />
      </div>

      <ParticleField count={30} />
      <PPTNav />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 pt-14"
        >
          {children ? children : <Outlet />}
        </motion.main>
      </AnimatePresence>

      <PPTFooter />
    </div>
  );
}
