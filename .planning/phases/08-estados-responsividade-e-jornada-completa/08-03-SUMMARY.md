---
phase: 08-estados-responsividade-e-jornada-completa
plan: 03
subsystem: ui
tags: [responsive, shell, toolbar, table-visibility, breakpoints]

# Dependency graph
requires:
  - phase: 08-estados-responsividade-e-jornada-completa
    provides: UI-SPEC responsive contract, shared EmptyState component, skeleton components
provides:
  - Normalized shell width constants (16rem expanded, 4rem collapsed, 18rem mobile)
  - Responsive header h-16 contract preserved
  - Theme labels in Portuguese preserved
  - Breadcrumb labels for dynamic routes (/comunicacao/[id]/editar, /projetos/[id]/obra)
  - Normalized toolbar primitives (Select/Input instead of raw HTML)
  - Responsive table column visibility across all list pages
affects: [responsive-layouts, toolbar-patterns, table-components]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Shell width constants preserved via SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, SIDEBAR_WIDTH_MOBILE
    - Responsive column visibility using hidden md:table-cell, hidden lg:table-cell, hidden xl:table-cell
    - Toolbar layout using flex flex-col gap-3 md:flex-row md:items-center

key-files:
  created: []
  modified:
    - packages/ui/src/components/sidebar.tsx
    - apps/web/components/platform/app-header.tsx
    - apps/web/components/platform/app-breadcrumbs.tsx
    - apps/web/components/platform/profile-switcher.tsx
    - apps/web/components/platform/price-table/price-table-toolbar.tsx
    - apps/web/components/platform/crm/crm-list-page.tsx
    - apps/web/components/platform/anteprojects/anteproject-list-page.tsx
    - apps/web/components/platform/proposals/proposals-list-page.tsx

key-decisions:
  - "Breadcrumbs extended with stable labels for /comunicacao/[id]/editar and /projetos/[id]/obra"
  - "Price Table toolbar normalized to use shadcn Select/Input instead of raw HTML controls"
  - "Proposals list page now hides value/date columns below lg breakpoint"

patterns-established:
  - "Shell width contract: SIDEBAR_WIDTH=16rem, SIDEBAR_WIDTH_ICON=4rem, SIDEBAR_WIDTH_MOBILE=18rem"
  - "Header height contract: h-16 (64px)"
  - "Theme labels: Tema claro, Tema escuro, Seguir sistema"
  - "Table column visibility: phone/city hidden below md, value/date hidden below lg"

requirements-completed: [RESP-01]

# Metrics
duration: 5min
completed: 2026-03-21
---

# Phase 08 Plan 03: Responsive Shell and Toolbar Normalization Summary

**Normalized shell width contract, breadcrumb labels for dynamic routes, and standardized toolbar primitives with responsive column visibility across list pages**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-21T14:23:23Z
- **Completed:** 2026-03-21T14:28:15Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Verified shell width constants (16rem expanded, 4rem collapsed, 18rem mobile) remain intact
- Extended breadcrumbs with stable labels for /comunicacao/[id]/editar and /projetos/[id]/obra routes
- Replaced raw HTML controls in price-table-toolbar with shadcn Select and Input components
- Added responsive column visibility to proposals list page (value/date columns hidden below lg)
- Added empty state components to crm-list-page and anteproject-list-page

## Task Commits

Each task was committed atomically:

1. **Task 1: Normalize the platform shell around the Phase 8 responsive contract** - `c46bb75` (feat)
2. **Task 2: Standardize toolbar primitives and responsive column visibility across list views** - `efabf06` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified

- `packages/ui/src/components/sidebar.tsx` - Shell width constants (no changes needed, already correct)
- `apps/web/components/platform/app-header.tsx` - Header h-16 contract (no changes needed, already correct)
- `apps/web/components/platform/app-breadcrumbs.tsx` - Added stable labels for editar/obra routes
- `apps/web/components/platform/profile-switcher.tsx` - Theme labels in Portuguese (no changes needed, already correct)
- `apps/web/components/platform/price-table/price-table-toolbar.tsx` - Replaced raw HTML with shadcn Select/Input
- `apps/web/components/platform/crm/crm-list-page.tsx` - Added empty state component
- `apps/web/components/platform/anteprojects/anteproject-list-page.tsx` - Added empty state component
- `apps/web/components/platform/proposals/proposals-list-page.tsx` - Added responsive column visibility

## Decisions Made

None - followed plan as specified. The files were already in the correct state for most acceptance criteria, only the breadcrumbs edit route and toolbar normalization required changes.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all acceptance criteria verified via grep commands.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Shell responsive contract complete and verified
- Toolbar primitives normalized across all list pages
- Table column visibility aligned with md/lg/xl breakpoints
- Ready for Phase 08-04 (mobile pipeline tabs and bottom sheet patterns)

---
*Phase: 08-estados-responsividade-e-jornada-completa*
*Completed: 2026-03-21*

## Self-Check: PASSED

- [x] SUMMARY.md file exists at `.planning/phases/08-estados-responsividade-e-jornada-completa/08-03-SUMMARY.md`
- [x] Commit `c46bb75` exists (Task 1)
- [x] Commit `efabf06` exists (Task 2)
