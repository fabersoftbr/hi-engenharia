/**
 * Platform Configuration
 * Single source of truth for module routes, group labels, breadcrumb labels, and profile visibility.
 * Consumed by login, shell, and access-control plans.
 */

import {
  LayoutDashboardIcon,
  FileTextIcon,
  UsersIcon,
  FileCodeIcon,
  FolderKanbanIcon,
  HardHatIcon,
  FolderIcon,
  MessageSquareIcon,
  FileChartLineIcon,
  TableIcon,
  type LucideIcon,
} from "lucide-react"

// Profile types
export type ProfileKey = "admin" | "commercial" | "partner" | "operations"

// Module definition
export interface ModuleConfig {
  id: string
  route: string
  label: string
  breadcrumb: string
  icon: LucideIcon
  group: ModuleGroup
  visibleTo: ProfileKey[]
}

// Module groups
export type ModuleGroup = "operation" | "projects" | "content" | "tools"

export interface GroupConfig {
  id: ModuleGroup
  label: string
  order: number
}

// Group definitions
export const MODULE_GROUPS: Record<ModuleGroup, GroupConfig> = {
  operation: { id: "operation", label: "OPERACAO", order: 1 },
  projects: { id: "projects", label: "PROJETOS", order: 2 },
  content: { id: "content", label: "CONTEUDO", order: 3 },
  tools: { id: "tools", label: "FERRAMENTAS", order: 4 },
}

// Module definitions with profile visibility
export const MODULES: ModuleConfig[] = [
  // OPERACAO
  {
    id: "portal",
    route: "/portal",
    label: "Portal",
    breadcrumb: "Inicio",
    icon: LayoutDashboardIcon,
    group: "operation",
    visibleTo: ["admin", "commercial", "partner", "operations"],
  },
  {
    id: "orcamentos",
    route: "/orcamentos",
    label: "Orcamentos",
    breadcrumb: "Orcamentos",
    icon: FileTextIcon,
    group: "operation",
    visibleTo: ["admin", "commercial", "partner"],
  },
  {
    id: "crm",
    route: "/crm",
    label: "CRM",
    breadcrumb: "CRM",
    icon: UsersIcon,
    group: "operation",
    visibleTo: ["admin", "commercial"],
  },
  // PROJETOS
  {
    id: "anteprojetos",
    route: "/anteprojetos",
    label: "Anteprojetos",
    breadcrumb: "Anteprojetos",
    icon: FileCodeIcon,
    group: "projects",
    visibleTo: ["admin", "operations"],
  },
  {
    id: "projetos",
    route: "/projetos",
    label: "Projetos",
    breadcrumb: "Projetos",
    icon: FolderKanbanIcon,
    group: "projects",
    visibleTo: ["admin", "operations"],
  },
  {
    id: "obras",
    route: "/obras",
    label: "Obras",
    breadcrumb: "Obras",
    icon: HardHatIcon,
    group: "projects",
    visibleTo: ["admin", "operations"],
  },
  // CONTEUDO
  {
    id: "drive",
    route: "/drive",
    label: "Drive",
    breadcrumb: "Drive",
    icon: FolderIcon,
    group: "content",
    visibleTo: ["admin", "operations"],
  },
  {
    id: "comunicacao",
    route: "/comunicacao",
    label: "Comunicacao",
    breadcrumb: "Comunicacao",
    icon: MessageSquareIcon,
    group: "content",
    visibleTo: ["admin"],
  },
  // FERRAMENTAS
  {
    id: "propostas",
    route: "/propostas",
    label: "Gerador de Propostas",
    breadcrumb: "Propostas",
    icon: FileChartLineIcon,
    group: "tools",
    visibleTo: ["admin", "commercial"],
  },
  {
    id: "tabela-de-precos",
    route: "/tabela-de-precos",
    label: "Tabela de Precos",
    breadcrumb: "Tabela de Precos",
    icon: TableIcon,
    group: "tools",
    visibleTo: ["admin", "commercial"],
  },
]

// Helper to get modules visible to a profile
export function getModulesForProfile(profile: ProfileKey): ModuleConfig[] {
  return MODULES.filter((mod) => mod.visibleTo.includes(profile))
}

// Helper to get modules grouped for sidebar
export function getGroupedModulesForProfile(
  profile: ProfileKey
): Record<ModuleGroup, ModuleConfig[]> {
  const visibleModules = getModulesForProfile(profile)
  const grouped: Record<ModuleGroup, ModuleConfig[]> = {
    operation: [],
    projects: [],
    content: [],
    tools: [],
  }

  for (const mod of visibleModules) {
    grouped[mod.group].push(mod)
  }

  // Remove empty groups
  for (const key of Object.keys(grouped) as ModuleGroup[]) {
    if (grouped[key].length === 0) {
      delete grouped[key]
    }
  }

  return grouped
}

// Helper to get module by route
export function getModuleByRoute(route: string): ModuleConfig | undefined {
  return MODULES.find((mod) => mod.route === route)
}

// Profile labels for display
export const PROFILE_LABELS: Record<ProfileKey, string> = {
  admin: "Administrador",
  commercial: "Comercial interno",
  partner: "Afiliado/Parceiro externo",
  operations: "Engenharia/Operacao",
}
