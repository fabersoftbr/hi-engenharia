import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"
import { Skeleton } from "@workspace/ui/components/skeleton"

interface CardGridSkeletonProps {
  itemCount?: number
  className?: string
}

function CardGridSkeleton({ itemCount = 4, className }: CardGridSkeletonProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {Array.from({ length: itemCount }).map((_, i) => (
        <div
          key={`card-${i}`}
          className="flex flex-col gap-4 rounded-2xl border p-6"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="size-8 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-3 w-32 rounded-md" />
        </div>
      ))}
    </div>
  )
}

export { CardGridSkeleton }
export type { CardGridSkeletonProps }
