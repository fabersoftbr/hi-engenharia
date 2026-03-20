import { ModulePlaceholderPage } from "@/components/platform/module-placeholder-page"
import { MODULES, MODULE_GROUPS } from "@/lib/platform-config"

export default function PropostasPage() {
  const mod = MODULES.find((m) => m.id === "propostas")!
  const group = MODULE_GROUPS[mod.group]

  return (
    <ModulePlaceholderPage
      moduleId={mod.id}
      title={mod.label}
      section={group.label}
      description="Gerador de propostas comerciais."
      iconName={mod.iconName}
    />
  )
}
