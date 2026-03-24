import { Skeleton } from "@workspace/ui/components/skeleton"

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div data-testid="table-skeleton" className="w-full space-y-2">
      {/* Header row */}
      <div className="flex gap-4 py-3">
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-4 w-1/6" />
      </div>
      {/* Data rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      ))}
    </div>
  )
}

export function CardGridSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div
      data-testid="card-grid-skeleton"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-xl border p-4">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  )
}

export function PipelineSkeleton({ stages = 4 }: { stages?: number }) {
  return (
    <div data-testid="pipeline-skeleton" className="flex gap-4 overflow-x-auto">
      {Array.from({ length: stages }).map((_, i) => (
        <div key={i} className="w-64 shrink-0 space-y-3 rounded-xl border p-4">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ))}
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div data-testid="detail-skeleton" className="grid gap-6 lg:grid-cols-3">
      {/* Main content column */}
      <div className="space-y-4 lg:col-span-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      {/* Sidebar column */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  )
}
