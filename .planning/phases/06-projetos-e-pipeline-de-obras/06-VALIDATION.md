---
phase: 6
slug: projetos-e-pipeline-de-obras
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-20
---

# Phase 6 - Validation Strategy

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
| 6-06-01 | 01 | 1 | PROJ-01 | static + manual | `pnpm --filter web lint && pnpm --filter web typecheck` | ✅ | ⬜ pending |
| 6-06-02 | 02 | 2 | PROJ-02 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |
| 6-06-03 | 03 | 3 | PROJ-03, PIPE-03 | static + manual | `pnpm lint && pnpm typecheck && pnpm build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No additional test runner, fixture harness, or backend mock server is required before execution.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Projetos workspace replaces the placeholder and exposes all four filters | PROJ-01 | Placeholder removal, toolbar density, and filter affordances require browser confirmation | Open `/projetos` and confirm the page no longer uses `ModulePlaceholderPage`, the toolbar shows `Tipo`, `Status`, `Responsavel`, and `Busca`, and the primary action is visible before the table content. |
| Project list rows navigate to the correct detail route | PROJ-01, PROJ-02 | Whole-row navigation and breadcrumb context are route-level UI behaviors | Click at least two different project rows in `/projetos` and confirm each opens `/projetos/[projectId]` with `Projetos > Detalhe` breadcrumbs and project-specific summary content. |
| Project detail shows linked proposal, anteprojeto, attachments, and local stage/progress UI | PROJ-02 | The relationship between summary, links, files, and actions is visual and interactive | On `/projetos/[projectId]`, confirm the two-column desktop layout, linked `Proposta` and `Anteprojeto` actions, attachment list, current stage badge, and progress indicator all render from the same seeded record. |
| Obra acompanhamento route shows marcos, upcoming steps, and schedule fallback behavior | PROJ-03 | Timeline, schedule readability, and responsive fallback need browser verification | Navigate from project detail to `/projetos/[projectId]/obra` using `Ver obra`, confirm the page shows milestone history, the next 2-3 pending marcos, and a readable desktop schedule that collapses to stacked milestone cards on narrow screens. |
| Obras pipeline shows all 11 fixed stages and updates counts after drag-and-drop | PIPE-03 | Drag-and-drop movement, fixed stage order, and column counts are interactive browser behavior | Open `/obras`, confirm all 11 locked stages render left to right, drag one card to a new stage, and verify the destination column count increases while the source count decreases. Reload and confirm the move is not persisted. |

---

## Validation Sign-Off

- [x] All tasks have automated verify or rely on existing quality gates
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
