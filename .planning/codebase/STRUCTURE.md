# Codebase Structure

**Analysis Date:** 2026-03-19

## Directory Layout

```text
code/
├── .planning/                 # Generated planning and codebase analysis artifacts
├── apps/
│   └── web/                   # Next.js 16 application workspace
├── packages/
│   ├── ui/                    # Shared UI library and global styles
│   ├── eslint-config/         # Shared flat ESLint configs
│   └── typescript-config/     # Shared TypeScript presets
├── package.json               # Root workspace scripts
├── pnpm-workspace.yaml        # Workspace package discovery
├── turbo.json                 # Turborepo task graph
└── tsconfig.json              # Root TypeScript baseline
```

## Directory Purposes

**`apps/web`:**
- Purpose: Contain the only runtime application in the repository.
- Contains: App Router files, app-local components, app-local aliases, and workspace-specific config.
- Key files: `apps/web/app/layout.tsx`, `apps/web/app/page.tsx`, `apps/web/components/theme-provider.tsx`, `apps/web/package.json`, `apps/web/tsconfig.json`

**`apps/web/app`:**
- Purpose: Hold route entry points and route-owned assets.
- Contains: `layout.tsx`, `page.tsx`, and `favicon.ico`.
- Key files: `apps/web/app/layout.tsx`, `apps/web/app/page.tsx`, `apps/web/app/favicon.ico`

**`apps/web/components`:**
- Purpose: Hold app-specific components that should not be exported as shared package primitives.
- Contains: The theme wrapper plus a placeholder `.gitkeep`.
- Key files: `apps/web/components/theme-provider.tsx`, `apps/web/components/.gitkeep`

**`apps/web/hooks`:**
- Purpose: Reserved location for app-only hooks.
- Contains: Placeholder `.gitkeep` only.
- Key files: `apps/web/hooks/.gitkeep`

**`apps/web/lib`:**
- Purpose: Reserved location for app-only utilities and helpers.
- Contains: Placeholder `.gitkeep` only.
- Key files: `apps/web/lib/.gitkeep`

**`packages/ui`:**
- Purpose: Provide reusable UI code and styling shared by application workspaces.
- Contains: Source files under `packages/ui/src`, package exports, PostCSS config, shadcn metadata, and workspace-specific lint/type config.
- Key files: `packages/ui/package.json`, `packages/ui/components.json`, `packages/ui/postcss.config.mjs`, `packages/ui/tsconfig.json`

**`packages/ui/src/components`:**
- Purpose: Hold reusable presentational components exported through `@workspace/ui/components/*`.
- Contains: `button.tsx` plus placeholder `.gitkeep`.
- Key files: `packages/ui/src/components/button.tsx`, `packages/ui/src/components/.gitkeep`

**`packages/ui/src/lib`:**
- Purpose: Hold shared non-visual utilities that support the UI package.
- Contains: `utils.ts` plus placeholder `.gitkeep`.
- Key files: `packages/ui/src/lib/utils.ts`, `packages/ui/src/lib/.gitkeep`

**`packages/ui/src/hooks`:**
- Purpose: Reserved location for shared hooks exported through `@workspace/ui/hooks/*`.
- Contains: Placeholder `.gitkeep` only.
- Key files: `packages/ui/src/hooks/.gitkeep`

**`packages/ui/src/styles`:**
- Purpose: Hold shared CSS and design tokens for all UI consumers.
- Contains: The monorepo-wide Tailwind and theme entrypoint.
- Key files: `packages/ui/src/styles/globals.css`

**`packages/eslint-config`:**
- Purpose: Centralize reusable flat ESLint configs for app and package workspaces.
- Contains: Base config plus React- and Next-specific config variants.
- Key files: `packages/eslint-config/base.js`, `packages/eslint-config/next.js`, `packages/eslint-config/react-internal.js`, `packages/eslint-config/package.json`

**`packages/typescript-config`:**
- Purpose: Centralize reusable TypeScript config presets.
- Contains: Base, Next.js, and React library `tsconfig` presets.
- Key files: `packages/typescript-config/base.json`, `packages/typescript-config/nextjs.json`, `packages/typescript-config/react-library.json`, `packages/typescript-config/package.json`

**`.planning/codebase`:**
- Purpose: Store generated codebase reference documents for the GSD workflow.
- Contains: Architecture, structure, stack, testing, conventions, and concern documents when generated.
- Key files: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`

## Key File Locations

**Entry Points:**
- `package.json`: Root command entrypoint for `turbo`-driven workspace tasks.
- `apps/web/app/layout.tsx`: Application shell entrypoint for all routes.
- `apps/web/app/page.tsx`: Route entrypoint for `/`.

**Configuration:**
- `pnpm-workspace.yaml`: Declares `apps/*` and `packages/*` as pnpm workspaces.
- `turbo.json`: Defines the monorepo task graph and cache behavior.
- `tsconfig.json`: Points the repo root to `@workspace/typescript-config/base.json`.
- `apps/web/next.config.mjs`: Transpiles `@workspace/ui` for the Next.js app.
- `apps/web/tsconfig.json`: Defines app-local aliases such as `@/*` and `@workspace/ui/*`.
- `apps/web/components.json`: Configures shadcn generation for the app workspace.
- `packages/ui/components.json`: Configures shadcn generation for the UI package.
- `apps/web/postcss.config.mjs`: Re-exports the shared PostCSS config from `@workspace/ui`.
- `packages/ui/postcss.config.mjs`: Owns the shared Tailwind PostCSS plugin setup.
- `apps/web/eslint.config.js`: Extends `@workspace/eslint-config/next-js`.
- `packages/ui/eslint.config.js`: Extends `@workspace/eslint-config/react-internal`.

**Core Logic:**
- `apps/web/components/theme-provider.tsx`: App-only client behavior for theme toggling.
- `packages/ui/src/components/button.tsx`: Shared UI component example and current primary reusable primitive.
- `packages/ui/src/lib/utils.ts`: Shared `cn()` utility used by UI components and app layout.
- `packages/ui/src/styles/globals.css`: Shared style system and Tailwind source scanning configuration.

**Testing:**
- Not detected: no test config files or `*.test.*` / `*.spec.*` files were found under `apps/web` or `packages/ui`.

## Naming Conventions

**Files:**
- Use lowercase or kebab-case for source modules and config files: `theme-provider.tsx`, `next.config.mjs`, `react-internal.js`, `globals.css`.

**Directories:**
- Use short lowercase workspace and source directory names: `apps/web`, `packages/ui`, `packages/eslint-config`, `packages/typescript-config`, `apps/web/components`.

## Where to Add New Code

**New Feature:**
- Primary code: Put new routes and route-owned files in `apps/web/app`.
- Tests: Not detected in the current repo; if tests are introduced later, place them next to the feature in `apps/web` or `packages/ui` to match the existing workspace split.

**New Component/Module:**
- Implementation: Put app-only components in `apps/web/components`.
- Implementation: Put shared reusable UI primitives in `packages/ui/src/components` and export them via the existing `packages/ui/package.json` export pattern.

**Utilities:**
- Shared helpers: Put reusable UI helpers in `packages/ui/src/lib`.
- Shared hooks: Put reusable package hooks in `packages/ui/src/hooks`.
- App-only helpers: Put page-specific helpers in `apps/web/lib` and app-only hooks in `apps/web/hooks`.

## Special Directories

**`.planning/codebase`:**
- Purpose: Generated architecture and workflow reference docs.
- Generated: Yes
- Committed: Yes

**`apps/web/hooks`:**
- Purpose: Placeholder for future app-only hooks.
- Generated: No
- Committed: Yes

**`apps/web/lib`:**
- Purpose: Placeholder for future app-only helpers.
- Generated: No
- Committed: Yes

**`packages/ui/src/hooks`:**
- Purpose: Placeholder for future shared hooks.
- Generated: No
- Committed: Yes

**`.agent`, `.claude`, `.codex`, `.gemini`:**
- Purpose: Agent and workflow tooling directories; keep application runtime code out of these paths.
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-03-19*
