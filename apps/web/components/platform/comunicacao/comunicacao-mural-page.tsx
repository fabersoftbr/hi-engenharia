"use client"

import { useState } from "react"
import { PlusIcon, FilterXIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  filterComunicados,
  getComunicados,
  type ComunicadoPeriod,
} from "@/lib/comunicacao-data"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { CardGridSkeleton } from "@/components/platform/states/skeletons"
import { ComunicacaoCard } from "./comunicacao-card"
import { ComunicacaoToolbar } from "./comunicacao-toolbar"
import { ComunicacaoPublishDialog } from "./comunicacao-publish-dialog"

export function ComunicacaoMuralPage() {
  const isLoading = useSimulatedLoading()
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState<ComunicadoPeriod>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [publishDialogOpen, setPublishDialogOpen] = useState(false)

  const comunicados = getComunicados()
  const filteredComunicados = filterComunicados({
    category: categoryFilter,
    period: periodFilter,
    searchQuery,
  })
  const handleNewComunicado = () => {
    setPublishDialogOpen(true)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <CardGridSkeleton cards={3} />
      </div>
    )
  }

  // Empty state for no comunicados at all
  if (comunicados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <FilterXIcon className="size-12 text-muted-foreground/50" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Nenhum comunicado publicado</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Publique o primeiro comunicado para informar a equipe.
          </p>
        </div>
        <Button onClick={handleNewComunicado}>
          <PlusIcon data-icon="inline-start" />
          Publicar
        </Button>
      </div>
    )
  }
  // Empty state for filtered results
  if (filteredComunicados.length === 0 && comunicados.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <FilterXIcon className="size-12 text-muted-foreground/50" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            Nenhum comunicado encontrado
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Ajuste os filtros ou termos de busca.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      <ComunicacaoToolbar
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        periodFilter={periodFilter}
        onPeriodFilterChange={setPeriodFilter}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onNewComunicado={handleNewComunicado}
      />
      <div className="flex flex-col gap-4">
        {filteredComunicados.map((comunicado) => (
          <ComunicacaoCard key={comunicado.id} comunicado={comunicado} />
        ))}
      </div>
      <ComunicacaoPublishDialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
      />
    </div>
  )
}
