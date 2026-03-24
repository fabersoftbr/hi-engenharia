# Stack Research

**Domain:** Frontend-only operational workspace for CRM, projects, drive, proposals, and internal communication
**Researched:** 2026-03-19
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.1.6 | App Router shell, nested layouts, file-system routing, route-level loading and error states | Already present in the repo and officially supports the route-group and nested-layout patterns needed for a multi-module workspace UI |
| React | 19.2.4 | Interactive UI, client boundaries, local state, composition | Required by the current Next.js stack and well-suited for isolated interactive islands inside dashboard pages |
| Tailwind CSS | 4.1.18 | Responsive layout system, theme tokens, utility-first composition | The repo already uses Tailwind v4 with a shared CSS token file, which matches the need for fast visual iteration and consistent branding |
| shadcn/ui | current registry | Accessible open-code component foundation | Mandatory for this project, matches the existing stack, and already provides the dashboard, sidebar, form, table, empty, drawer, and chart building blocks this UI needs |
| `@workspace/ui` | workspace package | Shared design system layer for reusable primitives and tokens | Keeps the platform visually consistent across modules without introducing a second UI system |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Recharts | 3.3.0 | Dashboard charts, funnel summaries, KPI visuals | Use for dashboard and pipeline summary widgets that need more than static cards |
| `@tanstack/react-table` | 8.21.3 | Rich data table behavior | Use when list screens need sorting, column control, filtering, or denser operational tables |
| `react-hook-form` | 7.71.2 | Form state management | Use when long mock forms such as orçamento, proposta, or price consultation become too large for ad hoc local state |
| Sonner | 2.0.7 | Toast feedback | Use for simulated success, failure, saved, exported, and uploaded states in the frontend |
| `date-fns` | 4.1.0 | Date formatting and lightweight date logic | Use for filters, timelines, status stamps, and localized visual timestamps |
| `cmdk` | 1.1.1 | Command palette and quick actions | Use only if the workspace gets a global command/search launcher in a later phase |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| pnpm | Workspace package management | Already configured at the repo root and aligned with the repository commands |
| Turborepo | Monorepo task orchestration | Keeps app and shared UI package changes coordinated without breaking the workspace split |
| ESLint + Prettier + `prettier-plugin-tailwindcss` | Code quality and class ordering | Important because this project will generate a lot of UI-heavy JSX quickly |
| MCP shadcn + shadcn skill | Component sourcing and composition workflow | Mandatory for every frontend change in this project; use CLI equivalence only when needed |

## Installation

```bash
# Supporting runtime libraries when the matching screens need them
pnpm add recharts @tanstack/react-table react-hook-form sonner date-fns cmdk --filter web

# Equivalent CLI-level component adds (prefer MCP shadcn in practice)
pnpm dlx shadcn@latest add sidebar chart table form dialog drawer breadcrumb empty skeleton tabs dropdown-menu card input select textarea sheet badge -c apps/web

# Promote only truly reusable primitives into the shared UI package
pnpm add <package> --filter @workspace/ui
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js App Router | Vite + React Router | Use only if the product becomes a pure SPA with no need for Next.js layout conventions or route-level loading/error file patterns |
| shadcn/ui + `@workspace/ui` | MUI or Ant Design | Use only if the team intentionally accepts a more opinionated enterprise design system and is willing to give up the current open-code customization model |
| `@tanstack/react-table` | Native `table` only | Use native tables when the screen is mostly static and does not need sorting, faceting, or column interactions |
| Recharts via shadcn chart patterns | Chart.js or Nivo | Use only if a later phase needs chart types or interaction models that Recharts cannot cover cleanly |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| A second visual component system alongside shadcn | It fragments the visual language and creates duplicate component work | Keep everything on shadcn plus `@workspace/ui` |
| Building custom primitives for buttons, inputs, dialogs, tables, or drawers | It breaks the repo rules and slows delivery on a UI-heavy phase | Source components through MCP shadcn and compose them |
| Real auth, Bitrix SDKs, upload SDKs, or PDF/export libraries in Phase 01 | They violate the frontend-only scope and drag planning into backend concerns | Use mock data, fake actions, and visual-only flows |
| Drag-and-drop workflow engines for the first pass | High complexity for little validation value when the current goal is visual clarity | Start with static or lightly interactive pipeline boards |

## Stack Patterns by Variant

**If a screen is mostly layout and navigation:**
- Use a server route with nested layout composition
- Because Next.js layouts and route groups keep module shells consistent without forcing everything into a single client bundle

**If a screen is interaction-heavy:**
- Keep the page shell server-rendered and move filters, drawers, tabs, and charts into client components
- Because this preserves route structure while isolating browser-only behavior

**If a visual block is shared across modules:**
- Promote it into `packages/ui` only after it appears in at least two modules
- Because the project will move faster if app-specific patterns stay local until they prove reusable

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Next.js 16.1.6 | React 19.2.4 | Current repo baseline; keep route-level architecture aligned with App Router conventions |
| Tailwind CSS 4.1.18 | CSS-first `@theme` token workflow | Matches the current shared `globals.css` pattern in `@workspace/ui` |
| shadcn/ui current docs | Tailwind CSS 4 + React app layouts | Current docs cover sidebar, drawer, dialog, dashboard blocks, and responsive app navigation patterns needed here |
| Recharts 3.3.0 | React app dashboards | Introduce only when dashboard and pipeline analytics need charting, not before |
| `@tanstack/react-table` 8.21.3 | Operational list/detail views | Best introduced with the first genuinely interactive data-heavy table phase |

## Sources

- `/vercel/next.js/v16.1.6` — layout composition, nested routing, App Router file conventions
- `/tailwindlabs/tailwindcss.com` — `@theme`, semantic tokens, responsive composition
- `/websites/ui_shadcn` — sidebar, dashboard blocks, responsive drawer/dialog patterns
- `@shadcn` registry search — available blocks/components confirmed for `sidebar`, `dashboard-01`, `login-01`, `chart`, `table`, `empty`, `form`, `breadcrumb`, `drawer`
- npm registry via `pnpm view` — current versions verified for `recharts`, `@tanstack/react-table`, `react-hook-form`, `sonner`, `date-fns`, and `cmdk`

---
*Stack research for: frontend-only operational workspace UI*
*Researched: 2026-03-19*
