# Dashboard Charts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Resumo por módulo" cards section with visual charts (horizontal bar chart, donut chart, and KPI cards).

**Architecture:** Create 4 new components under `apps/web/components/platform/dashboard/` that consume existing `DashboardModuleStat` data from `dashboard-data.ts`. Charts use shadcn/chart (Recharts) with CSS variables for theming.

**Tech Stack:** React, Recharts, shadcn/ui, Tailwind CSS, lucide-react

---

## File Structure

```
apps/web/components/platform/dashboard/
├── dashboard-charts-section.tsx   # Container (NEW)
├── dashboard-kpi-cards.tsx        # KPI cards (NEW)
├── dashboard-bar-chart.tsx        # Horizontal bar chart (NEW)
├── dashboard-donut-chart.tsx      # Donut chart (NEW)
├── dashboard-summary-grid.tsx     # Keep but unused in render
└── ...

packages/ui/src/components/
└── chart.tsx                      # Added via shadcn CLI (DONE)
```

---

## Task 1: Create KPI Cards Component

**Files:**
- Create: `apps/web/components/platform/dashboard/dashboard-kpi-cards.tsx`

- [ ] **Step 1: Create the KPI cards component**

```tsx
"use client"

import {
  LayersIcon,
  AlertCircleIcon,
  MailIcon,
  TrendingUpIcon,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export interface KpiData {
  totalItems: number
  totalPending: number
  unreadAnnouncements: number
  mostActiveModule: { label: string; count: number }
}

export interface DashboardKpiCardsProps {
  kpis: KpiData
}

const kpiConfig = [
  {
    key: "totalItems",
    label: "Total de itens",
    icon: LayersIcon,
    getColor: (v: number) => "text-foreground",
  },
  {
    key: "totalPending",
    label: "Pendencias",
    icon: AlertCircleIcon,
    getColor: (v: number) => (v > 0 ? "text-destructive" : "text-muted-foreground"),
  },
  {
    key: "unreadAnnouncements",
    label: "Nao lidos",
    icon: MailIcon,
    getColor: (v: number) => (v > 0 ? "text-primary" : "text-muted-foreground"),
  },
  {
    key: "mostActiveModule",
    label: "Mais ativo",
    icon: TrendingUpIcon,
    getColor: () => "text-primary",
  },
] as const

export function DashboardKpiCards({ kpis }: DashboardKpiCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {kpiConfig.map((config) => {
        const Icon = config.icon
        const value =
          config.key === "mostActiveModule"
            ? kpis.mostActiveModule.label
            : kpis[config.key as keyof Omit<KpiData, "mostActiveModule">]
        const colorClass =
          config.key === "mostActiveModule"
            ? config.getColor()
            : config.getColor(value as number)

        return (
          <Card key={config.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {config.label}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${colorClass}`}>
                {config.key === "mostActiveModule"
                  ? `${kpis.mostActiveModule.label} (${kpis.mostActiveModule.count})`
                  : value}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/components/platform/dashboard/dashboard-kpi-cards.tsx
git commit -m "feat(dashboard): add KPI cards component"
```

---

## Task 2: Create Horizontal Bar Chart Component

**Files:**
- Create: `apps/web/components/platform/dashboard/dashboard-bar-chart.tsx`

- [ ] **Step 1: Create the bar chart component**

```tsx
"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  type ChartConfig,
} from "@workspace/ui/components/chart"

export interface BarChartItem {
  module: string
  value: number
  fill: string
}

export interface DashboardBarChartProps {
  data: BarChartItem[]
}

const chartConfig = {
  value: {
    label: "Itens ativos",
  },
} satisfies ChartConfig

export function DashboardBarChart({ data }: DashboardBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking por Modulo</CardTitle>
        <CardDescription>Quantidade de itens ativos por modulo</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0, right: 16 }}
          >
            <CartesianGrid horizontal={false} className="stroke-border/50" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="module"
              type="category"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              className="text-xs"
              width={100}
            />
            <Bar
              dataKey="value"
              radius={4}
              className="fill-primary"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/components/platform/dashboard/dashboard-bar-chart.tsx
git commit -m "feat(dashboard): add horizontal bar chart component"
```

---

## Task 3: Create Donut Chart Component

**Files:**
- Create: `apps/web/components/platform/dashboard/dashboard-donut-chart.tsx`

- [ ] **Step 1: Create the donut chart component**

```tsx
"use client"

import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"

export interface DonutChartItem {
  status: string
  value: number
  fill: string
}

export interface DashboardDonutChartProps {
  data: DonutChartItem[]
  total: number
}

export function DashboardDonutChart({ data, total }: DashboardDonutChartProps) {
  const pendingItem = data.find((d) => d.status === "Pendente")
  const pendingCount = pendingItem?.value ?? 0
  const pendingPercent = total > 0 ? Math.round((pendingCount / total) * 100) : 0

  const chartConfig = {
    emDia: {
      label: "Em dia",
      color: "hsl(var(--chart-2))",
    },
    pendente: {
      label: "Pendente",
      color: "hsl(var(--destructive))",
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuicao de Status</CardTitle>
        <CardDescription>Proporcao de itens em dia vs pendentes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto h-[300px] w-full">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <span>
                      {name}: {value} ({total > 0 ? Math.round(((value as number) / total) * 100) : 0}%)
                    </span>
                  )}
                />
              }
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-2xl font-bold"
              >
                {pendingPercent}%
              </text>
              <text
                x="50%"
                y="65%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground text-xs"
              >
                Pendentes
              </text>
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/components/platform/dashboard/dashboard-donut-chart.tsx
git commit -m "feat(dashboard): add donut chart component"
```

---

## Task 4: Create Charts Section Container

**Files:**
- Create: `apps/web/components/platform/dashboard/dashboard-charts-section.tsx`

- [ ] **Step 1: Create the charts section container**

```tsx
"use client"

import { useMemo } from "react"
import type { DashboardModuleStat } from "@/lib/dashboard-data"
import { DashboardKpiCards, type KpiData } from "./dashboard-kpi-cards"
import { DashboardBarChart, type BarChartItem } from "./dashboard-bar-chart"
import { DashboardDonutChart, type DonutChartItem } from "./dashboard-donut-chart"

export interface DashboardChartsSectionProps {
  modules: DashboardModuleStat[]
}

export function DashboardChartsSection({ modules }: DashboardChartsSectionProps) {
  const kpis = useMemo<KpiData>(() => {
    const totalItems = modules.reduce((sum, m) => sum + m.activeCount, 0)
    const totalPending = modules.reduce((sum, m) => sum + m.pendingCount, 0)
    const sorted = [...modules].sort((a, b) => b.activeCount - a.activeCount)
    const mostActive = sorted[0]

    return {
      totalItems,
      totalPending,
      unreadAnnouncements: 2, // Mock value
      mostActiveModule: mostActive
        ? { label: mostActive.label, count: mostActive.activeCount }
        : { label: "Nenhum", count: 0 },
    }
  }, [modules])

  const barData = useMemo<BarChartItem[]>(() => {
    const chartColors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ]
    return modules
      .sort((a, b) => b.activeCount - a.activeCount)
      .slice(0, 6)
      .map((mod, i) => ({
        module: mod.label,
        value: mod.activeCount,
        fill: chartColors[i % chartColors.length],
      }))
  }, [modules])

  const donutData = useMemo<DonutChartItem[]>(() => {
    const totalActive = modules.reduce((sum, m) => sum + m.activeCount, 0)
    const totalPending = modules.reduce((sum, m) => sum + m.pendingCount, 0)
    const emDia = totalActive - totalPending

    return [
      { status: "Em dia", value: emDia, fill: "hsl(var(--chart-2))" },
      { status: "Pendente", value: totalPending, fill: "hsl(var(--destructive))" },
    ]
  }, [modules])

  const total = useMemo(() => {
    return modules.reduce((sum, m) => sum + m.activeCount, 0)
  }, [modules])

  return (
    <div className="flex flex-col gap-4">
      <DashboardKpiCards kpis={kpis} />
      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardBarChart data={barData} />
        <DashboardDonutChart data={donutData} total={total} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/components/platform/dashboard/dashboard-charts-section.tsx
git commit -m "feat(dashboard): add charts section container"
```

---

## Task 5: Integrate in PortalDashboard

**Files:**
- Modify: `apps/web/components/platform/portal-dashboard.tsx`

- [ ] **Step 1: Update imports and replace component**

Replace line 15:
```tsx
import { DashboardSummaryGrid } from "@/components/platform/dashboard/dashboard-summary-grid"
```

With:
```tsx
import { DashboardChartsSection } from "@/components/platform/dashboard/dashboard-charts-section"
```

Replace line 51:
```tsx
<DashboardSummaryGrid modules={modules} />
```

With:
```tsx
<DashboardChartsSection modules={modules} />
```

- [ ] **Step 2: Verify the file looks correct**

Full updated file:

```tsx
"use client"

import { useActiveProfile } from "@/components/platform/platform-shell-provider"
import {
  getDashboardModulesForProfile,
  getDashboardQuickActionsForProfile,
  getDashboardAnnouncements,
  getDashboardHighlightsForProfile,
  getTotalPendingCount,
} from "@/lib/dashboard-data"
import { getJourneyPendencies } from "@/lib/journey-data"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { CardGridSkeleton } from "@/components/platform/states/skeletons"
import { DashboardWelcome } from "@/components/platform/dashboard/dashboard-welcome"
import { DashboardChartsSection } from "@/components/platform/dashboard/dashboard-charts-section"
import { DashboardQuickActions } from "@/components/platform/dashboard/dashboard-quick-actions"
import { DashboardAnnouncements } from "@/components/platform/dashboard/dashboard-announcements"
import { DashboardUrgentHighlights } from "@/components/platform/dashboard/dashboard-urgent-highlights"
import { DashboardJourneyPendencies } from "@/components/platform/dashboard/dashboard-journey-pendencies"

/** Renders the main portal dashboard with summary cards, quick actions, and announcements. */
export function PortalDashboard() {
  const { activeProfile, profileLabel } = useActiveProfile()
  const isLoading = useSimulatedLoading()

  const modules = getDashboardModulesForProfile(activeProfile)
  const quickActions = getDashboardQuickActionsForProfile(activeProfile)
  const announcements = getDashboardAnnouncements()
  const highlights = getDashboardHighlightsForProfile(activeProfile)
  const totalPendingCount = getTotalPendingCount(modules)
  const journeyPendencies = getJourneyPendencies()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <CardGridSkeleton cards={4} />
        <CardGridSkeleton cards={3} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome strip */}
      <DashboardWelcome
        profileLabel={profileLabel}
        totalPendingCount={totalPendingCount}
      />

      {/* Charts section */}
      <DashboardChartsSection modules={modules} />

      {/* Quick-actions row */}
      <DashboardQuickActions actions={quickActions} />

      {/* Journey pendencies panel */}
      <DashboardJourneyPendencies items={journeyPendencies} />

      {/* Footer grid: announcements (left) + urgent highlights (right) */}
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-5">
        <div className="lg:col-span-3">
          <DashboardAnnouncements items={announcements} />
        </div>
        <div className="lg:col-span-2">
          <DashboardUrgentHighlights items={highlights} />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Run typecheck**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add apps/web/components/platform/portal-dashboard.tsx
git commit -m "feat(dashboard): integrate charts section into portal dashboard"
```

---

## Task 6: Final Verification

- [ ] **Step 1: Run dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Manual verification checklist**

1. Open http://localhost:3000/portal in browser
2. Verify KPI cards show correct values
3. Verify bar chart displays modules sorted by count
4. Verify donut chart shows Em dia/Pendente distribution
5. Hover over bars and pie slices - tooltips should appear
6. Resize browser to mobile width - layout should stack vertically
7. Toggle dark mode (press D) - colors should adjust

- [ ] **Step 3: Run lint**

```bash
pnpm lint
```

Expected: No errors

- [ ] **Step 4: Final commit (if any fixes needed)**

```bash
git add .
git commit -m "fix(dashboard): adjust chart styling and colors"
```

---

## Acceptance Criteria

- [ ] Component `chart` installed via shadcn CLI
- [ ] 4 KPI cards displaying correct metrics
- [ ] Horizontal bar chart with module ranking
- [ ] Donut chart with Em dia/Pendente distribution
- [ ] Responsive layout (mobile/desktop)
- [ ] Tooltips working on both charts
- [ ] Correct colors in light and dark mode
- [ ] `DashboardSummaryGrid` removed from render but kept in codebase

---

## References

- Spec: `docs/superpowers/specs/2026-03-23-dashboard-charts-design.md`
- [shadcn/ui Charts](https://ui.shadcn.com/docs/components/chart)
- [Recharts API](https://recharts.org/en-US/api)
