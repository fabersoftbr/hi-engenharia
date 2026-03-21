# Phase 7: Drive e Comunicação - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Estruturar a camada visual de arquivos (Drive) e comunicados (Mural) que conecta oportunidades, obras e operação interna. O Drive organiza arquivos por Oportunidades e Obras. A Comunicação oferece um mural com filtros e fluxo de publicação simulado. **Tudo frontend-only com interações simuladas — sem backend real.**

**Requirements in scope:** DRIV-01, DRIV-02, DRIV-03, COMM-01, COMM-02, COMM-03

</domain>

<decisions>
## Implementation Decisions

### Drive — Navegação e Estrutura

- **Navegação principal:** Tabs no topo — "Oportunidades" / "Obras"
- **Estrutura de pastas:** Uma pasta por Oportunidade/Obra (entidades do sistema)
- **Organização da lista:** Lista alfabética simples por nome da pasta
- **Permissões por perfil:**
  - Admin: vê tudo (Oportunidades + Obras)
  - Operations: vê apenas Obras
  - Commercial: vê apenas Oportunidades
- **Conteúdo da linha de pasta:** Nome + data de criação + contador de arquivos
- **Ações em pasta:** Menu de 3 pontos — Upload, Renomear, Excluir
- **Tooltip de conexão:** Hover na pasta mostra info da oportunidade/obra (status, responsável)
- **Busca:** Busca em pastas e arquivos — mostra pasta contendo o arquivo encontrado
- **Breadcrumb:** Completo com navegação — "Drive > [Seção] > [Pasta] > [Subpasta]"

### Drive — Estrutura Interna de Pastas

- **Dentro da pasta de entidade:** Subpastas padrão ("Contratos", "Projetos", "Fotos") + arquivos soltos
- **Ordenação:** Data de upload (recentes primeiro)
- **Toolbar:** Busca + botão "Nova pasta" + botão "Upload"

### Drive — Listagem de Arquivos

- **Layout:** DataTable padrão (consistente com Fases 3-5)
- **Colunas:** Nome (truncado + tooltip), tipo (ícone), tamanho, data de upload
- **Tipos de arquivo:** Ícones diferentes por tipo (PDF, Imagem, Word, Excel, Outros)
- **Autor:** Avatar + nome ao lado
- **Formato de data:** DD/MM/AAAA (brasileiro)
- **Ações em arquivo:** Menu de 3 pontos — Download, Visualizar, Renomear, Excluir
- **Seleção múltipla:** Checkbox em cada linha, toolbar muda para contador + ações inline (Download + Excluir)
- **Confirmação de exclusão:** Dialog "Tem certeza que deseja excluir?"

### Drive — Preview de Arquivo

- **Abertura:** Painel lateral (Slide-over) — mantém listagem visível
- **Conteúdo do preview:** Ícone do tipo de arquivo + botão "Abrir" (preview não disponível para nenhum tipo)
- **Metadados no painel:** Nome, tipo, tamanho, data, autor (sem permissão)
- **Fechamento:** Botão X + clique fora do painel
- **Preview mobile:** Sheet (bottom sheet)

### Drive — Upload e Download

- **Upload:** Botão simples abre explorador + toast de progresso
- **Múltiplos uploads:** Toast único com contador "Enviando X de Y arquivos..."
- **Erro de upload:** Item na lista com status de erro + botão "Tentar novamente"
- **Download:** Toast com barra de progresso + "Download concluído" ao final
- **Download em lote:** Simulado como ZIP (toast de sucesso)

### Drive — Estados e Mobile

- **Estado vazio de seção:** Mensagem "Nenhum arquivo encontrado" + botão "Fazer upload"
- **Pasta vazia:** Mensagem + botão "Fazer upload"
- **Mobile:** Tabs + cards empilhados verticalmente
- **Drag-and-drop:** Não suportado — apenas botão de upload

### Comunicação — Layout do Mural

- **Layout:** Cards em lista vertical (feed simples e escaneável)
- **Conteúdo do card:** Título, resumo (2 linhas), categoria (badge colorido), data, autor (avatar + nome), badge de destaque
- **Destaques:** Visual diferenciado (borda/fundo) + fixados no topo da lista
- **Ordenação:** Destaques primeiro, depois por data (recentes primeiro)
- **Categorias (5):** Geral, Operacional, Comercial, RH, TI — cores diferentes por categoria
- **Toolbar:** Filtros (dropdown categoria + seletor período) + campo de busca + botão "Novo comunicado"
- **Estado vazio:** "Nenhum comunicado publicado" + botão "Publicar"

### Comunicação — Detalhe do Comunicado

- **Clique no card:** Navega para página de detalhe `/comunicacao/[id]`
- **Layout do detalhe:** Conteúdo completo + metadados (data, autor, categoria) + botão voltar
- **Ações:** Botão "Editar" (navega para edição) + botão "Excluir" (com confirmação)

### Comunicação — Publicação de Comunicado

- **Fluxo:** Modal wizard 2 etapas
  - Etapa 1: Título + Categoria
  - Etapa 2: Conteúdo (textarea) + Destaque (checkbox)
- **Preview:** Botão "Visualizar" opcional abre modal com preview antes de publicar
- **Rascunho:** Botão "Salvar rascunho" salva localmente (localStorage)
- **Validação:** Título + categoria + conteúdo obrigatórios
- **Sucesso:** Toast "Comunicado publicado" + navega para página de detalhe

### Comunicação — Edição e Exclusão

- **Edição:** Página dedicada `/comunicacao/[id]/editar` com mesmo formulário
- **Exclusão:** Botão no detalhe + dialog de confirmação

### Comunicação — Mobile

- **Layout:** Cards empilhados verticalmente (mesmo layout do desktop)

### Claude's Discretion

- Espaçamento e tipografia exatos
- Skeleton/loading states (padrão definido na Fase 8)
- Conteúdo mockado específico (nomes, textos, datas)
- Cores exatas das categorias
- Animação do painel lateral de preview
- Largura exata do painel de preview

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase definition
- `.planning/ROADMAP.md` — Fase 7: objetivo, requirements (DRIV-01 a DRIV-03, COMM-01 a COMM-03), success criteria e planos
- `.planning/REQUIREMENTS.md` — DRIV-01 a DRIV-03, COMM-01 a COMM-03: critérios de aceitação detalhados

### Prior phase patterns (must follow)
- `.planning/phases/03-solicitacoes-de-orcamento/03-CONTEXT.md` — Padrões de lista DataTable, toolbar, data contract
- `.planning/phases/04-crm-e-pipeline-comercial/04-CONTEXT.md` — Padrão de badges, avatar, ações em menu
- `.planning/phases/05-anteprojetos-propostas-e-pre-os/05-CONTEXT.md` — Padrão de dialogs, formulários, estados vazios

### Project constraints
- `.planning/PROJECT.md` — Constraints: frontend-only, shadcn como base, dados mockados, identidade visual Hi Engenharia

### Codebase
- `apps/web/lib/platform-config.ts` — Configuração de módulos, visibilidade por perfil (Drive: admin/operations/cliente, Comunicação: admin only)
- `@workspace/ui/components/data-table` — DataTable com paginação e seleção
- `@workspace/ui/components/dialog` — Modal para confirmações e wizard de publicação
- `@workspace/ui/components/sheet` — Bottom sheet para preview mobile
- `@workspace/ui/components/badge` — Badges de categoria e destaque

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `DataTable` from @workspace/ui: Listagem de arquivos — usar padrão Fases 3-5
- `Dialog` from @workspace/ui: Wizard de publicação, confirmação de exclusão, preview
- `Sheet` from @workspace/ui: Preview mobile de arquivos
- `Card`, `Badge`, `Avatar`, `Separator` from @workspace/ui: Cards do mural, badges de categoria/destaque
- `Tabs` from @workspace/ui: Tabs de navegação Oportunidades/Obras
- `Sidebar` patterns from Fase 4: Tooltip de conexão com entidades

### Established Patterns
- Data contract em `apps/web/lib/xxx-data.ts` — Criar `drive-data.ts`, `comunicacao-data.ts`
- Toolbar com filtros + botão primário — `budget-requests-toolbar.tsx` como referência
- Menu de ações em 3 pontos — padrão de DropdownMenu do shadcn

### Integration Points
- Rotas existentes como placeholder:
  - `/drive` — substituir por tabs + navegação de pastas
  - `/comunicacao` — substituir por mural de cards
- Novas rotas necessárias:
  - `/comunicacao/[id]` — detalhe do comunicado
  - `/comunicacao/[id]/editar` — edição de comunicado
  - `/comunicacao/novo` — formulário de novo comunicado (ou via modal)
- Breadcrumbs: Adicionar entradas em `app-breadcrumbs.tsx`
- `platform-config.ts`: Drive e Comunicação já têm entries; verificar visibilidade por perfil

</code_context>

<specifics>
## Specific Ideas

- Tooltip na pasta que mostra status e responsável da oportunidade/obra conecta visualmente o Drive com o resto da plataforma
- Painel lateral de preview mantém contexto — usuário não perde o lugar na listagem
- Cores de categoria no mural facilitam escanear rapidamente por tipo de comunicado
- Modal wizard de publicação em 2 etapas quebra o formulário em partes digeríveis

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-drive-e-comunica-o*
*Context gathered: 2026-03-20*
