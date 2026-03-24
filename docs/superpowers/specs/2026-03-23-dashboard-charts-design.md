# Dashboard Charts — Design Spec

**Data:** 2026-03-23
**Status:** Draft
**Autoria:** Claude + Anthony

## Sumário

Substituir a seção "Resumo por módulo" do dashboard por gráficos visuais usando componentes shadcn/chart (Recharts).

---

## Objetivo

Transformar cards textuais de resumo em visualizações gráficas mais informativas:
- Barras horizontais para ranking de módulos por volume
- Gráfico de rosca para distribuição de status (em dia vs pendente)
- KPI cards destacados com métricas principais

---

## Escopo

### Incluído
- Adicionar componente `chart` via MCP shadcn
- Criar `DashboardChartsSection` com 3 subcomponentes
- Integrar com dados existentes em `dashboard-data.ts`
- Layout responsivo (1 coluna mobile, 2 colunas desktop)

### Não incluído
- Dados reais de API (continua usando mock)
- Filtros de período ou interatividade avançada
- Novos tipos de gráfico além dos especificados

---

## Arquitetura

### Estrutura de arquivos

```
apps/web/components/platform/dashboard/
├── dashboard-charts-section.tsx   # Container principal
├── dashboard-kpi-cards.tsx        # 4 cards de KPI
├── dashboard-bar-chart.tsx        # Gráfico de barras horizontais
└── dashboard-donut-chart.tsx      # Gráfico de rosca

packages/ui/src/components/
└── chart.tsx                      # Adicionado via shadcn CLI
```

### Fluxo de dados

```
PortalDashboard
    │
    ├── getDashboardModulesForProfile(profile)
    │
    └── DashboardChartsSection { modules }
            │
            ├── DashboardKpiCards { kpis }
            ├── DashboardBarChart { barData }
            └── DashboardDonutChart { donutData }
```

### Integração

Em `portal-dashboard.tsx`, substituir:

```tsx
// Antes
<DashboardSummaryGrid modules={modules} />

// Depois
<DashboardChartsSection modules={modules} />
```

Manter `DashboardSummaryGrid` no código para possível reuso futuro.

---

## Componentes

### 1. DashboardKpiCards

**Props:**
```tsx
interface KpiData {
  totalItems: number
  totalPending: number
  unreadAnnouncements: number
  mostActiveModule: { label: string; count: number }
}

interface DashboardKpiCardsProps {
  kpis: KpiData
}
```

**Layout:** 4 cards em grid responsivo (`grid-cols-2 md:grid-cols-4`)

**Cards:**
| Label | Valor | Ícone |
|-------|-------|-------|
| Total de itens | soma activeCount | `LayersIcon` |
| Pendências | soma pendingCount | `AlertCircleIcon` |
| Não lidos | unreadAnnouncements | `MailIcon` |
| Mais ativo | label do módulo | `TrendingUpIcon` |

---

### 2. DashboardBarChart

**Props:**
```tsx
interface BarChartItem {
  module: string   // Label do módulo
  value: number    // activeCount
  fill: string     // Cor da barra
}

interface DashboardBarChartProps {
  data: BarChartItem[]
}
```

**Específicação:**
- Tipo: Barras horizontais (`BarChart` com `layout="vertical"`)
- Eixo Y: Labels dos módulos
- Eixo X: Quantidade
- Cores: Variável CSS `--chart-1` até `--chart-5` (cíclico)
- Tooltip: Nome do módulo + valor ao passar o mouse
- Altura: ~300px
- Container: `Card` com header "Ranking por Módulo"

**Referência shadcn:** `chart-bar-horizontal` block

---

### 3. DashboardDonutChart

**Props:**
```tsx
interface DonutChartItem {
  status: string   // "Em dia" | "Pendente"
  value: number
  fill: string     // Cor da fatia
}

interface DashboardDonutChartProps {
  data: DonutChartItem[]
  total: number
}
```

**Específicação:**
- Tipo: Rosca (`PieChart` com innerRadius)
- Fatias: 2 (Em dia = verde/success, Pendente = amarelo/warning)
- Texto central: Percentual de pendências ou "0%" se nenhuma
- Tooltip: Status + quantidade + percentual
- Altura: ~300px
- Container: `Card` com header "Distribuição de Status"

**Referência shadcn:** `chart-pie-donut-text` block

---

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  KPI Cards (4 cards em linha, responsivo)                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │ Total   │ │Pendênc. │ │Não lidos│ │+Ativo   │            │
│  │  247    │ │   14    │ │    2    │ │CRM (28) │            │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘            │
├────────────────────────────────┬─────────────────────────────┤
│  Ranking por Módulo            │  Distribuição de Status     │
│  ┌──────────────────────┐      │  ┌─────────────────────┐    │
│  │ CRM        ████████  │      │  │      ╭──────╮       │    │
│  │ Projetos   ██████    │      │  │     ╱  94%  ╲      │    │
│  │ Orçamentos █████     │      │  │    │ Em dia  │      │    │
│  │ Obras      ████       │      │  │     ╲   6%  ╱      │    │
│  │ ...                   │      │  │      ╰──────╯       │    │
│  └──────────────────────┘      │  └─────────────────────┘    │
└────────────────────────────────┴─────────────────────────────┘
```

**Responsividade:**
- Mobile (< lg): KPIs em 2x2, gráficos empilhados verticalmente
- Desktop (≥ lg): KPIs em 1x4, gráficos lado a lado (grid-cols-2)

---

## Implementação

### Passo 1: Instalar chart component

```bash
pnpm dlx shadcn@latest add chart -c apps/web
```

Isso instala:
- `recharts` como dependência
- `packages/ui/src/components/chart.tsx`
- Atualiza `globals.css` com variáveis `--chart-*`

### Passo 2: Criar componentes do dashboard

1. `dashboard-kpi-cards.tsx`
2. `dashboard-bar-chart.tsx`
3. `dashboard-donut-chart.tsx`
4. `dashboard-charts-section.tsx` (container)

### Passo 3: Integrar no PortalDashboard

Atualizar `portal-dashboard.tsx`:
- Importar `DashboardChartsSection`
- Substituir `DashboardSummaryGrid` pelo novo componente
- Passar `modules` como prop

### Passo 4: Testar responsividade

- Verificar layout em mobile (< 1024px)
- Verificar tooltips e interação hover
- Verificar cores em modo dark/light

---

## Cores e Tema

Usar variáveis CSS definidas pelo shadcn chart:

```css
/* Light mode */
--chart-1: ...  /* Primary */
--chart-2: ...  /* Secondary */
--chart-3: ...  /* Accent */
--chart-4: ...  /* Muted */
--chart-5: ...  /* Destructive */
```

Cores específicas:
- Barras: `--chart-1` até `--chart-5` (cíclico por módulo)
- "Em dia": `hsl(var(--success))` ou `oklch(var(--success))`
- "Pendente": `hsl(var(--warning))` ou `oklch(var(--warning))`

---

## Critérios de Aceite

- [ ] Componente `chart` instalado via shadcn CLI
- [ ] 4 KPI cards exibindo métricas corretas
- [ ] Gráfico de barras horizontais com ranking de módulos
- [ ] Gráfico de rosca com distribuição Em dia/Pendente
- [ ] Layout responsivo (mobile/desktop)
- [ ] Tooltips funcionando em ambos gráficos
- [ ] Cores corretas em modo claro e escuro
- [ ] `DashboardSummaryGrid` removido do render mas mantido no código

---

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Performance com muitos módulos | Limitar a 5-6 módulos no gráfico de barras |
| Cores inconsistentes no dark mode | Usar variáveis CSS do tema |
| Dados mock desatualizados | Estrutura preparada para dados reais no futuro |

---

## Referências

- [shadcn/ui Charts](https://ui.shadcn.com/docs/components/chart)
- [Recharts API](https://recharts.org/en-US/api)
- Bloco shadcn: `chart-bar-horizontal`
- Bloco shadcn: `chart-pie-donut-text`
