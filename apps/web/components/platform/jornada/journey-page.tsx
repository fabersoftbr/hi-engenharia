"use client"

import { JourneyTimeline } from "./journey-timeline"
import { getVisibleJourneyModules } from "@/lib/journey-data"

export function JourneyPage() {
  const modules = getVisibleJourneyModules()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Jornada</h1>
        <p className="text-muted-foreground">
          Visualize o fluxo operacional completo da sua solicitacao ate a
          entrega da obra.
        </p>
      </div>
      <JourneyTimeline modules={modules} />
    </div>
  )
}
