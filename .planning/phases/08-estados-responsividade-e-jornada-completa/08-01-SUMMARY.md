---
phase: 08-estados-responsividade-e-jornada-completa
plan: 01
subsystem: ui
tags: [skeleton, empty-state, toast, loading, error-handling, navigation-transition]

# Dependency graph
requires:
  - phase: 07
    provides: Dashboard, CRM, Anteprojects, Proposals, Drive modules
provides:
  - Shared empty-state and skeleton primitives in @workspace/ui
  - Platform-level skeleton wrappers with test IDs
  - Toast helpers (success, info, error, undo, PDF ready)
  - Simulated loading hook for development
  - /erro page and global-error.tsx for error recovery
  - NavigationTransition component for page transitions
affects: [08-02, 08-03, 08-04, 08-05, 08-06, 08-07]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Skeleton primitives with exact dimensions matching real components
    - Toast helpers with duration constants (3000/4000/5000ms)
    - 800ms simulated loading delay in development mode
    - 150ms fade/slide page transition with scroll reset

key-files:
  created:
    - packages/ui/src/components/empty-state.tsx
    - packages/ui/src/components/table-skeleton.tsx
    - packages/ui/src/components/card-grid-skeleton.tsx
    - packages/ui/src/components/pipeline-skeleton.tsx
    - packages/ui/src/components/detail-skeleton.tsx
    - apps/web/components/platform/states/empty-state.tsx
    - apps/web/components/platform/states/skeletons.tsx
    - apps/web/lib/toast-helpers.ts
    - apps/web/lib/use-simulated-loading.ts
    - apps/web/app/erro/page.tsx
    - apps/web/app/global-error.tsx
    - apps/web/components/platform/navigation-transition.tsx
  modified:
    - packages/ui/src/components/data-table.tsx
    - apps/web/app/(platform)/layout.tsx

key-decisions:
  - "Skeleton primitives use exact dimensions matching real components for visual fidelity"
  - "Toast durations standardized: success 3s, info 4s, error 5s"
  - "Simulated loading only active in development mode, skips in production"
  - "NavigationTransition uses 150ms fade/slide with scroll reset"

patterns-established:
  - "Typed skeleton components (Table, CardGrid, Pipeline, Detail) in @workspace/ui"
  - "Platform-level wrappers with data-testid attributes for testing"
  - "EmptyState component with icon, title, description, and action props"
  - "BadgeOverflow helper in DataTable for capping badge lists to 3 + N"

requirements-completed: [STAT-01, STAT-02, STAT-03, RESP-01]

# Metrics
duration: 5min
completed: 2026-03-21
---

# Phase 08 Plan 01: Shared State Primitives and Feedback Infrastructure Summary

**Registration of shared state primitives and feedback infrastructure that Phase 8 adoption plans rely on, including skeletons, empty states, toast helpers, simulated loading hook, error surfaces, and route transitions.**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-21T12:50:00Z
- **Completed:** 2026-03-21T12:54:03Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments

- Created typed skeleton components (Table, CardGrid, Pipeline, Detail) in @workspace/ui with exact dimensions matching real components
- Added EmptyState primitive with flexible props (icon, title, description, action)
- Enhanced DataTable with emptyState prop and BadgeOverflow helper for responsive badge lists
- Centralized toast helpers with standardized durations (success 3s, info 4s, error 5s)
- Implemented simulated loading hook with 800ms delay for development mode
- Created /erro page with friendly illustration and recovery actions
- Added global-error.tsx as root error boundary
- Mounted NavigationTransition in platform layout for 150ms fade/slide page transitions

## Task Commits

Each task was committed atomically:

1. **Task 1: Build shared empty and skeleton primitives** - `516281a` (feat)
2. **Task 2: Add feedback helpers, simulated loading, error surfaces, and route transition** - `c9401bc` (feat)

**Plan metadata:** pending (docs: complete plan)

## Files Created/Modified

- `packages/ui/src/components/empty-state.tsx` - Convenience EmptyState component using shared Empty primitive
- `packages/ui/src/components/table-skeleton.tsx` - TableSkeleton with rowCount and columnCount props
- `packages/ui/src/components/card-grid-skeleton.tsx` - CardGridSkeleton with itemCount prop
- `packages/ui/src/components/pipeline-skeleton.tsx` - PipelineSkeleton with columnCount and cardsPerColumn props
- `packages/ui/src/components/detail-skeleton.tsx` - DetailSkeleton for two-column detail pages
- `packages/ui/src/components/data-table.tsx` - Added emptyState prop and BadgeOverflow helper
- `apps/web/components/platform/states/empty-state.tsx` - Local wrapper with stable imports
- `apps/web/components/platform/states/skeletons.tsx` - Local wrappers with test IDs
- `apps/web/lib/toast-helpers.ts` - Central toast contract (showSuccessToast, showInfoToast, showErrorToast, showUndoToast, showPdfReadyToast)
- `apps/web/lib/use-simulated-loading.ts` - 800ms loading delay in development
- `apps/web/app/erro/page.tsx` - Friendly error page with SVG illustration
- `apps/web/app/global-error.tsx` - Root error boundary with retry button
- `apps/web/components/platform/navigation-transition.tsx` - 150ms fade/slide transition with scroll reset
- `apps/web/app/(platform)/layout.tsx` - Mounts NavigationTransition around platform children

## Decisions Made

- Skeleton primitives use exact dimensions matching real components for layout stability during loading
- Toast durations standardized to 3000ms (success), 4000ms (info), 5000ms (error)
- Simulated loading only active in NODE_ENV=development, resolves immediately in production
- NavigationTransition uses 150ms duration for fade/slide effect
- BadgeOverflow caps visible badges to 3 with "+N" tooltip for remaining items

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all components were implemented following the UI-SPEC contract.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Shared state primitives ready for adoption in plans 08-02 through 08-07
- Toast helpers available for all feedback scenarios
- Error surfaces in place for error recovery
- NavigationTransition mounted and ready for page transitions
- Tests passing (15/15) for loading and feedback components

## Self-Check: PASSED

- All files exist at documented paths
- Commits 516281a and c9401bc verified in git history
- Tests passing (15/15)

---

*Phase: 08-estados-responsividade-e-jornada-completa*
*Completed: 2026-03-21*
