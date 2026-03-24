"use client"

import * as React from "react"
import { useMemo } from "react"

import { type DashboardModuleStat } from "@/lib/dashboard-data"
import { DashboardKpiCards, type KpiData } from "./dashboard-kpi-cards"
import { DashboardBarChart, type BarChartItem } from "./dashboard-bar-chart"
import {
  DashboardDonutChart,
  type DonutChartItem,
} from "./dashboard-donut-chart"
import {
  DashboardSalesChart,
  type SalesChartItem,
} from "./dashboard-sales-chart"

export interface DashboardChartsSectionProps {
  modules: DashboardModuleStat[]
}

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

// Dados mock de vendas (será integrado com fonte real futuramente)
const salesData: SalesChartItem[] = [
  { date: "2024-04-01", online: 222, presencial: 150 },
  { date: "2024-04-02", online: 97, presencial: 180 },
  { date: "2024-04-03", online: 167, presencial: 120 },
  { date: "2024-04-04", online: 242, presencial: 260 },
  { date: "2024-04-05", online: 373, presencial: 290 },
  { date: "2024-04-06", online: 301, presencial: 340 },
  { date: "2024-04-07", online: 245, presencial: 180 },
  { date: "2024-04-08", online: 409, presencial: 320 },
  { date: "2024-04-09", online: 59, presencial: 110 },
  { date: "2024-04-10", online: 261, presencial: 190 },
  { date: "2024-04-11", online: 327, presencial: 350 },
  { date: "2024-04-12", online: 292, presencial: 210 },
  { date: "2024-04-13", online: 342, presencial: 380 },
  { date: "2024-04-14", online: 137, presencial: 220 },
  { date: "2024-04-15", online: 120, presencial: 170 },
  { date: "2024-04-16", online: 138, presencial: 190 },
  { date: "2024-04-17", online: 446, presencial: 360 },
  { date: "2024-04-18", online: 364, presencial: 410 },
  { date: "2024-04-19", online: 243, presencial: 180 },
  { date: "2024-04-20", online: 89, presencial: 150 },
  { date: "2024-04-21", online: 137, presencial: 200 },
  { date: "2024-04-22", online: 224, presencial: 170 },
  { date: "2024-04-23", online: 138, presencial: 230 },
  { date: "2024-04-24", online: 387, presencial: 290 },
  { date: "2024-04-25", online: 215, presencial: 250 },
  { date: "2024-04-26", online: 75, presencial: 130 },
  { date: "2024-04-27", online: 383, presencial: 420 },
  { date: "2024-04-28", online: 122, presencial: 180 },
  { date: "2024-04-29", online: 315, presencial: 240 },
  { date: "2024-04-30", online: 454, presencial: 380 },
  { date: "2024-05-01", online: 165, presencial: 220 },
  { date: "2024-05-02", online: 293, presencial: 310 },
  { date: "2024-05-03", online: 247, presencial: 190 },
  { date: "2024-05-04", online: 385, presencial: 420 },
  { date: "2024-05-05", online: 481, presencial: 390 },
  { date: "2024-05-06", online: 498, presencial: 520 },
  { date: "2024-05-07", online: 388, presencial: 300 },
  { date: "2024-05-08", online: 149, presencial: 210 },
  { date: "2024-05-09", online: 227, presencial: 180 },
  { date: "2024-05-10", online: 293, presencial: 330 },
  { date: "2024-05-11", online: 335, presencial: 270 },
  { date: "2024-05-12", online: 197, presencial: 240 },
  { date: "2024-05-13", online: 197, presencial: 160 },
  { date: "2024-05-14", online: 448, presencial: 490 },
  { date: "2024-05-15", online: 473, presencial: 380 },
  { date: "2024-05-16", online: 338, presencial: 400 },
  { date: "2024-05-17", online: 499, presencial: 420 },
  { date: "2024-05-18", online: 315, presencial: 350 },
  { date: "2024-05-19", online: 235, presencial: 180 },
  { date: "2024-05-20", online: 177, presencial: 230 },
  { date: "2024-05-21", online: 82, presencial: 140 },
  { date: "2024-05-22", online: 81, presencial: 120 },
  { date: "2024-05-23", online: 252, presencial: 290 },
  { date: "2024-05-24", online: 294, presencial: 220 },
  { date: "2024-05-25", online: 201, presencial: 250 },
  { date: "2024-05-26", online: 213, presencial: 170 },
  { date: "2024-05-27", online: 420, presencial: 460 },
  { date: "2024-05-28", online: 233, presencial: 190 },
  { date: "2024-05-29", online: 78, presencial: 130 },
  { date: "2024-05-30", online: 340, presencial: 280 },
  { date: "2024-05-31", online: 178, presencial: 230 },
  { date: "2024-06-01", online: 178, presencial: 200 },
  { date: "2024-06-02", online: 470, presencial: 410 },
  { date: "2024-06-03", online: 103, presencial: 160 },
  { date: "2024-06-04", online: 439, presencial: 380 },
  { date: "2024-06-05", online: 88, presencial: 140 },
  { date: "2024-06-06", online: 294, presencial: 250 },
  { date: "2024-06-07", online: 323, presencial: 370 },
  { date: "2024-06-08", online: 385, presencial: 320 },
  { date: "2024-06-09", online: 438, presencial: 480 },
  { date: "2024-06-10", online: 155, presencial: 200 },
  { date: "2024-06-11", online: 92, presencial: 150 },
  { date: "2024-06-12", online: 492, presencial: 420 },
  { date: "2024-06-13", online: 81, presencial: 130 },
  { date: "2024-06-14", online: 426, presencial: 380 },
  { date: "2024-06-15", online: 307, presencial: 350 },
  { date: "2024-06-16", online: 371, presencial: 310 },
  { date: "2024-06-17", online: 475, presencial: 520 },
  { date: "2024-06-18", online: 107, presencial: 170 },
  { date: "2024-06-19", online: 341, presencial: 290 },
  { date: "2024-06-20", online: 408, presencial: 450 },
  { date: "2024-06-21", online: 169, presencial: 210 },
  { date: "2024-06-22", online: 317, presencial: 270 },
  { date: "2024-06-23", online: 480, presencial: 530 },
  { date: "2024-06-24", online: 132, presencial: 180 },
  { date: "2024-06-25", online: 141, presencial: 190 },
  { date: "2024-06-26", online: 434, presencial: 380 },
  { date: "2024-06-27", online: 448, presencial: 490 },
  { date: "2024-06-28", online: 149, presencial: 200 },
  { date: "2024-06-29", online: 103, presencial: 160 },
  { date: "2024-06-30", online: 446, presencial: 400 },
]

function DashboardChartsSectionInner({ modules }: DashboardChartsSectionProps) {
  const total = useMemo(
    () => modules.reduce((sum, mod) => sum + mod.activeCount, 0),
    [modules]
  )

  const kpis = useMemo<KpiData>(() => {
    const totalPending = modules.reduce((sum, mod) => sum + mod.pendingCount, 0)
    // Mock: comunicados não lidos (será integrado com fonte real futuramente)
    const unreadAnnouncements = 2

    const mostActive = modules.reduce(
      (max, mod) => (mod.activeCount > max.activeCount ? mod : max),
      modules[0] || { label: "Nenhum", activeCount: 0 }
    )

    return {
      totalItems: total,
      totalPending,
      unreadAnnouncements,
      mostActiveModule: {
        label: mostActive.label,
        count: mostActive.activeCount,
      },
    }
  }, [modules, total])

  // Build bar chart data from the modules with pending work.
  const barData = useMemo<BarChartItem[]>(() => {
    return [...modules]
      .filter((mod) => mod.pendingCount > 0)
      .sort((a, b) => b.pendingCount - a.pendingCount)
      .slice(0, 6)
      .map((mod, index) => ({
        module: mod.label,
        value: mod.pendingCount,
        fill: chartColors[index % chartColors.length] ?? "var(--primary)",
      }))
  }, [modules])

  const donutData = useMemo<DonutChartItem[]>(() => {
    const totalPending = modules.reduce((sum, mod) => sum + mod.pendingCount, 0)
    const emDia = total - totalPending

    return [
      {
        status: "Em dia",
        value: emDia,
        fill: "var(--chart-2)",
      },
      {
        status: "Pendente",
        value: totalPending,
        fill: "var(--destructive)",
      },
    ]
  }, [modules, total])

  return (
    <div className="flex flex-col gap-4">
      <DashboardSalesChart data={salesData} />
      <DashboardKpiCards kpis={kpis} />
      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardBarChart data={barData} />
        <DashboardDonutChart data={donutData} total={total} />
      </div>
    </div>
  )
}

// Memoize the component to prevent re-renders during sidebar animation
export const DashboardChartsSection = React.memo(DashboardChartsSectionInner)
