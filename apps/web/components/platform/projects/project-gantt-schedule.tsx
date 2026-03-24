"use client"

import { type ProjectMilestone } from "@/lib/projects-data"

interface ProjectGanttScheduleProps {
  milestones: ProjectMilestone[]
  projectStartDate: string
  plannedEndDate: string
}

const STATUS_COLORS: Record<ProjectMilestone["status"], string> = {
  concluido: "bg-primary",
  "em-andamento": "bg-secondary",
  pendente: "bg-muted",
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  })
}

export function ProjectGanttSchedule({
  milestones,
  projectStartDate,
  plannedEndDate,
}: ProjectGanttScheduleProps) {
  if (milestones.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhum marco para exibir no cronograma.
      </p>
    )
  }

  const start = new Date(projectStartDate).getTime()
  const end = new Date(plannedEndDate).getTime()
  const totalDuration = end - start

  if (totalDuration <= 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Datas do projeto invalidas para exibir cronograma.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Timeline header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatDate(projectStartDate)}</span>
        <span>{formatDate(plannedEndDate)}</span>
      </div>

      {/* Gantt bars */}
      <div className="flex flex-col gap-2">
        {milestones.map((milestone) => {
          const milestoneStart = new Date(milestone.startDate).getTime()
          const milestoneEnd = new Date(milestone.endDate).getTime()

          const offsetPercent =
            totalDuration > 0
              ? Math.max(0, ((milestoneStart - start) / totalDuration) * 100)
              : 0
          const widthPercent =
            totalDuration > 0
              ? Math.min(
                  100 - offsetPercent,
                  ((milestoneEnd - milestoneStart) / totalDuration) * 100
                )
              : 0

          return (
            <div key={milestone.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-32 truncate text-xs">{milestone.name}</span>
                <div className="relative h-4 flex-1 rounded bg-muted/50">
                  <div
                    className={`absolute h-full rounded ${STATUS_COLORS[milestone.status]}`}
                    style={{
                      left: `${Math.min(offsetPercent, 100)}%`,
                      width: `${Math.max(widthPercent, 2)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
