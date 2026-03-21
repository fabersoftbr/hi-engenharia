# Requirements: Plataforma Web Hi Engenharia

**Defined:** 2026-03-19
**Core Value:** Dar a Hi Engenharia uma camada visual unica, clara e padronizada para navegar seus principais fluxos operacionais sem depender da experiencia fragmentada atual.

## v1 Requirements

### Access

- [x] **AUTH-01**: Usuario pode entrar por uma tela de login simulada com identidade visual da Hi Engenharia
- [x] **AUTH-02**: Usuario pode visualizar ou selecionar um perfil simulado ao acessar a plataforma

### Portal

- [x] **PORT-01**: Usuario pode abrir um dashboard inicial com atalhos operacionais e resumos dos modulos principais
- [ ] **PORT-02**: Usuario pode navegar por um menu principal responsivo entre Portal, Orcamentos, CRM, Projetos, Drive, Propostas, Tabela de Precos e Comunicacao
- [x] **PORT-03**: Usuario pode visualizar cards de resumo com status, pendencias e destaques operacionais mockados
- [ ] **PORT-04**: Usuario pode se orientar em qualquer modulo por meio de cabecalho contextual e breadcrumbs

### Solicitação de Orçamento

- [ ] **ORC-01**: Usuario pode listar solicitacoes de orcamento com status, cliente e data simulados
- [x] **ORC-02**: Usuario pode preencher uma nova solicitacao com nome do cliente, telefone, cidade, consumo medio mensal, observacoes e anexos simulados
- [ ] **ORC-03**: Usuario pode abrir a tela de detalhes de uma solicitacao com dados do cliente, observacoes e anexos simulados
- [x] **ORC-04**: Usuario pode visualizar uma confirmacao de envio apos concluir o fluxo visual de nova solicitacao

### CRM

- [ ] **CRM-01**: Usuario pode listar oportunidades com filtros, etapa atual, responsavel e prioridade simulados
- [x] **CRM-02**: Usuario pode abrir o detalhe de um negocio com status por etapa, responsaveis e historico visual simulado
- [ ] **CRM-03**: Usuario pode visualizar um funil comercial em formato de pipeline com cards e contadores por etapa

### Pipelines

- [ ] **PIPE-01**: Usuario pode visualizar o pipeline Comercial com as dez etapas definidas para lead, qualificacao, proposta, negociacao e fechamento
- [ ] **PIPE-02**: Usuario pode visualizar o pipeline de Anteprojetos com as dez etapas definidas para solicitacao, analise tecnica, retorno ao comercial e decisao do cliente
- [ ] **PIPE-03**: Usuario pode visualizar o pipeline de Obras com as onze etapas definidas da assinatura do contrato ate a conclusao
- [ ] **PIPE-04**: Usuario pode perceber visualmente o fluxo principal da operacao de orcamento ate execucao da obra por meio da navegacao entre telas relacionadas

### Anteprojetos

- [ ] **ANT-01**: Usuario pode visualizar uma fila de anteprojetos com situacao tecnica, pendencias e prioridade simuladas
- [ ] **ANT-02**: Usuario pode abrir o detalhe de um anteprojeto com resumo tecnico, status, aguardando informacoes e retorno ao comercial simulados

### Propostas

- [ ] **PROP-01**: Usuario pode iniciar uma proposta a partir de um cliente ou oportunidade simulada
- [x] **PROP-02**: Usuario pode preencher um formulario de proposta com dados do projeto e parametros comerciais simulados
- [ ] **PROP-03**: Usuario pode visualizar a montagem e a pre-visualizacao da proposta antes da exportacao
- [ ] **PROP-04**: Usuario pode acionar uma exportacao simulada de PDF ou envio visual da proposta

### Tabela de Preços

- [ ] **PREC-01**: Usuario pode visualizar uma tela de upload simulado da tabela de precos
- [ ] **PREC-02**: Usuario pode consultar precos por regiao e faixa de consumo em uma interface filtravel
- [ ] **PREC-03**: Usuario pode listar e abrir detalhes de itens da tabela de precos com valores e condicoes mockadas

### Projetos e Obras

- [ ] **PROJ-01**: Usuario pode listar projetos com filtros por tipo, status e responsavel simulados
- [ ] **PROJ-02**: Usuario pode abrir o detalhe de um projeto com resumo, status, arquivos relacionados e blocos operacionais mockados
- [ ] **PROJ-03**: Usuario pode visualizar uma tela de acompanhamento de obra com marcos, status e proximas etapas simuladas

### Drive

- [ ] **DRIV-01**: Usuario pode navegar por estruturas de pastas separadas para Oportunidades e Obras
- [x] **DRIV-02**: Usuario pode visualizar listagens de arquivos com metadados, tipo de arquivo e permissoes simuladas
- [x] **DRIV-03**: Usuario pode acionar upload, download e visualizacao de arquivo apenas como interacoes simuladas

### Comunicação

- [ ] **COMM-01**: Usuario pode visualizar um mural de comunicados com filtros por data e categoria
- [ ] **COMM-02**: Usuario pode abrir o detalhe de um comunicado com conteudo, data e destaque visual
- [ ] **COMM-03**: Usuario pode percorrer um fluxo simulado de publicacao de comunicado

### Perfis

- [x] **ROLE-01**: Usuario pode ver menu, atalhos e modulos variando conforme o perfil simulado selecionado
- [x] **ROLE-02**: Usuario pode encontrar areas com acesso restrito exibidas como estados visuais bloqueados, sem permissao real

### Estados Visuais

- [x] **STAT-01**: Usuario pode ver estados de carregamento simulados nas principais telas por meio de skeletons e placeholders
- [x] **STAT-02**: Usuario pode ver estados de vazio e sem resultados nas listagens, pipelines e paineis principais
- [x] **STAT-03**: Usuario pode ver estados simulados de sucesso e erro para acoes como envio, exportacao, publicacao e upload visual

### Responsividade

- [x] **RESP-01**: Usuario pode utilizar as principais telas do portal, dos modulos, das listagens e dos detalhes em desktop e mobile com navegacao clara

## v2 Requirements

### Experiência Avançada

- **ADV-01**: Usuario pode usar uma busca global ou command palette para navegar e abrir acoes rapidamente
- **ADV-02**: Usuario pode personalizar widgets ou atalhos do dashboard conforme o perfil
- **ADV-03**: Usuario pode reorganizar cards ou etapas por interacoes avancadas como drag and drop

### Integrações Futuras

- **INT-01**: Usuario pode autenticar com credenciais reais e sessoes persistentes
- **INT-02**: Usuario pode consumir dados reais de CRM, Projetos, Drive e comunicacao
- **INT-03**: Usuario pode gerar PDF real, enviar arquivos reais e acionar automacoes operacionais

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend, banco de dados e APIs reais | Fora do objetivo desta fase, que e exclusivamente visual |
| Autenticacao real e controle real de permissao | Perfis e acessos serao apenas simulados na interface |
| Integracao real com Bitrix CRM, Projetos, Drive ou Messenger | Os modulos entram apenas como referencia funcional de frontend |
| Upload, download, armazenamento e exportacao reais | Todos os fluxos de arquivo e PDF devem permanecer mockados |
| Motor real de workflow e automacoes | O foco e a navegacao e a organizacao visual dos fluxos |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Complete |
| AUTH-02 | Phase 1 | Complete |
| PORT-01 | Phase 2 | Complete |
| PORT-02 | Phase 1 | Pending |
| PORT-03 | Phase 2 | Complete |
| PORT-04 | Phase 1 | Pending |
| ORC-01 | Phase 3 | Pending |
| ORC-02 | Phase 3 | Complete |
| ORC-03 | Phase 3 | Pending |
| ORC-04 | Phase 3 | Complete |
| CRM-01 | Phase 4 | Pending |
| CRM-02 | Phase 4 | Complete |
| CRM-03 | Phase 4 | Pending |
| PIPE-01 | Phase 4 | Pending |
| PIPE-02 | Phase 5 | Pending |
| PIPE-03 | Phase 6 | Pending |
| PIPE-04 | Phase 8 | Pending |
| ANT-01 | Phase 5 | Pending |
| ANT-02 | Phase 5 | Pending |
| PROP-01 | Phase 5 | Pending |
| PROP-02 | Phase 5 | Complete |
| PROP-03 | Phase 5 | Pending |
| PROP-04 | Phase 5 | Pending |
| PREC-01 | Phase 5 | Pending |
| PREC-02 | Phase 5 | Pending |
| PREC-03 | Phase 5 | Pending |
| PROJ-01 | Phase 6 | Pending |
| PROJ-02 | Phase 6 | Pending |
| PROJ-03 | Phase 6 | Pending |
| DRIV-01 | Phase 7 | Pending |
| DRIV-02 | Phase 7 | Complete |
| DRIV-03 | Phase 7 | Complete |
| COMM-01 | Phase 7 | Pending |
| COMM-02 | Phase 7 | Pending |
| COMM-03 | Phase 7 | Pending |
| ROLE-01 | Phase 1 | Complete |
| ROLE-02 | Phase 1 | Complete |
| STAT-01 | Phase 8 | Complete |
| STAT-02 | Phase 8 | Complete |
| STAT-03 | Phase 8 | Complete |
| RESP-01 | Phase 8 | Complete |

**Coverage:**
- v1 requirements: 41 total
- Mapped to phases: 41
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-19*
*Last updated: 2026-03-19 after roadmap traceability initialization*
