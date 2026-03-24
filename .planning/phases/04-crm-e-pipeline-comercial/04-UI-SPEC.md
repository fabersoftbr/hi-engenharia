---
phase: 04
slug: crm-e-pipeline-comercial
status: approved
shadcn_initialized: false
preset: not applicable
created: 2026-03-20
reviewed_at: 2026-03-20T15:33:00-03:00
---

# Phase 04 — UI Design Contract

> Visual and interaction contract for frontend phases. Generated during `gsd-plan-phase` to satisfy the UI safety gate before planning.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn via `@workspace/ui` |
| Preset | not applicable |
| Component library | Radix primitives surfaced through `@workspace/ui` |
| Icon library | `lucide-react` |
| Font | Raleway for UI text, Geist Mono only for IDs, currency helpers, and other technical values when needed |

---

## Visual Hierarchy

| Screen | Primary focal point | Secondary elements | Notes |
|--------|---------------------|--------------------|-------|
| CRM list/pipeline | Header with page title plus `Nova oportunidade` CTA and the Kanban/list toggle immediately below the filter bar | Filter controls, pipeline totals, list table | The CTA and current view state must be readable before the first card or row. |
| Kanban pipeline | Column headers with stage name, opportunity count, and total value | Opportunity cards, horizontal scroll affordance | The pipeline must feel like the hero of `/crm`; Kanban is the default entry view. |
| Opportunity detail | Opportunity summary block with company, value, and owner information | Current stage, history timeline, origin request link, stage-change control | On desktop the summary anchors the left column while stage/history actions own the right column. |

Icon-only actions are not allowed in this phase. Every visible action must ship with a text label.

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Inline icon gaps, badge spacing, compact metadata separators |
| sm | 8px | Card internals, small filter spacing, stacked metadata rows |
| md | 16px | Default control spacing, card padding on dense elements, list/table cell rhythm |
| lg | 24px | Toolbar padding, section spacing inside cards and detail panels |
| xl | 32px | Gaps between the filter bar, segmented toggle, and main content blocks |
| 2xl | 48px | Separation between the opportunity summary and the stage/history column |
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

Use sentence case in headings, filter labels, and actions. Reserve display text for the CRM page title and the opportunity name on the detail page.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `var(--background)` / `oklch(1 0 0)` | Page background, main content canvas, detail surfaces |
| Secondary (30%) | `var(--secondary)` / `oklch(0.967 0.001 286.375)` | Filter bar, segmented toggle shell, Kanban columns, secondary cards, table header |
| Accent (10%) | `var(--primary)` / `oklch(0.505 0.213 27.518)` | Primary CTA, active view toggle, drag-over column highlight, active stage badge, selected filter state |
| Destructive | `var(--destructive)` / `oklch(0.577 0.245 27.325)` | Inline warnings or future destructive CRM actions only |

Accent reserved for: the `Nova oportunidade` CTA, the active Kanban/list toggle segment, the currently active stage badge, drag-over column emphasis, and selected filter state. Do not use accent for every icon, link, or neutral card border.

60/30/10 split: 60% dominant surfaces, 30% structural secondary surfaces, 10% accent emphasis.

Priority badges use semantic emphasis inside the existing palette:
- Alta: warm high-emphasis styling closest to the brand/destructive family
- Media: amber/yellow emphasis
- Baixa: muted gray emphasis

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | `Nova oportunidade` |
| Empty state heading | `Nenhuma oportunidade encontrada` |
| Empty state body | `Ajuste os filtros ou crie uma nova oportunidade para alimentar o pipeline comercial.` |
| Error state | `Nao foi possivel carregar os dados desta oportunidade. Atualize a pagina ou volte para o CRM.` |
| Destructive confirmation | `Nenhuma acao destrutiva nesta fase.` |

Supporting copy rules:
- The default view toggle labels are `Kanban` and `Lista`.
- The search field uses `Buscar por nome ou empresa`.
- The detail-side action label is `Mudar etapa`.
- The origin link label is `Solicitacao de origem`.
- The no-results variant uses `Nenhum resultado para sua busca` with the reset action `Limpar filtros`.

---

## Interaction Contract

| Area | Contract |
|------|----------|
| View switching | `/crm` opens in `Kanban` by default. Switching to `Lista` must preserve the currently applied filters. |
| Filter bar | Responsible select, priority select, and search input live in one shared toolbar above the view toggle on desktop and stack vertically on mobile. |
| Kanban columns | Each column header shows stage name, card count, and total mock value. Horizontal scrolling must remain obvious when all 10 stages do not fit. |
| Opportunity cards | Entire card is clickable to open `/crm/[id]`. The card shows opportunity/company name, estimated value, priority badge, responsible avatar or initials, and last-contact date. |
| Drag and drop | Dragging a card must move it to another column in local React state and visibly highlight the target column during hover. No persistence or backend language is allowed. |
| List rows | Entire row is clickable to open `/crm/[id]`. No inline row actions. |
| Detail layout | Desktop uses a 60/40 two-column split. Mobile stacks in this order: opportunity summary, current stage, history timeline, stage-change action, origin request link. |
| Stage change | `Mudar etapa` uses a shadcn `Select` with the 10 locked stages and appends a new history item immediately after selection. |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | `button`, `badge`, `card`, `input`, `select`, `avatar`, `separator`, `data-table`, `table` | not required |

No third-party registries are approved for this phase.

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-03-20
