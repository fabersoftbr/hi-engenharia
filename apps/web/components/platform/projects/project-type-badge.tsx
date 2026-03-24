"use client"

import { Badge } from "@workspace/ui/components/badge"
import type { ProjectType } from "@/lib/projects-data"

const TYPE_META: Record<
  ProjectType,
  {
    label: string
    variant: "default" | "secondary" | "outline" | "destructive"
  }
> = {
  residencial: { label: "Residencial", variant: "secondary" },
  comercial: { label: "Comercial", variant: "default" },
  industrial: { label: "Industrial", variant: "outline" },
  rural: { label: "Rural", variant: "secondary" },
  condominio: { label: "Condomínio", variant: "default" },
}

interface ProjectTypeBadgeProps {
  type: ProjectType
}

export function ProjectTypeBadge({ type }: ProjectTypeBadgeProps) {
  const meta = TYPE_META[type]
  return <Badge variant={meta.variant}>{meta.label}</Badge>
}
