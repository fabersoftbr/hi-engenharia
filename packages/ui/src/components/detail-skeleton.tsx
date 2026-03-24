import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"
import { Skeleton } from "@workspace/ui/components/skeleton"

interface DetailSkeletonProps {
  sectionCount?: number
  className?: string
}

function DetailSkeleton({ sectionCount = 4, className }: DetailSkeletonProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-[1fr_320px]",
        className
      )}
    >
      {/* Main content column */}
      <div className="flex flex-col gap-6">
        {/* Title area */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-64 rounded-md" />
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>

        {/* Sections */}
        {Array.from({ length: sectionCount }).map((_, i) => (
          <div key={`section-${i}`} className="flex flex-col gap-3">
            <Skeleton className="h-5 w-32 rounded-md" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar column */}
      <div className="flex flex-col gap-4">
        {/* Actions card */}
        <div className="flex flex-col gap-3 rounded-2xl border p-4">
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>

        {/* Timeline card */}
        <div className="flex flex-col gap-3 rounded-2xl border p-4">
          <Skeleton className="h-5 w-24 rounded-md" />
          {Array.from({ length: 3 }).map((_, j) => (
            <div key={`timeline-${j}`} className="flex gap-3">
              <Skeleton className="size-8 rounded-full" />
              <div className="flex flex-1 flex-col gap-1">
                <Skeleton className="h-3 w-full rounded-md" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { DetailSkeleton }
export type { DetailSkeletonProps }
