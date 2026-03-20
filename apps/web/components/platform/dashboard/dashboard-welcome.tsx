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
      <CardContent className="pt-6">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium">
            {getGreeting()}, <Badge variant="secondary">{profileLabel}</Badge>.
            Voce tem {totalPendingCount} pendencias abertas.
          </p>
          <p className="text-muted-foreground">
            Acompanhe os modulos mais importantes do dia.
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
