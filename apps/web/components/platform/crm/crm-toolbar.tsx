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
import { getCrmResponsibleOptions, getCrmPriorityOptions } from "@/lib/crm-data"

interface CrmToolbarProps {
  responsibleFilter: string
  onResponsibleFilterChange: (value: string) => void
  priorityFilter: string
  onPriorityFilterChange: (value: string) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

export function CrmToolbar({
  responsibleFilter,
  onResponsibleFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  searchQuery,
  onSearchQueryChange,
}: CrmToolbarProps) {
  const responsibleOptions = getCrmResponsibleOptions()
  const priorityOptions = getCrmPriorityOptions()

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <Select value={responsibleFilter} onValueChange={onResponsibleFilterChange}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Todos os responsaveis" />
        </SelectTrigger>
        <SelectContent>
          {responsibleOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Todas as prioridades" />
        </SelectTrigger>
        <SelectContent>
          {priorityOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative flex-1">
        <SearchIcon
          data-icon="inline-start"
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Buscar por nome ou empresa"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  )
}
