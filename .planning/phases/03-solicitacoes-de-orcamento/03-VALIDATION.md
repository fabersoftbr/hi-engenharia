---
phase: 3
slug: solicitacoes-de-orcamento
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-20
---

# Phase 3 - Validation Strategy

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
| 3-03-01 | 01 | 1 | ORC-01 | static + manual | `pnpm --filter web lint && pnpm --filter web typecheck` | ✅ | ⬜ pending |
| 3-03-02 | 02 | 2 | ORC-02 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |
| 3-03-03 | 03 | 3 | ORC-03, ORC-04 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No additional test runner, fixture harness, or backend mock server is required before execution.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Request list renders with filters and seeded data | ORC-01 | The repo has no interaction or visual regression runner | Open `/orcamentos` on desktop and confirm the table shows seeded rows, the filter bar is visible, and the page no longer uses `ModulePlaceholderPage`. |
| Filter states and empty states behave correctly | ORC-01 | Search and no-results messaging need browser confirmation | Apply the status filter, type a search term with no matches, and verify the page shows `Nenhum resultado para sua busca` plus `Limpar filtros`. Remove all data via the empty-state trigger or seeded branch and verify the empty-state CTA is visible. |
| New request form validates inline and keeps section order | ORC-02 | Field errors, attachment interactions, and section readability are UI-only | Open `/orcamentos/nova`, submit with missing required fields, and confirm inline error messages appear below the corresponding controls. Add at least one simulated attachment and confirm it appears in the attachment list. |
| Detail page shows status, attachments, and actions in the locked layout | ORC-03 | The two-column/stacked layout is visual | Open `/orcamentos/[requestId]` on desktop and mobile widths. Confirm desktop uses summary left / timeline-actions right, while mobile reorders to timeline, actions, attachments, then client data. |
| Confirmation modal closes the flow with coherent next actions | ORC-04 | Modal behavior and action labels require runtime interaction | Submit the simulated form on `/orcamentos/nova` and confirm the dialog title, body copy, and actions `Ver solicitacao`, `Nova solicitacao`, and `Voltar para a listagem` all appear and navigate correctly. |

---

## Validation Sign-Off

- [x] All tasks have automated verify or rely on existing quality gates
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
