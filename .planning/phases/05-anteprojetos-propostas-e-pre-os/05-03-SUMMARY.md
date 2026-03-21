---
phase: 05-anteprojetos-propostas-e-pre-os
plan: 03
status: complete
completed_at: 2026-03-20
requirements:
  - PROP-01
  - PROP-02
  - PREC-02
  - PREC-03
---

# 05-03: Proposals Base and Price Table Workspace

## Summary

Built the foundation for the proposals module with list view, builder entry flow, and price table workspace. Both `/propostas` and `/tabela-de-precos` now render real modules instead of placeholders. The proposal builder provides form-powered entry with origin selection and price lookup integration.

## What Was Built

### Data Contracts
- `apps/web/lib/proposals-data.ts` - `ProposalStatus`, `ProposalOriginType`, `ProposalOrigin`, `ProposalItem`, `ProposalRecord`, `PROPOSAL_STATUS_META`, seeded `PROPOSALS`, helper functions
- `apps/web/lib/proposal-form.ts` - `proposalFormSchema`, `proposalFormDefaultValues`, `ProposalFormValues`, `generateProposalItemId`, `calculateItemTotal`, `calculateItemsGrandTotal`, `VALIDITY_OPTIONS`
- `apps/web/lib/price-table-data.ts` - `PriceRegionLabel`, `PriceConsumptionBandLabel`, `PriceTableItem`, `PriceTableRow`, seeded items with nested pricing, `getPriceTableRows()`, `formatPrice()`

### Proposals Module
- `proposals-list-page.tsx` - DataTable with columns: ID, Cliente, Titulo, Status, Valor, Data de criacao
- `proposals-toolbar.tsx` - Status filter and search with placeholder `Buscar por cliente ou titulo`
- `proposal-origin-dialog.tsx` - Origin selection dialog with `Cliente` and `Oportunidade` options
- `proposal-builder-page.tsx` - Form with sections: Dados do cliente, Descricao do projeto, Itens da proposta, Totais, Condicoes comerciais, Validade
- `proposal-items-section.tsx` - Dynamic items management with `Consultar tabela` button
- `proposal-price-lookup-dialog.tsx` - Price lookup integration for injecting items into proposals

### Price Table Module
- `price-table-page.tsx` - Filterable catalog with columns: Codigo, Item, Regiao, Faixa, Valor unitario, Condicoes
- `price-table-toolbar.tsx` - Filters for `Regiao` and `Faixa de consumo`, plus search
- `price-item-detail-dialog.tsx` - Item detail dialog with full pricing table

### Route Updates
- `apps/web/app/(platform)/propostas/page.tsx` - Now renders `ProposalsListPage`
- `apps/web/app/(platform)/propostas/nova/page.tsx` - Renders `ProposalBuilderPage`
- `apps/web/app/(platform)/tabela-de-precos/page.tsx` - Now renders `PriceTablePage`
- `apps/web/components/platform/anteprojects/anteproject-detail-page.tsx` - Added `Gerar proposta` CTA linking to `/propostas/nova?anteprojectId={id}`

### Breadcrumbs
- Updated `app-breadcrumbs.tsx` with `Nova proposta` label for `/propostas/nova`

## Key Files Created/Modified

| File | Purpose |
|------|---------|
| `apps/web/lib/proposals-data.ts` | Shared data contract for proposals |
| `apps/web/lib/proposal-form.ts` | Form schema and helpers |
| `apps/web/lib/price-table-data.ts` | Shared data contract for price table |
| `apps/web/components/platform/proposals/proposals-list-page.tsx` | Proposals list page |
| `apps/web/components/platform/proposals/proposals-toolbar.tsx` | Filters for proposals |
| `apps/web/components/platform/proposals/proposal-origin-dialog.tsx` | Origin selection dialog |
| `apps/web/components/platform/proposals/proposal-builder-page.tsx` | Proposal builder form |
| `apps/web/components/platform/proposals/proposal-items-section.tsx` | Items management section |
| `apps/web/components/platform/proposals/proposal-price-lookup-dialog.tsx` | Price lookup integration |
| `apps/web/components/platform/price-table/price-table-page.tsx` | Price table catalog |
| `apps/web/components/platform/price-table/price-table-toolbar.tsx` | Filters for price table |
| `apps/web/components/platform/price-table/price-item-detail-dialog.tsx` | Item detail dialog |
| `apps/web/app/(platform)/propostas/page.tsx` | Route update |
| `apps/web/app/(platform)/tabela-de-precos/page.tsx` | Route update |
| `apps/web/components/platform/anteprojects/anteproject-detail-page.tsx` | Added Gerar proposta CTA |

## Verification

- [x] `pnpm --filter web typecheck` - passes
- [x] `pnpm lint` - passes (warnings only)
- [x] `/propostas` renders `ProposalsListPage`
- [x] `/propostas/nova` renders `ProposalBuilderPage` with origin dialog
- [x] `/tabela-de-precos` renders `PriceTablePage`
- [x] `Consultar tabela` button in proposal items section
- [x] `Gerar proposta` CTA in anteproject detail page

## Deviations

- `formatCurrency` helper added to proposals-data.ts (was missing in original data contract)
- `ProposalOriginType` import added to proposal-builder-page.tsx to fix type error

## Next Steps

Wave 4 (05-04) will add document preview, export simulation, and price table upload features.
