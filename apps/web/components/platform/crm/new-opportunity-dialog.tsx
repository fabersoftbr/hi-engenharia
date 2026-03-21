"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  CrmOpportunityRecord,
  CrmPriority,
  CRM_OWNERS,
  getCrmResponsibleOptions,
} from "@/lib/crm-data"

interface NewOpportunityDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (opportunity: CrmOpportunityRecord) => void
}

export function NewOpportunityDialog({
  isOpen,
  onClose,
  onSubmit,
}: NewOpportunityDialogProps) {
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [ownerId, setOwnerId] = useState(CRM_OWNERS[0]?.id ?? "")
  const [priority, setPriority] = useState<CrmPriority>("media")
  const [estimatedValue, setEstimatedValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const now = new Date().toISOString()
    const newId = `opp-2026-${String(Date.now()).slice(-4)}`

    const newOpportunity: CrmOpportunityRecord = {
      id: newId,
      title: title.trim() || "Nova oportunidade",
      company: company.trim() || "Empresa nao informada",
      stage: "lead",
      priority,
      ownerId,
      estimatedValue:
        Number.parseInt(estimatedValue.replace(/\D/g, ""), 10) || 0,
      createdAt: now,
      lastContactAt: now,
      originBudgetRequestId: "orc-2026-9001",
      history: [
        {
          stage: "lead",
          changedAt: now,
          changedBy: ownerId,
        },
      ],
    }

    onSubmit(newOpportunity)

    // Reset form
    setTitle("")
    setCompany("")
    setOwnerId(CRM_OWNERS[0]?.id ?? "")
    setPriority("media")
    setEstimatedValue("")
  }

  const responsibleOptions = getCrmResponsibleOptions().filter(
    (opt) => opt.value !== "all"
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova oportunidade</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Oportunidade
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titulo da oportunidade"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="text-sm font-medium">
              Empresa
            </label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Nome da empresa"
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
                {responsibleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="text-sm font-medium">
              Prioridade
            </label>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as CrmPriority)}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="value" className="text-sm font-medium">
              Valor estimado
            </label>
            <Input
              id="value"
              value={estimatedValue}
              onChange={(e) => setEstimatedValue(e.target.value)}
              placeholder="R$ 0,00"
              type="number"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Criar oportunidade</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
