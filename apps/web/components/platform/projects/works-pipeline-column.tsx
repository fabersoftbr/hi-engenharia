"use client"

import {
  WorkStageId,
  ProjectRecord,
  WORK_STAGE_META,
} from "@/lib/projects-data"
import { WorksPipelineCard } from "./works-pipeline-card"

interface WorksPipelineColumnProps {
  stageId: WorkStageId
  projects: ProjectRecord[]
  isDraggingOver: boolean
}

export function WorksPipelineColumn({
  stageId,
  projects,
  isDraggingOver,
}: WorksPipelineColumnProps) {
  const meta = WORK_STAGE_META[stageId]
  const count = projects.length

  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl p-3 transition-colors ${
        isDraggingOver
          ? "bg-primary/5 ring-2 ring-primary/20"
          : "bg-secondary/50"
      }`}
    >
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-semibold">{meta.label}</span>
        <span className="text-xs text-muted-foreground">
          {count} {count === 1 ? "obra" : "obras"}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {projects.map((project, index) => (
          <WorksPipelineCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}
