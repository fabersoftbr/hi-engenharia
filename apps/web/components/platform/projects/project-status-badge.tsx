"use client"

import { Badge } from "@workspace/ui/components/badge"
import type { ProjectStatus } from "@/lib/projects-data"

const STATUS_META: Record<
  ProjectStatus,
  {
    label: string
    variant: "default" | "secondary" | "outline" | "destructive"
  }
> = {
  contrato: { label: "Contrato", variant: "secondary" },
  "em-andamento": { label: "Em andamento", variant: "default" },
  concluido: { label: "Concluido", variant: "outline" },
  pausado: { label: "Pausado", variant: "secondary" },
  cancelado: { label: "Cancelado", variant: "destructive" },
}

interface ProjectStatusBadgeProps {
  status: ProjectStatus
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const meta = STATUS_META[status]
  return <Badge variant={meta.variant}>{meta.label}</Badge>
}
