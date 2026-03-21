# Phase 8: Estados, Responsividade e Jornada Completa - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Cobertura transversal de estados visuais (loading, empty, success, error), ajuste de responsividade para mobile em todas as telas principais, e polimento da jornada completa entre orçamento → CRM → anteprojeto → proposta → projeto → drive → obra. Esta fase não adiciona novas funcionalidades — polimento, consistência e UX transversal.

**Requirements in scope:** PIPE-04, STAT-01, STAT-02, STAT-03, RESP-01

</domain>

<decisions>
## Implementation Decisions

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

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase definition
- `.planning/ROADMAP.md` — Fase 8: objetivo, requirements (PIPE-04, STAT-01, STAT-02, STAT-03, RESP-01), success criteria e planos
- `.planning/REQUIREMENTS.md` — PIPE-04, STAT-01 a STAT-03, RESP-01: critérios de aceitação detalhados

### Prior phase patterns (must follow)
- `.planning/phases/01-shell-de-acesso-e-identidade/01-CONTEXT.md` — Sidebar responsiva, dark mode, perfil visibility
- `.planning/phases/03-solicitacoes-de-orcamento/03-CONTEXT.md` — DataTable patterns, toolbar, detail 2-col
- `.planning/phases/04-crm-e-pipeline-comercial/04-CONTEXT.md` — Kanban + Lista toggle, drag-and-drop, pipeline cards
- `.planning/phases/05-anteprojetos-propostas-e-pre-os/05-CONTEXT.md` — Pipeline de anteprojetos, proposta preview, tabela de preços

### Project constraints
- `.planning/PROJECT.md` — Constraints: frontend-only, shadcn como base, dados mockados, identidade visual Hi Engenharia

### Codebase maps
- `.planning/codebase/CONVENTIONS.md` — Coding conventions, shadcn workflow, import patterns
- `.planning/codebase/STRUCTURE.md` — Directory structure and module organization

### Existing components
- `@workspace/ui/components/skeleton` — Skeleton base para criar skeletons tipados
- `@workspace/ui/components/dialog` — Modal dialogs
- `@workspace/ui/components/sheet` — Mobile sheets
- `@workspace/ui/components/avatar` — Avatar com fallback
- `@workspace/ui/components/tooltip` — Tooltips
- `@workspace/ui/components/toggle-group` — Toggle Kanban/Lista
- `@workspace/ui/components/scroll-area` — Scroll containers
- `sonner` — Toast library (já instalado)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Skeleton` from @workspace/ui: Base para criar TableSkeleton, CardGridSkeleton, PipelineSkeleton, DetailSkeleton
- `Dialog` from @workspace/ui: Diálogos de confirmação, modais
- `Sheet` from @workspace/ui: Modals em mobile (bottom sheet)
- `Avatar` from @workspace/ui: Avatar com AvatarFallback para iniciais coloridas
- `Tooltip` from @workspace/ui: Truncation com tooltip
- `ToggleGroup` from @workspace/ui: Toggle Kanban/Lista
- `ScrollArea` from @workspace/ui: Scroll horizontal em toolbars
- `sonner`: Toasts (já instalado no projeto)
- `empty-state` pattern: Alguns módulos já têm empty states inline — criar componente compartilhado

### Established Patterns
- Layout 2-colunas desktop: Fases 3, 4, 5 usaram esse padrão
- Kanban + Lista toggle: Fases 4 e 5 definiram padrão
- Data contract em `apps/web/lib/xxx-data.ts`: Seguir padrão existente
- Toolbar com filtros + botão primário: `budget-requests-toolbar.tsx` como referência

### Integration Points
- Novos componentes de estado em `@workspace/ui/components/`:
  - `empty-state.tsx`
  - `table-skeleton.tsx`
  - `card-grid-skeleton.tsx`
  - `pipeline-skeleton.tsx`
  - `detail-skeleton.tsx`
- Nova página `/jornada` em `apps/web/app/(platform)/jornada/page.tsx`
- Nova página `/erro` em `apps/web/app/erro/page.tsx`
- Error boundary global no root layout
- Seção "Registro" nas páginas de detalhe existentes
- Botão "Voltar" nos headers de detalhe
- Entrada "Jornada" na sidebar (`platform-config.ts`)
- Opção de tema no dropdown do avatar (`profile-switcher.tsx`)
- Auditoria de dark mode em todas as telas implementadas

</code_context>

<specifics>
## Specific Ideas

- Timeline da jornada deve parecer um fluxo visual claro — setas conectando cards como em Linear
- Toasts devem ser discretos mas visíveis — canto inferior direito não atrapalha navegação
- Skeletons com dimensões exatas passam sensação de "layout estável" durante carregamento
- Página de erro deve ser amigável, não técnica — usuário entende que algo deu errado mas não se assusta

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-estados-responsividade-e-jornada-completa*
*Context gathered: 2026-03-20*
