"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export default function PlatformError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  void error

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="size-8 text-destructive" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Erro ao carregar a página</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Ocorreu um problema ao carregar esta página. Tente novamente ou
          retorne ao portal.
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>Tentar novamente</Button>
        <Button variant="outline" asChild>
          <Link href="/portal">Voltar ao portal</Link>
        </Button>
      </div>
    </div>
  )
}
