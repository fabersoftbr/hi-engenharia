"use client"

import type { BudgetRequestRecord } from "@/lib/budget-requests-data"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { BudgetRequestStatusTimeline } from "./budget-request-status-timeline"
import { BudgetRequestStatusDialog } from "./budget-request-status-dialog"
import { BUDGET_REQUEST_STATUS_META } from "@/lib/budget-requests-data"
import Link from "next/link"
import { FileText } from "lucide-react"

interface BudgetRequestDetailPageProps {
  request: BudgetRequestRecord
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function BudgetRequestDetailPage({ request }: BudgetRequestDetailPageProps) {
  const statusMeta = BUDGET_REQUEST_STATUS_META[request.status]

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">
            Solicitacao {request.id}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {request.clientName}
            </span>
            <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
          </div>
        </div>
      </div>

      {/* Main layout: 2 columns on desktop, stacked on mobile */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:gap-6">
        {/* Left column: Client info, consumption, notes */}
        <div className="flex flex-col gap-6">
          {/* Client information */}
          <Card>
            <CardHeader>
              <CardTitle>Dados do cliente</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{request.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{request.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cidade</p>
                  <p className="font-medium">{request.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data da solicitacao</p>
                  <p className="font-medium">{formatDate(request.requestedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consumption data */}
          <Card>
            <CardHeader>
              <CardTitle>Consumo/Projeto</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Consumo medio mensal</p>
                <p className="font-medium">
                  {request.monthlyConsumption
                    ? `${request.monthlyConsumption} kWh`
                    : "Nao informado"}
                </p>
              </div>
              {request.notes && (
                <div>
                  <p className="text-sm text-muted-foreground">Observacoes</p>
                  <p className="whitespace-pre-wrap">{request.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column: Timeline, actions, attachments */}
        <div className="mt-6 flex flex-col gap-6 lg:mt-0">
          {/* Status timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetRequestStatusTimeline currentStatus={request.status} />
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acoes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <BudgetRequestStatusDialog
                currentStatus={request.status}
                requestId={request.id}
              />
              <Button variant="outline" asChild>
                <Link href={`/orcamentos/nova?source=${request.id}`}>
                  Editar solicitacao
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/propostas">
                  Criar proposta
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle>Anexos</CardTitle>
            </CardHeader>
            <CardContent>
              {request.attachments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum anexo disponivel.
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {request.attachments.map((attachment) => (
                    <li
                      key={attachment.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-muted-foreground" />
                        <div className="flex flex-col">
                          <span className="text-sm">{attachment.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatBytes(attachment.size)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            window.alert(`Visualizar: ${attachment.name}`)
                          }}
                        >
                          Visualizar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            window.alert(`Baixar: ${attachment.name}`)
                          }}
                        >
                          Baixar
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
