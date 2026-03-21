# Phase 6: Projetos e Pipeline de Obras - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Representar projetos em andamento e o ciclo visual completo de execucao de obra — desde a assinatura do contrato ate a conclusao. Inclui:
- Listagem de projetos com filtros (PROJ-01)
- Detalhe do projeto com arquivos relacionados (PROJ-02)
- Acompanhamento de obra por marcos e status simulados (PROJ-03)
- Pipeline de Obras com 11 etapas (PIPE-03)

**Requirements in scope:** PROJ-01, PROJ-02, PROJ-03, PIPE-03

</domain>

<decisions>
## Implementation Decisions

### Pipeline de Obras (PIPE-03)

- **11 etapas:** Contrato → Engenharia → Aprovações → Compras → Mobilização → Execução → Testes → Aceite → Documentacao → Encerramento → Entrega
- **Card do Kanban:** Nome do projeto + Cliente + Estágio atual + Responsavel + Data de inicio (mesmo padrão CRM/anteprojetos)
- **Layout:** Kanban + toggle Lista + filtros (Responsável + busca) + drag-and-drop visual (identico ao CRM/anteprojetos)
- **Progresso:** Calculo automatico por etapa atual (ex: etapa 6 de 11 = 55%) — exibido no card
- **Cabeçalho da coluna:** Nome da etapa + contador de obras ("3 obras")
- **Conexão com proposta:** Link para proposta no card e no detalhe — campo "Proposta" com link clicável para /propostas/[id]
- **Badge no card:** "Proposta #prop-2026-001" com link

- **Rota do pipeline:** /obras

- **Rota do detalhe:** /obras/[id]
- **Colunas da lista:** ID, Nome do projeto, Cliente, Tipo, Status, Responsavel, Potência (kWp), Data de inicio

- **Breadcrumb:** Obras > Pipeline ou Obras > [Nome]

### Detalhe do Projeto (PROJ-02)
- **Layout:** 5 seções compactas, minimalista — 2 colunas desktop
  - Esquerda 60%: Resumo + Arquivos
  - Direita 40%: Status atual + Ações + Historico de etapas
- **Resumo (campos):** Nome do projeto + Cliente + Tipo + Potência (kWp) + Local + Prazo previsto + Responsavel
- **Status atual:** Estágio do pipeline + badge + indicador de progresso (%) + proxima etapa
- **Arquivos:** Lista de anexos com download simulado (mesmo padrão anteprojetos)
- **Ações:** Mudar estágio + Ver anteprojeto + Gerar relatorio
- **Historico:** Timeline de mudancas de etapa (mesmo padrão CRM/anteprojetos)
- **Conexão com proposta:** Link no topo do detalhe — "Proposta #prop-XXX"
- **Conexão com anteprojeto:** Link no topo do detalhe — "Anteprojeto #ant-XXX"
- **Breadcrumb:** Projetos > [Nome do projeto]
- **Rota:** /projetos/[id]

### Acompanhamento de Obra (PROJ-03)
- **Estrutura:** Pagina separada /projetos/[id]/obra — URL propria
- **Conteudo principal:** Timeline de marcos + Cronograma Gantt horizontal
- **Marcos:** Customizados por projeto (ex: Fundacao, Estrutura, Painéis, Conexão, Testes, Entrega)
- **Dados do marco:** Nome + Data inicio + Data fim + Status + Responsavel + Observacoes (6 campos)
- **Status do marco:** Concluído, Em andamento, Pendente (3 status)
- **Próximos passos:** Lista dos próximos 2-3 marcos pendentes com data prevista
- **Cronograma:** Gantt horizontal tradicional — barras ao longo do tempo, uma barra por marco
- **Breadcrumb:** Projetos > [Nome] > Obra
- **Navegacao:** Botao "Ver obra" no detalhe do projeto leva a pagina de acompanhamento

- **Ações:** Adicionar marco + Editar marco + Mudar status do marco

- **Retorno:** Botao voltar ou breadcrumb para projeto

### Tipos e Filtros (PROJ-01)
- **Tipos de projeto:** Residencial, Comercial, Industrial, Rural, Condominio (5 tipos)
- **Filtros:** Tipo + Status + Responsavel + busca por nome/cliente (4 filtros — mesmo padrão CRM)
- **Status de projeto/obra:** Contrato, Em andamento, Concluído, Pausado, Cancelado (5 status)
- **Rotas:** /projetos (listagem) + /obras (pipeline Kanban) — rotas separadas
- **Navegacao entre modulos:** Clique em projeto → botao "Ver obra" → pagina de acompanhamento

### Lista de Projetos (PROJ-01)
- **Layout:** DataTable com colunas — ID, Nome, Cliente, Tipo, Status, Responsavel, Potencia (kWp), Data de inicio
- **Toolbar:** Filtros (Tipo + Status + Responsavel + busca) + botao "Novo projeto"
- **Interacao:** Clique na linha navega para /projetos/[id]
- **Estado vazio:** Icone + "Nenhum projeto encontrado" + botao "Novo projeto"
- **Breadcrumb:** Projetos

- **Rota:** /projetos

### Claude's Discretion
- Estrutura interna dos componentes Kanban e cards (seguir padrao CRM/anteprojetos)
- Espaçamento e tipografia exatos
- Skeleton/loading states (definidos globalmente na Fase 8)
- Conteudo mockado especifico (nomes, valores, datas, descricoes)
- Biblioteca de drag-and-drop (usar mesma da Fase 4 — @hello-pangea/dnd)
- Comportamento responsivo mobile do Gantt (simplificar para cards empilhados se necessario)
- Layout mobile do detalhe (cols empilhadas)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase definition
- `.planning/ROADMAP.md` — Fase 6: objetivo, requirements (PROJ-01, PROJ-02, PROJ-03, PIPE-03), success criteria e planos
- `.planning/REQUIREMENTS.md` — PROJ-01 a PROJ-03, PIPE-03: criterios de aceitacao detalhados

### Prior phase patterns (must follow)
- `.planning/phases/04-crm-e-pipeline-comercial/04-CONTEXT.md` — Padrao Kanban + Lista, cards com prioridade/avatar, drag-and-drop, timeline de historico
- `.planning/phases/05-anteprojetos-propostas-e-pre-os/05-CONTEXT.md` — Padrao Kanban de anteprojetos, formulario de propostas, tabela de precos, conexoes CRM

### Project constraints
- `.planning/PROJECT.md` — Constraints: frontend-only, shadcn como base, dados mockados, identidade visual Hi Engenharia

### Codebase
- `apps/web/lib/platform-config.ts` — Configuracao de modulos, visibilidade por perfil
- `apps/web/lib/crm-data.ts` — Referencia de data contract: tipos, estagios, registros mockados, helpers
- `apps/web/lib/anteprojects-data.ts` — Referencia de data contract: tipos, estagios, prioridades, mock records, helpers
- `@workspace/ui/components/data-table` — DataTable com paginacao e filtros
- `@workspace/ui/components/dialog` — Modal para acoes
- `@workspace/ui/components/badge` — Badge para status, tipo, estagio

- `@workspace/ui/components/card` — Base para cards do Kanban
- `@workspace/ui/components/select` — Dropdowns de filtro, mudanca de estagio

- `@workspace/ui/components/avatar` — Avatar/iniciais do responsavel nos cards
- `@workspace/ui/components/separator` — Divisores de secao no detalhe
- `@workspace/ui/components/progress` — Barra de progresso

- Drag-and-drop: Usar mesma biblioteca da Fase 4 (@hello-pangea/dnd)

- Gantt visualization: Pesquisar biblioteca simples de cronograma ou implementar com CSS/Tailwind

  - Opcoes: react-gantt-chart, frappe-gantt, ou implementacao customizada com divs

  - Researcher deve investigar opcoes compativeis com React 19 / Next.js 16
- `apps/web/components/platform/crm/crm-pipeline-board.tsx` — Referencia de implementacao do Kanban
- `apps/web/components/platform/anteprojects/anteproject-pipeline-board.tsx` — Referencia de implementacao do Kanban de anteprojetos

- `apps/web/components/platform/proposals/proposal-builder-page.tsx` — Referencia de layout de formulario com secoes

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `DataTable` from @workspace/ui: Lista de projetos — usar padrao Fases 3/4/5
- `Dialog` from @workspace/ui: Modal de novo projeto, edicao de marcos
- `Card`, `Badge`, `Avatar`, `Separator` from @workspace/ui: Cards do Kanban, badges de status/tipo
- `Progress` from @workspace/ui: Barra de progresso no detalhe e no card
- Drag-and-drop: @hello-pangea/dnd ja instalado na Fase 4 — reutilizar
- Kanban board components: `crm-pipeline-board.tsx` e `anteproject-pipeline-board.tsx` como referencia estrutural

- Detail pages: `crm-opportunity-detail-page.tsx`, `anteproject-detail-page.tsx` como referencia de layout 2 colunas
- Toolbar components: `crm-toolbar.tsx`, `anteproject-toolbar.tsx` como referencia de filtros
- Stage badge/history: `crm-stage-badge.tsx`, `crm-stage-history.tsx` como referencia de timeline de etapas

### Established Patterns
- Data contract em `apps/web/lib/xxx-data.ts` — Criar `projects-data.ts` com tipos, estagios, prioridades, registros mockados e helpers
- Toolbar com filtros + botao primario — `budget-requests-toolbar.tsx`, `crm-toolbar.tsx` como referencia
- Layout de detalhe 2 colunas desktop — Fases 3/4/5 usaram esse padrao
- Kanban + toggle Lista — Fase 4 definiu esse padrao, reutilizar estrutura
- Progresso automatico por etapa — Calcular % baseado na posicao da etapa no pipeline
- Conexao cross-modulos — Links para CRM, anteprojeto, proposta no detalhe do projeto/obra
- Status badge com variant — Usar mesmo padrao de `CRM_STAGE_META` e `ANTEPROJECT_STAGE_META`

### Integration Points
- Rotas existentes como placeholder:
  - `/projetos` — substituir por listagem DataTable
  - Criar nova rota `/obras` para pipeline Kanban
  - Criar nova rota `/projetos/[id]` para detalhe do projeto
  - Criar nova rota `/projetos/[id]/obra` para acompanhamento de obra
- Breadcrumbs: Adicionar entradas em `app-breadcrumbs.tsx`
  - Projetos > [Nome]
  - Obras > Pipeline
  - Obras > [Nome]
  - Projetos > [Nome] > Obra
- `platform-config.ts`: Verificar se modulo Projetos/Obras ja tem entrada; nao adicionar duplicatas
- Sidebar: Verificar se icones/labels estao corretos para Projetos e Obras

</code_context>

<specifics>
## Specific Ideas

- Pipeline de Obras deve manter consistencia visual com CRM e Anteprojetos (Fases 4/5)
- Progresso automatico no card diferencia Obras dos outros pipelines
- Gantt horizontal para cronograma de marcos — visualizacao clara de duracao e sobreposicao
- Conexao visual entre Proposta → Projeto → Obra reforca o storytelling do fluxo operacional
- Pagina de acompanhamento separada permite visualizacao rica sem sobrecarregar o detalhe do projeto
- Rotas separadas para Projetos (listagem) e Obras (pipeline) permitem navegacao contextual

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-projetos-e-pipeline-de-obras*
*Context gathered: 2026-03-20*
