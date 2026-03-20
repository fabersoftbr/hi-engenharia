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
import { PREVIEW_SUBMITTED_REQUEST_ID } from "@/lib/budget-requests-data"

interface BudgetRequestSubmissionDialogProps {
  isOpen: boolean
  onClose: () => void
  onNewRequest: () => void
}

export function BudgetRequestSubmissionDialog({
  isOpen,
  onClose,
  onNewRequest,
}: BudgetRequestSubmissionDialogProps) {
  const handleNewRequest = () => {
    onNewRequest()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitacao enviada</DialogTitle>
          <DialogDescription>
            A solicitacao foi registrada neste fluxo visual e ja pode seguir para
            acompanhamento.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" asChild>
            <Link href={`/orcamentos/${PREVIEW_SUBMITTED_REQUEST_ID}`}>
              Ver solicitacao
            </Link>
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
