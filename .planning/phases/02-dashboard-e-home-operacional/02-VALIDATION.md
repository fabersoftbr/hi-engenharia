---
phase: 2
slug: dashboard-e-home-operacional
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-19
---

# Phase 2 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Static quality gates (`eslint`, `tsc`, `next build`) plus manual UI verification |
| **Config file** | `package.json`, `apps/web/package.json`, `packages/ui/package.json` |
| **Quick run command** | `pnpm --filter web lint && pnpm --filter web typecheck` |
| **Full suite command** | `pnpm lint && pnpm typecheck && pnpm build` |
| **Estimated runtime** | ~90 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm --filter web lint && pnpm --filter web typecheck`
- **After every plan wave:** Run `pnpm lint && pnpm typecheck && pnpm build`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 90 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-02-01 | 01 | 1 | PORT-01 | static + manual | `pnpm --filter web lint && pnpm --filter web typecheck` | ✅ | ⬜ pending |
| 2-02-02 | 02 | 2 | PORT-01, PORT-03 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |
| 2-02-03 | 03 | 2 | PORT-03 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No additional test runner or fixtures are required before execution.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dashboard landing layout renders inside the shared shell | PORT-01 | Existing repo has no interaction or visual regression runner | Open `/portal` in desktop width and confirm the welcome area, summary card grid, quick actions, announcements, and urgent highlights all render inside the shell created in Phase 1. |
| Profile switching updates dashboard content | PORT-01, PORT-03 | Requires runtime interaction with the shell provider | Use the shell profile switcher to move between `Administrador`, `Comercial interno`, `Afiliado/Parceiro externo`, and `Engenharia/Operacao`. Confirm the dashboard card set and quick actions change immediately for each profile. |
| Summary cards navigate to stable module routes | PORT-01 | Navigation semantics are not covered by current automation | Click at least one visible summary card per profile and confirm it navigates to the matching module route defined in `apps/web/lib/platform-config.ts`. |
| Announcements footer links to communication | PORT-03 | Link target and page composition need browser confirmation | In the announcements card, click `Ver todos` and confirm the app navigates to `/comunicacao` while keeping the shared shell visible. |
| Footer cards stack cleanly on mobile | PORT-03 | Responsive layout quality is visual | Open `/portal` at a mobile width and confirm the announcements and urgent-highlights cards stack vertically with readable spacing and no clipped content. |

---

## Validation Sign-Off

- [x] All tasks have automated verify or rely on existing quality gates
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
