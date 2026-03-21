"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { BrandLogo } from "@/components/brand-logo"
import {
  getGroupedModulesForProfile,
  MODULE_GROUPS,
  ICON_MAP,
} from "@/lib/platform-config"
import { useActiveProfile } from "./platform-shell-provider"

// Helper component to render module link with icon
function ModuleLink({
  mod,
  isActive,
}: {
  mod: {
    id: string
    route: string
    label: string
    iconName: keyof typeof ICON_MAP
  }
  isActive: boolean
}) {
  const Icon = ICON_MAP[mod.iconName]
  return (
    <SidebarMenuButton asChild isActive={isActive} tooltip={mod.label}>
      <Link href={mod.route}>
        <Icon />
        <span>{mod.label}</span>
      </Link>
    </SidebarMenuButton>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const { activeProfile } = useActiveProfile()
  const groupedModules = getGroupedModulesForProfile(activeProfile)

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <Link href="/portal" className="flex items-center gap-2">
          <BrandLogo variant="full" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* OPERACAO Section */}
        {groupedModules.operation && groupedModules.operation.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>
              {MODULE_GROUPS.operation.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupedModules.operation.map((mod) => (
                  <SidebarMenuItem key={mod.id}>
                    <ModuleLink
                      mod={mod}
                      isActive={
                        pathname === mod.route ||
                        pathname.startsWith(`${mod.route}/`)
                      }
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* PROJETOS Section */}
        {groupedModules.projects && groupedModules.projects.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>
              {MODULE_GROUPS.projects.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupedModules.projects.map((mod) => (
                  <SidebarMenuItem key={mod.id}>
                    <ModuleLink
                      mod={mod}
                      isActive={
                        pathname === mod.route ||
                        pathname.startsWith(`${mod.route}/`)
                      }
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* CONTEUDO Section */}
        {groupedModules.content && groupedModules.content.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>{MODULE_GROUPS.content.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupedModules.content.map((mod) => (
                  <SidebarMenuItem key={mod.id}>
                    <ModuleLink
                      mod={mod}
                      isActive={
                        pathname === mod.route ||
                        pathname.startsWith(`${mod.route}/`)
                      }
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* FERRAMENTAS Section */}
        {groupedModules.tools && groupedModules.tools.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>{MODULE_GROUPS.tools.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupedModules.tools.map((mod) => (
                  <SidebarMenuItem key={mod.id}>
                    <ModuleLink
                      mod={mod}
                      isActive={
                        pathname === mod.route ||
                        pathname.startsWith(`${mod.route}/`)
                      }
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
