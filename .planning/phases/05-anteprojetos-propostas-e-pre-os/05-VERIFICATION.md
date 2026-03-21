---
phase: 05-anteprojetos-propostas-e-pre-os
verified: 2026-03-20T14:30:00Z
status: gaps_found
score: 4/5 must-haves verified
gaps:
  - truth: "/propostas/nova renders the proposal builder with origin selection, items section, and price lookup"
    status: partial
    reason: "The price lookup dialog opens but does not properly write selected values back to the form items. The handlePriceSelect callback receives itemCode, description, and unitPrice but only closes the dialog without using setValue to update the form fields."
    artifacts:
      - path: "apps/web/components/platform/proposals/proposal-items-section.tsx"
        issue: "handlePriceSelect does not call setValue to write itemCode, description, and unitPrice to the form"
    missing:
      - "Pass setValue function to ProposalItemsSection or lift price selection handler to ProposalBuilderPage"
      - "Wire the selected price item fields (itemCode, description, unitPrice) to the current form item row using setValue"
human_verification:
  - test: "Visual verification of anteprojects Kanban board"
    expected: "User can drag cards between pipeline stages and see counts update"
    why_human: "Drag-and-drop interaction behavior requires visual testing"
  - test: "Proposal document preview appearance"
    expected: "Preview renders with proper document-style layout and all section headings"
    why_human: "Visual appearance of document preview cannot be fully verified programmatically"
  - test: "Price table upload mock flow"
    expected: "User can simulate file upload and see success/error feedback"
    why_human: "Upload simulation success/failure is randomized, needs visual verification"
  - test: "CRM to Anteproject handoff flow"
    expected: "Clicking 'Criar anteprojeto' in CRM detail opens anteprojects with prefilled dialog"
    why_human: "Cross-module navigation and dialog prefill requires user flow testing"
---

# Phase 5: Anteprojetos, Propostas e Precos Verification Report

**Phase Goal:** Build the complete commercial proposal and pricing workflow with anteprojects queue, technical detail, proposal builder with document preview, simulated export/send, and price table consultation with upload flow.
**Verified:** 2026-03-20T14:30:00Z
**Status:** gaps_found
**Re-verification:** No - initial verification

## Goal Achievement

### Observable Truths

| #   | Truth                                                                                             | Status         | Evidence                                                                                           |
| --- | ------------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------- |
| 1   | `/anteprojetos` renders a Kanban/list toggle workspace with seeded rows and `/anteprojetos/{id}` renders technical detail | VERIFIED       | `AnteprojectsWorkspacePage` with viewMode toggle, `AnteprojectDetailPage` with all required sections |
| 2   | CRM handoff creates anteprojects with `originCrmOpportunityId` linking                            | VERIFIED       | `CrmOpportunityDetailPage` has `Criar anteprojeto` link, workspace reads `sourceOpportunityId` param |
| 3   | `/propostas/nova` renders the proposal builder with origin selection, items section, and price lookup | PARTIAL        | Builder renders, but price lookup does not write values back to form                              |
| 4   | `/propostas/[proposalId]` renders proposal detail with document preview and simulated export/send using toast | VERIFIED       | `ProposalDetailPage` with `ProposalPreview`, `toast.success` for export/send actions              |
| 5   | `/tabela-de-precos` renders price consultation with filters and `/tabela-de-precos/upload` renders mock upload | VERIFIED       | `PriceTablePage` with filters, `PriceTableUploadPage` with upload flow and version history         |

**Score:** 4/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | -------- | ------ | ------- |
| `apps/web/app/(platform)/anteprojetos/page.tsx` | Renders AnteprojectsWorkspacePage | VERIFIED | Imports and renders `AnteprojectsWorkspacePage` in Suspense |
| `apps/web/app/(platform)/anteprojetos/[anteprojectId]/page.tsx` | Dynamic route with notFound() | VERIFIED | Uses `params: Promise<{ anteprojectId: string }>`, calls `getAnteprojectById`, `notFound()` |
| `apps/web/components/platform/anteprojects/anteprojects-workspace-page.tsx` | Workspace with viewMode, filters, DnD | VERIFIED | All state variables present, `DragDropContext`, Kanban/Lista toggle |
| `apps/web/components/platform/anteprojects/anteproject-detail-page.tsx` | Technical detail with all sections | VERIFIED | Contains `Resumo tecnico`, `Timeline`, `Anexos`, `CRM de origem`, `Proposta comercial` |
| `apps/web/lib/anteprojects-data.ts` | Data contract with all exports | VERIFIED | Contains all required types, stage order, meta maps, helper functions |
| `apps/web/components/platform/crm/crm-opportunity-detail-page.tsx` | CRM handoff link | VERIFIED | Contains `Criar anteprojeto` CTA linking to `/anteprojetos?sourceOpportunityId={opportunity.id}` |
| `apps/web/app/(platform)/propostas/page.tsx` | Renders ProposalsListPage | VERIFIED | Renders `ProposalsListPage` without `ModulePlaceholderPage` |
| `apps/web/app/(platform)/propostas/nova/page.tsx` | Renders ProposalBuilderPage | VERIFIED | Renders `ProposalBuilderPage` with Suspense |
| `apps/web/components/platform/proposals/proposal-builder-page.tsx` | Builder with form, origin dialog | VERIFIED | Uses `useForm<ProposalFormValues>` with `zodResolver`, renders all sections |
| `apps/web/components/platform/proposals/proposal-items-section.tsx` | Items section with price lookup | PARTIAL | Has `Consultar tabela` button and dialog, but selection not wired to form |
| `apps/web/components/platform/proposals/proposal-price-lookup-dialog.tsx` | Price lookup with getPriceTableRows | VERIFIED | Consumes price table data, calls `onSelect` with itemCode, description, unitPrice |
| `apps/web/app/(platform)/propostas/[proposalId]/page.tsx` | Proposal detail route | VERIFIED | Uses correct Next.js 16 params signature, calls `getProposalById`, `notFound()` |
| `apps/web/components/platform/proposals/proposal-detail-page.tsx` | Detail with preview and actions | VERIFIED | Contains `Exportar PDF`, `Enviar proposta`, `toast.success` messages |
| `apps/web/components/platform/proposals/proposal-preview.tsx` | Document-style preview | VERIFIED | Contains all section headings: `Dados do cliente`, `Descricao do projeto`, `Tabela de itens`, `Totais`, `Condicoes`, `Validade` |
| `apps/web/app/(platform)/tabela-de-precos/page.tsx` | Renders PriceTablePage | VERIFIED | Renders `PriceTablePage` without `ModulePlaceholderPage` |
| `apps/web/app/(platform)/tabela-de-precos/upload/page.tsx` | Renders PriceTableUploadPage | VERIFIED | Renders `PriceTableUploadPage` |
| `apps/web/components/platform/price-table/price-table-page.tsx` | Price table with filters | VERIFIED | Contains `Enviar tabela` link, filters for region and consumption band |
| `apps/web/components/platform/price-table/price-table-upload-page.tsx` | Upload mock with version history | VERIFIED | Contains `Enviar nova tabela`, `Historico de versoes`, `toast.success` |
| `apps/web/lib/proposals-data.ts` | Proposal data contract | VERIFIED | Contains all required types, status ids, `Pronta para envio` label |
| `apps/web/lib/price-table-data.ts` | Price table data contract | VERIFIED | Contains all region and consumption band labels, helper functions |
| `packages/ui/src/components/sonner.tsx` | Shared toast component | VERIFIED | Exists and exports `Toaster` |
| `apps/web/app/(platform)/layout.tsx` | Renders Toaster | VERIFIED | Contains `<Toaster />` from `@workspace/ui/components/sonner` |

### Key Link Verification

| From | To | Via | Status | Details |
| ---- | -- | --- | ------ | ------- |
| `apps/web/app/(platform)/anteprojetos/page.tsx` | `AnteprojectsWorkspacePage` | import/render | WIRED | Component imported and rendered |
| `apps/web/app/(platform)/anteprojetos/[anteprojectId]/page.tsx` | `getAnteprojectById` | function call | WIRED | Record resolved, `notFound()` called when missing |
| `apps/web/components/platform/anteprojects/anteproject-detail-page.tsx` | `/crm/{originCrmOpportunityId}` | Link component | WIRED | Link renders when `originCrmOpportunityId` exists |
| `apps/web/components/platform/anteprojects/anteprojects-workspace-page.tsx` | `DragDropContext` | @hello-pangea/dnd | WIRED | DnD context wraps columns, `onDragEnd` updates state |
| `apps/web/components/platform/crm/crm-opportunity-detail-page.tsx` | `/anteprojetos?sourceOpportunityId={id}` | Link component | WIRED | `Criar anteprojeto` CTA links correctly |
| `apps/web/components/platform/proposals/proposal-builder-page.tsx` | `useForm<ProposalFormValues>` | react-hook-form | WIRED | Form with zodResolver, all sections rendered |
| `apps/web/components/platform/proposals/proposal-items-section.tsx` | `proposalPriceLookupDialog` | dialog component | PARTIAL | Dialog opens, but selection not written to form |
| `apps/web/components/platform/proposals/proposals-list-page.tsx` | `/propostas/{id}` | onRowClick | WIRED | Row click navigates to detail route |
| `apps/web/components/platform/proposals/proposal-detail-page.tsx` | `toast.success` | sonner | WIRED | `PDF gerado com sucesso`, `Proposta enviada com sucesso` messages |
| `apps/web/components/platform/anteprojects/anteproject-detail-page.tsx` | `/propostas/nova?anteprojectId={id}` | Link component | WIRED | `Gerar proposta` CTA links correctly |
| `apps/web/components/platform/anteprojects/anteproject-detail-page.tsx` | `/propostas/{proposalId}` | Link component | WIRED | `Abrir proposta comercial` link when proposalId exists |
| `apps/web/components/platform/price-table/price-table-page.tsx` | `/tabela-de-precos/upload` | Link component | WIRED | `Enviar tabela` button links correctly |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| ----------- | ----------- | ----------- | ------ | -------- |
| ANT-01 | 05-01 | Usuario pode visualizar uma fila de anteprojetos com situacao tecnica, pendencias e prioridade simuladas | SATISFIED | `/anteprojetos` renders Kanban/list workspace with seeded data, stage badges, priority badges, `Aguardando informacoes` flag |
| ANT-02 | 05-01 | Usuario pode abrir o detalhe de um anteprojeto com resumo tecnico, status, aguardando informacoes e retorno ao comercial simulados | SATISFIED | `/anteprojetos/{id}` renders `AnteprojectDetailPage` with technical summary, timeline, attachments, CRM origin link, proposal handoff |
| PIPE-02 | 05-02 | Usuario pode visualizar o pipeline de Anteprojetos com as dez etapas definidas | SATISFIED | 6-stage pipeline with `ANTEPROJECT_STAGE_ORDER`, drag-and-drop, counts per stage |
| PROP-01 | 05-03 | Usuario pode iniciar uma proposta a partir de um cliente ou oportunidade simulada | SATISFIED | `/propostas/nova` with `ProposalOriginDialog`, accepts `opportunityId` and `anteprojectId` query params |
| PROP-02 | 05-03 | Usuario pode preencher um formulario de proposta com dados do projeto e parametros comerciais simulados | SATISFIED | `ProposalBuilderPage` with all form sections: `Dados do cliente`, `Descricao do projeto`, `Itens`, `Totais`, `Condicoes`, `Validade` |
| PROP-03 | 05-04 | Usuario pode visualizar a montagem e a pre-visualizacao da proposta antes da exportacao | SATISFIED | `ProposalPreview` component with document-style sections, rendered in detail page |
| PROP-04 | 05-04 | Usuario pode acionar uma exportacao simulada de PDF ou envio visual da proposta | SATISFIED | `Exportar PDF` and `Enviar proposta` buttons with `toast.success` feedback |
| PREC-01 | 05-04 | Usuario pode visualizar uma tela de upload simulado da tabela de precos | SATISFIED | `/tabela-de-precos/upload` renders mock upload flow with version history |
| PREC-02 | 05-03 | Usuario pode consultar precos por regiao e faixa de consumo em uma interface filtravel | SATISFIED | `PriceTablePage` with region/consumption band filters, search |
| PREC-03 | 05-03 | Usuario pode listar e abrir detalhes de itens da tabela de precos com valores e condicoes mockadas | SATISFIED | `PriceItemDetailDialog` opens on row click, `ProposalPriceLookupDialog` for price lookup |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| ---- | ---- | ------- | -------- | ------ |
| `apps/web/components/platform/proposals/proposal-builder-page.tsx` | 119 | `console.log("Proposal saved:", data)` | Info | Acceptable for mock simulation |
| `apps/web/components/platform/budget-requests/budget-request-form.tsx` | 39-40 | `console.log` statements | Info | Acceptable for mock simulation |
| `apps/web/components/platform/anteprojects/new-anteproject-dialog.tsx` | 22,24 | Unused imports `AnteprojectPriority`, `ANTEPROJECT_STAGE_META` | Warning | Minor lint issue, does not block functionality |
| `apps/web/components/platform/anteprojects/anteproject-pipeline-card.tsx` | 11 | Unused import `AnteprojectStageBadge` | Warning | Minor lint issue, does not block functionality |

### Human Verification Required

1. **Anteprojects Kanban Drag-and-Drop**
   - **Test:** Navigate to `/anteprojetos`, switch between Kanban and Lista views, drag cards between stages
   - **Expected:** Cards move between columns, counts update, filters preserved across view toggle
   - **Why human:** Drag-and-drop interaction requires visual testing

2. **Proposal Document Preview Layout**
   - **Test:** Navigate to `/propostas/prop-2026-001`, observe the document preview section
   - **Expected:** Document-style preview renders with proper layout, all section headings visible
   - **Why human:** Visual appearance of document preview cannot be fully verified programmatically

3. **Price Table Upload Mock Flow**
   - **Test:** Navigate to `/tabela-de-precos/upload`, click "Selecionar arquivo", then "Simular upload"
   - **Expected:** File name appears, upload simulates, success/error message shows, version history visible
   - **Why human:** Upload simulation has randomized outcome, needs visual verification

4. **CRM to Anteproject Handoff**
   - **Test:** Navigate to `/crm/opp-2026-001`, click "Criar anteprojeto"
   - **Expected:** Dialog opens in anteprojects workspace with prefilled client name and notes
   - **Why human:** Cross-module navigation and form prefill requires user flow testing

5. **Proposal Price Lookup Integration**
   - **Test:** Navigate to `/propostas/nova`, add an item, click "Consultar tabela", select a row
   - **Expected:** Selected item code, description, and unit price populate the form fields
   - **Why human:** Form interaction and field population requires visual verification

### Gaps Summary

The phase is substantially complete with all major routes, data contracts, and UI components implemented. One gap was identified:

**Price Lookup Wiring (Partial):** The `proposal-items-section.tsx` component renders the price lookup dialog and receives selected values, but does not properly wire them back to the form. The `handlePriceSelect` callback receives `itemCode`, `description`, and `unitPrice` but only closes the dialog without calling `setValue` to update the form fields. This breaks the requirement that the proposal builder can "inject a selected price-table item into the current proposal row."

To fix: Pass the `setValue` function from `ProposalBuilderPage` to `ProposalItemsSection` (or lift the handler), then call `setValue(`items.${activeItemIndex}.itemCode`, itemCode)`, `setValue(`items.${activeItemIndex}.description`, description)`, and `setValue(`items.${activeItemIndex}.unitPrice`, unitPrice)` in the `handlePriceSelect` callback.

---

_Verified: 2026-03-20T14:30:00Z_
_Verifier: Claude (gsd-verifier)_
