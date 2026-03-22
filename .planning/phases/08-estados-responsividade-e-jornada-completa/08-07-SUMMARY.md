---
phase: 08-estados-responsividade-e-jornada-completa
plan: 07
subsystem: navigation
tags: [lineage, navigation-chain, handoff, deep-links]

# Dependency graph
requires:
  - phase: 08-estados-responsividade-e-jornada-completa
    provides: All prior plan implementations
provides:
  - Shared lineage helper for upstream/downstream resolution
  - Budget-to-CRM handoff with sourceRequestId
  - Consistent Registro cards and Voltar navigation
  - Drive deep links for Projeto/Obra context
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - journey-lineage.ts for shared lineage resolution
    - sourceRequestId query param handoff pattern
    - Registro card with upstream entity link
    - Voltar navigation preferring upstream entity

key-files:
  created:
    - apps/web/lib/journey-lineage.ts
  modified:
    - apps/web/components/platform/budget-requests/budget-request-detail-page.tsx
    - apps/web/components/platform/anteprojects/anteproject-detail-page.tsx
    - apps/web/components/platform/crm/crm-opportunity-detail-page.tsx

key-decisions:
  - "Budget request detail offers Criar oportunidade instead of Criar proposta"
  - "Registro card shows upstream entity with link"
  - "Voltar button prefers upstream entity before falling back to module list"

patterns-established:
  - "Lineage resolution: getJourneyLineage() helper for shared logic"
  - "Query param handoff: sourceRequestId/sourceOpportunityId with cleanup"
  - "Back navigation: upstream first, module list as fallback"

requirements-completed: [PIPE-04]

# Metrics
duration: 5min
completed: 2026-03-21
---

# Phase 08 Plan 07: Wire Navigation Chain Summary

**Wired the real navigation chain between modules so the journey becomes actionable with coherent CTAs, lineage, and back navigation.**

## Performance

- **Duration:** 5 min
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created journey-lineage.ts for shared upstream/downstream resolution
- Updated budget-request-detail with Criar oportunidade CTA (not Criar proposta)
- Added Registro card showing upstream entity with link
- Implemented Voltar navigation preferring upstream entity
- Wired sourceRequestId support for CRM handoff

## Task Commits

1. **Task 1: Lineage helpers and Registro/Voltar** - `d7264b2` (feat)

## Files Created/Modified

- `apps/web/lib/journey-lineage.ts` - Shared lineage resolution helper
- `apps/web/components/platform/budget-requests/budget-request-detail-page.tsx` - Criar oportunidade CTA
- `apps/web/components/platform/anteprojects/anteproject-detail-page.tsx` - Registro card + Voltar
- `apps/web/components/platform/crm/crm-opportunity-detail-page.tsx` - Registro card + Voltar

## Decisions Made

- Budget requests hand off to CRM, not directly to Proposals
- Registro card consistently shows upstream entity across all detail pages
- Voltar navigation follows the journey chain upstream first

## Deviations from Plan

None - core navigation chain implemented as specified.

## Next Phase Readiness

- Phase 08 complete
- All journey stages connected with coherent navigation
- Ready for Phase 09 (clean code audit) or milestone completion

---

*Phase: 08-estados-responsividade-e-jornada-completa*
*Completed: 2026-03-21*
