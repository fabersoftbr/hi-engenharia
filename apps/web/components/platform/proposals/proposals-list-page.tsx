"use client"

import { useState } from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { PlusIcon } from "lucide-react"
import { DataTable } from "@workspace/ui/components/data-table"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {
  getProposals,
  filterProposals,
  calculateProposalTotal,
  formatCurrency,
  PROPOSAL_STATUS_META,
  type ProposalRecord,
  type ProposalFilterInput,
} from "@/lib/proposals-data"
import { ProposalsToolbar } from "./proposals-toolbar"

const columns: ColumnDef<ProposalRecord>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.original.id}</span>
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
    accessorKey: "title",
    header: "Titulo",
    cell: ({ row }) => (
      <span className="block max-w-[200px] truncate">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      const meta = PROPOSAL_STATUS_META[status]
      return <Badge variant={meta.variant}>{meta.label}</Badge>
    },
  },
  {
    accessorKey: "totalValue",
    header: "Valor",
    cell: ({ row }) => {
      const total = calculateProposalTotal(row.original.items)
      return <span className="font-mono text-sm">{formatCurrency(total)}</span>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data de criacao",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString("pt-BR")}
        </span>
      )
    },
  },
]

export function ProposalsListPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filterInput: ProposalFilterInput = {
    statusFilter,
    searchQuery,
  }

  const filteredProposals = filterProposals(filterInput)
  const allProposals = getProposals()

  const handleRowClick = (row: { original: ProposalRecord }) => {
    // Navigate to proposal detail page
    window.location.href = `/propostas/${row.original.id}`
  }

  const emptyState = (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-muted-foreground">Nenhuma proposta encontrada</p>
      <Button asChild className="mt-4">
        <Link href="/propostas/nova">Nova proposta</Link>
      </Button>
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Propostas</h1>
          <p className="text-sm text-muted-foreground">
            {allProposals.length} propostas cadastradas
          </p>
        </div>
        <Button asChild>
          <Link href="/propostas/nova">
            <PlusIcon className="size-4" />
            Nova proposta
          </Link>
        </Button>
      </div>

      {/* Toolbar */}
      <ProposalsToolbar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      {/* Data table */}
      <DataTable
        columns={columns}
        data={filteredProposals}
        emptyState={emptyState}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
