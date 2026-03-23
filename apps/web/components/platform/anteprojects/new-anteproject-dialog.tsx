"use client"

import { useState, useEffect } from "react"
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
  const [clientName, setClientName] = useState("")
  const [installationType, setInstallationType] = useState("")
  const [monthlyConsumption, setMonthlyConsumption] = useState("")
  const [technicalNotes, setTechnicalNotes] = useState("")
  const [ownerId, setOwnerId] = useState(ANTEPROJECT_OWNERS[0]?.id ?? "")

  useEffect(() => {
    if (prefill) {
      setClientName(prefill.clientName)
      setTechnicalNotes(prefill.technicalNotes)
    } else {
      setClientName("")
      setTechnicalNotes("")
    }
    setInstallationType("")
    setMonthlyConsumption("")
    setOwnerId(ANTEPROJECT_OWNERS[0]?.id ?? "")
  }, [prefill, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const now = new Date().toISOString()
    const newId = `ant-2026-${String(Date.now()).slice(-4)}`

    const newAnteproject: AnteprojectRecord = {
      id: newId,
      title: `${installationType} - ${clientName}`,
      clientName: clientName.trim() || "Cliente nao informado",
      stage: "solicitacao",
      priority: "media",
      ownerId,
      originCrmOpportunityId: prefill?.originCrmOpportunityId ?? null,
      proposalId: null,
      installationType: installationType.trim() || "Nao informado",
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
            : "Solicitacao criada",
        },
      ],
    }

    onSubmit(newAnteproject)

    setClientName("")
    setInstallationType("")
    setMonthlyConsumption("")
    setTechnicalNotes("")
    setOwnerId(ANTEPROJECT_OWNERS[0]?.id ?? "")
  }

  const installationTypes = [
    { value: "Residencial", label: "Residencial" },
    { value: "Comercial", label: "Comercial" },
    { value: "Industrial", label: "Industrial" },
    { value: "Rural", label: "Rural" },
    { value: "Condominio", label: "Condominio" },
  ]

  const formContent = (
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
          Tipo de instalacao
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
          Consumo medio
        </label>
        <Input
          id="monthlyConsumption"
          value={monthlyConsumption}
          onChange={(e) => setMonthlyConsumption(e.target.value)}
          placeholder="kWh/mes"
          type="number"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="technicalNotes" className="text-sm font-medium">
          Observacoes tecnicas
        </label>
        <Input
          id="technicalNotes"
          value={technicalNotes}
          onChange={(e) => setTechnicalNotes(e.target.value)}
          placeholder="Observacoes sobre o projeto"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="responsible" className="text-sm font-medium">
          Responsavel
        </label>
        <Select value={ownerId} onValueChange={setOwnerId}>
          <SelectTrigger id="responsible">
            <SelectValue placeholder="Selecione o responsavel" />
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

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo anteprojeto</DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  )
}
