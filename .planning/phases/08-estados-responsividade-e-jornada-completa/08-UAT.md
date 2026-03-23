---
status: complete
phase: 08-estados-responsividade-e-jornada-completa
source: [08-00-SUMMARY.md, 08-01-SUMMARY.md, 08-02-SUMMARY.md, 08-03-SUMMARY.md, 08-04-SUMMARY.md, 08-05-SUMMARY.md, 08-06-SUMMARY.md, 08-07-SUMMARY.md]
started: 2026-03-23T10:00:00Z
updated: 2026-03-23T10:30:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Loading skeletons on workspace pages
expected: Navigate to Obras workspace, Comunicacao mural, or Drive page. A loading skeleton appears briefly during page load before content renders.
result: pass

### 2. Empty state for no results
expected: Navigate to Drive page and use search/filters that produce no matches. An empty state component displays with icon, title, description, and optionally a "Limpar filtros" action.
result: issue
reported: "Limpar filtros nao aparece"
severity: major

### 3. Pipeline empty state
expected: Navigate to Obras pipeline board and apply filters that produce zero results. An empty state displays indicating no items match the current filters.
result: pass

### 4. Toast feedback on actions
expected: Perform an action that triggers feedback (e.g., submit a form, upload a file). A toast notification appears with appropriate message and auto-dismisses after 3-5 seconds.
result: pass

### 5. Error recovery page
expected: Navigate to /erro route. A friendly error page displays with illustration and recovery actions (retry, go home).
result: pass

### 6. Navigation transitions
expected: Navigate between platform pages. A subtle fade/slide transition (150ms) occurs during page changes with scroll position reset.
result: pass

### 7. Mobile pipeline tabs
expected: On mobile viewport (width < 768px), navigate to CRM, Anteprojetos, or Obras pipeline. Instead of drag-and-drop columns, horizontal scrollable tabs appear showing stage labels with counts (e.g., "Em analise (5)").
result: pass

### 8. Mobile bottom sheets
expected: On mobile viewport, open a dialog (e.g., New Opportunity, New Anteproject, Proposal Origin). The overlay appears as a bottom sheet sliding up from the bottom, not a centered dialog.
result: issue
reported: "O componente aparece mas o conteudo esta muito no limite do elemento pai horizontalmente - form container (py-4) falta padding horizontal para combinar com header (p-6)"
severity: minor

### 9. CRM Fechado confirmation
expected: On CRM opportunity detail, change stage to "Fechado". An AlertDialog appears asking for confirmation before proceeding.
result: pass

### 10. Responsive table columns
expected: On Proposals list page, reduce viewport width. Value and date columns become hidden below lg breakpoint (1024px), while essential columns remain visible.
result: pass

### 11. Dynamic route breadcrumbs
expected: Navigate to /comunicacao/[id]/editar or /projetos/[id]/obra. Breadcrumbs display stable labels "Editar" or "Obra" for these dynamic routes.
result: pass

### 12. Journey page timeline
expected: Navigate to /jornada. A horizontal timeline displays active modules in operational order (Orcamento -> CRM -> Anteprojeto -> Proposta -> Projeto -> Obra). Each module shows icon, label, and active count.
result: issue
reported: "Cards com contagens de 2 digitos (ex: '10 itens ativos') ficam maiores que cards com 1 digito. Precisa padronizar tamanho independente da quantidade de digitos no elemento <p class='text-2xl font-semibold'>"
severity: minor

### 13. Journey filters zero-count modules
expected: On Journey page, modules with zero active items are hidden from the timeline (not displayed).
result: pass

### 14. Journey sidebar entry
expected: In the sidebar, a "Jornada" entry appears in the operation group with a folder-kanban icon.
result: pass

### 15. Dashboard journey pendencies
expected: On the portal dashboard, a pendencies panel shows journey items requiring attention, placed before announcements/highlights section.
result: pass

### 16. Budget request to CRM handoff
expected: On a budget request detail page, the CTA offers "Criar oportunidade" (not "Criar proposta"), allowing handoff to CRM.
result: pass

### 17. Registro card with upstream link
expected: On Anteproject, CRM opportunity, or Proposal detail pages, a Registro card shows the upstream entity with a clickable link.
result: pass

### 18. Voltar navigation
expected: On detail pages, click the Voltar button. Navigation returns to the upstream entity first, falling back to the module list if no upstream exists.
result: pass

## Summary

total: 18
passed: 15
issues: 3
pending: 0
skipped: 0
blocked: 0

## Gaps

- truth: "Empty state component displays with icon, title, description, and optionally a Limpar filtros action"
  status: failed
  reason: "User reported: Limpar filtros nao aparece"
  severity: major
  test: 2
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Bottom sheet content has proper horizontal padding matching header"
  status: failed
  reason: "User reported: O conteudo esta muito no limite do elemento pai horizontalmente - form container (py-4) falta padding horizontal para combinar com header (p-6)"
  severity: minor
  test: 8
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Journey cards have consistent width regardless of count digit length"
  status: failed
  reason: "User reported: Cards com contagens de 2 digitos (ex: '10 itens ativos') ficam maiores que cards com 1 digito. Precisa padronizar tamanho independente da quantidade de digitos"
  severity: minor
  test: 12
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
