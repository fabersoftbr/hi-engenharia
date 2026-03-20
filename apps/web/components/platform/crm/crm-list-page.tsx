"use client"

import { useMemo, useState } from "react"
import { ColumnDef, Row } from "@tanstack/react-table"
import { PlusIcon, FileSearchIcon, FilterXIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@workspace/ui/components/button"
import { DataTable } from "@workspace/ui/components/data-table"
import {
  CrmOpportunityRecord,
  getCrmOpportunities,
  filterCrmOpportunities,
  getCrmOwnerById,
} from "@/lib/crm-data"
import { CrmStageBadge } from "./crm-stage-badge"
import { CrmPriorityBadge } from "./crm-priority-badge"
import { CrmToolbar } from "./crm-toolbar"

export function CrmListPage() {
  const router = useRouter()
  const opportunities = useMemo(() => getCrmOpportunities(), [])

  const [responsibleFilter, setResponsibleFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOpportunities = useMemo(() => {
    return filterCrmOpportunities({
      responsibleFilter,
      priorityFilter,
      searchQuery,
    })
  }, [responsibleFilter, priorityFilter, searchQuery])

  const hasActiveFilters =
    responsibleFilter !== "all" || priorityFilter !== "all" || searchQuery !== ""

  const columns: ColumnDef<CrmOpportunityRecord>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.id}</span>
      ),
    },
    {
      accessorKey: "title",
      header: "Oportunidade",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.title}</span>
      ),
    },
    {
      accessorKey: "company",
      header: "Cliente/Empresa",
      cell: ({ row }) => (
        <span className="hidden md:table-cell">{row.original.company}</span>
      ),
    },
    {
      accessorKey: "stage",
      header: "Etapa",
      cell: ({ row }) => <CrmStageBadge stage={row.original.stage} />,
    },
    {
      accessorKey: "ownerId",
      header: "Responsavel",
      cell: ({ row }) => {
        const owner = getCrmOwnerById(row.original.ownerId)
        return (
          <span className="hidden lg:table-cell">
            {owner?.name ?? "-"}
          </span>
        )
      },
    },
    {
      accessorKey: "priority",
      header: "Prioridade",
      cell: ({ row }) => <CrmPriorityBadge priority={row.original.priority} />,
    },
    {
      accessorKey: "estimatedValue",
      header: "Valor",
      cell: ({ row }) => {
        const value = row.original.estimatedValue
        const formatted = value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
        return (
          <span className="hidden sm:table-cell">{formatted}</span>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Data de criacao",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt)
        return (
          <span className="hidden xl:table-cell">
            {date.toLocaleDateString("pt-BR")}
          </span>
        )
      },
    },
  ]

  const handleRowClick = (row: Row<CrmOpportunityRecord>) => {
    router.push(`/crm/${row.original.id}`)
  }

  const handleClearFilters = () => {
    setResponsibleFilter("all")
    setPriorityFilter("all")
    setSearchQuery("")
  }

  // Empty state for no opportunities at all
  if (opportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <FileSearchIcon className="size-12 text-muted-foreground/50" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Nenhuma oportunidade encontrada</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Ajuste os filtros ou crie uma nova oportunidade para alimentar o pipeline comercial.
          </p>
        </div>
        <Button asChild>
          <Link href="/crm/nova">
            <PlusIcon data-icon="inline-start" />
            Nova oportunidade
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
        <h1 className="text-2xl font-semibold">CRM</h1>
        <Button asChild>
          <Link href="/crm/nova">
            <PlusIcon data-icon="inline-start" />
            Nova oportunidade
          </Link>
        </Button>
      </div>

      <CrmToolbar
        responsibleFilter={responsibleFilter}
        onResponsibleFilterChange={setResponsibleFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      <DataTable
        columns={columns}
        data={filteredOpportunities}
        pageSize={10}
        onRowClick={handleRowClick}
        emptyState={hasActiveFilters ? EmptyFilteredState : undefined}
      />
    </div>
  )
}
