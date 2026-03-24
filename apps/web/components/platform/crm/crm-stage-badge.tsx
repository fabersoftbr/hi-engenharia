"use client"

import { Badge } from "@workspace/ui/components/badge"
import { CRM_STAGE_META, CrmStageId } from "@/lib/crm-data"

interface CrmStageBadgeProps {
  stage: CrmStageId
  className?: string
}

export function CrmStageBadge({ stage, className }: CrmStageBadgeProps) {
  const meta = CRM_STAGE_META[stage]

  return (
    <Badge variant={meta.variant} className={className}>
      {meta.label}
    </Badge>
  )
}
