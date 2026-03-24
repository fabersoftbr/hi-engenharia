---
plan: 04-03
phase: 04-crm-e-pipeline-comercial
status: complete
commit: bfa5cc0
---

# Plan 04-03: Full Sales Pipeline

## Objective
Fechar a fase com o funil comercial completo, toggle de visualizacao e criacao simulada de oportunidade dentro do proprio CRM.

## Tasks Completed

### Task 1: Add DnD dependency and build shared CRM workspace shell
- Added `@hello-pangea/dnd` dependency
- Created `CrmWorkspacePage` as new client boundary for `/crm`
- Owns `viewMode`, `responsibleFilter`, `priorityFilter`, `searchQuery`, `opportunities`, `isNewOpportunityOpen` state
- Default view is `"kanban"`
- Refactored `CrmListPage` to accept `opportunities` prop from workspace
- Added Kanban/Lista view toggle with filter preservation

### Task 2: Build fixed-order pipeline board with live counts, totals, and DnD
- Created `CrmPipelineBoard` using `DragDropContext`, `Droppable`, `Draggable`
- Created `CrmPipelineColumn` with stage headers, "N oportunidades" counts, and totals
- Created `CrmPipelineCard` with title, company, value, priority badge, responsible, and "Ultimo contato"
- Cards navigate to `/crm/{id}` on click
- Implemented `onDragEnd` in workspace for local card movement between columns

### Task 3: Add new-opportunity dialog and append local Lead-stage cards
- Created `NewOpportunityDialog` with fields: Oportunidade, Empresa, Responsavel, Prioridade, Valor estimado
- CTA button labeled "Nova oportunidade"
- Dialog actions: "Criar oportunidade" and "Cancelar"
- New opportunities default to `stage: "lead"` and `originBudgetRequestId: "orc-2026-9001"`
- New card visible immediately in both Kanban and Lista views

## Files Created
- `apps/web/components/platform/crm/crm-workspace-page.tsx`
- `apps/web/components/platform/crm/crm-pipeline-board.tsx`
- `apps/web/components/platform/crm/crm-pipeline-column.tsx`
- `apps/web/components/platform/crm/crm-pipeline-card.tsx`
- `apps/web/components/platform/crm/new-opportunity-dialog.tsx`

## Files Modified
- `apps/web/package.json` - Added @hello-pangea/dnd
- `apps/web/app/(platform)/crm/page.tsx` - Renders CrmWorkspacePage
- `apps/web/components/platform/crm/crm-list-page.tsx` - Refactored to accept opportunities prop
- `apps/web/lib/crm-data.ts` - Added groupCrmOpportunitiesByStage helper

## Verification
- [x] Lint passed
- [x] Typecheck passed
- [x] All acceptance criteria met

## Self-Check: PASSED

## Commits
- `bfa5cc0`: feat(04-03): complete CRM pipeline with Kanban view, DnD, and new opportunity dialog
