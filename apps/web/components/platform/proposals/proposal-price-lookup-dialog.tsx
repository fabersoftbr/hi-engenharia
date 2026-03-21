"use client"

import { useState, useMemo } from "react"
import { SearchIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { DataTable } from "@workspace/ui/components/data-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { ColumnDef } from "@tanstack/react-table"
import {
  getPriceTableRows,
  getPriceRegionOptions,
  getPriceConsumptionBandOptions,
  formatPrice,
  type PriceTableRow,
} from "@/lib/price-table-data"

interface ProposalPriceLookupDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (itemCode: string, description: string, unitPrice: number) => void
}

export function ProposalPriceLookupDialog({
  isOpen,
  onClose,
  onSelect,
}: ProposalPriceLookupDialogProps) {
  const [regionFilter, setRegionFilter] = useState("all")
  const [consumptionBandFilter, setConsumptionBandFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const regionOptions = getPriceRegionOptions()
  const consumptionBandOptions = getPriceConsumptionBandOptions()

  const rows = useMemo(() => {
    const result = getPriceTableRows({
      regionId: regionFilter,
      consumptionBandId: consumptionBandFilter,
    })

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return result.filter(
        (row) =>
          row.code.toLowerCase().includes(query) ||
          row.item.toLowerCase().includes(query)
      )
    }

    return result
  }, [regionFilter, consumptionBandFilter, searchQuery])

  const columns: ColumnDef<PriceTableRow>[] = [
    {
      accessorKey: "code",
      header: "Codigo",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.code}</span>
      ),
    },
    {
      accessorKey: "item",
      header: "Item",
      cell: ({ row }) => (
        <span className="block max-w-[150px] truncate">
          {row.original.item}
        </span>
      ),
    },
    {
      accessorKey: "region",
      header: "Regiao",
    },
    {
      accessorKey: "consumptionBand",
      header: "Faixa",
    },
    {
      accessorKey: "unitPrice",
      header: "Valor unitario",
      cell: ({ row }) => (
        <span className="font-mono text-sm">
          {formatPrice(row.original.unitPrice)}
        </span>
      ),
    },
  ]

  const handleRowClick = (row: { original: PriceTableRow }) => {
    onSelect(row.original.code, row.original.item, row.original.unitPrice)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Consultar tabela de precos</DialogTitle>
          <DialogDescription>
            Selecione um item da tabela para adicionar a proposta
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Regiao" />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={consumptionBandFilter}
              onValueChange={setConsumptionBandFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Faixa de consumo" />
              </SelectTrigger>
              <SelectContent>
                {consumptionBandOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Data table */}
          <DataTable
            columns={columns}
            data={rows}
            pageSize={5}
            onRowClick={handleRowClick}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
