"use client"

import type { BudgetRequestStatus } from "@/lib/budget-requests-data"
import { BUDGET_REQUEST_STATUS_META } from "@/lib/budget-requests-data"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import { CheckIcon } from "lucide-react"

interface BudgetRequestStatusTimelineProps {
  currentStatus: BudgetRequestStatus
}

const STATUS_ORDER: BudgetRequestStatus[] = [
  "novo",
  "em-analise",
  "aprovado",
  "recusado",
]

export function BudgetRequestStatusTimeline({
  currentStatus,
}: BudgetRequestStatusTimelineProps) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus)

  return (
    <div className="flex w-full items-start justify-between gap-2">
      {STATUS_ORDER.map((status, index) => {
        const meta = BUDGET_REQUEST_STATUS_META[status]
        const isActive = index === currentIndex
        const isPast = index < currentIndex

        return (
          <div key={status} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {/* Connector line before */}
              {index > 0 && (
                <div
                  className={cn(
                    "h-0.5 flex-1",
                    isPast || isActive ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
              {/* Status circle */}
              <div
                className={cn(
                  "z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isPast
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background"
                )}
              >
                {(isActive || isPast) && <CheckIcon className="size-4" />}
              </div>
              {/* Connector line after */}
              {index < STATUS_ORDER.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1",
                    isPast ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
            {/* Status label */}
            <div className="mt-2">
              <Badge
                variant={
                  isActive ? "default" : isPast ? "secondary" : "outline"
                }
              >
                {meta.label}
              </Badge>
            </div>
          </div>
        )
      })}
    </div>
  )
}
