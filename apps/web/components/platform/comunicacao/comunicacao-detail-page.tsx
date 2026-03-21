"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon, PencilIcon, Trash2Icon } from "lucide-react"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import type { Comunicado } from "@/lib/comunicacao-data"
import { ComunicacaoCategoryBadge } from "./comunicacao-category-badge"
import { showSuccessToast } from "@/lib/toast-helpers"

interface ComunicacaoDetailPageProps {
  comunicado: Comunicado
}

export function ComunicacaoDetailPage({
  comunicado,
}: ComunicacaoDetailPageProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)

  const formattedDate = new Date(comunicado.publishedAt).toLocaleDateString(
    "pt-BR"
  )

  const handleDelete = () => {
    setIsDeleteDialogOpen(false)
    showSuccessToast("Comunicado excluido")
    router.push("/comunicacao")
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      {/* Back link */}
      <Button variant="ghost" asChild className="w-fit">
        <Link href="/comunicacao">
          <ArrowLeftIcon data-icon="inline-start" />
          Voltar
        </Link>
      </Button>

      {/* Header section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{comunicado.title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <ComunicacaoCategoryBadge category={comunicado.category} />
          {comunicado.isDestaque && <Badge variant="default">Destaque</Badge>}
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar size="sm">
            <AvatarFallback>{comunicado.author.initials}</AvatarFallback>
          </Avatar>
          <span>{comunicado.author.name}</span>
        </div>
      </div>

      <Separator />

      {/* Content section */}
      <div className="text-base leading-relaxed whitespace-pre-wrap">
        {comunicado.content}
      </div>

      <Separator />

      {/* Actions section */}
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href={`/comunicacao/${comunicado.id}/editar`}>
            <PencilIcon data-icon="inline-start" />
            Editar
          </Link>
        </Button>
        <Button
          variant="destructive"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2Icon data-icon="inline-start" />
          Excluir
        </Button>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir comunicado</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este comunicado? Esta acao nao pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
