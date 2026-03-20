# Phase 2: Dashboard e Home Operacional - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Entregar a home inicial da plataforma com destaques, atalhos e leitura rápida da operação — o ponto de entrada após o login. Esta fase cobre exclusivamente a página de dashboard (PORT-01, PORT-03): estrutura visual, cards de resumo por módulo, barra de atalhos operacionais e seção de comunicados/destaques. Nenhum módulo recebe conteúdo real nesta fase — os cards são visuais com dados mockados.

**Requirements in scope:** PORT-01, PORT-03

</domain>

<decisions>
## Implementation Decisions

### Arquitetura de Informação

- **Estrutura da página (de cima para baixo):**
  1. **Hero / Boas-vindas** — Nome do perfil ativo + contador de pendências abertas (ex: "Bom dia, [Perfil]. Você tem 5 pendências abertas.")
  2. **Grade de cards de resumo** — Cards de todos os módulos visíveis pelo perfil ativo
  3. **Barra de atalhos rápidos** — Linha horizontal de botões para ações específicas
  4. **Rodapé de informações** — Comunicados (60% largura) + Destaques/Pendências (40% largura), lado a lado no desktop, empilhados no mobile
- **Variação por perfil:** Cards e atalhos variam conforme o perfil ativo. Cada perfil vê apenas os módulos que lhe são acessíveis (mesma lógica da sidebar definida na Fase 1):
  - Administrador: todos os 8 módulos
  - Comercial interno: Orçamentos, CRM, Propostas, Tabela de Preços
  - Afiliado/Parceiro externo: Orçamentos
  - Engenharia/Operação: Anteprojetos, Projetos, Obras, Drive

### Cards de Resumo

- **Módulos:** Todos os 8 módulos da plataforma (Orçamentos, CRM, Anteprojetos, Propostas, Projetos, Obras, Drive, Comunicação). Cada perfil vê apenas seus módulos permitidos.
- **Conteúdo de cada card:** Ícone (lucide-react) + título do módulo + contador de itens ativos + badge de pendências
  - Badge com pendências: cor destaque (ex: laranja/vermelho), texto "N pendentes"
  - Badge sem pendências: cor verde, texto "Em dia"
- **Aparência:** Todos os cards visualmente iguais — sem diferenciação de cor por módulo. Só o ícone e o título identificam o módulo.
- **Grid:** 4 colunas no desktop / 2 colunas no tablet / 1 coluna no mobile
- **Interação:** Card inteiro é clicável e navega para a página principal do módulo correspondente

### Atalhos Operacionais

- **Tipo:** Ações rápidas específicas, não links genéricos de módulo. Ex: "Nova solicitação de orçamento", "Nova oportunidade", "Novo comunicado".
- **Quantidade:** 4-5 atalhos, variando por perfil ativo
- **Aparência:** Botões `outline` com ícone (lucide-react) + texto curto, em linha horizontal — usa o componente `Button` do `@workspace/ui` com variante `outline`
- **Posição:** Seção "Ações Rápidas" entre a grade de cards e o rodapé — linha discreta com título inline

### Comunicados (rodapé esquerdo, 60%)

- **Formato:** Lista compacta de 3-4 itens
- **Cada item mostra:** Título do comunicado + data + 1 linha de preview do texto
- **Rodapé da seção:** Link "Ver todos" que navega para o módulo de Comunicação
- **Container:** Card com borda (usa `Card` do `@workspace/ui`)

### Destaques / Pendências Urgentes (rodapé direito, 40%)

- **Conteúdo:** Lista consolidada de 3-5 pendências urgentes vindas de vários módulos
- **Cada item:** Ícone de alerta (`AlertTriangle` ou similar do lucide-react) + texto descritivo + referência ao módulo de origem — ex: `[!] Orçamento #123 aguarda aprovação — [CRM]`
- **Container:** Card com borda (usa `Card` do `@workspace/ui`)

### Claude's Discretion

- Ícone lucide-react específico para cada módulo na grade de cards
- Ícone lucide-react específico para cada ação rápida na barra de atalhos
- Espaçamento exato entre seções e tipografia dos títulos de seção
- Dados mockados específicos (números, nomes, datas) para preencher todos os estados

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requisitos da fase
- `.planning/REQUIREMENTS.md` — PORT-01, PORT-03: critérios de aceitação desta fase
- `.planning/ROADMAP.md` §Phase 2 — Success criteria e lista de planos (02-01 a 02-03)

### Projeto e constraints
- `.planning/PROJECT.md` — Constraints obrigatórias: frontend-only, shadcn como base, Next.js 16 / React 19 / Tailwind CSS 4, dados mockados, identidade visual Hi Engenharia
- `.planning/STATE.md` — Estado atual do projeto

### Contexto da Fase 1 (base que esta fase consome)
- `.planning/phases/01-shell-de-acesso-e-identidade/01-CONTEXT.md` — Decisões sobre shell, sidebar, header, breadcrumbs, perfis e identidade visual que esta fase deve respeitar

### Base de código existente
- `packages/ui/src/styles/globals.css` — Tokens de design (cores em oklch, --radius: 0, dark mode)
- `packages/ui/src/components/card.tsx` — Componente Card já instalado — usar para cards de módulo e para os containers de comunicados/destaques
- `packages/ui/src/components/badge.tsx` — Componente Badge já instalado — usar para badges de pendências e "Em dia"
- `packages/ui/src/components/button.tsx` — Componente Button com variante outline — usar nos atalhos operacionais
- `packages/ui/src/components/skeleton.tsx` — Componente Skeleton já instalado — usar para estados de carregamento mockados
- `apps/web/app/layout.tsx` — Root layout com ThemeProvider

No external specs — requirements are fully captured in decisions above and in the referenced planning files.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Card` (`@workspace/ui/components/card`): já instalado com CardHeader, CardTitle, CardContent, CardFooter — usar para todos os cards de módulo e para as seções de comunicados/destaques no rodapé
- `Badge` (`@workspace/ui/components/badge`): já instalado — usar para badge de pendências ("N pendentes") e badge de estado positivo ("Em dia")
- `Button` (`@workspace/ui/components/button`): variante `outline` para os atalhos rápidos; variante `ghost` disponível
- `Skeleton` (`@workspace/ui/components/skeleton`): disponível para simular estado de carregamento dos cards e listas
- `Separator` (`@workspace/ui/components/separator`): disponível para separadores entre seções
- `Tooltip` (`@workspace/ui/components/tooltip`): disponível para tooltips nos atalhos se necessário
- `ThemeProvider` (`apps/web/components/theme-provider`): já conectado, dark mode funcional

### Established Patterns
- Componentes seguem padrão shadcn: `cva()` para variantes, `cn()` para merge de classes
- `--radius: 0` globalmente — todos os componentes herdam bordas retas, incluindo os cards desta fase
- Tokens de cor em oklch — cor primária vermelho-laranja para destaques visuais
- Dados mockados como constantes TypeScript inline (sem backend, sem API)
- Perfis simulados já definidos na Fase 1 (Administrador, Comercial interno, Afiliado/Parceiro, Engenharia/Operação) — o dashboard usa a mesma lógica de perfil ativo

### Integration Points
- O dashboard é a rota principal após o login (`/portal` ou similar dentro do layout de shell criado na Fase 1)
- O shell (sidebar + header) já envolve o conteúdo — esta fase só precisa implementar o conteúdo interno da rota de dashboard
- A troca de perfil ativo (dropdown do avatar no header, Fase 1) deve reatualizar os cards e atalhos do dashboard
- Cada card clicável navega para a rota do módulo correspondente (rotas serão criadas nas fases seguintes — esta fase pode usar links com placeholder ou href="#" para módulos ainda não implementados)

</code_context>

<specifics>
## Specific Ideas

No specific references or "I want it like X" moments — open to standard approaches within the constraints defined above.

</specifics>

<deferred>
## Deferred Ideas

None — a discussão manteve o escopo da fase.

</deferred>

---

*Phase: 02-dashboard-e-home-operacional*
*Context gathered: 2026-03-19*
