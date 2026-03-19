# Technology Stack

**Analysis Date:** 2026-03-19

## Languages

**Primary:**
- TypeScript 5.9.3 - application and shared UI source in `apps/web/**/*.ts(x)` and `packages/ui/src/**/*.ts(x)`, configured by `tsconfig.json`, `apps/web/tsconfig.json`, `packages/ui/tsconfig.json`, and `packages/typescript-config/*.json`

**Secondary:**
- CSS via Tailwind CSS 4.1.18 - design tokens, utility layers, and source scanning in `packages/ui/src/styles/globals.css`, consumed through `apps/web/app/layout.tsx`
- JavaScript (ES modules) - build and lint configuration in `turbo.json`, `apps/web/next.config.mjs`, `apps/web/postcss.config.mjs`, `packages/ui/postcss.config.mjs`, and `packages/eslint-config/*.js`

## Runtime

**Environment:**
- Node.js `>=20` as declared in `package.json`
- Browser runtime through React 19.2.4 and Next.js 16.1.6 in `apps/web/package.json`

**Package Manager:**
- pnpm 9.15.9 from the `packageManager` field in `package.json`
- Lockfile: present in `pnpm-lock.yaml`

## Frameworks

**Core:**
- Next.js 16.1.6 - App Router frontend in `apps/web/app/layout.tsx`, `apps/web/app/page.tsx`, and build config in `apps/web/next.config.mjs`
- React 19.2.4 / React DOM 19.2.4 - rendering layer for `apps/web` and `packages/ui`, declared in `apps/web/package.json` and `packages/ui/package.json`
- Tailwind CSS 4.1.18 - styling pipeline through `packages/ui/src/styles/globals.css`, `packages/ui/postcss.config.mjs`, and `apps/web/postcss.config.mjs`
- shadcn/ui tooling with `radix-maia` style - component generation and registry metadata in `apps/web/components.json` and `packages/ui/components.json`

**Testing:**
- Not detected - no `jest.config.*`, `vitest.config.*`, `*.test.*`, or `*.spec.*` files were found under `apps/` or `packages/`

**Build/Dev:**
- Turborepo 2.8.17 - monorepo task orchestration in `turbo.json`
- Turbopack via `next dev --turbopack` - local development server in `apps/web/package.json`
- PostCSS with `@tailwindcss/postcss` 4.1.18 - CSS compilation in `packages/ui/postcss.config.mjs` and re-exported by `apps/web/postcss.config.mjs`
- ESLint 9.39.2 with shared workspace presets - linting in `apps/web/eslint.config.js`, `packages/ui/eslint.config.js`, and `packages/eslint-config/*.js`
- Prettier 3.8.1 with `prettier-plugin-tailwindcss` 0.7.2 - formatting configured from root `package.json`

## Key Dependencies

**Critical:**
- `next` 16.1.6 - application runtime and framework entrypoint for `apps/web`, configured in `apps/web/package.json` and `apps/web/next.config.mjs`
- `react` / `react-dom` 19.2.4 - component runtime for `apps/web` and `packages/ui`, declared in `apps/web/package.json` and `packages/ui/package.json`
- `@workspace/ui` `workspace:*` - shared internal UI package consumed by `apps/web/app/layout.tsx` and `apps/web/app/page.tsx`, exported from `packages/ui/package.json`
- `next-themes` 0.4.6 - class-based dark mode management in `apps/web/components/theme-provider.tsx`
- `class-variance-authority` 0.7.1 - component variant composition in `packages/ui/src/components/button.tsx`
- `radix-ui` 1.4.3 - accessible primitive/slot abstraction used in `packages/ui/src/components/button.tsx`
- `lucide-react` 0.577.0 - icon library selected in `apps/web/components.json` and `packages/ui/components.json`, declared in `apps/web/package.json` and `packages/ui/package.json`

**Infrastructure:**
- `turbo` 2.8.17 - workspace pipeline defined in `turbo.json`
- `typescript` 5.9.3 - strict typing shared across the monorepo through `packages/typescript-config/base.json`
- `@workspace/eslint-config` `workspace:*` - shared lint package exported by `packages/eslint-config/package.json`
- `@workspace/typescript-config` `workspace:*` - shared TS config package exported by `packages/typescript-config/package.json`
- `clsx` 2.1.1 and `tailwind-merge` 3.5.0 - class composition helper in `packages/ui/src/lib/utils.ts`
- `tw-animate-css` 1.4.0 - animation utility imported in `packages/ui/src/styles/globals.css`
- `zod` 3.25.76 - available in `packages/ui/package.json`, but no source usage is currently detected in `packages/ui/src/**`

## Configuration

**Environment:**
- No concrete env vars are referenced in `apps/web/**` or `packages/ui/**`
- `turbo.json` includes `.env*` in task inputs, so builds are prepared to react to env files when they are introduced
- `packages/eslint-config/base.js` enables `turbo/no-undeclared-env-vars`, which will warn on undeclared env usage
- No `.env*` files were detected in the repository tree during this audit

**Build:**
- Root workspace and scripts: `package.json`
- Workspace package boundaries: `pnpm-workspace.yaml`
- Monorepo task graph and cache inputs: `turbo.json`
- Next.js app config: `apps/web/next.config.mjs`
- App TypeScript config: `apps/web/tsconfig.json`
- App PostCSS config: `apps/web/postcss.config.mjs`
- Shared UI package exports and deps: `packages/ui/package.json`
- Shared UI PostCSS config: `packages/ui/postcss.config.mjs`
- Shared TypeScript baselines: `packages/typescript-config/base.json`, `packages/typescript-config/nextjs.json`, `packages/typescript-config/react-library.json`
- Shared ESLint baselines: `packages/eslint-config/base.js`, `packages/eslint-config/next.js`, `packages/eslint-config/react-internal.js`

## Platform Requirements

**Development:**
- Node.js 20 or newer, per `package.json`
- pnpm 9.15.9, per `package.json`
- Run commands from the repository root `D:/Development/Fabersoft/hi-engenharia/code`, as required by `AGENTS.md`
- The active workspaces are `apps/web`, `packages/ui`, `packages/eslint-config`, and `packages/typescript-config`, declared in `pnpm-workspace.yaml`

**Production:**
- Production runtime is a single Next.js web app from `apps/web`
- Build artifacts target `.next/**` as declared in `turbo.json`
- Start command is `next start` from `apps/web/package.json`, invoked from root via `pnpm start`
- Deployment platform is not declared by committed infra files; no `vercel.json`, `Dockerfile`, `netlify.toml`, `railway.json`, or `.github` workflow files were detected

---

*Stack analysis: 2026-03-19*
