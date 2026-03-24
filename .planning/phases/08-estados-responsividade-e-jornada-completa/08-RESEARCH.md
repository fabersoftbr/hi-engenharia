# Phase 8: Estados, Responsividade e Jornada Completa - Research

**Researched:** 2026-03-21
**Domain:** UI states, responsive layout, journey navigation (frontend-only Next.js + shadcn/ui)
**Confidence:** HIGH

## Summary

Phase 8 is a polishing/transversal phase that covers visual states (loading, empty, no-results, success, error), responsive layouts across all screens, and the complete journey navigation from budget request through construction. Plans 00 and 01 have already been executed, establishing the foundational primitives: typed skeletons (Table, CardGrid, Pipeline, Detail), EmptyState compound component, toast helpers (sonner wrappers with standard durations), `useSimulatedLoading` hook, the `/erro` custom error page, `global-error.tsx`, `NavigationTransition`, badge overflow, DataTable column visibility, and a Vitest test harness with specs.

The remaining plans (02 through 07) must now adopt these primitives into actual screens and build the missing features: mobile pipeline tabs, bottom-sheet overlays, destructive confirmations, the `/jornada` page, lineage links, and back/next-step navigation. The codebase is well-structured with clear patterns from prior phases -- every screen follows a consistent architecture (workspace page with toolbar, list/pipeline toggle, skeleton loading, empty states).

**Primary recommendation:** Focus each remaining plan on a clear responsibility boundary (state adoption, shell/responsive, mobile patterns, detail polish, journey page, lineage wiring), using the primitives already created in Plan 01 without creating new shared components unless absolutely necessary.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Skeletons tipados:** 4 typed skeletons in @workspace/ui (TableSkeleton, CardGridSkeleton, PipelineSkeleton, DetailSkeleton) -- ALREADY BUILT
- **EmptyState component:** Props flexiveis (icon, title, description, action) using lucide-react icons -- ALREADY BUILT
- **Toasts with sonner:** bottom-right, variable duration (success 3s, info 4s, error 5s), stackable, undo support -- HELPERS ALREADY BUILT
- **Error page `/erro`:** Inline SVG illustration + friendly message + retry/home buttons -- ALREADY BUILT
- **Error boundary:** Global in root layout -- ALREADY BUILT
- **DataTables mobile:** Horizontal scroll, hide less-important columns, fixed columns (no column selector), breakpoint md (768px), badge overflow limit 3 + "+N" with tooltip -- COLUMN VISIBILITY AND BADGE OVERFLOW ALREADY IN DataTable
- **Kanban mobile:** Horizontal tabs per stage, drag-and-drop disabled on mobile, stage change via select in detail
- **Details mobile:** Vertical stack (actions/timeline first, main data below)
- **Modals mobile:** Sheet (bottom-up, full-width, pull-to-close), sizes md/lg/xl
- **Sidebar:** 256px expanded / 64px collapsed, 64px header height (h-16)
- **Navigation transitions:** Fade/slide 150ms, scroll reset on navigation -- ALREADY BUILT
- **Tooltip delay:** 300ms -- ALREADY SET in TooltipProvider
- **Theme toggle:** 'D' keyboard shortcut + avatar dropdown option -- DROPDOWN ALREADY BUILT
- **Confirmations:** AlertDialog for destructive actions (delete, cancel, stage change to Recusado/Fechado)
- **Jornada page:** `/jornada` with horizontal timeline, cards connected by arrows, module counters
- **Jornada sidebar entry:** "Jornada" in OPERACAO section
- **Lineage section:** "Registro" in detail pages with links to related entities
- **Back buttons:** In detail page headers to return to previous entity in chain
- **Next-step buttons:** "Criar oportunidade" (Orcamento), "Gerar proposta" (Anteprojeto), etc. -- SOME ALREADY EXIST
- **Dashboard pendencies:** Consolidated panel showing entities from entire journey
- **Dark mode audit:** Full navigation across all screens in both themes, WCAG AA contrast
- **Accessibility:** Focus trap in dialogs, labels on all inputs, visible focus indicator
- **Data formatting:** Truncate + ellipsis + tooltip, dates pt-BR DD/MM/YYYY, currency R$ with Intl.NumberFormat
- **Bulk actions:** Checkboxes for multi-selection with batch actions
- **Disabled buttons:** Visual disabled (opacity), never hide

### Claude's Discretion
- Mock data content (numbers, names, dates) for populating states
- Exact illustration for error page -- DECIDED: inline SVG broken gear
- Specific icons for each module in /jornada page
- Stage ordering in journey timeline

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PIPE-04 | Usuario pode perceber visualmente o fluxo principal da operacao de orcamento ate execucao da obra por meio da navegacao entre telas relacionadas | Supported by: `/jornada` page with horizontal timeline, lineage "Registro" sections in detail pages, back buttons in headers, next-step handoff buttons, dashboard pendencies panel |
| STAT-01 | Usuario pode ver estados de carregamento simulados nas principais telas por meio de skeletons e placeholders | Supported by: 4 typed skeletons already in @workspace/ui, `useSimulatedLoading` hook already built, adoption pattern established in CRM/Anteprojects/BudgetRequests/Projects -- remaining screens (Drive, Comunicacao, Works) need adoption |
| STAT-02 | Usuario pode ver estados de vazio e sem resultados nas listagens, pipelines e paineis principais | Supported by: EmptyState component built, already adopted in CRM/Anteproject lists and pipelines, Budget requests list -- remaining screens need adoption |
| STAT-03 | Usuario pode ver estados simulados de sucesso e erro para acoes como envio, exportacao, publicacao e upload visual | Supported by: Toast helpers built (showSuccessToast, showInfoToast, showErrorToast, showUndoToast, showPdfReadyToast), `/erro` page built, global-error.tsx built -- toast helpers NOT YET USED in any production component, need adoption in forms, stage changes, dialog submissions |
| RESP-01 | Usuario pode utilizar as principais telas do portal, dos modulos, das listagens e dos detalhes em desktop e mobile com navegacao clara | Supported by: useIsMobile hook (768px breakpoint), DataTable responsive column hiding pattern established, sidebar mobile drawer already works, NavigationTransition built -- mobile pipeline tabs, bottom-sheet overlays, detail responsive stacking, and font/spacing adjustments still needed |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Purpose | Why Standard |
|---------|---------|--------------|
| next + next-themes | App framework + dark mode | Project foundation, class-based theme switching |
| @workspace/ui (shadcn) | Component library | All UI primitives, skeletons, empty states, dialogs, sheets |
| sonner | Toast notifications | Already integrated via `<Toaster />` in platform layout |
| @tanstack/react-table | Data tables | Already powering DataTable with column visibility |
| @hello-pangea/dnd | Drag and drop | Already powering pipeline boards |
| lucide-react | Icons | Standard icon library per project conventions |
| react-hook-form + zod | Forms | Already powering form submissions |

### Supporting (already installed)
| Library | Purpose | When to Use |
|---------|---------|-------------|
| vitest + @testing-library/react | Testing | Wave 0 harness already configured |
| @vitejs/plugin-react | Vitest JSX transform | Required since Next.js tsconfig uses jsx: preserve |

### No New Dependencies Needed
This phase requires NO new package installations. All primitives are built and all libraries are installed.

## Architecture Patterns

### Already-Built Primitives (from Plans 00 and 01)

The following components and utilities exist and MUST be used (not recreated):

**Shared UI components (`@workspace/ui`):**
- `EmptyState` -- convenience wrapper: `{ icon, title, description, action }`
- `Empty`, `EmptyIcon`, `EmptyTitle`, `EmptyDescription`, `EmptyActions` -- compound component
- `TableSkeleton` -- `{ rowCount, columnCount, className }`
- `CardGridSkeleton` -- `{ itemCount, className }`
- `PipelineSkeleton` -- `{ columnCount, cardsPerColumn, className }`
- `DetailSkeleton` -- `{ sectionCount, className }`
- `DataTable` -- has `emptyState`, `columnVisibility`, `onColumnVisibilityChange` props
- `BadgeOverflow` -- exported from data-table: `{ items, max, renderBadge }`

**App-level components:**
- `EmptyState` at `@/components/platform/states/empty-state` -- simpler local version with defaults
- `TableSkeleton`, `CardGridSkeleton`, `PipelineSkeleton`, `DetailSkeleton` at `@/components/platform/states/skeletons` -- lighter local wrappers with `data-testid` attributes
- `NavigationTransition` -- fade/slide transition + scroll reset on route change

**Utilities:**
- `useSimulatedLoading(enabled?)` at `@/lib/use-simulated-loading` -- 800ms dev delay
- `showSuccessToast(msg)`, `showInfoToast(msg)`, `showErrorToast(msg)`, `showUndoToast(msg, onUndo)`, `showPdfReadyToast(onDownload)` at `@/lib/toast-helpers`
- `useIsMobile()` at `@workspace/ui/hooks/use-mobile` -- returns true below 768px

**Error surfaces:**
- `/erro` page with inline SVG illustration, retry, and home link
- `global-error.tsx` with raw HTML (replaces root layout on crash)

**Test infrastructure:**
- `vitest.config.ts` configured with jsdom, @vitejs/plugin-react, path aliases
- Test files in `__tests__/` directories alongside components
- Existing specs: `empty-states.test.tsx`, `loading-and-feedback.test.tsx`, `responsive-layouts.test.tsx`

### Adoption Status Inventory

| Screen/Module | Loading State | Empty/No-Results | Toast Feedback | Responsive Mobile |
|---------------|:------------:|:----------------:|:--------------:|:-----------------:|
| Portal Dashboard | YES (CardGridSkeleton) | partial | NO | partial |
| Budget Requests List | YES (TableSkeleton) | YES (EmptyState) | NO | partial (column hiding) |
| CRM Workspace | YES (Table/Pipeline) | YES (EmptyState) | NO | NO (no mobile tabs) |
| CRM List | -- (parent handles) | YES (emptyState prop) | NO | partial (column hiding) |
| CRM Pipeline | -- (parent handles) | YES (EmptyState) | NO | NO (desktop-only kanban) |
| Anteproject Workspace | YES (Table/Pipeline) | YES (EmptyState) | NO | NO (no mobile tabs) |
| Anteproject List | -- (parent handles) | YES (emptyState prop) | NO | partial (column hiding) |
| Anteproject Pipeline | -- (parent handles) | YES (EmptyState) | NO | NO (desktop-only kanban) |
| Projects List | YES (TableSkeleton) | partial | NO | partial |
| Works Workspace | NO | NO | NO | NO |
| Proposals List | YES | partial | NO | partial |
| Price Table | YES | partial | NO | partial |
| Drive | NO | YES (custom) | NO | partial |
| Comunicacao Mural | NO | partial | NO | partial |
| Detail Pages (all 6) | NO (no DetailSkeleton) | n/a | NO | NO (no mobile stacking) |

### Established Patterns for Adoption

**Loading state pattern (follow CRM/Anteprojects):**
```tsx
const isLoading = useSimulatedLoading()
// In render:
{isLoading ? <TableSkeleton rows={8} /> : <ActualContent />}
```

**Empty state pattern (follow Budget Requests):**
```tsx
// Full-list empty
if (items.length === 0) {
  return <EmptyState icon={SearchIcon} title="..." description="..." action={...} />
}
// No-results from filters
const noResultsState = <EmptyState icon={FilterXIcon} title="Nenhum resultado" ... />
<DataTable ... emptyState={hasActiveFilters ? noResultsState : undefined} />
```

**Responsive column hiding (follow CRM List):**
```tsx
// In cell renderer:
<span className="hidden md:table-cell">{value}</span>  // hidden on mobile
<span className="hidden lg:table-cell">{value}</span>  // hidden on mobile+tablet
```

**Toast usage pattern (NOT YET adopted anywhere -- Plan 05 must introduce):**
```tsx
import { showSuccessToast, showErrorToast, showUndoToast } from "@/lib/toast-helpers"
// After successful form submission:
showSuccessToast("Solicitacao enviada com sucesso")
// After stage change:
showUndoToast("Etapa alterada para Proposta", () => revertStageChange())
// After simulated PDF export:
showPdfReadyToast(() => console.log("Download simulado"))
```

### Pattern: Mobile Pipeline Tabs (NEW -- Plan 04)

The CRM and Anteproject pipelines currently render desktop-only kanban boards. Mobile must use tabs:

```tsx
const isMobile = useIsMobile()

{isMobile ? (
  <Tabs defaultValue={stages[0]} className="w-full">
    <TabsList className="w-full overflow-x-auto">
      {stages.map(stage => (
        <TabsTrigger key={stage.id} value={stage.id}>
          {stage.label} ({stage.count})
        </TabsTrigger>
      ))}
    </TabsList>
    {stages.map(stage => (
      <TabsContent key={stage.id} value={stage.id}>
        {/* Cards for this stage -- no drag-and-drop */}
        {stage.items.map(item => <PipelineCard key={item.id} {...item} />)}
      </TabsContent>
    ))}
  </Tabs>
) : (
  <DragDropContext onDragEnd={onDragEnd}>
    {/* Existing desktop kanban */}
  </DragDropContext>
)}
```

### Pattern: Bottom Sheet for Mobile Modals (NEW -- Plan 04)

```tsx
const isMobile = useIsMobile()

{isMobile ? (
  <Sheet>
    <SheetTrigger asChild>{trigger}</SheetTrigger>
    <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto">
      <SheetTitle>Title</SheetTitle>
      {content}
    </SheetContent>
  </Sheet>
) : (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent>
      <DialogTitle>Title</DialogTitle>
      {content}
    </DialogContent>
  </Dialog>
)}
```

### Pattern: Destructive Confirmation (NEW -- Plan 04)

```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger } from "@workspace/ui/components/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Excluir</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmar exclusao</AlertDialogTitle>
      <AlertDialogDescription>
        Esta acao nao pode ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Pattern: Journey Page Timeline (NEW -- Plan 06)

```
/jornada page structure:
- Horizontal timeline with connected cards
- Each card: icon, module name, active item count
- Cards connected by arrow lines
- Empty modules hidden from timeline
- Entry in sidebar under OPERACAO group
```

### Pattern: Lineage Section in Detail Pages (NEW -- Plan 07)

```tsx
// "Registro" section in detail page sidebar
<Card>
  <CardHeader>
    <CardTitle>Registro</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col gap-2">
      {originEntity && (
        <Link href={originEntity.href}>
          <Badge variant="outline">{originEntity.label}</Badge>
        </Link>
      )}
      {nextEntity && (
        <Link href={nextEntity.href}>
          <Badge variant="outline">{nextEntity.label}</Badge>
        </Link>
      )}
    </div>
  </CardContent>
</Card>
```

### Project Structure (relevant new files)

```
apps/web/
  app/(platform)/
    jornada/
      page.tsx                    # NEW - Journey timeline page
  components/platform/
    jornada/
      journey-timeline.tsx        # NEW - Timeline component
      journey-card.tsx            # NEW - Module card in timeline
    states/
      empty-state.tsx             # EXISTS - local EmptyState
      skeletons.tsx               # EXISTS - local skeleton wrappers
    crm/
      crm-pipeline-board.tsx      # MODIFY - add mobile tabs branch
    anteprojects/
      anteproject-pipeline-board.tsx # MODIFY - add mobile tabs branch
    projects/
      works-pipeline-board.tsx    # MODIFY - add mobile tabs branch
  lib/
    toast-helpers.ts              # EXISTS - ready for adoption
    use-simulated-loading.ts      # EXISTS - ready for adoption
    platform-config.ts            # MODIFY - add "Jornada" entry
    journey-data.ts               # NEW - mock data for journey
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Loading skeletons | Custom animate-pulse divs | `@/components/platform/states/skeletons` wrappers | Already built with exact dimensions matching real components |
| Empty states | Custom empty state divs | `@/components/platform/states/empty-state` | Already built following shadcn Empty compound pattern |
| Toast notifications | Custom notification system | `@/lib/toast-helpers` | Already built with correct durations and sonner integration |
| Responsive detection | Custom window resize listener | `useIsMobile()` from @workspace/ui/hooks | Already built with matchMedia and correct 768px breakpoint |
| Column visibility | Manual column show/hide logic | DataTable `columnVisibility` prop | Already built into shared DataTable component |
| Badge overflow | Manual truncation with counters | `BadgeOverflow` from DataTable | Already built with tooltip for overflow items |
| Confirmation dialogs | Custom modal with confirm/cancel | `AlertDialog` from @workspace/ui | shadcn component with proper accessibility |
| Bottom sheets | Custom sliding panel | `Sheet` from @workspace/ui with `side="bottom"` | Already installed, handles animation and backdrop |
| Route transitions | Custom animation logic | `NavigationTransition` wrapper | Already built with fade/slide and scroll reset |

**Key insight:** Plan 01 front-loaded all the primitives. The remaining plans should ONLY adopt and compose -- never recreate.

## Common Pitfalls

### Pitfall 1: Duplicating EmptyState Implementations
**What goes wrong:** Two EmptyState implementations exist -- one in `@workspace/ui/components/empty-state.tsx` (full) and one in `@/components/platform/states/empty-state.tsx` (simple local). Plans might create a third.
**Why it happens:** The local version was built for Plan 01 alongside the @workspace/ui version.
**How to avoid:** Use ONLY the local `@/components/platform/states/empty-state` for consistency with existing screens. All current adoptions use this version.
**Warning signs:** Import from `@workspace/ui/components/empty-state` in page components.

### Pitfall 2: Toast Helpers Never Adopted
**What goes wrong:** Toast helpers exist in `@/lib/toast-helpers.ts` but are currently used ONLY in tests. If Plan 05 doesn't systematically adopt them, STAT-03 fails.
**Why it happens:** Plans 00-01 created the helpers but didn't modify existing form/action code to use them.
**How to avoid:** Plan 05 must explicitly wire toast calls into: form submissions, stage changes, dialog confirmations, PDF export, file upload simulation.
**Warning signs:** `showSuccessToast` etc. still only appear in test files after Plan 05 completes.

### Pitfall 3: Mobile Pipeline Without Stage Change
**What goes wrong:** Drag-and-drop is disabled on mobile, but users have no way to change pipeline stages.
**Why it happens:** Desktop uses drag to change stages; mobile tabs show cards read-only.
**How to avoid:** The decision specifies "mudar etapa via select no detalhe" -- detail pages must have a stage change select (CRM already has `CrmStageChangeSelect`; verify it works on mobile).
**Warning signs:** Mobile user can view pipeline but cannot change any card's stage.

### Pitfall 4: Navigation Transition Double-Render
**What goes wrong:** NavigationTransition uses state to swap children, which can cause visible flicker.
**Why it happens:** The 150ms fade-out swaps `displayChildren` on timeout.
**How to avoid:** Keep transition duration at 150ms (already set). Don't add additional transitions on page components.
**Warning signs:** Content flashing or appearing twice during navigation.

### Pitfall 5: Dark Mode Issues Only Found Late
**What goes wrong:** Dark mode contrast or color issues discovered after most plans are done.
**Why it happens:** Implementation focuses on light mode, dark mode tested last.
**How to avoid:** Every plan should verify its changes in both themes. Use semantic colors only (`bg-background`, `text-muted-foreground`, etc.). Never use raw color values.
**Warning signs:** Components using hardcoded colors like `text-gray-500` instead of `text-muted-foreground`.

### Pitfall 6: Sheet Missing Title Accessibility
**What goes wrong:** Sheet used for mobile modals without SheetTitle causes accessibility violation.
**Why it happens:** Developer forgets SheetTitle or uses Dialog content directly.
**How to avoid:** shadcn skill rule: "Dialog, Sheet, and Drawer always need a Title." Use `className="sr-only"` if visually hidden.
**Warning signs:** Console warning about missing aria-labelledby.

### Pitfall 7: Jornada Page Over-Engineered
**What goes wrong:** Journey page becomes a complex interactive visualization instead of a simple timeline.
**Why it happens:** Timeline with arrows sounds like it needs a diagram library.
**How to avoid:** Build with pure CSS/Tailwind + Flexbox. Cards in a horizontal flex container with CSS pseudo-element arrows between them. No diagram library needed.
**Warning signs:** Considering installing a timeline/diagram library.

## Code Examples

### Existing: Loading + Empty State Adoption (Budget Requests -- reference pattern)
```tsx
// Source: apps/web/components/platform/budget-requests/budget-requests-list-page.tsx
const isLoading = useSimulatedLoading()

// Loading
if (isLoading) {
  return <TableSkeleton rows={8} />
}

// Empty (no data at all)
if (requests.length === 0) {
  return (
    <EmptyState
      icon={FileSearchIcon}
      title="Nenhuma solicitacao encontrada"
      description="Ajuste os filtros..."
      action={<Button asChild><Link href="/orcamentos/nova">Nova solicitacao</Link></Button>}
    />
  )
}

// No-results (filters applied, no matches)
const noResultsState = (
  <EmptyState
    icon={FilterXIcon}
    title="Nenhuma solicitacao encontrada"
    description="Tente ajustar os filtros..."
    action={<Button variant="outline" onClick={handleClearFilters}>Limpar filtros</Button>}
  />
)
<DataTable ... emptyState={hasActiveFilters ? noResultsState : undefined} />
```

### Existing: Workspace Loading Toggle (CRM -- reference pattern)
```tsx
// Source: apps/web/components/platform/crm/crm-workspace-page.tsx
{isLoading ? (
  viewMode === "lista" ? (
    <TableSkeleton rows={8} />
  ) : (
    <PipelineSkeleton stages={5} />
  )
) : viewMode === "lista" ? (
  <CrmListPage opportunities={filteredOpportunities} />
) : (
  <CrmPipelineBoard opportunities={filteredOpportunities} onDragEnd={onDragEnd} />
)}
```

### Existing: Profile + Theme Switcher Dropdown
```tsx
// Source: apps/web/components/platform/profile-switcher.tsx
// Theme options already in dropdown with icons and check marks
const THEME_OPTIONS = [
  { value: "light", label: "Tema claro", icon: SunIcon },
  { value: "dark", label: "Tema escuro", icon: MoonIcon },
  { value: "system", label: "Seguir sistema", icon: MonitorIcon },
]
```

### Existing: Responsive Column Hiding (CRM List)
```tsx
// Source: apps/web/components/platform/crm/crm-list-page.tsx
{
  accessorKey: "company",
  header: "Cliente/Empresa",
  cell: ({ row }) => (
    <span className="hidden md:table-cell">{row.original.company}</span>
  ),
},
```

### Existing: Next-Step Handoff Buttons
```tsx
// CRM detail -> Anteproject
<Link href={`/anteprojetos?sourceOpportunityId=${opportunity.id}`}>
  Criar anteprojeto
</Link>

// Anteproject detail -> Proposal
<Link href={`/propostas/nova?anteprojectId=${anteproject.id}`}>
  Gerar proposta
</Link>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Inline loading placeholders | Typed skeleton components | Plan 08-01 | Consistent loading states across all screens |
| Ad-hoc empty messages | EmptyState compound component | Plan 08-01 | Standardized empty/no-results UX |
| No toast feedback | Toast helpers with standard durations | Plan 08-01 | Ready for adoption but NOT YET wired |
| Desktop-only pipelines | Mobile tabs planned | Plan 08-04 (upcoming) | useIsMobile + Tabs pattern |
| No journey visualization | /jornada page planned | Plan 08-06 (upcoming) | Timeline connecting all modules |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x + @testing-library/react |
| Config file | `apps/web/vitest.config.ts` |
| Quick run command | `cd apps/web && pnpm vitest run --reporter=verbose` |
| Full suite command | `cd apps/web && pnpm vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| STAT-01 | Skeleton rendering with correct structure | unit | `cd apps/web && pnpm vitest run components/platform/states/__tests__/loading-and-feedback.test.tsx` | YES |
| STAT-02 | EmptyState rendering with all prop variants | unit | `cd apps/web && pnpm vitest run components/platform/states/__tests__/empty-states.test.tsx` | YES |
| STAT-03 | Toast helpers call sonner with correct params | unit | `cd apps/web && pnpm vitest run components/platform/states/__tests__/loading-and-feedback.test.tsx` | YES (toast section) |
| RESP-01 | useIsMobile breakpoint, DataTable responsive, mobile tabs, header h-16 | unit | `cd apps/web && pnpm vitest run components/platform/responsive/__tests__/responsive-layouts.test.tsx` | YES |
| PIPE-04 | Journey page renders timeline with module cards | unit | TBD -- needs new test file | NO (Wave 0 gap) |

### Sampling Rate
- **Per task commit:** `cd apps/web && pnpm vitest run --reporter=verbose`
- **Per wave merge:** `cd apps/web && pnpm vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `components/platform/jornada/__tests__/journey-page.test.tsx` -- covers PIPE-04 journey rendering
- [ ] Verify existing test specs still pass with current codebase changes

## Open Questions

1. **Works Pipeline Loading State**
   - What we know: `works-workspace-page.tsx` does NOT use `useSimulatedLoading` or any skeleton
   - What's unclear: Whether this was intentional or an oversight from Phase 6
   - Recommendation: Plan 02 should add loading states to Works workspace following the CRM pattern

2. **Drive and Comunicacao Loading States**
   - What we know: Neither module uses `useSimulatedLoading`
   - What's unclear: Whether these modules are considered "main screens" for STAT-01
   - Recommendation: Add loading states to both for completeness (they are part of the platform)

3. **Detail Page Loading States**
   - What we know: No detail page currently uses DetailSkeleton
   - What's unclear: Whether the detail pages should show skeletons (they load instantly from mock data)
   - Recommendation: Add DetailSkeleton with `useSimulatedLoading` to maintain consistency and demonstrate the skeleton

4. **Journey Data Source**
   - What we know: The /jornada page needs counts of active items per module
   - What's unclear: Whether to aggregate from existing data files or create a dedicated journey-data.ts
   - Recommendation: Create a `journey-data.ts` that imports from each module's data file and aggregates counts

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection of all files in `apps/web/components/platform/` and `packages/ui/src/components/`
- Existing test files in `__tests__/` directories
- `vitest.config.ts` configuration
- `package.json` dependency listing

### Secondary (MEDIUM confidence)
- CONTEXT.md decisions document -- user-locked implementation choices
- ROADMAP.md plan descriptions -- intent for each plan slot

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all packages already installed, versions verified in codebase
- Architecture: HIGH - patterns established by 7+ prior phases, primitives already built
- Pitfalls: HIGH - based on direct inspection of what exists vs what's missing
- Adoption gaps: HIGH - systematic grep across all modules confirmed which screens lack states

**Research date:** 2026-03-21
**Valid until:** 2026-04-21 (stable -- no external dependencies changing)
