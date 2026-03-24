"use client"

import { PlusIcon, SearchIcon } from "lucide-react"

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
  getComunicadoCategoryOptions,
  getComunicadoPeriodOptions,
} from "@/lib/comunicacao-data"
import type { ComunicadoPeriod } from "@/lib/comunicacao-data"

interface ComunicacaoToolbarProps {
  categoryFilter: string
  onCategoryFilterChange: (value: string) => void
  periodFilter: ComunicadoPeriod
  onPeriodFilterChange: (value: ComunicadoPeriod) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onNewComunicado: () => void
}

export function ComunicacaoToolbar({
  categoryFilter,
  onCategoryFilterChange,
  periodFilter,
  onPeriodFilterChange,
  searchQuery,
  onSearchQueryChange,
  onNewComunicado,
}: ComunicacaoToolbarProps) {
  const categoryOptions = getComunicadoCategoryOptions()
  const periodOptions = getComunicadoPeriodOptions()

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <Button onClick={onNewComunicado} className="order-first md:order-last">
        <PlusIcon data-icon="inline-start" />
        Novo comunicado
      </Button>

      <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
        <SelectTrigger className="w-full md:w-44">
          <SelectValue placeholder="Todas as categorias" />
        </SelectTrigger>
        <SelectContent>
          {categoryOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={periodFilter}
        onValueChange={(v) => onPeriodFilterChange(v as ComunicadoPeriod)}
      >
        <SelectTrigger className="w-full md:w-36">
          <SelectValue placeholder="Qualquer periodo" />
        </SelectTrigger>
        <SelectContent>
          {periodOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative flex-1">
        <SearchIcon
          data-icon="inline-start"
          className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Buscar comunicados"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  )
}
