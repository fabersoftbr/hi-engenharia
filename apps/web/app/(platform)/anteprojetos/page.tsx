import { ModulePlaceholderPage } from "@/components/platform/module-placeholder-page"
import { MODULES, MODULE_GROUPS } from "@/lib/platform-config"

export default function AnteprojetosPage() {
  const mod = MODULES.find((m) => m.id === "anteprojetos")!
  const group = MODULE_GROUPS[mod.group]

  return (
    <ModulePlaceholderPage
      moduleId={mod.id}
      title={mod.label}
      section={group.label}
      description="Gestao de anteprojetos."
      iconName={mod.iconName}
    />
  )
}
