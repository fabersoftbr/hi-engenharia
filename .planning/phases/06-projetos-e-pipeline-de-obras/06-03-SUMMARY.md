---
phase: "06"
plan: "03"
status: complete
completed_at: "2026-03-21"
executor_model: opus
---

# Plan 06-03: Obras Pipeline and Work Tracking

## Summary

Built the obras workspace with visual pipeline board, drag-and-drop, Kanban/List toggle, and work tracking route with milestones and schedule.

## What Was Built

### Obras Workspace (`apps/web/components/platform/projects/works-workspace-page.tsx`)
- State: `viewMode`, `responsibleFilter`, `searchQuery`, `projects`
- Default view: `"kanban"`
- View toggle: `Kanban` / `Lista`
- Page title: `Pipeline de obras`
- Contextual link: `Ver projetos` -> `/projetos`
- Shared filtered dataset between list and pipeline views

### Pipeline Board (`apps/web/components/platform/projects/works-pipeline-board.tsx`)
- `DragDropContext`, `Droppable`, `Draggable` from `@hello-pangea/dnd`
- Fixed 11-stage column order via `WORK_STAGE_ORDER`
- Cards navigate to `/projetos/{id}`

### Pipeline Column (`apps/web/components/platform/projects/works-pipeline-column.tsx`)
- Stage header with label and `N obras` count
- Drop zone styling with isDraggingOver feedback

### Pipeline Card (`apps/web/components/platform/projects/works-pipeline-card.tsx`)
- Project title, client name, responsible avatar
- Labels: `Proposta`, `Inicio`, `% concluido`
- Click navigates to `/projetos/{id}`

### Drag-and-Drop Logic
- `onDragEnd` updates `projects` local state
- Sets `stage` to destination stage id
- Recalculates `progressPercent` via `getProjectProgress`
- Prepends history entry with `changedAt` and `changedBy`

### List View (`apps/web/components/platform/projects/works-list-page.tsx`)
- DataTable with headers: ID, Projeto, Cliente, Tipo, Status, Responsavel, Potencia (kWp), Data de inicio
- Mobile responsive with hidden secondary columns

### Work Tracker Route (`apps/web/app/(platform)/projetos/[projectId]/obra/page.tsx`)
- Next.js 16 signature with `params: Promise<{ projectId: string }>`
- Loads record via `getProjectById`, calls `notFound()` when missing
- Renders `ProjectWorkTrackerPage`

### Work Tracker Page (`apps/web/components/platform/projects/project-work-tracker-page.tsx`)
- Section headings: `Marcos da obra`, `Cronograma`, `Proximos passos`
- Actions: `Adicionar marco`, `Editar marco`, `Mudar status`, `Voltar para projeto`
- Milestone status labels: `Concluido`, `Em andamento`, `Pendente`
- Local state for add/edit/status changes
- Dialog for milestone creation/editing

### Milestone Timeline (`apps/web/components/platform/projects/project-milestone-timeline.tsx`)
- Visual timeline with status badges
- Edit and status change actions

### Gantt Schedule (`apps/web/components/platform/projects/project-gantt-schedule.tsx`)
- Lightweight schedule visualization
- No third-party Gantt dependency

### Detail Page Updates
- Added `Ver obra` CTA linking to `/projetos/{project.id}/obra`
- Updated breadcrumbs for `/obras` -> `Pipeline` and `/projetos/{id}/obra` -> `Obra`

## Key Files

### Created
- apps/web/app/(platform)/obras/page.tsx
- apps/web/app/(platform)/projetos/[projectId]/obra/page.tsx
- apps/web/components/platform/projects/works-workspace-page.tsx
- apps/web/components/platform/projects/works-list-page.tsx
- apps/web/components/platform/projects/works-pipeline-board.tsx
- apps/web/components/platform/projects/works-pipeline-column.tsx
- apps/web/components/platform/projects/works-pipeline-card.tsx
- apps/web/components/platform/projects/project-work-tracker-page.tsx
- apps/web/components/platform/projects/project-milestone-timeline.tsx
- apps/web/components/platform/projects/project-gantt-schedule.tsx
- apps/web/components/platform/projects/project-stage-history.tsx
- apps/web/components/platform/projects/project-stage-change-select.tsx

### Modified
- apps/web/components/platform/projects/project-detail-page.tsx
- apps/web/components/platform/app-breadcrumbs.tsx

## Commits

1. `159e9d1` - feat(06-03): build obras pipeline and work tracking

## Verification

- [x] `/obras` renders WorksWorkspacePage with Kanban default
- [x] Kanban/Lista toggle works
- [x] Drag-and-drop moves cards between stages
- [x] Cards navigate to `/projetos/{id}`
- [x] `/projetos/{id}/obra` renders work tracker
- [x] Milestone add/edit/status changes work
- [x] Breadcrumbs show Pipeline and Obra correctly
- [x] Detail page has Ver obra CTA

## Issues

Initial agent output was corrupted - manually repaired and completed the implementation.

## Next

Phase 06 complete - proceed to verification.
