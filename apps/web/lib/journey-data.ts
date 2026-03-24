/**
 * Journey Data Contract
 * Aggregated module counts and links for the journey page and dashboard.
 * Provides a shared visual map of the operational chain.
 */

import { getBudgetRequests } from "./budget-requests-data"
import { getCrmOpportunities } from "./crm-data"
import { getAnteprojects } from "./anteprojects-data"
import { getProposals } from "./proposals-data"
import { getProjects, WORK_STAGE_ORDER } from "./projects-data"
import {
  FileTextIcon,
  UsersIcon,
  FileCodeIcon,
  FileChartLineIcon,
  FolderKanbanIcon,
  HardHatIcon,
  type LucideIcon,
} from "lucide-react"

/**
 * Journey module definition for the timeline visualization.
 */
export interface JourneyModule {
  id: string
  label: string
  route: string
  icon: LucideIcon
  activeCount: number
}

/**
 * Get all budget requests that are active (not recusado).
 */
function getActiveBudgetRequestsCount(): number {
  const requests = getBudgetRequests()
  return requests.filter((req) => req.status !== "recusado").length
}

/**
 * Get all CRM opportunities that are active (not fechado).
 */
function getActiveCrmOpportunitiesCount(): number {
  const opportunities = getCrmOpportunities()
  return opportunities.filter((opp) => opp.stage !== "fechado").length
}

/**
 * Get all anteprojects that are active (not aprovado-ou-recusado).
 */
function getActiveAnteprojectsCount(): number {
  const anteprojects = getAnteprojects()
  return anteprojects.filter((ant) => ant.stage !== "aprovado-ou-recusado")
    .length
}

/**
 * Get all proposals that are active (not aceita or recusada).
 */
function getActiveProposalsCount(): number {
  const proposals = getProposals()
  return proposals.filter(
    (prop) => prop.status !== "aceita" && prop.status !== "recusada"
  ).length
}

/**
 * Get all projects that are active (not concluido, pausado, or cancelado).
 */
function getActiveProjectsCount(): number {
  const projects = getProjects()
  return projects.filter(
    (proj) =>
      proj.status !== "concluido" &&
      proj.status !== "pausado" &&
      proj.status !== "cancelado"
  ).length
}

/**
 * Get all works (projects in execucao or later stages) that are active.
 */
function getActiveWorksCount(): number {
  const projects = getProjects()
  const executionStartIndex = WORK_STAGE_ORDER.indexOf("execucao")
  return projects.filter(
    (proj) =>
      proj.status !== "concluido" &&
      proj.status !== "pausado" &&
      proj.status !== "cancelado" &&
      WORK_STAGE_ORDER.indexOf(proj.stage) >= executionStartIndex
  ).length
}

/**
 * Ordered list of journey modules representing the operational chain.
 * Order: Orçamento -> CRM -> Anteprojeto -> Proposta -> Projeto -> Obra
 */
export function getJourneyModules(): JourneyModule[] {
  return [
    {
      id: "orcamentos",
      label: "Orçamento",
      route: "/orcamentos",
      icon: FileTextIcon,
      activeCount: getActiveBudgetRequestsCount(),
    },
    {
      id: "crm",
      label: "CRM",
      route: "/crm",
      icon: UsersIcon,
      activeCount: getActiveCrmOpportunitiesCount(),
    },
    {
      id: "anteprojetos",
      label: "Anteprojeto",
      route: "/anteprojetos",
      icon: FileCodeIcon,
      activeCount: getActiveAnteprojectsCount(),
    },
    {
      id: "propostas",
      label: "Proposta",
      route: "/propostas",
      icon: FileChartLineIcon,
      activeCount: getActiveProposalsCount(),
    },
    {
      id: "projetos",
      label: "Projeto",
      route: "/projetos",
      icon: FolderKanbanIcon,
      activeCount: getActiveProjectsCount(),
    },
    {
      id: "obras",
      label: "Obra",
      route: "/obras",
      icon: HardHatIcon,
      activeCount: getActiveWorksCount(),
    },
  ]
}

/**
 * Get journey modules with active items only (filters out modules with zero count).
 */
export function getVisibleJourneyModules(): JourneyModule[] {
  return getJourneyModules().filter((mod) => mod.activeCount > 0)
}

/**
 * Journey pendency item for the dashboard panel.
 */
export interface JourneyPendency {
  id: string
  moduleId: string
  moduleLabel: string
  moduleRoute: string
  message: string
  count: number
  icon: LucideIcon
}

/**
 * Get consolidated pendencies across the full journey chain.
 * Returns actionable items requiring attention.
 */
export function getJourneyPendencies(): JourneyPendency[] {
  const modules = getJourneyModules()
  const pendencies: JourneyPendency[] = []

  for (const mod of modules) {
    if (mod.activeCount > 0) {
      pendencies.push({
        id: `pend-${mod.id}`,
        moduleId: mod.id,
        moduleLabel: mod.label,
        moduleRoute: mod.route,
        message: `${mod.activeCount} ${mod.activeCount === 1 ? "item ativo" : "itens ativos"}`,
        count: mod.activeCount,
        icon: mod.icon,
      })
    }
  }

  return pendencies
}
