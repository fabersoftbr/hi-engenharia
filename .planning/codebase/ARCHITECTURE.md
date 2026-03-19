# Architecture

**Analysis Date:** 2026-03-19

## Pattern Overview

**Overall:** Turborepo monorepo with a single Next.js App Router application, a shared UI package, and centralized lint/type configuration packages.

**Key Characteristics:**
- Runtime code is split between `apps/web` for application routes and `packages/ui` for reusable styling and components.
- Shared developer policy lives in config packages, with `apps/web/eslint.config.js`, `packages/ui/eslint.config.js`, `apps/web/tsconfig.json`, and `packages/ui/tsconfig.json` extending `packages/eslint-config/*` and `packages/typescript-config/*`.
- Cross-package consumption is explicit: `apps/web/app/layout.tsx` and `apps/web/app/page.tsx` import from `@workspace/ui`, and `apps/web/next.config.mjs` transpiles `@workspace/ui` for the Next.js app.

## Layers

**Workspace Orchestration:**
- Purpose: Coordinate builds, linting, formatting, type-checking, and dev mode across all workspaces.
- Location: `package.json`, `pnpm-workspace.yaml`, `turbo.json`
- Contains: Root scripts, workspace package discovery, and Turborepo task graph settings.
- Depends on: `pnpm`, `turbo`, and workspace package manifests such as `apps/web/package.json` and `packages/ui/package.json`.
- Used by: Every workspace package through root commands like `pnpm dev`, `pnpm build`, `pnpm lint`, and `pnpm typecheck`.

**Application Route Layer:**
- Purpose: Define request entry points and render the Next.js application shell.
- Location: `apps/web/app/layout.tsx`, `apps/web/app/page.tsx`, `apps/web/app/favicon.ico`
- Contains: App Router root layout, the default page, and route-level metadata assets.
- Depends on: Next.js runtime APIs, `apps/web/components/theme-provider.tsx`, `@workspace/ui/globals.css`, and `@workspace/ui/components/button`.
- Used by: Browser requests served by the `web` package in `apps/web/package.json`.

**Client Behavior Layer:**
- Purpose: Isolate browser-only behavior behind a client component boundary.
- Location: `apps/web/components/theme-provider.tsx`
- Contains: `ThemeProvider`, `ThemeHotkey`, and DOM event guards for theme toggling.
- Depends on: `next-themes`, React hooks, and the `.dark` CSS variant defined in `packages/ui/src/styles/globals.css`.
- Used by: `apps/web/app/layout.tsx`, which wraps all routed content with the provider.

**Shared UI Layer:**
- Purpose: Provide reusable presentational primitives and shared styling utilities.
- Location: `packages/ui/src/components/button.tsx`, `packages/ui/src/lib/utils.ts`, `packages/ui/src/styles/globals.css`
- Contains: Variant-based UI components, class name helpers, Tailwind sources, and CSS custom-property tokens.
- Depends on: React, `class-variance-authority`, `radix-ui`, `clsx`, `tailwind-merge`, Tailwind CSS 4, and shadcn-generated configuration from `packages/ui/components.json`.
- Used by: `apps/web/app/page.tsx`, `apps/web/app/layout.tsx`, and future app code via the exports in `packages/ui/package.json`.

**Shared Config Layer:**
- Purpose: Keep linting and TypeScript behavior consistent across app and package boundaries.
- Location: `packages/eslint-config/base.js`, `packages/eslint-config/next.js`, `packages/eslint-config/react-internal.js`, `packages/typescript-config/base.json`, `packages/typescript-config/nextjs.json`, `packages/typescript-config/react-library.json`
- Contains: Flat ESLint configs, shared TypeScript compiler presets, and reusable package exports.
- Depends on: ESLint plugins, TypeScript, and the package-level config entrypoints that import these presets.
- Used by: `apps/web/eslint.config.js`, `packages/ui/eslint.config.js`, `tsconfig.json`, `apps/web/tsconfig.json`, and `packages/ui/tsconfig.json`.

## Data Flow

**Initial Page Render and Theme Wiring:**

1. The Turborepo workspace runs the `web` app from `apps/web/package.json`, with workspace discovery controlled by `pnpm-workspace.yaml` and task orchestration defined in `turbo.json`.
2. A request enters the App Router root at `apps/web/app/layout.tsx`, which imports `@workspace/ui/globals.css`, loads fonts through `next/font/google`, and wraps all children with `ThemeProvider` from `apps/web/components/theme-provider.tsx`.
3. The routed page at `apps/web/app/page.tsx` renders static content and consumes `Button` from `packages/ui/src/components/button.tsx` through the `@workspace/ui/components/button` export path.
4. `ThemeProvider` in `apps/web/components/theme-provider.tsx` mounts `NextThemesProvider`, and `ThemeHotkey` toggles the `class="dark"` state when the user presses `d` outside form fields.
5. Styling resolves in `packages/ui/src/styles/globals.css`, where Tailwind sources include both `apps/**/*.{ts,tsx}` and `packages/ui/**/*.{ts,tsx}`, and theme tokens are mapped to utility classes used by `packages/ui/src/components/button.tsx`.

**State Management:**
- No application-level store is present in `apps/web` or `packages/ui`.
- Theme state is delegated to `next-themes` inside `apps/web/components/theme-provider.tsx`.
- Route rendering in `apps/web/app/page.tsx` is static and prop-free; no data fetching, reducers, contexts, or cache libraries were detected in `apps/web` or `packages/ui`.

## Key Abstractions

**Root Layout Shell:**
- Purpose: Own the HTML shell, font setup, global CSS import, and provider composition.
- Examples: `apps/web/app/layout.tsx`
- Pattern: Server component composition at the App Router root, with client behavior delegated to a nested provider.

**Theme Boundary:**
- Purpose: Keep browser-only theme logic out of server-rendered route files.
- Examples: `apps/web/components/theme-provider.tsx`
- Pattern: Single `"use client"` wrapper component with an internal helper component for keyboard events.

**Shared Component Contract:**
- Purpose: Expose reusable UI primitives through stable package exports instead of relative cross-workspace imports.
- Examples: `packages/ui/package.json`, `packages/ui/src/components/button.tsx`, `packages/ui/src/lib/utils.ts`
- Pattern: Package export map plus utility-first styling via `cva()` and `cn()`.

**Design Token Source:**
- Purpose: Centralize Tailwind imports, color tokens, and font variables for the entire monorepo UI surface.
- Examples: `packages/ui/src/styles/globals.css`, `apps/web/postcss.config.mjs`, `packages/ui/postcss.config.mjs`
- Pattern: Shared CSS entrypoint imported by the app, with package-local PostCSS config re-exported into `apps/web`.

## Entry Points

**Workspace Commands:**
- Location: `package.json`
- Triggers: Manual `pnpm` commands from the repo root.
- Responsibilities: Invoke Turborepo tasks across all workspaces.

**Task Graph:**
- Location: `turbo.json`
- Triggers: Any root command that resolves to `turbo`.
- Responsibilities: Define task dependencies, cache behavior, and build outputs.

**Web Application Root:**
- Location: `apps/web/app/layout.tsx`
- Triggers: Every route request handled by the Next.js app.
- Responsibilities: Apply global styling, fonts, and theming wrappers.

**Default Route:**
- Location: `apps/web/app/page.tsx`
- Triggers: Requests to the root `/` route.
- Responsibilities: Render the starter page content using shared UI exports.

## Error Handling

**Strategy:** Framework-default handling with minimal local defensive checks.

**Patterns:**
- No explicit `error.tsx`, route handlers, server actions, or custom error utilities were detected under `apps/web/app`.
- `apps/web/components/theme-provider.tsx` uses early-return guards in `isTypingTarget()` and the `onKeyDown` handler to avoid invalid DOM access and unintended theme toggles.
- Shared utilities such as `packages/ui/src/lib/utils.ts` are thin wrappers and do not add custom exception handling.

## Cross-Cutting Concerns

**Logging:** Not detected in `apps/web` or `packages/ui`.
**Validation:** Not detected in runtime code; `zod` exists in `packages/ui/package.json` but is not used by files currently present in `packages/ui/src`.
**Authentication:** Not detected; no auth provider, middleware, or session code exists in `apps/web`.

---

*Architecture analysis: 2026-03-19*
