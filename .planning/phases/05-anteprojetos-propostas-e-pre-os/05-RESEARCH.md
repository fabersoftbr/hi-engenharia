# Phase 5: Anteprojetos, Propostas e Preços - Research

**Researched:** 2026-03-20
**Status:** Complete
**Scope:** ANT-01, ANT-02, PIPE-02, PROP-01, PROP-02, PROP-03, PROP-04, PREC-01, PREC-02, PREC-03

## Goal Recap

Phase 5 must replace three placeholder modules with one connected commercial-to-technical flow:

- an anteprojetos workspace with queue, pipeline, and detail views
- a proposal workspace with list, creation flow, detail/edit route, and document-style preview
- a price table workspace with filters, item detail, and a mock upload flow
- visible handoffs between CRM -> anteprojeto -> proposta without adding backend persistence or real automation

The product remains frontend-only. All stage changes, exports, uploads, and send actions stay simulated in local UI state.

## Current Baseline

The codebase already has the technical patterns Phase 5 should reuse, but the target modules themselves are still placeholders:

- `apps/web/app/(platform)/anteprojetos/page.tsx` still renders `ModulePlaceholderPage`.
- `apps/web/app/(platform)/propostas/page.tsx` still renders `ModulePlaceholderPage`.
- `apps/web/app/(platform)/tabela-de-precos/page.tsx` still renders `ModulePlaceholderPage`.
- `apps/web/lib/platform-config.ts` already owns the stable module routes and profile visibility:
  - `/anteprojetos` -> `admin`, `operations`
  - `/propostas` -> `admin`, `commercial`
  - `/tabela-de-precos` -> `admin`, `commercial`
- `apps/web/components/platform/app-breadcrumbs.tsx` only has explicit nested-route handling for CRM detail, so Phase 5 will need broader breadcrumb support for anteprojeto detail, proposta detail/create, and tabela upload routes.
- The orçamento module already proves the form and list patterns Phase 5 should reuse:
  - `apps/web/components/platform/budget-requests/budget-requests-list-page.tsx`
  - `apps/web/components/platform/budget-requests/budget-request-form.tsx`
  - `apps/web/app/(platform)/orcamentos/[requestId]/page.tsx`
- The CRM module is already implemented and provides the exact adjacent patterns Phase 5 depends on:
  - `apps/web/lib/crm-data.ts`
  - `apps/web/components/platform/crm/crm-workspace-page.tsx`
  - `apps/web/components/platform/crm/crm-pipeline-board.tsx`
  - `apps/web/components/platform/crm/new-opportunity-dialog.tsx`
  - `apps/web/app/(platform)/crm/[opportunityId]/page.tsx`
- `apps/web/package.json` already includes `@hello-pangea/dnd`, `react-hook-form`, and `zod`, so Phase 5 does not need a new dependency decision for drag-and-drop or forms.

The biggest implication is that Phase 5 should extend established module patterns instead of inventing new architecture.

## External Guidance Used

The technical direction below uses current documentation and examples for:

- Next.js 16 App Router dynamic segments and loading patterns
- `@hello-pangea/dnd` board and multi-column drag-and-drop patterns

Key source URLs:

- https://github.com/vercel/next.js/blob/v16.0.3/docs/01-app/02-guides/migrating/app-router-migration.mdx
- https://github.com/vercel/next.js/blob/v16.0.3/docs/01-app/01-getting-started/04-linking-and-navigating.mdx
- https://context7.com/hello-pangea/dnd/llms.txt

Important notes from those sources:

- Next.js 16 App Router still models nested routes with filesystem folders, and dynamic detail pages continue to receive `params` as a `Promise`.
- Route-level `loading.tsx` remains the standard pattern when a nested page needs a loading skeleton or partial prefetch state.
- `@hello-pangea/dnd` still uses the same `DragDropContext`, `Droppable`, and `Draggable` primitives for Kanban-style multi-column boards.
- Horizontal droppable layouts and cross-column moves are first-class patterns in the current DnD documentation, which matches the anteprojetos pipeline requirement.

## Recommended Technical Direction

### 1. Keep all Phase 5 work under stable nested module routes

Do not introduce alternate roots like `/pipeline-anteprojetos` or `/gerador`.

Use this route structure:

- `apps/web/app/(platform)/anteprojetos/page.tsx` -> shared anteprojetos workspace
- `apps/web/app/(platform)/anteprojetos/[anteprojectId]/page.tsx` -> anteprojeto detail
- `apps/web/app/(platform)/propostas/page.tsx` -> proposals list workspace
- `apps/web/app/(platform)/propostas/nova/page.tsx` -> new proposal flow
- `apps/web/app/(platform)/propostas/[proposalId]/page.tsx` -> proposal detail/edit/preview
- `apps/web/app/(platform)/tabela-de-precos/page.tsx` -> filterable price table
- `apps/web/app/(platform)/tabela-de-precos/upload/page.tsx` -> mock upload flow

This preserves the existing navigation model and keeps breadcrumbs tractable.

### 2. Create one shared mock contract per module and connect them by seeded IDs

Phase 5 should not scatter status metadata, seed records, and lookup helpers across multiple components.

Create three module contracts:

- `apps/web/lib/anteprojects-data.ts`
- `apps/web/lib/proposals-data.ts`
- `apps/web/lib/price-table-data.ts`

Recommended contents:

- `anteprojects-data.ts`
  - stage union and ordered stage metadata for the six locked anteprojeto stages
  - priority or pending flags needed for the queue cards
  - responsible people metadata or mapped CRM owner reuse
  - `AnteprojectRecord` with origin CRM ID, optional proposal ID, attachments, and timeline entries
  - helpers like `getAnteprojects()`, `getAnteprojectById()`, `filterAnteprojects(...)`, `groupAnteprojectsByStage(...)`
- `proposals-data.ts`
  - proposal status union, visible labels, section defaults, and preview helpers
  - `ProposalRecord`, `ProposalOrigin`, `ProposalItem`, and `ProposalTotals` types
  - seeded proposals tied to CRM and anteprojeto IDs
  - helper functions for list filtering, status options, preview summary, and creating a draft proposal shape
- `price-table-data.ts`
  - normalized base items plus region and consumption metadata
  - price matrix or helper-driven row generation so the code does not hardcode hundreds of flattened combinations
  - helpers like `getPriceTableRows(filters)`, `getPriceItemById()`, `getRegionOptions()`, `getConsumptionBandOptions()`

The key planning rule is cross-module traceability: CRM IDs, anteprojeto IDs, and proposal IDs must line up so handoff links and badges stay believable.

### 3. Reuse the CRM drag-and-drop implementation shape instead of inventing a second board system

Phase 4 already established the DnD pattern in:

- `apps/web/components/platform/crm/crm-workspace-page.tsx`
- `apps/web/components/platform/crm/crm-pipeline-board.tsx`

Phase 5 should copy that architecture, not abstract it into `@workspace/ui`.

Recommended anteprojetos structure:

- one client workspace component that owns filters, view mode, and seeded records
- one board component that receives filtered records and `onDragEnd`
- one column component and one card component local to `apps/web/components/platform/anteprojects`

Keep the column order fixed and only move cards between stages. The business workflow is fixed; only card movement needs to be simulated.

### 4. Build `/anteprojetos` as one client workspace with shared filters and dual views

The safest architecture matches CRM:

- server route entry `apps/web/app/(platform)/anteprojetos/page.tsx`
- one client workspace component such as `apps/web/components/platform/anteprojects/anteprojects-workspace-page.tsx`

That client workspace should own:

- view state (`kanban` vs `lista`)
- active filters
- seeded anteprojeto records in local state
- row/card navigation behavior

The shared toolbar, list page, and pipeline board must all derive from the same filtered dataset so filters and counts never drift between views.

### 5. Use `react-hook-form` plus `zod` for the proposal builder, with one draft object powering both form and preview

The orçamento module already proves the repo pattern for input-heavy flows:

- `apps/web/components/platform/budget-requests/budget-request-form.tsx`
- `apps/web/lib/budget-request-form.ts`

Phase 5 should reuse that stack for `/propostas/nova` and `/propostas/[proposalId]`.

Recommended form strategy:

- one `proposal-form.ts` schema/default-values file in `apps/web/lib`
- one `ProposalFormValues` type shared by builder and preview helpers
- `react-hook-form` with `zodResolver`
- preview derived from watched values, not a second mutable state tree

This is the most important planning decision for the proposal flow. If the preview owns separate state, the form and document can drift immediately.

### 6. Treat the proposal builder as a full page with helper dialogs, not as a wizard

The phase context explicitly locks the builder to a single page with sections.

Recommended composition:

- full page for creation and editing
- origin-selection dialog on entry
- lookup dialogs for price table search and item detail
- no stepper and no drawer-based major editing flow

Desktop should use a split editor/preview layout. Mobile should stack the editor before the preview while preserving the same section order and action labels.

### 7. Keep proposal list, detail, and export/send status logic in the proposals module

The roadmap split between builder and preview does not justify separate modules or state stores.

Recommended implementation boundary:

- `/propostas` owns the DataTable list and filter toolbar
- `/propostas/nova` initializes a new proposal draft from client or opportunity origin
- `/propostas/[proposalId]` owns edit, preview, status badge, export, and send actions

Export and send remain local-state UI effects only:

- `Exportar PDF` -> toast plus simulated download affordance
- `Enviar proposta` -> local status change to `Enviada` plus toast

Do not introduce actual file generation or API-style abstractions.

### 8. Use breadcrumb rules that cover all nested Phase 5 routes in one pass

`AppBreadcrumbs` already special-cases only CRM detail. Phase 5 should extend breadcrumb resolution generically enough for:

- `/anteprojetos/[id]` -> `Anteprojetos > Detalhe`
- `/propostas/nova` -> `Gerador de Propostas > Nova proposta`
- `/propostas/[id]` -> `Gerador de Propostas > Detalhe`
- `/tabela-de-precos/upload` -> `Tabela de Precos > Upload`

Do not leave nested Phase 5 pages with the top-level breadcrumb only.

### 9. Normalize price-table data before rendering filtered rows

The context wants 10-15 items across five regions and five consumption bands. A fully flattened seed array would be noisy and hard to maintain.

Recommended model:

- define base catalog items once
- define region options and consumption-band options once
- attach a nested `pricingByRegionAndBand` map or derive value helpers
- flatten only the currently filtered rows for the table view

This keeps the code readable and makes the detail modal far easier to assemble.

## Risks And Planning Implications

### Proposal preview drift is the main product risk

Impact:

- the builder and the document can show different values if both mutate separately

Planning response:

- one form state source of truth
- preview derived from watched form values and seeded helper functions

### Cross-module handoffs can become fake in the wrong way

Impact:

- links or badges can exist visually but point to unrelated IDs, which weakens the flow story

Planning response:

- tie CRM, anteprojeto, and proposal seeds together explicitly in the data contracts
- define exact origin and target fields before building the pages

### Anteprojetos workspace can duplicate CRM too literally

Impact:

- the module may feel cloned instead of technically distinct

Planning response:

- reuse CRM architecture, but swap the card density, stage labels, and detail emphasis to center technical review instead of sales negotiation

### Price data can overwhelm mobile quickly

Impact:

- table-heavy layouts become unreadable on small screens

Planning response:

- keep the desktop table for wide screens
- switch to one result card per item on mobile
- keep filter labels and detail modals consistent across both views

## Plan Shape Recommendation

The roadmap's four-plan split is still correct, and the safest execution order is sequential because each step adds shared module structure that the next step depends on:

- Wave 1: `05-01`
- Wave 2: `05-02`
- Wave 3: `05-03`
- Wave 4: `05-04`

Recommended responsibilities:

- `05-01` establishes the anteprojetos data contract, replaces the anteprojetos placeholder, wires the shared workspace, list/detail route, and breadcrumb handling
- `05-02` adds the anteprojetos pipeline interactions, CRM handoff links, proposal badges, and local stage changes on top of the Wave 1 foundation
- `05-03` establishes proposal and price-table data contracts, replaces the `propostas` and `tabela-de-precos` placeholders, and delivers the builder flow with price lookup integration
- `05-04` completes the document-style preview, list/detail polish, export/send actions, and upload flow using the data and route foundations created in Wave 3

This sequencing keeps module contracts and route scaffolding ahead of the most interaction-heavy work.

## Validation Architecture

Phase 5 can use the same validation model as earlier frontend phases: static quality gates plus manual browser verification of the new UI flows.

Recommended validation contract:

- quick command:
  `pnpm --filter web lint && pnpm --filter web typecheck`
- full suite command:
  `pnpm lint && pnpm typecheck && pnpm build`
- manual checks:
  - `/anteprojetos` opens in Kanban by default and preserves filters when switching to `Lista`
  - dragging an anteprojeto card updates the target column visually and keeps the change only for the current session
  - `/anteprojetos/[id]` shows origin CRM link, attachments, and proposal handoff action in the locked layout order
  - `/propostas/nova` starts from the origin-selection flow, updates the preview as fields change, and can pull suggested values from `Consultar tabela`
  - `/propostas/[id]` can change the visible status to `Enviada` and trigger the simulated export toast without real persistence
  - `/tabela-de-precos` filters by region and faixa de consumo and swaps to mobile cards on small screens
  - `/tabela-de-precos/upload` shows mock success/error feedback plus version history without leaving the frontend-only scope

No additional test runner is required for this phase.

## Research Outcome

Phase 5 should proceed with:

- stable nested routes under the existing three module roots
- one shared mock contract per module, with explicit cross-module seeded IDs
- CRM-style workspace architecture for anteprojetos
- `react-hook-form` plus `zod` for proposal creation and editing
- a normalized price-table model that flattens rows through helpers instead of hand-maintained duplication
- sequential waves that keep route and data foundations ahead of preview and handoff-heavy work

## RESEARCH COMPLETE

- Route structure resolved
- Data contract shape resolved
- Drag-and-drop reuse strategy resolved
- Form/preview state strategy resolved
- Price-table modeling approach resolved
- Wave split resolved
- Validation strategy resolved
