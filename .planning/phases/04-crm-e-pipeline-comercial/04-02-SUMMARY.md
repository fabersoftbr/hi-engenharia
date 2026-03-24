---
phase: 04-crm-e-pipeline-comercial
plan: 02
subsystem: crm
tags: [crm, detail-page, stage-history, select, local-state, breadcrumbs]

# Dependency graph
requires:
  - phase: 04-01
    provides: CRM data contract, stage/priority badges, filter infrastructure
provides:
  - CRM opportunity detail page at /crm/[opportunityId]
  - CrmStageHistory component for timeline visualization
  - CrmStageChangeSelect for local stage mutation
  - Breadcrumb support for CRM detail routes
affects: [crm, pipeline, breadcrumbs]

# Tech tracking
tech-stack:
  added: []
  patterns: [local state mutation, responsive two-column layout, history timeline]

key-files:
  created:
    - apps/web/app/(platform)/crm/[opportunityId]/page.tsx
    - apps/web/components/platform/crm/crm-opportunity-detail-page.tsx
    - apps/web/components/platform/crm/crm-stage-history.tsx
    - apps/web/components/platform/crm/crm-stage-change-select.tsx
  modified:
    - apps/web/components/platform/app-breadcrumbs.tsx

key-decisions:
  - "Used local React state for stage changes without persistence - state resets on navigation"
  - "Origin request link appears in left column on desktop, after actions on mobile for responsive ordering"
  - "History entries are prepended on stage change to show most recent first"

patterns-established:
  - "Pattern: Dynamic route with notFound() for missing records"
  - "Pattern: Two-column responsive layout with lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
  - "Pattern: Breadcrumb detection via pathname segment matching"

requirements-completed: [CRM-02]

# Metrics
duration: 15min
completed: 2026-03-20
---

# Phase 04 Plan 02: Opportunity Detail Page Summary

**CRM opportunity detail page with stage history timeline, local stage mutation, and origin budget request link**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-20T19:59:19Z
- **Completed:** 2026-03-20T20:14:00Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments

- Dynamic route `/crm/[opportunityId]` with `notFound()` handling for missing records
- Two-column responsive detail layout with locked grid classes
- Stage history timeline with chronological entries
- Local stage change with immediate history append
- Breadcrumb support for nested CRM detail paths
- Link to origin budget request from CRM opportunity

## Task Commits

Each task was committed atomically:

1. **Task 1: Add the CRM detail route boundary and nested breadcrumb labeling** - `9edb0eb` (feat)
2. **Task 2: Build the opportunity detail layout and stage-history presentation** - `ece24e3` (feat)
3. **Task 3: Implement local stage changes and history append behavior** - `4783b33` (feat)

**Plan metadata:** pending (docs: complete plan)

## Files Created/Modified

- `apps/web/app/(platform)/crm/[opportunityId]/page.tsx` - Dynamic route with notFound handling
- `apps/web/components/platform/crm/crm-opportunity-detail-page.tsx` - Two-column detail layout
- `apps/web/components/platform/crm/crm-stage-history.tsx` - Timeline visualization component
- `apps/web/components/platform/crm/crm-stage-change-select.tsx` - Stage selection dropdown
- `apps/web/components/platform/app-breadcrumbs.tsx` - Added CRM detail path handling

## Decisions Made

- Used local React state with `useState` for stage changes - no persistence or backend logic
- History entries prepend to show most recent changes first
- Origin request card appears in different positions on desktop (left column) vs mobile (after actions)
- Reused `CrmStageBadge` and `CrmPriorityBadge` components from plan 04-01

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all verification checks passed on first run.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- CRM detail page complete with local stage mutation
- Ready for plan 04-03: Kanban pipeline with drag-and-drop
- History component can be reused for other timeline needs

## Self-Check: PASSED

All files and commits verified:
- All 4 created component files exist
- All 3 task commits found in git history

---
*Phase: 04-crm-e-pipeline-comercial*
*Completed: 2026-03-20*
