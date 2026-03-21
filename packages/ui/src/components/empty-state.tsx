import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import {
  Empty,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyActions,
} from "@workspace/ui/components/empty"

export interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={cn("py-12", className)}>
      {Icon && (
        <EmptyIcon>
          <Icon />
        </EmptyIcon>
      )}
      <EmptyTitle>{title}</EmptyTitle>
      {description && <EmptyDescription>{description}</EmptyDescription>}
      {action && <EmptyActions>{action}</EmptyActions>}
    </Empty>
  )
}

export { EmptyState }
