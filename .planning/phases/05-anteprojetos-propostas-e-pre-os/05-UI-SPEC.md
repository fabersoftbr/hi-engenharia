---
phase: 05
slug: anteprojetos-propostas-e-pre-os
status: approved
shadcn_initialized: false
preset: not applicable
created: 2026-03-20
reviewed_at: 2026-03-20T21:45:00-03:00
---

# Phase 05 - UI Design Contract

> Visual and interaction contract for frontend phases. Generated during `gsd-plan-phase` to satisfy the UI safety gate before planning.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn via `@workspace/ui` |
| Preset | not applicable |
| Component library | Radix primitives surfaced through `@workspace/ui` |
| Icon library | `lucide-react` |
| Font | Raleway for UI text, Geist Mono only for IDs, proposal codes, currency helpers, and other technical values when needed |

---

## Visual Hierarchy

| Screen | Primary focal point | Secondary elements | Notes |
|--------|---------------------|--------------------|-------|
| Anteprojetos workspace | Header with page title, counts, and the Kanban/list toggle directly above the board | Filter toolbar, stage totals, handoff badges, row metadata | `/anteprojetos` must feel like the operational queue entry point; Kanban is the default view. |
| Anteprojeto detail | Technical summary block with client, installation type, and current stage | Timeline, attachments, CRM origin link, proposal action | Desktop keeps the summary on the left and decisions/actions on the right, matching Phase 4. |
| Proposal builder | Origin summary plus sectioned form body with clear section labels | Price lookup modal trigger, helper copy, item table controls | The form is a single page, not a wizard. Users must understand progress by section order alone. |
| Proposal preview | Document canvas with Hi header, client block, item table, totals, and status badge | Conditions, validity, footer actions | The preview must look like a deliverable document, not a generic card stack. |
| Price table workspace | Filter bar with region and consumption selectors, followed immediately by results | Item detail modal, upload entry point, current version summary | Search and comparison come before upload; upload is a secondary flow. |
| Price table upload | Dropzone and current import status card | Mock history list, success/error feedback, return link | Upload is an auxiliary screen with one focused action. |

Icon-only actions are not allowed in this phase. Every visible action must ship with a text label.

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Inline icon gaps, compact badges, technical metadata separators |
| sm | 8px | Dense card internals, field helper text, grouped proposal totals |
| md | 16px | Default field spacing, table cell rhythm, modal body spacing |
| lg | 24px | Section padding inside cards, detail panels, and document blocks |
| xl | 32px | Gaps between toolbar, segmented toggle, and main content zones |
| 2xl | 48px | Separation between editor and preview columns, major detail sections |
| 3xl | 64px | Page-level vertical rhythm on desktop screens |

Exceptions: none

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.5 |
| Label | 14px | 600 | 1.4 |
| Heading | 20px | 600 | 1.2 |
| Display | 28px | 600 | 1.15 |

Use sentence case in headings, field labels, badges, and actions. Reserve display text for page titles, the anteprojeto title, and the proposal title near the preview header.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `var(--background)` / `oklch(1 0 0)` | Page background, document canvas, primary surfaces |
| Secondary (30%) | `var(--secondary)` / `oklch(0.967 0.001 286.375)` | Filter bars, Kanban columns, side panels, muted cards, table headers |
| Accent (10%) | `var(--primary)` / `oklch(0.505 0.213 27.518)` | Primary CTAs, active view toggle, selected stage emphasis, proposal status highlight, upload success emphasis |
| Destructive | `var(--destructive)` / `oklch(0.577 0.245 27.325)` | Refused statuses, blocking warnings, destructive confirmations only |

Accent reserved for: `Nova proposta`, `Novo anteprojeto`, the active Kanban/list toggle segment, the current proposal status badge, the active stage indicator in timelines, and the `Exportar PDF` action when enabled. Do not use accent for every link, icon, or neutral badge.

60/30/10 split: 60% dominant surfaces, 30% structural secondary surfaces, 10% accent emphasis.

Priority and state badges use semantic emphasis inside the existing palette:
- Alta and recusado states stay in the destructive family
- Em revisao or waiting states use outline or muted secondary styling
- Approved, ready, and sent states use default or outline emphasis without introducing a new green palette

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | `Nova proposta` |
| Empty state heading | `Nenhum item encontrado` |
| Empty state body | `Ajuste os filtros ou inicie um novo fluxo para alimentar esta etapa.` |
| Error state | `Nao foi possivel carregar este conteudo agora. Atualize a pagina ou volte para a listagem anterior.` |
| Destructive confirmation | `Remover item`: `Confirme a remocao deste item da proposta antes de continuar.` |

Supporting copy rules:
- The anteprojetos view toggle labels are `Kanban` and `Lista`.
- The anteprojeto creation action uses `Novo anteprojeto`.
- The proposal origin modal title is `Selecionar origem da proposta`.
- The price lookup trigger label is `Consultar tabela`.
- The proposal export action label is `Exportar PDF`.
- The proposal send action label is `Enviar proposta`.
- The price table empty state uses `Nenhum item encontrado para os filtros selecionados`.
- The upload success toast uses `Tabela enviada com sucesso`.
- The simulated export toast uses `PDF gerado com sucesso`.
- The simulated send toast uses `Proposta enviada com sucesso`.
- Status labels shown to users are `Rascunho`, `Em revisao`, `Pronta para envio`, `Enviada`, `Em analise pelo cliente`, `Aceita`, and `Recusada`.

---

## Interaction Contract

| Area | Contract |
|------|----------|
| Anteprojetos workspace | `/anteprojetos` opens in `Kanban` by default and preserves filters when switching to `Lista`. The toolbar sits above the toggle on desktop and stacks on mobile. |
| Anteprojeto cards | Entire card is clickable to open `/anteprojetos/[id]`. The card shows title, client, current status badge, responsible, date, and an optional `Proposta gerada` badge. |
| Anteprojeto drag and drop | Dragging a card changes its stage in local React state only. The target column must visibly highlight during hover. No persistence language is allowed. |
| Anteprojeto detail layout | Desktop uses a two-column summary/actions layout aligned with CRM detail. Mobile stacks in this order: summary, current stage, timeline, attachments, CRM origin, proposal action. |
| Proposal creation flow | `/propostas/nova` begins with an origin-selection modal. After selection, the page stays on one long form with section anchors or visible section headers instead of stepper navigation. |
| Proposal editor and preview | Desktop uses a split layout where the editor owns the left side and the document preview remains visible on the right. Mobile stacks editor first, preview second, with the preview remaining scrollable like a document. |
| Price table integration | `Consultar tabela` opens a modal from the proposal items section. Choosing an item injects the selected description and suggested unit value into the current proposal item row. |
| Proposal status actions | `Enviar proposta` is available only when the visible status is `Pronta para envio` and immediately updates the badge to `Enviada` in local state. `Exportar PDF` follows the same availability rule and only triggers a simulated toast. |
| Price table workspace | `/tabela-de-precos` keeps both filters visible above results on desktop. Mobile swaps the table for stacked result cards while preserving the same filter labels and item detail modal. |
| Upload flow | `/tabela-de-precos/upload` uses a single primary dropzone card, a mock status summary, and a compact history list underneath. Success and error feedback stay inline plus toast, never as full-page takeovers. |

No drawer-heavy workflow is allowed in this phase. Major create, detail, and preview experiences must use full pages, while selection and lookup helpers may use dialogs.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | `button`, `badge`, `card`, `input`, `select`, `textarea`, `dialog`, `table`, `data-table`, `separator`, `avatar`, `scroll-area` | not required |
| third-party package | `@hello-pangea/dnd` for Kanban-only drag and drop interactions | shadcn view + diff required |

No third-party visual registries are approved for this phase.

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-03-20
