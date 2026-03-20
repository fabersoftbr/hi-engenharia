"use client"

import { useMemo, useState } from "react"
import { ColumnDef, Row } from "@tanstack/react-table"
import { PlusIcon, FileSearchIcon, FilterXIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@workspace/ui/components/button"
import { DataTable } from "@workspace/ui/components/data-table"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  AnteprojectRecord,
  getAnteprojects,
  getAnteprojectOwnerById,
  filterAnteprojects,
} from "@/lib/anteprojects-data"
import { AnteprojectStageBadge } from "./anteproject-stage-badge"
import { AnteprojectPriorityBadge } from "./anteproject-priority-badge"
import { AnteprojectToolbar } from "./anteproject-toolbar"

export function AnteprojectListPage() {
  const router = useRouter()
  const anteprojects = useMemo(() => getAnteprojects(), [])

  // Default filter values
  const [responsibleFilter, setResponsibleFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAwaitingOnly, setShowAwaitingOnly] = useState(false)

  const filteredAnteprojects = useMemo(() => {
    return filterAnteprojects({
      anteprojects,
      responsibleFilter,
      priorityFilter,
      searchQuery,
      showAwaitingOnly,
    })
  }, [anteprojects, responsibleFilter, priorityFilter, searchQuery, showAwaitingOnly])

  const hasActiveFilters =
    responsibleFilter !== "all" ||
    priorityFilter !== "all" ||
    searchQuery !== "" ||
    showAwaitingOnly

  const columns: ColumnDef<AnteprojectRecord>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.id}</span>
      ),
    },
    {
      accessorKey: "title",
      header: "Anteprojeto",
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
      accessorKey: "stage",
      header: "Etapa",
      cell: ({ row }) => (
        <AnteprojectStageBadge stage={row.original.stage} />
      ),
    },
    {
      accessorKey: "isAwaitingInformation",
      header: "Aguardando informacoes",
      cell: ({ row }) => {
        if (!row.original.isAwaitingInformation) {
          return <span className="hidden lg:table-cell">-</span>
        }
        return (
          <span className="hidden lg:table-cell text-sm text-destructive">
            Sim
          </span>
        )
      },
    },
    {
      accessorKey: "ownerId",
      header: "Responsavel",
      cell: ({ row }) => {
        const owner = getAnteprojectOwnerById(row.original.ownerId)
        return (
          <div className="hidden sm:flex sm:items-center sm:gap-2">
            <Avatar className="size-6">
              <AvatarFallback className="text-xs">
                {owner?.initials ?? "??"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden lg:table-cell">{owner?.name ?? "-"}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "priority",
      header: "Prioridade",
      cell: ({ row }) => (
        <AnteprojectPriorityBadge priority={row.original.priority} />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Data",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt)
        return (
          <span className="hidden md:table-cell">
            {date.toLocaleDateString("pt-BR")}
          </span>
        )
      },
    },
  ]

  const handleRowClick = (row: Row<AnteprojectRecord>) => {
    router.push(`/anteprojetos/${row.original.id}`)
  }

  const handleClearFilters = () => {
    setResponsibleFilter("all")
    setPriorityFilter("all")
    setSearchQuery("")
    setShowAwaitingOnly(false)
  }

  // Empty state for no anteprojects at all
  if (anteprojects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <FileSearchIcon className="size-12 text-muted-foreground/50" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Nenhum anteprojeto encontrado</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Ajuste os filtros ou inicie um novo anteprojeto para comecar o fluxo.
          </p>
        </div>
        <Button asChild>
          <Link href="/anteprojetos/novo">
            <PlusIcon data-icon="inline-start" />
            Novo anteprojeto
          </Link>
        </Button>
      </div>
    )
  }

  // Empty state for filtered results
  const EmptyFilteredState = (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <FilterXIcon className="size-12 text-muted-foreground/50" />
      <div className="text-center">
        <h3 className="text-lg font-semibold">Nenhum resultado para sua busca</h3>
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AnteprojectToolbar
          responsibleFilter={responsibleFilter}
          onResponsibleFilterChange={setResponsibleFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          showAwaitingOnly={showAwaitingOnly}
          onShowAwaitingOnlyChange={setShowAwaitingOnly}
        />
        <Button asChild>
          <Link href="/anteprojetos/novo">
            <PlusIcon data-icon="inline-start" />
            Novo anteprojeto
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredAnteprojects}
        pageSize={10}
        onRowClick={handleRowClick}
        emptyState={hasActiveFilters ? EmptyFilteredState : undefined}
      />
    </div>
  )
}
