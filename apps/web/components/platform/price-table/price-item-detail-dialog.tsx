"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Badge } from "@workspace/ui/components/badge"
import {
  getPriceItemById,
  formatPrice,
  PRICE_REGIONS,
  PRICE_CONSUMPTION_BANDS,
} from "@/lib/price-table-data"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"

interface PriceItemDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  itemId: string | null
}

export function PriceItemDetailDialog({
  isOpen,
  onClose,
  itemId,
}: PriceItemDetailDialogProps) {
  const isMobile = useIsMobile()
  const item = itemId ? getPriceItemById(itemId) : null

  if (!item) {
    return null
  }

  const content = (
    <div className="flex flex-col gap-6 py-4">
      {/* Item header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{item.code}</Badge>
          <span className="text-lg font-semibold">{item.item}</span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Descricao</h4>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>

      {/* Observations */}
      {item.observations && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Observacoes</h4>
          <p className="text-sm text-muted-foreground">{item.observations}</p>
        </div>
      )}

      {/* Pricing table */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Precos por regiao e faixa</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-2 text-left font-medium">Regiao</th>
                <th className="px-2 py-2 text-left font-medium">Faixa</th>
                <th className="px-2 py-2 text-right font-medium">
                  Valor unitario
                </th>
                <th className="px-2 py-2 text-left font-medium">Condicoes</th>
              </tr>
            </thead>
            <tbody>
              {item.pricing.map((pricing, index) => {
                const region = PRICE_REGIONS.find(
                  (r) => r.id === pricing.regionId
                )
                const band = PRICE_CONSUMPTION_BANDS.find(
                  (b) => b.id === pricing.consumptionBandId
                )
                return (
                  <tr key={index} className="border-b">
                    <td className="px-2 py-2">{region?.label}</td>
                    <td className="px-2 py-2">{band?.label}</td>
                    <td className="px-2 py-2 text-right font-mono">
                      {formatPrice(pricing.unitPrice)}
                    </td>
                    <td className="px-2 py-2 text-muted-foreground">
                      {pricing.conditions}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Detalhes do item</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do item</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">{content}</div>
      </DialogContent>
    </Dialog>
  )
}
