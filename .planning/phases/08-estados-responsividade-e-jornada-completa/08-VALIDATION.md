---
phase: 8
slug: estados-responsividade-e-jornada-completa
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-21
---

# Phase 8 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x + @testing-library/react |
| **Config file** | `apps/web/vitest.config.ts` |
| **Quick run command** | `cd apps/web && pnpm vitest run --reporter=verbose` |
| **Full suite command** | `cd apps/web && pnpm vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd apps/web && pnpm vitest run --reporter=verbose`
- **After every plan wave:** Run `cd apps/web && pnpm vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 08-02-01 | 02 | 1 | STAT-01 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-02-02 | 02 | 1 | STAT-02 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-02-03 | 02 | 1 | STAT-01, STAT-02 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-03-01 | 03 | 2 | RESP-01 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-03-02 | 03 | 2 | RESP-01 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-04-01 | 04 | 2 | RESP-01 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-04-02 | 04 | 2 | RESP-01 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-04-03 | 04 | 2 | RESP-01 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-05-01 | 05 | 3 | STAT-03, RESP-01 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-05-02 | 05 | 3 | STAT-03 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-06-01 | 06 | 3 | PIPE-04 | unit | `cd apps/web && pnpm vitest run components/platform/jornada/__tests__/journey-page.test.tsx --reporter=verbose` | ❌ W0 | ⬜ pending |
| 08-06-02 | 06 | 3 | PIPE-04 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ❌ W0 | ⬜ pending |
| 08-07-01 | 07 | 4 | PIPE-04 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |
| 08-07-02 | 07 | 4 | PIPE-04 | unit | `cd apps/web && pnpm vitest run --reporter=verbose` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `components/platform/jornada/__tests__/journey-page.test.tsx` — stubs for PIPE-04 (journey page renders timeline with module cards)
- [ ] Verify existing test specs still pass: `empty-states.test.tsx`, `loading-and-feedback.test.tsx`, `responsive-layouts.test.tsx`

*Wave 0 note: Plans 00 and 01 already executed and established the Vitest harness. The only gap is a new test file for the /jornada page (PIPE-04). All other requirements have existing test files.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dark mode contrast across all screens | RESP-01 | Visual inspection required for WCAG AA | Navigate all screens in dark mode, check text contrast on colored backgrounds |
| Mobile pipeline drag-and-drop disabled | RESP-01 | Requires touch device or DevTools mobile emulation | Open CRM/Anteprojects pipeline on mobile viewport (375px), verify no drag handles visible |
| Sheet pull-to-close gesture | RESP-01 | Requires touch interaction | Open any bottom sheet on mobile, swipe down to dismiss |
| Toast stacking behavior | STAT-03 | Requires multiple rapid actions | Trigger 3+ actions in quick succession, verify toasts stack correctly |
| Navigation transition smoothness | PIPE-04 | Visual timing inspection | Navigate between connected modules, verify 150ms fade |
| Journey page arrow connectors rendering | PIPE-04 | CSS pseudo-element visual check | Open /jornada page, verify arrows connect cards correctly in both themes |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (journey-page.test.tsx)
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
