"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { ColumnDef, Row } from "@tanstack/react-table"

import { DataTable } from "@workspace/ui/components/data-table"

import { getProjectOwnerById, type ProjectRecord } from "@/lib/projects-data"
import { ProjectStatusBadge } from "./project-status-badge"
import { ProjectTypeBadge } from "./project-type-badge"

interface WorksListPageProps {
  projects: ProjectRecord[]
}

export function WorksListPage({ projects }: WorksListPageProps) {
  const router = useRouter()

  const columns: ColumnDef<ProjectRecord>[] = useMemo(
    () => [
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
          <span className="hidden md:table-cell">
            {row.original.clientName}
          </span>
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
        header: "",
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
    ],
    []
  )

  const handleRowClick = (row: Row<ProjectRecord>) => {
    router.push(`/projetos/${row.original.id}`)
  }

  return (
    <DataTable
      columns={columns}
      data={projects}
      pageSize={10}
      onRowClick={handleRowClick}
    />
  )
}
