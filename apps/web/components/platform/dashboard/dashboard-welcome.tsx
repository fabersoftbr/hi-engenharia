"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
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
      <CardHeader>
        <CardTitle>Visao geral</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium">
            {getGreeting()}, {profileLabel}.
          </p>
          <p className="text-muted-foreground">
            {totalPendingCount > 0 ? (
              <>
                Voce tem{" "}
                <Badge variant="secondary" className="ml-1">
                  {totalPendingCount} pendentes
                </Badge>
              </>
            ) : (
              "Todos os itens estao em dia."
            )}
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
