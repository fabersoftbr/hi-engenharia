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
import { Button } from "@workspace/ui/components/button"
import { getBudgetRequestStatusOptions } from "@/lib/budget-requests-data"

interface BudgetRequestsToolbarProps {
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  showPendingOnly: boolean
  onShowPendingOnlyChange: (value: boolean) => void
}

export function BudgetRequestsToolbar({
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchQueryChange,
  showPendingOnly,
  onShowPendingOnlyChange,
}: BudgetRequestsToolbarProps) {
  const statusOptions = getBudgetRequestStatusOptions()

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Todos os status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          {statusOptions.map((option) => (
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
          placeholder="Buscar por cliente ou telefone"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Button
        variant={showPendingOnly ? "default" : "outline"}
        size="sm"
        onClick={() => onShowPendingOnlyChange(!showPendingOnly)}
        className="w-full md:w-auto"
      >
        Pendentes
      </Button>
    </div>
  )
}
