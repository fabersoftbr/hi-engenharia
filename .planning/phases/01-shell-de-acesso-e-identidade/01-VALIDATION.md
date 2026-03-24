---
phase: 1
slug: shell-de-acesso-e-identidade
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-19
---

# Phase 1 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Static quality gates (`eslint`, `tsc`, `next build`) plus manual UI verification |
| **Config file** | `package.json`, `apps/web/package.json`, `packages/ui/package.json` |
| **Quick run command** | `pnpm --filter web lint && pnpm --filter @workspace/ui lint && pnpm --filter web typecheck && pnpm --filter @workspace/ui typecheck` |
| **Full suite command** | `pnpm lint && pnpm typecheck && pnpm build` |
| **Estimated runtime** | ~90 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm --filter web lint && pnpm --filter @workspace/ui lint && pnpm --filter web typecheck && pnpm --filter @workspace/ui typecheck`
- **After every plan wave:** Run `pnpm lint && pnpm typecheck && pnpm build`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 90 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | AUTH-01, PORT-02, PORT-04, ROLE-01 | static | `pnpm --filter web lint && pnpm --filter @workspace/ui lint && pnpm --filter web typecheck && pnpm --filter @workspace/ui typecheck` | ✅ | ⬜ pending |
| 1-01-02 | 02 | 2 | AUTH-01, AUTH-02 | static + manual | `pnpm --filter web lint && pnpm --filter web typecheck` | ✅ | ⬜ pending |
| 1-01-03 | 03 | 2 | PORT-02, PORT-04 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |
| 1-01-04 | 04 | 3 | ROLE-01, ROLE-02 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No additional test runner or fixtures are required before execution.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Desktop login split layout and mobile single-column layout | AUTH-01 | Visual responsiveness is not covered by existing automation | Open `/login` in desktop and mobile widths. Confirm the right brand panel appears only on desktop and the form remains centered in both themes. |
| Sidebar collapse on desktop and drawer behavior on mobile | PORT-02 | Existing repo has no interaction/E2E runner | In the shell, toggle the sidebar on desktop, then switch to mobile width and confirm the menu opens as an overlay drawer from the header trigger. |
| Breadcrumb updates across module routes | PORT-04 | Breadcrumb meaning is route-context specific | Navigate between `/portal`, `/crm`, `/projetos`, and `/drive`. Confirm the header breadcrumb label matches the current module and leaf page. |
| Profile switch changes visible modules | ROLE-01 | Requires runtime interaction across shared state | Use the avatar dropdown to switch between `Administrador`, `Comercial interno`, `Afiliado/Parceiro externo`, and `Engenharia/Operacao`. Confirm the sidebar module list changes immediately for each. |
| Unauthorized direct route shows blocked state | ROLE-02 | Requires manual route override per profile | While using a restricted profile, type a disallowed module URL directly in the browser and confirm the shell stays visible while the page body shows a restricted-access state with a return action. |

---

## Validation Sign-Off

- [x] All tasks have automated verify or rely on existing quality gates
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
