---
phase: 4
slug: crm-e-pipeline-comercial
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-20
---

# Phase 4 - Validation Strategy

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
| 4-04-01 | 01 | 1 | CRM-01 | static + manual | `pnpm --filter web lint && pnpm --filter web typecheck` | ✅ | ⬜ pending |
| 4-04-02 | 02 | 2 | CRM-02 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |
| 4-04-03 | 03 | 3 | CRM-03, PIPE-01 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No additional test runner, fixture harness, or backend mock server is required before execution.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| CRM workspace replaces the placeholder and opens in Kanban by default | CRM-01, CRM-03 | Visual layout, toggle state, and placeholder removal need browser confirmation | Open `/crm` and confirm the page no longer uses `ModulePlaceholderPage`, the `Kanban` view is active on first paint, and the toolbar with filters plus `Nova oportunidade` is visible before the board content. |
| Shared filters affect both Kanban and list views consistently | CRM-01 | Filter persistence across views is UI state behavior | Apply responsável, prioridade, and search filters on `/crm`, switch between `Kanban` and `Lista`, and confirm the same opportunity subset appears in both views without resetting filters. |
| Dragging cards updates stage placement and per-column totals | CRM-03, PIPE-01 | Drag-and-drop movement and live totals are interactive browser behavior | Drag an opportunity card from one stage to another and confirm the destination column count and total value update immediately while the source column decreases accordingly. Reload and confirm the change is not persisted. |
| Opportunity detail shows the locked two-column layout and stage history | CRM-02 | The summary/history relationship and responsive order are visual | Open `/crm/[opportunityId]` on desktop and mobile widths. Confirm desktop uses summary left / stage-history right, while mobile stacks summary, current stage, history, stage-change action, and origin link in the locked order. |
| Stage changes append local history and preserve the orçamento handoff link | CRM-02 | Timeline mutation and origin-link correctness require interaction | On `/crm/[opportunityId]`, change the current stage with `Mudar etapa`, verify a new history entry is appended immediately, and confirm the `Solicitacao de origem` link opens `/orcamentos/[id]`. |

---

## Validation Sign-Off

- [x] All tasks have automated verify or rely on existing quality gates
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
