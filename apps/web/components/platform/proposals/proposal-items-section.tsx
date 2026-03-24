"use client"

import { useState } from "react"
import type { Control, UseFormRegister } from "react-hook-form"
import { useWatch } from "react-hook-form"
import { PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import type { ProposalFormValues } from "@/lib/proposal-form"
import { formatCurrency } from "@/lib/proposals-data"
import { ProposalPriceLookupDialog } from "./proposal-price-lookup-dialog"

interface ProposalItemsSectionProps {
  itemFields: Array<{ id: string }>
  control: Control<ProposalFormValues>
  register: UseFormRegister<ProposalFormValues>
  onAddItem: () => void
  onRemoveItem: (index: number) => void
  onUpdateItemTotal: (
    index: number,
    quantity: number,
    unitPrice: number
  ) => void
  onPriceSelect: (
    itemIndex: number,
    itemCode: string,
    description: string,
    unitPrice: number
  ) => void
}

export function ProposalItemsSection({
  itemFields,
  control,
  register,
  onAddItem,
  onRemoveItem,
  onUpdateItemTotal,
  onPriceSelect,
}: ProposalItemsSectionProps) {
  const [priceLookupOpen, setPriceLookupOpen] = useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null)
  const watchedItems = useWatch({ control, name: "items" }) ?? []

  const handlePriceSelect = (
    itemCode: string,
    description: string,
    unitPrice: number
  ) => {
    if (activeItemIndex !== null) {
      onPriceSelect(activeItemIndex, itemCode, description, unitPrice)
      setPriceLookupOpen(false)
      setActiveItemIndex(null)
    }
  }

  const openPriceLookup = (index: number) => {
    setActiveItemIndex(index)
    setPriceLookupOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Itens da proposta</h2>
        <Button type="button" variant="outline" size="sm" onClick={onAddItem}>
          <PlusIcon className="size-4" />
          Adicionar item
        </Button>
      </div>

      {itemFields.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum item adicionado ainda
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={onAddItem}
          >
            <PlusIcon className="size-4" />
            Adicionar primeiro item
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {itemFields.map((field, index) => {
            const item = watchedItems[index]
            const quantity = item?.quantity || 0
            const unitPrice = item?.unitPrice || 0
            const totalPrice = item?.totalPrice || 0

            return (
              <div
                key={field.id}
                className="flex flex-col gap-3 rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Item {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(index)}
                  >
                    <Trash2Icon className="size-4 text-destructive" />
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Codigo do item</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ex: MOD-550W"
                        className="flex-1"
                        {...register(`items.${index}.itemCode`)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => openPriceLookup(index)}
                        title="Consultar tabela"
                      >
                        <SearchIcon className="size-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Input
                      placeholder="Descrição do item"
                      {...register(`items.${index}.description`)}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Quantidade</Label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="1"
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                        onChange: (e) => {
                          const qty = Number(e.target.value) || 0
                          onUpdateItemTotal(index, qty, unitPrice)
                        },
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label></Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0,00"
                      {...register(`items.${index}.unitPrice`, {
                        valueAsNumber: true,
                        onChange: (e) => {
                          const price = Number(e.target.value) || 0
                          onUpdateItemTotal(index, quantity, price)
                        },
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Total</Label>
                    <div className="flex h-9 items-center rounded-md border bg-muted/50 px-3">
                      <span className="font-mono text-sm">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Consultar tabela button */}
      {itemFields.length > 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={() => openPriceLookup(0)}
          className="self-start"
        >
          <SearchIcon className="size-4" />
          Consultar tabela
        </Button>
      )}

      <ProposalPriceLookupDialog
        isOpen={priceLookupOpen}
        onClose={() => {
          setPriceLookupOpen(false)
          setActiveItemIndex(null)
        }}
        onSelect={handlePriceSelect}
      />
    </div>
  )
}
