# Coding Conventions

**Analysis Date:** 2026-03-19

## Naming Patterns

**Files:**
- Use framework-required route filenames in `apps/web/app/page.tsx` and `apps/web/app/layout.tsx`.
- Use kebab-case for reusable module filenames such as `apps/web/components/theme-provider.tsx` and `packages/ui/src/components/button.tsx`.
- Keep utility filenames short and lowercase, as in `packages/ui/src/lib/utils.ts`.
- Keep tool config filenames aligned with the tool convention, such as `.prettierrc`, `.eslintrc.js`, `apps/web/eslint.config.js`, and `packages/ui/postcss.config.mjs`.

**Functions:**
- Use PascalCase for React components and route modules, as in `RootLayout` in `apps/web/app/layout.tsx`, `Page` in `apps/web/app/page.tsx`, `ThemeProvider` and `ThemeHotkey` in `apps/web/components/theme-provider.tsx`, and `Button` in `packages/ui/src/components/button.tsx`.
- Use camelCase for helpers, utilities, and local values, as in `isTypingTarget` in `apps/web/components/theme-provider.tsx`, `buttonVariants` in `packages/ui/src/components/button.tsx`, and `cn` in `packages/ui/src/lib/utils.ts`.

**Variables:**
- Use camelCase for local constants and props-derived values, as in `raleway` and `fontMono` in `apps/web/app/layout.tsx`, `resolvedTheme` in `apps/web/components/theme-provider.tsx`, and `className`, `variant`, `size`, `asChild` in `packages/ui/src/components/button.tsx`.
- Use descriptive names for config exports such as `nextJsConfig` in `packages/eslint-config/next.js` and `config` in `packages/eslint-config/base.js`, `packages/eslint-config/react-internal.js`, and `packages/ui/postcss.config.mjs`.

**Types:**
- Use PascalCase for imported type helpers such as `VariantProps` in `packages/ui/src/components/button.tsx`.
- Prefer inline type composition with `React.ComponentProps` and utility wrappers over standalone interfaces, as in `packages/ui/src/components/button.tsx` and `apps/web/app/layout.tsx`.

## Code Style

**Formatting:**
- Use the root Prettier config in `.prettierrc` as the source of truth.
- Apply LF line endings, no semicolons, double quotes, 2-space indentation, `printWidth: 80`, and `trailingComma: "es5"` from `.prettierrc`.
- Let `prettier-plugin-tailwindcss` sort utility classes and recognize `cn` and `cva` calls using the stylesheet declared in `.prettierrc` at `packages/ui/src/styles/globals.css`.
- Run formatting from workspace scripts in `apps/web/package.json` and `packages/ui/package.json` or through `pnpm format` in `package.json`.
- Expect formatting drift in existing files. `apps/web/app/layout.tsx` and `packages/ui/postcss.config.mjs` currently diverge from the root Prettier settings, so use `.prettierrc` rather than copying local spacing or semicolon choices from those files.

**Linting:**
- Treat `apps/web/eslint.config.js` and `packages/ui/eslint.config.js` as thin entrypoints that import shared rules from `packages/eslint-config/next.js` and `packages/eslint-config/react-internal.js`.
- Use the shared base rules in `packages/eslint-config/base.js`, which layer `@eslint/js`, `typescript-eslint`, `eslint-config-prettier`, `eslint-plugin-turbo`, and `eslint-plugin-only-warn`.
- Keep generated output ignored through `.eslintrc.js` and `packages/eslint-config/base.js`, which exclude `node_modules`, `.next`, `dist`, `.turbo`, and `coverage`.
- For Next.js code, follow the additional React, React Hooks, and Next Core Web Vitals rules from `packages/eslint-config/next.js`.
- For shared React library code, follow the React and React Hooks rules in `packages/eslint-config/react-internal.js`.

## Import Organization

**Order:**
1. External packages first, as in `next/font/google` in `apps/web/app/layout.tsx` and `react`, `class-variance-authority`, `radix-ui` in `packages/ui/src/components/button.tsx`.
2. Leave a blank line before internal workspace imports, local aliases, or relative imports, as in `apps/web/app/layout.tsx`, `packages/ui/src/components/button.tsx`, `packages/eslint-config/next.js`, and `packages/eslint-config/react-internal.js`.
3. Keep side-effect imports near the top of the module, as in `@workspace/ui/globals.css` in `apps/web/app/layout.tsx`.

**Path Aliases:**
- Use `@/*` for app-local imports inside `apps/web`, configured in `apps/web/tsconfig.json` and used by `apps/web/app/layout.tsx` for `@/components/theme-provider`.
- Use `@workspace/ui/*` for shared UI imports, configured in `apps/web/tsconfig.json` and `packages/ui/tsconfig.json`, and used in `apps/web/app/page.tsx`, `apps/web/app/layout.tsx`, and `packages/ui/src/components/button.tsx`.
- Use relative imports inside config packages and within the same package when no alias is defined, as in `packages/eslint-config/next.js` and `packages/eslint-config/react-internal.js`.

## Error Handling

**Patterns:**
- Prefer guard clauses and early returns instead of nested conditionals, as in `isTypingTarget` and `onKeyDown` inside `apps/web/components/theme-provider.tsx`.
- Return `null` for React side-effect-only helpers when they render nothing, as in `ThemeHotkey` in `apps/web/components/theme-provider.tsx`.
- No project-owned `try/catch` or centralized error boundary pattern is established in `apps/web` or `packages/ui`.

## Logging

**Framework:** Not detected

**Patterns:**
- No project-owned runtime logging is present in inspected source files under `apps/web` or `packages/ui`.
- Prefer no logging by default; there is no shared logger wrapper in `apps/web` or `packages/ui`.

## Comments

**When to Comment:**
- Keep comments sparse and targeted to non-obvious framework or rule decisions, as in `packages/eslint-config/next.js` and `packages/eslint-config/react-internal.js` where comments explain why `react/react-in-jsx-scope` is disabled.
- Avoid explanatory comments for straightforward JSX or utility code. Files such as `apps/web/app/page.tsx`, `apps/web/components/theme-provider.tsx`, and `packages/ui/src/lib/utils.ts` rely on readable code instead of inline narration.

**JSDoc/TSDoc:**
- Use short JSDoc blocks mainly in configuration modules for type hints and brief descriptions, as in `.eslintrc.js`, `apps/web/eslint.config.js`, `packages/ui/eslint.config.js`, `packages/eslint-config/base.js`, `packages/eslint-config/next.js`, and `packages/eslint-config/react-internal.js`.
- No TSDoc pattern is established for application or component modules in `apps/web` or `packages/ui`.

## Function Design

**Size:** Keep functions small and single-purpose. `cn` in `packages/ui/src/lib/utils.ts`, `isTypingTarget` in `apps/web/components/theme-provider.tsx`, and `Page` in `apps/web/app/page.tsx` all stay compact and focused.

**Parameters:** Prefer destructured props with inline typing and rest forwarding, as in `RootLayout` in `apps/web/app/layout.tsx`, `ThemeProvider` in `apps/web/components/theme-provider.tsx`, and `Button` in `packages/ui/src/components/button.tsx`.

**Return Values:**
- React route components and reusable components return JSX.
- Side-effect-only helpers return `null`, as in `ThemeHotkey` in `apps/web/components/theme-provider.tsx`.
- Utilities return plain derived values, as in `cn` in `packages/ui/src/lib/utils.ts`.

## Module Design

**Exports:**
- Use default exports for Next.js route modules in `apps/web/app/page.tsx` and `apps/web/app/layout.tsx`.
- Use named exports for reusable components and helpers, as in `apps/web/components/theme-provider.tsx`, `packages/ui/src/components/button.tsx`, and `packages/ui/src/lib/utils.ts`.
- Export package entrypoints through `packages/ui/package.json` rather than through barrel files.

**Barrel Files:** Not detected in `apps/web` or `packages/ui/src`. Package-level export mapping lives in `packages/ui/package.json`.

---

*Convention analysis: 2026-03-19*
