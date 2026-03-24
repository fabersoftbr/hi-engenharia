# Phase 4: CRM e Pipeline Comercial - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Entregar a experiência visual completa do CRM comercial: listagem de oportunidades com toggle para pipeline Kanban, detalhe do negócio com histórico de etapas e ações simuladas, e funil comercial com 10 etapas, drag and drop visual e totalizadores por coluna. Propostas e anteprojetos associados às oportunidades ficam na Fase 5.

</domain>

<decisions>
## Implementation Decisions

### Pipeline Layout (CRM-03, PIPE-01)
- Kanban horizontal scrollável: colunas verticais por etapa, cards empilhados, scroll horizontal para acessar todas as 10 etapas
- 10 etapas representativas mockadas: Lead, Em Contato, Qualificado, Visita Técnica, Proposta Enviada, Negociação, Revisão, Aguardando Aprovação, Contrato Assinado, Fechado
- Cabeçalho de cada coluna: nome da etapa + contador de cards ("N oportunidades") + valor total mockado da coluna (ex: "R$ 45.000")
- Drag and drop visual simulado — cards mudam de coluna via estado React local (useState); sem persistência real, estado se perde ao recarregar
- Clique no card navega para a página de detalhe do negócio (não abre drawer)

### Card do Pipeline — Conteúdo
- Layout detalhado: nome da oportunidade/empresa (linha 1), valor mockado + badge de prioridade (linha 2), avatar/iniciais do responsável + data de último contato (linha 3)
- Prioridade: 3 níveis — Alta (cor de destaque da marca / vermelho-laranja), Média (amarelo/âmbar), Baixa (cinza)
- Badge de prioridade no card do Kanban e na coluna da DataTable

### Lista vs Pipeline — Navegação
- Página única /crm com toggle de view: Kanban (padrão ao abrir) e Lista
- Barra de filtros compartilhada acima do toggle, filtra ambas as views: dropdown Responsável + dropdown Prioridade + campo de busca por nome/empresa
- Botão "Nova Oportunidade" no toolbar (abre formulário simulado ou modal — Claude decide a abordagem)
- Clique em card (Kanban) ou linha (lista) navega para /crm/[id]

### Colunas da Vista Lista (DataTable)
- Colunas: ID, Oportunidade (nome), Cliente/Empresa, Etapa, Responsável, Prioridade (badge), Valor, Data de criação
- Mais informação do que o card do Kanban — DataTable aproveita a largura da tela

### Detalhe do Negócio (CRM-02)
- Layout desktop 2 colunas: esquerda 60% (informações do negócio), direita 40% (etapa atual + histórico + ações)
- Col. esquerda: nome da oportunidade, empresa/cliente, contato (telefone), valor estimado, responsáveis, link para solicitação de orçamento de origem
- Col. direita: etapa atual (badge destacado), histórico visual de etapas (timeline estilo lista — etapa + data + responsável), ação "Mudar etapa"
- Ação "Mudar etapa": shadcn Select com as 10 etapas; ao selecionar, atualiza a etapa ativa e adiciona entrada no histórico via estado React local
- Link para solicitação de orçamento de origem: campo "Solicitação de origem" com ID e link para /orcamentos/[id] — reforça o fluxo visual da operação

### Claude's Discretion
- Estrutura interna do componente Kanban (scroll container, largura das colunas, comportamento responsivo mobile)
- Biblioteca de drag and drop a usar (researcher deve investigar @hello-pangea/dnd ou alternativa compatível com Next.js 16 / React 19)
- Formulário de nova oportunidade: modal ou página separada — Claude decide pela abordagem mais coerente com o padrão do projeto
- Layout mobile do detalhe (cols empilhadas)
- Skeleton/loading states (definidos globalmente na Fase 8)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase definition
- `.planning/ROADMAP.md` — Fase 4: objetivo, requirements (CRM-01, CRM-02, CRM-03, PIPE-01), success criteria e planos
- `.planning/REQUIREMENTS.md` — CRM-01 a CRM-03, PIPE-01: critérios de aceitação detalhados

### Prior phase patterns (must follow)
- `.planning/phases/03-solicitacoes-de-orcamento/03-CONTEXT.md` — padrões de layout de lista, toolbar, data contract, detalhe 2-col; Fase 4 deve ser consistente com esses padrões

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `@workspace/ui/components/data-table` — DataTable com paginação; usar para a vista lista de oportunidades
- `@workspace/ui/components/badge` — Badge para prioridade e etapa
- `@workspace/ui/components/card` — Base para os cards do Kanban
- `@workspace/ui/components/select` — Dropdown de mudança de etapa no detalhe
- `@workspace/ui/components/avatar` — Avatar/iniciais do responsável nos cards
- `@workspace/ui/components/separator` — Divisores de seção no detalhe
- `@workspace/ui/components/sheet` — Disponível mas não usado (optou-se por página de detalhe separada)
- `apps/web/lib/budget-requests-data.ts` — Referência de data contract: tipos, status meta, mock records, helpers

### Established Patterns
- Data contract em `apps/web/lib/xxx-data.ts` — Definir `crm-data.ts` com tipos, etapas, prioridades, registros mockados e helpers
- Toolbar com filtros + botão primário — `budget-requests-toolbar.tsx` como referência
- Layout de detalhe 2 colunas desktop — Fase 3 usou esse padrão; reproduzir em `/crm/[id]`
- Componente de página isolado em `apps/web/components/platform/budget-requests/` — criar `crm/` equivalente

### Integration Points
- Rota `/crm` já existe como placeholder (`apps/web/app/(platform)/crm/page.tsx`) — substituir o conteúdo sem duplicar a rota
- Breadcrumb contextual via `app-breadcrumbs.tsx` — nova rota `/crm/[id]` precisa de entrada de breadcrumb
- Link de volta para `/orcamentos/[id]` a partir do detalhe do negócio — conexão com Fase 3
- `platform-config.ts` — verificar se CRM já tem entry no MODULES; não adicionar duplicata

### Drag and Drop
- Nenhuma lib de DnD existente no projeto — researcher deve investigar @hello-pangea/dnd (fork mantido de react-beautiful-dnd, compatível com React 18+/19)
- Confirmar compatibilidade com Next.js 16 App Router (SSR/hidratação)

</code_context>

<specifics>
## Specific Ideas

- Pipeline deve ter a aparência de um CRM real (referência Pipedrive/Linear para cards limpos e funcionais)
- Drag and drop deve ser convincente como demonstração — cards realmente mudam de coluna e ficam lá durante a sessão
- Toggle lista/kanban deve ser elegante (ícones de grid e lista, botão group estilo segmented control)
- Conexão visual entre CRM e Orçamentos (link de origem no detalhe) reforça o storytelling do fluxo operacional

</specifics>

<deferred>
## Deferred Ideas

- Nenhuma ideia fora de escopo surgiu durante a discussão

</deferred>

---

*Phase: 04-crm-e-pipeline-comercial*
*Context gathered: 2026-03-20*
