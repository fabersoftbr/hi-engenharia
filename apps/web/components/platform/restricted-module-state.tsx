"use client"

import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { LockIcon } from "lucide-react"
import { PROFILE_LABELS, type ProfileKey } from "@/lib/platform-config"

interface RestrictedModuleStateProps {
  moduleName: string
  activeProfile: ProfileKey
}

export function RestrictedModuleState({
  moduleName,
  activeProfile,
}: RestrictedModuleStateProps) {
  const profileLabel = PROFILE_LABELS[activeProfile]

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <LockIcon className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl">Acesso restrito</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            O perfil <strong>{profileLabel}</strong> nao possui acesso ao modulo{" "}
            <strong>{moduleName}</strong>.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Selecione outro perfil no menu do cabecalho ou retorne ao portal.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/portal">Voltar ao Portal</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
