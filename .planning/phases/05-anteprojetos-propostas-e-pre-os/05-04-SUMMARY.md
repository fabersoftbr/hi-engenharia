---
phase: 05-anteprojetos-propostas-e-pre-os
plan: 04
status: complete
completed_at: 2026-03-20
requirements:
  - PROP-03
  - PROP-04
  - PREC-01
commit: ff5811a
---

# 05-04: Proposal Preview, Simulated Export/Send & Price Table Upload

## What Was Built

Finalizes the proposal experience with document-style preview, toast-based export/send feedback, and the auxiliary price-table upload flow.

### Key Artifacts

1. **Shared Sonner Integration**
   - `packages/ui/src/components/sonner.tsx` - Shared toast component with theme support
   - Wired into `apps/web/app/(platform)/layout.tsx` for all platform pages

2. **Proposal Detail Route**
   - `apps/web/app/(platform)/propostas/[proposalId]/page.tsx` - Dynamic route with Next.js 16 params signature
   - `proposal-detail-page.tsx` - Full detail view with local status state
   - `proposal-preview.tsx` - Reusable document-style preview component
   - `proposal-status-badge.tsx` - Status badge with Portuguese labels

3. **Simulated Actions**
   - Exportar PDF - Triggers `toast.success("PDF gerado com sucesso")`
   - Enviar proposta - Triggers `toast.success("Proposta enviada com sucesso")` and updates local status to `enviada`
   - Actions only enabled when status is `pronta` ("Pronta para envio")

4. **Price Table Upload Flow**
   - `apps/web/app/(platform)/tabela-de-precos/upload/page.tsx` - Upload route
   - `price-table-upload-page.tsx` - Mock upload with inline version history
   - Headings: "Enviar nova tabela", "Historico de versoes"
   - Success/error feedback via toast

5. **Integration Points**
   - Breadcrumbs updated for `/propostas/{id}` ("Detalhe") and `/tabela-de-precos/upload` ("Upload")
   - Anteproject detail page shows "Proposta gerada" badge and "Abrir proposta comercial" link when `proposalId` exists

## Verification Results

- [x] `pnpm lint` - Passed (warnings only, no errors)
- [x] `pnpm typecheck` - Passed
- [x] `pnpm build` - Passed
- [x] All plan acceptance criteria met

## Key Files

| File | Purpose |
|------|---------|
| `packages/ui/src/components/sonner.tsx` | Shared toast component |
| `apps/web/app/(platform)/layout.tsx` | Toaster integration |
| `apps/web/app/(platform)/propostas/[proposalId]/page.tsx` | Proposal detail route |
| `apps/web/components/platform/proposals/proposal-detail-page.tsx` | Detail page with actions |
| `apps/web/components/platform/proposals/proposal-preview.tsx` | Document-style preview |
| `apps/web/components/platform/proposals/proposal-status-badge.tsx` | Status badges |
| `apps/web/components/platform/price-table/price-table-upload-page.tsx` | Upload flow |
| `apps/web/app/(platform)/tabela-de-precos/upload/page.tsx` | Upload route |
| `apps/web/components/platform/anteprojects/anteproject-detail-page.tsx` | Proposal handoff |
| `apps/web/lib/proposals-data.ts` | Data with "Pronta para envio" label |

## Deviations

- Fixed syntax error in `price-table-page.tsx` (extra closing brace)
- Added missing `sonner` dependency to `packages/ui/package.json`

## Completion

Phase 05 is now complete with all 4 plans executed:
- 05-01: Anteprojects base
- 05-02: Anteprojects pipeline
- 05-03: Proposal builder and price table consultation
- 05-04: Proposal preview, export/send, and upload
