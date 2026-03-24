---
phase: 03
slug: solicitacoes-de-orcamento
status: approved
shadcn_initialized: false
preset: not applicable
created: 2026-03-20
reviewed_at: 2026-03-20T11:58:00-03:00
---

# Phase 03 — UI Design Contract

> Visual and interaction contract for frontend phases. Generated during `gsd-plan-phase` to satisfy the UI safety gate before planning.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn via `@workspace/ui` |
| Preset | not applicable |
| Component library | Radix primitives surfaced through `@workspace/ui` |
| Icon library | `lucide-react` |
| Font | Raleway for UI text, Geist Mono only for technical values if needed |

---

## Visual Hierarchy

| Screen | Primary focal point | Secondary elements | Notes |
|--------|---------------------|--------------------|-------|
| Listagem | Header with page title and `Nova solicitacao` CTA | Filter bar, request table, empty states | The CTA must be visible before the table on first paint. |
| Nova solicitacao | Section header plus submit area with `Enviar solicitacao` CTA | Section cards, field groups, attachment area | The form reads top to bottom as one business intake flow, never as a wizard. |
| Detalhes | Client/request summary block | Status timeline, attachments, action stack | On desktop the summary anchors the left column while status/actions own the right column. |
| Confirmacao | Success title and next-action buttons | Supporting body copy | Keep this modal short, direct, and dismissible. |

Icon-only actions are not allowed in this phase. Every action must ship with a visible text label.

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Inline icon gaps, badge spacing |
| sm | 8px | Form field internals, compact control spacing |
| md | 16px | Default element spacing inside cards and forms |
| lg | 24px | Section padding, form section gaps |
| xl | 32px | Layout gaps between major blocks |
| 2xl | 48px | Major section breaks in details and list pages |
| 3xl | 64px | Page-level vertical rhythm on desktop |

Exceptions: none

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.5 |
| Label | 14px | 600 | 1.4 |
| Heading | 20px | 600 | 1.2 |
| Display | 28px | 600 | 1.15 |

Use sentence case in headings and actions. Reserve display text for page titles and confirmation headlines only.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `var(--background)` / `oklch(1 0 0)` | Page background, main surfaces, form canvas |
| Secondary (30%) | `var(--secondary)` / `oklch(0.967 0.001 286.375)` | Cards, filter bar, table header, timeline rail, sidebar-adjacent surfaces |
| Accent (10%) | `var(--primary)` / `oklch(0.505 0.213 27.518)` | Primary CTA, active timeline step, selected filter state, selected table row emphasis |
| Destructive | `var(--destructive)` / `oklch(0.577 0.245 27.325)` | Inline validation errors, destructive status action for `Recusado` |

Accent reserved for: primary CTA button, active status step in the timeline, selected filter/pill state, and the currently selected request row. Do not use accent for every button, icon, or link.

60/30/10 split: 60% dominant surfaces, 30% secondary structural surfaces, 10% accent emphasis.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | `Enviar solicitacao` |
| Empty state heading | `Nenhuma solicitacao encontrada` |
| Empty state body | `Ajuste os filtros ou crie uma nova solicitacao para iniciar o fluxo comercial.` |
| Error state | `Nao foi possivel carregar os dados desta solicitacao. Tente novamente ou volte para a listagem.` |
| Destructive confirmation | `Recusar solicitacao`: `Confirme a mudanca para Recusado. Essa acao altera apenas o status exibido neste fluxo visual.` |

Supporting copy rules:
- The list CTA uses `Nova solicitacao`.
- The confirmation modal title uses `Solicitacao enviada`.
- The confirmation modal secondary actions use `Ver solicitacao`, `Nova solicitacao`, and `Voltar para a listagem`.
- The no-results variation uses `Nenhum resultado para sua busca` with action `Limpar filtros`.

---

## Interaction Contract

| Area | Contract |
|------|----------|
| List filters | Status select, search field, and `Pendentes` toggle live in one horizontal bar on desktop and stack vertically on mobile. |
| Table rows | Entire row is clickable to open details. No inline row actions. |
| Form validation | Inline messages below invalid fields using the shared form pattern; error color only appears on invalid controls and messages. |
| Attachments | Attachments are simulated items with explicit text actions like `Visualizar` or `Baixar`; no hidden hover-only controls. |
| Status change | `Alterar status` opens a dialog with the four statuses and a clear confirm action. |
| Mobile details | Order is status timeline, actions, attachments, then client/project information. |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | `button`, `badge`, `input`, `label`, `dialog`, `textarea`, `select`, `table` | not required |

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
