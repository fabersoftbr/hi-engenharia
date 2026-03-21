"use client"

import { SearchIcon } from "lucide-react"

import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
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
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      {/* Region filter */}
      <Select value={regionFilter} onValueChange={onRegionFilterChange}>
        <SelectTrigger className="w-full md:w-40">
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

      {/* Consumption band filter */}
      <Select
        value={consumptionBandFilter}
        onValueChange={onConsumptionBandFilterChange}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Faixa de consumo" />
        </SelectTrigger>
        <SelectContent>
          {bandOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search */}
      <div className="relative flex-1">
        <SearchIcon
          data-icon="inline-start"
          className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Buscar por codigo ou item..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  )
}
