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
import { EmptyState } from "@/components/platform/states/empty-state"
import type { JourneyPendency } from "@/lib/dashboard-data"

export interface DashboardJourneyPendenciesProps {
  items: JourneyPendency[]
}

export function DashboardJourneyPendencies({
  items,
}: DashboardJourneyPendenciesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendencias da jornada</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {items.length === 0 ? (
          <EmptyState
            icon={CheckCircleIcon}
            title="Nenhuma pendencia"
            description="Todos os modulos estao sem itens ativos."
          />
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              href={item.moduleRoute}
              className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted/50"
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{item.message}</p>
                <Badge variant="outline" className="w-fit text-xs">
                  {item.moduleLabel}
                </Badge>
              </div>
              <ChevronRightIcon className="size-4 text-muted-foreground" />
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  )
}
