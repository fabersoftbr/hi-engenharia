"use client"

import Link from "next/link"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Progress } from "@workspace/ui/components/progress"

import {
  getProjectOwnerById,
  getProjectProgress,
  type ProjectRecord,
  type WorkStageId,
  WORK_STAGE_META,
} from "@/lib/projects-data"

interface WorksPipelineCardMobileProps {
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

export function WorksPipelineCardMobile({
  project,
  index,
}: WorksPipelineCardMobileProps) {
  const owner = getProjectOwnerById(project.ownerId)

  return (
    <Link
      href={`/projetos/${project.id}`}
      className="block rounded-lg border bg-background p-3 transition-shadow hover:shadow-md"
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

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Inicio</span>
          <span>{formatDate(project.startDate)}</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Progress value={project.progressPercent} className="flex-1" />
            <span className="text-xs text-muted-foreground">
              {project.progressPercent}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Avatar className="size-5">
              <AvatarFallback className="text-[10px]">
                {owner?.initials ?? "??"}
              </AvatarFallback>
            </Avatar>
            <span>{owner?.name ?? "Nao atribuido"}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
