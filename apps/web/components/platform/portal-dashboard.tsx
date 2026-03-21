"use client"

import { useActiveProfile } from "@/components/platform/platform-shell-provider"
import {
  getDashboardModulesForProfile,
  getDashboardQuickActionsForProfile,
  getDashboardAnnouncements,
  getDashboardHighlightsForProfile,
  getTotalPendingCount,
} from "@/lib/dashboard-data"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { CardGridSkeleton } from "@/components/platform/states/skeletons"
import { DashboardWelcome } from "@/components/platform/dashboard/dashboard-welcome"
import { DashboardSummaryGrid } from "@/components/platform/dashboard/dashboard-summary-grid"
import { DashboardQuickActions } from "@/components/platform/dashboard/dashboard-quick-actions"
import { DashboardAnnouncements } from "@/components/platform/dashboard/dashboard-announcements"
import { DashboardUrgentHighlights } from "@/components/platform/dashboard/dashboard-urgent-highlights"

export function PortalDashboard() {
  const { activeProfile, profileLabel } = useActiveProfile()
  const isLoading = useSimulatedLoading()

  const modules = getDashboardModulesForProfile(activeProfile)
  const quickActions = getDashboardQuickActionsForProfile(activeProfile)
  const announcements = getDashboardAnnouncements()
  const highlights = getDashboardHighlightsForProfile(activeProfile)
  const totalPendingCount = getTotalPendingCount(modules)

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

      {/* Summary-card grid */}
      <DashboardSummaryGrid modules={modules} />

      {/* Quick-actions row */}
      <DashboardQuickActions actions={quickActions} />

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
