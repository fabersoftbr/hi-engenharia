import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"
import { Skeleton } from "@workspace/ui/components/skeleton"

interface PipelineSkeletonProps {
  columnCount?: number
  cardsPerColumn?: number
  className?: string
}

function PipelineSkeleton({
  columnCount = 4,
  cardsPerColumn = 3,
  className,
}: PipelineSkeletonProps) {
  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
      {Array.from({ length: columnCount }).map((_, col) => (
        <div
          key={`col-${col}`}
          className="flex w-72 shrink-0 flex-col gap-3 rounded-xl bg-muted/50 p-3"
        >
          {/* Column header */}
          <div className="flex items-center justify-between px-1">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="size-5 rounded-full" />
          </div>

          {/* Cards */}
          {Array.from({ length: cardsPerColumn }).map((_, card) => (
            <div
              key={`card-${col}-${card}`}
              className="flex flex-col gap-3 rounded-lg border bg-card p-4"
            >
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-3 w-1/2 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export { PipelineSkeleton }
export type { PipelineSkeletonProps }
