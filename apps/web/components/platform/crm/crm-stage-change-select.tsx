"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { CRM_STAGE_ORDER, CrmStageId, CRM_STAGE_META } from "@/lib/crm-data"

interface CrmStageChangeSelectProps {
  currentStage: CrmStageId
  onStageChange: (stage: CrmStageId) => void
}

export function CrmStageChangeSelect({
  currentStage,
  onStageChange,
}: CrmStageChangeSelectProps) {
  return (
    <Select value={currentStage} onValueChange={onStageChange}>
      <SelectTrigger>
        <SelectValue placeholder="Mudar etapa" />
      </SelectTrigger>
      <SelectContent>
        {CRM_STAGE_ORDER.map((stageId) => (
          <SelectItem key={stageId} value={stageId}>
            {CRM_STAGE_META[stageId].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
