"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  WORK_STAGE_ORDER,
  WorkStageId,
  WORK_STAGE_META,
} from "@/lib/projects-data"

interface ProjectStageChangeSelectProps {
  currentStage: WorkStageId
  onStageChange: (stage: WorkStageId) => void
}

export function ProjectStageChangeSelect({
  currentStage,
  onStageChange,
}: ProjectStageChangeSelectProps) {
  return (
    <Select value={currentStage} onValueChange={onStageChange}>
      <SelectTrigger>
        <SelectValue placeholder="Mudar estagio" />
      </SelectTrigger>
      <SelectContent>
        {WORK_STAGE_ORDER.map((stageId) => (
          <SelectItem key={stageId} value={stageId}>
            {WORK_STAGE_META[stageId].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
