# Architecture Research

**Domain:** Frontend-only operational portal for Hi Engenharia
**Researched:** 2026-03-19
**Confidence:** HIGH

## Standard Architecture

### System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    App Shell / Route Layer                 │
├─────────────────────────────────────────────────────────────┤
│  Login   Dashboard   Orcamentos   CRM   Projetos   Drive   │
│  Propostas   Tabela de Precos   Comunicacao                │
└───────────────┬───────────────┬───────────────┬────────────┘
                │               │               │
┌───────────────▼───────────────▼───────────────▼────────────┐
│                 Workspace Layout Components                │
├─────────────────────────────────────────────────────────────┤
│  Sidebar  Header  Breadcrumbs  Module Toolbar  Drawers     │
│  Status Blocks  Lists  Tables  Cards  Detail Panels        │
└───────────────┬───────────────┬───────────────┬────────────┘
                │               │               │
┌───────────────▼───────────────▼───────────────▼────────────┐
│                  Mock Data / UI State Layer                │
├─────────────────────────────────────────────────────────────┤
│  Navigation model   Role scenarios   Pipeline fixtures     │
│  Table rows         File trees       Notifications         │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Route groups and layouts | Separate auth entry from workspace experience and keep module navigation consistent | Next.js App Router route groups with nested `layout.tsx` files |
| Shared shell components | Provide sidebar, top bar, breadcrumbs, and action areas used across modules | shadcn sidebar/breadcrumb/dropdown/button composition plus local app shell wrappers |
| Module screens | Render the business-specific lists, forms, boards, and detail views | App-local page components composed from shared UI primitives |
| Mock data layer | Provide believable static scenarios without backend logic | `lib/mocks` fixtures, constants, and lightweight view-model helpers |
| Visual state system | Keep empty/loading/error/restricted states consistent | Reusable state blocks composed from shadcn `empty`, `skeleton`, `alert`, `badge`, and card patterns |

## Recommended Project Structure

```text
apps/web/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx          # Tela de entrada simulada
│   ├── (workspace)/
│   │   ├── layout.tsx              # Shell principal da plataforma
│   │   ├── dashboard/page.tsx      # Portal inicial
│   │   ├── orcamentos/             # Solicitacao de orcamento
│   │   ├── crm/                    # Oportunidades e funil
│   │   ├── projetos/               # Projetos e obras
│   │   ├── drive/                  # Arquivos e pastas
│   │   ├── propostas/              # Gerador de propostas
│   │   ├── precos/                 # Tabela de precos
│   │   └── comunicacao/            # Mural e comunicados
├── components/
│   ├── shell/                      # Sidebar, header, app breadcrumbs
│   ├── states/                     # Empty, loading, error, success, restricted
│   ├── dashboards/                 # Cards, charts, summary rows
│   ├── crm/                        # Pipelines, filters, opportunity cards
│   ├── drive/                      # File tree, metadata, preview shell
│   └── shared/                     # App-specific reusable composites
├── lib/
│   ├── mocks/                      # Dados mockados por modulo
│   ├── navigation/                 # Menus, breadcrumbs, shortcuts, profiles
│   └── view-models/                # Adaptadores leves de dados para tela
└── hooks/                          # Hooks client-only quando realmente necessarios
```

### Structure Rationale

- **`app/(auth)` and `app/(workspace)`:** separate the simulated entry flow from the main workspace without duplicating layout logic.
- **`components/shell`, `components/states`, and `components/<module>`:** keep UI ownership clear so the product does not become a pile of unrelated blocks.
- **`lib/mocks` and `lib/view-models`:** prevent fake data from spreading through page JSX and make screen scenarios easier to maintain.
- **`packages/ui`:** remains the home for true shared primitives; do not promote app-specific composites too early.

## Architectural Patterns

### Pattern 1: Route-Group Workspace Shell

**What:** Use a dedicated authenticated workspace route group with a shared layout for sidebar, header, breadcrumbs, and responsive navigation.
**When to use:** For every module that belongs to the main platform experience.
**Trade-offs:** Strong consistency and lower repetition, but requires discipline so module pages do not bypass the shell.

**Example:**
```typescript
// app/(workspace)/layout.tsx
export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PlatformShell>{children}</PlatformShell>
}
```

### Pattern 2: Server Shell + Client Islands

**What:** Keep pages and layouts server-first, then isolate interactive controls such as filters, drawers, charts, tabs, or fake upload flows into client components.
**When to use:** Any screen with interaction but no need for app-wide client state.
**Trade-offs:** Cleaner bundle boundaries and easier route organization, but requires attention to prop shape between server and client components.

**Example:**
```typescript
// app/(workspace)/crm/page.tsx
export default function CrmPage() {
  return (
    <>
      <PageHeader />
      <PipelineClient />
    </>
  )
}
```

### Pattern 3: Mock Scenario Composition

**What:** Treat mock data as named scenarios, not random inline arrays.
**When to use:** Across dashboards, pipelines, proposal builders, and file structures.
**Trade-offs:** Slightly more upfront structure, but much easier to keep states believable and reusable.

**Example:**
```typescript
export const commercialOpportunitiesScenario = {
  summary: { open: 18, won: 4, lost: 3 },
  stages: [],
  highlights: [],
}
```

## Data Flow

### Request Flow

```text
[User Action]
    ↓
[Page / Section]
    ↓
[Client control or local state]
    ↓
[Mock scenario / view-model]
    ↓
[UI update]
```

### State Management

```text
[URL params / local component state]
    ↓
[Filters, tabs, drawers, view toggles]
    ↓
[Derived view-model]
    ↓
[Rendered cards, tables, boards, detail panels]
```

### Key Data Flows

1. **Navigation flow:** role scenario defines visible menu, which defines available module entry points and shortcut cards.
2. **Operational flow:** a mock opportunity or project record feeds list rows, pipeline cards, detail pages, linked files, and proposal context.
3. **Visual-state flow:** screen mode (`loading`, `empty`, `success`, `error`, `restricted`) selects a reusable state block before rendering the normal content.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k internal users | Keep one Next.js app with route groups, local client islands, and mock scenarios per module |
| 1k-100k users or many more modules | Split larger module blocks into more explicit folders, introduce table virtualization where needed, and lazy-load heavy charts or previews |
| 100k+ users or real productization | Revisit data contracts, API boundaries, auth, and performance architecture only after the frontend information architecture is stable |

### Scaling Priorities

1. **First bottleneck:** page/component sprawl — fix by keeping the shell, states, and module composites clearly separated.
2. **Second bottleneck:** overly large client bundles — fix by isolating charts, drawers, and complex forms into client islands instead of making the whole workspace client-rendered.

## Anti-Patterns

### Anti-Pattern 1: One Giant Workspace Page

**What people do:** Put dashboard, CRM, project, drive, and communication sections in one large route with tabs.
**Why it's wrong:** Navigation becomes weak, code grows without ownership, and responsive behavior becomes painful.
**Do this instead:** Give each module its own route while preserving a shared workspace shell.

### Anti-Pattern 2: Mock Data Inline in JSX

**What people do:** Hardcode arrays directly inside page components.
**Why it's wrong:** States become inconsistent and every module reinvents labels, users, and statuses.
**Do this instead:** Keep module scenarios in `lib/mocks` and derive screen-ready models outside the render tree.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Bitrix CRM | Mock adapter boundary only | Phase 01 should expose visual placeholders, never real network calls |
| Bitrix Projects | Mock adapter boundary only | Keep project and obra data local to the UI layer |
| Bitrix Drive | Mock file model only | Represent folders, files, and permissions visually without storage integration |
| Messenger / communication tooling | Mock feed only | Treat publication and delivery as simulated feedback states |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Shell ↔ module pages | Props and route context | Shell owns navigation and global actions, modules own domain content |
| Module pages ↔ shared UI | Component composition | Use `@workspace/ui` primitives and app-level composites, not duplicated markup |
| Module pages ↔ mock scenarios | Plain object imports / view-model helpers | No API layer required in this phase |

## Sources

- `/vercel/next.js/v16.1.6` — root and nested layouts, App Router structure
- `/tailwindlabs/tailwindcss.com` — responsive utility composition and tokenized theming
- `/websites/ui_shadcn` — sidebar, dialog/drawer, and dashboard composition patterns
- Current repo structure and codebase map (`.planning/codebase/*`)

---
*Architecture research for: frontend-only operational portal*
*Researched: 2026-03-19*
