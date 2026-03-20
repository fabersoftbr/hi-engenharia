"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import type { DashboardModuleStat } from "@/lib/dashboard-data"

export interface DashboardSummaryGridProps {
  modules: DashboardModuleStat[]
}

export function DashboardSummaryGrid({ modules }: DashboardSummaryGridProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-medium">Resumo por modulo</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((mod) => (
          <Link key={mod.id} href={mod.route} className="block">
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                <mod.icon className="size-5 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">{mod.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-lg">{mod.activeCount} itens ativos</span>
                  {mod.pendingCount > 0 ? (
                    <Badge variant="secondary" className="text-xs">
                      {mod.pendingCount} pendentes
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Em dia
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
