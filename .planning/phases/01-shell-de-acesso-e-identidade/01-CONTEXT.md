# Phase 1: Shell de Acesso e Identidade - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Entregar a entrada simulada (tela de login), o shell principal da plataforma (sidebar, header, breadcrumbs) e a diferenciação visual entre perfis simulados. Esta fase não inclui conteúdo de nenhum módulo (dashboard, CRM, Orçamentos etc.) — apenas o invólucro navegável e a base de identidade visual. Módulos aparecem como placeholders na navegação.

**Requirements in scope:** AUTH-01, AUTH-02, PORT-02, PORT-04, ROLE-01, ROLE-02

</domain>

<decisions>
## Implementation Decisions

### Identidade Visual da Marca

- **Cor primária:** Token atual de vermelho-laranja (oklch 27° de matiz) está correto — representa a identidade da Hi Engenharia. Manter sem alteração.
- **Border radius:** Manter `--radius: 0` (bordas completamente retas). Visual técnico e preciso, coerente com o setor de engenharia.
- **Logo:** A Hi Engenharia tem logo real. O arquivo será fornecido pelo usuário. Integrar o logo real (não criar placeholder) na sidebar e na tela de login.
- **Dark mode:** Suporte completo desde o início. Os tokens dark já estão definidos em globals.css — ativar e garantir que o shell seja coerente em ambos os temas.
- **Tom:** Moderno e agradável — respiração generosa entre elementos, boa legibilidade, acessível para usuários não técnicos (Afiliados, Parceiros externos), sem ser genérico.

### Tela de Login (AUTH-01, AUTH-02)

- **Fluxo simulado:** Usuário preenche email e senha — qualquer valor é aceito. Sem validação real, sem erro de credenciais. Botão "Entrar" redireciona ao portal após submissão (pode ter delay visual breve).
- **Layout desktop:** Tela dividida 50/50 — metade esquerda com formulário centralizado (logo + campos + botão), metade direita com a cor primária sólida da marca + logo ou slogan da Hi Engenharia em branco.
- **Layout mobile:** O painel direito some. Apenas o formulário centralizado, fundo neutro ou cor primária suave.
- **Seleção de perfil:** Não acontece na tela de login. Usuário entra sempre no shell e troca de perfil de dentro dele.

### Shell: Sidebar e Header (PORT-02, PORT-04)

- **Sidebar desktop:** Sempre visível, collapsível. Aberta: ícone + label. Recolhida: só ícones com tooltip ao hover. Toggle via botão na sidebar ou atalho.
- **Sidebar mobile:** Sidebar some por padrão. Header ganha botão hambúrguer que abre a sidebar como drawer sobreposto (desliza da esquerda).
- **Logo na sidebar:** Topo da sidebar, acima dos itens de navegação. Quando colapsada, colapsa para versão ícone/símbolo do logo.
- **Agrupamento de módulos na sidebar:** Sidebar organizada em seções com rótulos de grupo:
  - **OPERAÇÃO:** Portal, Orçamentos, CRM
  - **PROJETOS:** Anteprojetos, Projetos, Obras
  - **CONTEÚDO:** Drive, Comunicação
  - **FERRAMENTAS:** Gerador de Propostas, Tabela de Preços
- **Header:** `[Nome do módulo] > [breadcrumb]` à esquerda — `[badge de perfil ativo] [avatar com dropdown]` à direita.
- **Breadcrumbs:** Mostram o caminho atual dentro do módulo. Ex: `Portal > Início`, `CRM > Oportunidades > Detalhe`. Estrutura PORT-04.

### Diferenciação Visual por Perfil (ROLE-01, ROLE-02)

- **Perfis simulados presentes nesta fase:** Administrador, Comercial interno, Afiliado/Parceiro externo, Engenharia/Operação.
- **Como trocar de perfil:** Dropdown no avatar do header. Clicar no avatar abre menu com lista dos 4 perfis — selecionar muda o perfil ativo e reconfigura a sidebar.
- **Áreas restritas:** Itens de menu simplesmente não aparecem para perfis sem acesso (não esmaecidos — ocultos). Cada perfil vê apenas o conjunto de módulos que lhe é permitido.
- **Layout do perfil:** Todos os perfis usam o mesmo shell (sidebar + header). O que muda é o conjunto de itens visíveis na sidebar.
- **Mapeamento de visibilidade por perfil (referência para implementação):**
  - Administrador: todos os módulos visíveis
  - Comercial interno: Portal, Orçamentos, CRM, Propostas, Tabela de Preços
  - Afiliado/Parceiro externo: Portal, Orçamentos (só criação/acompanhamento próprio)
  - Engenharia/Operação: Portal, Anteprojetos, Projetos, Obras, Drive

### Claude's Discretion

- Animação de colapso/abertura da sidebar
- Delay visual exato no submit do login (loading spinner, duração)
- Espaçamento e tipografia exatos de cada seção do header e breadcrumb
- Breakpoint exato onde a sidebar vira drawer no mobile
- Ícone específico de cada módulo na sidebar (usar lucide-react)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requisitos da fase
- `.planning/REQUIREMENTS.md` — AUTH-01, AUTH-02, PORT-02, PORT-04, ROLE-01, ROLE-02: critérios de aceitação desta fase
- `.planning/ROADMAP.md` §Phase 1 — Success criteria e lista de planos (01-01 a 01-04)

### Projeto e constraints
- `.planning/PROJECT.md` — Constraints obrigatórias: frontend-only, shadcn como base, Next.js 16 / React 19 / Tailwind CSS 4, dados mockados
- `.planning/STATE.md` — Estado atual do projeto e bloqueadores conhecidos

### Base de código existente
- `packages/ui/src/styles/globals.css` — Tokens de design (cores em oklch, --radius: 0, variáveis de sidebar, dark mode)
- `packages/ui/src/components/button.tsx` — Único componente existente no @workspace/ui — padrão shadcn com cva
- `apps/web/app/layout.tsx` — Root layout com ThemeProvider, fontes Raleway (sans) e Geist Mono
- `apps/web/components/theme-provider.tsx` — next-themes com class strategy, toggle "D" para dark mode

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Button` (`@workspace/ui/components/button`): variantes default, outline, secondary, ghost, destructive, link. Tamanhos xs, sm, default, lg, icon. Pronto para uso imediato no login e no shell.
- `ThemeProvider` (`apps/web/components/theme-provider`): já conectado ao root layout com next-themes. Dark mode por classe `.dark`. Toggle via tecla "D".
- Fontes configuradas: Raleway como `--font-sans`, Geist Mono como `--font-mono`. Já no root layout.

### Established Patterns
- Componentes seguem padrão shadcn: `cva()` para variantes, `cn()` para merge de classes, `data-slot` attrs.
- CSS usa `oklch` color space para todos os tokens — manter consistência ao adicionar novos tokens de marca.
- `--radius: 0` definido globalmente — todos os componentes herdam bordas retas automaticamente.
- Tokens de sidebar já existem (`--sidebar`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border` em light e dark) — o shadcn Sidebar component pode ser adicionado via MCP shadcn e usará esses tokens diretamente.

### Integration Points
- O shell substitui o conteúdo atual de `apps/web/app/page.tsx` (placeholder "Project ready!").
- Novas rotas precisam ser criadas dentro de `apps/web/app/` seguindo o App Router do Next.js 16.
- A tela de login será uma rota pública (`/login` ou `/`). O shell será uma rota protegida visualmente (`/portal`, ou layout em `app/(shell)/`).
- Novos componentes de UI (Sidebar, Header etc.) devem ir em `packages/ui/src/components/` para reuso nas fases seguintes.

</code_context>

<specifics>
## Specific Ideas

- Logo real será fornecido pelo usuário — aguardar antes de finalizar o plano 01-01 ou 01-02.
- Painel direito da tela de login: cor primária sólida (#vermelho-laranja) com logo ou slogan branco.
- Agrupamento da sidebar inspirado em apps operacionais tipo Linear ou Notion — rótulos em caps pequenas, seções colapsáveis se necessário.

</specifics>

<deferred>
## Deferred Ideas

None — a discussão manteve o escopo da fase.

</deferred>

---

*Phase: 01-shell-de-acesso-e-identidade*
*Context gathered: 2026-03-19*
