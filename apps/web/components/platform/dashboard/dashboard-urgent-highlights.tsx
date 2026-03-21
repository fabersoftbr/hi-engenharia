"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { AlertTriangleIcon, CheckCircleIcon } from "lucide-react"
import { EmptyState } from "@/components/platform/states/empty-state"
import type { DashboardHighlight } from "@/lib/dashboard-data"

export interface DashboardUrgentHighlightsProps {
  items: DashboardHighlight[]
}

export function DashboardUrgentHighlights({
  items,
}: DashboardUrgentHighlightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Destaques e pendencias</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {items.length === 0 ? (
          <EmptyState
            icon={CheckCircleIcon}
            title="Nenhuma pendencia"
            description="Nenhuma pendencia urgente no momento."
          />
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              href={item.moduleRoute}
              className="flex items-start gap-2 rounded-md p-2 transition-colors hover:bg-muted/50"
            >
              <AlertTriangleIcon
                className={`mt-0.5 size-4 shrink-0 ${
                  item.urgent ? "text-destructive" : "text-muted-foreground"
                }`}
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm">{item.message}</p>
                <Badge variant="outline" className="w-fit text-xs">
                  {item.moduleLabel}
                </Badge>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  )
}
