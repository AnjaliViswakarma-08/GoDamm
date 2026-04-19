# 🤖 Agent Intelligence & Context (Agents.md)

This document serves as the primary source of truth for AI agents interacting with this repository. It provides a comprehensive overview of the system architecture, design philosophy, and implementation status.

---

## 🚀 Project Overview: "Next-Gen Inventory Command Center"
This is a high-performance Inventory Management System designed to bridge the gap between complex logistics and premium user experience. It uses a Spring Boot backend and a React (Vite/TypeScript) frontend.

### 🛠️ Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: Java 17, Spring Boot, Spring Data JPA, MySQL, Flyway (Migration).
- **Security**: Spring Security, JWT (Bearer Token), BCrypt, Email OTP.
- **Design Tools**: Stitch (Project ID: `15072817964032502010`).

---

## 🌌 Design Philosophy: "Neon-Glass Methodology"
We have moved away from traditional spreadsheet-link designs. The system now follows a "Ethereal Command Center" aesthetic.

### 💎 Core Tokens
- **Background**: `surface` #0F131F (Deep Space).
- **Primary**: `primary` #CDBDFF (Luminous Violet).
- **Accents**: `secondary` #BDF4FF (Neon Cyan), `tertiary` #FFABF3 (Neon Magenta).
- **Light Theme Accent Mapping**: darkened accent variants are enforced for readability (`purple` #5B21B6, `blue` #0E7490, `pink` #9D174D, `yellow/warning` #854D0E).
- **Core Aesthetic**: 
  - **Glassmorphism**: Semi-transparent cards (`backdrop-blur: 20px`).
  - **Luminous Depth**: Using glowing box-shadows instead of standard black shadows.
  - **Asymmetry**: Wide spacing and oversized editorial headers.

---

## 🏗️ Architecture & Key Components

### 🖥️ Frontend (React)
- **Root**: `src/App.tsx` (Provider composition only).
- **Routing Layer**:
  - `src/routes/AppRoutes.tsx`: Central route tree for public, guest, and protected navigation.
  - `src/routes/paths.ts`: Route constants + tab/path mapping (including public landing route).
  - `src/routes/RouteGuards.tsx`: Auth-based guest/protected guards.
- **Layout Layer**:
  - `src/layouts/AppShell.tsx`: Protected app chrome (Header, Outlet, Footer).
  - `src/components/layout/Header.tsx`: Solid top navigation bar for improved readability.
- **Hooks**:
  - `src/hooks/useTheme.ts`: Global theme state + persistence.
- **Design Tokens**:
  - `src/index.css`: Base tokens + light-mode accent overrides for hardcoded Tailwind color utilities.
- **Contexts**:
  - `AuthContext`: Manages JWT sessions, user info, registration OTP flow, and forgot-password OTP reset flow state.
  - `InventoryContext`: Manages products, suppliers, and sales data.
- **Key Pages**:
  - `LandingPage.tsx`: Public marketing landing page with local-friendly copy, feature highlights, and auth CTAs.
  - `Dashboard.tsx`: Overview with key metrics.
  - `ProductManager.tsx`: Full CRUD for products.
  - `SupplierManager.tsx`: Full CRUD for suppliers.
  - `SellProduct.tsx`: Transaction-focused interface.
  - `auth/`: Contains Login, Register, registration OTP verification, Forgot Password, Forgot Password OTP, and Reset Password pages.
  - `components/auth/PasswordFieldWithRules.tsx`: Reusable password field with live rules and eye toggle.

### ⚙️ Backend (Spring Boot)
- **Base Package**: `com.avaks.inventory`
- **Key Modules**:
  - `entity/`: Product, Supplier, User, Otp.
  - `controller/`: REST endpoints for all entities.
  - `service/`: Business logic (OTP generation, sale processing, registration/forgot-password auth workflows).
  - `security/`: JWT filtering and authentication configuration.
  - `config/`: Runtime configuration (security/auth + app wiring), including cache provider setup.
- **Caching Model**:
  - Spring Cache abstraction is enabled with per-user cache keys for products, suppliers, and dashboard profit reads.
  - Cache provider is selectable (`simple` local in-memory by default, `redis` when configured via environment).
  - Write paths (product/supplier CRUD and sales mutations) evict affected cache entries to preserve consistency.
- **Deployment Operations**:
  - EC2 single-node deployment assets are located in `deploy/ec2-single-node/`.
  - Includes host bootstrap (swap + Docker + Nginx + Certbot), Docker Compose deploy script, systemd unit templates, nginx reverse-proxy template, and deployment runbook.
- **Data Isolation Model**:
  - Inventory entities (`Supplier`, `Product`, `Sale`, `ProfitRecord`, `Order`) are user-owned via `user_id`.
  - Repository/service methods are user-scoped to enforce per-login store isolation.

### 🌐 Domain Topology
- **Frontend (Vercel)**: `godamm.mraks.dev`, `godamm.anjaliv.dev`
- **Backend API (EC2 + Nginx)**: `api.godamm.mraks.dev`

---

## 🛠️ System Hardening & Reliability

### 💎 Atomic Inventory Transactions
We use atomic SQL updates for stock management to prevent race conditions during high-volume sales.
- **Atomic Decrement**: `ProductRepository.decrementStock` ensures stock only decreases if sufficient quantity exists, preventing "Double Sell" scenarios.
- **Optimized Profit Tracking**: The system maintains an incremental `ProfitRecord` rather than re-calculating the entire sales history, ensuring O(1) performance for profit reporting.

### 🔐 Tenant Data Safety
- Store data is isolated per authenticated user, preventing cross-account visibility or writes.
- Stock decrements and sales/profit updates are scoped to the owner (`decrementStockForUser`) to keep transactional integrity in multi-user usage.

### 🧪 Startup Data Policy
- Automatic startup demo-data reset is disabled by default.
- Existing user inventory is preserved across restarts unless changed explicitly through APIs.

---

## 📍 Implementation Status & History

### 📅 Phase 1: Conceptualization & Design (Completed)
- [x] Analyze existing codebase and README.
- [x] Create Stitch project and define "Next-Gen" design system.
- [x] Generate UI mocks for Dashboard, Products, Suppliers, and Auth.
- [x] Create `Agents.md` for context persistence.

### 📅 Phase 2: Frontend Implementation (Completed)
- [x] Implement global CSS variables for Neon-Glass tokens in `index.css`.
- [x] Update `App.tsx` shell with fixed glassmorphic navigation and ambient glows.
- [x] Refactor Dashboard with mission-control stat cards and high-impact headers.
- [x] Refactor Product & Supplier modules with holographic table interfaces.
- [x] Complete Auth overhaul (Login, Register, OTP) with futuristic "Infinite Flow" branding.

### 📅 Phase 3: Frontend Architecture Hardening (Completed)
- [x] Extract centralized route tree into `src/routes/AppRoutes.tsx`.
- [x] Add explicit route constants and tab mapping in `src/routes/paths.ts`.
- [x] Move guest/protected rules into reusable `src/routes/RouteGuards.tsx`.
- [x] Move protected app chrome into `src/layouts/AppShell.tsx`.
- [x] Extract theme state persistence and DOM sync into `src/hooks/useTheme.ts`.

### 📅 Phase 4: Light Theme Contrast Calibration (Completed)
- [x] Darken light-theme blue, yellow, pink, and purple accents for readability.
- [x] Add centralized light-mode overrides in `src/index.css` for text/background/border/ring/gradient Tailwind utility classes.
- [x] Preserve dark-theme neon styling while applying overrides only under `:root.light`.

### 📅 Phase 5: Dashboard Dark Theme Polish (Completed)
- [x] Convert dashboard profit and low-stock cards to theme-variable surfaces (no hardcoded white cards in dark mode).
- [x] Make header navigation solid for stronger visual stability.
- [x] Update footer copy to: "Godamm - Made in Love  - An Inventory Management System".

### 📅 Phase 6: Multi-Tenant Data Isolation (Completed)
- [x] Add `user_id` ownership to inventory domain entities.
- [x] Scope repository and service operations to authenticated user ownership.

### 📅 Phase 7: Data Safety + Light Theme Readability (Completed)
- [x] Disable startup test-data seeding by default (`app.seed-test-data=false`).
- [x] Remove runtime startup seeder component to avoid unintended inventory resets.
- [x] Improve light-theme input/readability for header store-name editing and auth forms (Login/Register/OTP).

### 📅 Phase 8: Auth Flow Expansion (Completed)
- [x] Registration OTP verification now returns JWT auth payload and logs users directly into the app.
- [x] Add forgot-password recovery flow: request OTP, verify OTP, then set new password.
- [x] Add reusable password constraints UI with eye-toggle and enforce strong-password rules in register/reset backend paths.

### 📅 Phase 9: Backend Read Cache Foundation (Completed)
- [x] Add Spring Cache + Redis dependencies and provider toggle (`app.cache.provider`).
- [x] Add cache configuration with per-cache TTL profiles and local fallback cache manager.
- [x] Cache user-scoped reads for products/suppliers/profit and evict on product, supplier, and sale writes.

### 📅 Phase 10: EC2 Single-Node Deployment Pack (Completed)
- [x] Add `deploy/ec2-single-node/setup-ec2-4gb.sh` for package install, swap tuning, Docker/Compose setup, and Nginx/Certbot host prep.
- [x] Add `docker-compose.yml` for backend + MySQL + Redis with persistent volumes and health checks.
- [x] Add `deploy/ec2-single-node/inventory-backend.service` and `deploy/ec2-single-node/godamm-stack.service` for managed Docker Compose startup.
- [x] Add `deploy/ec2-single-node/nginx-inventory.conf` for API-only reverse proxy on `api.godamm.mraks.dev` with HTTPS and security headers.
- [x] Add `deploy/ec2-single-node/deploy-app.sh`, backend env template, and deployment README for repeatable publish flow.

### 📅 Phase 11: Production Hardening + CI/CD (Completed)
- [x] Add backend multi-stage Dockerfile (`openjdk:17-jdk-slim` runtime) and healthcheck integration (`/actuator/health`).
- [x] Add GitHub Actions workflow for backend build/test, Docker Hub push, and EC2 SSH deploy.
- [x] Expand backend runtime config with strict env-driven CORS, optional HTTPS enforcement, Redis-backed rate limiting, Hikari pooling, and actuator metrics exposure.
- [x] Add validation constraints to inventory DTOs and controller request payloads for stronger API safety.
- [x] Update root README with architecture diagram, env variables, deployment path, and one-command deploy flow.

### 📅 Phase 12: Landing Page CRO + Mobile Optimization (Completed)
- [x] Add responsive public landing page (`src/pages/LandingPage.tsx`) focused on local user pain points.
- [x] Keep top navbar aligned with app style and add Sign In/Register actions with a one-click theme toggle.
- [x] Add high-converting sections: hero, 4-feature benefit grid, old-vs-new comparison, and final Start Free CTA.
- [x] Update route defaults so unauthenticated users land on the public page while authenticated users go to dashboard.

---

## 📝 Agent Instructions for Modification
1. **Preserve Context**: Always read `Agents.md` before starting a task.
2. **Sync Updates**: If you add new pages, backend entities, or change the design system, **YOU MUST** update the "Architecture" and "Status" sections of this file immediately.
3. **Aesthetics First**: Never implement a basic UI. Always aim for the "Wowed" factor using the tokens defined here.
4. **Clean Code**: maintain TypeScript types and descriptive variable names.
