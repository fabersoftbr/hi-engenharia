"use client"

import Link from "next/link"
import {
  AnteprojectRecord,
  getAnteprojectOwnerById,
} from "@/lib/anteprojects-data"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { AnteprojectStageBadge } from "./anteproject-stage-badge"

interface AnteprojectPipelineCardMobileProps {
  anteproject: AnteprojectRecord
  index: number
}

export function AnteprojectPipelineCardMobile({
  anteproject,
}: AnteprojectPipelineCardMobileProps) {
  const owner = getAnteprojectOwnerById(anteproject.ownerId)

  const formattedDate = new Date(anteproject.updatedAt).toLocaleDateString(
    "pt-BR"
  )

  return (
    <Link
      href={`/anteprojetos/${anteproject.id}`}
      className="block rounded-lg border bg-background p-3 transition-shadow hover:shadow-md"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{anteproject.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {anteproject.clientName}
            </p>
          </div>
        </div>

        {anteproject.isAwaitingInformation && (
          <Badge variant="destructive" className="w-fit text-xs">
            Aguardando informacoes
          </Badge>
        )}

        {anteproject.proposalId && (
          <Badge variant="secondary" className="w-fit text-xs">
            Proposta gerada
          </Badge>
        )}

        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Avatar size="sm">
              <AvatarFallback>{owner?.initials ?? "??"}</AvatarFallback>
            </Avatar>
            <span className="truncate">{owner?.name ?? "Nao atribuido"}</span>
          </div>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  )
}
