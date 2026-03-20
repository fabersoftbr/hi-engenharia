"use client"

import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { AppBreadcrumbs } from "./app-breadcrumbs"
import { PROFILE_LABELS, type ProfileKey } from "@/lib/platform-config"

interface AppHeaderProps {
  activeProfile: ProfileKey
}

export function AppHeader({ activeProfile }: AppHeaderProps) {
  const profileLabel = PROFILE_LABELS[activeProfile]

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
      {/* Left side: Sidebar trigger (mobile) + Breadcrumbs */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <AppBreadcrumbs />
      </div>

      {/* Right side: Profile badge + Avatar dropdown */}
      <div className="flex items-center gap-3">
        <Badge variant="secondary">{profileLabel}</Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Avatar size="sm">
                <AvatarFallback>
                  {profileLabel
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Trocar perfil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(PROFILE_LABELS).map(([key, label]) => (
              <DropdownMenuItem
                key={key}
                variant={activeProfile === key ? "default" : undefined}
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
