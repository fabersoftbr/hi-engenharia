"use client"

import { useMemo, useState } from "react"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import { SearchIcon } from "lucide-react"
import {
  AnteprojectRecord,
  AnteprojectStageId,
  ANTEPROJECT_STAGE_ORDER,
  ANTEPROJECT_STAGE_META,
  groupAnteprojectsByStage,
} from "@/lib/anteprojects-data"
import { EmptyState } from "@/components/platform/states/empty-state"
import { AnteprojectPipelineColumn } from "./anteproject-pipeline-column"
import { AnteprojectPipelineCardMobile } from "./anteproject-pipeline-card-mobile"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/ui/components/tabs"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"

interface AnteprojectPipelineBoardProps {
  anteprojects: AnteprojectRecord[]
  onDragEnd: (result: DropResult) => void
}

export function AnteprojectPipelineBoard({
  anteprojects,
  onDragEnd,
}: AnteprojectPipelineBoardProps) {
  const isMobile = useIsMobile()
  const [activeStage, setActiveStage] = useState<AnteprojectStageId>(
    ANTEPROJECT_STAGE_ORDER[0]!
  )

  const anteprojectsByStage = useMemo(
    () => groupAnteprojectsByStage(anteprojects),
    [anteprojects]
  )

  if (anteprojects.length === 0) {
    return (
      <EmptyState
        icon={SearchIcon}
        title="Nenhum resultado"
        description="Nenhum anteprojeto encontrado para os filtros aplicados."
      />
    )
  }

  // Mobile: render tabs with one stage at a time
  if (isMobile) {
    return (
      <Tabs
        value={activeStage}
        onValueChange={(value) => setActiveStage(value as AnteprojectStageId)}
        className="w-full"
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          {ANTEPROJECT_STAGE_ORDER.map((stageId) => {
            const count = anteprojectsByStage[stageId].length
            return (
              <TabsTrigger
                key={stageId}
                value={stageId}
                className="flex-shrink-0"
              >
                {ANTEPROJECT_STAGE_META[stageId].label} ({count})
              </TabsTrigger>
            )
          })}
        </TabsList>
        {ANTEPROJECT_STAGE_ORDER.map((stageId) => (
          <TabsContent key={stageId} value={stageId} className="mt-4">
            <div className="flex flex-col gap-3">
              {anteprojectsByStage[stageId].map((ant, index) => (
                <AnteprojectPipelineCardMobile
                  key={ant.id}
                  anteproject={ant}
                  index={index}
                />
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
                  anteprojects={anteprojectsByStage[stageId]}
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
