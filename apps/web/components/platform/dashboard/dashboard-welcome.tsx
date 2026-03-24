"use client"

import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"

export interface DashboardWelcomeProps {
  profileLabel: string
  totalPendingCount: number
}

export function DashboardWelcome({
  profileLabel,
  totalPendingCount,
}: DashboardWelcomeProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium">
            {getGreeting()}, <Badge variant="default">{profileLabel}</Badge>.
            Você tem {totalPendingCount} pendências abertas.
          </p>
          <p className="text-muted-foreground">
            Acompanhe os módulos mais importantes do dia.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Bom dia"
  if (hour < 18) return "Boa tarde"
  return "Boa noite"
}
