"use client"

import { PlusIcon, SearchIcon } from "lucide-react"
import Link from "next/link"

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
  getProjectTypeOptions,
  getProjectStatusOptions,
  getProjectResponsibleOptions,
} from "@/lib/projects-data"

interface ProjectsToolbarProps {
  typeFilter: string
  onTypeFilterChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  responsibleFilter: string
  onResponsibleFilterChange: (value: string) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

export function ProjectsToolbar({
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  responsibleFilter,
  onResponsibleFilterChange,
  searchQuery,
  onSearchQueryChange,
}: ProjectsToolbarProps) {
  const typeOptions = getProjectTypeOptions()
  const statusOptions = getProjectStatusOptions()
  const responsibleOptions = getProjectResponsibleOptions()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={typeFilter} onValueChange={onTypeFilterChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={responsibleFilter}
        onValueChange={onResponsibleFilterChange}
      >
        <SelectTrigger className="w-44">
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

      <div className="relative min-w-48 flex-1">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou cliente"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Button asChild>
        <Link href="/projetos/novo">
          <PlusIcon data-icon="inline-start" />
          Novo projeto
        </Link>
      </Button>
    </div>
  )
}
