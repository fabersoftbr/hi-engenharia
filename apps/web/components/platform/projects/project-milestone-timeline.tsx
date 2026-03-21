"use client"

import { PencilIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { type ProjectMilestone, getProjectOwnerById } from "@/lib/projects-data"

interface ProjectMilestoneTimelineProps {
  milestones: ProjectMilestone[]
  onEditMilestone: (milestone: ProjectMilestone) => void
  onStatusChange: (
    milestoneId: string,
    status: ProjectMilestone["status"]
  ) => void
}

const MILESTONE_STATUS_META: Record<
  ProjectMilestone["status"],
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  concluido: { label: "Concluido", variant: "default" },
  "em-andamento": { label: "Em andamento", variant: "secondary" },
  pendente: { label: "Pendente", variant: "outline" },
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function ProjectMilestoneTimeline({
  milestones,
  onEditMilestone,
  onStatusChange,
}: ProjectMilestoneTimelineProps) {
  if (milestones.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Marcos da obra</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Nenhum marco cadastrado.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marcos da obra</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {milestones.map((milestone) => {
            const owner = getProjectOwnerById(milestone.responsibleId)

            return (
              <div
                key={milestone.id}
                className="flex items-start justify-between gap-3 rounded-md border p-3"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{milestone.name}</span>
                    <Badge
                      variant={MILESTONE_STATUS_META[milestone.status].variant}
                    >
                      {MILESTONE_STATUS_META[milestone.status].label}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span>Inicio: {formatDate(milestone.startDate)}</span>
                      <span>Fim: {formatDate(milestone.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Responsavel: {owner?.name ?? "Nao atribuido"}</span>
                    </div>
                    {milestone.notes && (
                      <div className="mt-1">
                        <span>Observacoes: {milestone.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={milestone.status}
                    onValueChange={(value) =>
                      onStatusChange(
                        milestone.id,
                        value as ProjectMilestone["status"]
                      )
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="em-andamento">Em andamento</SelectItem>
                      <SelectItem value="concluido">Concluido</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditMilestone(milestone)}
                  >
                    <PencilIcon className="size-4" />
                    <span className="sr-only">Editar marco</span>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
