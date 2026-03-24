# Phase 6: Projetos e Pipeline de Obras - Research

**Researched:** 2026-03-20
**Status:** Complete
**Scope:** PROJ-01, PROJ-02, PROJ-03, PIPE-03

## Goal Recap

Phase 6 must replace the remaining `Projetos` and `Obras` placeholders with one connected execution workspace:

- a filterable projetos list at `/projetos`
- a project detail route with summary, linked proposal/anteprojeto context, related files, and current execution state
- a dedicated obra acompanhamento route with marcos, timeline, and a Gantt-style schedule
- an obras pipeline board at `/obras` with 11 fixed execution stages and local drag-and-drop

The product remains frontend-only. No backend persistence, no upload API, and no real workflow automation should be introduced.

## Current Baseline

The repo already has most of the patterns Phase 6 should reuse, but the target modules themselves are still placeholders:

- `apps/web/app/(platform)/projetos/page.tsx` still renders `ModulePlaceholderPage`.
- `apps/web/app/(platform)/obras/page.tsx` still renders `ModulePlaceholderPage`.
- `apps/web/lib/platform-config.ts` already owns the stable `/projetos` and `/obras` module routes and their profile visibility, so Phase 6 should preserve those route roots instead of creating alternates.
- `apps/web/components/platform/app-breadcrumbs.tsx` already special-cases nested routes for CRM, anteprojetos, propostas, and tabela de preços, but it does not yet recognize nested `projetos` or `obras` detail paths.
- `apps/web/lib/crm-data.ts` and `apps/web/lib/anteprojects-data.ts` already establish the project’s mock-contract pattern: typed unions, stage metadata, owners, seeded records, and helper functions live together in one module file.
- `apps/web/components/platform/crm/crm-pipeline-board.tsx` and `apps/web/components/platform/anteprojects/anteproject-pipeline-board.tsx` already prove the current app-local `@hello-pangea/dnd` architecture for fixed-order Kanban boards.
- `apps/web/components/platform/crm/crm-opportunity-detail-page.tsx` and `apps/web/components/platform/anteprojects/anteproject-detail-page.tsx` already prove the preferred two-column detail layout, badge/timeline composition, and local-only mutation pattern.
- `apps/web/package.json` already includes `@hello-pangea/dnd`, `@tanstack/react-table`, React 19.2.4, and Next 16.1.6, so Phase 6 does not need a new drag-and-drop or table dependency decision.

The main planning implication is that Phase 6 should extend the existing CRM and anteprojetos architecture instead of inventing a new module structure.

## External Guidance Used

The technical direction below uses current documentation and examples for:

- Next.js 16 App Router route structure, dynamic params, and client navigation hooks
- `@hello-pangea/dnd` multi-column board structure and horizontal droppable patterns

Key source URLs:

- https://github.com/vercel/next.js/blob/v16.1.6/docs/01-app/02-guides/migrating/app-router-migration.mdx
- https://github.com/vercel/next.js/blob/v16.1.6/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.mdx
- https://context7.com/hello-pangea/dnd/llms.txt

Important notes from those sources:

- Next.js 16 App Router still models nested routes with filesystem folders, and dynamic route `params` are passed as a `Promise`.
- Client navigation hooks such as `useRouter`, `usePathname`, and `useSearchParams` must stay inside files marked with `"use client"`.
- A server page can remain the route entry and pass route data into a client workspace/detail component, which matches the existing repo pattern.
- `@hello-pangea/dnd` continues to use `DragDropContext`, `Droppable`, and `Draggable` for Kanban-style boards, with horizontal droppable layouts supported directly.

## Recommended Technical Direction

### 1. Keep all Phase 6 work under stable nested App Router paths

Do not introduce alternate roots like `/pipeline-obras`, `/execucao`, or `/projetos/lista`.

Use this route structure:

- `apps/web/app/(platform)/projetos/page.tsx` -> projetos workspace and list
- `apps/web/app/(platform)/projetos/[projectId]/page.tsx` -> project detail
- `apps/web/app/(platform)/projetos/[projectId]/obra/page.tsx` -> obra acompanhamento
- `apps/web/app/(platform)/obras/page.tsx` -> obras pipeline workspace
- optionally `apps/web/app/(platform)/obras/[projectId]/page.tsx` only if the implementation truly needs a second obras-native detail entry; otherwise keep `/projetos/[projectId]` as the canonical detail route

This preserves the existing navigation model already wired into `platform-config.ts`.

### 2. Create one shared projects contract before building screens

Phase 6 should not scatter project stages, marcos, attachments, linked proposal IDs, and helper logic across multiple components.

Create one module contract:

- `apps/web/lib/projects-data.ts`

Recommended contents:

- `ProjectType` union for `residencial`, `comercial`, `industrial`, `rural`, `condominio`
- `ProjectStatus` union for `contrato`, `em-andamento`, `concluido`, `pausado`, `cancelado`
- `WorkStageId` union for the 11 locked obra pipeline stages
- `ProjectOwner`, `ProjectAttachment`, `ProjectMilestone`, and `ProjectHistoryEntry` types
- `ProjectRecord` type containing list/detail/pipeline needs in one shape:
  - id, title, clientName, type, status, ownerId
  - stage, progressPercent, startDate, plannedEndDate, location, powerKwP
  - proposalId, anteprojectId
  - attachments, milestones, history
- ordered metadata maps for project status and obra stages
- seeded records that cover all list filters and all 11 obra stages
- pure helpers like `getProjects()`, `getProjectById(id)`, `filterProjects(...)`, `groupProjectsByStage(...)`, `getUpcomingMilestones(...)`

The list, detail, acompanhamento, and pipeline views should all consume this one source of truth.

### 3. Reuse the existing app-local DnD architecture for `/obras`

Phase 6 should not move drag-and-drop abstractions into `@workspace/ui`.

Reuse the current app-local pattern already proven by CRM and anteprojetos:

- one workspace component that owns seeded local state
- one pipeline board component that receives filtered records and `onDragEnd`
- one column component and one card component under `apps/web/components/platform/projects`

Keep the column order fixed and allow only card movement between columns. The business pipeline is fixed; reordering columns adds complexity without roadmap value.

### 4. Build `/projetos` and `/obras` as separate workspaces that share the same filtered record model

The context explicitly separates the routes, but the data model should stay unified.

Recommended architecture:

- `projects-list-page.tsx` owns the DataTable-oriented list experience
- `works-pipeline-page.tsx` owns the Kanban/list toggle for `/obras`
- both consume the same project seed contract and the same filter vocabulary

This avoids the common failure mode where list and pipeline screens drift on stage names, owners, or link targets.

### 5. Keep the route entries server-side and push interaction into client children

Follow the repo’s existing Next.js pattern:

- route file handles `params`
- client child handles local state, toggles, drag-and-drop, dialogs, and simulated status changes

That means:

- `/projetos/page.tsx` should render a client list workspace
- `/obras/page.tsx` should render a client pipeline workspace
- `/projetos/[projectId]/page.tsx` should resolve the seeded record from `params` and pass it to a client detail component
- `/projetos/[projectId]/obra/page.tsx` should resolve the seeded record and pass it to a client acompanhamento component

This matches the Next 16 route contract and keeps interactive logic where the repo already expects it.

### 6. Use a DataTable list first, then layer in contextual navigation

The `/projetos` page should reuse the current `DataTable` pattern already used in earlier phases.

Recommended list behavior:

- one toolbar with `Tipo`, `Status`, `Responsavel`, and `Busca`
- whole-row navigation to `/projetos/[id]`
- a primary `Novo projeto` button that stays simulated for this phase
- empty-state copy and CTA inside the list workspace rather than falling back to the generic placeholder card

Do not build custom list primitives when the repo already has stable table components and list-page patterns.

### 7. Keep the project detail page compact and linked to the broader flow

The detail page should follow the established two-column layout used by CRM and anteprojetos:

- left column for summary and attachments
- right column for current stage, actions, progress, and stage history

It should visibly connect to adjacent modules through seeded links:

- proposal link -> `/propostas/[id]`
- anteprojeto link -> `/anteprojetos/[id]`
- obra link -> `/projetos/[id]/obra`

Local actions such as `Mudar estágio` or `Gerar relatório` should mutate only client state or show simulated affordances.

### 8. Prefer a lightweight custom Gantt-style component over a new chart dependency

This is an inference from the current repo state and the roadmap scope:

- the repo has no Gantt library installed
- the product is frontend-only and phase-scoped
- the required behavior is a readable horizontal schedule, not a full project-management engine

The safest plan is:

- implement marcos as typed seed data inside `projects-data.ts`
- render a lightweight horizontal schedule with CSS/Tailwind inside a module-local component
- degrade the schedule to stacked milestone cards on narrow screens

This keeps the phase inside current stack complexity and avoids dependency risk for a one-phase visualization.

### 9. Extend breadcrumbs generically for nested projetos/obras routes

`app-breadcrumbs.tsx` already uses explicit route heuristics for nested module pages.

Phase 6 should extend that logic for:

- `/projetos/[id]` -> `Projetos > Detalhe`
- `/projetos/[id]/obra` -> `Projetos > Obra`
- `/obras` -> `Obras > Obras` or a clearer second label such as `Pipeline`
- any optional `/obras/[id]` route -> `Obras > Detalhe`

Do not leave Phase 6 nested pages to the top-level-only breadcrumb behavior.

## Risks And Planning Implications

### Shared project data can drift between `/projetos`, `/projetos/[id]`, `/projetos/[id]/obra`, and `/obras`

Impact:

- filters, labels, and progress values can disagree across screens if each view defines its own local mock state

Planning response:

- use one `projects-data.ts` contract
- centralize stage metadata, milestone shape, and progress calculation helpers there

### The obra pipeline can become a CRM clone without enough execution-specific signal

Impact:

- the UI may technically work but fail to convey that this module is about delivery rather than sales

Planning response:

- include progress percentage, linked proposal context, milestone counts, and execution-specific stage labels on cards
- keep the visual structure familiar, but change the card content model

### The Gantt requirement can trigger unnecessary dependency churn

Impact:

- a new library can add setup, compatibility, and styling risk that outweighs the value of a simulated frontend-only chart

Planning response:

- plan around a custom lightweight schedule first
- treat a third-party Gantt dependency as optional only if a blocker appears during implementation

### Breadcrumb and route naming can confuse users if `/projetos` and `/obras` are not clearly differentiated

Impact:

- users may not understand when they are in portfolio/list mode versus pipeline/acompanhamento mode

Planning response:

- explicitly define breadcrumb labels and page headers in the plan
- keep `/projetos` as the portfolio/list root and `/obras` as the execution-pipeline root

## Plan Shape Recommendation

The roadmap’s three-plan split is still correct, and the safest execution order is sequential:

- Wave 1: `06-01`
- Wave 2: `06-02`
- Wave 3: `06-03`

Recommended responsibilities:

- `06-01` establishes `projects-data.ts`, replaces the `/projetos` placeholder, wires the shared filter vocabulary, list experience, and breadcrumb support
- `06-02` builds `/projetos/[projectId]` with summary, files, linked proposal/anteprojeto context, progress, and local stage history/actions
- `06-03` adds `/obras` and `/projetos/[projectId]/obra`, including the execution pipeline board, drag-and-drop updates, milestone timeline, upcoming steps, and lightweight Gantt schedule

This order keeps route and data foundations ahead of the most interaction-heavy work.

## Validation Architecture

Phase 6 can use the same validation model as prior frontend phases: static quality gates plus manual browser verification of the new flows.

Recommended validation contract:

- quick command:
  `pnpm --filter web lint && pnpm --filter web typecheck`
- full suite command:
  `pnpm lint && pnpm typecheck && pnpm build`
- manual checks:
  - `/projetos` replaces the placeholder and filters by tipo, status, responsável, and busca
  - clicking a project row opens `/projetos/[projectId]`
  - `/projetos/[projectId]` shows linked proposal and anteprojeto actions plus local stage/progress UI
  - `Ver obra` navigates to `/projetos/[projectId]/obra`
  - `/obras` shows all 11 locked stages and updates counts after drag-and-drop
  - `/projetos/[projectId]/obra` renders milestone history, upcoming steps, and the schedule view on desktop with a readable mobile fallback

No additional test runner is required for this phase.

## Research Outcome

Phase 6 should proceed with:

- stable nested routes under `/projetos` and `/obras`
- one shared `projects-data.ts` contract for list, detail, acompanhamento, and pipeline views
- CRM-style app-local drag-and-drop reuse for the obras board
- server route entries that hand seeded records into client workspace/detail components
- a lightweight custom Gantt-style schedule instead of a new dependency by default
- sequential waves that keep route and data foundations ahead of pipeline-heavy execution work

## RESEARCH COMPLETE

- Route structure resolved
- Shared data contract shape resolved
- Drag-and-drop reuse strategy resolved
- Detail/acompanhamento split resolved
- Gantt implementation direction resolved
- Wave split resolved
