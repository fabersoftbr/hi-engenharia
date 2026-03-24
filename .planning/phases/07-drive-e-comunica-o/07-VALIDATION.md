---
phase: 7
slug: drive-e-comunica-o
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — frontend-only project, no test framework configured |
| **Config file** | none |
| **Quick run command** | `pnpm build --force && pnpm lint` |
| **Full suite command** | `pnpm build --force && pnpm lint && pnpm typecheck` |
| **Estimated runtime** | ~60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm build --force && pnpm lint`
- **After every plan wave:** Run `pnpm build --force && pnpm lint && pnpm typecheck`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 1 | DRIV-01 | manual | `pnpm build --force && pnpm lint` | ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 1 | DRIV-01 | manual | `pnpm build --force && pnpm lint` | ❌ W0 | ⬜ pending |
| 07-02-01 | 02 | 2 | DRIV-02 | manual | `pnpm build --force && pnpm lint` | ❌ W0 | ⬜ pending |
| 07-02-02 | 02 | 2 | DRIV-03 | manual | `pnpm build --force && pnpm lint` | ❌ W0 | ⬜ pending |
| 07-03-01 | 03 | 2 | COMM-01 | manual | `pnpm build --force && pnpm lint` | ❌ W0 | ⬜ pending |
| 07-03-02 | 03 | 2 | COMM-02 | manual | `pnpm build --force && pnpm lint` | ❌ W0 | ⬜ pending |
| 07-04-01 | 04 | 3 | COMM-03 | manual | `pnpm build --force && pnpm lint` | ❌ W0 | ⬜ pending |
| 07-04-02 | 04 | 3 | COMM-01 | manual | `pnpm build --force && pnpm lint` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- No test framework to install — project is frontend-only with no existing test infrastructure
- Validation relies entirely on build + lint + typecheck + visual inspection

*Existing build/lint/typecheck infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Folder navigation by section tabs (Oportunidades/Obras) | DRIV-01 | Frontend-only visual state; no automated UI tests | Open `/drive`, switch tabs, verify folder list updates |
| File listing with metadata, type icons, permissions | DRIV-02 | Visual DataTable rendering | Open `/drive`, navigate to folder, verify file rows with icons and permission badges |
| Upload/download/preview simulated interactions | DRIV-03 | Toast + Sheet interactions | Click upload/download/preview buttons, verify toast/sheet appears |
| Mural with filters by date and category | COMM-01 | Visual card feed filtering | Open `/comunicacao`, apply filters, verify card list updates |
| Comunicado detail with content, date, destaque | COMM-02 | Page rendering | Click a comunicado card, verify detail page/route shows full content |
| Publication flow simulation (2-step dialog wizard) | COMM-03 | Dialog wizard interaction | Click "Publicar", complete 2-step dialog, verify mural reflects new entry |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
