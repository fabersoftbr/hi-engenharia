---
phase: 05-anteprojetos-propostas-e-pre-os
plan: 02
subsystem: ui
tags: [kanban, pipeline, dnd, crm-handoff]

# Dependency graph
requires:
  - phase: 04-crm-e-pipeline-comercial
    provides: CRM workspace patterns,provides:
  - Fixed-order anteprojeto pipeline board with drag-and-drop
  - Kanban/Lista toggle preserving filters
  - CRM-to-anteprojeto handoff with contextual creation
  - New anteprojeto dialog with prefill from CRM origin

affects: [prop-01, prop-02, prop-03, prop-04]

# Tech tracking
tech-stack:
  added: ["@workspace/ui/src/components/scroll-area.tsx"]
  patterns: [Local React state for pipeline, DnD without persistence, query param handoff]

key-files:
  created:
  - apps/web/components/platform/anteprojects/anteproject-pipeline-board.tsx
  - apps/web/components/platform/anteprojects/anteproject-pipeline-column.tsx
  - apps/web/components/platform/anteprojects/anteproject-pipeline-card.tsx
  - packages/ui/src/components/scroll-area.tsx
  modified:
  - apps/web/app/(platform)/anteprojetos/page.tsx
  - apps/web/components/platform/anteprojects/anteprojects-workspace-page.tsx
  - apps/web/components/platform/anteprojects/anteproject-list-page.tsx
  - apps/web/components/platform/anteprojects/anteproject-toolbar.tsx
  - apps/web/components/platform/anteprojects/new-anteproject-dialog.tsx
  - apps/web/components/platform/crm/crm-opportunity-detail-page.tsx

key-decisions:
  - "Used local React state for anteprojeto pipeline changes - no persistence, resets on navigation"
  - "History entries prepend on stage change to show most recent first"
  - "Query param handoff clears sourceOpportunityId after successful creation"

requirements-completed: [PIPE-02]

# Metrics
duration: 8min
completed: 2026-03-20
---

# Phase 05 Plan 02: Anteprojetos Pipeline with CRM Handoff

**Kanban-first anteprojetos workspace with drag-and-drop stage movement, Kanban/Lista toggle preserving filters, and CRM-to-anteprojeto handoff**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-20T22:54:25Z
- **Completed:** 2026-03-20T23:02:05Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments
- Fixed-order anteprojeto pipeline with 6 locked stages
- Drag-and-drop card movement between columns with local state update
- Kanban/Lista toggle preserving shared filters
- CRM-to-anteprojeto handoff with prefill data
- New anteprojeto dialog with contextual creation

## Task Commits

Each task was committed atomically:

1. **Task 1: Add shared view-toggle primitive and build anteprojetos workspace shell** - `e0ccbca` (feat)
2. **Task 2: Build fixed-order anteprojeto pipeline board with drag-and-drop** - `e0ccbca` (feat)
3. **Task 3: Add CRM-to-anteprojeto handoff and local contextual creation flow** - `e0ccbca` (feat)

**Plan metadata:** `e0ccbca` (docs: complete plan)

_Note: TDD tasks may have multiple commits (test, feat, refactor)_

## Files Created/Modified
- `apps/web/components/platform/anteprojects/anteproject-pipeline-board.tsx` - Pipeline board with DragDropContext
- `apps/web/components/platform/anteprojects/anteproject-pipeline-column.tsx` - Column component with stage label and count
- `apps/web/components/platform/anteprojects/anteproject-pipeline-card.tsx` - Card component with title, client, badges, avatar
- `packages/ui/src/components/scroll-area.tsx` - Scroll area component from shadcn
- `apps/web/app/(platform)/anteprojetos/page.tsx` - Route page rendering workspace
- `apps/web/components/platform/anteprojects/anteprojects-workspace-page.tsx` - Workspace page with filters and DnD
- `apps/web/components/platform/anteprojects/anteproject-list-page.tsx` - List page accepting prop
- `apps/web/components/platform/anteprojects/anteproject-toolbar.tsx` - Toolbar component
- `apps/web/components/platform/anteprojects/new-anteproject-dialog.tsx` - Dialog for creating anteprojects
- `apps/web/components/platform/crm/crm-opportunity-detail-page.tsx` - Added "Criar anteprojeto" link

## Decisions Made
- Used local React state for anteprojeto pipeline changes - no persistence, resets on navigation
- History entries prepend on stage change to show most recent first
- Query param handoff clears sourceOpportunityId after successful creation

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all components implemented smoothly following established CRM patterns.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Anteprojetos workspace complete with Kanban/Lisa toggle and DnD, and CRM handoff
- Ready for proposal creation in next plans

---
*Phase: 05-anteprojetos-propostas-e-pre-os*
*Completed: 2026-03-20*
