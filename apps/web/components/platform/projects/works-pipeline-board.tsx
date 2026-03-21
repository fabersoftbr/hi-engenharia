"use client"

import { useMemo } from "react"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"

import {
  type ProjectRecord,
  WORK_STAGE_ORDER,
  groupProjectsByStage,
} from "@/lib/projects-data"
import { EmptyState } from "@/components/platform/states/empty-state"
import { WorksPipelineColumn } from "./works-pipeline-column"

interface WorksPipelineBoardProps {
  projects: ProjectRecord[]
  onDragEnd: (result: DropResult) => void
}

export function WorksPipelineBoard({
  projects,
  onDragEnd,
}: WorksPipelineBoardProps) {
  const projectsByStage = useMemo(
    () => groupProjectsByStage(projects),
    [projects]
  )

  // Empty state when filters produce zero cards
  if (projects.length === 0) {
    return (
      <EmptyState
        title="Nenhum resultado"
        description="Nenhuma obra encontrada para os filtros aplicados."
      />
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {WORK_STAGE_ORDER.map((stageId) => (
          <Droppable key={stageId} droppableId={stageId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-w-[280px] flex-1"
              >
                <WorksPipelineColumn
                  stageId={stageId}
                  projects={projectsByStage[stageId]}
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
