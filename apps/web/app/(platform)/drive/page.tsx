import { ModulePlaceholderPage } from "@/components/platform/module-placeholder-page"
import { MODULES, MODULE_GROUPS } from "@/lib/platform-config"

export default function DrivePage() {
  const mod = MODULES.find((m) => m.id === "drive")!
  const group = MODULE_GROUPS[mod.group]

  return (
    <ModulePlaceholderPage
      moduleId={mod.id}
      title={mod.label}
      section={group.label}
      description="Armazenamento e gestao de arquivos."
      icon={mod.icon}
    />
  )
}
