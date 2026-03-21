"use client"

import type { ProposalRecord } from "@/lib/proposals-data"
import { formatCurrency, calculateProposalTotal } from "@/lib/proposals-data"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"

interface ProposalPreviewProps {
  proposal: ProposalRecord
}

export function ProposalPreview({ proposal }: ProposalPreviewProps) {
  const total = calculateProposalTotal(proposal.items)

  return (
    <div className="flex flex-col gap-6">
      {/* Dados do cliente */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dados do cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cliente</span>
              <span className="font-medium">{proposal.clientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Origem</span>
              <span className="font-medium">{proposal.origin.label}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Descricao do projeto */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Descricao do projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-wrap">
            {proposal.projectDescription || "Sem descricao"}
          </p>
        </CardContent>
      </Card>

      {/* Tabela de itens */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tabela de itens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-[1fr_auto_auto] gap-2 text-sm font-medium text-muted-foreground">
              <span>Descricao</span>
              <span className="text-right">Qtd</span>
              <span className="text-right">Total</span>
            </div>
            <Separator />
            {proposal.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_auto_auto] gap-2 text-sm"
              >
                <span className="truncate">{item.description}</span>
                <span className="text-right text-muted-foreground">
                  {item.quantity}
                </span>
                <span className="text-right font-mono">
                  {formatCurrency(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Totais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Totais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono">{formatCurrency(total)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total geral</span>
              <span className="font-mono text-primary">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Condicoes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Condicoes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-wrap">
            {proposal.commercialTerms || "Sem condicoes especificadas"}
          </p>
        </CardContent>
      </Card>

      {/* Validade */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Validade</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Esta proposta e valida por{" "}
            <span className="font-medium">{proposal.validityDays} dias</span> a
            partir da data de emissao.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
