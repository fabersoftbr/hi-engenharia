"use client"

import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { Badge } from "@workspace/ui/components/badge"
import { AppBreadcrumbs } from "./app-breadcrumbs"
import { ProfileSwitcher } from "./profile-switcher"
import { useActiveProfile } from "./platform-shell-provider"

/** Renders the main application header with breadcrumbs and profile switcher. */
export function AppHeader() {
  const { profileLabel } = useActiveProfile()

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4">
      {/* Left side: Sidebar trigger (mobile) + Breadcrumbs */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <AppBreadcrumbs />
      </div>

      {/* Right side: Profile badge + Profile switcher dropdown */}
      <div className="flex items-center gap-3">
        <Badge variant="secondary">{profileLabel}</Badge>
        <ProfileSwitcher />
      </div>
    </header>
  )
}
