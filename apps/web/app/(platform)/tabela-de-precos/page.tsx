import { ModulePlaceholderPage } from "@/components/platform/module-placeholder-page"
import { MODULES, MODULE_GROUPS } from "@/lib/platform-config"

export default function TabelaDePrecosPage() {
  const mod = MODULES.find((m) => m.id === "tabela-de-precos")!
  const group = MODULE_GROUPS[mod.group]

  return (
    <ModulePlaceholderPage
      moduleId={mod.id}
      title={mod.label}
      section={group.label}
      description="Tabela de precos e servicos."
      icon={mod.icon}
    />
  )
}
