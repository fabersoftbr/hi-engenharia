"use client"

import Link from "next/link"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import type { Comunicado } from "@/lib/comunicacao-data"
import { ComunicacaoCategoryBadge } from "./comunicacao-category-badge"

interface ComunicacaoCardProps {
  comunicado: Comunicado
}

export function ComunicacaoCard({ comunicado }: ComunicacaoCardProps) {
  const formattedDate = new Date(comunicado.publishedAt).toLocaleDateString(
    "pt-BR"
  )

  return (
    <Link href={`/comunicacao/${comunicado.id}`} className="block">
      <Card
        className={cn(
          "cursor-pointer transition-shadow hover:shadow-md",
          comunicado.isDestaque && "border-l-4 border-l-primary bg-primary/5"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <ComunicacaoCategoryBadge category={comunicado.category} />
            {comunicado.isDestaque && <Badge variant="default">Destaque</Badge>}
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <h3 className="text-lg font-semibold">{comunicado.title}</h3>
          <p className="mt-2 line-clamp-2 text-muted-foreground">
            {comunicado.summary}
          </p>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Avatar size="sm">
              <AvatarFallback>{comunicado.author.initials}</AvatarFallback>
            </Avatar>
            <span>{comunicado.author.name}</span>
            <span className="mx-1">·</span>
            <span>{formattedDate}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
