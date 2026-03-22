"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { PlusIcon } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { DropResult } from "@hello-pangea/dnd"
import {
  CrmOpportunityRecord,
  CrmStageId,
  getCrmOpportunities,
  filterCrmOpportunities,
} from "@/lib/crm-data"
import { getBudgetRequestById } from "@/lib/budget-requests-data"
import { Button } from "@workspace/ui/components/button"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import {
  TableSkeleton,
  PipelineSkeleton,
} from "@/components/platform/states/skeletons"
import { CrmToolbar } from "./crm-toolbar"
import { CrmListPage } from "./crm-list-page"
import { CrmPipelineBoard } from "./crm-pipeline-board"
import { NewOpportunityDialog } from "./new-opportunity-dialog"

type ViewMode = "kanban" | "lista"

export function CrmWorkspacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sourceRequestId = searchParams.get("sourceRequestId")
  const isLoading = useSimulatedLoading()
  const [viewMode, setViewMode] = useState<ViewMode>("kanban")
  const [responsibleFilter, setResponsibleFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [opportunities, setOpportunities] = useState<CrmOpportunityRecord[]>(
    () => getCrmOpportunities()
  )
  const [isNewOpportunityOpen, setIsNewOpportunityOpen] = useState(false)
  const [prefillData, setPrefillData] = useState<{
    title: string
    company: string
    originBudgetRequestId: string
  } | null>(null)

  // Handle budget-request handoff: open dialog with prefilled data when sourceRequestId is present
  useEffect(() => {
    if (sourceRequestId) {
      const request = getBudgetRequestById(sourceRequestId)
      if (request) {
        setPrefillData({
          title: `Oportunidade - ${request.clientName}`,
          company: request.clientName,
          originBudgetRequestId: sourceRequestId,
        })
        setIsNewOpportunityOpen(true)
      }
    }
  }, [sourceRequestId])

  const filteredOpportunities = useMemo(() => {
    return filterCrmOpportunities({
      opportunities,
      responsibleFilter,
      priorityFilter,
      searchQuery,
    })
  }, [opportunities, responsibleFilter, priorityFilter, searchQuery])

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

      const opportunity = opportunities.find((opp) => opp.id === draggableId)
      if (!opportunity) return

      const newStage = destination.droppableId as CrmStageId
      const now = new Date().toISOString()

      setOpportunities((prev) =>
        prev.map((opp) => {
          if (opp.id !== draggableId) return opp
          return {
            ...opp,
            stage: newStage,
            lastContactAt: now,
            history: [
              {
                stage: newStage,
                changedAt: now,
                changedBy: opp.ownerId,
              },
              ...opp.history,
            ],
          }
        })
      )
    },
    [opportunities]
  )

  const handleNewOpportunity = useCallback(
    (newOpp: CrmOpportunityRecord) => {
      setOpportunities((prev) => [newOpp, ...prev])
      setIsNewOpportunityOpen(false)
      setPrefillData(null)
      // Clear the query param after successful creation
      if (sourceRequestId) {
        router.replace("/crm")
      }
    },
    [sourceRequestId, router]
  )

  const handleCloseDialog = useCallback(() => {
    setIsNewOpportunityOpen(false)
    setPrefillData(null)
    // Clear the query param when closing without creating
    if (sourceRequestId) {
      router.replace("/crm")
    }
  }, [sourceRequestId, router])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">CRM</h1>
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
          <Button onClick={() => setIsNewOpportunityOpen(true)}>
            <PlusIcon data-icon="inline-start" />
            Nova oportunidade
          </Button>
        </div>
      </div>

      <CrmToolbar
        responsibleFilter={responsibleFilter}
        onResponsibleFilterChange={setResponsibleFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      {isLoading ? (
        viewMode === "lista" ? (
          <TableSkeleton rows={8} />
        ) : (
          <PipelineSkeleton stages={5} />
        )
      ) : viewMode === "lista" ? (
        <CrmListPage opportunities={filteredOpportunities} />
      ) : (
        <CrmPipelineBoard
          opportunities={filteredOpportunities}
          onDragEnd={onDragEnd}
        />
      )}

      <NewOpportunityDialog
        isOpen={isNewOpportunityOpen}
        onClose={handleCloseDialog}
        onSubmit={handleNewOpportunity}
        prefill={prefillData}
      />
    </div>
  )
}
