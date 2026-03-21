---
phase: 08-estados-responsividade-e-jornada-completa
plan: 06
subsystem: ui

# Dependency graph
requires:
  - phase: 08-estados-responsividade-e-jornada-completa
    provides: Existing module data contracts, platform-config, dashboard-data patterns
provides:
  - Journey data contract aggregating active counts across modules
  - Journey page with horizontal timeline visualization
  - Dashboard journey pendencies panel
  - Test coverage for journey rendering contract

affects:
  - navigation
  - dashboard

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Aggregated data source pattern for cross-module counts
    - Module card composition with filtering (activeCount > 0)
    - Dashboard pendencies panel following existing card patterns

key-files:
  created:
    - apps/web/lib/journey-data.ts
    - apps/web/components/platform/jornada/journey-page.tsx
    - apps/web/components/platform/jornada/journey-timeline.tsx
    - apps/web/components/platform/jornada/journey-card.tsx
    - apps/web/components/platform/jornada/__tests__/journey-page.test.tsx
    - apps/web/app/(platform)/jornada/page.tsx
    - apps/web/components/platform/dashboard/dashboard-journey-pendencies.tsx
  modified:
    - apps/web/lib/platform-config.ts
    - apps/web/components/platform/app-breadcrumbs.tsx
    - apps/web/lib/dashboard-data.ts
    - apps/web/components/platform/portal-dashboard.tsx

key-decisions:
  - "Journey modules aggregate counts from existing data contracts to avoid duplication"
  - "Modules with zero active items are hidden from the timeline per UI-SPEC"
  - "Journey added to operation group in sidebar with folder-kanban icon"
  - "Dashboard pendencies panel placed before announcements/highlights footer grid"

patterns-established:
  - "Journey data aggregates active counts from existing module data sources"
  - "Timeline components filter and render modules with activeCount > 0"
  - "Dashboard pendencies follow existing Card/CardHeader/CardTitle/CardContent pattern"

requirements-completed: [PIPE-04]

# Metrics
duration: 6min
completed: 2026-03-21
---

# Phase 08 Plan 06: Jornada Summary

**Journey page with horizontal timeline aggregating active counts across Orcamento, CRM, Anteprojeto, Proposta, Projeto, and Obra modules, plus dashboard pendencies panel**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-21T23:43:42Z
- **Completed:** 2026-03-21T23:49:49Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments

- Journey page at /jornada rendering visual module chain in operational order
- Journey timeline filtering modules with zero active items (hidden from view)
- Journey module added to sidebar navigation in operation group
- Dashboard pendencies panel surfacing journey items on portal home
- Test coverage for journey rendering contract and data order assertions

## Task Commits

Each task was committed atomically:

1. **Task 1: Build the journey route, aggregated data, and validation coverage** - `f88a4c0` (feat)
2. **Task 2: Expose Jornada in navigation and add dashboard pendencies** - `a7219e4` (feat)

**Plan metadata:** (docs: pending final commit)

## Files Created/Modified

- `apps/web/lib/journey-data.ts` - Aggregates active counts from budget-requests, crm, anteprojects, proposals, projects data sources
- `apps/web/components/platform/jornada/journey-page.tsx` - Page wrapper with title and description
- `apps/web/components/platform/jornada/journey-timeline.tsx` - Responsive timeline composition rendering module cards
- `apps/web/components/platform/jornada/journey-card.tsx` - Card component with icon, label, active count, and link
- `apps/web/components/platform/jornada/__tests__/journey-page.test.tsx` - Test coverage for rendering contract
- `apps/web/app/(platform)/jornada/page.tsx` - Route entry wrapped in NavigationTransition
- `apps/web/lib/platform-config.ts` - Added jornada module with folder-kanban icon
- `apps/web/components/platform/app-breadcrumbs.tsx` - Added stable Jornada breadcrumb label
- `apps/web/lib/dashboard-data.ts` - Added getJourneyPendencies helper
- `apps/web/components/platform/dashboard/dashboard-journey-pendencies.tsx` - Dashboard panel for journey pendencies
- `apps/web/components/platform/portal-dashboard.tsx` - Integrated journey pendencies panel

## Decisions Made

- Aggregated journey data from existing module sources instead of duplicating counts
- Used folder-kanban icon for Jornada in sidebar (matches existing pipeline icon)
- Placed journey pendencies panel before announcements/highlights footer grid
- Followed existing Card/CardHeader/CardTitle/CardContent pattern for dashboard panel

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Test initially failed due to `getByText("Ver detalhes")` returning multiple elements - fixed by using `getAllByText` and checking length > 0

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Journey feature complete, ready for lineage/traceability enhancements
- All tests pass, sidebar entry visible, dashboard panel integrated

## Self-Check: PASSED

- All created files verified on disk
- Commits `f88a4c0` and `a7219e4` verified in git log
- All acceptance criteria verified

---
*Phase: 08-estados-responsividade-e-jornada-completa*
*Completed: 2026-03-21*
