"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeftIcon, LayoutGridIcon, ListIcon } from "lucide-react"
import { DropResult } from "@hello-pangea/dnd"

import { Button } from "@workspace/ui/components/button"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import {
  filterProjects,
  getProjectOwnerById,
  getProjectProgress,
  getProjects,
  getProjectResponsibleOptions,
  type ProjectRecord,
  type WorkStageId,
} from "@/lib/projects-data"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import {
  TableSkeleton,
  PipelineSkeleton,
} from "@/components/platform/states/skeletons"
import { WorksPipelineBoard } from "./works-pipeline-board"
import { WorksListPage } from "./works-list-page"

export function WorksWorkspacePage() {
  const isLoading = useSimulatedLoading()
  const [projects, setProjects] = React.useState<ProjectRecord[]>(() =>
    getProjects()
  )
  const [viewMode, setViewMode] = React.useState<"kanban" | "lista">("kanban")
  const [responsibleFilter, setResponsibleFilter] =
    React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  const responsibleOptions = getProjectResponsibleOptions()

  const filteredProjects = React.useMemo(() => {
    return filterProjects({
      projects,
      typeFilter: "all",
      statusFilter: "all",
      responsibleFilter,
      searchQuery,
    })
  }, [projects, responsibleFilter, searchQuery])

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newStage = destination.droppableId as WorkStageId

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== draggableId) return project

        const owner = getProjectOwnerById(project.ownerId)

        return {
          ...project,
          stage: newStage,
          progressPercent: getProjectProgress(newStage),
          history: [
            {
              stage: newStage,
              changedAt: new Date().toISOString(),
              changedBy: owner?.name ?? "Sistema",
            },
            ...project.history,
          ],
        }
      })
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Pipeline de obras</h1>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projetos">
                <ArrowLeftIcon data-icon="inline-start" />
                Ver projetos
              </Link>
            </Button>
          </div>
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) =>
              value && setViewMode(value as "kanban" | "lista")
            }
            variant="outline"
            spacing={0}
          >
            <ToggleGroupItem value="kanban" aria-label="Ver em Kanban">
              <LayoutGridIcon className="size-4" />
              Kanban
            </ToggleGroupItem>
            <ToggleGroupItem value="lista" aria-label="Ver em Lista">
              <ListIcon className="size-4" />
              Lista
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={responsibleFilter}
            onValueChange={setResponsibleFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {responsibleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Buscar projetos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      {/* View content */}
      {isLoading ? (
        viewMode === "lista" ? (
          <TableSkeleton rows={8} />
        ) : (
          <PipelineSkeleton stages={11} />
        )
      ) : viewMode === "kanban" ? (
        <WorksPipelineBoard
          projects={filteredProjects}
          onDragEnd={handleDragEnd}
        />
      ) : (
        <WorksListPage projects={filteredProjects} />
      )}
    </div>
  )
}
