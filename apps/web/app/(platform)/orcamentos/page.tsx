import { ModulePlaceholderPage } from "@/components/platform/module-placeholder-page"
import { MODULES, MODULE_GROUPS } from "@/lib/platform-config"

export default function OrcamentosPage() {
  const mod = MODULES.find((m) => m.id === "orcamentos")!
  const group = MODULE_GROUPS[mod.group]

  return (
    <ModulePlaceholderPage
      moduleId={mod.id}
      title={mod.label}
      section={group.label}
      description="Gerenciamento de orcamentos."
      iconName={mod.iconName}
    />
  )
}
