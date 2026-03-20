"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
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
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum comunicado para hoje.
          </p>
        ) : (
          items.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {item.preview}
                </p>
              </div>
              {index < items.length - 1 && <Separator />}
            </React.Fragment>
          ))
        )}
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
