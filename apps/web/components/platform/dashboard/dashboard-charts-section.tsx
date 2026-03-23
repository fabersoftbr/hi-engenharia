"use client"

import { useMemo } from "react"

import { type DashboardModuleStat } from "@/lib/dashboard-data"
import { DashboardKpiCards, type KpiData } from "./dashboard-kpi-cards"
import { DashboardBarChart, type BarChartItem } from "./dashboard-bar-chart"
import {
  DashboardDonutChart,
  type DonutChartItem,
} from "./dashboard-donut-chart"

export interface DashboardChartsSectionProps {
  modules: DashboardModuleStat[]
}

// Cores para o gráfico de barras
const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function DashboardChartsSection({
  modules,
}: DashboardChartsSectionProps) {
  // Calcula o total de itens ativos
  const total = useMemo(
    () => modules.reduce((sum, mod) => sum + mod.activeCount, 0),
    [modules]
  )

  // Calcula KPIs derivados
  const kpis = useMemo<KpiData>(() => {
    const totalItems = total
    const totalPending = modules.reduce((sum, mod) => sum + mod.pendingCount, 0)
    // Mock: comunicados não lidos (será integrado com fonte real futuramente)
    const unreadAnnouncements = 2

    // Encontra o módulo mais ativo
    const mostActive = modules.reduce(
      (max, mod) => (mod.activeCount > max.activeCount ? mod : max),
      modules[0] || { label: "Nenhum", activeCount: 0 }
    )

    return {
      totalItems,
      totalPending,
      unreadAnnouncements,
      mostActiveModule: {
        label: mostActive.label,
        count: mostActive.activeCount,
      },
    }
  }, [modules, total])

  // Prepara dados para o gráfico de barras (top 6 por activeCount)
  const barData = useMemo<BarChartItem[]>(() => {
    return [...modules]
      .sort((a, b) => b.activeCount - a.activeCount)
      .slice(0, 6)
      .map((mod, index) => ({
        module: mod.label,
        value: mod.activeCount,
        fill: chartColors[index % chartColors.length] ?? "hsl(var(--primary))",
      }))
  }, [modules])

  // Prepara dados para o gráfico de rosca (Em dia vs Pendente)
  const donutData = useMemo<DonutChartItem[]>(() => {
    const totalPending = modules.reduce((sum, mod) => sum + mod.pendingCount, 0)
    const emDia = total - totalPending

    return [
      {
        status: "Em dia",
        value: emDia,
        fill: "hsl(var(--chart-2))",
      },
      {
        status: "Pendente",
        value: totalPending,
        fill: "hsl(var(--destructive))",
      },
    ]
  }, [modules, total])

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
