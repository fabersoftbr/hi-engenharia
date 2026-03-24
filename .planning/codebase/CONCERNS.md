# Codebase Concerns

**Analysis Date:** 2026-03-19

## Tech Debt

**Starter Scaffold Still In Place:**
- Issue: `README.md` and `apps/web/app/page.tsx` still ship the generic shadcn/Next starter content. The application surface is a single static page with no domain-specific behavior, navigation, or product framing.
- Files: `README.md`, `apps/web/app/page.tsx`, `apps/web/app/layout.tsx`
- Impact: future feature work will start from placeholder assumptions and will likely require rewriting the public entry experience once real requirements land.
- Fix approach: replace the starter page, page metadata, and README with product-specific structure before adding more routes.

**Lint Enforcement Is Softened:**
- Issue: `packages/eslint-config/base.js` loads `eslint-plugin-only-warn`, so lint findings do not fail the repository workflow. `pnpm lint` currently reports an unused `Geist` import in `apps/web/app/layout.tsx` but still exits successfully.
- Files: `packages/eslint-config/base.js`, `apps/web/app/layout.tsx`
- Impact: dead code and policy drift can accumulate without blocking merges.
- Fix approach: remove `eslint-plugin-only-warn` or promote critical rules to errors and fail CI on warnings.

**Scaffold Config Drift Remains In Tracked Files:**
- Issue: placeholder directories and stale config references remain in the app package. `apps/web/components/.gitkeep`, `apps/web/hooks/.gitkeep`, and `apps/web/lib/.gitkeep` define structure without implementation; `apps/web/tsconfig.json` includes `next.config.ts` even though the tracked file is `apps/web/next.config.mjs`; `packages/ui/src/styles/globals.css` scans a nonexistent `../../../components/**/*.{ts,tsx}` path.
- Files: `apps/web/components/.gitkeep`, `apps/web/hooks/.gitkeep`, `apps/web/lib/.gitkeep`, `apps/web/tsconfig.json`, `apps/web/next.config.mjs`, `packages/ui/src/styles/globals.css`
- Impact: contributors inherit misleading structure and configuration noise, increasing setup time and making class-generation issues harder to diagnose.
- Fix approach: remove unused placeholders until they are needed, align TypeScript include paths with real filenames, and narrow Tailwind sources to existing directories only.

## Known Bugs

**Root Locale And UI Copy Do Not Match Repository Rules:**
- Symptoms: the document root uses `lang="en"` and the only tracked user-facing page is written in English, while repository guidance requires pt-BR user-facing text.
- Files: `apps/web/app/layout.tsx`, `apps/web/app/page.tsx`
- Trigger: open `/` in a browser.
- Workaround: Not applicable; this requires a code change.

## Security Considerations

**Workspace Package Can Be Accidentally Published:**
- Risk: `packages/typescript-config/package.json` sets `"publishConfig": { "access": "public" }` and omits `"private": true` even though the package declares `"license": "PROPRIETARY"`.
- Files: `packages/typescript-config/package.json`
- Current mitigation: the package is currently consumed only as a local workspace dependency.
- Recommendations: add `"private": true"` or remove the public publish config to prevent accidental publication and licensing drift.

**Environment Variable Usage Is Not Strictly Enforced:**
- Risk: the shared lint config only warns on `turbo/no-undeclared-env-vars`, and the warning is further softened by `eslint-plugin-only-warn`.
- Files: `packages/eslint-config/base.js`, `turbo.json`
- Current mitigation: `pnpm lint` will display warnings if undeclared environment variables are introduced.
- Recommendations: make undeclared env-var usage a hard error and document allowed variables before secrets are added to the project.

## Performance Bottlenecks

**Tailwind Source Scanning Is Broader Than The Current App Surface:**
- Problem: the shared stylesheet in `packages/ui/src/styles/globals.css` scans `../../../apps/**/*.{ts,tsx}` for every build and also scans a nonexistent root `components` directory.
- Files: `packages/ui/src/styles/globals.css`
- Cause: workspace-wide `@source` directives live in a single shared stylesheet.
- Improvement path: scope scanning to real app directories such as `../../../apps/web/**/*.{ts,tsx}` and remove dead paths before the monorepo grows.

**Theme Shortcut Rebinds A Global Listener On Each Toggle:**
- Problem: `ThemeHotkey` in `apps/web/components/theme-provider.tsx` registers a `window` `keydown` listener inside an effect that depends on `resolvedTheme`, so every theme switch tears down and recreates the listener.
- Files: `apps/web/components/theme-provider.tsx`
- Cause: the handler closes over theme state instead of using a stable callback.
- Improvement path: keep a stable event listener and read the latest theme through a ref or a React 19-compatible effect event pattern before more global shortcuts are added.

## Fragile Areas

**Shared Global Style Entry Point:**
- Files: `packages/ui/src/styles/globals.css`, `apps/web/app/layout.tsx`, `apps/web/postcss.config.mjs`
- Why fragile: one stylesheet controls Tailwind imports, token definitions, source scanning, and base element styles for every app consuming `@workspace/ui`.
- Safe modification: change tokens and import directives in small steps, then verify with `pnpm build` from the repo root after each change.
- Test coverage: No automated UI or visual regression tests are detected.

**Keyboard Shortcut Handling:**
- Files: `apps/web/components/theme-provider.tsx`
- Why fragile: the theme toggle listens on `window` and excludes only standard typing targets, so future custom widgets or shortcut-heavy screens can conflict with the global `d` binding.
- Safe modification: centralize shortcut handling behind a dedicated shortcut hook and add interaction tests before introducing more key bindings.
- Test coverage: No tracked tests cover keyboard interaction behavior.

**Shared UI Contract Has No Regression Net:**
- Files: `packages/ui/src/components/button.tsx`, `packages/ui/src/lib/utils.ts`
- Why fragile: the only reusable component and its class-merging helper have no tests, snapshots, or story-driven checks, so variant changes will be validated manually.
- Safe modification: add component tests or visual regression checks before expanding variants or using `asChild` more broadly.
- Test coverage: No tracked tests are detected for `packages/ui`.

## Scaling Limits

**Application Surface Area Is Still One Static Page:**
- Current capacity: 1 tracked app route in `apps/web/app/page.tsx`, 0 tracked API route handlers, 0 server actions, and no detected domain modules under `apps/web/lib` or `apps/web/hooks`.
- Limit: once the product needs real flows, new routes and business logic will be introduced without an established module pattern.
- Scaling path: define feature folders and a domain/data layer inside `apps/web` before adding multiple pages.

**Component Library Surface Is Minimal:**
- Current capacity: 1 tracked reusable component in `packages/ui/src/components/button.tsx` and 1 shared helper in `packages/ui/src/lib/utils.ts`.
- Limit: there is no established pattern for shared hooks, forms, async components, or accessibility regression coverage.
- Scaling path: add component-level tests and a small set of reference components before scaling the design system.

## Dependencies at Risk

**`eslint-plugin-only-warn`:**
- Risk: this dependency intentionally downgrades lint failures, weakening the value of the shared ESLint package in `packages/eslint-config`.
- Impact: issues like the unused `Geist` import in `apps/web/app/layout.tsx` survive the normal `pnpm lint` workflow.
- Migration plan: remove the plugin from `packages/eslint-config/base.js` and fail lint in CI when warnings are present.

## Missing Critical Features

**Automated Tests Are Not Set Up:**
- Problem: the tracked scripts in `package.json`, `apps/web/package.json`, and `packages/ui/package.json` cover `build`, `lint`, `format`, and `typecheck`, but there is no tracked test runner config and no tracked `*.test.*` or `*.spec.*` files.
- Blocks: safe refactors of `apps/web/components/theme-provider.tsx`, `packages/ui/src/components/button.tsx`, and `packages/ui/src/styles/globals.css`.

**CI Validation Is Not Detected:**
- Problem: no tracked `.github/workflows/*` or equivalent CI configuration is present, so repository quality gates rely on manual local execution.
- Blocks: consistent validation of `pnpm lint`, `pnpm typecheck`, and `pnpm build` before merges.

**Product Metadata And Localization Baseline Are Missing:**
- Problem: `apps/web/app/layout.tsx` has no exported `metadata` object and `apps/web/app/page.tsx` still contains English starter copy instead of a pt-BR product shell.
- Blocks: a production-ready landing page, localization compliance, and basic SEO/share metadata.

## Test Coverage Gaps

**Keyboard-Driven Theme Switching:**
- What's not tested: the `d` hotkey, focus guards in `isTypingTarget`, and behavior across light, dark, and system themes.
- Files: `apps/web/components/theme-provider.tsx`
- Risk: keyboard conflicts or broken theme toggling can ship unnoticed.
- Priority: High

**Shared Button Variants And `asChild` Composition:**
- What's not tested: class output for `variant` and `size` combinations and `Slot.Root` behavior in `Button`.
- Files: `packages/ui/src/components/button.tsx`
- Risk: styling or accessibility regressions will only surface in manual QA.
- Priority: High

**Global Style And Token Contract:**
- What's not tested: Tailwind source scanning, token availability, and cross-app effects of `packages/ui/src/styles/globals.css`.
- Files: `packages/ui/src/styles/globals.css`, `apps/web/app/layout.tsx`
- Risk: style regressions can break the full app shell with no focused failing test.
- Priority: High

**Landing Page And Locale Compliance:**
- What's not tested: pt-BR copy requirements, the root `lang` attribute, and metadata/localization expectations.
- Files: `apps/web/app/layout.tsx`, `apps/web/app/page.tsx`
- Risk: user-facing copy and accessibility/SEO metadata can drift from repository policy without detection.
- Priority: Medium

---

*Concerns audit: 2026-03-19*
