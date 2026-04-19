
import SectionBlock from "../../components/ppt/SectionBlock";
import FlowStep from "../../components/ppt/FlowStep";
import CodeWindow from "../../components/ppt/CodeWindow";
import TechBadge from "../../components/ppt/TechBadge";
import { motion } from "framer-motion";

/* ─── Data ─── */
const frontendTech = [
  { label: "React 18", icon: "⚛️", color: "#61DAFB" },
  { label: "TypeScript", icon: "🔷", color: "#3178C6" },
  { label: "Vite", icon: "⚡", color: "#646CFF" },
  { label: "Tailwind CSS", icon: "🎨", color: "#06B6D4" },
  { label: "Framer Motion", icon: "✨", color: "#FF0055" },
  { label: "React Router v6", icon: "🧭", color: "#CA4245" },
  { label: "Lucide Icons", icon: "🎯", color: "#F472B6" },
];

const componentTree = [
  {
    name: "App.tsx",
    desc: "Provider composition root",
    children: [
      {
        name: "AuthProvider",
        desc: "JWT session & OTP flow state",
        children: [
          { name: "AppRoutes.tsx", desc: "Central route tree", children: [] },
        ],
      },
      {
        name: "InventoryProvider",
        desc: "Products, suppliers, sales data",
        children: [],
      },
    ],
  },
];

const routes = [
  { path: "/", label: "Landing Page", guard: "Public", color: "#34D399" },
  { path: "/login", label: "Login", guard: "Guest", color: "#FBBF24" },
  { path: "/register", label: "Register", guard: "Guest", color: "#FBBF24" },
  { path: "/verify-otp", label: "OTP Verify", guard: "Guest", color: "#FBBF24" },
  { path: "/forgot-password", label: "Forgot Password", guard: "Guest", color: "#FBBF24" },
  { path: "/app/dashboard", label: "Dashboard", guard: "Protected", color: "#F472B6" },
  { path: "/app/products", label: "Products", guard: "Protected", color: "#F472B6" },
  { path: "/app/suppliers", label: "Suppliers", guard: "Protected", color: "#F472B6" },
  { path: "/app/sell", label: "Sell Product", guard: "Protected", color: "#F472B6" },
];

function TreeNode({
  name,
  desc,
  children,
  depth = 0,
}: {
  name: string;
  desc: string;
  children: typeof componentTree;
  depth?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: depth * 0.1, duration: 0.4 }}
      className="relative"
      style={{ marginLeft: depth * 28 }}
    >
      <div className="flex items-center gap-3 py-2 group">
        {depth > 0 && (
          <div className="w-4 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
        )}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] group-hover:border-purple-400/20 transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-purple-400/60" />
          <code className="text-xs text-cyan-300 font-mono">{name}</code>
        </div>
        <span className="text-[11px] text-slate-500">{desc}</span>
      </div>
      {children?.map((child) => (
        <TreeNode key={child.name} {...child} depth={depth + 1} />
      ))}
    </motion.div>
  );
}

export default function Frontend() {
  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[55vh] text-center pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] mb-6"
        >
          <span className="text-lg">⚛️</span>
          <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase">
            Interaction Pipeline
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
            Frontend
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
        >
          Every click, every flow — engineered for instant feedback, delightful
          animations, and bulletproof security.
        </motion.p>
      </section>

      {/* ─────────── TECH STACK ─────────── */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {frontendTech.map((t, i) => (
            <TechBadge key={t.label} {...t} delay={i * 0.05} />
          ))}
        </div>
      </section>

      {/* ─────────── COMPONENT TREE ─────────── */}
      <SectionBlock
        title="Component Architecture"
        subtitle="Provider composition → Route tree → Layout shells"
        accentColor="#A78BFA"
      >
        {componentTree.map((node) => (
          <TreeNode key={node.name} {...node} />
        ))}
      </SectionBlock>

      {/* ─────────── ROUTE MAP ─────────── */}
      <SectionBlock
        title="Route Map"
        subtitle="Public, guest-only, and protected navigation zones"
        accentColor="#06B6D4"
      >
        <div className="grid gap-2">
          {routes.map((r, i) => (
            <motion.div
              key={r.path}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="flex items-center gap-4 px-4 py-2.5 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.1] transition-all duration-300 group"
            >
              <code className="text-xs font-mono text-cyan-300 min-w-[160px]">
                {r.path}
              </code>
              <span className="text-sm text-slate-300 flex-1">{r.label}</span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  color: r.color,
                  background: `${r.color}15`,
                  border: `1px solid ${r.color}25`,
                }}
              >
                {r.guard}
              </span>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* ─────────── AUTH FLOW ─────────── */}
      <SectionBlock
        title="Authentication Flow"
        subtitle="Login → OTP → JWT Token → Protected Routes"
        accentColor="#F472B6"
      >
        <FlowStep
          step="1"
          title="User Login"
          description="Credentials submitted to backend REST endpoint."
          code={`POST /api/auth/login
Content-Type: application/json

{
  "email": "user@store.com",
  "password": "••••••••"
}`}
          accentColor="#F472B6"
        />
        <FlowStep
          step="2"
          title="OTP Verification"
          description="6-digit OTP sent via email, verified server-side."
          code={`POST /api/auth/verify-otp

{
  "email": "user@store.com",
  "otp": "482917"
}`}
          accentColor="#A78BFA"
        />
        <FlowStep
          step="3"
          title="JWT Token Storage"
          description="Bearer token persisted in localStorage for session continuity."
          code={`// AuthContext.tsx
const { token, user } = response.data;
localStorage.setItem('token', token);
setUser(user);
navigate('/app/dashboard');`}
          accentColor="#06B6D4"
        />
        <FlowStep
          step="4"
          title="Axios Interceptor"
          description="All subsequent API calls include the JWT Bearer token automatically."
          code={`// api.ts
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});`}
          accentColor="#34D399"
        />
      </SectionBlock>

      {/* ─────────── PRODUCT CRUD FLOW ─────────── */}
      <SectionBlock
        title="Product Management CRUD"
        subtitle="Create, read, update, delete — with real-time state sync"
        accentColor="#FBBF24"
      >
        <FlowStep
          step="C"
          title="Create Product"
          description="Glassmorphic modal form with validation and supplier linkage."
          code={`POST /api/products
Authorization: Bearer <JWT>

{
  "name": "Premium Widget",
  "price": 299.99,
  "stock": 150,
  "supplierId": 7
}`}
          accentColor="#34D399"
        />
        <FlowStep
          step="R"
          title="Read Products"
          description="Fetched on mount, cached in Redis, displayed in holographic table."
          code={`GET /api/products
Authorization: Bearer <JWT>

// Response cached per user_id
// TTL: 300s (products cache)`}
          accentColor="#06B6D4"
        />
        <FlowStep
          step="U"
          title="Update Product"
          description="Inline edit with optimistic updates and cache eviction."
          code={`PUT /api/products/{id}
// Cache eviction: @CacheEvict("products")`}
          accentColor="#FBBF24"
        />
        <FlowStep
          step="D"
          title="Delete Product"
          description="Soft confirmation dialog, cascade-safe deletion."
          code={`DELETE /api/products/{id}
// Evicts product + profit caches`}
          accentColor="#F472B6"
        />
      </SectionBlock>

      {/* ─────────── SELL FLOW ─────────── */}
      <SectionBlock
        title="Sale Transaction Flow"
        subtitle="Atomic stock decrement → profit tracking → real-time dashboard"
        accentColor="#34D399"
      >
        <FlowStep
          step="1"
          title="Select Product & Quantity"
          description="Dropdown with live stock availability check."
          accentColor="#06B6D4"
        />
        <FlowStep
          step="2"
          title="Atomic Stock Decrement"
          description="SQL UPDATE with WHERE stock >= qty prevents double-sell race conditions."
          code={`UPDATE products
SET stock = stock - :qty
WHERE id = :id
  AND stock >= :qty
  AND user_id = :userId`}
          accentColor="#FBBF24"
        />
        <FlowStep
          step="3"
          title="Incremental Profit Update"
          description="O(1) profit tracking — no full history recalc needed."
          code={`// ProfitRecord: incremental accumulator
totalProfit += (salePrice - costPrice) * qty`}
          accentColor="#34D399"
        />
      </SectionBlock>

      {/* ─────────── DESIGN SYSTEM ─────────── */}
      <SectionBlock
        title="Design System: Neon-Glass Methodology"
        subtitle="The aesthetic foundation powering every pixel"
        accentColor="#CDBDFF"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Color Tokens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
          >
            <h4 className="text-sm font-bold text-white mb-4">Color Tokens</h4>
            {[
              { name: "Surface", hex: "#0F131F", color: "#0F131F" },
              { name: "Primary", hex: "#CDBDFF", color: "#CDBDFF" },
              { name: "Secondary", hex: "#BDF4FF", color: "#BDF4FF" },
              { name: "Tertiary", hex: "#FFABF3", color: "#FFABF3" },
            ].map((t) => (
              <div key={t.name} className="flex items-center gap-3 py-1.5">
                <div
                  className="w-5 h-5 rounded-md border border-white/10"
                  style={{ background: t.color }}
                />
                <span className="text-xs text-slate-300 min-w-[80px]">{t.name}</span>
                <code className="text-[10px] text-slate-500 font-mono">{t.hex}</code>
              </div>
            ))}
          </motion.div>

          {/* Aesthetic Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
          >
            <h4 className="text-sm font-bold text-white mb-4">Aesthetic Pillars</h4>
            {[
              { icon: "💎", name: "Glassmorphism", desc: "Semi-transparent cards, backdrop-blur: 20px" },
              { icon: "✨", name: "Luminous Depth", desc: "Glowing box-shadows, not flat black" },
              { icon: "📐", name: "Asymmetric Layout", desc: "Wide spacing, editorial headers" },
              { icon: "🎭", name: "Micro-animations", desc: "Framer Motion on every interaction" },
            ].map((p) => (
              <div key={p.name} className="flex items-start gap-3 py-1.5">
                <span className="text-sm mt-0.5">{p.icon}</span>
                <div>
                  <span className="text-xs font-semibold text-white">{p.name}</span>
                  <p className="text-[10px] text-slate-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </SectionBlock>

      {/* ─────────── CONTEXT CODE ─────────── */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <CodeWindow title="AuthContext.tsx" language="tsx" accentColor="#A78BFA">
{`// Manages JWT sessions, user info, and OTP flows
const AuthContext = createContext<AuthState>(defaultState);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}`}
        </CodeWindow>
      </section>
    </>
  );
}
