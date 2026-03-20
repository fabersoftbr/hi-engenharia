# Roadmap: Plataforma Web Hi Engenharia

## Overview

Este roadmap organiza a Fase 01 como uma evolucao frontend-only da base existente, começando pelo shell principal da plataforma e avançando pelo fluxo operacional da Hi Engenharia de entrada comercial até projetos, arquivos e comunicação. A ordem privilegia consistência visual, navegação clara, modularidade e estados de tela completos antes de qualquer preocupação com lógica real, integrações ou backend.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Shell de Acesso e Identidade** - Estrutura a entrada, o shell principal e a diferenciação visual por perfil (completed 2026-03-20)
- [ ] **Phase 2: Dashboard e Home Operacional** - Entrega a visão inicial do portal com resumos, atalhos e destaques
- [ ] **Phase 3: Solicitações de Orçamento** - Constrói o primeiro fluxo comercial de entrada
- [ ] **Phase 4: CRM e Pipeline Comercial** - Organiza oportunidades, detalhes e funil comercial
- [ ] **Phase 5: Anteprojetos, Propostas e Preços** - Conecta análise técnica, proposta comercial e tabela de preços
- [ ] **Phase 6: Projetos e Pipeline de Obras** - Representa a execução e o acompanhamento visual das obras
- [ ] **Phase 7: Drive e Comunicação** - Estrutura arquivos, permissões simuladas e mural de comunicados
- [ ] **Phase 8: Estados, Responsividade e Jornada Completa** - Fecha a cobertura visual do produto com polimento transversal

## Phase Details

### Phase 1: Shell de Acesso e Identidade
**Goal**: Entregar a entrada simulada, o shell principal da plataforma e a base visual por perfil
**Depends on**: Nothing (first phase)
**Requirements**: AUTH-01, AUTH-02, PORT-02, PORT-04, ROLE-01, ROLE-02
**Success Criteria** (what must be TRUE):
  1. Usuario pode entrar por uma tela de login simulada e chegar ao workspace principal
  2. Usuario pode navegar pelo menu principal responsivo entre os modulos previstos, mesmo quando alguns ainda estiverem em estado de placeholder
  3. Usuario consegue se orientar por cabecalho contextual e breadcrumbs no shell da plataforma
  4. Usuario percebe diferencas visuais de menu e acesso entre perfis simulados, incluindo estados bloqueados
**Plans**: 4 plans

Plans:
- [ ] 01-01: Definir direcao visual da marca e estruturar o shell base do workspace
- [ ] 01-02: Construir a tela de login simulada com selecao ou contexto de perfil
- [ ] 01-03: Implementar sidebar, header e breadcrumbs do shell principal
- [ ] 01-04: Aplicar variacoes de perfil e estados visuais de acesso restrito

### Phase 2: Dashboard e Home Operacional
**Goal**: Entregar a home inicial da plataforma com destaques, atalhos e leitura rapida da operacao
**Depends on**: Phase 1
**Requirements**: PORT-01, PORT-03
**Success Criteria** (what must be TRUE):
  1. Usuario pode abrir um dashboard inicial com cards de resumo operacional mockados
  2. Usuario pode usar atalhos para navegar rapidamente aos modulos mais importantes
  3. Usuario pode visualizar destaques, pendencias e comunicados resumidos na home
**Plans**: 3 plans

Plans:
- [ ] 02-01: Definir a arquitetura de informacao do dashboard inicial
- [ ] 02-02: Construir cards de resumo, indicadores e atalhos operacionais
- [ ] 02-03: Integrar comunicados resumidos e destaques modulares na home

### Phase 3: Solicitações de Orçamento
**Goal**: Entregar o fluxo visual completo de entrada comercial por solicitação de orçamento
**Depends on**: Phase 2
**Requirements**: ORC-01, ORC-02, ORC-03, ORC-04
**Success Criteria** (what must be TRUE):
  1. Usuario pode listar solicitações de orçamento com dados e status simulados
  2. Usuario pode preencher e revisar um formulario completo de nova solicitação
  3. Usuario pode abrir detalhes da solicitação e ver anexos simulados
  4. Usuario pode chegar a uma confirmação visual de envio ao concluir o fluxo
**Plans**: 3 plans

Plans:
- [ ] 03-01: Criar listagem de solicitações com filtros e estados base
- [ ] 03-02: Montar formulario de nova solicitação com anexos simulados
- [ ] 03-03: Entregar tela de detalhes e confirmação visual de envio

### Phase 4: CRM e Pipeline Comercial
**Goal**: Organizar visualmente oportunidades comerciais, detalhe do negócio e funil principal de vendas
**Depends on**: Phase 3
**Requirements**: CRM-01, CRM-02, CRM-03, PIPE-01
**Success Criteria** (what must be TRUE):
  1. Usuario pode listar oportunidades com filtros, responsaveis e prioridades simuladas
  2. Usuario pode abrir o detalhe de um negócio e entender status, responsáveis e histórico visual
  3. Usuario pode visualizar o pipeline Comercial com todas as etapas definidas e contagem por estágio
**Plans**: 3 plans

Plans:
- [ ] 04-01: Construir listagem de oportunidades e barra de filtros do CRM
- [ ] 04-02: Entregar detalhe do negócio com status, responsáveis e histórico visual
- [ ] 04-03: Montar o funil comercial com cards, etapas e indicadores

### Phase 5: Anteprojetos, Propostas e Preços
**Goal**: Conectar a análise técnica, a composição de propostas e a consulta de preços em um fluxo coerente
**Depends on**: Phase 4
**Requirements**: ANT-01, ANT-02, PIPE-02, PROP-01, PROP-02, PROP-03, PROP-04, PREC-01, PREC-02, PREC-03
**Success Criteria** (what must be TRUE):
  1. Usuario pode visualizar a fila e o detalhe de anteprojetos com seus estados técnicos simulados
  2. Usuario pode visualizar o pipeline de Anteprojetos com todas as etapas previstas
  3. Usuario pode iniciar, preencher e revisar uma proposta a partir de cliente ou oportunidade simulada
  4. Usuario pode consultar tabela de preços e usar essa referência na construção visual da proposta
  5. Usuario pode ver uma pré-visualização completa e acionar exportação simulada da proposta
**Plans**: 4 plans

Plans:
- [ ] 05-01: Construir fila e detalhe de anteprojetos com estados tecnicos
- [ ] 05-02: Montar pipeline de Anteprojetos e pontos de handoff para o comercial
- [ ] 05-03: Entregar formulario do gerador de propostas e consulta de tabela de preços
- [ ] 05-04: Finalizar preview da proposta e ação simulada de exportação/envio

### Phase 6: Projetos e Pipeline de Obras
**Goal**: Representar projetos em andamento e o ciclo visual completo de execução da obra
**Depends on**: Phase 5
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PIPE-03
**Success Criteria** (what must be TRUE):
  1. Usuario pode listar projetos com filtros por tipo, status e responsável
  2. Usuario pode abrir o detalhe de um projeto com arquivos relacionados e blocos operacionais
  3. Usuario pode acompanhar uma obra por marcos e status simulados
  4. Usuario pode visualizar o pipeline de Obras com todas as etapas da assinatura até a conclusão
**Plans**: 3 plans

Plans:
- [ ] 06-01: Construir listagem de projetos e navegação contextual
- [ ] 06-02: Entregar detalhe do projeto com status e arquivos relacionados
- [ ] 06-03: Montar acompanhamento de obra e pipeline visual de execução

### Phase 7: Drive e Comunicação
**Goal**: Estruturar a camada visual de arquivos e comunicados que conecta oportunidades, obras e operação interna
**Depends on**: Phase 6
**Requirements**: DRIV-01, DRIV-02, DRIV-03, COMM-01, COMM-02, COMM-03
**Success Criteria** (what must be TRUE):
  1. Usuario pode navegar por estruturas de pastas para Oportunidades e Obras
  2. Usuario pode visualizar arquivos com metadados, tipo e permissões simuladas
  3. Usuario pode acionar upload, download e preview de arquivos apenas como interação visual
  4. Usuario pode visualizar mural de comunicados, abrir detalhes e percorrer um fluxo de publicação simulada
**Plans**: 4 plans

Plans:
- [ ] 07-01: Construir navegação de pastas e árvores de arquivos do Drive
- [ ] 07-02: Entregar listagem de arquivos, metadados, permissões e preview visual
- [ ] 07-03: Criar mural de comunicados com filtros e detalhes
- [ ] 07-04: Simular publicação de comunicado e conexões com o dashboard

### Phase 8: Estados, Responsividade e Jornada Completa
**Goal**: Fechar a fase com cobertura de estados visuais, responsividade e fluidez entre os módulos principais
**Depends on**: Phase 7
**Requirements**: PIPE-04, STAT-01, STAT-02, STAT-03, RESP-01
**Success Criteria** (what must be TRUE):
  1. Usuario consegue percorrer visualmente a jornada de orçamento até obra entre telas conectadas
  2. Usuario encontra estados de carregamento, vazio, sem resultados, sucesso e erro nas telas principais
  3. Usuario consegue usar shell, listas, detalhes e pipelines em desktop e mobile com leitura clara
**Plans**: 3 plans

Plans:
- [ ] 08-01: Aplicar cobertura transversal de loading, empty, success e error states
- [ ] 08-02: Ajustar responsividade do shell, tabelas, pipelines e detalhes para mobile
- [ ] 08-03: Polir a jornada completa entre orçamento, CRM, proposta, projeto, drive e obra

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Shell de Acesso e Identidade | 4/4 | Complete   | 2026-03-20 |
| 2. Dashboard e Home Operacional | 0/3 | Not started | - |
| 3. Solicitações de Orçamento | 0/3 | Not started | - |
| 4. CRM e Pipeline Comercial | 0/3 | Not started | - |
| 5. Anteprojetos, Propostas e Preços | 0/4 | Not started | - |
| 6. Projetos e Pipeline de Obras | 0/3 | Not started | - |
| 7. Drive e Comunicação | 0/4 | Not started | - |
| 8. Estados, Responsividade e Jornada Completa | 0/3 | Not started | - |
