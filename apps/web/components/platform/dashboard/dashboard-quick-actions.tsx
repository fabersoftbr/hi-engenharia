"use client"

import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import type { DashboardQuickAction } from "@/lib/dashboard-data"

export interface DashboardQuickActionsProps {
  actions: DashboardQuickAction[]
}

export function DashboardQuickActions({ actions }: DashboardQuickActionsProps) {
  if (actions.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-medium">Acoes Rapidas</h2>
      <div className="flex flex-wrap gap-3">
        {actions.map((action, index) => (
          <Button key={index} variant="outline" asChild>
            <Link href={action.route}>
              <action.icon data-icon="inline-start" />
              {action.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
