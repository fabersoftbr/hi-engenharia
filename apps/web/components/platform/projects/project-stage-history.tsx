"use client"

import type { ProjectHistoryEntry } from "@/lib/projects-data"
import { WORK_STAGE_META } from "@/lib/projects-data"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"

interface ProjectStageHistoryProps {
  history: ProjectHistoryEntry[]
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function ProjectStageHistory({ history }: ProjectStageHistoryProps) {
  if (history.length === 0) {
    return <p className="text-sm text-muted-foreground"></p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {history.map((entry, index) => {
        const stageMeta = WORK_STAGE_META[entry.stage]
        return (
          <li key={index}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1">
                <Badge variant={stageMeta.variant}>{stageMeta.label}</Badge>
                <span className="text-xs text-muted-foreground">
                  {entry.changedBy}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(entry.changedAt)}
              </span>
            </div>
            {index < history.length - 1 && <Separator className="mt-3" />}
          </li>
        )
      })}
    </ul>
  )
}
