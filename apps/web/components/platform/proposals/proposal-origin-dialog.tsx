"use client"

import { Building2Icon, UserIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import type { ProposalOriginType } from "@/lib/proposals-data"

interface ProposalOriginDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (originType: ProposalOriginType) => void
}

const originOptions: Array<{
  type: ProposalOriginType
  label: string
  description: string
  icon: typeof UserIcon
}> = [
  {
    type: "cliente",
    label: "Cliente",
    description: "Criar uma nova proposta do zero para um cliente",
    icon: UserIcon,
  },
  {
    type: "oportunidade",
    label: "Oportunidade",
    description: "Importar dados de uma oportunidade do CRM",
    icon: Building2Icon,
  },
]

export function ProposalOriginDialog({
  isOpen,
  onClose,
  onSelect,
}: ProposalOriginDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selecionar origem da proposta</DialogTitle>
          <DialogDescription>
            Escolha a origem da proposta para preencher os dados iniciais
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          {originOptions.map((option) => {
            const Icon = option.icon
            return (
              <Button
                key={option.type}
                variant="outline"
                className="h-auto flex-col items-start gap-1 py-4"
                onClick={() => {
                  onSelect(option.type)
                  onClose()
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-4" />
                  <span className="font-medium">{option.label}</span>
                </div>
                <span className="text-left text-sm font-normal text-muted-foreground">
                  {option.description}
                </span>
              </Button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
