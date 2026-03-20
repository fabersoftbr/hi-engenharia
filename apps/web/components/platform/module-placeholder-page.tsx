"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { RestrictedModuleState } from "./restricted-module-state"
import { useActiveProfile } from "./platform-shell-provider"
import { MODULES, type ProfileKey, ICON_MAP, type IconName } from "@/lib/platform-config"

// Check if the active profile has access to a module
function hasAccessToModule(moduleId: string, profile: ProfileKey): boolean {
  const mod = MODULES.find((m) => m.id === moduleId)
  return mod ? mod.visibleTo.includes(profile) : false
}

interface ModulePlaceholderPageProps {
  moduleId: string
  title: string
  section: string
  description: string
  iconName: IconName
}

export function ModulePlaceholderPage({
  moduleId,
  title,
  section,
  description,
  iconName,
}: ModulePlaceholderPageProps) {
  const { activeProfile } = useActiveProfile()
  const hasAccess = hasAccessToModule(moduleId, activeProfile)

  // Resolve icon name to component
  const Icon = ICON_MAP[iconName]

  // Show restricted state if profile doesn't have access
  if (!hasAccess) {
    return (
      <RestrictedModuleState moduleName={title} activeProfile={activeProfile} />
    )
  }

  // Show normal placeholder for authorized access
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">{description}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            O conteudo deste modulo sera implementado nas proximas fases do projeto.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              {section}
            </span>
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              ID: {moduleId}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
