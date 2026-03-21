"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeftIcon, FileDownIcon, SendIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import {
  type ProposalRecord,
  type ProposalStatus,
  formatCurrency,
  calculateProposalTotal,
} from "@/lib/proposals-data"
import { ProposalStatusBadge } from "./proposal-status-badge"
import { ProposalPreview } from "./proposal-preview"

interface ProposalDetailPageProps {
  proposal: ProposalRecord
}

export function ProposalDetailPage({ proposal }: ProposalDetailPageProps) {
  const [localStatus, setLocalStatus] = useState<ProposalStatus>(
    proposal.status
  )

  const canSendOrExport = localStatus === "pronta"

  const handleExportPdf = () => {
    toast.success("PDF gerado com sucesso")
  }

  const handleSendProposal = () => {
    setLocalStatus("enviada")
    toast.success("Proposta enviada com sucesso")
  }

  const total = calculateProposalTotal(proposal.items)

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/propostas">
                <ArrowLeftIcon className="size-4" />
                Voltar
              </Link>
            </Button>
          </div>
          <h1 className="text-2xl font-semibold">{proposal.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {proposal.clientName}
            </span>
            <ProposalStatusBadge status={localStatus} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExportPdf}
            disabled={!canSendOrExport}
          >
            <FileDownIcon className="size-4" />
            Exportar PDF
          </Button>
          <Button onClick={handleSendProposal} disabled={!canSendOrExport}>
            <SendIcon className="size-4" />
            Enviar proposta
          </Button>
        </div>
      </div>

      {/* Document preview */}
      <Card>
        <CardContent className="p-6">
          <ProposalPreview proposal={{ ...proposal, status: localStatus }} />
        </CardContent>
      </Card>

      {/* Totais */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Totais</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
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
    </div>
  )
}
