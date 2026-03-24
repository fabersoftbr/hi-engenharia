# Phase 4: CRM e Pipeline Comercial - Research

**Researched:** 2026-03-20
**Status:** Complete
**Scope:** CRM-01, CRM-02, CRM-03, PIPE-01

## Goal Recap

Phase 4 must replace the `/crm` placeholder with the full commercial CRM workspace:

- a shared CRM screen with one filter bar and a Kanban/list toggle
- a default Kanban view with 10 locked commercial stages and visual drag and drop
- a list view that exposes more detail for the same opportunities
- a dedicated opportunity detail route with stage history, responsible people, and an origin link back to orçamento

The product remains frontend-only. No backend persistence, no CRM API integration, and no real workflow automation should be introduced.

## Current Baseline

The codebase already contains the UI building blocks this phase needs, but the CRM module itself is still a placeholder:

- `apps/web/app/(platform)/crm/page.tsx` still renders `ModulePlaceholderPage`.
- `apps/web/lib/platform-config.ts` already owns the stable `/crm` module route and limits visibility to `admin` and `commercial`.
- `apps/web/components/platform/app-breadcrumbs.tsx` currently derives breadcrumbs only from the top-level module route, so a nested CRM detail page will need an explicit detail label path if the UX should show more than `CRM > CRM`.
- `packages/ui/src/components/` already includes `data-table`, `table`, `select`, `dialog`, `avatar`, `badge`, `card`, and `separator`, so Phase 4 does not need new shared table or form primitives.
- The orçamento module already demonstrates the phase-to-phase frontend pattern:
  - module-level mock contract in `apps/web/lib/budget-requests-data.ts`
  - list page composition in `apps/web/components/platform/budget-requests/budget-requests-list-page.tsx`
  - detail layout in `apps/web/components/platform/budget-requests/budget-request-detail-page.tsx`
  - lightweight confirmation dialog in `apps/web/components/platform/budget-requests/budget-request-submission-dialog.tsx`
- No drag-and-drop dependency is installed yet in the workspace.

That last gap matters because the phase context explicitly requires cards to move across 10 stages in local React state.

## External Guidance Used

The technical direction below uses current documentation and package metadata for:

- Next.js 16 App Router nested routes and dynamic segments
- `@hello-pangea/dnd` React 19 compatibility and multi-list drag-and-drop patterns

Key source URLs:

- https://github.com/vercel/next.js/blob/v16.0.3/docs/01-app/01-getting-started/03-layouts-and-pages.mdx
- https://github.com/vercel/next.js/blob/v16.0.3/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.mdx
- https://raw.githubusercontent.com/hello-pangea/dnd/main/package.json
- https://github.com/hello-pangea/dnd

Important notes from those sources:

- Next.js 16 App Router still models nested routes with filesystem folders, and dynamic segments use bracket folders like `[opportunityId]`.
- In Next.js 16 page components, `params` is exposed as a `Promise`, so nested CRM detail routes should match the same pattern already used by `/orcamentos/[requestId]`.
- `@hello-pangea/dnd` currently declares `react` and `react-dom` peer support for `^18.0.0 || ^19.0.0`, and the project itself includes React 19 test scripts.
- `@hello-pangea/dnd` keeps the highest-level Kanban API for multiple droppable columns: `DragDropContext`, `Droppable`, and `Draggable`.

## Recommended Technical Direction

### 1. Keep CRM under stable nested App Router paths

Do not introduce alternate CRM routes such as `/pipeline`, `/crm/lista`, or `/crm/oportunidades`.

Use this route structure:

- `apps/web/app/(platform)/crm/page.tsx` -> shared CRM workspace with filters, toggle, list view, pipeline view, and `Nova oportunidade`
- `apps/web/app/(platform)/crm/[opportunityId]/page.tsx` -> opportunity detail

Do **not** create `/crm/nova` for this phase. The context only needs a lightweight simulated entry point, and a modal/dialog keeps the flow inside the CRM workspace instead of fragmenting navigation with another route.

### 2. Create one shared CRM mock contract before building screens

Phase 4 should not spread stage metadata, owners, priorities, totals, and history records across multiple components.

Create one module contract, for example:

- `apps/web/lib/crm-data.ts`

Recommended contents:

- `CrmStageId` union for the 10 locked stages
- `CrmPriority` union for `alta`, `media`, `baixa`
- `CrmOwner` type for responsible people
- `CrmHistoryEntry` type for the detail timeline
- `CrmOpportunityRecord` type with id, title, company, stage, priority, owner, value, createdAt, lastContactAt, originBudgetRequestId, and history
- ordered stage metadata with label, short description, and helper styling hooks
- seeded opportunities spanning all 10 stages
- pure helpers like `getCrmOpportunities()`, `getCrmOpportunityById(id)`, `getCrmStageOptions()`, `filterCrmOpportunities(...)`, and `groupCrmOpportunitiesByStage(...)`

The list view, pipeline board, new-opportunity modal, and detail page should all consume this single source of truth.

### 3. Use `@hello-pangea/dnd` in `apps/web`, not in `@workspace/ui`

The project has no existing drag-and-drop package. For this phase, `@hello-pangea/dnd` is the safest fit because:

- it explicitly supports React 19 in peer dependencies
- it is already shaped around Kanban-style multiple droppable lists
- the CRM board is module-specific behavior, not a reusable foundation primitive

Dependency placement:

- add `@hello-pangea/dnd` to `apps/web`
- keep DnD components local to `apps/web/components/platform/crm`

Do not add drag-and-drop abstractions to `packages/ui` yet. The board behavior is too phase-specific to justify a shared primitive.

### 4. Build the `/crm` screen around one client workspace component

The cleanest architecture for shared filters and view switching is:

- server route entry `apps/web/app/(platform)/crm/page.tsx`
- one client workspace component such as `apps/web/components/platform/crm/crm-workspace-page.tsx`

That client workspace should own:

- current view state (`kanban` vs `lista`)
- current filters (responsável, prioridade, busca)
- current seeded opportunities state
- modal open state for `Nova oportunidade`

That parent then renders:

- a shared toolbar component
- a segmented view toggle
- either the Kanban board or the list table, both derived from the same filtered dataset

This prevents filter drift between the two views and keeps the Kanban/list toggle cheap to reason about.

### 5. Keep the column order fixed; only cards move

The context locks the 10 commercial stages, but it does **not** require column reordering.

The board should therefore:

- keep a fixed horizontal stage order from `Lead` through `Fechado`
- allow only card movement between columns
- update local state in `onDragEnd`
- recompute column counts and mocked total values from the latest state

This is simpler than a full reorderable board, matches the business expectation of a fixed commercial funnel, and avoids unnecessary write surface.

### 6. Reuse existing list/detail patterns from the orçamento module

Phase 3 already solved the same class of problems that CRM now needs:

- `DataTable` integration with whole-row navigation
- a two-column detail layout
- seeded module data contracts
- `Dialog` for a lightweight simulated flow

Planner and executor should reuse those patterns directly:

- list table pattern from `budget-requests-list-page.tsx`
- detail page structure from `budget-request-detail-page.tsx`
- modal action structure from `budget-request-submission-dialog.tsx`

The CRM module should feel like the commercial next step after `/orcamentos`, not a separate design system.

### 7. Choose a compact dialog for `Nova oportunidade`

The phase context leaves this to discretion. A dialog is the better choice than a separate page because:

- new opportunity creation is not itself a roadmap requirement
- the CRM page already needs to remain the visual home for list and Kanban interaction
- the repo already has a working mock-only dialog pattern

Recommended dialog contents:

- nome da oportunidade
- empresa/cliente
- responsável
- prioridade
- valor estimado

On submit, append a new local-state opportunity seeded into the `Lead` stage and close the dialog. Do not invent persistence or optimistic server mutations.

### 8. Make the detail route server-entered and client-managed

Keep the file route itself aligned with Next.js 16:

- `apps/web/app/(platform)/crm/[opportunityId]/page.tsx`
- `params: Promise<{ opportunityId: string }>`

Then hand the record into a client detail component that owns local mutation for:

- current selected stage
- appended history entries when `Mudar etapa` is used

This matches the Next 16 route contract while keeping the fake CRM interactions local and interactive.

### 9. Breadcrumb behavior needs an explicit decision during execution

`AppBreadcrumbs` currently only knows the top-level module. If left unchanged, `/crm/[id]` will not show a meaningful detail breadcrumb label.

Recommended implementation:

- extend breadcrumb labeling so nested CRM detail routes show `CRM > Detalhe`
- keep the solution generic enough that later phases can reuse the nested-route breadcrumb rule

Do not leave this to the default top-level-only behavior.

## Risks And Planning Implications

### Drag-and-drop complexity is the main implementation risk

Impact:

- Kanban interactions can easily sprawl into unnecessary abstractions or state bugs

Planning response:

- keep the column order fixed
- keep one board state shape in the CRM workspace
- keep DnD dependency app-local
- defer keyboard polish and persistence to later phases unless they are trivial

### Shared filter state can drift between list and Kanban

Impact:

- the same opportunity set could render differently between views if filters are split across components

Planning response:

- the parent CRM workspace must own filters and pass already-filtered data into both views

### Detail page and board can diverge on stage language

Impact:

- stage labels, badge styling, and history text can fall out of sync

Planning response:

- all stage metadata must live in `crm-data.ts`
- the board, list badges, stage select, and history timeline must all consume that metadata

## Plan Shape Recommendation

The roadmap's three-plan split is still correct, and the safest execution order is sequential:

- Wave 1: `04-01`
- Wave 2: `04-02`
- Wave 3: `04-03`

Recommended responsibilities:

- `04-01` establishes the shared CRM data contract, replaces the `/crm` placeholder, wires the filter bar and view toggle, and delivers the list view foundation
- `04-02` builds the detail route, breadcrumb handling, stage history rendering, and the origin orçamento link
- `04-03` adds the Kanban board, drag-and-drop state updates, per-column totals, and the `Nova oportunidade` dialog flow

This order keeps the data contract and route foundation ahead of the most interaction-heavy part of the phase.

## Validation Architecture

Phase 4 can use the same validation model as Phase 3: static quality gates plus manual browser verification of the new UI flows.

Recommended validation contract:

- quick command:
  `pnpm --filter web lint && pnpm --filter web typecheck`
- full suite command:
  `pnpm lint && pnpm typecheck && pnpm build`
- manual checks:
  - `/crm` opens in Kanban by default and shows all 10 stages
  - shared filters affect both Kanban and list views
  - dragging a card updates the destination column count and mocked total
  - clicking a row or card opens `/crm/[opportunityId]`
  - `/crm/[opportunityId]` updates stage history locally and links back to `/orcamentos/[id]`

No extra test framework is required for this phase.

## Research Outcome

Phase 4 should proceed with:

- stable nested routes under `/crm` and `/crm/[opportunityId]`
- one shared `crm-data.ts` contract for stages, priorities, owners, opportunities, and history
- a single client workspace page that owns filters, view mode, modal state, and seeded CRM data
- `@hello-pangea/dnd` in `apps/web` for the fixed-order Kanban board
- a lightweight `Dialog` for `Nova oportunidade`
- sequential plan waves that keep route/data foundations ahead of DnD-heavy board work

## RESEARCH COMPLETE

- Route structure resolved
- Data contract shape resolved
- Drag-and-drop dependency resolved
- Modal vs route decision resolved
- Wave split resolved
- Validation strategy resolved
