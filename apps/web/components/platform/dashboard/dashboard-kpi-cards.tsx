"use client"

import {
  AlertCircleIcon,
  LayersIcon,
  MailIcon,
  TrendingUpIcon,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

export interface KpiData {
  totalItems: number
  totalPending: number
  unreadAnnouncements: number
  mostActiveModule: { label: string; count: number }
}

export interface DashboardKpiCardsProps {
  kpis: KpiData
}

export function DashboardKpiCards({ kpis }: DashboardKpiCardsProps) {
  const { totalItems, totalPending, unreadAnnouncements, mostActiveModule } =
    kpis

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {/* Total de itens */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
          <LayersIcon className="size-5 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">Total de itens</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-semibold">{totalItems}</span>
        </CardContent>
      </Card>

      {/* Pendencias */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
          <AlertCircleIcon
            className={cn(
              "size-5",
              totalPending > 0 ? "text-destructive" : "text-muted-foreground"
            )}
          />
          <CardTitle className="text-sm font-medium">Pendencias</CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={cn(
              "text-2xl font-semibold",
              totalPending > 0 ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {totalPending}
          </span>
        </CardContent>
      </Card>

      {/* Nao lidos */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
          <MailIcon
            className={cn(
              "size-5",
              unreadAnnouncements > 0 ? "text-primary" : "text-muted-foreground"
            )}
          />
          <CardTitle className="text-sm font-medium">Nao lidos</CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={cn(
              "text-2xl font-semibold",
              unreadAnnouncements > 0 ? "text-primary" : "text-muted-foreground"
            )}
          >
            {unreadAnnouncements}
          </span>
        </CardContent>
      </Card>

      {/* Mais ativo */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
          <TrendingUpIcon className="size-5 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">Mais ativo</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-lg font-medium">
            {mostActiveModule.label} ({mostActiveModule.count})
          </span>
        </CardContent>
      </Card>
    </div>
  )
}
