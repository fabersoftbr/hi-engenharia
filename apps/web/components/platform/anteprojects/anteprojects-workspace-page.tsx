"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { PlusIcon } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { DropResult } from "@hello-pangea/dnd"

import { Button } from "@workspace/ui/components/button"
import {
  AnteprojectRecord,
  AnteprojectStageId,
  filterAnteprojects,
  getAnteprojects,
} from "@/lib/anteprojects-data"
import { getCrmOpportunityById } from "@/lib/crm-data"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import {
  TableSkeleton,
  PipelineSkeleton,
} from "@/components/platform/states/skeletons"
import { AnteprojectToolbar } from "./anteproject-toolbar"
import { AnteprojectListPage } from "./anteproject-list-page"
import { AnteprojectPipelineBoard } from "./anteproject-pipeline-board"
import { NewAnteprojectDialog } from "./new-anteproject-dialog"

type ViewMode = "kanban" | "lista"

export function AnteprojectsWorkspacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sourceOpportunityId = searchParams.get("sourceOpportunityId")
  const isLoading = useSimulatedLoading()

  const [viewMode, setViewMode] = useState<ViewMode>("kanban")
  const [responsibleFilter, setResponsibleFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAwaitingOnly, setShowAwaitingOnly] = useState(false)
  const [anteprojects, setAnteprojects] = useState<AnteprojectRecord[]>(() =>
    getAnteprojects()
  )
  const [isNewAnteprojectOpen, setIsNewAnteprojectOpen] = useState(false)
  const [prefillData, setPrefillData] = useState<{
    clientName: string
    technicalNotes: string
    originCrmOpportunityId: string
  } | null>(null)

  // Handle CRM handoff: open dialog with prefilled data when sourceOpportunityId is present
  useEffect(() => {
    if (sourceOpportunityId) {
      const opportunity = getCrmOpportunityById(sourceOpportunityId)
      if (opportunity) {
        setPrefillData({
          clientName: opportunity.company,
          technicalNotes: `Originado de ${opportunity.title}`,
          originCrmOpportunityId: sourceOpportunityId,
        })
        setIsNewAnteprojectOpen(true)
      }
    }
  }, [sourceOpportunityId])

  const filteredAnteprojects = useMemo(() => {
    return filterAnteprojects({
      anteprojects,
      responsibleFilter,
      priorityFilter,
      searchQuery,
      showAwaitingOnly,
    })
  }, [
    anteprojects,
    responsibleFilter,
    priorityFilter,
    searchQuery,
    showAwaitingOnly,
  ])

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result

      if (!destination) return
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return
      }

      const anteproject = anteprojects.find((ant) => ant.id === draggableId)
      if (!anteproject) return

      const newStage = destination.droppableId as AnteprojectStageId
      const now = new Date().toISOString()

      setAnteprojects((prev) =>
        prev.map((ant) => {
          if (ant.id !== draggableId) return ant
          return {
            ...ant,
            stage: newStage,
            updatedAt: now,
            timeline: [
              {
                stage: newStage,
                changedAt: now,
                changedBy: ant.ownerId,
              },
              ...ant.timeline,
            ],
          }
        })
      )
    },
    [anteprojects]
  )

  const handleNewAnteproject = useCallback(
    (newAnteproject: AnteprojectRecord) => {
      setAnteprojects((prev) => [newAnteproject, ...prev])
      setIsNewAnteprojectOpen(false)
      setPrefillData(null)
      // Clear the query param after successful creation
      if (sourceOpportunityId) {
        router.replace("/anteprojetos")
      }
    },
    [sourceOpportunityId, router]
  )

  const handleCloseDialog = useCallback(() => {
    setIsNewAnteprojectOpen(false)
    setPrefillData(null)
    // Clear the query param when closing without creating
    if (sourceOpportunityId) {
      router.replace("/anteprojetos")
    }
  }, [sourceOpportunityId, router])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Anteprojetos</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-4xl border border-input bg-input/30 p-1">
            <button
              type="button"
              onClick={() => setViewMode("kanban")}
              className={`rounded-4xl px-3 py-1 text-sm transition-colors ${
                viewMode === "kanban"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Kanban
            </button>
            <button
              type="button"
              onClick={() => setViewMode("lista")}
              className={`rounded-4xl px-3 py-1 text-sm transition-colors ${
                viewMode === "lista"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Lista
            </button>
          </div>
          <Button onClick={() => setIsNewAnteprojectOpen(true)}>
            <PlusIcon data-icon="inline-start" />
            Novo anteprojeto
          </Button>
        </div>
      </div>

      <AnteprojectToolbar
        responsibleFilter={responsibleFilter}
        onResponsibleFilterChange={setResponsibleFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        showAwaitingOnly={showAwaitingOnly}
        onShowAwaitingOnlyChange={setShowAwaitingOnly}
      />

      {isLoading ? (
        viewMode === "lista" ? (
          <TableSkeleton rows={8} />
        ) : (
          <PipelineSkeleton stages={5} />
        )
      ) : viewMode === "lista" ? (
        <AnteprojectListPage anteprojects={filteredAnteprojects} />
      ) : (
        <AnteprojectPipelineBoard
          anteprojects={filteredAnteprojects}
          onDragEnd={onDragEnd}
        />
      )}

      <NewAnteprojectDialog
        isOpen={isNewAnteprojectOpen}
        onClose={handleCloseDialog}
        onSubmit={handleNewAnteproject}
        prefill={prefillData}
      />
    </div>
  )
}
