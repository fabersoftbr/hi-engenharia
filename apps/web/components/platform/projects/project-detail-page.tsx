"use client"

import * as React from "react"
import Link from "next/link"
import { FileTextIcon, DownloadIcon, FileBarChartIcon } from "lucide-react"
import type { ProjectRecord, WorkStageId } from "@/lib/projects-data"
import {
  getProjectOwnerById,
  getProjectProgress,
  WORK_STAGE_ORDER,
  WORK_STAGE_META,
  PROJECT_TYPES,
} from "@/lib/projects-data"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Progress } from "@workspace/ui/components/progress"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { ProjectStageHistory } from "./project-stage-history"
import { ProjectStageChangeSelect } from "./project-stage-change-select"

interface ProjectDetailPageProps {
  project: ProjectRecord
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function ProjectDetailPage({
  project: initialProject,
}: ProjectDetailPageProps) {
  const [project, setProject] = React.useState<ProjectRecord>(initialProject)

  const owner = getProjectOwnerById(project.ownerId)

  const currentStageIndex = WORK_STAGE_ORDER.indexOf(project.stage)
  const nextStageIndex = currentStageIndex + 1
  const nextStage =
    nextStageIndex < WORK_STAGE_ORDER.length
      ? WORK_STAGE_ORDER[nextStageIndex]
      : null
  const nextStageLabel = nextStage ? WORK_STAGE_META[nextStage].label : null

  const handleStageChange = (newStage: WorkStageId) => {
    setProject((prev) => ({
      ...prev,
      stage: newStage,
      progressPercent: getProjectProgress(newStage),
      history: [
        {
          stage: newStage,
          changedAt: new Date().toISOString(),
          changedBy: owner?.name ?? "Sistema",
        },
        ...prev.history,
      ],
    }))
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{project.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {project.clientName}
            </span>
            <Badge variant={PROJECT_TYPES[project.type].variant}>
              {PROJECT_TYPES[project.type].label}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main layout: 2 columns on desktop, stacked on mobile */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-6">
        {/* Left column: Project info */}
        <div className="flex flex-col gap-6">
          {/* Resumo do projeto */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo do projeto</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{project.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium">
                    {PROJECT_TYPES[project.type].label}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Potencia (kWp)
                  </p>
                  <p className="font-medium">{project.powerKwp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Local</p>
                  <p className="font-medium">{project.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Prazo previsto
                  </p>
                  <p className="font-medium">
                    {formatDate(project.plannedEndDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Responsavel</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="text-xs">
                        {owner?.initials ?? "??"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{owner?.name ?? "-"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Arquivos relacionados */}
          <Card>
            <CardHeader>
              <CardTitle>Arquivos relacionados</CardTitle>
            </CardHeader>
            <CardContent>
              {project.attachments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum arquivo relacionado.
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {project.attachments.map((attachment) => (
                    <li
                      key={attachment.id}
                      className="flex items-center justify-between gap-3 rounded-md border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium">
                            {attachment.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatBytes(attachment.size)}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <DownloadIcon className="size-4" />
                        <span className="sr-only">Baixar arquivo</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column: Stage, actions, history */}
        <div className="mt-6 flex flex-col gap-6 lg:mt-0">
          {/* Status atual */}
          <Card>
            <CardHeader>
              <CardTitle>Status atual</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Badge variant={WORK_STAGE_META[project.stage].variant}>
                {WORK_STAGE_META[project.stage].label}
              </Badge>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground">Progresso</p>
                <div className="flex items-center gap-2">
                  <Progress
                    value={project.progressPercent}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground">
                    {project.progressPercent}%
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">Proxima etapa</p>
                <p className="text-sm font-medium">
                  {nextStageLabel ?? "Ultima etapa"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Acoes */}
          <Card>
            <CardHeader>
              <CardTitle>Acoes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {/* Stage change */}
              <div>
                <p className="mb-2 text-sm text-muted-foreground">
                  Mudar estagio
                </p>
                <ProjectStageChangeSelect
                  currentStage={project.stage}
                  onStageChange={handleStageChange}
                />
              </div>

              {/* Linked context */}
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Contexto</p>
                {project.proposalId && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/propostas/${project.proposalId}`}>
                      Proposta
                    </Link>
                  </Button>
                )}
                {project.anteprojectId && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/anteprojetos/${project.anteprojectId}`}>
                      Ver anteprojeto
                    </Link>
                  </Button>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  <FileBarChartIcon className="size-4" />
                  Gerar relatorio
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Historico de etapas */}
          <Card>
            <CardHeader>
              <CardTitle>Historico de etapas</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectStageHistory history={project.history} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
