import { ModulePlaceholderPage } from "@/components/platform/module-placeholder-page"
import { MODULES, MODULE_GROUPS } from "@/lib/platform-config"

export default function ComunicacaoPage() {
  const mod = MODULES.find((m) => m.id === "comunicacao")!
  const group = MODULE_GROUPS[mod.group]

  return (
    <ModulePlaceholderPage
      moduleId={mod.id}
      title={mod.label}
      section={group.label}
      description="Central de comunicacao e mensagens."
      iconName={mod.iconName}
    />
  )
}
