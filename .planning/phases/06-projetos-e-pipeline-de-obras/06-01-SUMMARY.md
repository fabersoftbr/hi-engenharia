---
phase: "06"
plan: "01"
status: complete
completed_at: "2026-03-21"
executor_model: opus
---

# Plan 06-01: Projects List Foundation

## Summary

Built the base of the projetos module with real listing, locked filters, and shared mock data contract.

## What Was Built

### Data Contract (`apps/web/lib/projects-data.ts`)
- `ProjectType`: 5 types (residencial, comercial, industrial, rural, condominio)
- `ProjectStatus`: 5 statuses (contrato, em-andamento, concluido, pausado, cancelado)
- `WorkStageId`: 11 execution stages (contrato through entrega)
- `ProjectRecord`: Full project schema with proposalId, anteprojectId, progressPercent
- Helper functions: getProjects, getProjectById, filterProjects, groupProjectsByStage, getProjectProgress
- 11 seeded projects covering all work stages

### Badge Components
- `project-status-badge.tsx`: Metadata-driven status badge using PROJECT_STATUS_META
- `project-type-badge.tsx`: Metadata-driven type badge using PROJECT_TYPES

### Toolbar (`projects-toolbar.tsx`)
- Type, Status, Responsavel filters
- Search field with placeholder "Buscar por nome ou cliente"
- "Novo projeto" action button

### List Page (`projects-list-page.tsx`)
- DataTable with columns: ID, Projeto, Cliente, Tipo, Status, Responsavel, Potencia (kWp), Data de inicio
- Row navigation to /projetos/{id}
- Empty states: "Nenhum projeto encontrado", "Nenhum resultado para sua busca"
- Reset action: "Limpar filtros"
- Contextual navigation: "Ver pipeline de obras" -> /obras
- Mobile-responsive column visibility

### Route (`apps/web/app/(platform)/projetos/page.tsx`)
- Replaced ModulePlaceholderPage with ProjectsListPage

## Key Files

### Created
- apps/web/lib/projects-data.ts
- apps/web/components/platform/projects/projects-toolbar.tsx
- apps/web/components/platform/projects/projects-list-page.tsx
- apps/web/components/platform/projects/project-status-badge.tsx
- apps/web/components/platform/projects/project-type-badge.tsx

### Modified
- apps/web/app/(platform)/projetos/page.tsx

## Commits

1. `f2ff4db` - feat(06-01): create projects data contract and badge helpers
2. `5539dbb` - feat(06-01): build projects filter toolbar and list table view

## Verification

- [x] ProjectsListPage renders at /projetos
- [x] WORK_STAGE_ORDER contains 11 stages
- [x] PROJECT_STATUS_META contains 5 statuses
- [x] All required labels present (Portuguese)
- [x] filterProjects functional
- [x] Mobile responsive

## Issues

None. Clean implementation following existing patterns.

## Next

Plan 06-02 will add the project detail page with stage changes and linked context.
