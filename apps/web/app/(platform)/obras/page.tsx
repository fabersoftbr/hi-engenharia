import { ModulePlaceholderPage } from "@/components/platform/module-placeholder-page"
import { MODULES, MODULE_GROUPS } from "@/lib/platform-config"

export default function ObrasPage() {
  const mod = MODULES.find((m) => m.id === "obras")!
  const group = MODULE_GROUPS[mod.group]

  return (
    <ModulePlaceholderPage
      moduleId={mod.id}
      title={mod.label}
      section={group.label}
      description="Controle e acompanhamento de obras."
      icon={mod.icon}
    />
  )
}
