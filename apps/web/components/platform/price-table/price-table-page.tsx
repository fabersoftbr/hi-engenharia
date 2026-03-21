"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { TableIcon, FilterXIcon } from "lucide-react"
import { DataTable } from "@workspace/ui/components/data-table"
import { Button } from "@workspace/ui/components/button"
import {
  getPriceTableRows,
  formatPrice,
  type PriceTableRow,
  type PriceTableFilterInput,
} from "@/lib/price-table-data"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { TableSkeleton } from "@/components/platform/states/skeletons"
import { EmptyState } from "@/components/platform/states/empty-state"
import { PriceTableToolbar } from "./price-table-toolbar"
import { PriceItemDetailDialog } from "./price-item-detail-dialog"

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
      <span className="block max-w-[200px] truncate">{row.original.item}</span>
    ),
  },
  {
    accessorKey: "region",
    header: "Regiao",
    cell: ({ row }) => <span>{row.original.region}</span>,
  },
  {
    accessorKey: "consumptionBand",
    header: "Faixa",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.consumptionBand}</span>
    ),
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
  {
    accessorKey: "conditions",
    header: "Condicoes",
    cell: ({ row }) => (
      <span className="block max-w-[150px] truncate text-sm text-muted-foreground">
        {row.original.conditions}
      </span>
    ),
  },
]

export function PriceTablePage() {
  const isLoading = useSimulatedLoading()
  const [regionFilter, setRegionFilter] = useState("all")
  const [consumptionBandFilter, setConsumptionBandFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  const filterInput: PriceTableFilterInput = {
    regionId: regionFilter,
    consumptionBandId: consumptionBandFilter,
  }

  const rows = getPriceTableRows(filterInput)

  // Apply search filter
  const filteredRows = searchQuery
    ? rows.filter(
        (row) =>
          row.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : rows

  const hasActiveFilters =
    regionFilter !== "all" ||
    consumptionBandFilter !== "all" ||
    searchQuery !== ""

  const handleRowClick = (row: { original: PriceTableRow }) => {
    setSelectedItemId(row.original.itemId)
    setShowDetailDialog(true)
  }

  const handleClearFilters = () => {
    setRegionFilter("all")
    setConsumptionBandFilter("all")
    setSearchQuery("")
  }

  const noResultsState = (
    <EmptyState
      icon={FilterXIcon}
      title="Nenhum item encontrado"
      description="Tente ajustar os filtros para encontrar o que procura."
      action={
        <Button variant="outline" onClick={handleClearFilters}>
          <FilterXIcon data-icon="inline-start" />
          Limpar filtros
        </Button>
      }
    />
  )

  const emptyState = (
    <EmptyState
      icon={TableIcon}
      title="Nenhum item na tabela de precos"
      description="Envie uma tabela de precos para comecar."
      action={
        <Button variant="secondary" asChild>
          <Link href="/tabela-de-precos/upload">Enviar tabela</Link>
        </Button>
      }
    />
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Tabela de precos</h1>
          <p className="text-sm text-muted-foreground">
            Consulte os precos por regiao e faixa de consumo
          </p>
        </div>
        <Button variant="secondary" asChild>
          <Link href="/tabela-de-precos/upload">Enviar tabela</Link>
        </Button>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <TableSkeleton rows={8} />
      ) : (
        <>
          {/* Toolbar */}
          <PriceTableToolbar
            regionFilter={regionFilter}
            onRegionFilterChange={setRegionFilter}
            consumptionBandFilter={consumptionBandFilter}
            onConsumptionBandFilterChange={setConsumptionBandFilter}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />

          {/* Data table */}
          <DataTable
            columns={columns}
            data={filteredRows}
            emptyState={
              hasActiveFilters
                ? noResultsState
                : rows.length === 0
                  ? emptyState
                  : undefined
            }
            onRowClick={handleRowClick}
          />
        </>
      )}

      {/* Detail dialog */}
      <PriceItemDetailDialog
        isOpen={showDetailDialog}
        onClose={() => setShowDetailDialog(false)}
        itemId={selectedItemId}
      />
    </div>
  )
}
