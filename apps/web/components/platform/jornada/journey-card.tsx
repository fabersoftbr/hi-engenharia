"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { ChevronRightIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface JourneyCardProps {
  id: string
  label: string
  route: string
  icon: LucideIcon
  activeCount: number
  isLast?: boolean
}

export function JourneyCard({
  id,
  label,
  route,
  icon: Icon,
  activeCount,
  isLast = false,
}: JourneyCardProps) {
  return (
    <div className="flex items-center gap-4">
      <Card className="w-full min-w-[200px] flex-1 basis-0">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Icon className="size-5 text-muted-foreground" />
            <CardTitle className="text-lg">{label}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-2xl font-semibold">
            {activeCount} {activeCount === 1 ? "item ativo" : "itens ativos"}
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" asChild>
            <Link href={route}>
              Ver detalhes
              <ChevronRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      {!isLast && (
        <div className="hidden shrink-0 text-muted-foreground md:block">
          <ChevronRightIcon className="size-6" />
        </div>
      )}
    </div>
  )
}
