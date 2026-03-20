import { Suspense } from "react"
import { AnteprojectsWorkspacePage } from "@/components/platform/anteprojects/anteprojects-workspace-page"

export default function AnteprojetosPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AnteprojectsWorkspacePage />
    </Suspense>
  )
}
