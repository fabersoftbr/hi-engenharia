"use client"

import * as React from "react"
import Link from "next/link"
import { FileTextIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react"
import type { AnteprojectRecord } from "@/lib/anteprojects-data"
import {
  getAnteprojectOwnerById,
  ANTEPROJECT_STAGE_META,
} from "@/lib/anteprojects-data"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { AnteprojectStageBadge } from "./anteproject-stage-badge"
import { AnteprojectPriorityBadge } from "./anteproject-priority-badge"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { DetailSkeleton } from "@/components/platform/states/skeletons"

interface AnteprojectDetailPageProps {
  anteproject: AnteprojectRecord
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function formatTimelineDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function AnteprojectTimeline({
  history,
}: {
  history: AnteprojectRecord["timeline"]
}) {
  return (
    <div className="flex flex-col gap-3">
      {history.map((entry, index) => {
        const meta = ANTEPROJECT_STAGE_META[entry.stage]
        return (
          <div
            key={`${entry.stage}-${entry.changedAt}`}
            className="flex items-start gap-3"
          >
            <div className="flex flex-col items-center">
              <div
                className={`size-2 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground/30"}`}
              />
              {index < history.length - 1 && (
                <div className="w-px flex-1 bg-muted" />
              )}
            </div>
            <div className="flex flex-col gap-0.5 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{meta.label}</span>
                {index === 0 && (
                  <span className="text-xs text-muted-foreground">(atual)</span>
                )}
              </div>
              {entry.notes && (
                <p className="text-sm text-muted-foreground">{entry.notes}</p>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatTimelineDate(entry.changedAt)}</span>
                <span>-</span>
                <span>{entry.changedBy}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function AnteprojectDetailPage({
  anteproject,
}: AnteprojectDetailPageProps) {
  const isLoading = useSimulatedLoading()
  const owner = getAnteprojectOwnerById(anteproject.ownerId)

  if (isLoading) {
    return <DetailSkeleton />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{anteproject.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {anteproject.clientName}
            </span>
            <AnteprojectPriorityBadge priority={anteproject.priority} />
            {anteproject.isAwaitingInformation && (
              <span className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircleIcon className="size-4" />
                Aguardando informacoes
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main layout: 2 columns on desktop, stacked on mobile */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-6">
        {/* Left column: Technical info */}
        <div className="flex flex-col gap-6">
          {/* Technical summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo tecnico</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{anteproject.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instalacao</p>
                  <p className="font-medium">{anteproject.installationType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Consumo medio</p>
                  <p className="font-medium">
                    {anteproject.monthlyConsumption !== null
                      ? `${anteproject.monthlyConsumption} kWh`
                      : "-"}
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
              <div>
                <p className="text-sm text-muted-foreground">
                  Observacoes tecnicas
                </p>
                <p className="text-sm whitespace-pre-wrap">
                  {anteproject.technicalNotes || "-"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          {anteproject.attachments.length > 0 && (
            <Card className="order-3 lg:order-3">
              <CardHeader>
                <CardTitle>Anexos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2">
                  {anteproject.attachments.map((attachment) => (
                    <li
                      key={attachment.id}
                      className="flex items-center gap-3 rounded-md border p-3"
                    >
                      <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium">
                          {attachment.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatBytes(attachment.size)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column: Stage, timeline, links */}
        <div className="mt-6 flex flex-col gap-6 lg:mt-0">
          {/* Current stage */}
          <Card className="order-1 lg:order-1">
            <CardHeader>
              <CardTitle>Etapa atual</CardTitle>
            </CardHeader>
            <CardContent>
              <AnteprojectStageBadge stage={anteproject.stage} />
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="order-2 lg:order-2">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <AnteprojectTimeline history={anteproject.timeline} />
            </CardContent>
          </Card>

          {/* CRM origin */}
          {anteproject.originCrmOpportunityId && (
            <Card className="order-3 lg:order-3">
              <CardHeader>
                <CardTitle>CRM de origem</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href={`/crm/${anteproject.originCrmOpportunityId}`}>
                    Ver oportunidade {anteproject.originCrmOpportunityId}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Proposal */}
          <Card className="order-4 lg:order-4">
            <CardHeader>
              <CardTitle>Proposta comercial</CardTitle>
            </CardHeader>
            <CardContent>
              {anteproject.proposalId ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="size-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      Proposta gerada
                    </span>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href={`/propostas/${anteproject.proposalId}`}>
                      Abrir proposta comercial
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">
                    Nenhuma proposta gerada
                  </p>
                  <Button asChild>
                    <Link
                      href={`/propostas/nova?anteprojectId=${anteproject.id}`}
                    >
                      Gerar proposta
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Attachments on mobile - rendered in left column on desktop */}
          {anteproject.attachments.length > 0 && (
            <Card className="order-5 lg:hidden">
              <CardHeader>
                <CardTitle>Anexos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2">
                  {anteproject.attachments.map((attachment) => (
                    <li
                      key={attachment.id}
                      className="flex items-center gap-3 rounded-md border p-3"
                    >
                      <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium">
                          {attachment.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatBytes(attachment.size)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
