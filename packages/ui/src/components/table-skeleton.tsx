import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"
import { Skeleton } from "@workspace/ui/components/skeleton"

interface TableSkeletonProps {
  rowCount?: number
  columnCount?: number
  className?: string
}

function TableSkeleton({
  rowCount = 5,
  columnCount = 6,
  className,
}: TableSkeletonProps) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      {/* Header row */}
      <div className="flex items-center gap-4 border-b pb-3">
        {Array.from({ length: columnCount }).map((_, col) => (
          <Skeleton
            key={`header-${col}`}
            className={cn(
              "h-4 flex-1 rounded-md",
              col === 0 && "max-w-[200px]",
              col === columnCount - 1 && "max-w-[100px]"
            )}
          />
        ))}
      </div>

      {/* Data rows */}
      {Array.from({ length: rowCount }).map((_, row) => (
        <div
          key={`row-${row}`}
          className="flex items-center gap-4 border-b py-3 last:border-b-0"
        >
          {Array.from({ length: columnCount }).map((_, col) => (
            <Skeleton
              key={`cell-${row}-${col}`}
              className={cn(
                "h-4 flex-1 rounded-md",
                col === 0 && "max-w-[200px]",
                col === columnCount - 1 && "max-w-[100px]"
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export { TableSkeleton }
export type { TableSkeletonProps }
