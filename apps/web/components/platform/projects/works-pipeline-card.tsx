"use client"

import { Draggable } from "@hello-pangea/dnd"
import Link from "next/link"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Progress } from "@workspace/ui/components/progress"

import { getProjectOwnerById, type ProjectRecord } from "@/lib/projects-data"

interface WorksPipelineCardProps {
  project: ProjectRecord
  index: number
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function WorksPipelineCard({ project, index }: WorksPipelineCardProps) {
  const owner = getProjectOwnerById(project.ownerId)

  return (
    <Draggable draggableId={project.id} index={index}>
      {(provided, snapshot) => (
        <Link
          href={`/projetos/${project.id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`block rounded-lg border bg-background p-3 transition-shadow hover:shadow-md ${
            snapshot.isDragging ? "shadow-lg ring-2 ring-primary/20" : ""
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{project.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {project.clientName}
                </p>
              </div>
            </div>

            {/* Proposal badge */}
            {project.proposalId && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">Proposta</span>
                <Badge variant="outline" className="text-xs">
                  #{project.proposalId}
                </Badge>
              </div>
            )}

            {/* Start date */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>Inicio</span>
              <span>{formatDate(project.startDate)}</span>
            </div>

            {/* Progress */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Progress value={project.progressPercent} className="flex-1" />
                <span className="text-xs text-muted-foreground">
                  {project.progressPercent}% concluido
                </span>
              </div>
            </div>

            {/* Owner */}
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Avatar className="size-5">
                  <AvatarFallback className="text-[10px]">
                    {owner?.initials ?? "??"}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">
                  {owner?.name ?? "Não atribuído"}
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </Draggable>
  )
}
