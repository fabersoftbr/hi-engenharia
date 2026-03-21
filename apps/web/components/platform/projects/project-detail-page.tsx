"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon, PencilIcon, Trash2Icon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
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
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { toast } from "sonner"
import type { ProjectRecord } from "@/lib/projects-data"
import { ProjectStatusBadge } from "./project-status-badge"
import { ProjectTypeBadge } from "./project-type-badge"

interface ProjectDetailPageProps {
  project: ProjectRecord
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const router = useRouter()

  const handleDelete = () => {
    toast.success("Projeto excluido")
    router.push("/projetos")
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/projetos">
            <ArrowLeftIcon data-icon="inline-start" />
            Voltar
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <div className="flex items-center gap-2">
          <ProjectTypeBadge type={project.type} />
          <ProjectStatusBadge status={project.status} />
        </div>
      </div>

      <Separator />

      {/* Project info */}
      <Card>
        <CardHeader>
          <CardTitle>Informacoes do projeto</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Cliente</p>
              <p className="font-medium">{project.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Localizacao</p>
              <p className="font-medium">{project.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Potencia</p>
              <p className="font-medium">{project.powerKwp} kWp</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Progresso</p>
              <p className="font-medium">{project.progressPercent}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de inicio</p>
              <p className="font-medium">
                {new Date(project.startDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Previsao de conclusao
              </p>
              <p className="font-medium">
                {new Date(project.plannedEndDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" asChild>
          <Link href={`/projetos/${project.id}/editar`}>
            <PencilIcon data-icon="inline-start" />
            Editar
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="bg-destructive/10 text-destructive hover:bg-destructive/20"
            >
              <Trash2Icon data-icon="inline-start" />
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir projeto</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este projeto? Esta acao nao pode
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
    </div>
  )
}
