import { Badge } from "@workspace/ui/components/badge"

import { type ProjectType, PROJECT_TYPES } from "@/lib/projects-data"

interface ProjectTypeBadgeProps {
  type: ProjectType
  className?: string
}

export function ProjectTypeBadge({ type, className }: ProjectTypeBadgeProps) {
  const meta = PROJECT_TYPES[type]
  return (
    <Badge variant={meta.variant} className={className}>
      {meta.label}
    </Badge>
  )
}
