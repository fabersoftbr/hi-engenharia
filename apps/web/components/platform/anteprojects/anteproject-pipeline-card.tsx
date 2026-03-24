"use client"

import { Draggable } from "@hello-pangea/dnd"
import Link from "next/link"
import {
  AnteprojectRecord,
  getAnteprojectOwnerById,
} from "@/lib/anteprojects-data"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"

interface AnteprojectPipelineCardProps {
  anteproject: AnteprojectRecord
  index: number
}

export function AnteprojectPipelineCard({
  anteproject,
  index,
}: AnteprojectPipelineCardProps) {
  const owner = getAnteprojectOwnerById(anteproject.ownerId)

  const formattedDate = new Date(anteproject.updatedAt).toLocaleDateString(
    "pt-BR"
  )

  return (
    <Draggable draggableId={anteproject.id} index={index}>
      {(provided, snapshot) => (
        <Link
          href={`/anteprojetos/${anteproject.id}`}
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
                <p className="truncate text-sm font-medium">
                  {anteproject.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {anteproject.clientName}
                </p>
              </div>
            </div>

            {/* Awaiting information badge */}
            {anteproject.isAwaitingInformation && (
              <Badge variant="destructive" className="w-fit text-xs"></Badge>
            )}

            {/* Proposal generated badge */}
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
                <span className="truncate">
                  {owner?.name ?? "Não atribuído"}
                </span>
              </div>
              <span>{formattedDate}</span>
            </div>
          </div>
        </Link>
      )}
    </Draggable>
  )
}
