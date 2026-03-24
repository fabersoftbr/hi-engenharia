# Phase 7: Drive e Comunicacao - Research

**Researched:** 2026-03-20
**Domain:** File management UI (Drive) + Announcements board (Comunicacao) -- frontend-only with simulated interactions
**Confidence:** HIGH

## Summary

Phase 7 adds two frontend-only modules to the Hi Engenharia platform: a Drive (file management) with folder navigation separated by Oportunidades/Obras, and a Comunicacao (announcements board) with a card-based feed, detail pages, and a simulated publication wizard. Both modules build entirely on the established patterns from Phases 3-6 (DataTable for file listings, Card for feed items, Dialog for wizards, Sheet for preview panels, toast for feedback).

The Drive module introduces tabbed navigation (Oportunidades/Obras), hierarchical folder browsing with breadcrumbs, file DataTable with multi-select checkboxes, a Sheet-based preview panel, and simulated upload/download toasts. The Comunicacao module introduces a card feed layout with category badges, detail/edit pages with dynamic routes, and a 2-step Dialog wizard for publication. Both modules follow the established data contract pattern (`drive-data.ts`, `comunicacao-data.ts`) and integrate with the existing profile-based visibility system in `platform-config.ts`.

Three shadcn/ui components need installation: **Tabs** (Drive section navigation), **Checkbox** (file multi-select), and **Progress** (upload/download progress in toasts). The existing Sheet, Dialog, DataTable, Card, Badge, Avatar, DropdownMenu, and Breadcrumb components cover the remaining UI needs.

**Primary recommendation:** Follow established Phase 3-6 patterns exactly -- data contracts in `lib/`, page components in `components/platform/{module}/`, route pages as thin wrappers. Install Tabs, Checkbox, and Progress via shadcn CLI before implementation begins.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Drive -- Navegacao e Estrutura
- Navegacao principal: Tabs no topo -- "Oportunidades" / "Obras"
- Estrutura de pastas: Uma pasta por Oportunidade/Obra (entidades do sistema)
- Organizacao da lista: Lista alfabetica simples por nome da pasta
- Permissoes por perfil: Admin ve tudo, Operations ve apenas Obras, Commercial ve apenas Oportunidades
- Conteudo da linha de pasta: Nome + data de criacao + contador de arquivos
- Acoes em pasta: Menu de 3 pontos -- Upload, Renomear, Excluir
- Tooltip de conexao: Hover na pasta mostra info da oportunidade/obra (status, responsavel)
- Busca: Busca em pastas e arquivos -- mostra pasta contendo o arquivo encontrado
- Breadcrumb: Completo com navegacao -- "Drive > [Secao] > [Pasta] > [Subpasta]"

#### Drive -- Estrutura Interna de Pastas
- Dentro da pasta de entidade: Subpastas padrao ("Contratos", "Projetos", "Fotos") + arquivos soltos
- Ordenacao: Data de upload (recentes primeiro)
- Toolbar: Busca + botao "Nova pasta" + botao "Upload"

#### Drive -- Listagem de Arquivos
- Layout: DataTable padrao (consistente com Fases 3-5)
- Colunas: Nome (truncado + tooltip), tipo (icone), tamanho, data de upload
- Tipos de arquivo: Icones diferentes por tipo (PDF, Imagem, Word, Excel, Outros)
- Autor: Avatar + nome ao lado
- Formato de data: DD/MM/AAAA (brasileiro)
- Acoes em arquivo: Menu de 3 pontos -- Download, Visualizar, Renomear, Excluir
- Selecao multipla: Checkbox em cada linha, toolbar muda para contador + acoes inline (Download + Excluir)
- Confirmacao de exclusao: Dialog "Tem certeza que deseja excluir?"

#### Drive -- Preview de Arquivo
- Abertura: Painel lateral (Slide-over) -- mantem listagem visivel
- Conteudo do preview: Icone do tipo de arquivo + botao "Abrir" (preview nao disponivel para nenhum tipo)
- Metadados no painel: Nome, tipo, tamanho, data, autor (sem permissao)
- Fechamento: Botao X + clique fora do painel
- Preview mobile: Sheet (bottom sheet)

#### Drive -- Upload e Download
- Upload: Botao simples abre explorador + toast de progresso
- Multiplos uploads: Toast unico com contador "Enviando X de Y arquivos..."
- Erro de upload: Item na lista com status de erro + botao "Tentar novamente"
- Download: Toast com barra de progresso + "Download concluido" ao final
- Download em lote: Simulado como ZIP (toast de sucesso)

#### Drive -- Estados e Mobile
- Estado vazio de secao: Mensagem "Nenhum arquivo encontrado" + botao "Fazer upload"
- Pasta vazia: Mensagem + botao "Fazer upload"
- Mobile: Tabs + cards empilhados verticalmente
- Drag-and-drop: Nao suportado -- apenas botao de upload

#### Comunicacao -- Layout do Mural
- Layout: Cards em lista vertical (feed simples e escaneavel)
- Conteudo do card: Titulo, resumo (2 linhas), categoria (badge colorido), data, autor (avatar + nome), badge de destaque
- Destaques: Visual diferenciado (borda/fundo) + fixados no topo da lista
- Ordenacao: Destaques primeiro, depois por data (recentes primeiro)
- Categorias (5): Geral, Operacional, Comercial, RH, TI -- cores diferentes por categoria
- Toolbar: Filtros (dropdown categoria + seletor periodo) + campo de busca + botao "Novo comunicado"
- Estado vazio: "Nenhum comunicado publicado" + botao "Publicar"

#### Comunicacao -- Detalhe do Comunicado
- Clique no card: Navega para pagina de detalhe `/comunicacao/[id]`
- Layout do detalhe: Conteudo completo + metadados (data, autor, categoria) + botao voltar
- Acoes: Botao "Editar" (navega para edicao) + botao "Excluir" (com confirmacao)

#### Comunicacao -- Publicacao de Comunicado
- Fluxo: Modal wizard 2 etapas (Etapa 1: Titulo + Categoria; Etapa 2: Conteudo textarea + Destaque checkbox)
- Preview: Botao "Visualizar" opcional abre modal com preview antes de publicar
- Rascunho: Botao "Salvar rascunho" salva localmente (localStorage)
- Validacao: Titulo + categoria + conteudo obrigatorios
- Sucesso: Toast "Comunicado publicado" + navega para pagina de detalhe

#### Comunicacao -- Edicao e Exclusao
- Edicao: Pagina dedicada `/comunicacao/[id]/editar` com mesmo formulario
- Exclusao: Botao no detalhe + dialog de confirmacao

#### Comunicacao -- Mobile
- Layout: Cards empilhados verticalmente (mesmo layout do desktop)

### Claude's Discretion
- Espacamento e tipografia exatos
- Skeleton/loading states (padrao definido na Fase 8)
- Conteudo mockado especifico (nomes, textos, datas)
- Cores exatas das categorias
- Animacao do painel lateral de preview
- Largura exata do painel de preview

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DRIV-01 | Usuario pode navegar por estruturas de pastas separadas para Oportunidades e Obras | Tabs component (needs install), folder list with DataTable/Card, breadcrumb navigation, profile-based tab visibility |
| DRIV-02 | Usuario pode visualizar listagens de arquivos com metadados, tipo de arquivo e permissoes simuladas | DataTable with file type icons, author Avatar, size formatting, date formatting DD/MM/AAAA, Checkbox for multi-select |
| DRIV-03 | Usuario pode acionar upload, download e visualizacao de arquivo apenas como interacoes simuladas | Sheet for file preview panel, toast (sonner) for upload/download progress, simulated file input, Dialog for delete confirmation |
| COMM-01 | Usuario pode visualizar um mural de comunicados com filtros por data e categoria | Card-based feed layout, Badge for categories with colors, Select for filters, search Input, toolbar pattern |
| COMM-02 | Usuario pode abrir o detalhe de um comunicado com conteudo, data e destaque visual | Dynamic route `/comunicacao/[id]`, detail page with full content, category badge, author info, edit/delete actions |
| COMM-03 | Usuario pode percorrer um fluxo simulado de publicacao de comunicado | Dialog wizard (2-step), form validation (Zod or inline), localStorage draft save, toast success feedback, redirect to detail |

</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16 | App Router, file-based routing, SSR/SSG | Project foundation |
| React | 19 | Component framework | Project foundation |
| Tailwind CSS | 4 | Utility-first styling with oklch tokens | Project foundation |
| @workspace/ui | 0.0.0 | Shared component library (shadcn/ui) | Project monorepo pattern |
| @tanstack/react-table | 8.21.3 | DataTable for file listings | Already used in Phases 3-5 |
| sonner | 2.0.7 | Toast notifications for upload/download feedback | Already configured in platform layout |
| lucide-react | 0.577.0 | Icons (file types, actions, navigation) | Project standard icon library |
| radix-ui | 1.4.3 | Primitives for Sheet, Dialog, Select | Already a dependency |
| zod | 3.25.76 | Form validation (comunicado publication) | Already a dependency |

### Components to Install (via shadcn CLI)
| Component | Purpose | Why Needed |
|-----------|---------|------------|
| tabs | Drive section navigation (Oportunidades/Obras) | Not installed; required for top-level Drive navigation |
| checkbox | File multi-select in DataTable rows | Not installed; required for file selection feature |
| progress | Upload/download progress indication in toasts | Not installed; required for simulated progress feedback |
| alert-dialog | Delete confirmation dialogs (folders, files, comunicados) | Not installed; proper accessible confirmation pattern |

### Already Installed Components Used
| Component | Purpose in Phase 7 |
|-----------|-------------------|
| DataTable | File listing with columns, pagination, row click |
| Card | Comunicado feed cards, folder cards on mobile |
| Badge | Category badges (Geral, Operacional, Comercial, RH, TI), destaque badge |
| Avatar | Author display on files and comunicados |
| Dialog | Publication wizard (2-step), preview modal |
| Sheet | File preview slide-over panel (right side desktop, bottom on mobile) |
| DropdownMenu | 3-dot action menus on folders and files |
| Breadcrumb | Drive navigation path |
| Input | Search fields in toolbars |
| Select | Category filter, period filter |
| Textarea | Comunicado content editor |
| Button | Actions throughout |
| Tooltip | Folder connection info (hover shows opportunity/obra details) |
| Separator | Visual dividers |
| Skeleton | Loading placeholders (if needed) |

**Installation commands:**
```bash
pnpm dlx shadcn@latest add tabs -c apps/web
pnpm dlx shadcn@latest add checkbox -c apps/web
pnpm dlx shadcn@latest add progress -c apps/web
pnpm dlx shadcn@latest add alert-dialog -c apps/web
```

## Architecture Patterns

### Recommended Project Structure
```
apps/web/
  app/(platform)/
    drive/
      page.tsx                              # Drive main page (replaces placeholder)
    comunicacao/
      page.tsx                              # Comunicacao mural page (replaces placeholder)
      [comunicadoId]/
        page.tsx                            # Comunicado detail page
        editar/
          page.tsx                          # Comunicado edit page
  components/platform/
    drive/
      drive-page.tsx                        # Main Drive client component with tabs + folder navigation
      drive-folder-list.tsx                 # Folder list (cards or table rows)
      drive-folder-row.tsx                  # Single folder row with actions menu
      drive-file-table.tsx                  # File DataTable with checkbox selection
      drive-file-row-actions.tsx            # File 3-dot menu (Download, View, Rename, Delete)
      drive-file-preview.tsx                # Sheet-based file preview panel
      drive-toolbar.tsx                     # Search + "Nova pasta" + "Upload" buttons
      drive-upload-handler.tsx              # Simulated upload with toast progress
      drive-breadcrumb.tsx                  # Drive-specific breadcrumb (Drive > Section > Folder > Subfolder)
      drive-empty-state.tsx                 # Empty states for section and folder
    comunicacao/
      comunicacao-mural-page.tsx            # Main mural feed with filters
      comunicacao-card.tsx                   # Single comunicado card in feed
      comunicacao-detail-page.tsx           # Full comunicado detail
      comunicacao-edit-page.tsx             # Edit form page
      comunicacao-toolbar.tsx               # Category filter + period + search + "Novo comunicado"
      comunicacao-publish-dialog.tsx        # 2-step wizard dialog
      comunicacao-category-badge.tsx        # Color-coded category badge
  lib/
    drive-data.ts                           # Drive data contract (folders, files, types, helpers)
    comunicacao-data.ts                     # Comunicacao data contract (comunicados, categories, helpers)
```

### Pattern 1: Data Contract (established in Phases 3-5)
**What:** Centralized mock data, TypeScript interfaces, metadata records, and helper functions in a single `lib/*-data.ts` file.
**When to use:** Every module follows this pattern.
**Example structure:**
```typescript
// lib/drive-data.ts
export type DriveSection = "oportunidades" | "obras"
export type FileType = "pdf" | "image" | "word" | "excel" | "other"

export interface DriveFolder {
  id: string
  name: string
  section: DriveSection
  entityId: string          // links to CRM opportunity or project/obra
  entityStatus: string      // for tooltip
  entityResponsible: string // for tooltip
  createdAt: string
  fileCount: number
  subfolders: DriveSubfolder[]
  files: DriveFile[]
}

export interface DriveFile {
  id: string
  name: string
  type: FileType
  size: number             // bytes
  uploadedAt: string
  author: { id: string; name: string; initials: string }
  status: "ok" | "error"
}

export const DRIVE_FOLDERS: DriveFolder[] = [...]
export function getDriveFolders(section: DriveSection): DriveFolder[]
export function getDriveFolderById(folderId: string): DriveFolder | undefined
```

### Pattern 2: Toolbar + Filter State (established in Phases 3-4)
**What:** Toolbar component receives filter state via props, parent page manages useState for each filter, filtered data computed with useMemo.
**When to use:** Every list/table page.
**Example:** See `budget-requests-toolbar.tsx` and `budget-requests-list-page.tsx` for the canonical pattern.

### Pattern 3: Profile-Based Visibility (established in Phase 1)
**What:** Use `useActiveProfile()` hook + `MODULES` config to determine what the current profile can see. The Drive already has visibility rules in `platform-config.ts`: admin sees all, operations sees all, cliente sees all. For tab-level filtering within Drive, apply the CONTEXT decisions: Admin sees Oportunidades + Obras tabs, Operations sees only Obras, Commercial sees only Oportunidades.
**When to use:** Drive page must filter tabs based on profile.

### Pattern 4: Page Route as Thin Wrapper (established in all phases)
**What:** Route `page.tsx` files are minimal server components that import and render a client component. All logic lives in the client component under `components/platform/`.
**Example from existing code:**
```typescript
// app/(platform)/drive/page.tsx
import { DrivePage } from "@/components/platform/drive/drive-page"
export default function DriveRoute() {
  return <DrivePage />
}
```

### Pattern 5: Sheet for Slide-Over Panel
**What:** The existing Sheet component supports `side="right"` (desktop) and `side="bottom"` (mobile). Use responsive detection to switch. SheetContent has `showCloseButton` prop built in.
**When to use:** File preview panel.

### Pattern 6: Dialog Wizard (multi-step)
**What:** Single Dialog with internal step state managed by useState. Step indicator in header, content switches based on step, navigation buttons in footer.
**When to use:** Comunicado publication flow (2 steps).

### Anti-Patterns to Avoid
- **Do NOT create a custom tree component** -- use simple flat folder list with navigation (click folder to enter, breadcrumb to go back). The Drive is flat, not deeply nested.
- **Do NOT use react-dropzone or drag-and-drop** -- CONTEXT explicitly states no drag-and-drop, only upload button.
- **Do NOT create separate route pages for Drive folder navigation** -- use client-side state to track current folder within the Drive page component. Breadcrumb and folder clicks update state, not URL.
- **Do NOT use localStorage for file data persistence** -- only for comunicado drafts as specified.
- **Do NOT build a rich text editor** -- comunicado content uses a plain Textarea.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tab navigation | Custom div-based tabs | shadcn Tabs component | Accessible, keyboard-navigable, established pattern |
| File type icons | Custom icon mapping system | Simple switch/map with lucide-react icons | FileTextIcon, ImageIcon, FileSpreadsheetIcon, FileIcon from lucide-react |
| Toast with progress | Custom progress overlay | sonner `toast.loading()` + `toast.success()` | Already configured, supports loading/success/error states |
| Delete confirmation | Custom modal | AlertDialog from shadcn | Proper accessible confirmation pattern with cancel/confirm |
| Multi-select table | Custom checkbox logic | @tanstack/react-table row selection + Checkbox | Table already supports selection model, just enable it |
| Date formatting | Custom date formatter | `date.toLocaleDateString("pt-BR")` | Native API, already used in Phases 3-5 |
| File size formatting | Custom size formatter | Simple utility function (bytes to KB/MB) | Tiny helper, not a library concern |
| Category badge colors | Complex variant system | Badge with inline `style` or `cn()` with category-specific classes | 5 categories, simple color map |

**Key insight:** The Drive and Comunicacao modules are standard CRUD-like interfaces. Every UI pattern needed (list, detail, form, toolbar, empty state, confirmation dialog, slide-over panel) has been implemented in prior phases. The only new patterns are: tab-based navigation, multi-select DataTable rows, and a multi-step dialog wizard.

## Common Pitfalls

### Pitfall 1: Over-Engineering Folder Navigation
**What goes wrong:** Building a full file explorer with recursive tree, virtual scrolling, and URL-based routing for each folder level.
**Why it happens:** Drive sounds complex, but the CONTEXT specifies a simple structure: top-level tabs, flat entity folder list, one level of subfolders inside.
**How to avoid:** Use client-side state (`currentSection`, `currentFolderId`, `currentSubfolderId`) to track navigation depth. No URL changes for folder navigation -- just the Drive page with internal state.
**Warning signs:** Creating multiple route segments like `/drive/oportunidades/[folderId]/[subfolderId]`.

### Pitfall 2: DataTable Checkbox Selection Not Working
**What goes wrong:** Checkboxes appear but selection state is lost or doesn't trigger toolbar change.
**Why it happens:** The existing DataTable component does NOT include row selection support. It needs to be extended or the file table needs its own table setup with `getRowSelectionRowModel`.
**How to avoid:** Either extend the shared DataTable or create a custom file-specific table that includes selection. Use `@tanstack/react-table`'s built-in row selection model.
**Warning signs:** Checkbox clicks don't persist, selection count doesn't update.

### Pitfall 3: Breadcrumb Collision with AppBreadcrumbs
**What goes wrong:** The existing `AppBreadcrumbs` component in the app header shows "Drive > Drive", or fails to show the folder path.
**Why it happens:** The current breadcrumb system is route-based and doesn't know about client-side folder navigation state.
**How to avoid:** Two approaches: (a) extend `AppBreadcrumbs` to accept context from Drive, or (b) render a Drive-specific breadcrumb INSIDE the Drive page component, below the header breadcrumb. Option (b) is simpler and matches the CONTEXT requirement for "Drive > [Secao] > [Pasta] > [Subpasta]" as an in-page navigation aid.
**Warning signs:** Duplicate breadcrumbs, missing folder path segments.

### Pitfall 4: Profile Tab Filtering vs Module Visibility
**What goes wrong:** Mixing up module-level visibility (who can see the Drive module at all) with tab-level filtering (which tabs are visible within Drive).
**Why it happens:** `platform-config.ts` shows Drive is visible to admin, operations, and cliente. But the CONTEXT adds internal rules: Operations sees only Obras tab, Commercial sees only Oportunidades tab.
**How to avoid:** Module visibility (route access) stays in `platform-config.ts`. Tab filtering is Drive-internal logic: check `activeProfile` and show/hide tabs accordingly. Note that "commercial" is NOT in Drive's `visibleTo` list, so commercial users won't even reach the Drive page -- they see the RestrictedModuleState.
**Warning signs:** Showing tabs to profiles that shouldn't see them, or blocking access at the wrong level.

### Pitfall 5: Comunicado Detail Route Conflicts
**What goes wrong:** `/comunicacao/[comunicadoId]` route conflicts with potential static routes or the edit page pattern.
**Why it happens:** Next.js App Router uses folder-based routing; need proper segment nesting.
**How to avoid:** Structure routes as: `/comunicacao/page.tsx` (mural), `/comunicacao/[comunicadoId]/page.tsx` (detail), `/comunicacao/[comunicadoId]/editar/page.tsx` (edit). This is standard Next.js dynamic segment pattern.
**Warning signs:** 404 errors when navigating to detail, wrong page rendering.

### Pitfall 6: Upload Progress Toast Timing
**What goes wrong:** Toast appears and disappears too quickly, or multiple toasts stack up.
**Why it happens:** Using `toast()` without managing the toast ID for updates.
**How to avoid:** Use `toast.loading("Enviando...", { id: "upload" })` to create a persistent toast, then `toast.success("Upload concluido", { id: "upload" })` to replace it. Sonner supports updating toasts by ID.
**Warning signs:** Multiple overlapping toasts, toast flashing.

## Code Examples

### File Type Icon Mapping
```typescript
// Utility for mapping file types to lucide-react icons
import {
  FileTextIcon,
  ImageIcon,
  FileSpreadsheetIcon,
  FileIcon,
  FileTypeIcon,
} from "lucide-react"

const FILE_TYPE_ICONS = {
  pdf: FileTextIcon,
  image: ImageIcon,
  word: FileTypeIcon,
  excel: FileSpreadsheetIcon,
  other: FileIcon,
} as const

export function getFileTypeIcon(type: string) {
  return FILE_TYPE_ICONS[type as keyof typeof FILE_TYPE_ICONS] ?? FileIcon
}
```

### File Size Formatting
```typescript
// Utility for human-readable file sizes
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
```

### Sonner Toast with Progress Simulation
```typescript
// Pattern for simulated upload with toast
import { toast } from "sonner"

function handleUpload() {
  const toastId = toast.loading("Enviando 1 de 3 arquivos...")

  // Simulate progress
  setTimeout(() => {
    toast.loading("Enviando 2 de 3 arquivos...", { id: toastId })
  }, 1000)

  setTimeout(() => {
    toast.loading("Enviando 3 de 3 arquivos...", { id: toastId })
  }, 2000)

  setTimeout(() => {
    toast.success("Upload concluido", { id: toastId })
  }, 3000)
}
```

### Category Badge Color Map
```typescript
// Comunicado category metadata
export type ComunicadoCategory = "geral" | "operacional" | "comercial" | "rh" | "ti"

export const COMUNICADO_CATEGORY_META: Record<
  ComunicadoCategory,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  geral: { label: "Geral", variant: "secondary" },
  operacional: { label: "Operacional", variant: "default" },
  comercial: { label: "Comercial", variant: "outline" },
  rh: { label: "RH", variant: "destructive" },
  ti: { label: "TI", variant: "secondary" },
}
```

### Multi-Step Dialog Wizard Pattern
```typescript
// Pattern for 2-step publication wizard
"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"

function PublishDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [step, setStep] = useState(1)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Etapa 1: Informacoes" : "Etapa 2: Conteudo"}
          </DialogTitle>
        </DialogHeader>
        {step === 1 ? <StepOneContent /> : <StepTwoContent />}
        <DialogFooter>
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)}>Voltar</Button>
          )}
          {step === 1 ? (
            <Button onClick={() => setStep(2)}>Proximo</Button>
          ) : (
            <Button onClick={handlePublish}>Publicar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### Drive Tab Filtering by Profile
```typescript
// Pattern for profile-based tab visibility
import { useActiveProfile } from "./platform-shell-provider"

function DrivePage() {
  const { activeProfile } = useActiveProfile()

  // Admin: both tabs. Operations: only Obras. Cliente: both.
  const showOportunidades = activeProfile !== "operations"
  const showObras = activeProfile !== "commercial" // commercial can't even access Drive

  const defaultTab = showOportunidades ? "oportunidades" : "obras"

  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList>
        {showOportunidades && <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>}
        {showObras && <TabsTrigger value="obras">Obras</TabsTrigger>}
      </TabsList>
      {/* ... */}
    </Tabs>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom tabs with divs | shadcn Tabs (Radix-based) | Available in shadcn | Accessible, keyboard nav, ARIA |
| Window.confirm() for deletions | AlertDialog component | shadcn best practice | Accessible, styled, non-blocking |
| Custom toast implementation | sonner with toast ID updates | Already in project | Progress toasts, stacking control |
| Route-based folder navigation | Client-side state navigation | Phase 7 design decision | Simpler, no URL pollution for mock data |

**Deprecated/outdated:**
- The existing `Dialog` component uses `@radix-ui/react-dialog` (older import). The newer Sheet uses `radix-ui` (newer unified package). Both work but imports differ slightly.

## Open Questions

1. **DataTable Row Selection Extension**
   - What we know: The current shared DataTable does NOT support row selection. File multi-select requires checkboxes.
   - What's unclear: Whether to extend the shared DataTable component or create a file-specific table component.
   - Recommendation: Create a file-specific table that builds directly on `@tanstack/react-table` with `enableRowSelection` and the Checkbox component. This avoids breaking the shared component for other modules.

2. **Drive Breadcrumb Integration**
   - What we know: `AppBreadcrumbs` is route-based and shows "Module > Page Label". Drive needs "Drive > [Section] > [Folder] > [Subfolder]".
   - What's unclear: Whether to modify AppBreadcrumbs or add a Drive-internal breadcrumb.
   - Recommendation: Add a Drive-specific breadcrumb inside the Drive page component. The header AppBreadcrumbs will show "Drive > Drive" (or be adjusted to show "Drive > Arquivos"), and the in-page breadcrumb handles folder navigation.

3. **Comunicado Draft Persistence**
   - What we know: CONTEXT specifies localStorage for draft saving.
   - What's unclear: Key naming and conflict handling with existing localStorage usage (profile storage).
   - Recommendation: Use a namespaced key like `"hi-comunicado-draft"` and store a single JSON object. Clear on successful publish.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Not configured -- no test framework detected in project |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DRIV-01 | Folder navigation by section (Oportunidades/Obras) with tabs | manual-only | N/A -- frontend-only visual module | N/A |
| DRIV-02 | File listing with metadados, type icons, permissions | manual-only | N/A -- visual DataTable rendering | N/A |
| DRIV-03 | Upload/download/preview simulated interactions | manual-only | N/A -- toast + Sheet interactions | N/A |
| COMM-01 | Mural with filters by date and category | manual-only | N/A -- visual card feed | N/A |
| COMM-02 | Comunicado detail with content, date, destaque | manual-only | N/A -- page rendering | N/A |
| COMM-03 | Publication flow simulation | manual-only | N/A -- dialog wizard flow | N/A |

**Justification for manual-only:** This is a frontend-only project with no test framework configured. All requirements are visual/interactive and verified by `pnpm build` (type-checking) + `pnpm lint` (code quality) + visual inspection. The project has no existing test infrastructure.

### Sampling Rate
- **Per task commit:** `pnpm build --force && pnpm lint`
- **Per wave merge:** `pnpm build --force && pnpm lint && pnpm typecheck`
- **Phase gate:** Full build + lint + typecheck green

### Wave 0 Gaps
- No test framework configured in project -- all validation is build/lint/typecheck + visual
- No gaps to fill for this phase's validation approach

## Sources

### Primary (HIGH confidence)
- **Codebase analysis** -- Direct reading of `platform-config.ts`, `budget-requests-data.ts`, `crm-data.ts`, `proposals-data.ts`, `budget-requests-list-page.tsx`, `budget-requests-toolbar.tsx`, `app-breadcrumbs.tsx`, `platform-shell-provider.tsx`, `module-placeholder-page.tsx`, `restricted-module-state.tsx`, `data-table.tsx`, `sheet.tsx`, `dialog.tsx`, `sonner.tsx`
- **packages/ui/src/components/** -- Full inventory of 22 installed shadcn components; confirmed Tabs, Checkbox, Progress, AlertDialog are NOT installed
- **07-CONTEXT.md** -- All implementation decisions locked by user

### Secondary (MEDIUM confidence)
- **shadcn/ui SKILL.md** -- Component selection guide, installation patterns, critical rules
- **sonner toast API** -- toast.loading() with ID-based updates for progress simulation (verified from installed sonner component)

### Tertiary (LOW confidence)
- None -- all findings verified against codebase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already in use, only 4 new shadcn components needed
- Architecture: HIGH -- follows exact patterns from Phases 3-6, all verified in codebase
- Pitfalls: HIGH -- identified from direct codebase analysis (DataTable lacks selection, breadcrumb is route-based, profile visibility rules)

**Research date:** 2026-03-20
**Valid until:** 2026-04-20 (stable -- project patterns well-established, no external dependency changes expected)
