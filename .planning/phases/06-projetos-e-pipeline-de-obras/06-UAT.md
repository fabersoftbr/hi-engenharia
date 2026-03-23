---
status: partial
phase: 06-projetos-e-pipeline-de-obras
source: [06-01-SUMMARY.md, 06-02-SUMMARY.md, 06-03-SUMMARY.md]
started: 2026-03-23T12:00:00Z
updated: 2026-03-23T12:15:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Projects List Renders
expected: Navigate to /projetos and see a table listing projects with columns: ID, Projeto, Cliente, Tipo, Status, Responsavel, Potencia (kWp), Data de inicio. Each row is clickable and navigates to the project detail page.
result: pass

### 2. Projects Filter Toolbar
expected: At /projetos, see filter controls for Tipo, Status, and Responsavel plus a search field with placeholder "Buscar por nome ou cliente". Applying filters narrows the visible projects in the table.
result: pass

### 3. Projects Empty State
expected: At /projetos, when filters return no results, see empty state message "Nenhum projeto encontrado" or "Nenhum resultado para sua busca" with "Limpar filtros" action.
result: pass

### 4. Navigate to Obras Pipeline
expected: At /projetos, click "Ver pipeline de obras" link and navigate to /obras which shows the pipeline board.
result: issue
reported: "Esse link nao existe em /projetos: 'Ver pipeline de obras'"
severity: major

### 5. Project Detail Page Renders
expected: Navigate to /projetos/{projectId} and see a two-column layout with Resumo do projeto (Cliente, Tipo, Potencia, Local, Prazo previsto, Responsavel) on the left and Status atual, Acoes, Historico de etapas on the right. Breadcrumb shows project title.
result: pass

### 6. Stage Change Updates Progress
expected: On project detail page, use the "Mudar estagio" dropdown to select a different stage. Progress bar updates to reflect the new percentage, and a new entry appears in Historico de etapas with the change.
result: pass

### 7. Linked Context Cards
expected: On project detail page, see cards linking to Proposta and Anteprojeto in the right column. Action buttons "Ver anteprojeto", "Gerar relatorio", "Baixar arquivo" are visible.
result: pass

### 8. Obras Pipeline Kanban View
expected: Navigate to /obras and see a Kanban board with columns for each work stage (Contrato, Projeto, Aprovacoes, etc.). Cards show project title, client name, and responsible avatar. Page title is "Pipeline de obras".
result: pass

### 9. Kanban/List Toggle
expected: At /obras, see toggle buttons for "Kanban" and "Lista". Clicking "Lista" switches to a table view. Clicking "Kanban" returns to the board view.
result: pass

### 10. Drag-and-Drop Stage Change
expected: At /obras in Kanban view, drag a card from one stage column and drop it into another. The card moves to the new column, and if you navigate to that project's detail page, the stage and progress are updated.
result: pass

### 11. Card Navigation to Detail
expected: At /obras, click on any pipeline card and navigate to /projetos/{projectId} showing that project's detail page.
result: pass

### 12. Work Tracker Page
expected: Navigate to /projetos/{projectId}/obra and see sections: "Marcos da obra" with timeline, "Cronograma" with Gantt visualization, and "Proximos passos". Button "Voltar para projeto" returns to detail page.
result: issue
reported: "Erro ao carregar pagina - pagina falha completamente com mensagem 'Erro ao carregar esta pagina. Tente novamente ou retorne ao portal.'"
severity: blocker

### 13. Milestone Add/Edit
expected: On work tracker page, click "Adicionar marco" to open a dialog. Fill in milestone details and save. New milestone appears in the timeline. Click "Editar" on a milestone to modify it.
result: blocked
blocked_by: prior-phase
reason: "Depends on work tracker page (test 12) which fails to load"

### 14. Ver Obra CTA
expected: On project detail page, see "Ver obra" button/link. Clicking it navigates to /projetos/{projectId}/obra.
result: pass

### 15. Obras Filter by Responsible
expected: At /obras, see a responsible filter. Selecting a person filters the visible cards in Kanban and rows in Lista view to only their projects.
result: pass

## Summary

total: 15
passed: 11
issues: 2
pending: 0
skipped: 0
blocked: 1

## Gaps

- truth: "Link 'Ver pipeline de obras' presente em /projetos navegando para /obras"
  status: failed
  reason: "User reported: Esse link nao existe em /projetos: 'Ver pipeline de obras'"
  severity: major
  test: 4
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Pagina /projetos/{projectId}/obra carrega com timeline de marcos, cronograma Gantt e proximos passos"
  status: failed
  reason: "User reported: Erro ao carregar pagina - pagina falha completamente com mensagem 'Erro ao carregar esta pagina. Tente novamente ou retorne ao portal.'"
  severity: blocker
  test: 12
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
