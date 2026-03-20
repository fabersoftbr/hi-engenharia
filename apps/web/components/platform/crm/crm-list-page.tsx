"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"

import { DataTable } from "@workspace/ui/components/data-table"
import {
  CrmOpportunityRecord,
  getCrmOwnerById,
} from "@/lib/crm-data"
import { CrmStageBadge } from "./crm-stage-badge"
import { CrmPriorityBadge } from "./crm-priority-badge"

interface CrmListPageProps {
  opportunities: CrmOpportunityRecord[]
}

export function CrmListPage({ opportunities }: CrmListPageProps) {
  const router = useRouter()

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

  return (
    <DataTable
      columns={columns}
      data={opportunities}
      pageSize={10}
      onRowClick={handleRowClick}
    />
  )
}
