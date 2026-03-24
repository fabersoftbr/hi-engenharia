"use client"

import { JourneyCard } from "./journey-card"
import type { JourneyModule } from "@/lib/journey-data"

export interface JourneyTimelineProps {
  modules: JourneyModule[]
}

export function JourneyTimeline({ modules }: JourneyTimelineProps) {
  if (modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
        <p className="text-muted-foreground"></p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-4">
      {modules.map((mod, index) => (
        <JourneyCard
          key={mod.id}
          label={mod.label}
          route={mod.route}
          icon={mod.icon}
          activeCount={mod.activeCount}
          isLast={index === modules.length - 1}
        />
      ))}
    </div>
  )
}
