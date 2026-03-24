"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { CheckCircleIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { EmptyState } from "@/components/platform/states/empty-state"
import type { JourneyPendency } from "@/lib/dashboard-data"

const MODULE_COLORS: Record<string, { icon: string; badge: string }> = {
  orcamentos: {
    icon: "text-chart-1 bg-chart-1/10",
    badge: "border-chart-1/40 text-chart-1",
  },
  crm: {
    icon: "text-chart-2 bg-chart-2/10",
    badge: "border-chart-2/40 text-chart-2",
  },
  anteprojetos: {
    icon: "text-chart-3 bg-chart-3/10",
    badge: "border-chart-3/40 text-chart-3",
  },
  propostas: {
    icon: "text-chart-4 bg-chart-4/10",
    badge: "border-chart-4/40 text-chart-4",
  },
  projetos: {
    icon: "text-chart-5 bg-chart-5/10",
    badge: "border-chart-5/40 text-chart-5",
  },
  obras: {
    icon: "text-chart-6 bg-chart-6/10",
    badge: "border-chart-6/40 text-chart-6",
  },
}

export interface DashboardJourneyPendenciesProps {
  items: JourneyPendency[]
}

export function DashboardJourneyPendencies({
  items,
}: DashboardJourneyPendenciesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendências da jornada</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {items.length === 0 ? (
          <EmptyState
            icon={CheckCircleIcon}
            title="Nenhuma pendencia"
            description=""
          />
        ) : (
          items.map((item) => {
            const colors = MODULE_COLORS[item.moduleId]
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                href={item.moduleRoute}
                className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-md",
                      colors?.icon
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{item.message}</p>
                    <Badge
                      variant="outline"
                      className={cn("w-fit text-xs", colors?.badge)}
                    >
                      {item.moduleLabel}
                    </Badge>
                  </div>
                </div>
                <ChevronRightIcon className="size-4 text-muted-foreground" />
              </Link>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
