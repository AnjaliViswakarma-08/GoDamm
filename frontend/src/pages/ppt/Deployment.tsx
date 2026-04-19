import SectionBlock from "../../components/ppt/SectionBlock";
import FlowStep from "../../components/ppt/FlowStep";
import CodeWindow from "../../components/ppt/CodeWindow";
import TechBadge from "../../components/ppt/TechBadge";
import { motion } from "framer-motion";

/* ─── Data ─── */
const deployTech = [
  { label: "Docker", icon: "🐳", color: "#2496ED" },
  { label: "Docker Compose", icon: "📦", color: "#2496ED" },
  { label: "GitHub Actions", icon: "🚀", color: "#2088FF" },
  { label: "AWS EC2", icon: "☁️", color: "#FF9900" },
  { label: "Nginx", icon: "🌐", color: "#009639" },
  { label: "Certbot", icon: "🔒", color: "#34D399" },
  { label: "Vercel", icon: "▲", color: "#FFFFFF" },
  { label: "Docker Hub", icon: "🐋", color: "#2496ED" },
];

const pipelineSteps = [
  {
    title: "Code Push",
    icon: "📝",
    desc: "Developer pushes to main branch on GitHub",
    color: "#A78BFA",
  },
  {
    title: "GitHub Actions Trigger",
    icon: "⚡",
    desc: "CI workflow auto-triggered — runs build + test suite",
    color: "#2088FF",
  },
  {
    title: "Maven Build & Test",
    icon: "🔨",
    desc: "Compiles Java 17, runs unit tests, packages JAR",
    color: "#ED8B00",
  },
  {
    title: "Docker Build",
    icon: "🐳",
    desc: "Multi-stage Dockerfile — openjdk:17-jdk-slim runtime layer",
    color: "#2496ED",
  },
  {
    title: "Push to Docker Hub",
    icon: "📤",
    desc: "Tagged image pushed to Docker Hub registry",
    color: "#2496ED",
  },
  {
    title: "SSH Deploy to EC2",
    icon: "🖥️",
    desc: "Pulls latest image on EC2, restarts via Docker Compose",
    color: "#FF9900",
  },
  {
    title: "Health Check",
    icon: "💚",
    desc: "Actuator /health endpoint verified — rollback on failure",
    color: "#34D399",
  },
];

const infraNodes = [
  {
    label: "Vercel CDN",
    sublabel: "Frontend SPA",
    icon: "▲",
    color: "#FFFFFF",
    domains: ["godamm.mraks.dev", "godamm.anjaliv.dev"],
  },
  {
    label: "AWS EC2",
    sublabel: "Backend + DB + Cache",
    icon: "☁️",
    color: "#FF9900",
    domains: ["api.godamm.mraks.dev"],
  },
];

const dockerServices = [
  {
    name: "inventory-backend",
    image: "Docker Hub image",
    port: "8080",
    color: "#6DB33F",
    icon: "🍃",
    details: "Spring Boot app, healthcheck via /actuator/health",
  },
  {
    name: "mysql",
    image: "mysql:8",
    port: "3306",
    color: "#4479A1",
    icon: "🐬",
    details: "Persistent volume, user-scoped data, Flyway migrations",
  },
  {
    name: "redis",
    image: "redis:7-alpine",
    port: "6379",
    color: "#DC382D",
    icon: "⚡",
    details: "Cache layer, TTL profiles, rate-limit buckets",
  },
];

export default function Deployment() {
  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[55vh] text-center pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-400/20 bg-green-400/[0.06] mb-6"
        >
          <span className="text-lg">🚀</span>
          <span className="text-xs font-semibold text-green-300 tracking-wider uppercase">
            Build → Ship → Run
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500">
            Deployment
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto"
        >
          From code to cloud — every stage automated, every safeguard in place.
          Zero-downtime deployments with a single push.
        </motion.p>
      </section>

      {/* ─────────── TECH STACK ─────────── */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {deployTech.map((t, i) => (
            <TechBadge key={t.label} {...t} delay={i * 0.05} />
          ))}
        </div>
      </section>

      {/* ─────────── CI/CD PIPELINE ─────────── */}
      <SectionBlock
        title="CI/CD Pipeline"
        subtitle="GitHub Actions → Docker Hub → EC2 — fully automated"
        accentColor="#2088FF"
      >
        {/* Horizontal pipeline visualization */}
        <div className="flex flex-col gap-0 py-2">
          {pipelineSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="relative flex items-start gap-4 group"
            >
              {/* Connector line */}
              {i < pipelineSteps.length - 1 && (
                <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
              )}

              {/* Step badge */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg relative z-10"
                style={{
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}30`,
                  boxShadow: `0 0 15px 2px ${step.color}15`,
                }}
              >
                {step.icon}
              </motion.div>

              {/* Content */}
              <div className="flex-1 pb-5">
                <div className="text-sm font-semibold text-white mb-0.5 group-hover:text-cyan-200 transition-colors duration-300">
                  {step.title}
                </div>
                <p className="text-xs text-slate-400">{step.desc}</p>
              </div>

              {/* Step number */}
              <span className="text-[10px] text-slate-600 font-mono mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* ─────────── GITHUB ACTIONS WORKFLOW ─────────── */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <CodeWindow title=".github/workflows/deploy.yml" language="yaml" accentColor="#2088FF">
{`name: Build, Push & Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with: { java-version: '17' }

      - name: Build & Test
        run: mvn clean package -DskipTests=false

      - name: Docker Build & Push
        run: |
          docker build -t user/inventory-backend:latest .
          docker push user/inventory-backend:latest

      - name: Deploy to EC2 via SSH
        run: |
          ssh ec2-user@api.godamm.mraks.dev \\
            "cd /opt/godamm && docker compose pull && \\
             docker compose up -d --remove-orphans"`}
        </CodeWindow>
      </section>

      {/* ─────────── DOCKER COMPOSE STACK ─────────── */}
      <SectionBlock
        title="Docker Compose Stack"
        subtitle="Three containers orchestrated with health checks and persistent volumes"
        accentColor="#2496ED"
      >
        <div className="grid md:grid-cols-3 gap-4">
          {dockerServices.map((svc, i) => (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{svc.icon}</span>
                <h4 className="text-sm font-bold" style={{ color: svc.color }}>
                  {svc.name}
                </h4>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Image</span>
                  <span className="text-slate-300 font-mono">{svc.image}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Port</span>
                  <span className="text-slate-300 font-mono">:{svc.port}</span>
                </div>
                <p className="text-slate-400 pt-1 border-t border-white/[0.04]">
                  {svc.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* ─────────── NGINX CONFIG ─────────── */}
      <SectionBlock
        title="Nginx Reverse Proxy"
        subtitle="HTTPS termination, security headers, and API routing"
        accentColor="#009639"
      >
        <FlowStep
          step="1"
          title="SSL Termination"
          description="Certbot auto-renews Let's Encrypt certificates every 60 days. All HTTP traffic is 301-redirected to HTTPS."
          accentColor="#34D399"
        />
        <FlowStep
          step="2"
          title="Security Headers"
          description="Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, and Content-Security-Policy enforced on every response."
          accentColor="#F472B6"
        />
        <FlowStep
          step="3"
          title="Proxy Pass"
          description="All /api/* and /auth/* requests are forwarded to the Spring Boot container on port 8080 with WebSocket upgrade support."
          code={`location / {
  proxy_pass http://localhost:8080;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}`}
          accentColor="#009639"
        />
      </SectionBlock>

      {/* ─────────── EC2 BOOTSTRAP ─────────── */}
      <SectionBlock
        title="EC2 Host Setup"
        subtitle="One-command bootstrap for a fresh Amazon Linux instance"
        accentColor="#FF9900"
      >
        <FlowStep
          step="1"
          title="System Bootstrap"
          description="Install Docker, Docker Compose, Nginx, and Certbot. Configure 2GB swap for 4GB instances."
          code={`# setup-ec2-4gb.sh
sudo dnf install -y docker nginx certbot
sudo systemctl enable docker nginx
sudo fallocate -l 2G /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile`}
          accentColor="#FF9900"
        />
        <FlowStep
          step="2"
          title="Systemd Services"
          description="Docker Compose stack managed as a systemd unit for automatic startup on reboot."
          code={`# godamm-stack.service
[Service]
WorkingDirectory=/opt/godamm
ExecStart=/usr/bin/docker compose up
ExecStop=/usr/bin/docker compose down
Restart=always`}
          accentColor="#A78BFA"
        />
        <FlowStep
          step="3"
          title="Deploy Script"
          description="Pull latest images, apply env config, restart stack — zero-downtime rotation."
          code={`# deploy-app.sh
docker compose pull
docker compose up -d --remove-orphans
docker system prune -f`}
          accentColor="#34D399"
        />
      </SectionBlock>

      {/* ─────────── DOCKERFILE ─────────── */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <CodeWindow title="Dockerfile" language="dockerfile" accentColor="#2496ED">
{`# ── Stage 1: Build ──
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# ── Stage 2: Runtime ──
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

HEALTHCHECK --interval=30s --timeout=5s \\
  CMD curl -f http://localhost:8080/actuator/health || exit 1

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`}
        </CodeWindow>
      </section>
    </>
  );
}
