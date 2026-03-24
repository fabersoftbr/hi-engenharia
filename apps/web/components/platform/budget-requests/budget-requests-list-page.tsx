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
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { TableSkeleton } from "@/components/platform/states/skeletons"
import { EmptyState } from "@/components/platform/states/empty-state"
import { BudgetRequestStatusBadge } from "./budget-request-status-badge"
import { BudgetRequestsToolbar } from "./budget-requests-toolbar"

const PENDING_STATUSES: BudgetRequestStatus[] = ["novo", "em-analise"]

export function BudgetRequestsListPage() {
  const router = useRouter()
  const isLoading = useSimulatedLoading()
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

  // Loading state
  if (isLoading) {
    return <TableSkeleton rows={8} />
  }

  // Empty state for no requests at all
  if (requests.length === 0) {
    return (
      <EmptyState
        icon={FileSearchIcon}
        title="Nenhuma solicitacao encontrada"
        description="Ajuste os filtros ou crie uma nova solicitacao para iniciar o fluxo comercial."
        action={
          <Button asChild>
            <Link href="/orcamentos/nova">
              <PlusIcon data-icon="inline-start" />
              Nova solicitacao
            </Link>
          </Button>
        }
      />
    )
  }

  // No-results state for filtered results
  const noResultsState = (
    <EmptyState
      icon={FilterXIcon}
      title="Nenhuma solicitacao encontrada"
      description="Tente ajustar os filtros para encontrar o que procura."
      action={
        <Button variant="outline" onClick={handleClearFilters}>
          <FilterXIcon data-icon="inline-start" />
          Limpar filtros
        </Button>
      }
    />
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
        emptyState={hasActiveFilters ? noResultsState : undefined}
      />
    </div>
  )
}
