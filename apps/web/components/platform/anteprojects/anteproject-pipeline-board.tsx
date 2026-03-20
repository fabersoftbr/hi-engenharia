"use client"

import { useMemo } from "react"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import {
  AnteprojectRecord,
  ANTEPROJECT_STAGE_ORDER,
  groupAnteprojectsByStage,
} from "@/lib/anteprojects-data"
import { AnteprojectPipelineColumn } from "./anteproject-pipeline-column"

interface AnteprojectPipelineBoardProps {
  anteprojects: AnteprojectRecord[]
  onDragEnd: (result: DropResult) => void
}

export function AnteprojectPipelineBoard({
  anteprojects,
  onDragEnd,
}: AnteprojectPipelineBoardProps) {
  const opportunitiesByStage = useMemo(
    () => groupAnteprojectsByStage(anteprojects),
    [anteprojects]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {ANTEPROJECT_STAGE_ORDER.map((stageId) => (
          <Droppable key={stageId} droppableId={stageId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-w-[280px] flex-1"
              >
                <AnteprojectPipelineColumn
                  stageId={stageId}
                  anteprojects={opportunitiesByStage[stageId]}
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
