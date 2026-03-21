# Phase 08: Estados, Responsividade e Jornada Completa - Research

**Researched:** 2026-03-20
**Domain:** Next.js 16 App Router frontend polish across loading/empty/error/success states, responsive tables and pipelines, and cross-module journey UX
**Confidence:** MEDIUM

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

### Estados Visuais — Loading (STAT-01)

- **Skeletons tipados:** Criar 4 skeletons no @workspace/ui:
  - `TableSkeleton` — para DataTables
  - `CardGridSkeleton` — para dashboard e grids de cards
  - `PipelineSkeleton` — para Kanban boards
  - `DetailSkeleton` — para páginas de detalhe 2-colunas
- **Dimensões:** Skeletons com dimensões exatas dos componentes reais (fidelidade visual)
- **Animação:** Pulse animation (padrão shadcn)
- **Simulação em dev:** Adicionar delay artificial em desenvolvimento para visualizar skeletons
- **Formulários:** Usar `isSubmitting` do react-hook-form para desabilitar botão e mostrar spinner durante submit

### Estados Visuais — Empty (STAT-02)

- **Componente `EmptyState`:** Props flexíveis — `icon`, `title`, `description`, `action` (button)
- **Ícones:** lucide-react (sem ilustrações customizadas)
- **Seções vazias:** Esconder seção inteira quando vazia (ex: seção "Anexos" sem anexos some, não mostrar "Nenhum anexo")
- **Pipeline em mobile:** Abas mostram contador 0, mas etapa permanece visível

### Estados Visuais — Success/Error (STAT-03)

- **Toasts com sonner:** Posição bottom-right
- **Duração variável:** Sucesso 3s, Info 4s, Erro 5s
- **Múltiplos toasts:** Empilhar verticalmente (não substituir)
- **Undo:** Botão "Desfazer" no toast após ações reversíveis (ex: mudança de etapa)
- **Página de erro customizada `/erro`:** Ilustração + mensagem amigável + botão "Tentar novamente" + link "Voltar ao início"
- **Error boundary:** Global no root layout
- **Exportação de PDF:** Toast "PDF gerado com sucesso" + botão "Baixar" simulado

### Responsividade — Tabelas (RESP-01)

- **DataTables em mobile:** Scroll horizontal, esconder colunas menos importantes
- **Colunas:** Fixas — sem seletor de colunas visíveis
- **Breakpoint:** `md` (768px) para mudança de layout mobile/desktop
- **Badge overflow:** Limite 3 badges + "+N" com tooltip

### Responsividade — Pipelines

- **Kanban em mobile:** Abas horizontais por etapa — usuário navega entre abas, vê cards da etapa ativa
- **Drag-and-drop:** Desativado em mobile — mudar etapa via select no detalhe
- **Stack vertical em mobile:** Colunas empilham verticalmente como alternativa

### Responsividade — Detalhes e Modals

- **Layout 2-colunas em mobile:** Stack vertical — ações/timeline primeiro, dados principais abaixo
- **Modals em mobile:** Sheet (abre de baixo para cima, full-width, puxar para fechar)
- **Modal sizes:** `md` (448px) forms simples, `lg` (512px) forms complexos, `xl` para previews

### Responsividade — Sidebar e Header

- **Sidebar mobile:** Drawer via hamburger (já implementado)
- **Sidebar larguras:** 256px expandida / 64px colapsada
- **Header altura:** 64px (h-16)
- **Fonts em mobile:** Reduzir tamanhos para caber mais conteúdo
- **Spacing em mobile:** Reduzir padding/margin

### Jornada Completa (PIPE-04)

- **Página `/jornada`:** Timeline horizontal com cards conectados por setas
  - Ordem: Orçamento → CRM → Anteprojeto → Proposta → Projeto → Obra
  - Cada card: ícone, nome do módulo, contador de itens ativos
- **Etapas vazias:** Esconder módulos sem itens da timeline
- **Acesso:** Entrada "Jornada" na sidebar (seção OPERAÇÃO)
- **Seção "Registro":** Em cada página de detalhe, links para entidades relacionadas (solicitação origem, oportunidade, proposta, projeto)
- **Botões "Voltar":** No header de páginas de detalhe para retornar à entidade anterior na cadeia
- **Ações contextuais:** Botões "Próxima etapa" — "Criar oportunidade" (Orçamento), "Gerar proposta" (Anteprojeto), etc.
- **Dashboard:** Painel de pendências consolidado mostrando entidades de toda a jornada com links diretos

### Dark Mode e Consistência Visual

- **Auditoria:** Completa — navegar manualmente por todas as telas em ambos os temas
- **Correção:** Criar lista de problemas durante implementação e corrigir todos na fase
- **Contraste:** WCAG AA (4.5:1 para texto)
- **Escopo da auditoria:** Listas, pipelines, detalhes, formulários, dialogs, dashboard, shell
- **Toggle de tema:** Manter 'D' + adicionar opção no dropdown do avatar

### Acessibilidade

- **Foco:** Focus trap em dialogs (primeiro campo ao abrir, retorna ao botão ao fechar)
- **Labels:** Labels em todos os inputs, aria-labels em botões de ação
- **Foco visível:** Garantir indicador de foco visível em todos os elementos interativos

### Interações e Comportamentos

- **Confirmação:** Dialog de confirmação para ações destrutivas (exclusão, cancelamento, mudança para Recusado/Fechado)
- **Offline:** Ignorar — frontend-only sem backend real
- **Navegação entre páginas:** Fade/slide transition
- **Scroll:** Reset ao topo ao navegar para nova página
- **Transições:** 150ms micro-interações, 200ms transições de estado, 300ms dialogs/modals
- **Tooltip delay:** 300ms para mostrar, instant hide ao sair
- **Busca:** Local instantânea nos dados mockados
- **Filtros:** Reset ao navegar para outra página
- **Bulk actions:** Checkboxes para seleção múltipla com ações em massa
- **Atalhos de teclado:** Apenas 'D' para tema (sem atalhos de módulo)
- **Botões indisponíveis:** Visual disabled (opacity reduzida), não esconder
- **Onboarding:** Sem onboarding — interface autoexplicativa

### Formatação de Dados

- **Texto longo:** Truncate + ellipsis + tooltip no hover
- **Datas:** Formato pt-BR (DD/MM/YYYY para data, DD/MM/YYYY HH:mm para data/hora)
- **Moeda:** R$ X.XXX,XX com `Intl.NumberFormat` pt-BR
- **Avatar fallback:** Iniciais coloridas (AvatarFallback shadcn, cor derivada do nome)

### Componentes de Formulário

- **Toggles:** Switch para binário (true/false), Checkbox para multi-seleção
- **Select vs Radio:** Select para 5+ opções, RadioGroup para 2-4 opções
- **Textarea:** Auto-resize até 5 linhas, depois scroll interno
- **Form defaults:** Campos vazios (exceto dados herdados de entidade anterior)
- **Required field indicator:** Asterisco (*) ao lado do label

### Toolbar de Listas

- **Mobile:** Toolbar com scroll horizontal
- **Filtros:** Dropdown + campo de busca + botão ação primária
- **Toggle Kanban/Lista:** ToggleGroup à direita da toolbar

### Claude's Discretion

- Conteúdo mockado específico (números, nomes, datas) para preencher estados
- Ilustração exata da página de erro
- Ícones específicos para cada módulo na página /jornada
- Ordenação das etapas na timeline da jornada

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PIPE-04 | Usuario pode perceber visualmente o fluxo principal da operacao de orcamento ate execucao da obra por meio da navegacao entre telas relacionadas | Derived journey data model, `/jornada` route, related-record sections in details, back-navigation cleanup, and dependency warning for still-missing Phase 6/7 screens |
| STAT-01 | Usuario pode ver estados de carregamento simulados nas principais telas por meio de skeletons e placeholders | Shared `@workspace/ui` skeleton primitives, Next loading/error conventions where applicable, and RHF `isSubmitting` pattern for forms |
| STAT-02 | Usuario pode ver estados de vazio e sem resultados nas listagens, pipelines e paineis principais | Thin `EmptyState` wrapper over shadcn Empty, hide-empty-section rule, and explicit no-results handling for tables/pipelines |
| STAT-03 | Usuario pode ver estados simulados de sucesso e erro para acoes como envio, exportacao, publicacao e upload visual | Centralized Sonner configuration, undo/cancel actions, `/erro` route, and `global-error.tsx` / segment `error.tsx` boundaries |
| RESP-01 | Usuario pode utilizar as principais telas do portal, dos modulos, das listagens e dos detalhes em desktop e mobile com navegacao clara | Shared `useIsMobile()` breakpoint, TanStack column visibility for tables, mobile-only pipeline tabs, sheet bottom panels, and shell/header normalization |
</phase_requirements>

## Summary

The repository already has the right base for Phase 08: Next.js 16 App Router, React 19, a shared `@workspace/ui` package, `sonner`, `@tanstack/react-table`, `react-hook-form`, `next-themes`, and a shared `useIsMobile()` hook fixed at `md`/768px. The phase should therefore be planned as consolidation and normalization work, not as net-new framework work. The highest-value move is to push all cross-cutting visual states into shared UI primitives and then refactor module screens to consume them consistently.

The current codebase also exposes concrete gaps that the planner should treat as work items, not assumptions. Empty states are duplicated inline, tables hide only body cells with CSS instead of using table-level column visibility, toast behavior is not centralized, tooltip delay is still `0ms`, the header is `h-14` instead of the locked `h-16`, and some flows still rely on `window.location.href` or `window.alert()`. These are all high-confidence polish targets for 08-01 and 08-02.

The main planning risk is 08-03. `PIPE-04` assumes a visual journey all the way through `Projeto`, `Drive`, and `Obra`, but the current repository state is still at Phase 05 complete and the actual `/projetos`, `/drive`, `/obras`, and `/comunicacao` routes are placeholders. That means the planner should either gate the journey plan on Phases 6 and 7 being completed first, or explicitly narrow the implemented journey to the modules that already exist in code today.

**Primary recommendation:** Plan Phase 08 in two tracks: first shared state/responsive primitives and consistency fixes, then a dependency-gated journey pass that starts only after Phase 6 and Phase 7 outputs exist in the codebase.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | repo-pinned `16.1.6` (latest `16.2.1`, published 2026-03-20) | App Router routing, loading UI, error boundaries, navigation | Already in repo; official file conventions (`loading.tsx`, `error.tsx`, `global-error.tsx`) solve state/error polish without custom router infrastructure |
| React | repo-pinned `19.2.4` (latest `19.2.4`, published 2026-01-26) | Client state, conditional rendering, local transitions | The phase work is mostly client-rendered UI orchestration on top of existing mock data |
| Tailwind CSS | repo-pinned `4.1.18` via `@workspace/ui` (latest `4.2.2`, published 2026-03-18) | Responsive layout, spacing, tokenized dark mode styling | The project already centralizes tokens and scanning in `packages/ui/src/styles/globals.css` |
| shadcn/ui (`radix-maia`) | repo-pinned CLI `4.0.8` (latest `4.1.0`, published 2026-03-19) | Shared UI primitives in `packages/ui` | Repo rule mandates shadcn-first composition; phase 08 should extend it instead of hand-rolling state and overlay UI |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `sonner` | repo-pinned `2.0.7` (latest `2.0.7`, published 2025-08-02) | Toast success/error/info/loading feedback | Use for all transient action feedback and undo/cancel affordances |
| `@tanstack/react-table` | repo-pinned `8.21.3` (latest `8.21.3`, published 2025-04-14) | List rendering, pagination, dynamic column visibility | Use for responsive table behavior instead of CSS-only hidden cells |
| `react-hook-form` | repo-pinned `7.63.0` (latest `7.71.2`, published 2026-02-20) | Form submit state and validation | Use `formState.isSubmitting` and existing form patterns for loading/disabled states |
| `@hello-pangea/dnd` | repo-pinned `18.0.1` (latest `18.0.1`, published 2025-02-09) | Desktop Kanban drag-and-drop | Keep only on desktop branches; disable entirely on mobile |
| `next-themes` | repo-pinned `0.4.6` (latest `0.4.6`, published 2025-03-11) | Theme sync for shell and toaster | Use for dark-mode parity and avatar-dropdown theme toggle |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Shared `EmptyState` wrapper over shadcn Empty | Hand-written empty markup per page | Faster for one screen, but duplicates copy/layout and violates the repo’s shadcn-first workflow |
| TanStack `columnVisibility` state | `hidden md:table-cell` classes only | CSS-only hiding is simpler but causes header/body drift and is already breaking table semantics in current screens |
| Existing `Sheet` with `side="bottom"` for mobile modals | shadcn `Drawer` (`vaul`) | Drawer gives gesture-heavy bottom sheets, but adds dependency; current phase context already chose Sheet and the repo already has it installed |
| Next App Router `error.tsx` / `global-error.tsx` | Custom React error boundary inside layout trees | Custom wrappers duplicate framework behavior and miss root-layout failures that `global-error.tsx` handles |

**Installation:**
```bash
# No package upgrade is required for Phase 08.
# Add only missing shadcn primitives through the existing app config.
pnpm dlx shadcn@latest add empty alert-dialog tabs -c apps/web
```

**Version verification:** Repo-pinned versions and registry latest versions were checked with `npm view` on 2026-03-20. Current registry latest patches are newer than the repo for `next`, `tailwindcss`, `shadcn`, and `react-hook-form`, but this phase should stay on the repo-pinned stack unless a dedicated upgrade phase is opened.

## Architecture Patterns

### Recommended Project Structure
```text
apps/web/
├── app/
│   ├── global-error.tsx              # Root App Router uncaught errors
│   ├── erro/
│   │   └── page.tsx                  # Friendly expected-error route
│   └── (platform)/
│       ├── error.tsx                 # Segment fallback for platform pages
│       ├── jornada/
│       │   └── page.tsx              # Cross-module journey page
│       └── [module]/loading.tsx      # Only where route-level loading can actually render
├── components/platform/
│   ├── journey/                      # Journey cards, timeline, related-record UI
│   ├── states/                       # Page-level state wrappers that compose shared UI primitives
│   └── responsive/                   # Mobile-specific table/pipeline/detail branches
└── lib/
    ├── journey-data.ts               # Derived cross-module relationships and counters
    └── feedback.ts                   # Toast duration/action helpers
packages/ui/src/components/
├── empty-state.tsx
├── table-skeleton.tsx
├── card-grid-skeleton.tsx
├── pipeline-skeleton.tsx
└── detail-skeleton.tsx
```

### Pattern 1: Shared State Primitives in `@workspace/ui`
**What:** Put all repeated loading and empty visuals in `packages/ui`, then compose them in app-level pages. Keep page-specific copy and actions in the app, but keep layout and animation tokens shared.
**When to use:** All list, dashboard, pipeline, detail, and upload screens touched by 08-01.
**Why:** Current screens already repeat empty markup and status behaviors. Phase 08 should centralize them once.

### Pattern 2: Responsive Tables via Column Visibility State
**What:** Move mobile column decisions into `columnVisibility` state on `DataTable`, not just CSS classes on `<td>`.
**When to use:** `orcamentos`, `crm`, `propostas`, `tabela-de-precos`, and any later Phase 6/7 list page.
**Example:**
```tsx
// Source: https://tanstack.com/table/latest/docs/guide/column-visibility
const [columnVisibility, setColumnVisibility] = useState({
  phone: false,
  city: false,
})

const table = useReactTable({
  data,
  columns,
  state: {
    columnVisibility,
  },
  onColumnVisibilityChange: setColumnVisibility,
})
```

**Inference from official docs + local code:** In this repository, pair `columnVisibility` with `useIsMobile()` from `packages/ui/src/hooks/use-mobile.ts` so the shared `DataTable` can toggle the same columns on both headers and cells.

### Pattern 3: Responsive Pipelines via Render Branches
**What:** Render two pipeline branches: desktop keeps `@hello-pangea/dnd`; mobile switches to horizontally scrollable stage tabs and a single active-stage list.
**When to use:** `crm`, `anteprojetos`, and the future `obras` pipeline.
**Why:** Touch drag-and-drop on mobile is explicitly out of scope and becomes harder to read than a tabbed stage list.

### Pattern 4: Framework-Native Error and Loading Boundaries
**What:** Use App Router file conventions for uncaught errors and route loading, and keep `/erro` as the friendly expected-error screen for mocked failures that are intentionally surfaced.
**When to use:** `global-error.tsx` for root failures, `(platform)/error.tsx` for shell pages, `loading.tsx` only where navigation actually suspends, and `/erro` for manually routed failure states.
**Example:**
```tsx
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/error
"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Pattern 5: Centralized Toast Configuration
**What:** Keep all global Sonner options in the shared `Toaster` component and put duration/action presets in one app helper.
**When to use:** Every success/error/info/loading toast in 08-01 and 08-03.
**Example:**
```tsx
// Source: https://sonner.emilkowal.ski/toaster
<Toaster
  position="bottom-right"
  duration={3000}
  visibleToasts={5}
  expand
/>
```

### Anti-Patterns to Avoid
- **Inline state markup per page:** The repository already duplicates empty-state structures. Phase 08 should not create a third or fourth version.
- **CSS-hiding only body cells:** Current list pages hide content spans inside cells, but header labels stay visible and create mobile misalignment.
- **`window.location.href` for internal navigation:** This breaks SPA navigation, undermines route transitions, and makes `PIPE-04` feel disjointed.
- **`window.alert()` for visual feedback:** These calls bypass Sonner, cannot be themed, and do not match the phase’s success/error model.
- **Desktop pipeline on mobile:** Keeping drag-and-drop active on small screens makes touch scrolling and readability worse.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Empty states | Custom `div` + icon + buttons on each screen | shadcn `Empty` composed behind `EmptyState` | Keeps markup consistent and aligned with repo UI workflow |
| Confirmation for destructive actions | Reusing generic `Dialog` with manual button layout | shadcn `AlertDialog` | Correct semantics, focus behavior, and clearer intent |
| Success/error banners | Manual inline banners and `window.alert()` | `sonner` + shared helper | Official toast actions/durations/stacking already solve this |
| Error boundaries | Custom layout wrapper with try/catch | Next `error.tsx` and `global-error.tsx` | Handles App Router segments and root failures correctly |
| Mobile table visibility | Ad hoc `hidden md:*` spans only | TanStack `columnVisibility` | Keeps headers, cells, and row APIs in sync |
| Mobile bottom sheet | Custom fixed-position panel | Existing `SheetContent side="bottom"` | Already installed, themed, and keyboard accessible |

**Key insight:** Almost every difficult piece of Phase 08 is already solved either by the current framework or by the project’s existing shadcn stack. The planner should spend effort on shared composition and consistency, not on inventing new primitives.

## Common Pitfalls

### Pitfall 1: `loading.tsx` Never Appears
**What goes wrong:** A route-level loading file is added, but the user never sees it.
**Why it happens:** The current pages mostly render synchronous client-side mock data. App Router loading boundaries only show when navigation suspends.
**How to avoid:** Use `loading.tsx` only where a route actually suspends or streams. For mock-only client pages, add a local development-only delay hook and render the new typed skeletons inside the workspace component.
**Warning signs:** You add `loading.tsx`, navigate around, and the UI still swaps instantly.

### Pitfall 2: Mobile Tables Show Wrong Headers
**What goes wrong:** Body cells disappear on mobile, but the header row still shows labels for hidden columns.
**Why it happens:** Current code hides spans inside cells, not the column visibility state itself.
**How to avoid:** Extend `DataTable` with controlled `columnVisibility` and drive it from `useIsMobile()`.
**Warning signs:** Empty header columns, odd spacing, or rows that no longer line up on small screens.

### Pitfall 3: Toast Behavior Drifts Screen by Screen
**What goes wrong:** Some toasts last 3 seconds, others use Sonner defaults, and undo actions are implemented inconsistently.
**Why it happens:** Current `Toaster` only styles icons/theme; it does not yet set global duration, position, or stack behavior.
**How to avoid:** Centralize global `Toaster` props and expose app-level helpers such as `showSuccessToast`, `showErrorToast`, and `showUndoToast`.
**Warning signs:** Position changes, inconsistent timing, or duplicated toast option objects across modules.

### Pitfall 4: Journey Polish Starts Before Journey Endpoints Exist
**What goes wrong:** The plan tries to deliver the full `PIPE-04` flow, but `/projetos`, `/drive`, and `/obras` still render placeholders.
**Why it happens:** The phase depends on later modules being implemented, but the repository state is still at Phase 05 complete.
**How to avoid:** Gate 08-03 behind completed Phase 6/7 outputs, or explicitly scope the journey to the currently implemented modules until those outputs land.
**Warning signs:** `/jornada` needs counts or links that have no source data, or detail pages can only route into placeholders.

### Pitfall 5: Touch UX Breaks in Mobile Pipelines
**What goes wrong:** Horizontal scrolling and drag gestures fight each other, making the pipeline feel broken on phones.
**Why it happens:** Desktop DnD patterns are carried over to touch screens.
**How to avoid:** Do not mount `DragDropContext` on mobile. Render a separate mobile branch with tabs plus active-stage cards, and keep stage change inside detail selects.
**Warning signs:** Cards become hard to scroll past, or users accidentally drag while trying to swipe.

### Pitfall 6: Tooltip Noise Increases Instead of Helping
**What goes wrong:** Every hover or focus opens a tooltip instantly, which feels jittery in the shell and on truncated text.
**Why it happens:** The current `TooltipProvider` default is `delayDuration = 0`.
**How to avoid:** Set the platform `TooltipProvider` delay to the locked `300ms` and reserve tooltips for truncated or overflow content only.
**Warning signs:** Sidebar collapsed tooltips flash immediately and long-text cells show tooltip overload.

### Pitfall 7: Global Error UI Is Wired to the Wrong File
**What goes wrong:** A React error boundary is placed inside `layout.tsx`, but root layout failures still blank the screen.
**Why it happens:** In App Router, root uncaught exceptions are handled by `app/global-error.tsx`, not by an arbitrary wrapper.
**How to avoid:** Use `app/global-error.tsx` for root fallback, `(platform)/error.tsx` for segment fallback, and `/erro` for friendly mocked error routes.
**Warning signs:** Root failures bypass the fallback or the fallback renders without `html/body` when it replaces the root layout.

## Code Examples

Verified patterns from official sources:

### Route Loading UI
```tsx
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/loading
export default function Loading() {
  return <LoadingSkeleton />
}
```

### Root Error Boundary
```tsx
// Source: https://nextjs.org/docs/app/getting-started/error-handling
"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

### Sonner Toaster Defaults
```tsx
// Source: https://sonner.emilkowal.ski/toaster
<Toaster
  position="bottom-right"
  visibleToasts={5}
  expand
  toastOptions={{
    duration: 4000,
  }}
/>
```

### React Hook Form Submit Pending State
```tsx
// Source: https://react-hook-form.com/docs/useform/formstate
const {
  handleSubmit,
  formState: { isSubmitting },
} = useForm()

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  </form>
)
```

### TanStack Column Visibility
```tsx
// Source: https://tanstack.com/table/latest/docs/guide/column-visibility
const [columnVisibility, setColumnVisibility] = useState({
  phone: false,
  city: false,
})

const table = useReactTable({
  data,
  columns,
  state: {
    columnVisibility,
  },
  onColumnVisibilityChange: setColumnVisibility,
})
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Static column hiding in older `react-table` patterns or CSS-only cell hiding | Dedicated `columnVisibility` state in TanStack Table v8 | v8 | Responsive tables should be state-driven so headers and cells stay aligned |
| Custom router-level error wrappers | App Router `error.tsx` and `global-error.tsx` file conventions | Next.js App Router | Error handling belongs in route/file conventions, not bespoke wrappers |
| Manual route-animation hacks tied to router events | `transitionTypes` on `next/link` with React View Transitions | Next.js 16 / React 19 | Route transitions can be implemented as progressive enhancement without adding a motion library |

**Deprecated/outdated:**
- `window.location.href` for internal navigation: use `Link` or `router.push()` to preserve SPA behavior and transition hooks.
- `window.alert()` for UI feedback: use `sonner` for feedback and `AlertDialog` for confirmations.
- `react-beautiful-dnd` era assumptions: this repository already uses `@hello-pangea/dnd`; keep that fork and do not introduce legacy DnD packages.

## Open Questions

1. **Is Phase 08 planning allowed to assume Phases 6 and 7 are already implemented?**
   - What we know: `.planning/STATE.md` still says Phase 05 is the current completed phase, and `/projetos`, `/drive`, `/obras`, `/comunicacao` still render placeholders.
   - What's unclear: Whether 08-03 should be planned against future code that is not yet in this repository.
   - Recommendation: Treat full `PIPE-04` journey work as dependency-gated and call that out explicitly in the planner.

2. **Should mobile stage navigation use real Tabs or a lighter button bar?**
   - What we know: The phase context requires horizontal tabs, `Tabs` is not installed, and `ToggleGroup` is already installed but is a worse semantic fit for 6-10 stages.
   - What's unclear: Whether the planner wants to add a new shadcn primitive in this phase.
   - Recommendation: Add shadcn `Tabs` through the existing app config and wrap the tab list in `ScrollArea`.

3. **How far should the dashboard “pendências consolidadas” go in this phase?**
   - What we know: Cross-module dashboard data is not yet centralized; current module data lives in separate `apps/web/lib/*-data.ts` files.
   - What's unclear: Whether the dashboard should only link existing entities or also model future Phase 6/7 records.
   - Recommendation: Build a derived `journey-data.ts` aggregator and keep it limited to data contracts that exist in the repository at planning time.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected in repo; recommend `vitest` + `@testing-library/react` + `jsdom` in Wave 0 |
| Config file | none — see Wave 0 |
| Quick run command | `pnpm lint && pnpm typecheck` now; after Wave 0: `pnpm --filter web vitest run <target-spec>` |
| Full suite command | `pnpm lint && pnpm typecheck` now; after Wave 0: `pnpm lint && pnpm typecheck && pnpm --filter web vitest run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PIPE-04 | Cross-screen journey from orçamento to obra stays connected, with back-links and related-record links | manual smoke now; promote to Playwright route smoke later | `none — add Playwright or keep manual until installed` | ❌ Wave 0 |
| STAT-01 | Main pages show loading skeletons and submit buttons lock during async/mocked submit | component | `pnpm --filter web vitest run apps/web/components/platform/states/__tests__/loading-states.test.tsx` | ❌ Wave 0 |
| STAT-02 | Lists, pipelines, and panels render empty/no-results states with correct actions | component | `pnpm --filter web vitest run apps/web/components/platform/states/__tests__/empty-states.test.tsx` | ❌ Wave 0 |
| STAT-03 | Success/error flows show toast feedback and route/error fallbacks | component + route smoke | `pnpm --filter web vitest run apps/web/components/platform/states/__tests__/feedback-and-error.test.tsx` | ❌ Wave 0 |
| RESP-01 | Shell, tables, details, and pipelines remain readable on mobile and desktop | component + manual responsive audit | `pnpm --filter web vitest run apps/web/components/platform/responsive/__tests__/responsive-layouts.test.tsx` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `pnpm lint && pnpm typecheck`
- **Per wave merge:** `pnpm lint && pnpm typecheck` plus targeted Vitest once Wave 0 exists
- **Phase gate:** Manual desktop/mobile + dark-mode audit, plus all added Vitest specs green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `apps/web/vitest.config.ts` — test runner config for `web`
- [ ] `apps/web/test/setup.ts` — `@testing-library/jest-dom` and DOM polyfills
- [ ] `apps/web/components/platform/states/__tests__/loading-states.test.tsx` — covers STAT-01
- [ ] `apps/web/components/platform/states/__tests__/empty-states.test.tsx` — covers STAT-02
- [ ] `apps/web/components/platform/states/__tests__/feedback-and-error.test.tsx` — covers STAT-03
- [ ] `apps/web/components/platform/responsive/__tests__/responsive-layouts.test.tsx` — covers RESP-01
- [ ] Optional e2e: `apps/web/e2e/journey.spec.ts` — covers PIPE-04 if planner wants automated route smoke
- [ ] Framework install: `pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event --filter web`
- [ ] Package script: add `"test": "vitest run"` to `apps/web/package.json`

## Sources

### Primary (HIGH confidence)
- Local codebase inspection:
  - `apps/web/app/(platform)/layout.tsx`
  - `apps/web/components/platform/app-header.tsx`
  - `apps/web/components/platform/app-sidebar.tsx`
  - `apps/web/components/platform/app-breadcrumbs.tsx`
  - `apps/web/components/platform/budget-requests/budget-requests-list-page.tsx`
  - `apps/web/components/platform/budget-requests/budget-request-detail-page.tsx`
  - `apps/web/components/platform/crm/crm-workspace-page.tsx`
  - `apps/web/components/platform/crm/crm-pipeline-board.tsx`
  - `apps/web/components/platform/crm/crm-opportunity-detail-page.tsx`
  - `apps/web/components/platform/anteprojects/anteprojects-workspace-page.tsx`
  - `apps/web/components/platform/proposals/proposals-list-page.tsx`
  - `apps/web/components/platform/proposals/proposal-detail-page.tsx`
  - `apps/web/components/platform/price-table/price-table-page.tsx`
  - `apps/web/components/platform/price-table/price-table-upload-page.tsx`
  - `apps/web/lib/budget-requests-data.ts`
  - `apps/web/lib/crm-data.ts`
  - `apps/web/lib/anteprojects-data.ts`
  - `apps/web/lib/proposals-data.ts`
  - `packages/ui/src/components/data-table.tsx`
  - `packages/ui/src/components/sidebar.tsx`
  - `packages/ui/src/components/sheet.tsx`
  - `packages/ui/src/components/tooltip.tsx`
  - `packages/ui/src/components/sonner.tsx`
  - `packages/ui/src/hooks/use-mobile.ts`
- Context7 `/vercel/next.js/v16.1.6` — loading file convention, `error.tsx`, `reset()`, navigation behavior
- Next.js official docs:
  - https://nextjs.org/docs/app/api-reference/components/link
  - https://nextjs.org/docs/app/api-reference/file-conventions/error
  - https://nextjs.org/docs/app/getting-started/error-handling
- Context7 `/react-hook-form/documentation` — `formState.isSubmitting`
- Context7 `/emilkowalski/sonner` and Sonner official docs:
  - https://sonner.emilkowal.ski/getting-started
  - https://sonner.emilkowal.ski/toaster
- TanStack Table official docs:
  - https://tanstack.com/table/latest/docs/guide/column-visibility
- MCP shadcn project info + registry inspection:
  - confirmed installed component set for this repo
  - confirmed official registry availability of `empty`, `alert-dialog`, `tabs`, `drawer`

### Secondary (MEDIUM confidence)
- None

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - verified against local package manifests, `npm view`, Context7, and official docs
- Architecture: MEDIUM - patterns are clear for states and responsiveness, but full journey architecture is blocked by still-missing Phase 6/7 module output
- Pitfalls: HIGH - directly observed in current source files and cross-checked with official docs where framework behavior matters

**Research date:** 2026-03-20
**Valid until:** 2026-03-27
