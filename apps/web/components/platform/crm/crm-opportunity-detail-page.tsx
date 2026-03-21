"use client"

import * as React from "react"
import Link from "next/link"
import type { CrmOpportunityRecord } from "@/lib/crm-data"
import { getCrmOwnerById } from "@/lib/crm-data"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { CrmStageBadge } from "./crm-stage-badge"
import { CrmPriorityBadge } from "./crm-priority-badge"
import { CrmStageHistory } from "./crm-stage-history"
import { CrmStageChangeSelect } from "./crm-stage-change-select"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { DetailSkeleton } from "@/components/platform/states/skeletons"

interface CrmOpportunityDetailPageProps {
  opportunity: CrmOpportunityRecord
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function CrmOpportunityDetailPage({
  opportunity: initialOpportunity,
}: CrmOpportunityDetailPageProps) {
  const isLoading = useSimulatedLoading()
  const [opportunity, setOpportunity] =
    React.useState<CrmOpportunityRecord>(initialOpportunity)

  const owner = getCrmOwnerById(opportunity.ownerId)

  if (isLoading) {
    return <DetailSkeleton />
  }

  const handleStageChange = (newStage: typeof opportunity.stage) => {
    setOpportunity((prev) => ({
      ...prev,
      stage: newStage,
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
          <h1 className="text-2xl font-semibold">{opportunity.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {opportunity.company}
            </span>
            <CrmPriorityBadge priority={opportunity.priority} />
          </div>
        </div>
      </div>

      {/* Main layout: 2 columns on desktop, stacked on mobile */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-6">
        {/* Left column: Opportunity info */}
        <div className="flex flex-col gap-6">
          {/* Business information */}
          <Card>
            <CardHeader>
              <CardTitle>Informacoes do negocio</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Empresa/cliente
                  </p>
                  <p className="font-medium">{opportunity.company}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contato</p>
                  <p className="font-medium">Nao informado</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Valor estimado
                  </p>
                  <p className="font-medium">
                    {formatCurrency(opportunity.estimatedValue)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Responsaveis</p>
                  <p className="font-medium">{owner?.name ?? "Nao definido"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Origin request - responsive ordering */}
          {opportunity.originBudgetRequestId && (
            <Card className="order-3 lg:order-3">
              <CardHeader>
                <CardTitle>Solicitacao de origem</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link
                    href={`/orcamentos/${opportunity.originBudgetRequestId}`}
                  >
                    Ver solicitacao {opportunity.originBudgetRequestId}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column: Stage, history, actions */}
        <div className="mt-6 flex flex-col gap-6 lg:mt-0">
          {/* Current stage */}
          <Card className="order-1 lg:order-1">
            <CardHeader>
              <CardTitle>Etapa atual</CardTitle>
            </CardHeader>
            <CardContent>
              <CrmStageBadge stage={opportunity.stage} />
            </CardContent>
          </Card>

          {/* History timeline */}
          <Card className="order-2 lg:order-2">
            <CardHeader>
              <CardTitle>Historico visual</CardTitle>
            </CardHeader>
            <CardContent>
              <CrmStageHistory history={opportunity.history} />
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="order-4 lg:order-3">
            <CardHeader>
              <CardTitle>Acoes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button asChild>
                <Link
                  href={`/anteprojetos?sourceOpportunityId=${opportunity.id}`}
                >
                  Criar anteprojeto
                </Link>
              </Button>
              <CrmStageChangeSelect
                currentStage={opportunity.stage}
                onStageChange={handleStageChange}
              />
            </CardContent>
          </Card>

          {/* Origin request on mobile - rendered after actions */}
          {opportunity.originBudgetRequestId && (
            <Card className="order-3 lg:hidden">
              <CardHeader>
                <CardTitle>Solicitacao de origem</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link
                    href={`/orcamentos/${opportunity.originBudgetRequestId}`}
                  >
                    Ver solicitacao {opportunity.originBudgetRequestId}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
