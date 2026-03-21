"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import { CRM_STAGE_ORDER, CrmStageId, CRM_STAGE_META } from "@/lib/crm-data"

interface CrmStageChangeSelectProps {
  currentStage: CrmStageId
  onStageChange: (stage: CrmStageId) => void
}

export function CrmStageChangeSelect({
  currentStage,
  onStageChange,
}: CrmStageChangeSelectProps) {
  const [pendingStage, setPendingStage] = useState<CrmStageId | null>(null)

  const handleValueChange = (stage: CrmStageId) => {
    if (stage === "fechado") {
      setPendingStage(stage)
    } else {
      onStageChange(stage)
    }
  }

  const handleConfirmClose = () => {
    if (pendingStage) {
      onStageChange(pendingStage)
      setPendingStage(null)
    }
  }

  const handleCancelClose = () => {
    setPendingStage(null)
  }

  return (
    <>
      <Select value={currentStage} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Mudar etapa" />
        </SelectTrigger>
        <SelectContent>
          {CRM_STAGE_ORDER.map((stageId) => (
            <SelectItem key={stageId} value={stageId}>
              {CRM_STAGE_META[stageId].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AlertDialog
        open={pendingStage === "fechado"}
        onOpenChange={(open) => !open && handleCancelClose()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar mudanca de etapa</AlertDialogTitle>
            <AlertDialogDescription>
              Ao mover para Fechado, esta acao nao podera ser revertida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelClose}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmClose}
              variant="destructive"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
