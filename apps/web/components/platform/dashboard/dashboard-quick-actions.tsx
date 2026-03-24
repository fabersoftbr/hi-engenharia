"use client"

import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import type { DashboardQuickAction } from "@/lib/dashboard-data"

export interface DashboardQuickActionsProps {
  actions: DashboardQuickAction[]
}

export function DashboardQuickActions({ actions }: DashboardQuickActionsProps) {
  if (actions.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acoes Rapidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex h-auto flex-col items-center gap-2 overflow-hidden px-2 py-3"
              asChild
            >
              <Link href={action.route}>
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <action.icon className="size-3.5 text-primary" />
                </div>
                <span className="line-clamp-2 text-center text-xs leading-tight font-medium">
                  {action.label}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
