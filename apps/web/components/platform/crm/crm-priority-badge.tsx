"use client"

import { Badge } from "@workspace/ui/components/badge"
import { CRM_PRIORITY_META, CrmPriority } from "@/lib/crm-data"

interface CrmPriorityBadgeProps {
  priority: CrmPriority
  className?: string
}

export function CrmPriorityBadge({ priority, className }: CrmPriorityBadgeProps) {
  const meta = CRM_PRIORITY_META[priority]

  return (
    <Badge variant={meta.variant} className={className}>
      {meta.label}
    </Badge>
  )
}
