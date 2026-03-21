---
phase: 8
slug: estados-responsividade-e-jornada-completa
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 8 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | `vitest` + `@testing-library/react` + `jsdom` recommended in Wave 0; current fallback is static quality gates plus manual UI verification |
| **Config file** | `apps/web/vitest.config.ts` and `apps/web/test/setup.ts` must be added in Wave 0 |
| **Quick run command** | `pnpm --filter web lint && pnpm --filter web typecheck` before Wave 0, then `pnpm --filter web vitest run <target-spec>` |
| **Full suite command** | `pnpm lint && pnpm typecheck && pnpm build` before Wave 0, then `pnpm lint && pnpm typecheck && pnpm build && pnpm --filter web vitest run` |
| **Estimated runtime** | ~90 seconds before Wave 0, ~150 seconds after targeted UI tests are added |

---

## Sampling Rate

- **After every task commit:** Run `pnpm --filter web lint && pnpm --filter web typecheck`
- **After every plan wave:** Run `pnpm lint && pnpm typecheck && pnpm build`
- **Before `$gsd-verify-work`:** Full suite must be green and all Phase 8 manual audits completed
- **Max feedback latency:** 150 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 8-08-00 | 00 | 0 | STAT-01, STAT-02, STAT-03, RESP-01 | setup + static | `pnpm --filter web lint && pnpm --filter web typecheck` | ❌ Wave 0 | ⬜ pending |
| 8-08-01 | 01 | 1 | STAT-01, STAT-02, STAT-03 | component + manual | `pnpm --filter web vitest run apps/web/components/platform/states/__tests__/loading-and-feedback.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 8-08-02 | 02 | 2 | RESP-01 | component + manual | `pnpm --filter web vitest run apps/web/components/platform/responsive/__tests__/responsive-layouts.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 8-08-03 | 03 | 3 | PIPE-04 | manual smoke + optional e2e | `none - keep manual until Playwright or equivalent is installed` | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠ flaky*

---

## Wave 0 Requirements

- [ ] `apps/web/vitest.config.ts` - configure `vitest` for the `web` app with `jsdom`
- [ ] `apps/web/test/setup.ts` - register `@testing-library/jest-dom` and shared DOM/polyfill setup
- [ ] `apps/web/components/platform/states/__tests__/loading-and-feedback.test.tsx` - cover typed skeletons, submit pending UI, and Sonner success/error flows
- [ ] `apps/web/components/platform/states/__tests__/empty-states.test.tsx` - cover empty and no-results variants plus hidden-empty-section rules
- [ ] `apps/web/components/platform/responsive/__tests__/responsive-layouts.test.tsx` - cover shell/header, responsive tables, detail stacking, and mobile pipeline tabs
- [ ] Optional e2e: `apps/web/e2e/journey.spec.ts` - route smoke for `/jornada` and cross-module back-links if an e2e runner is installed
- [ ] `apps/web/package.json` adds a `test` script that runs `vitest run`
- [ ] Dev dependencies installed in `apps/web`: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Shared loading, empty, no-results, success, and error states appear consistently across the main modules | STAT-01, STAT-02, STAT-03 | Visual fidelity, copy, and placement consistency must be seen across multiple routes and themes | Open the main routes for dashboard, orçamentos, CRM, anteprojetos, propostas, tabela de preços, projetos, drive, comunicação, and jornada in desktop and mobile widths. Confirm each route has loading or submit-pending feedback, empty/no-results coverage where applicable, and Sonner-based success/error feedback instead of `window.alert()`. |
| Responsive shell, tables, detail pages, and pipelines remain readable at the locked `md` breakpoint | RESP-01 | Layout density, overflow behavior, and mobile branch switching depend on actual rendering width | Resize from desktop to `<768px`, then verify the shell header remains `h-16`, toolbars scroll or wrap correctly, tables hide lower-priority columns without header drift, detail pages stack vertically, and mobile pipelines switch to tabbed/active-stage rendering with drag-and-drop disabled. |
| Dark-mode and focus treatment stay consistent after cross-cutting state work | STAT-03, RESP-01 | Theme regressions and focus visibility are easier to miss in static checks | Toggle theme with `D` and via the avatar dropdown, then tab through dialogs, sheets, tooltips, and buttons. Confirm visible focus indicators, correct toast colors, and WCAG-friendly contrast across light and dark themes. |
| `/jornada` communicates a coherent orçamento-to-obra flow without routing users into dead ends | PIPE-04 | The journey depends on navigation, related-record links, and placeholder avoidance across modules | Open `/jornada`, follow each available module card and related-record link, and confirm the user can move forward and back through the chain with contextual breadcrumbs, a visible back action, and no unexpected placeholder or broken transition. If downstream Phase 6/7 modules are still incomplete, verify the journey explicitly scopes itself to currently implemented modules and labels unavailable handoffs clearly. |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or explicit Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive execution tasks without at least static quality gates
- [ ] Wave 0 covers missing automated verification for STAT-01, STAT-02, STAT-03, and RESP-01
- [ ] No watch-mode flags
- [ ] Feedback latency < 150s
- [ ] `nyquist_compliant: true` can only be set after Wave 0 is implemented

**Approval:** pending
