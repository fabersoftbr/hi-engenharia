---
phase: 05-anteprojetos-propostas-e-pre-os
plan: 01
status: complete
completed_at: 2026-03-20
requirements:
  - ANT-01
  - ANT-02
---

# 05-01: Anteproject Module Base

## Summary

Built the foundation for the anteproject module with a queue view, technical detail page, and shared mock data layer. The `/anteprojetos` route now renders a real queue instead of a placeholder.

## What Was Built

### Data Contract (`apps/web/lib/anteprojects-data.ts`)
- `AnteprojectStageId` type with 6 stages: `solicitacao`, `analise-tecnica`, `em-revisao`, `retorno-comercial`, `aguardando-cliente`, `aprovado-ou-recusado`
- `AnteprojectRecord` with full schema including `originCrmOpportunityId`, `proposalId`, `isAwaitingInformation`
- `ANTEPROJECT_STAGE_ORDER` and `ANTEPROJECT_STAGE_META` for metadata-driven rendering
- `ANTEPROJECT_PRIORITY_META` for priority badges
- Seeded 6 anteprojects with diverse stages and owners

### Badge Components
- `anteproject-stage-badge.tsx` - renders stage from `ANTEPROJECT_STAGE_META`
- `anteproject-priority-badge.tsx` - renders priority from `ANTEPROJECT_PRIORITY_META`

### Queue Experience
- `anteproject-toolbar.tsx` - filters for responsible, priority, search, and "Aguardando informacoes"
- `anteproject-list-page.tsx` - DataTable with columns: ID, Anteprojeto, Cliente, Etapa, Aguardando informacoes, Responsavel, Prioridade, Data
- Empty states: "Nenhum anteprojeto encontrado", "Nenhum resultado para sua busca"

### Detail Experience
- `[anteprojectId]/page.tsx` - dynamic route with `notFound()` handling
- `anteproject-detail-page.tsx` - two-column layout with Resumo tecnico, Timeline, Anexos, CRM de origem link, Proposta comercial

### Breadcrumbs
- Updated `app-breadcrumbs.tsx` with "Detalhe" label for anteproject detail pages

## Key Files Created/Modified

| File | Purpose |
|------|---------|
| `apps/web/lib/anteprojects-data.ts` | Shared data contract and mock data |
| `apps/web/components/platform/anteprojects/anteproject-stage-badge.tsx` | Stage badge component |
| `apps/web/components/platform/anteprojects/anteproject-priority-badge.tsx` | Priority badge component |
| `apps/web/components/platform/anteprojects/anteproject-toolbar.tsx` | Queue filter toolbar |
| `apps/web/components/platform/anteprojects/anteproject-list-page.tsx` | Queue list page |
| `apps/web/components/platform/anteprojects/anteproject-detail-page.tsx` | Technical detail page |
| `apps/web/app/(platform)/anteprojetos/page.tsx` | Queue route (replaced placeholder) |
| `apps/web/app/(platform)/anteprojetos/[anteprojectId]/page.tsx` | Detail route |
| `apps/web/components/platform/app-breadcrumbs.tsx` | Breadcrumb handling |

## Verification

- [x] `pnpm --filter web lint` - passes (warnings only)
- [x] `pnpm --filter web typecheck` - passes
- [x] `AnteprojectListPage` renders in `/anteprojetos/page.tsx`
- [x] `ANTEPROJECT_STAGE_ORDER`, `originCrmOpportunityId`, `proposalId`, `isAwaitingInformation` in data contract
- [x] Empty state messages in list page
- [x] "CRM de origem" and "Nenhuma proposta gerada" in detail page

## Deviations

None. All acceptance criteria met.

## Next Steps

Wave 2 (05-02) will build the visual anteproject pipeline funnel and connect the CRM handoff.
