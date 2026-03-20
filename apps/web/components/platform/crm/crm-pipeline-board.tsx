"use client"

import { useMemo } from "react"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import {
  CrmOpportunityRecord,
  CrmStageId,
  CRM_STAGE_ORDER,
  groupCrmOpportunitiesByStage,
} from "@/lib/crm-data"
import { CrmPipelineColumn } from "./crm-pipeline-column"

interface CrmPipelineBoardProps {
  opportunities: CrmOpportunityRecord[]
  onDragEnd: (result: DropResult) => void
}

export function CrmPipelineBoard({
  opportunities,
  onDragEnd,
}: CrmPipelineBoardProps) {
  const opportunitiesByStage = useMemo(
    () => groupCrmOpportunitiesByStage(opportunities),
    [opportunities]
  )

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
