"use client"

import { Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"

import { DataTable } from "@workspace/ui/components/data-table"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  AnteprojectRecord,
  getAnteprojectOwnerById,
} from "@/lib/anteprojects-data"
import { AnteprojectStageBadge } from "./anteproject-stage-badge"
import { AnteprojectPriorityBadge } from "./anteproject-priority-badge"

interface AnteprojectListPageProps {
  anteprojects: AnteprojectRecord[]
}

export function AnteprojectListPage({
  anteprojects,
}: AnteprojectListPageProps) {
  const router = useRouter()

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }: { row: Row<AnteprojectRecord> }) => (
        <span className="font-mono text-xs">{row.original.id}</span>
      ),
    },
    {
      accessorKey: "title",
      header: "Anteprojeto",
      cell: ({ row }: { row: Row<AnteprojectRecord> }) => (
        <span className="font-medium">{row.original.title}</span>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Cliente",
      cell: ({ row }: { row: Row<AnteprojectRecord> }) => (
        <span className="hidden md:table-cell">{row.original.clientName}</span>
      ),
    },
    {
      accessorKey: "stage",
      header: "Etapa",
      cell: ({ row }: { row: Row<AnteprojectRecord> }) => (
        <AnteprojectStageBadge stage={row.original.stage} />
      ),
    },
    {
      accessorKey: "isAwaitingInformation",
      header: "Aguardando informacoes",
      cell: ({ row }: { row: Row<AnteprojectRecord> }) => {
        if (!row.original.isAwaitingInformation) {
          return <span className="hidden lg:table-cell">-</span>
        }
        return (
          <span className="hidden text-sm text-destructive lg:table-cell">
            Sim
          </span>
        )
      },
    },
    {
      accessorKey: "ownerId",
      header: "Responsavel",
      cell: ({ row }: { row: Row<AnteprojectRecord> }) => {
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
      cell: ({ row }: { row: Row<AnteprojectRecord> }) => (
        <AnteprojectPriorityBadge priority={row.original.priority} />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Data",
      cell: ({ row }: { row: Row<AnteprojectRecord> }) => {
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

  return (
    <DataTable
      columns={columns}
      data={anteprojects}
      pageSize={10}
      onRowClick={handleRowClick}
    />
  )
}
