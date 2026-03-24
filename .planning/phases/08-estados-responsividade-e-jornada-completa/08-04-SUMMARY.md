---
phase: 08-estados-responsividade-e-jornada-completa
plan: 04
subsystem: ui
tags: [mobile, pipeline-tabs, bottom-sheet, alert-dialog, responsive]

# Dependency graph
requires:
  - phase: 08-estados-responsividade-e-jornada-completa
    provides: UI-SPEC responsive contract, useIsMobile hook, Sheet component
provides:
  - Mobile pipeline tabs for CRM, Anteprojetos, Obras
  - Bottom sheet overlays on mobile for main dialogs
  - Guarded CRM stage change to Fechado with AlertDialog
affects: [08-05, 08-06, 08-07]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - useIsMobile hook for responsive rendering
    - Tabs/TabsList/TabsTrigger for mobile pipeline navigation
    - Sheet side="bottom" with max-h-[90vh] for mobile overlays
    - AlertDialog for destructive action confirmation

key-files:
  created: []
  modified:
    - apps/web/components/platform/crm/crm-pipeline-board.tsx
    - apps/web/components/platform/anteprojects/anteproject-pipeline-board.tsx
    - apps/web/components/platform/projects/works-pipeline-board.tsx
    - apps/web/components/platform/crm/crm-stage-change-select.tsx
    - apps/web/components/platform/crm/new-opportunity-dialog.tsx
    - apps/web/components/platform/anteprojects/new-anteproject-dialog.tsx
    - apps/web/components/platform/proposals/proposal-origin-dialog.tsx
    - apps/web/components/platform/proposals/proposal-price-lookup-dialog.tsx
    - apps/web/components/platform/price-table/price-item-detail-dialog.tsx
    - apps/web/components/platform/projects/project-work-tracker-page.tsx

key-decisions:
  - "Mobile pipelines use horizontal scrollable tabs with stage label + count"
  - "Desktop keeps DragDropContext intact, only mobile uses tabs"
  - "All main dialogs branch to Sheet on mobile with bottom positioning"
  - "CRM Fechado stage change requires AlertDialog confirmation"

patterns-established:
  - "Mobile pipeline pattern: useIsMobile + Tabs/TabsList/TabsTrigger + card list for active stage"
  - "Mobile overlay pattern: useIsMobile + Sheet side=\"bottom\" max-h-[90vh] overflow-y-auto"
  - "Destructive confirmation: AlertDialog with title + description + confirm/cancel"

requirements-completed: [RESP-01]

# Metrics
duration: 8min
completed: 2026-03-21
---

# Phase 08 Plan 04: Mobile Interaction Patterns Summary

**Added mobile interaction patterns for pipelines (tabs instead of DnD) and overlays (bottom sheets instead of dialogs), plus guarded CRM Fechado stage change with confirmation dialog.**

## Performance

- **Duration:** 8 min
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments

- Added mobile tab navigation to CRM, Anteprojects, and Obras pipeline boards
- Each mobile tab shows stage label plus card count (e.g., "Em analise (5)")
- Desktop DragDropContext remains unchanged
- Converted main dialog surfaces to Sheet on mobile with bottom positioning
- Added AlertDialog confirmation for CRM stage change to Fechado
- Applied sr-only titles for accessibility on Sheet variants

## Task Commits

Each task was committed atomically:

1. **Task 1: Mobile pipeline tabs** - `1f9887f` (feat) - CRM, Anteprojects, Obras pipeline boards
2. **Task 2: Bottom sheets and CRM closing guard** - `2271d8d` (feat) - Dialog-to-Sheet conversion + AlertDialog

## Files Created/Modified

- `apps/web/components/platform/crm/crm-pipeline-board.tsx` - Mobile tabs with useIsMobile
- `apps/web/components/platform/anteprojects/anteproject-pipeline-board.tsx` - Mobile tabs with useIsMobile
- `apps/web/components/platform/projects/works-pipeline-board.tsx` - Mobile tabs with useIsMobile
- `apps/web/components/platform/crm/crm-stage-change-select.tsx` - AlertDialog for Fechado confirmation
- `apps/web/components/platform/crm/new-opportunity-dialog.tsx` - Sheet on mobile
- `apps/web/components/platform/anteprojects/new-anteproject-dialog.tsx` - Sheet on mobile
- `apps/web/components/platform/proposals/proposal-origin-dialog.tsx` - Sheet on mobile
- `apps/web/components/platform/proposals/proposal-price-lookup-dialog.tsx` - Sheet on mobile
- `apps/web/components/platform/price-table/price-item-detail-dialog.tsx` - Sheet on mobile
- `apps/web/components/platform/projects/project-work-tracker-page.tsx` - Sheet on mobile

## Decisions Made

- Mobile pipelines use horizontal scrollable tabs instead of drag-and-drop for better touch ergonomics
- Sheet side="bottom" with max-h-[90vh] matches existing drive-file-preview.tsx pattern
- AlertDialog confirmation prevents accidental CRM closure
- sr-only titles maintain accessibility without visual clutter

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all acceptance criteria verified via grep.

## Next Phase Readiness

- Mobile pipeline navigation complete for all three modules
- Mobile overlay pattern established and reusable
- Ready for Phase 08-05 (detail/form polish and feedback)

---

*Phase: 08-estados-responsividade-e-jornada-completa*
*Completed: 2026-03-21*
