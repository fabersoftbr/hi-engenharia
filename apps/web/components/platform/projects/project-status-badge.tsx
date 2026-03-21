import { Badge } from "@workspace/ui/components/badge"

import { type ProjectStatus, PROJECT_STATUS_META } from "@/lib/projects-data"

interface ProjectStatusBadgeProps {
  status: ProjectStatus
  className?: string
}

export function ProjectStatusBadge({
  status,
  className,
}: ProjectStatusBadgeProps) {
  const meta = PROJECT_STATUS_META[status]
  return (
    <Badge variant={meta.variant} className={className}>
      {meta.label}
    </Badge>
  )
}
