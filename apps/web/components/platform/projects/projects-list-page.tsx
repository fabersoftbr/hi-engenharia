"use client"

import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  getProjects,
  getProjectTypeOptions,
  getProjectStatusOptions,
  filterProjects,
  type ProjectFilterInput,
} from "@/lib/projects-data"
import { WorksListPage } from "./works-list-page"

export function ProjectsListPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const typeOptions = getProjectTypeOptions()
  const statusOptions = getProjectStatusOptions()

  const filterInput: ProjectFilterInput = {
    statusFilter,
    typeFilter,
    responsibleFilter: "all",
    searchQuery,
  }

  const filteredProjects = filterProjects(filterInput)

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <Input
          placeholder="Buscar projetos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-64"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="md:ml-auto">
          <PlusIcon data-icon="inline-start" />
          Novo projeto
        </Button>
      </div>

      {/* Project list */}
      <WorksListPage projects={filteredProjects} />
    </div>
  )
}
