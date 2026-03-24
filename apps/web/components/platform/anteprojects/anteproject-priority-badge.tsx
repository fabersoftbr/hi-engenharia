import { Badge } from "@workspace/ui/components/badge"
import {
  ANTEPROJECT_PRIORITY_META,
  type AnteprojectPriority,
} from "@/lib/anteprojects-data"

interface AnteprojectPriorityBadgeProps {
  priority: AnteprojectPriority
  className?: string
}

export function AnteprojectPriorityBadge({
  priority,
  className,
}: AnteprojectPriorityBadgeProps) {
  const meta = ANTEPROJECT_PRIORITY_META[priority]

  return (
    <Badge variant={meta.variant} className={className}>
      {meta.label}
    </Badge>
  )
}
