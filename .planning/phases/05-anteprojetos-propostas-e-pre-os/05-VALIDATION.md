---
phase: 5
slug: anteprojetos-propostas-e-pre-os
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-20
---

# Phase 5 - Validation Strategy

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
| 5-05-01 | 01 | 1 | ANT-01, ANT-02 | static + manual | `pnpm --filter web lint && pnpm --filter web typecheck` | ✅ | ⬜ pending |
| 5-05-02 | 02 | 2 | PIPE-02 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |
| 5-05-03 | 03 | 3 | PROP-01, PROP-02, PREC-02, PREC-03 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |
| 5-05-04 | 04 | 4 | PROP-03, PROP-04, PREC-01 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No additional test runner, fixture harness, or backend mock server is required before execution.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Anteprojetos workspace replaces the placeholder and opens in Kanban by default | ANT-01, PIPE-02 | View-mode defaults, placeholder removal, and board readability require browser confirmation | Open `/anteprojetos` and confirm the page no longer uses `ModulePlaceholderPage`, the `Kanban` view is active on first paint, filters render above the toggle, and all six locked stages are visible through horizontal navigation. |
| Anteprojeto drag-and-drop updates only the current session | PIPE-02 | Cross-column movement and local-state reset are interactive behaviors | Drag a card to a new stage, confirm the destination column count changes immediately, reload the page, and confirm the seed state returns. |
| Anteprojeto detail preserves technical summary, attachments, and CRM/proposal handoffs | ANT-02 | Layout order and linked handoffs are visual browser behaviors | Open `/anteprojetos/[anteprojectId]` on desktop and mobile widths. Confirm the technical summary, timeline, attachments, CRM origin link, and proposal action render in the locked order from the UI-SPEC. |
| Proposal creation and preview stay synchronized | PROP-01, PROP-02, PROP-03 | Live preview behavior and modal-assisted editing require interaction | Open `/propostas/nova`, select an origin, change client/project/item values, and confirm the preview updates immediately without a separate submit step. |
| Price lookup feeds proposal items with suggested values | PROP-02, PREC-02, PREC-03 | Modal selection and injected item values are UI-state behaviors | From the proposal item section, trigger `Consultar tabela`, filter by region/faixa, choose an item, and confirm the selected description and unit price populate the current proposal row. |
| Proposal export and send remain simulated | PROP-04 | Toasts, local status changes, and disabled-state rules require browser verification | On `/propostas/[proposalId]`, move a proposal into `Pronta para envio`, click `Exportar PDF` and `Enviar proposta`, and confirm the UI shows the simulated success feedback without generating a real file or network dependency. |
| Price table upload remains frontend-only | PREC-01 | Upload success/error feedback and version history are visual-only flows | Open `/tabela-de-precos/upload`, simulate an upload, and confirm the page shows inline status plus mock history without any real persistence or backend language. |

---

## Validation Sign-Off

- [x] All tasks have automated verify or rely on existing quality gates
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
