---
status: partial
phase: 05-anteprojetos-propostas-e-pre-os
source: [05-01-SUMMARY.md, 05-02-SUMMARY.md, 05-03-SUMMARY.md, 05-04-SUMMARY.md, 05-05-SUMMARY.md]
started: 2026-03-23T10:00:00Z
updated: 2026-03-23T10:15:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Anteprojetos Queue View
expected: Navigate to /anteprojetos. Queue list displays with columns (ID, Anteprojeto, Cliente, Etapa, Aguardando informações, Responsável, Prioridade, Data). Filters available for Responsável, Prioridade, Buscar, and "Aguardando informações". Stage and priority badges render correctly.
result: pass

### 2. Anteprojetos Detail Page
expected: Click on an anteproject row. Detail page shows two-column layout with: Resumo técnico section, Timeline section, Anexos section, "CRM de origem" link, and Proposta comercial section (either "Nenhuma proposta gerada" or proposal link).
result: pass

### 3. Anteprojetos Kanban View
expected: In /anteprojetos, toggle to Kanban view. Six columns appear representing stages: Solicitação, Análise Técnica, Em Revisão, Retorno Comercial, Aguardando Cliente, Aprovado/Recusado. Cards show title, client, badges, and avatar.
result: pass

### 4. Drag-and-Drop Stage Movement
expected: In Kanban view, drag a card from one column to another. Card moves to new column. Stage badge updates to reflect new stage.
result: pass

### 5. Kanban/Lista Toggle Preserves Filters
expected: Apply a filter (e.g., select a Responsável). Toggle between Kanban and Lista views. Filter selection persists across view changes.
result: issue
reported: "nao tem filtro: selecione um Responsável"
severity: major

### 6. CRM-to-Anteprojeto Handoff
expected: Navigate to a CRM opportunity detail page. Click "Criar anteprojeto" link. New anteproject dialog opens with fields pre-filled from the opportunity data.
result: pass

### 7. Proposals List View
expected: Navigate to /propostas. List displays with columns: ID, Cliente, Título, Status, Valor, Data de criação. Status filter and search (Buscar por cliente ou título) are available.
result: pass

### 8. Proposal Builder - Origin Selection
expected: Navigate to /propostas/nova. A dialog appears asking for origin type: "Cliente" or "Oportunidade". Selecting one opens the proposal builder form.
result: pass

### 9. Proposal Builder - Form Sections
expected: In proposal builder, verify all sections exist: Dados do cliente, Descrição do projeto, Itens da proposta (with "Consultar tabela" button), Totais, Condições comerciais, Validade.
result: pass

### 10. Price Lookup Integration in Proposal
expected: In proposal builder items section, click "Consultar tabela". Dialog opens with price table catalog. Select an item - form fields populate with itemCode, description, and unitPrice. Total price calculates automatically from quantity × unitPrice.
result: pass

### 11. Price Table Catalog
expected: Navigate to /tabela-de-precos. Catalog shows columns: Código, Item, Região, Faixa, Valor unitário, Condições. Filters for Região and Faixa de consumo work. Search functions. Click an item to see detail dialog.
result: issue
reported: "modal de detalhes do item esta abrindo muito grande verticalmente, precisa ajustar"
severity: cosmetic

### 12. Proposal Detail - Export and Send
expected: Navigate to a proposal with status "Pronta para envio". "Exportar PDF" button shows success toast. "Enviar proposta" button shows success toast and status changes to "Enviada". Actions are disabled for non-"pronta" statuses.
result: blocked
blocked_by: test-data
reason: "Nao tem nenhuma proposta com esse status para testar: Pronta para envio"

### 13. Price Table Upload
expected: Navigate to /tabela-de-precos/upload. Page shows "Enviar nova tabela" upload area and "Histórico de versões" section. Upload triggers success or error toast feedback.
result: pass

### 14. Gerar Proposta from Anteproject
expected: In anteproject detail page without a proposal, "Gerar proposta" CTA is visible. Clicking it navigates to /propostas/nova?anteprojectId={id}.
result: pass

### 15. Proposal Badge in Anteproject Detail
expected: In anteproject detail page that has a proposalId, shows "Proposta gerada" badge and "Abrir proposta comercial" link.
result: pass

## Summary

total: 15
passed: 12
issues: 2
pending: 0
skipped: 0
blocked: 1

## Gaps

- truth: "Filter selection persists across Kanban/Lista view changes"
  status: failed
  reason: "User reported: nao tem filtro: selecione um Responsável"
  severity: major
  test: 5
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Price item detail dialog has appropriate height"
  status: failed
  reason: "User reported: modal de detalhes do item esta abrindo muito grande verticalmente, precisa ajustar"
  severity: cosmetic
  test: 11
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
