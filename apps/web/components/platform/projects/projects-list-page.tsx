"use client"

import { useMemo, useState } from "react"
import { ColumnDef, Row } from "@tanstack/react-table"
import { FileSearchIcon, FilterXIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@workspace/ui/components/button"
import { DataTable } from "@workspace/ui/components/data-table"

import {
  filterProjects,
  getProjectOwnerById,
  getProjects,
  type ProjectRecord,
} from "@/lib/projects-data"
import { ProjectStatusBadge } from "./project-status-badge"
import { ProjectTypeBadge } from "./project-type-badge"
import { ProjectsToolbar } from "./projects-toolbar"

export function ProjectsListPage() {
  const router = useRouter()
  const projects = useMemo(() => getProjects(), [])

  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [responsibleFilter, setResponsibleFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = useMemo(() => {
    return filterProjects({
      projects,
      typeFilter,
      statusFilter,
      responsibleFilter,
      searchQuery,
    })
  }, [projects, typeFilter, statusFilter, responsibleFilter, searchQuery])

  const hasActiveFilters =
    typeFilter !== "all" ||
    statusFilter !== "all" ||
    responsibleFilter !== "all" ||
    searchQuery !== ""

  const columns: ColumnDef<ProjectRecord>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.id}</span>
      ),
    },
    {
      accessorKey: "title",
      header: "Projeto",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.title}</span>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Cliente",
      cell: ({ row }) => (
        <span className="hidden md:table-cell">{row.original.clientName}</span>
      ),
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <span className="hidden lg:table-cell">
          <ProjectTypeBadge type={row.original.type} />
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <ProjectStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "ownerId",
      header: "Responsavel",
      cell: ({ row }) => {
        const owner = getProjectOwnerById(row.original.ownerId)
        return (
          <span className="hidden sm:table-cell">
            {owner?.name ?? "Desconhecido"}
          </span>
        )
      },
    },
    {
      accessorKey: "powerKwp",
      header: "Potencia (kWp)",
      cell: ({ row }) => (
        <span className="hidden xl:table-cell">{row.original.powerKwp}</span>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Data de inicio",
      cell: ({ row }) => {
        const date = new Date(row.original.startDate)
        return (
          <span className="hidden lg:table-cell">
            {date.toLocaleDateString("pt-BR")}
          </span>
        )
      },
    },
  ]

  const handleRowClick = (row: Row<ProjectRecord>) => {
    router.push(`/projetos/${row.original.id}`)
  }

  const handleClearFilters = () => {
    setTypeFilter("all")
    setStatusFilter("all")
    setResponsibleFilter("all")
    setSearchQuery("")
  }

  // Empty state for no projects at all
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <FileSearchIcon className="size-12 text-muted-foreground/50" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Nenhum projeto encontrado</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Crie um novo projeto para iniciar o acompanhamento de obras.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/projetos/novo">
              <PlusIcon data-icon="inline-start" />
              Novo projeto
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/obras">Ver pipeline de obras</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Empty state for filtered results
  const EmptyFilteredState = (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <FilterXIcon className="size-12 text-muted-foreground/50" />
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          Nenhum resultado para sua busca
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Tente ajustar os filtros para encontrar o que procura.
        </p>
      </div>
      <Button variant="outline" onClick={handleClearFilters}>
        <FilterXIcon data-icon="inline-start" />
        Limpar filtros
      </Button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Projetos</h1>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/obras">Ver pipeline de obras</Link>
            </Button>
            <Button asChild>
              <Link href="/projetos/novo">
                <PlusIcon data-icon="inline-start" />
                Novo projeto
              </Link>
            </Button>
          </div>
        </div>

        <ProjectsToolbar
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          responsibleFilter={responsibleFilter}
          onResponsibleFilterChange={setResponsibleFilter}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredProjects}
        pageSize={10}
        onRowClick={handleRowClick}
        emptyState={hasActiveFilters ? EmptyFilteredState : undefined}
      />
    </div>
  )
}
