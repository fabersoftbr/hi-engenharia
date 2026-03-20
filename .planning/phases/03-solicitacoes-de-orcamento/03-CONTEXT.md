# Phase 3: Solicitações de Orçamento - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Entregar o fluxo visual completo de entrada comercial por solicitação de orçamento. Inclui listagem com filtros, formulário de nova solicitação, tela de detalhes com status timeline, e confirmação de envio. Criar oportunidades e propostas a partir de uma solicitação são conexões visuais, não criação real.

</domain>

<decisions>
## Implementation Decisions

### List Layout & Density
- Table layout using DataTable component from @workspace/ui
- Columns: ID, Cliente, Telefone, Cidade, Status, Data
- Filter bar: Status dropdown + Search field (client name/phone) + "Pendentes" toggle
- Row interaction: Click row to navigate to detail — no inline action buttons
- Pagination: Standard DataTable pagination

### Form Structure
- Single page form (not multi-step wizard)
- 3 sections with clear headers:
  1. Dados do cliente: Nome, Telefone, Cidade
  2. Consumo/Projeto: Consumo médio mensal, Observações
  3. Anexos: File list with upload button pattern
- Required field indicator: Asterisk (*) next to label
- Validation: Inline error messages below each invalid field (shadcn Form pattern)

### Detail View Layout
- 2-column layout on desktop:
  - Left column: Client info (nome, telefone, cidade), consumption data, notes
  - Right column: Status timeline, attachments list, action buttons
- Actions available: Change status, Edit request, Create proposal
- Status displayed as horizontal timeline (not just badge): Novo → Em análise → Aprovado/Recusado
- Attachments: List with download/view simulated actions

### Status & Confirmation
- 4 status options: Novo → Em análise → Aprovado | Recusado
- Status change: Action button opens dialog to select new status
- Submission confirmation: Modal dialog (not full page)
- Next actions in confirmation modal: View request, New request, Back to list

### Empty States
- Empty list: Illustration/icon + "Nenhuma solicitação encontrada" + "Nova solicitação" button
- No search results: Icon + "Nenhum resultado para [termo]" + "Limpar filtros" button

### Mobile Behavior
- Detail page: Single column stack
  - Order: Status timeline → Actions → Attachments → Client info/Notes
- Form: Single column, same sections, stacked vertically
- List: DataTable with horizontal scroll or responsive columns (ID, Cliente, Status only on mobile)

### Claude's Discretion
- Exact column widths and responsive breakpoints
- Skeleton loading states for list and detail
- Toast notification wording for status changes
- Animation/transition for confirmation modal

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data & Configuration
- `apps/web/lib/platform-config.ts` — Module configuration, profile visibility, route definitions
- `apps/web/lib/dashboard-data.ts` — Mock data pattern: typed interfaces, getter functions, profile filtering

### Existing Components
- `apps/web/components/platform/portal-dashboard.tsx` — Dashboard composition pattern
- `apps/web/components/platform/dashboard/*.tsx` — Section component organization

### UI Package
- `@workspace/ui/components/data-table` — DataTable with sorting, filtering, pagination
- `@workspace/ui/components/form` — Form components with validation patterns
- `@workspace/ui/components/dialog` — Modal dialog for confirmation
- `@workspace/ui/components/badge` — Status badges
- `@workspace/ui/components/button` — Action buttons

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `DataTable` from @workspace/ui: Already has sorting, filtering, pagination — use for request list
- `Form` components from @workspace/ui: FormField, FormItem, FormLabel, FormControl, FormMessage — use for new request form
- `Dialog` from @workspace/ui: Already used in login flow — reuse pattern for confirmation modal
- `PlatformShellProvider`: Provides activeProfile context — use for profile-aware filtering if needed
- Mock data pattern from `dashboard-data.ts`: Follow interface + getter function + mock array pattern

### Established Patterns
- Page components delegate to composed components (see `portal/page.tsx` → `PortalDashboard`)
- Section components in subdirectories (see `dashboard/` folder pattern)
- Mock data in `lib/*-data.ts` files with typed interfaces
- Profile-based visibility via `platform-config.ts`

### Integration Points
- Route: `/orcamentos` — already exists as placeholder, will be replaced
- Sidebar: Module already configured in `platform-config.ts` with "operation" group
- Breadcrumbs: "Orcamentos" breadcrumb already defined
- Dashboard quick actions: "Nova solicitacao de orcamento" already links to `/orcamentos`

</code_context>

<specifics>
## Specific Ideas

- Form should feel like a standard business intake form — clear sections, not overwhelming
- Status timeline should be simple horizontal stepper, not a complex Gantt-style visualization
- Confirmation modal should be quick and dismissible — user can act or close

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-solicitacoes-de-orcamento*
*Context gathered: 2026-03-20*
