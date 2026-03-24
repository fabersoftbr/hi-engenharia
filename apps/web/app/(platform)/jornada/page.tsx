"use client"

import { JourneyPage } from "@/components/platform/jornada/journey-page"
import { NavigationTransition } from "@/components/platform/navigation-transition"

export default function Page() {
  return (
    <NavigationTransition>
      <JourneyPage />
    </NavigationTransition>
  )
}
