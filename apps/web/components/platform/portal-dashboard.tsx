"use client"

import { useActiveProfile } from "@/components/platform/platform-shell-provider"
import {
  getDashboardModulesForProfile,
  getDashboardQuickActionsForProfile,
  getDashboardAnnouncements,
  getDashboardHighlightsForProfile,
  getTotalPendingCount,
} from "@/lib/dashboard-data"
import { getJourneyPendencies } from "@/lib/journey-data"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { CardGridSkeleton } from "@/components/platform/states/skeletons"
import { DashboardWelcome } from "@/components/platform/dashboard/dashboard-welcome"
import { DashboardChartsSection } from "@/components/platform/dashboard/dashboard-charts-section"
import { DashboardQuickActions } from "@/components/platform/dashboard/dashboard-quick-actions"
import { DashboardAnnouncements } from "@/components/platform/dashboard/dashboard-announcements"
import { DashboardUrgentHighlights } from "@/components/platform/dashboard/dashboard-urgent-highlights"
import { DashboardJourneyPendencies } from "@/components/platform/dashboard/dashboard-journey-pendencies"

/** Renders the main portal dashboard with summary cards, quick actions, and announcements. */
export function PortalDashboard() {
  const { activeProfile, profileLabel } = useActiveProfile()
  const isLoading = useSimulatedLoading()

  const modules = getDashboardModulesForProfile(activeProfile)
  const quickActions = getDashboardQuickActionsForProfile(activeProfile)
  const announcements = getDashboardAnnouncements()
  const highlights = getDashboardHighlightsForProfile(activeProfile)
  const totalPendingCount = getTotalPendingCount(modules)
  const journeyPendencies = getJourneyPendencies()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <CardGridSkeleton cards={4} />
        <CardGridSkeleton cards={3} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome strip */}
      <DashboardWelcome
        profileLabel={profileLabel}
        totalPendingCount={totalPendingCount}
      />

      {/* Charts section */}
      <DashboardChartsSection modules={modules} />

      {/* Quick-actions row */}
      <DashboardQuickActions actions={quickActions} />

      {/* Journey pendencies panel */}
      <DashboardJourneyPendencies items={journeyPendencies} />

      {/* Footer grid: announcements (left) + urgent highlights (right) */}
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-5">
        <div className="lg:col-span-3">
          <DashboardAnnouncements items={announcements} />
        </div>
        <div className="lg:col-span-2">
          <DashboardUrgentHighlights items={highlights} />
        </div>
      </div>
    </div>
  )
}
