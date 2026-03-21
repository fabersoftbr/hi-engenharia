"use client"

import { useMemo, useState } from "react"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import { SearchIcon } from "lucide-react"
import {
  CrmOpportunityRecord,
  CrmStageId,
  CRM_STAGE_ORDER,
  CRM_STAGE_META,
  groupCrmOpportunitiesByStage,
} from "@/lib/crm-data"
import { EmptyState } from "@/components/platform/states/empty-state"
import { CrmPipelineColumn } from "./crm-pipeline-column"
import { CrmPipelineCardMobile } from "./crm-pipeline-card-mobile"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/ui/components/tabs"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"

interface CrmPipelineBoardProps {
  opportunities: CrmOpportunityRecord[]
  onDragEnd: (result: DropResult) => void
}

export function CrmPipelineBoard({
  opportunities,
  onDragEnd,
}: CrmPipelineBoardProps) {
  const isMobile = useIsMobile()
  const [activeStage, setActiveStage] = useState<CrmStageId>(
    CRM_STAGE_ORDER[0]!
  )

  const opportunitiesByStage = useMemo(
    () => groupCrmOpportunitiesByStage(opportunities),
    [opportunities]
  )

  if (opportunities.length === 0) {
    return (
      <EmptyState
        icon={SearchIcon}
        title="Nenhum resultado"
        description="Nenhuma oportunidade encontrada para os filtros aplicados."
      />
    )
  }

  // Mobile: render tabs with one stage at a time
  if (isMobile) {
    return (
      <Tabs
        value={activeStage}
        onValueChange={(value) => setActiveStage(value as CrmStageId)}
        className="w-full"
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          {CRM_STAGE_ORDER.map((stageId) => {
            const count = opportunitiesByStage[stageId].length
            return (
              <TabsTrigger
                key={stageId}
                value={stageId}
                className="flex-shrink-0"
              >
                {CRM_STAGE_META[stageId].label} ({count})
              </TabsTrigger>
            )
          })}
        </TabsList>
        {CRM_STAGE_ORDER.map((stageId) => (
          <TabsContent key={stageId} value={stageId} className="mt-4">
            <div className="flex flex-col gap-3">
              {opportunitiesByStage[stageId].map((opp) => (
                <CrmPipelineCardMobile key={opp.id} opportunity={opp} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    )
  }

  // Desktop: render DnD board
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {CRM_STAGE_ORDER.map((stageId) => (
          <Droppable key={stageId} droppableId={stageId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-w-[280px] flex-1"
              >
                <CrmPipelineColumn
                  stageId={stageId}
                  opportunities={opportunitiesByStage[stageId]}
                  isDraggingOver={snapshot.isDraggingOver}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}
