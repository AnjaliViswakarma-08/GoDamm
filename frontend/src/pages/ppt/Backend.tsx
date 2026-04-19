import SectionBlock from "../../components/ppt/SectionBlock";
import FlowStep from "../../components/ppt/FlowStep";
import CodeWindow from "../../components/ppt/CodeWindow";
import TechBadge from "../../components/ppt/TechBadge";
import { motion } from "framer-motion";

/* ─── Data ─── */
const backendTech = [
  { label: "Java 17", icon: "☕", color: "#ED8B00" },
  { label: "Spring Boot", icon: "🍃", color: "#6DB33F" },
  { label: "Spring Security", icon: "🔐", color: "#6DB33F" },
  { label: "Spring Data JPA", icon: "📊", color: "#6DB33F" },
  { label: "MySQL 8", icon: "🐬", color: "#4479A1" },
  { label: "Redis", icon: "⚡", color: "#DC382D" },
  { label: "Flyway", icon: "🦅", color: "#CC0200" },
  { label: "BCrypt", icon: "🔑", color: "#A78BFA" },
  { label: "JWT", icon: "🎫", color: "#F472B6" },
];

const layers = [
  {
    name: "Controller Layer",
    icon: "🌐",
    color: "#06B6D4",
    desc: "REST endpoints — request validation, DTO mapping, response serialization",
    modules: ["AuthController", "ProductController", "SupplierController", "SaleController", "OrderController", "UserController"],
  },
  {
    name: "Service Layer",
    icon: "⚙️",
    color: "#A78BFA",
    desc: "Business logic — OTP generation, sale processing, profit tracking, cache eviction",
    modules: ["AuthService", "ProductService", "SupplierService", "SaleService", "OtpService", "OrderService"],
  },
  {
    name: "Security Layer",
    icon: "🔐",
    color: "#F472B6",
    desc: "JWT filter chain, BCrypt password encoding, CORS config, rate limiting",
    modules: ["JwtTokenFilter", "JwtTokenProvider", "SecurityConfig", "RateLimiter"],
  },
  {
    name: "Repository Layer",
    icon: "🗃️",
    color: "#FBBF24",
    desc: "Spring Data JPA — user-scoped queries, atomic stock operations, Flyway migrations",
    modules: ["ProductRepository", "SupplierRepository", "UserRepository", "OtpRepository", "SaleRepository", "OrderRepository"],
  },
  {
    name: "Cache Layer",
    icon: "⚡",
    color: "#34D399",
    desc: "Redis / local cache — per-user TTL profiles, write-through eviction on mutations",
    modules: ["CacheConfig", "products cache", "suppliers cache", "profit cache"],
  },
];

const entities = [
  {
    name: "User",
    fields: ["id", "email", "password (BCrypt)", "shopName", "role"],
    color: "#F472B6",
    icon: "👤",
  },
  {
    name: "Product",
    fields: ["id", "name", "price", "costPrice", "stock", "supplier_id", "user_id"],
    color: "#06B6D4",
    icon: "📦",
  },
  {
    name: "Supplier",
    fields: ["id", "name", "contact", "email", "user_id"],
    color: "#A78BFA",
    icon: "🏭",
  },
  {
    name: "Sale",
    fields: ["id", "product_id", "quantity", "totalAmount", "user_id", "timestamp"],
    color: "#34D399",
    icon: "💰",
  },
  {
    name: "ProfitRecord",
    fields: ["id", "user_id", "totalProfit", "lastUpdated"],
    color: "#FBBF24",
    icon: "📈",
  },
  {
    name: "OTP",
    fields: ["id", "email", "code (6-digit)", "expiresAt", "purpose"],
    color: "#FF6B6B",
    icon: "🔢",
  },
];

const apiEndpoints = [
  // Auth (6)
  { method: "POST", path: "/auth/register", desc: "User registration + send OTP", color: "#34D399" },
  { method: "POST", path: "/auth/login", desc: "Authenticate credentials + send OTP", color: "#34D399" },
  { method: "POST", path: "/auth/verify-otp", desc: "Verify OTP → return JWT token", color: "#34D399" },
  { method: "POST", path: "/auth/forgot-password/request", desc: "Request password reset OTP", color: "#34D399" },
  { method: "POST", path: "/auth/forgot-password/verify-otp", desc: "Verify forgot-password OTP", color: "#34D399" },
  { method: "POST", path: "/auth/forgot-password/reset", desc: "Set new password after OTP", color: "#34D399" },
  // Products (6)
  { method: "GET", path: "/api/products", desc: "List user products (cached)", color: "#06B6D4" },
  { method: "GET", path: "/api/products/:id", desc: "Get single product", color: "#06B6D4" },
  { method: "GET", path: "/api/products/sale-info", desc: "Get product sale metadata", color: "#06B6D4" },
  { method: "POST", path: "/api/products", desc: "Create product", color: "#06B6D4" },
  { method: "PUT", path: "/api/products/:id", desc: "Update product", color: "#06B6D4" },
  { method: "DELETE", path: "/api/products/:id", desc: "Delete product", color: "#06B6D4" },
  // Suppliers (5)
  { method: "GET", path: "/api/suppliers", desc: "List user suppliers (cached)", color: "#A78BFA" },
  { method: "GET", path: "/api/suppliers/:id", desc: "Get single supplier", color: "#A78BFA" },
  { method: "POST", path: "/api/suppliers", desc: "Create supplier", color: "#A78BFA" },
  { method: "PUT", path: "/api/suppliers/:id", desc: "Update supplier", color: "#A78BFA" },
  { method: "DELETE", path: "/api/suppliers/:id", desc: "Delete supplier", color: "#A78BFA" },
  // Sales (4)
  { method: "POST", path: "/api/sales/sell", desc: "Process sale (atomic decrement)", color: "#FBBF24" },
  { method: "GET", path: "/api/sales/profit", desc: "Get profit summary (cached)", color: "#FBBF24" },
  { method: "GET", path: "/api/sales/profit/latest", desc: "Get latest profit record", color: "#FBBF24" },
  { method: "DELETE", path: "/api/sales/reset", desc: "Reset sales data", color: "#FBBF24" },
  // Orders (3)
  { method: "GET", path: "/api/orders", desc: "List orders", color: "#FF6B6B" },
  { method: "GET", path: "/api/orders/:id", desc: "Get single order", color: "#FF6B6B" },
  { method: "POST", path: "/api/orders", desc: "Create order", color: "#FF6B6B" },
  // User (1)
  { method: "PUT", path: "/api/user/store-name", desc: "Update store name", color: "#F472B6" },
];

export default function Backend() {
  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[55vh] text-center pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] mb-6"
        >
          <span className="text-lg">⚙️</span>
          <span className="text-xs font-semibold text-purple-300 tracking-wider uppercase">
            Control Room
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
            Backend
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto"
        >
          Every service, every boundary — precisely orchestrated for reliability,
          thread-safety, and multi-tenant data isolation.
        </motion.p>
      </section>

      {/* ─────────── TECH STACK ─────────── */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {backendTech.map((t, i) => (
            <TechBadge key={t.label} {...t} delay={i * 0.05} />
          ))}
        </div>
      </section>

      {/* ─────────── LAYERED ARCHITECTURE ─────────── */}
      <SectionBlock
        title="Layered Architecture"
        subtitle="Clean boundaries — each layer owns its responsibility"
        accentColor="#A78BFA"
      >
        <div className="space-y-3">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.1] transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                style={{ background: layer.color }}
              />
              <div className="flex items-start gap-4 ml-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: `${layer.color}15`,
                    border: `1px solid ${layer.color}25`,
                  }}
                >
                  {layer.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white">{layer.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{layer.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {layer.modules.map((m) => (
                      <span
                        key={m}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono border"
                        style={{
                          color: `${layer.color}cc`,
                          background: `${layer.color}08`,
                          borderColor: `${layer.color}18`,
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* ─────────── ENTITY RELATIONSHIP ─────────── */}
      <SectionBlock
        title="Domain Entities"
        subtitle="User-owned data model — multi-tenant isolation by design"
        accentColor="#FBBF24"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {entities.map((entity, i) => (
            <motion.div
              key={entity.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/[0.12] transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{entity.icon}</span>
                <h4 className="text-sm font-bold" style={{ color: entity.color }}>
                  {entity.name}
                </h4>
              </div>
              <div className="space-y-1">
                {entity.fields.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: entity.color }}
                    />
                    <code className="text-[11px] text-slate-400 font-mono">{f}</code>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* ─────────── API ENDPOINTS (24 total) ─────────── */}
      <SectionBlock
        title={`API Endpoint Codex — ${apiEndpoints.length} Endpoints`}
        subtitle="Every endpoint, method, and purpose documented"
        accentColor="#06B6D4"
      >
        <div className="space-y-1.5">
          {apiEndpoints.map((ep, i) => (
            <motion.div
              key={ep.path + ep.method}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              className="flex items-center gap-3 px-4 py-2 rounded-lg border border-white/[0.03] bg-white/[0.01] hover:border-white/[0.08] transition-all duration-300"
            >
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider min-w-[52px] text-center"
                style={{
                  color:
                    ep.method === "GET"
                      ? "#34D399"
                      : ep.method === "POST"
                      ? "#FBBF24"
                      : ep.method === "PUT"
                      ? "#06B6D4"
                      : "#F472B6",
                  background:
                    ep.method === "GET"
                      ? "#34D39910"
                      : ep.method === "POST"
                      ? "#FBBF2410"
                      : ep.method === "PUT"
                      ? "#06B6D410"
                      : "#F472B610",
                }}
              >
                {ep.method}
              </span>
              <code className="text-xs text-cyan-300 font-mono flex-1">{ep.path}</code>
              <span className="text-[11px] text-slate-500 hidden md:inline">{ep.desc}</span>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* ─────────── SECURITY PIPELINE ─────────── */}
      <SectionBlock
        title="Security Pipeline"
        subtitle="Multi-layered defense from request to response"
        accentColor="#F472B6"
      >
        <FlowStep
          step="1"
          title="CORS Filter"
          description="Strict origin validation — env-driven allowed origins."
          code={`cors.allowed-origins: \${CORS_ORIGINS}
cors.allowed-methods: GET, POST, PUT, DELETE`}
          accentColor="#06B6D4"
        />
        <FlowStep
          step="2"
          title="Rate Limiter"
          description="Redis-backed sliding window — prevents brute force attacks."
          code={`// Redis key: rate:limit:{ip}
// Max 100 requests per 60 seconds`}
          accentColor="#FBBF24"
        />
        <FlowStep
          step="3"
          title="JWT Filter"
          description="Extracts Bearer token, validates signature and expiry."
          code={`// JwtTokenFilter.java
String token = request.getHeader("Authorization");
if (jwtProvider.validateToken(token)) {
  Authentication auth = jwtProvider.getAuthentication(token);
  SecurityContextHolder.getContext()
    .setAuthentication(auth);
}`}
          accentColor="#F472B6"
        />
        <FlowStep
          step="4"
          title="User Scope Enforcement"
          description="All data queries scoped by authenticated user_id — multi-tenant isolation."
          code={`// ProductService.java
Long userId = SecurityUtils.getCurrentUserId();
return productRepo.findAllByUserId(userId);`}
          accentColor="#A78BFA"
        />
      </SectionBlock>

      {/* ─────────── ATOMIC TRANSACTIONS ─────────── */}
      <SectionBlock
        title="Atomic Inventory Transactions"
        subtitle="Race-condition-proof stock management"
        accentColor="#34D399"
      >
        <CodeWindow title="ProductRepository.java" language="java" accentColor="#34D399">
{`@Modifying
@Query("UPDATE Product p SET p.stock = p.stock - :qty " +
       "WHERE p.id = :id AND p.stock >= :qty AND p.user.id = :userId")
int decrementStockForUser(
  @Param("id") Long id,
  @Param("qty") int qty,
  @Param("userId") Long userId
);

// Returns 0 if insufficient stock → no partial writes
// Returns 1 if successful → atomic decrement complete`}
        </CodeWindow>
      </SectionBlock>

      {/* ─────────── CACHING MODEL ─────────── */}
      <SectionBlock
        title="Caching Model"
        subtitle="Redis-backed with local fallback — per-user isolation"
        accentColor="#DC382D"
      >
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              cache: "products",
              ttl: "300s",
              evictOn: "CRUD ops",
              icon: "📦",
              color: "#06B6D4",
            },
            {
              cache: "suppliers",
              ttl: "300s",
              evictOn: "CRUD ops",
              icon: "🏭",
              color: "#A78BFA",
            },
            {
              cache: "profit",
              ttl: "120s",
              evictOn: "Sale events",
              icon: "📈",
              color: "#FBBF24",
            },
          ].map((c, i) => (
            <motion.div
              key={c.cache}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center"
            >
              <span className="text-2xl">{c.icon}</span>
              <h4 className="text-sm font-bold mt-2" style={{ color: c.color }}>
                {c.cache}
              </h4>
              <div className="text-[11px] text-slate-500 mt-2 space-y-1">
                <div>
                  TTL: <span className="text-slate-300">{c.ttl}</span>
                </div>
                <div>
                  Evict: <span className="text-slate-300">{c.evictOn}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>
    </>
  );
}
