"use client"

import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import type { BudgetRequestFormValues } from "@/lib/budget-request-form"

interface BudgetRequestSubmissionDialogProps {
  isOpen: boolean
  onClose: () => void
  onNewRequest: () => void
  submittedData?: BudgetRequestFormValues
}

export function BudgetRequestSubmissionDialog({
  isOpen,
  onClose,
  onNewRequest,
  submittedData,
}: BudgetRequestSubmissionDialogProps) {
  const handleNewRequest = () => {
    onNewRequest()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitação enviada</DialogTitle>
          <DialogDescription>para acompanhamento.</DialogDescription>
        </DialogHeader>

        {submittedData && (
          <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Dados enviados
            </h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Nome</dt>
                <dd className="font-medium">{submittedData.clientName}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Telefone</dt>
                <dd className="font-medium">{submittedData.phone}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Cidade</dt>
                <dd className="font-medium">{submittedData.city}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Consumo mensal</dt>
                <dd className="font-medium">
                  {submittedData.monthlyConsumption} kWh
                </dd>
              </div>
            </dl>
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" asChild>
            <Link href="/orcamentos">Ver listagem</Link>
          </Button>
          <Button variant="outline" onClick={handleNewRequest}>
            Nova solicitacao
          </Button>
          <Button asChild>
            <Link href="/orcamentos">Voltar para a listagem</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
