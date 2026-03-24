"use client"

import { useMemo, useState } from "react"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import {
  ProjectRecord,
  WorkStageId,
  WORK_STAGE_ORDER,
  WORK_STAGE_META,
  groupProjectsByStage,
} from "@/lib/projects-data"
import { EmptyState } from "@/components/platform/states/empty-state"
import { WorksPipelineColumn } from "./works-pipeline-column"
import { WorksPipelineCardMobile } from "./works-pipeline-card-mobile"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/ui/components/tabs"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"

interface WorksPipelineBoardProps {
  projects: ProjectRecord[]
  onDragEnd: (result: DropResult) => void
}

export function WorksPipelineBoard({
  projects,
  onDragEnd,
}: WorksPipelineBoardProps) {
  const isMobile = useIsMobile()
  const [activeStage, setActiveStage] = useState<WorkStageId>(
    WORK_STAGE_ORDER[0]!
  )

  const projectsByStage = useMemo(
    () => groupProjectsByStage(projects),
    [projects]
  )

  if (projects.length === 0) {
    return (
      <EmptyState
        title="Nenhum resultado"
        description="Nenhuma obra encontrada para os filtros aplicados."
      />
    )
  }

  // Mobile: render tabs with one stage at a time
  if (isMobile) {
    return (
      <Tabs
        value={activeStage}
        onValueChange={(value) => setActiveStage(value as WorkStageId)}
        className="w-full"
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          {WORK_STAGE_ORDER.map((stageId) => {
            const count = projectsByStage[stageId].length
            return (
              <TabsTrigger
                key={stageId}
                value={stageId}
                className="flex-shrink-0"
              >
                {WORK_STAGE_META[stageId].label} ({count})
              </TabsTrigger>
            )
          })}
        </TabsList>
        {WORK_STAGE_ORDER.map((stageId) => (
          <TabsContent key={stageId} value={stageId} className="mt-4">
            <div className="flex flex-col gap-3">
              {projectsByStage[stageId].map((project) => (
                <WorksPipelineCardMobile key={project.id} project={project} />
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
