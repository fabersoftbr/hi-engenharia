"use client"

import { Draggable } from "@hello-pangea/dnd"
import Link from "next/link"
import { CrmOpportunityRecord, getCrmOwnerById } from "@/lib/crm-data"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { CrmPriorityBadge } from "./crm-priority-badge"

interface CrmPipelineCardProps {
  opportunity: CrmOpportunityRecord
  index: number
}

export function CrmPipelineCard({ opportunity, index }: CrmPipelineCardProps) {
  const owner = getCrmOwnerById(opportunity.ownerId)

  const formattedValue = opportunity.estimatedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  const lastContactDate = new Date(opportunity.lastContactAt)
  const formattedLastContact = lastContactDate.toLocaleDateString("pt-BR")

  return (
    <Draggable draggableId={opportunity.id} index={index}>
      {(provided, snapshot) => (
        <Link
          href={`/crm/${opportunity.id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`block rounded-lg border bg-background p-3 transition-shadow hover:shadow-md ${
            snapshot.isDragging ? "shadow-lg ring-2 ring-primary/20" : ""
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{opportunity.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {opportunity.company}
                </p>
              </div>
              <CrmPriorityBadge priority={opportunity.priority} className="shrink-0" />
            </div>

            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-medium">{formattedValue}</span>
            </div>

            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Avatar size="sm">
                  <AvatarFallback>{owner?.initials ?? "??"}</AvatarFallback>
                </Avatar>
                <span className="truncate">{owner?.name ?? "Nao atribuido"}</span>
              </div>
              <span>Ultimo contato: {formattedLastContact}</span>
            </div>
          </div>
        </Link>
      )}
    </Draggable>
  )
}
