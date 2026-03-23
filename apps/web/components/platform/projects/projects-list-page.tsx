"use client"

import { useState } from "react"
import Link from "next/link"
import {
  PlusIcon,
  FolderOpenIcon,
  FilterXIcon,
  LayoutGridIcon,
} from "lucide-react"
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
  getProjects,
  getProjectTypeOptions,
  getProjectStatusOptions,
  filterProjects,
  type ProjectFilterInput,
} from "@/lib/projects-data"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { TableSkeleton } from "@/components/platform/states/skeletons"
import { EmptyState } from "@/components/platform/states/empty-state"
import { WorksListPage } from "./works-list-page"

export function ProjectsListPage() {
  const isLoading = useSimulatedLoading()
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const typeOptions = getProjectTypeOptions()
  const statusOptions = getProjectStatusOptions()
  const allProjects = getProjects()

  const filterInput: ProjectFilterInput = {
    statusFilter,
    typeFilter,
    responsibleFilter: "all",
    searchQuery,
  }

  const filteredProjects = filterProjects(filterInput)

  const hasActiveFilters =
    statusFilter !== "all" || typeFilter !== "all" || searchQuery !== ""

  const handleClearFilters = () => {
    setStatusFilter("all")
    setTypeFilter("all")
    setSearchQuery("")
  }

  if (isLoading) {
    return <TableSkeleton rows={8} />
  }

  if (allProjects.length === 0) {
    return (
      <EmptyState
        icon={FolderOpenIcon}
        title="Nenhum projeto cadastrado"
        description="Crie um novo projeto para iniciar."
        action={
          <Button>
            <PlusIcon data-icon="inline-start" />
            Novo projeto
          </Button>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <Input
          placeholder="Buscar projetos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-64"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" asChild>
          <Link href="/obras">
            <LayoutGridIcon data-icon="inline-start" />
            Ver pipeline de obras
          </Link>
        </Button>
        <Button className="md:ml-auto">
          <PlusIcon data-icon="inline-start" />
          Novo projeto
        </Button>
      </div>

      {/* Project list or no-results */}
      {filteredProjects.length === 0 && hasActiveFilters ? (
        <EmptyState
          icon={FilterXIcon}
          title="Nenhum projeto encontrado"
          description="Tente ajustar os filtros para encontrar o que procura."
          action={
            <Button variant="outline" onClick={handleClearFilters}>
              <FilterXIcon data-icon="inline-start" />
              Limpar filtros
            </Button>
          }
        />
      ) : (
        <WorksListPage projects={filteredProjects} />
      )}
    </div>
  )
}
