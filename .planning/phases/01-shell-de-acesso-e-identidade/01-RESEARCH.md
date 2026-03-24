# Phase 1: Shell de Acesso e Identidade - Research

**Researched:** 2026-03-19
**Status:** Complete
**Scope:** AUTH-01, AUTH-02, PORT-02, PORT-04, ROLE-01, ROLE-02

## Goal Recap

Phase 1 has to turn the current placeholder Next.js app into a navigable mock platform with:

- a simulated login flow
- a shared application shell
- placeholder module routes for the future product areas
- profile-based navigation differences
- explicit restricted states for unauthorized direct navigation

The phase is frontend-only. No real authentication, permissions, backend, or persistence beyond local mock state/cookies should be introduced.

## Current Baseline

The repo is still at the minimum starter state:

- `apps/web/app/page.tsx` renders a starter placeholder instead of a real route flow.
- `apps/web/app/layout.tsx` already loads `@workspace/ui/globals.css`, Raleway, Geist Mono, and the app-level `ThemeProvider`.
- `apps/web/components/theme-provider.tsx` already uses `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and `disableTransitionOnChange`.
- `packages/ui/src/styles/globals.css` already contains the Hi Engenharia primary token, `--radius: 0`, and sidebar color variables for light and dark mode.
- `packages/ui/src/components/button.tsx` is the only shared UI primitive currently present.

This means the phase should favor adding shared shell primitives and app-level route structure instead of rebuilding theme or token infrastructure.

## External Guidance Used

The planning direction below is based on current documentation for:

- Next.js 16.1.6 App Router patterns for public/protected route flows and redirects
- shadcn/ui shell/navigation patterns for `sidebar`, `breadcrumb`, `dropdown-menu`, `avatar`, and related primitives
- `next-themes` App Router guidance for `ThemeProvider` placement and hydration handling

Key source URLs:

- https://github.com/vercel/next.js/blob/v16.1.6/docs/01-app/02-guides/authentication.mdx
- https://github.com/shadcn/ui/blob/main/apps/v4/content/docs/components/base/sidebar.mdx
- https://github.com/shadcn/ui/blob/main/apps/v4/content/docs/components/radix/breadcrumb.mdx
- https://github.com/pacocoursey/next-themes/blob/main/README.md

## Recommended Technical Direction

### 1. Route Structure

Use explicit route groups so the public login flow and the shared shell stay isolated:

- `apps/web/app/page.tsx` -> server redirect to `/login` or `/portal` based on a mock session cookie
- `apps/web/app/(public)/login/page.tsx` -> public login page
- `apps/web/app/(platform)/layout.tsx` -> shared shell layout for all internal routes
- `apps/web/app/(platform)/portal/page.tsx`
- `apps/web/app/(platform)/orcamentos/page.tsx`
- `apps/web/app/(platform)/crm/page.tsx`
- `apps/web/app/(platform)/anteprojetos/page.tsx`
- `apps/web/app/(platform)/projetos/page.tsx`
- `apps/web/app/(platform)/obras/page.tsx`
- `apps/web/app/(platform)/drive/page.tsx`
- `apps/web/app/(platform)/comunicacao/page.tsx`
- `apps/web/app/(platform)/propostas/page.tsx`
- `apps/web/app/(platform)/tabela-de-precos/page.tsx`

Why this is the right structure:

- It matches Next.js App Router conventions without inventing temporary routing that later phases would need to undo.
- It gives every future module a stable file path that later phases can overwrite in place, which matches the repo rule against duplicate pages/routes.
- It keeps the shell layout reusable across all modules from the start.

### 2. Mock Session Strategy

Use a lightweight mock session cookie for entry and root redirect behavior:

- cookie name: `hi_portal_session`
- fields: `authenticated`, `email`, `activeProfile`
- default profile after login: `admin`

Recommended implementation split:

- `apps/web/lib/mock-session.ts` holds the cookie name, session type, parser, serializer, and default profile
- the login route writes the cookie through a server action
- `apps/web/app/page.tsx` reads the cookie and redirects to `/login` or `/portal`
- `apps/web/app/(platform)/layout.tsx` uses the same helper to redirect missing sessions back to `/login`

This keeps the mock auth behavior simple, server-driven, and aligned with the Next.js redirect model without introducing real auth complexity.

### 3. Shell State Strategy

Use a client-side provider for UI-only shell concerns:

- active profile switching
- sidebar collapsed state
- mobile drawer open/closed state

Recommended shape:

- `apps/web/components/platform/platform-shell-provider.tsx`
- persistence key: `hi-active-profile`
- initialize from the mock session cookie value so the first render and profile badge stay consistent

This keeps route entry/exit server-driven while keeping UI state local to the shell.

### 4. Navigation Source of Truth

Create one shared app config file that every phase-1 surface reads:

- `apps/web/lib/platform-config.ts`

It should contain:

- the 10 module route definitions
- section grouping labels (`OPERACAO`, `PROJETOS`, `CONTEUDO`, `FERRAMENTAS`)
- breadcrumb titles
- profile visibility rules
- expected brand asset paths

This prevents the login page, sidebar, breadcrumbs, and access guard from drifting apart.

### 5. Restricted Access Interpretation

The phase context says unauthorized menu items should be hidden in the sidebar, but the roadmap also requires blocked states.

The clean interpretation is:

- hide disallowed modules from the sidebar for the active profile
- if the user navigates directly to a disallowed module URL, render a restricted-state screen inside the shell instead of the module placeholder

This satisfies both constraints:

- the sidebar remains clean and role-specific
- blocked access is still visible and testable through route-level states

### 6. Shared shadcn Component Set

The phase should use shadcn as the default implementation base. The component set needed for this phase is:

- `sidebar`
- `breadcrumb`
- `dropdown-menu`
- `avatar`
- `badge`
- `separator`
- `tooltip`
- `sheet`
- `input`
- `label`
- `card`

Use the repo-configured app shadcn config:

`pnpm dlx shadcn@latest add sidebar breadcrumb dropdown-menu avatar badge separator tooltip sheet input label card -c apps/web`

After generation, verify that:

- components land under `packages/ui/src/components/`
- imports use `@workspace/ui/...` aliases instead of `@/components/ui/...`
- generated composition follows the repo's `radix-maia` conventions

### 7. Login UX Direction

The login page should stay intentionally simple:

- any email/password pair submits successfully
- the desktop layout is split 50/50
- the right panel uses the brand primary color with white brand text or the real logo if present
- on mobile, the right panel disappears and only the centered form remains
- profile selection does not happen here

The form should use:

- `Input`
- `Label`
- `Card`
- existing shared `Button`

The submit state should be represented visually with a short pending state rather than any credential validation.

### 8. Shell UX Direction

Use the shadcn `Sidebar` pattern as the structural basis:

- desktop: collapsible sidebar
- mobile: drawer-triggered navigation from the header
- header: breadcrumb trail on the left, active profile badge and avatar menu on the right
- route pages: all module routes should render placeholder content through one shared placeholder page component

This is the fastest path to a high-quality shell without custom navigation primitives.

### 9. Brand Asset Strategy

The context is explicit that the real logo must be used when provided and that no fake logo should be invented.

Recommended approach:

- reserve asset paths now: `/brand/hi-logo-full.svg` and `/brand/hi-logo-mark.svg`
- create a `BrandLogo` component that prefers those paths when assets are available
- until the files exist, render a text-only fallback (`HI Engenharia`) instead of a synthetic mark

This avoids fake branding while keeping layout work unblocked.

## Risks And Planning Implications

### Real Logo Asset Is Not Yet In The Repo

Impact:

- the final visual polish of the login hero and sidebar brand block will remain text-only until the official asset is supplied

Planning response:

- capture the asset handoff in `user_setup` for the foundation plan
- keep all brand containers and spacing stable so later replacement is low-risk

### No Automated Test Harness Exists

Impact:

- phase verification relies on lint, typecheck, build, and manual UI checks

Planning response:

- create `01-VALIDATION.md`
- make every plan use grep-verifiable acceptance criteria plus a manual verification section where needed

### Role Visibility And Blocked States Can Conflict

Impact:

- it is easy to accidentally either hide too much or expose unauthorized routes incorrectly

Planning response:

- centralize access rules in `apps/web/lib/platform-config.ts`
- make the sidebar and route guard read the same access map

## Plan Shape Recommendation

The roadmap's four-plan split is still correct, but the most executable wave layout is:

- Wave 1: `01-01`
- Wave 2: `01-02`, `01-03`
- Wave 3: `01-04`

Reasoning:

- `01-01` provides the shared primitives, route/session helpers, and source-of-truth config needed by the later work
- `01-02` and `01-03` can then run in parallel because one owns login files and the other owns shell/module files
- `01-04` should be last because it intentionally modifies shell behavior built in `01-03`

## Validation Architecture

Phase 1 should use the existing static quality gates plus manual UI verification instead of introducing a new test framework in the same phase.

Recommended validation contract:

- quick command:
  `pnpm --filter web lint && pnpm --filter @workspace/ui lint && pnpm --filter web typecheck && pnpm --filter @workspace/ui typecheck`
- full suite command:
  `pnpm lint && pnpm typecheck && pnpm build`
- manual checks:
  - `/login` renders the split layout on desktop and single-column layout on mobile
  - successful submit navigates to `/portal`
  - desktop sidebar collapses and mobile navigation opens as a drawer
  - breadcrumbs update as module routes change
  - switching profile changes visible modules
  - direct navigation to an unauthorized route shows a blocked state, not the module content

Wave-0 infra work is not required because the repo already has lint/typecheck/build commands and this phase is still UI-foundation heavy.

## Research Outcome

The phase should proceed with:

- explicit App Router route groups
- a mock session cookie for login/redirect behavior
- a client shell provider for profile/sidebar state
- one navigation/access config file shared across login, shell, and route guards
- shadcn primitives generated into `@workspace/ui`
- placeholder module pages under stable final route paths

## RESEARCH COMPLETE

- Route structure resolved
- UI primitive set resolved
- Access-state interpretation resolved
- Validation strategy resolved
