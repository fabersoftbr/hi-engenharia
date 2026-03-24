# Phase 2: Dashboard e Home Operacional - Research

**Researched:** 2026-03-19
**Status:** Complete
**Scope:** PORT-01, PORT-03

## Goal Recap

Phase 2 must turn the post-login landing area into a real operational home screen with:

- a welcome area tied to the active simulated profile
- a grid of module summary cards with mocked counts and pending states
- a quick-actions strip for the most common actions per profile
- a footer area with announcements plus urgent operational highlights

The phase is still frontend-only. No backend, persistence, real messaging, or real analytics should be introduced.

## Current Baseline

The repo is no longer at the raw starter state, but the shell is still incomplete:

- `apps/web/app/page.tsx` already redirects to `/login` or `/portal` using the mock session helper.
- `apps/web/lib/platform-config.ts` already defines the module routes, labels, icons, and profile visibility rules that Phase 2 must reuse instead of duplicating access logic.
- `apps/web/lib/mock-session.ts` already defines the active-profile session contract.
- `packages/ui/src/components/` already contains the required shadcn primitives for this phase: `card`, `badge`, `button`, `separator`, `skeleton`, `sidebar`, `avatar`, `dropdown-menu`, and `breadcrumb`.
- `packages/ui/src/styles/globals.css` already defines the Hi Engenharia design tokens, straight corners via `--radius: 0`, and semantic color tokens for light and dark mode.

The main limitation is that the actual `(platform)` route tree and shell components are not on disk yet. Phase 2 planning therefore has to assume that Phase 1 plans `01-03` and `01-04` land first, or that the executor creates the dashboard directly in the final `/portal` route under the shared shell once those files exist.

## External Guidance Used

The planning direction below is based on current documentation for:

- Next.js 16.1.6 App Router layout and navigation patterns
- `next/link` usage for client-side dashboard navigation
- shadcn/ui composition guidance for `Card`, `Badge`, `Button`, `Skeleton`, and `Separator`

Key source URLs:

- https://github.com/vercel/next.js/blob/v16.1.6/docs/01-app/02-guides/migrating/app-router-migration.mdx
- https://github.com/vercel/next.js/blob/v16.1.6/docs/01-app/03-api-reference/02-components/link.mdx
- https://github.com/vercel/next.js/blob/v16.1.6/docs/01-app/03-api-reference/03-file-conventions/layout.mdx
- https://github.com/shadcn/ui/blob/main/skills/shadcn/rules/composition.md
- https://github.com/shadcn/ui/blob/main/skills/shadcn/SKILL.md

## Recommended Technical Direction

### 1. Route Ownership And Shell Integration

The dashboard should live in the final route file:

- `apps/web/app/(platform)/portal/page.tsx`

Do not introduce a second dashboard route such as `/dashboard`. The roadmap, route config, and root redirect already point to `/portal`, and changing that would create route churn for later phases.

Because active profile state is expected to come from the shell provider created in Phase 1, the safest composition is:

- keep `page.tsx` as the route entrypoint
- compose a dedicated dashboard UI component such as `apps/web/components/platform/portal-dashboard.tsx`
- make that dashboard component a client component only if it needs direct access to profile state from the provider

This keeps the route stable while isolating the profile-aware logic in reusable UI files.

### 2. Reuse Platform Config Instead Of Rebuilding Access Logic

Phase 2 must not hardcode a second profile map for cards and actions.

Use `apps/web/lib/platform-config.ts` as the source of truth for:

- which modules are visible to the active profile
- each module's label and icon
- stable route targets for cards and quick actions

For the dashboard card grid, derive the visible module list from the active profile and exclude the `portal` module itself from the summary-card collection. The grid should represent the downstream modules, not the current landing page.

### 3. Dashboard Composition Strategy

The phase context already defines the information architecture. The clean shadcn-aligned composition is:

- **Welcome strip:** one top section or top card containing the greeting, active profile label, and the pending-count sentence
- **Summary grid:** one reusable `Card` per visible module using full `CardHeader` and `CardContent` composition
- **Quick actions:** `Button` with `variant="outline"` for each profile-specific action, rendered in a flex row with wrapping
- **Footer columns:** two bordered `Card` containers, one for announcements and one for urgent highlights
- **Section separation:** `Separator` between major regions where spacing alone is not enough

Avoid custom status pills or manual bordered divs. Pending state and "Em dia" state should use `Badge` variants or semantic-token classes layered onto `Badge`, not raw colored spans.

### 4. Mock Data Contract

Do not spread inline mock arrays across the route, cards, and footer sections. Create one shared dashboard data module, for example:

- `apps/web/lib/dashboard-data.ts`

That file should hold typed mock structures for:

- summary stats per module
- quick actions per profile
- announcements list
- urgent highlights list

Recommended pattern:

- module card metadata derives from `platform-config.ts`
- operational counts, pending counts, quick actions, and feed items come from dashboard-specific mock data
- a small helper layer maps `activeProfile` to the visible cards and available actions

This lets plans `02-02` and `02-03` work on separate component files while consuming one shared data contract.

### 5. Navigation Behavior

Every primary interaction in Phase 2 should navigate to stable existing routes:

- module cards use `next/link` to the module route from `platform-config.ts`
- quick actions navigate to the most relevant module route, even when the deeper workflow page does not exist yet
- the announcements card footer uses `Ver todos` -> `/comunicacao`
- urgent highlight rows may link to the related module route or remain visually descriptive if the exact deep link does not exist yet

The important constraint is that cards and actions must never point to ad hoc temporary routes. Use the module placeholders from Phase 1 until later phases replace them.

### 6. Profile-Aware Rendering Rules

The dashboard should react to the same active-profile state as the sidebar and header.

Recommended behavior:

- welcome copy changes with the current profile label
- summary cards change as the profile changes
- quick actions change as the profile changes
- announcements may stay global
- urgent highlights may be filtered to the currently visible modules for the active profile

This directly supports `PORT-01` and `PORT-03` while staying aligned with Phase 1's role simulation.

### 7. Visual Direction Constraints

The context is explicit that module cards should be visually uniform. That means:

- no per-module background colors
- icon + title identify the module
- only the status badge carries emphasis
- use semantic tokens from `packages/ui/src/styles/globals.css`
- preserve straight edges from `--radius: 0`

The quick-action row should also stay restrained. Use outline buttons, concise labels, and icon support from `lucide-react`, but avoid introducing dense toolbar chrome or chart-heavy dashboard visuals that were never requested.

### 8. Loading And Empty States

Global state coverage belongs to Phase 8, so Phase 2 should not explode into a full state-system effort.

Recommended scope:

- keep the main dashboard in a stable mocked-data state by default
- if a lightweight loading variant is useful for realism, confine it to a local skeleton helper composed from `Skeleton`
- do not spend a whole plan on empty, error, and success variants here unless execution naturally needs them

This keeps the phase focused on the operational home itself.

## Risks And Planning Implications

### Phase 1 Dependency Is Real

Impact:

- if the shared `(platform)` layout, `/portal` route, and active-profile provider do not exist yet, Phase 2 cannot be implemented cleanly

Planning response:

- make the first Phase 2 plan create the dashboard route composition and shared data/components only after verifying the final shell file paths from Phase 1
- keep all Phase 2 file targets inside the final `(platform)` structure rather than inventing temporary dashboard files

### Page Assembly Can Create Merge Collisions

Impact:

- if plans `02-02` and `02-03` both edit `apps/web/app/(platform)/portal/page.tsx` or one monolithic dashboard component, wave-parallel execution becomes fragile

Planning response:

- use Plan `02-01` to create the route entrypoint plus a dashboard composition shell and separate component slots
- let `02-02` own the summary and quick-action components
- let `02-03` own the announcements and urgent-highlight components

### Profile Logic Can Drift From Sidebar Logic

Impact:

- the dashboard could show cards for modules the sidebar hides, which would immediately look broken

Planning response:

- all visible modules should be derived from `platform-config.ts`
- quick actions should be keyed by the same `ProfileKey` values from the Phase 1 foundation

## Plan Shape Recommendation

The roadmap's three-plan split is still correct. The most executable wave layout is:

- Wave 1: `02-01`
- Wave 2: `02-02`, `02-03`

Recommended responsibilities:

- `02-01` creates the `/portal` dashboard route composition, shared data contracts, section-level component boundaries, and any small helpers needed by later plans
- `02-02` builds the welcome strip, summary-card grid, and quick-actions row
- `02-03` builds the announcements panel, urgent-highlights panel, and final footer composition against the shared data contract

This preserves the roadmap intent while keeping the wave-2 write sets mostly separate.

## Validation Architecture

Phase 2 can use the same validation approach as Phase 1: static quality gates plus targeted manual UI verification.

Recommended validation contract:

- quick command:
  `pnpm --filter web lint && pnpm --filter web typecheck`
- full suite command:
  `pnpm lint && pnpm typecheck && pnpm build`
- manual checks:
  - `/portal` renders the welcome area, summary cards, quick actions, announcements, and urgent highlights inside the shared shell
  - switching the active profile updates the visible cards and quick actions without breaking the shell
  - clicking a summary card navigates to the corresponding module route
  - clicking `Ver todos` in announcements navigates to `/comunicacao`
  - the dashboard remains readable at desktop and mobile widths, with the footer cards stacking on small screens

Wave-0 test infrastructure is not required. The repo already has lint, typecheck, and build commands, and this phase is still UI composition over mocked data.

## Research Outcome

Phase 2 should proceed with:

- the final dashboard route at `apps/web/app/(platform)/portal/page.tsx`
- a separate dashboard composition component instead of one giant page file
- `platform-config.ts` as the single source of truth for visible modules and route targets
- one shared dashboard mock-data module for counts, actions, announcements, and highlights
- shadcn composition built from `Card`, `Badge`, `Button`, `Separator`, and `Skeleton`
- a wave split that lets the two implementation plans work in parallel without fighting over the same page file

## RESEARCH COMPLETE

- Route target resolved
- Profile-aware rendering strategy resolved
- Component composition strategy resolved
- Wave split resolved
- Validation strategy resolved
