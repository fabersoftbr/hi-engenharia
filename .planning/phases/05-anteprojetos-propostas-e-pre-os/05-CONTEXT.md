# Phase 5: Anteprojetos, Propostas e Preços - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Conectar a análise técnica (anteprojetos), a composição de propostas comerciais e a consulta de preços em um fluxo coerente que fecha a jornada comercial antes da execução de obras. Inclui:
- Fila e pipeline de anteprojetos com 6 etapas
- Gerador de propostas com preview em formato de documento
- Tabela de preços com consulta por região e faixa de consumo
- Conexões visuais entre CRM, Anteprojetos e Propostas

**Requirements in scope:** ANT-01, ANT-02, PIPE-02, PROP-01, PROP-02, PROP-03, PROP-04, PREC-01, PREC-02, PREC-03

</domain>

<decisions>
## Implementation Decisions

### Pipeline de Anteprojetos

- **Layout:** Kanban + toggle para Lista (mesmo padrão do CRM definido na Fase 4)
- **Etapas (6):** Solicitação → Análise técnica → Em revisão → Retorno comercial → Aguardando cliente → Aprovado/Recusado
- **Conexão com CRM:** Link 2-way — campo no detalhe linka para /crm/[id], oportunidade de origem aparece no card do Kanban e na lista
- **Layout do detalhe:** 2 colunas desktop (informações esquerda, timeline/ações direita) — mesmo padrão do CRM
- **Conteúdo do card:** Nome do anteprojeto, cliente, status/badge, responsável, data
- **Drag-and-drop:** Visual simulado com estado React local (mesmo padrão Fase 4)

### Campos e Estados do Anteprojeto

- **Campos:** Claude decide seguindo padrão da Fase 3 — dados do cliente, consumo, tipo de instalação, observações técnicas, status, anexos
- **Anexos:** Lista de arquivos com download simulado (mesmo padrão das solicitações da Fase 3)
- **Aguardando informações:** Campo booleano + badge no card quando ativo + indicador no dashboard (para Fase 8)

### Gerador de Propostas

- **Fluxo de criação:** Página única com seções (não wizard) — mantém padrão da Fase 3
- **Seleção de origem:** Modal ao iniciar — escolher entre Cliente (cria proposta nova) ou Oportunidade (herda dados do CRM)
- **Integração com Tabela de Preços:** Seção "Itens da Proposta" com botão "Consultar tabela" que abre modal de busca/preços. Preço entra como valor sugerido.
- **Preview:** Formato de documento — cabeçalho Hi, dados do cliente, descrição do projeto, tabela de itens, totais, condições, validade, rodapé. Visualização próxima do PDF final.

### Seções da Proposta

- **Estrutura (8 seções):** Cabeçalho Hi + Dados do cliente + Descrição do projeto + Tabela de itens + Totais + Condições + Validade + Rodapé
- **Tabela de itens:** Colunas — Item, Descrição, Quantidade, Valor unitário, Valor total. Linha de subtotal + descontos + total geral.
- **Condições comerciais:** Campo de texto livre (textarea) — formatação preservada no preview
- **Validade:** Dropdown com opções (7, 15, 30 dias) + data de expiração calculada e exibida no preview

### Status e Ciclo da Proposta

- **Status (6):** Rascunho → Em revisão → Pronta → Enviada → Em análise pelo cliente → Aceita/Recusada
- **Visualização do status:** Badge no topo do preview + timeline visual de status
- **Ação de envio:** Botão "Enviar" aparece quando proposta está "Pronta". Clique muda status para "Enviada" com toast de confirmação.

### Listagem de Propostas

- **Layout:** DataTable padrão com colunas — ID, Cliente, Título, Status, Valor, Data de criação
- **Toolbar:** Dropdown de Status + campo de busca (cliente/título) + botão "Nova proposta"
- **Interação:** Clique na linha navega para /propostas/[id]

### Exportação de Proposta

- **Ação:** Toast "PDF gerado com sucesso" + botão "Baixar" simulado (nenhum arquivo real)
- **Formato:** Apenas PDF
- **Disponibilidade:** Botão de exportação só aparece quando proposta está "Pronta para envio"
- **Histórico:** Sem histórico de versões exportadas

### Tabela de Preços

- **Filtros:** 2 dropdowns — Região + Faixa de consumo
- **Layout:** DataTable com colunas — Código, Item, Região, Faixa, Valor Unitário, Condições
- **Detalhes do item:** Modal com todos os dados — código, descrição completa, valores por região/faixa, condições comerciais, observações
- **Upload:** Página dedicada de upload com drag-and-drop, indicador de sucesso/erro, histórico de versões (tudo simulado)
- **Dados mockados:**
  - Regiões: Norte, Nordeste, Centro-Oeste, Sudeste, Sul (5 regiões)
  - Faixas de consumo: Até 100 kWh, 101-200, 201-500, 501-1000, Acima de 1000 (5 faixas)
  - Itens: 10-15 itens mockados (energia, infraestrutura, serviços)
  - Preços: Variam por região e faixa de consumo (matriz de valores)

### Fluxo e Conexões

- **Criação de anteprojeto a partir do CRM:** Botão "Criar anteprojeto" no detalhe da oportunidade — abre formulário pré-preenchido com dados da oportunidade
- **Conexão anteprojeto→proposta:**
  - Campo "Proposta comercial" no detalhe do anteprojeto com link para /propostas/[id] quando existe
  - Botão "Gerar proposta" no detalhe do anteprojeto para criar nova proposta
- **Reflexo no pipeline:** Badge indicador "Proposta gerada" no card do Kanban quando proposta existe (não muda etapa automaticamente)
- **Dashboard:** Sem integração cross-module (cada módulo isolado) — Fase 8 cuida das pendências consolidadas

### Comportamento Mobile

- **Kanban de Anteprojetos:** Colunas viram cards empilhados verticalmente, scroll horizontal preservado para navegar etapas
- **Formulário de Proposta:** Seções empilhadas verticalmente com scroll natural
- **Preview de Proposta:** Documento scrollável vertical (como PDF mobile)
- **Tabela de Preços:** Lista de cards, um item por card. Clique abre modal de detalhes.

### Estados Vazios

- **Pipeline de Anteprojetos:** Ícone + "Nenhum anteprojeto encontrado" + botão "Novo anteprojeto"
- **Lista de Propostas:** Ícone + "Nenhuma proposta criada" + botão "Nova proposta"
- **Tabela de Preços (sem resultados):** "Nenhum item encontrado para os filtros selecionados" + botão "Limpar filtros"

### Claude's Discretion

- Campos exatos do anteprojeto (seguir padrão Fase 3)
- Estrutura interna dos componentes Kanban e cards
- Espaçamento e tipografia exatos
- Skeleton/loading states (definidos globalmente na Fase 8)
- Conteúdo mockado específico (nomes, valores, descrições)
- Biblioteca de drag-and-drop (usar mesma da Fase 4 — @hello-pangea/dnd)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase definition
- `.planning/ROADMAP.md` — Fase 5: objetivo, requirements (ANT-01, ANT-02, PIPE-02, PROP-01 a PROP-04, PREC-01 a PREC-03), success criteria e planos
- `.planning/REQUIREMENTS.md` — ANT-01, ANT-02, PIPE-02, PROP-01 a PROP-04, PREC-01 a PREC-03: critérios de aceitação detalhados

### Prior phase patterns (must follow)
- `.planning/phases/03-solicitacoes-de-orcamento/03-CONTEXT.md` — Padrões de lista DataTable, formulário com seções, layout de detalhe 2 colunas, data contract
- `.planning/phases/04-crm-e-pipeline-comercial/04-CONTEXT.md` — Padrão Kanban + Lista, cards com prioridade/avatar, drag-and-drop, timeline de histórico

### Project constraints
- `.planning/PROJECT.md` — Constraints: frontend-only, shadcn como base, dados mockados, identidade visual Hi Engenharia

### Codebase
- `apps/web/lib/platform-config.ts` — Configuração de módulos, visibilidade por perfil (anteprojetos: admin/operations, propostas/tabela: admin/commercial)
- `apps/web/lib/budget-requests-data.ts` — Referência de data contract: tipos, status, mock records, helpers
- `@workspace/ui/components/data-table` — DataTable com paginação e filtros
- `@workspace/ui/components/dialog` — Modal para seleção de origem, consulta de preços, detalhes de item

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `DataTable` from @workspace/ui: Lista de propostas, tabela de preços — usar padrão Fases 3/4
- `Dialog` from @workspace/ui: Modal de seleção de origem, modal de consulta de preços, modal de detalhes de item
- `Card`, `Badge`, `Avatar`, `Separator` from @workspace/ui: Cards do Kanban, badges de status/prioridade
- `Form` components from @workspace/ui: Formulário de proposta — seguir padrão Fase 3
- `Select` from @workspace/ui: Dropdowns de filtro (região, faixa, status)
- Drag-and-drop: Usar mesma biblioteca da Fase 4 (@hello-pangea/dnd)

### Established Patterns
- Data contract em `apps/web/lib/xxx-data.ts` — Criar `anteprojetos-data.ts`, `propostas-data.ts`, `tabela-precos-data.ts`
- Toolbar com filtros + botão primário — `budget-requests-toolbar.tsx` como referência
- Layout de detalhe 2 colunas desktop — Fase 3 e 4 usaram esse padrão
- Kanban + toggle Lista — Fase 4 definiu esse padrão, reutilizar estrutura

### Integration Points
- Rotas existentes como placeholder:
  - `/anteprojetos` — substituir por Kanban + Lista
  - `/propostas` — substituir por listagem DataTable
  - `/tabela-de-precos` — substituir por consulta + upload
- Novas rotas necessárias:
  - `/anteprojetos/[id]` — detalhe do anteprojeto
  - `/propostas/[id]` — detalhe/edição da proposta
  - `/propostas/nova` — formulário de nova proposta
  - `/tabela-de-precos/upload` — página de upload
- Breadcrumbs: Adicionar entradas em `app-breadcrumbs.tsx`
- `platform-config.ts`: Verificar se módulos já têm entries; não adicionar duplicatas

</code_context>

<specifics>
## Specific Ideas

- Pipeline deve manter consistência visual com o CRM (Fase 4)
- Preview de proposta deve parecer um documento real — formato próximo do PDF final
- Conexão visual entre CRM → Anteprojeto → Proposta reforça o storytelling do fluxo operacional
- Tabela de preços com variação por região/faixa demonstra complexidade real de precificação

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-anteprojetos-propostas-e-pre-os*
*Context gathered: 2026-03-20*
