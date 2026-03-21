"use client"

import {
  getPriceRegionOptions,
  getPriceConsumptionBandOptions,
} from "@/lib/price-table-data"

interface PriceTableToolbarProps {
  regionFilter: string
  onRegionFilterChange: (value: string) => void
  consumptionBandFilter: string
  onConsumptionBandFilterChange: (value: string) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

export function PriceTableToolbar({
  regionFilter,
  onRegionFilterChange,
  consumptionBandFilter,
  onConsumptionBandFilterChange,
  searchQuery,
  onSearchQueryChange,
}: PriceTableToolbarProps) {
  const regionOptions = getPriceRegionOptions()
  const bandOptions = getPriceConsumptionBandOptions()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      {/* Region filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Regiao</label>
        <select
          value={regionFilter}
          onChange={(e) => onRegionFilterChange(e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
        >
          {regionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Consumption band filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Faixa de consumo</label>
        <select
          value={consumptionBandFilter}
          onChange={(e) => onConsumptionBandFilterChange(e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
        >
          {bandOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Buscar por codigo ou item..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm"
        />
      </div>
    </div>
  )
}
