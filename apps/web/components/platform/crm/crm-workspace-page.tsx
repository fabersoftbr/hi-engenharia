"use client"

import { useState, useMemo, useCallback } from "react"
import { PlusIcon } from "lucide-react"
import { DropResult } from "@hello-pangea/dnd"
import {
  CrmOpportunityRecord,
  CrmStageId,
  getCrmOpportunities,
  filterCrmOpportunities,
} from "@/lib/crm-data"
import { Button } from "@workspace/ui/components/button"
import { CrmToolbar } from "./crm-toolbar"
import { CrmListPage } from "./crm-list-page"
import { CrmPipelineBoard } from "./crm-pipeline-board"
import { NewOpportunityDialog } from "./new-opportunity-dialog"

type ViewMode = "kanban" | "lista"

export function CrmWorkspacePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban")
  const [responsibleFilter, setResponsibleFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [opportunities, setOpportunities] = useState<CrmOpportunityRecord[]>(
    () => getCrmOpportunities()
  )
  const [isNewOpportunityOpen, setIsNewOpportunityOpen] = useState(false)

  const filteredOpportunities = useMemo(() => {
    return filterCrmOpportunities({
      opportunities,
      responsibleFilter,
      priorityFilter,
      searchQuery,
    })
  }, [opportunities, responsibleFilter, priorityFilter, searchQuery])

  const onDragEnd = useCallback((result: DropResult) => {
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
  }, [opportunities])

  const handleNewOpportunity = useCallback(
    (newOpp: CrmOpportunityRecord) => {
      setOpportunities((prev) => [newOpp, ...prev])
      setIsNewOpportunityOpen(false)
    },
    []
  )

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

      {viewMode === "lista" ? (
        <CrmListPage opportunities={filteredOpportunities} />
      ) : (
        <CrmPipelineBoard
          opportunities={filteredOpportunities}
          onDragEnd={onDragEnd}
        />
      )}

      <NewOpportunityDialog
        isOpen={isNewOpportunityOpen}
        onClose={() => setIsNewOpportunityOpen(false)}
        onSubmit={handleNewOpportunity}
      />
    </div>
  )
}
