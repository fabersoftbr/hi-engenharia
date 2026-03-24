"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { AnteprojectRecord, ANTEPROJECT_OWNERS } from "@/lib/anteprojects-data"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"

interface NewAnteprojectDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (anteproject: AnteprojectRecord) => void
  prefill?: {
    clientName: string
    technicalNotes: string
    originCrmOpportunityId: string
  } | null
}

export function NewAnteprojectDialog({
  isOpen,
  onClose,
  onSubmit,
  prefill,
}: NewAnteprojectDialogProps) {
  const isMobile = useIsMobile()

  if (!isOpen) {
    return null
  }

  const formContent = (
    <NewAnteprojectDialogForm
      onClose={onClose}
      onSubmit={onSubmit}
      prefill={prefill}
    />
  )

  if (isMobile) {
    return (
      <Sheet open onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Novo anteprojeto</SheetTitle>
          </SheetHeader>
          <div className="px-6 py-4">{formContent}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo anteprojeto</DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  )
}

function NewAnteprojectDialogForm({
  onClose,
  onSubmit,
  prefill,
}: Omit<NewAnteprojectDialogProps, "isOpen">) {
  const [clientName, setClientName] = useState(prefill?.clientName ?? "")
  const [installationType, setInstallationType] = useState("")
  const [monthlyConsumption, setMonthlyConsumption] = useState("")
  const [technicalNotes, setTechnicalNotes] = useState(
    prefill?.technicalNotes ?? ""
  )
  const [ownerId, setOwnerId] = useState(ANTEPROJECT_OWNERS[0]?.id ?? "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const now = new Date().toISOString()
    const newId = `ant-2026-${String(Date.now()).slice(-4)}`

    const newAnteproject: AnteprojectRecord = {
      id: newId,
      title: `${installationType} - ${clientName}`,
      clientName: clientName.trim() || "Cliente não informado",
      stage: "solicitacao",
      priority: "media",
      ownerId,
      originCrmOpportunityId: prefill?.originCrmOpportunityId ?? null,
      proposalId: null,
      installationType: installationType.trim() || "Não informado",
      monthlyConsumption: monthlyConsumption
        ? Number.parseInt(monthlyConsumption.replace(/\D/g, ""), 10)
        : null,
      technicalNotes: technicalNotes.trim(),
      isAwaitingInformation: false,
      attachments: [],
      createdAt: now,
      updatedAt: now,
      timeline: [
        {
          stage: "solicitacao",
          changedAt: now,
          changedBy: ownerId,
          notes: prefill
            ? "Anteprojeto criado a partir de oportunidade do CRM"
            : "Solicitação criada",
        },
      ],
    }

    onSubmit(newAnteproject)
  }

  const installationTypes = [
    { value: "Residencial", label: "Residencial" },
    { value: "Comercial", label: "Comercial" },
    { value: "Industrial", label: "Industrial" },
    { value: "Rural", label: "Rural" },
    { value: "Condomínio", label: "Condomínio" },
  ]

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="clientName" className="text-sm font-medium">
          Cliente
        </label>
        <Input
          id="clientName"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Nome do cliente"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="installationType" className="text-sm font-medium">
          Tipo de instalação
        </label>
        <Select value={installationType} onValueChange={setInstallationType}>
          <SelectTrigger id="installationType">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            {installationTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="monthlyConsumption" className="text-sm font-medium">
          Consumo médio
        </label>
        <Input
          id="monthlyConsumption"
          value={monthlyConsumption}
          onChange={(e) => setMonthlyConsumption(e.target.value)}
          placeholder="kWh/mês"
          type="number"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="technicalNotes" className="text-sm font-medium">
          Observações técnicas
        </label>
        <Input
          id="technicalNotes"
          value={technicalNotes}
          onChange={(e) => setTechnicalNotes(e.target.value)}
          placeholder="Observações sobre o projeto"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="responsible" className="text-sm font-medium">
          Responsável
        </label>
        <Select value={ownerId} onValueChange={setOwnerId}>
          <SelectTrigger id="responsible">
            <SelectValue placeholder="Selecione o responsável" />
          </SelectTrigger>
          <SelectContent>
            {ANTEPROJECT_OWNERS.map((owner) => (
              <SelectItem key={owner.id} value={owner.id}>
                {owner.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Criar anteprojeto</Button>
      </DialogFooter>
    </form>
  )
}
