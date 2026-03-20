"use client"

import {
  AnteprojectStageId,
  AnteprojectRecord,
  ANTEPROJECT_STAGE_META
} from "@/lib/anteprojects-data"
import { AnteprojectPipelineCard } from "./anteproject-pipeline-card"

interface AnteprojectPipelineColumnProps {
  stageId: AnteprojectStageId
  anteprojects: AnteprojectRecord[]
  isDraggingOver: boolean
}

export function AnteprojectPipelineColumn({
  stageId,
  anteprojects,
  isDraggingOver,
}: AnteprojectPipelineColumnProps) {
  const meta = ANTEPROJECT_STAGE_META[stageId]
  const count = anteprojects.length

  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl p-3 transition-colors ${
        isDraggingOver ? "bg-primary/5 ring-2 ring-primary/20" : "bg-secondary/50"
      }`}
    >
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-semibold">{meta.label}</span>
        <span className="text-xs text-muted-foreground">
          {count} {count === 1 ? "anteprojeto" : "anteprojetos"}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {anteprojects.map((anteproject, index) => (
          <AnteprojectPipelineCard
            key={anteproject.id}
            anteproject={anteproject}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
