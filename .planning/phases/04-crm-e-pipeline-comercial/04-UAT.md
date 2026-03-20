---
status: diagnosed
phase: 04-crm-e-pipeline-comercial
source: [04-02-SUMMARY.md, 04-03-SUMMARY.md]
started: 2026-03-20T20:30:00Z
updated: 2026-03-20T20:45:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Navigate to CRM Opportunity Detail Page
expected: Navigate to /crm and click on an opportunity card. The URL changes to /crm/{opportunityId} and the page loads showing opportunity details in a two-column layout (desktop) or stacked layout (mobile).
result: pass

### 2. View Stage History Timeline
expected: On the opportunity detail page, a "Histórico" section shows a vertical timeline of stage changes with dates. Each entry displays the stage name and timestamp.
result: pass

### 3. Change Stage Locally
expected: On the opportunity detail page, use the stage dropdown to select a different stage. The stage badge updates immediately, and a new entry appears at the top of the history timeline with the new stage and current timestamp.
result: pass

### 4. Breadcrumb Navigation
expected: On the opportunity detail page, breadcrumbs show "Início > CRM > {opportunity name}". Clicking "CRM" returns to the CRM list/kanban view. Clicking "Início" goes to the dashboard.
result: pass

### 5. Origin Budget Request Link
expected: On the opportunity detail page, a card shows "Solicitação de Orçamento de Origem" with a link. Clicking the link navigates to the corresponding budget request detail page.
result: pass

### 6. Toggle Between Kanban and List Views
expected: On /crm, toggle buttons or tabs allow switching between "Kanban" and "Lista" views. Current filters (responsável, prioridade, search) persist when switching views.
result: issue
reported: "esta precisando de scroll para ver as opcoes no lado direito da pagina, precisamos ajustar isso"
severity: major

### 7. Drag and Drop Cards Between Stages
expected: In Kanban view, drag a card from one column (stage) to another. The card moves to the new column and the column counts update accordingly.
result: pass

### 8. Card Information Display
expected: In Kanban view, each card displays: opportunity title, company name, estimated value (R$), priority badge (colored), responsible person name, and "Último contato" date.
result: issue
reported: "Nao aparece o nome do responsavel, aparece um icone com as iniciais"
severity: minor

### 9. Navigate from Card to Detail
expected: In Kanban view, clicking a card navigates to /crm/{opportunityId} showing that opportunity's detail page.
result: pass

### 10. Create New Opportunity
expected: In Kanban view, click "Nova oportunidade" button. A dialog opens with fields: Oportunidade, Empresa, Responsável, Prioridade, Valor estimado. Fill and submit "Criar oportunidade". The new card appears immediately in the "Lead" column with the entered data.
result: pass

### 11. Column Counts and Totals
expected: In Kanban view, each column header shows "N oportunidades" count. The column also displays a total value sum (R$) of all cards in that stage.
result: pass

## Summary

total: 11
passed: 9
issues: 2
pending: 0
skipped: 0

## Gaps

- truth: "Toggle buttons and filters visible without horizontal scroll on /crm page"
  status: failed
  reason: "User reported: esta precisando de scroll para ver as opcoes no lado direito da pagina, precisamos ajustar isso"
  severity: major
  test: 6
  root_cause: "Header section in crm-workspace-page.tsx uses sm:flex-row with multiple items on the right side (toggle buttons + Nova oportunidade button) without flex-wrap. Right-side container has flex items-center gap-2 with no wrapping capability, causing horizontal overflow on viewports 640px-900px."
  artifacts:
    - path: "apps/web/components/platform/crm/crm-workspace-page.tsx"
      issue: "Lines 86-119 - header lacks responsive handling for multiple items on right side"
  missing:
    - "Change breakpoint from sm: to md: for horizontal layout"
    - "Or add flex-wrap to right-side container"
    - "Or move toggle buttons to left side next to title"
  debug_session: .planning/debug/crm-toolbar-horizontal-scroll.md

- truth: "Card shows responsible person full name"
  status: failed
  reason: "User reported: Nao aparece o nome do responsavel, aparece um icone com as iniciais"
  severity: minor
  test: 8
  root_cause: "CrmPipelineCard component renders ONLY the Avatar with initials in AvatarFallback, but never renders the owner.name text alongside it. The owner data contains the name, but it's not displayed."
  artifacts:
    - path: "apps/web/components/platform/crm/crm-pipeline-card.tsx"
      issue: "Lines 54-59 - missing text element to display owner name after Avatar"
  missing:
    - "Add text element after Avatar to display responsible person's name"
  debug_session: .planning/debug/kanban-card-responsible-name.md
