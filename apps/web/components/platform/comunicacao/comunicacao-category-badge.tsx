"use client"

import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import {
  type ComunicadoCategory,
  COMUNICADO_CATEGORY_META,
} from "@/lib/comunicacao-data"

interface ComunicacaoCategoryBadgeProps {
  category: ComunicadoCategory
}

export function ComunicacaoCategoryBadge({
  category,
}: ComunicacaoCategoryBadgeProps) {
  const meta = COMUNICADO_CATEGORY_META[category]

  return (
    <Badge variant={meta.variant} className={cn(meta.className)}>
      {meta.label}
    </Badge>
  )
}
