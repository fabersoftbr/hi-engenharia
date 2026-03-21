"use client"

import { useMemo, useState } from "react"
import { ColumnDef, Row } from "@tanstack/react-table"
import { PlusIcon, FileSearchIcon, FilterXIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@workspace/ui/components/button"
import { DataTable } from "@workspace/ui/components/data-table"
import {
  BudgetRequestRecord,
  BudgetRequestStatus,
  getBudgetRequests,
} from "@/lib/budget-requests-data"
import { BudgetRequestStatusBadge } from "./budget-request-status-badge"
import { BudgetRequestsToolbar } from "./budget-requests-toolbar"

const PENDING_STATUSES: BudgetRequestStatus[] = ["novo", "em-analise"]

export function BudgetRequestsListPage() {
  const router = useRouter()
  const requests = useMemo(() => getBudgetRequests(), [])

  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPendingOnly, setShowPendingOnly] = useState(false)

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // Status filter
      if (statusFilter !== "all" && req.status !== statusFilter) {
        return false
      }

      // Pending filter
      if (showPendingOnly && !PENDING_STATUSES.includes(req.status)) {
        return false
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesClient = req.clientName.toLowerCase().includes(query)
        const matchesPhone = req.phone.toLowerCase().includes(query)
        if (!matchesClient && !matchesPhone) {
          return false
        }
      }

      return true
    })
  }, [requests, statusFilter, searchQuery, showPendingOnly])

  const hasActiveFilters =
    statusFilter !== "all" || searchQuery !== "" || showPendingOnly

  const columns: ColumnDef<BudgetRequestRecord>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.id}</span>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Cliente",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.clientName}</span>
      ),
    },
    {
      accessorKey: "phone",
      header: "Telefone",
      cell: ({ row }) => (
        <span className="hidden md:table-cell">{row.original.phone}</span>
      ),
    },
    {
      accessorKey: "city",
      header: "Cidade",
      cell: ({ row }) => (
        <span className="hidden lg:table-cell">{row.original.city}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <BudgetRequestStatusBadge status={row.original.status} />
      ),
    },
    {
      accessorKey: "requestedAt",
      header: "Data",
      cell: ({ row }) => {
        const date = new Date(row.original.requestedAt)
        return (
          <span className="hidden sm:table-cell">
            {date.toLocaleDateString("pt-BR")}
          </span>
        )
      },
    },
  ]

  const handleRowClick = (row: Row<BudgetRequestRecord>) => {
    router.push(`/orcamentos/${row.original.id}`)
  }

  const handleClearFilters = () => {
    setStatusFilter("all")
    setSearchQuery("")
    setShowPendingOnly(false)
  }

  // Empty state for no requests at all
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <FileSearchIcon className="size-12 text-muted-foreground/50" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            Nenhuma solicitacao encontrada
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Ajuste os filtros ou crie uma nova solicitacao para iniciar o fluxo
            comercial.
          </p>
        </div>
        <Button asChild>
          <Link href="/orcamentos/nova">
            <PlusIcon data-icon="inline-start" />
            Nova solicitacao
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BudgetRequestsToolbar
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          showPendingOnly={showPendingOnly}
          onShowPendingOnlyChange={setShowPendingOnly}
        />
        <Button asChild>
          <Link href="/orcamentos/nova">
            <PlusIcon data-icon="inline-start" />
            Nova solicitacao
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredRequests}
        pageSize={10}
        onRowClick={handleRowClick}
        emptyState={hasActiveFilters ? EmptyFilteredState : undefined}
      />
    </div>
  )
}
