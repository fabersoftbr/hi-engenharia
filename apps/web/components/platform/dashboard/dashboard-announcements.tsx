"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { ChevronRightIcon } from "lucide-react"
import type { DashboardAnnouncement } from "@/lib/dashboard-data"

export interface DashboardAnnouncementsProps {
  items: DashboardAnnouncement[]
}

export function DashboardAnnouncements({ items }: DashboardAnnouncementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comunicados</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-1 border-b pb-3 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.title}</span>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {item.preview}
            </p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/comunicacao">
            Ver todos
            <ChevronRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
