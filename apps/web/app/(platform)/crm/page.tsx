import { ModulePlaceholderPage } from "@/components/platform/module-placeholder-page"
import { MODULES, MODULE_GROUPS } from "@/lib/platform-config"

export default function CrmPage() {
  const mod = MODULES.find((m) => m.id === "crm")!
  const group = MODULE_GROUPS[mod.group]

  return (
    <ModulePlaceholderPage
      moduleId={mod.id}
      title={mod.label}
      section={group.label}
      description="Gestao de relacionamento com clientes."
      icon={mod.icon}
    />
  )
}
