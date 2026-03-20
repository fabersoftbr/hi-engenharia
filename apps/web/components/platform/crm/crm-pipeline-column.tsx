"use client"

import { useMemo } from "react"
import { CrmStageId, CrmOpportunityRecord, CRM_STAGE_META } from "@/lib/crm-data"
import { CrmPipelineCard } from "./crm-pipeline-card"

interface CrmPipelineColumnProps {
  stageId: CrmStageId
  opportunities: CrmOpportunityRecord[]
  isDraggingOver: boolean
}

export function CrmPipelineColumn({
  stageId,
  opportunities,
  isDraggingOver,
}: CrmPipelineColumnProps) {
  const meta = CRM_STAGE_META[stageId]
  const count = opportunities.length

  const totalValue = useMemo(() => {
    return opportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0)
  }, [opportunities])

  const formattedTotal = totalValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl p-3 transition-colors ${
        isDraggingOver ? "bg-primary/5 ring-2 ring-primary/20" : "bg-secondary/50"
      }`}
    >
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-semibold">{meta.label}</span>
        <span className="text-xs text-muted-foreground">
          {count} {count === 1 ? "oportunidade" : "oportunidades"}
        </span>
      </div>
      {totalValue > 0 && (
        <div className="text-xs text-muted-foreground">
          Total: {formattedTotal}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {opportunities.map((opp, index) => (
          <CrmPipelineCard key={opp.id} opportunity={opp} index={index} />
        ))}
      </div>
    </div>
  )
}
