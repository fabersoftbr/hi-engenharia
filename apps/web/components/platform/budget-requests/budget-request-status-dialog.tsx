"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import type { BudgetRequestStatus } from "@/lib/budget-requests-data"
import { BUDGET_REQUEST_STATUS_META } from "@/lib/budget-requests-data"
import { cn } from "@workspace/ui/lib/utils"

interface BudgetRequestStatusDialogProps {
  currentStatus: BudgetRequestStatus
  requestId?: string
  onStatusChange?: (newStatus: BudgetRequestStatus) => void
}

const STATUS_OPTIONS: BudgetRequestStatus[] = [
  "novo",
  "em-analise",
  "aprovado",
  "recusado",
]

export function BudgetRequestStatusDialog({
  currentStatus,
  requestId,
  onStatusChange,
}: BudgetRequestStatusDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] =
    useState<BudgetRequestStatus>(currentStatus)

  const handleApplyStatus = () => {
    if (selectedStatus !== currentStatus) {
      onStatusChange?.(selectedStatus)
      console.log(
        `Status changed for request ${requestId}: ${currentStatus} -> ${selectedStatus}`
      )
    }
    setIsOpen(false)
  }

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Alterar status
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar status</DialogTitle>
            <DialogDescription>
              Selecione o novo status para esta solicitacao.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2 py-4">
            {STATUS_OPTIONS.map((status) => {
              const meta = BUDGET_REQUEST_STATUS_META[status]
              const isSelected = selectedStatus === status

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={cn(
                    "flex items-center justify-center rounded-lg border p-3 transition-colors",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <Badge
                    variant={isSelected ? "default" : meta.variant}
                    className="justify-center"
                  >
                    {meta.label}
                  </Badge>
                </button>
              )
            })}
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleApplyStatus}>Aplicar status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
