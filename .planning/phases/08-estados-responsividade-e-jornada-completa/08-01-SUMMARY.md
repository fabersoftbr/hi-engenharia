---
phase: 08-estados-responsividade-e-jornada-completa
plan: 01
subsystem: ui
tags: [shadcn, skeleton, empty-state, sonner, toast, error-boundary, nextjs]

# Dependency graph
requires:
  - phase: 08-00
    provides: Vitest test harness for web app
provides:
  - Shared empty and skeleton primitives in @workspace/ui
  - Centralized feedback API with toast helpers
  - Development-only simulated loading hook
  - Framework error boundaries and friendly /erro page
affects: [08-02, 08-03, 08-04, 08-05, 08-06, 08-07]

# Tech tracking
tech-stack:
  added: []
  patterns: [EmptyState wrapper composition, typed skeleton primitives, centralized toast helpers]

key-files:
  created:
    - packages/ui/src/components/empty.tsx
    - packages/ui/src/components/empty-state.tsx
    - packages/ui/src/components/table-skeleton.tsx
    - packages/ui/src/components/card-grid-skeleton.tsx
    - packages/ui/src/components/pipeline-skeleton.tsx
    - packages/ui/src/components/detail-skeleton.tsx
    - apps/web/lib/feedback.ts
    - apps/web/hooks/use-simulated-loading.ts
    - apps/web/app/global-error.tsx
    - apps/web/app/(platform)/error.tsx
    - apps/web/app/erro/page.tsx
  modified:
    - packages/ui/src/components/sonner.tsx

key-decisions:
  - "Empty compound component follows shadcn slot pattern with data-slot attributes"
  - "EmptyState wrapper over Empty primitives with icon, title, description, action, className props"
  - "Inline SVG illustration for /erro page instead of external image dependency"
  - "global-error.tsx uses raw HTML buttons since root layout is replaced"

patterns-established:
  - "Empty composition: Empty > EmptyIcon + EmptyTitle + EmptyDescription + EmptyActions"
  - "Typed skeleton pattern: named skeletons with dimension defaults matching real layouts"
  - "Centralized feedback: showSuccessToast/showInfoToast/showErrorToast/showUndoToast/showPdfReadyToast"
  - "Error boundary layering: global-error.tsx > (platform)/error.tsx > /erro page"

requirements-completed: [STAT-01, STAT-02, STAT-03]

# Metrics
duration: 5min
completed: 2026-03-21
---

# Phase 08 Plan 01: Shared UI and Feedback Foundations Summary

**Shared empty and skeleton primitives, centralized Sonner feedback helpers, dev-only simulated loading hook, and layered error surfaces with illustrated /erro page**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-21T10:34:16Z
- **Completed:** 2026-03-21T10:39:26Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Six shared UI primitives added to @workspace/ui: Empty compound component, EmptyState wrapper, TableSkeleton, CardGridSkeleton, PipelineSkeleton, DetailSkeleton
- Centralized feedback API with five exported toast helpers and locked Sonner defaults (bottom-right, stacked, variable durations)
- Development-only useSimulatedLoading hook for skeleton visibility during dev
- Three-layer error handling: global-error.tsx (root), (platform)/error.tsx (segment), /erro (friendly page with inline SVG illustration)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add the shadcn-first empty and skeleton primitives** - `516281a` (feat)
2. **Task 2: Centralize feedback, simulated loading, and error surfaces** - `c9401bc` (feat)

## Files Created/Modified
- `packages/ui/src/components/empty.tsx` - Compound Empty component (Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyContent, EmptyActions)
- `packages/ui/src/components/empty-state.tsx` - EmptyState wrapper with icon, title, description, action props
- `packages/ui/src/components/table-skeleton.tsx` - TableSkeleton with rowCount=5, columnCount=6 defaults
- `packages/ui/src/components/card-grid-skeleton.tsx` - CardGridSkeleton with itemCount=4 default
- `packages/ui/src/components/pipeline-skeleton.tsx` - PipelineSkeleton with columnCount=4, cardsPerColumn=3 defaults
- `packages/ui/src/components/detail-skeleton.tsx` - DetailSkeleton with sectionCount=4 and 2-column layout
- `packages/ui/src/components/sonner.tsx` - Updated Toaster with bottom-right, visibleToasts=5, expand, duration=4000
- `apps/web/lib/feedback.ts` - showSuccessToast (3s), showInfoToast (4s), showErrorToast (5s), showUndoToast, showPdfReadyToast
- `apps/web/hooks/use-simulated-loading.ts` - Development-only loading delay hook
- `apps/web/app/global-error.tsx` - Root App Router error boundary
- `apps/web/app/(platform)/error.tsx` - Platform segment error boundary
- `apps/web/app/erro/page.tsx` - Friendly error page with inline SVG illustration and recovery actions

## Decisions Made
- Used shadcn compound component pattern (data-slot attributes) for Empty primitives to match Card/Dialog patterns
- EmptyState is a thin wrapper that composes Empty primitives with a simple prop surface (icon, title, description, action, className)
- Inline SVG illustration for /erro page avoids external image dependency while meeting the illustration requirement
- global-error.tsx uses raw HTML elements (not shadcn Button/Link) because it replaces the root layout and cannot access component providers
- Toaster defaults set at the shared component level; per-toast overrides happen in feedback.ts helpers

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all components are fully implemented with their intended functionality.

## Next Phase Readiness
- All six shared primitives are ready for adoption by later Phase 8 plans (08-02 through 08-07)
- Feedback helpers can be imported from `@/lib/feedback` in any platform page
- Error boundaries are active and will catch failures in the (platform) segment and at root level
- The /erro route is accessible for manual navigation or redirect

## Self-Check: PASSED

All 12 created files verified on disk. Both task commits (516281a, c9401bc) verified in git log.

---
*Phase: 08-estados-responsividade-e-jornada-completa*
*Completed: 2026-03-21*
