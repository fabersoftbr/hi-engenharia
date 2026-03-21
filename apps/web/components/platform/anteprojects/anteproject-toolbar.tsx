"use client"

import { SearchIcon, AlertCircleIcon } from "lucide-react"

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
  getAnteprojectResponsibleOptions,
  getAnteprojectPriorityOptions,
} from "@/lib/anteprojects-data"

interface AnteprojectToolbarProps {
  responsibleFilter: string
  onResponsibleFilterChange: (value: string) => void
  priorityFilter: string
  onPriorityFilterChange: (value: string) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  showAwaitingOnly: boolean
  onShowAwaitingOnlyChange: (value: boolean) => void
}

export function AnteprojectToolbar({
  responsibleFilter,
  onResponsibleFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  searchQuery,
  onSearchQueryChange,
  showAwaitingOnly,
  onShowAwaitingOnlyChange,
}: AnteprojectToolbarProps) {
  const responsibleOptions = getAnteprojectResponsibleOptions()
  const priorityOptions = getAnteprojectPriorityOptions()

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Search field */}
      <div className="relative flex-1">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por cliente ou anteprojeto"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        {/* Responsible filter */}
        <Select
          value={responsibleFilter}
          onValueChange={onResponsibleFilterChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Responsavel" />
          </SelectTrigger>
          <SelectContent>
            {responsibleOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Priority filter */}
        <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            {priorityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Awaiting information toggle */}
        <Button
          variant={showAwaitingOnly ? "default" : "outline"}
          size="sm"
          onClick={() => onShowAwaitingOnlyChange(!showAwaitingOnly)}
          className="w-full sm:w-auto"
        >
          <AlertCircleIcon data-icon="inline-start" />
          Aguardando informacoes
        </Button>
      </div>
    </div>
  )
}
