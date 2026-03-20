import { Badge } from "@workspace/ui/components/badge"
import {
  ANTEPROJECT_STAGE_META,
  type AnteprojectStageId,
} from "@/lib/anteprojects-data"

interface AnteprojectStageBadgeProps {
  stage: AnteprojectStageId
  className?: string
}

export function AnteprojectStageBadge({
  stage,
  className,
}: AnteprojectStageBadgeProps) {
  const meta = ANTEPROJECT_STAGE_META[stage]

  return (
    <Badge variant={meta.variant} className={className}>
      {meta.label}
    </Badge>
  )
}
