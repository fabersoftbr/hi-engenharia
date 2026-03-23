"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeftIcon, PlusIcon, PencilIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  type ProjectRecord,
  type ProjectMilestone,
  getProjectOwnerById,
} from "@/lib/projects-data"
import { ProjectMilestoneTimeline } from "./project-milestone-timeline"
import { ProjectGanttSchedule } from "./project-gantt-schedule"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { DetailSkeleton } from "@/components/platform/states/skeletons"

interface ProjectWorkTrackerPageProps {
  project: ProjectRecord
}

const MILESTONE_STATUS_META: Record<
  ProjectMilestone["status"],
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  concluido: { label: "Concluido", variant: "default" },
  "em-andamento": { label: "Em andamento", variant: "secondary" },
  pendente: { label: "Pendente", variant: "outline" },
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function ProjectWorkTrackerPage({
  project: initialProject,
}: ProjectWorkTrackerPageProps) {
  const isMobile = useIsMobile()
  const isLoading = useSimulatedLoading()
  const [project, setProject] = React.useState<ProjectRecord>(initialProject)
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [editingMilestone, setEditingMilestone] =
    React.useState<ProjectMilestone | null>(null)
  const [formData, setFormData] = React.useState<Partial<ProjectMilestone>>({
    name: "",
    startDate: "",
    endDate: "",
    status: "pendente",
    responsibleId: "",
    notes: "",
  })

  const owner = getProjectOwnerById(project.ownerId)

  if (isLoading) {
    return <DetailSkeleton />
  }

  const sortedMilestones = React.useMemo(
    () =>
      [...project.milestones].sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      ),
    [project.milestones]
  )

  const upcomingMilestones = React.useMemo(
    () => sortedMilestones.filter((m) => m.status === "pendente").slice(0, 3),
    [sortedMilestones]
  )

  const handleOpenAddDialog = () => {
    setEditingMilestone(null)
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      status: "pendente",
      responsibleId: owner?.id ?? "",
      notes: "",
    })
    setIsAddDialogOpen(true)
  }

  const handleOpenEditDialog = (milestone: ProjectMilestone) => {
    setEditingMilestone(milestone)
    setFormData({
      name: milestone.name,
      startDate: milestone.startDate,
      endDate: milestone.endDate,
      status: milestone.status,
      responsibleId: milestone.responsibleId,
      notes: milestone.notes ?? "",
    })
    setIsAddDialogOpen(true)
  }

  const handleSaveMilestone = () => {
    if (!formData.name || formData.name.trim() === "") return

    if (editingMilestone) {
      setProject((prev) => ({
        ...prev,
        milestones: prev.milestones.map((m) =>
          m.id === editingMilestone.id
            ? {
                ...m,
                name: formData.name!,
                startDate: formData.startDate!,
                endDate: formData.endDate!,
                status: formData.status as ProjectMilestone["status"],
                responsibleId: formData.responsibleId!,
                notes: formData.notes,
              }
            : m
        ),
      }))
    } else {
      setProject((prev) => ({
        ...prev,
        milestones: [
          ...prev.milestones,
          {
            id: `ms-${Date.now()}`,
            name: formData.name!,
            startDate: formData.startDate!,
            endDate: formData.endDate!,
            status: formData.status as ProjectMilestone["status"],
            responsibleId: formData.responsibleId!,
            notes: formData.notes,
          },
        ],
      }))
    }

    setIsAddDialogOpen(false)
    setEditingMilestone(null)
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      status: "pendente",
      responsibleId: owner?.id ?? "",
      notes: "",
    })
  }

  const handleStatusChange = (
    milestoneId: string,
    newStatus: ProjectMilestone["status"]
  ) => {
    setProject((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === milestoneId ? { ...m, status: newStatus } : m
      ),
    }))
  }

  const dialogTitle = editingMilestone ? "Editar marco" : "Adicionar marco"
  const dialogDescription = editingMilestone
    ? "Atualize as informacoes do marco."
    : "Preencha os campos para adicionar um novo marco."

  const formContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="startDate">Data de inicio</Label>
        <Input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              startDate: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="endDate">Data de fim</Label>
        <Input
          id="endDate"
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, endDate: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="responsibleId">Responsavel</Label>
        <Input
          id="responsibleId"
          value={formData.responsibleId}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              responsibleId: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              status: value as ProjectMilestone["status"],
            }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="em-andamento">Em andamento</SelectItem>
            <SelectItem value="concluido">Concluido</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Observacoes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
        />
      </div>
    </div>
  )

  const footerContent = (
    <>
      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
        Cancelar
      </Button>
      <Button onClick={handleSaveMilestone}>Salvar</Button>
    </>
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Marcos da obra</h1>
        <Button onClick={handleOpenAddDialog} size="sm">
          <PlusIcon data-icon="inline-start" />
          Adicionar marco
        </Button>
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)] lg:gap-6">
        <ProjectMilestoneTimeline
          milestones={sortedMilestones}
          onEditMilestone={handleOpenEditDialog}
          onStatusChange={handleStatusChange}
        />

        <div className="mt-6 flex flex-col gap-6 lg:mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Cronograma</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectGanttSchedule
                milestones={sortedMilestones}
                projectStartDate={project.startDate}
                plannedEndDate={project.plannedEndDate}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proximos passos</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingMilestones.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum marco pendente.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {upcomingMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">
                          {milestone.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Inicio: {formatDate(milestone.startDate)}</span>
                          <span>Previsao: {formatDate(milestone.endDate)}</span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          milestone.status === "concluido"
                            ? "default"
                            : milestone.status === "em-andamento"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {MILESTONE_STATUS_META[milestone.status].label}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" asChild>
          <Link href={`/projetos/${project.id}`}>
            <ArrowLeftIcon data-icon="inline-start" />
            Voltar para projeto
          </Link>
        </Button>
      </div>

      {isMobile ? (
        <Sheet open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{dialogTitle}</SheetTitle>
              <SheetDescription>{dialogDescription}</SheetDescription>
            </SheetHeader>
            <div className="py-4">{formContent}</div>
            <SheetFooter>{footerContent}</SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
              <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>
            {formContent}
            <DialogFooter>{footerContent}</DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
