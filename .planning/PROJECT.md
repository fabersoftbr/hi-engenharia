# Plataforma Web Hi Engenharia

## What This Is

Plataforma web responsiva que centraliza visualmente a operacao da Hi Engenharia em uma interface unica, organizada por modulos e fluxos de trabalho. Nesta Fase 01, o produto e exclusivamente um frontend navegavel com dados mockados, estados simulados e identidade visual propria para representar Portal, Orcamentos, CRM, Projetos, Drive, Propostas, Tabela de Precos e Comunicacao. O Bitrix entra apenas como referencia conceitual dos modulos e fluxos, sem qualquer integracao real.

## Core Value

Dar a Hi Engenharia uma camada visual unica, clara e padronizada para navegar seus principais fluxos operacionais sem depender da experiencia fragmentada atual.

## Requirements

### Validated

- ✓ A aplicacao web base renderiza um shell responsivo em Next.js com layout global compartilhado e tipografia configurada - existing
- ✓ O repositorio ja possui um pacote de UI reutilizavel com componentes e tokens visuais compativeis com o ecossistema shadcn - existing
- ✓ O shell atual suporta alternancia de tema no cliente, mostrando que a base visual compartilhada ja esta conectada - existing
- ✓ Usuario pode entrar por uma tela de login totalmente simulada e acessar o portal sem autenticacao real - Validated in Phase 01
- ✓ Usuario pode visualizar um dashboard inicial com atalhos operacionais, comunicados, resumo dos modulos e indicadores mockados - Validated in Phase 02
- ✓ Usuario pode navegar por anteprojetos com lista, detalhe tecnico e funil visual conectado ao handoff do CRM - Validated in Phase 05
- ✓ Usuario pode criar propostas com builder, consulta de tabela de precos, preview em documento e exportacao simulada - Validated in Phase 05
- ✓ Usuario pode navegar pastas do Drive com tabs por Oportunidades/Obras, breadcrumb interno, lista de arquivos com metadados e preview em painel lateral - Validated in Phase 07
- ✓ Usuario pode visualizar mural de comunicados com filtros, destaques, detalhe e publicar via wizard de 2 etapas - Validated in Phase 07

### Active
- [ ] Usuario pode navegar por uma estrutura unica entre Portal, Solicitacao de Orcamento, CRM, Projetos, Drive, Gerador de Propostas, Tabela de Precos e Portal de Comunicacao
- [ ] Usuario pode visualizar os pipelines Comercial, Anteprojetos e Obras em layouts claros, legiveis e responsivos, com etapas e status simulados
- [ ] Usuario pode percorrer fluxos simulados de solicitacao de orcamento, oportunidade comercial, anteprojeto, proposta e obra apenas por telas e navegacao frontend
- [ ] Usuario pode acessar tabelas, cards, formularios, detalhes, anexos simulados, filtros e paines com dados mockados em todos os modulos principais
- [ ] Cada perfil visualizado na plataforma pode ver menus, acessos liberados ou bloqueados e mensagens de restricao apenas como representacao de interface
- [ ] Cada tela principal apresenta estados visuais de vazio, carregamento, sucesso e erro para demonstracao e futura evolucao
- [ ] A experiencia visual da plataforma preserva consistencia entre desktop e mobile e reforca a identidade de marca da Hi Engenharia

### Out of Scope

- Backend, banco de dados, APIs e webhooks reais - esta fase entrega apenas a camada visual de frontend
- Autenticacao real, autorizacao real e controle real de permissoes - diferencas entre perfis serao apenas simuladas na interface
- Integracao real com CRM Bitrix, Projetos Bitrix, Drive Bitrix ou Messenger - esses modulos existem apenas como representacao visual
- Persistencia de dados, armazenamento real, upload real, download real e geracao real de PDF - tudo sera mockado ou estatico
- Motor real de workflow, automacoes operacionais e regras de negocio de producao - os fluxos serao apresentados apenas como experiencia navegavel

## Context

Repositorio brownfield com base minima em Next.js 16, React 19, Tailwind CSS 4 e pacote de UI compartilhado em `packages/ui`. Hoje a aplicacao entrega apenas um shell inicial com tema, tipografia e componente de botao, o que torna esta fase uma expansao visual significativa sobre uma fundacao tecnica ja pronta para frontend. O publico da plataforma inclui Administrador, Comercial interno, Afiliado, Office, Embaixador, Engenharia, Operacao e Parceiro externo, com foco em usuarios nao tecnicos que precisam navegar rapidamente por demandas comerciais, anteprojetos, obras, arquivos e comunicados. O fluxo principal a ser representado vai de solicitacao de orcamento ate execucao da obra, sempre com informacao organizada, legibilidade alta e navegacao simples.

## Constraints

- **Scope**: Frontend only - nao implementar backend, integracoes reais, persistencia ou servicos de infraestrutura
- **UI Foundation**: Todo trabalho de frontend deve usar a skill `shadcn` e componentes estruturados via MCP shadcn
- **Tech Stack**: Manter a implementacao dentro da base existente em Next.js 16, React 19, Tailwind CSS 4 e `@workspace/ui`
- **Data Model**: Usar apenas dados mockados, placeholders e estados estaticos ou ficticios
- **UX**: Priorizar clareza, navegacao simples e leitura rapida para usuarios nao tecnicos
- **Branding**: Reforcar a identidade visual da Hi Engenharia em toda a experiencia, evitando aparencia generica
- **Brownfield Delivery**: Evoluir os arquivos e rotas existentes sem duplicar paginas ou criar caminhos redundantes

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Tratar todos os modulos do Bitrix apenas como referencia visual | O objetivo desta fase e validar a experiencia da plataforma sem sair do escopo de frontend | - Pending |
| Construir todos os fluxos com dados mockados e estados simulados | Permite revisar navegacao, UX e identidade visual sem backend | - Pending |
| Usar o pacote `@workspace/ui` e composicao baseada em shadcn como fundacao de interface | Regra obrigatoria do repositorio e caminho mais consistente para escalar telas | - Pending |
| Diferenciar perfis apenas por sinais visuais de navegacao e acesso | O projeto precisa comunicar contexto operacional sem implementar permissao real | - Pending |
| Priorizar primeiro a camada de portal, navegacao e modulos antes de qualquer logica real | Esta fase serve para organizar a operacao visualmente e preparar a base para evolucao futura | - Pending |

---
*Last updated: 2026-03-21 after Phase 07 completion*
