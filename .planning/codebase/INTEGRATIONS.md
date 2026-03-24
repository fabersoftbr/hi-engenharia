# External Integrations

**Analysis Date:** 2026-03-19

## APIs & External Services

**Frontend Framework Services:**
- Google Fonts via Next.js font loader - `Geist`, `Geist_Mono`, and `Raleway` are imported in `apps/web/app/layout.tsx`
  - SDK/Client: `next/font/google` from `next`
  - Auth: None
- Theme persistence in the browser - light/dark theme state is managed in `apps/web/components/theme-provider.tsx`
  - SDK/Client: `next-themes`
  - Auth: None

**Development Tooling Services:**
- shadcn registry/CLI metadata - component scaffolding is configured by `apps/web/components.json`, `packages/ui/components.json`, and documented in `README.md`
  - SDK/Client: `shadcn`
  - Auth: None

## Data Storage

**Databases:**
- None detected
  - Connection: No database env vars or client imports found in `apps/web/**` or `packages/**`
  - Client: No ORM or database client packages are referenced in `package.json`, `apps/web/package.json`, or `packages/ui/package.json`

**File Storage:**
- Local filesystem only
  - Static assets and build output are handled by Next.js in `apps/web/app/**` and `.next/**`
  - Shared styles live in `packages/ui/src/styles/globals.css`

**Caching:**
- None detected at the application layer
  - Turborepo local task caching is configured in `turbo.json`
  - Next.js dev/build caches appear under `apps/web/.next/**`, but no external cache service is integrated

## Authentication & Identity

**Auth Provider:**
- None
  - Implementation: No auth SDKs, session middleware, or identity provider config were detected in `apps/web/**`, `packages/**`, or the workspace manifests

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Framework-default development logging only
  - No dedicated logging library imports were found in `apps/web/**` or `packages/ui/**`
  - Development logs are emitted by Next.js during local runs, but no committed observability pipeline is configured

## CI/CD & Deployment

**Hosting:**
- Not detected
  - `apps/web/package.json` exposes `next build` and `next start`
  - No deployment manifests such as `vercel.json`, `Dockerfile`, `netlify.toml`, `railway.json`, or `wrangler.toml` were found at the repository root

**CI Pipeline:**
- None detected
  - No `.github` workflow files were found
  - The repo relies on local workspace scripts in `package.json` and `turbo.json`

## Environment Configuration

**Required env vars:**
- None detected in source
- `turbo.json` includes `.env*` as task inputs, so env-backed config is supported when added later
- `packages/eslint-config/base.js` enables `turbo/no-undeclared-env-vars` to guard future env usage

**Secrets location:**
- Not detected
  - No `.env*` files were found in the repository tree
  - No secret-management client or cloud credentials integration was detected in committed source/config files

## Webhooks & Callbacks

**Incoming:**
- None
  - No route handlers, API endpoints, or webhook receiver code were detected under `apps/web/app/**`

**Outgoing:**
- None
  - No `fetch(...)`, `axios`, `graphql`, or third-party API client usage was detected in `apps/web/**` or `packages/ui/**`

---

*Integration audit: 2026-03-19*
