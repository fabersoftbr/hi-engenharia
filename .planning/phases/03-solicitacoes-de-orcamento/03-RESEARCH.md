# Phase 3: Solicitações de Orçamento - Research

**Researched:** 2026-03-20
**Status:** Complete
**Scope:** ORC-01, ORC-02, ORC-03, ORC-04

## Goal Recap

Phase 3 must replace the `/orcamentos` placeholder with the first complete commercial intake flow in the product:

- a request list with filters, statuses, and empty states
- a dedicated page to create a new request with simulated attachments
- a dedicated detail page with client data, attachments, and a status timeline
- a confirmation modal that closes the creation flow without introducing real persistence

The product remains frontend-only. No API calls, uploads, backend storage, or real workflow transitions should be introduced.

## Current Baseline

The repository already provides the shell and dashboard foundation, but the orçamento module is still empty:

- `apps/web/app/(platform)/orcamentos/page.tsx` still renders `ModulePlaceholderPage`.
- `apps/web/lib/platform-config.ts` already owns the stable `/orcamentos` route, module label, breadcrumb label, and profile visibility.
- `apps/web/components/platform/platform-shell-provider.tsx` already exposes `activeProfile`, which the list and detail screens can reuse for profile-aware behavior when needed.
- `packages/ui/src/styles/globals.css` already defines the semantic tokens, straight-edged visual language, and font plumbing used by the rest of the product.
- `packages/ui/src/components/` currently has the shared primitives for buttons, badges, inputs, labels, cards, breadcrumbs, sidebar, separators, sheets, tooltips, and skeletons.
- Shared `DataTable`, `Table`, `Dialog`, `Textarea`, and `Select` components do not exist yet in `packages/ui/src/components`.
- `@tanstack/react-table`, `react-hook-form`, and `@hookform/resolvers` are not present as workspace dependencies yet.

That gap matters because the locked phase context explicitly expects a tabular list, inline form validation, and dialog-driven confirmation/status actions.

## External Guidance Used

The planning direction below uses current documentation for:

- Next.js 16 App Router nested routes and dynamic route segments
- shadcn/ui data-table guidance, including the need for `table` plus `@tanstack/react-table`
- shadcn/ui form guidance around `react-hook-form` + Zod-driven validation
- shadcn/ui dialog composition for confirm/status interactions

Key source URLs:

- https://github.com/vercel/next.js/blob/v16.0.3/docs/01-app/01-getting-started/03-layouts-and-pages.mdx
- https://github.com/vercel/next.js/blob/v16.0.3/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.mdx
- https://github.com/shadcn/ui/blob/main/apps/v4/content/docs/components/radix/data-table.mdx
- https://github.com/shadcn/ui/blob/main/apps/v4/content/docs/forms/react-hook-form.mdx
- https://github.com/shadcn/ui/blob/main/skills/shadcn/customization.md

## Recommended Technical Direction

### 1. Keep `/orcamentos` Stable And Add Nested Routes Under It

Do not introduce a second commercial-entry route such as `/solicitacoes` or `/orcamentos/lista`.

The final route structure should stay under the already registered module path:

- `apps/web/app/(platform)/orcamentos/page.tsx` -> request list
- `apps/web/app/(platform)/orcamentos/nova/page.tsx` -> new request form
- `apps/web/app/(platform)/orcamentos/[requestId]/page.tsx` -> request detail

This matches App Router route-segment guidance and avoids route churn in `platform-config.ts`, the sidebar, and the dashboard quick actions.

### 2. Create One Shared Mock Contract For The Whole Module

Phase 3 should not scatter request arrays, statuses, attachment metadata, and default form data across multiple pages.

Create one module-level data contract, for example:

- `apps/web/lib/orcamentos-data.ts`

Recommended contents:

- `BudgetRequestStatus` union: `novo`, `em-analise`, `aprovado`, `recusado`
- `BudgetRequestAttachment` interface
- `BudgetRequestRecord` interface with id, client data, city, date, status, notes, consumption, and attachments
- seeded request collection used by the list and detail page
- `getBudgetRequests()`
- `getBudgetRequestById(requestId)`
- `getBudgetRequestStatusOptions()`
- one deterministic preview record that the confirmation modal can link to without requiring real form persistence

This keeps ORC-01, ORC-03, and ORC-04 tied to the same source of truth.

### 3. Fill The Shared UI Primitive Gaps With Official shadcn Components

The repo already has a shared `@workspace/ui` package, so Phase 3 should extend that package instead of handcrafting local one-off equivalents.

Recommended additions:

- `packages/ui/src/components/table.tsx`
- `packages/ui/src/components/data-table.tsx`
- `packages/ui/src/components/textarea.tsx`
- `packages/ui/src/components/select.tsx`
- `packages/ui/src/components/dialog.tsx`

Dependency implications:

- add `@tanstack/react-table` where `data-table.tsx` lives, which should be `packages/ui`
- keep `react-hook-form` and `@hookform/resolvers` app-owned in `apps/web`, because the page/form logic will use them directly
- reuse existing `zod` instead of inventing a custom validation shape

This approach satisfies the repo rule to prefer shadcn workflow while avoiding premature RHF-coupled abstractions inside the shared UI package.

### 4. Listing Strategy Should Use A Shared DataTable Wrapper

The locked context chose a table layout with filters and pagination. Since `DataTable` does not exist yet, the safest plan is:

- add official `table` primitives to `packages/ui`
- implement a small reusable `DataTable` wrapper in `packages/ui/src/components/data-table.tsx`
- keep the orçamento list page responsible for its filter bar, empty states, and responsive column decisions

Required list behaviors:

- columns: ID, Cliente, Telefone, Cidade, Status, Data
- external filter bar with status select, search input, and `Pendentes` toggle
- full-row navigation to the request detail page
- empty state and no-results variant from the phase context

Do not introduce inline row actions. The row itself is the interaction target.

### 5. Form Strategy Should Stay Single-Page And Validation-First

The context explicitly rejects a wizard. The form should therefore live on `/orcamentos/nova` as one page with three visual sections:

1. Dados do cliente
2. Consumo/Projeto
3. Anexos

Recommended implementation shape:

- page entrypoint at `apps/web/app/(platform)/orcamentos/nova/page.tsx`
- dedicated form component under `apps/web/components/platform/orcamentos/`
- `react-hook-form` + Zod in `apps/web` for predictable inline validation
- existing `Input` plus new shared `Textarea` and `Select`
- simulated attachments managed in local component state, rendered as a visible list with text actions only

This satisfies the inline-error requirement without adding backend concerns.

### 6. Detail View And Confirmation Need To Share The Same Status Language

The detail screen should render the existing seeded request data in the exact desktop/mobile order chosen in `03-CONTEXT.md`.

Recommended detail split:

- `apps/web/components/platform/orcamentos/orcamento-detail-page.tsx`
- `apps/web/components/platform/orcamentos/orcamento-status-timeline.tsx`
- `apps/web/components/platform/orcamentos/orcamento-status-dialog.tsx`

The same status metadata from `orcamentos-data.ts` should drive:

- list badges
- detail timeline labels
- dialog options

For ORC-04, the confirmation modal should be a dialog opened after simulated submit on `/orcamentos/nova`, with the exact next actions already locked in context:

- `Ver solicitacao`
- `Nova solicitacao`
- `Voltar para a listagem`

Because the app stays mock-only, the simplest coherent flow is to link `Ver solicitacao` to a deterministic preview record from the shared mock contract rather than attempt true client-side persistence.

### 7. Keep Profile Restrictions Consistent With The Existing Shell

`platform-config.ts` already limits `/orcamentos` visibility to `admin`, `commercial`, and `partner`.

Phase 3 should reuse that behavior instead of re-implementing access logic:

- route files continue to live under the shared `(platform)` shell
- unauthorized profiles are still handled by the existing sidebar/module visibility system
- any profile-aware copy or seeded mock subsets should derive from existing profile keys, not new enums

### 8. UI Contract Is Already Approved And Must Be Treated As Locked

`03-UI-SPEC.md` is now present and approved. Plans should treat the following as locked:

- Raleway-driven typography with 4 sizes and 2 weights
- 4/8/16/24/32/48/64 spacing scale
- accent color reserved only for the primary CTA, active step, selected filter state, and selected row emphasis
- text-only visible actions, never icon-only controls
- list / form / detail focal points as specified in the UI contract

Do not reopen those design questions in plan tasks.

## Risks And Planning Implications

### Missing Shared Primitives Are The Main Technical Risk

Impact:

- the list, form, and dialog flows depend on components the workspace does not have yet

Planning response:

- make the first plan establish the shared data-table baseline and module mock contract
- let the form/detail plans add only the missing primitives they actually consume

### Route Proliferation Would Create Dead-End UX

Impact:

- inventing alternative paths or temporary pages would break the dashboard quick actions and future CRM/proposal handoffs

Planning response:

- every plan must keep work under `/orcamentos`, `/orcamentos/nova`, and `/orcamentos/[requestId]`

### Form And Detail Can Drift If They Use Different Status/Attachment Models

Impact:

- status labels, attachment actions, or client field naming could diverge across screens

Planning response:

- one shared `orcamentos-data.ts` contract must feed every screen
- one status-metadata helper must feed badges, timeline, and status dialog copy

## Plan Shape Recommendation

The roadmap's three-plan split is still correct, but the execution waves should be:

- Wave 1: `03-01`
- Wave 2: `03-02`
- Wave 3: `03-03`

Recommended responsibilities:

- `03-01` establishes the shared mock contract, shared table primitives, list route, filters, and empty/no-results states
- `03-02` builds the single-page creation flow on `/orcamentos/nova` with inline validation and simulated attachments
- `03-03` delivers the detail page, status dialog, and the confirmation modal that connects back to the list/detail flow

This avoids write-set collisions and respects the dependency from the confirmation flow back to the form created in `03-02`.

## Validation Architecture

Phase 3 can use the same validation model as earlier phases: static quality gates plus manual browser verification of the new UI flows.

Recommended validation contract:

- quick command:
  `pnpm --filter web lint && pnpm --filter web typecheck`
- full suite command:
  `pnpm lint && pnpm typecheck && pnpm build`
- manual checks:
  - `/orcamentos` shows the list, filters, and both empty-state variants
  - clicking a request row opens `/orcamentos/[requestId]`
  - `/orcamentos/nova` validates required fields inline and shows the attachment list interactions
  - simulated submit opens the confirmation dialog with the three locked next actions
  - the detail page stacks correctly on mobile and keeps status/actions ahead of client metadata

No extra test framework is required for this phase. The repo still relies on lint, typecheck, build, and manual UI verification.

## Research Outcome

Phase 3 should proceed with:

- stable nested App Router paths under `/orcamentos`
- one shared mock data contract for list, detail, and confirmation
- official shadcn primitive additions in `packages/ui` instead of custom local clones
- `@tanstack/react-table` for the shared data-table wrapper
- `react-hook-form` + Zod inside `apps/web` for the creation flow
- a three-wave plan split that keeps route/data foundations ahead of form and detail work

## RESEARCH COMPLETE

- Route structure resolved
- Shared data contract resolved
- Component/dependency gaps resolved
- Wave split resolved
- Validation strategy resolved
