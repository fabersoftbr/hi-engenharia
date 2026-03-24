---
phase: "06"
plan: "02"
status: complete
completed_at: "2026-03-21"
executor_model: opus
---

# Plan 06-02: Project Detail Page

## Summary

Delivered the project detail screen with status, linked context, attachments, and local stage changes with progress recalculation.

## What Was Built

### Dynamic Route (`apps/web/app/(platform)/projetos/[projectId]/page.tsx`)
- Next.js 16 signature: `params: Promise<{ projectId: string }>`
- Loads record via `getProjectById(projectId)`
- Calls `notFound()` for missing ids

### Breadcrumbs (`apps/web/components/platform/app-breadcrumbs.tsx`)
- Dynamic project title resolution via `getProjectById`
- Fallback label: `Detalhe`

### Detail Page (`apps/web/components/platform/projects/project-detail-page.tsx`)
- Two-column layout: `lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-6`
- Left column: Resumo do projeto (Cliente, Tipo, Potencia (kWp), Local, Prazo previsto, Responsavel), Arquivos relacionados
- Right column: Status atual, Acoes, Historico de etapas
- Progress bar with "Progresso" label
- Next stage label: "Proxima etapa" / "Ultima etapa"
- Linked context cards: Proposta, Anteprojeto
- Action buttons: "Ver anteprojeto", "Gerar relatorio", "Baixar arquivo"

### Stage Components
- `project-stage-change-select.tsx`: Select dropdown using `WORK_STAGE_ORDER` with "Mudar estagio" placeholder
- `project-stage-history.tsx`: Timeline rendering history entries with stage badge, changedBy, changedAt

### Stage Change Logic
- Local state update via `setProject`
- Progress recalculation via `getProjectProgress(newStage)`
- History entry prepended with:
  - `stage`: new stage id
  - `changedAt`: `new Date().toISOString()`
  - `changedBy`: owner name or "Sistema"

### Progress Component (`packages/ui/src/components/progress.tsx`)
- Added `@radix-ui/react-progress` dependency
- shadcn/ui Progress component

## Key Files

### Created
- apps/web/app/(platform)/projetos/[projectId]/page.tsx
- apps/web/components/platform/projects/project-detail-page.tsx
- apps/web/components/platform/projects/project-stage-change-select.tsx
- apps/web/components/platform/projects/project-stage-history.tsx
- packages/ui/src/components/progress.tsx

### Modified
- apps/web/components/platform/app-breadcrumbs.tsx
- packages/ui/package.json

## Commits

1. `e25bbd7` - fix(phase-06): repair corrupted project-detail-page.tsx

## Verification

- [x] `/projetos/[projectId]` renders with `params: Promise<{ projectId: string }>`
- [x] `getProjectById` and `notFound()` used correctly
- [x] Breadcrumbs resolve project title with "Detalhe" fallback
- [x] Two-column layout with exact class string
- [x] All required labels present (Portuguese)
- [x] Stage change updates local state, progress, and history
- [x] Progress bar shows percentage
- [x] Linked context cards for Proposta and Anteprojeto

## Issues

Initial agent output was corrupted - manually repaired the project-detail-page.tsx file.

## Next

Plan 06-03 will add the obras pipeline workspace with drag-and-drop and work tracking routes.
