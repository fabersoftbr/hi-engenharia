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

// Icon name to component mapping for Client Component resolution
export const ICON_MAP = {
  "layout-dashboard": LayoutDashboardIcon,
  "file-text": FileTextIcon,
  "users": UsersIcon,
  "file-code": FileCodeIcon,
  "folder-kanban": FolderKanbanIcon,
  "hard-hat": HardHatIcon,
  "folder": FolderIcon,
  "message-square": MessageSquareIcon,
  "file-chart-line": FileChartLineIcon,
  "table": TableIcon,
} as const

export type IconName = keyof typeof ICON_MAP

// Profile types
export type ProfileKey = "admin" | "commercial" | "partner" | "operations" | "cliente"

// Module definition
export interface ModuleConfig {
  id: string
  route: string
  label: string
  breadcrumb: string
  iconName: IconName
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
    iconName: "layout-dashboard",
    group: "operation",
    visibleTo: ["admin", "commercial", "partner", "operations", "cliente"],
  },
  {
    id: "orcamentos",
    route: "/orcamentos",
    label: "Orcamentos",
    breadcrumb: "Orcamentos",
    iconName: "file-text",
    group: "operation",
    visibleTo: ["admin", "commercial", "partner", "cliente"],
  },
  {
    id: "crm",
    route: "/crm",
    label: "CRM",
    breadcrumb: "CRM",
    iconName: "users",
    group: "operation",
    visibleTo: ["admin", "commercial"],
  },
  // PROJETOS
  {
    id: "anteprojetos",
    route: "/anteprojetos",
    label: "Anteprojetos",
    breadcrumb: "Anteprojetos",
    iconName: "file-code",
    group: "projects",
    visibleTo: ["admin", "operations"],
  },
  {
    id: "projetos",
    route: "/projetos",
    label: "Projetos",
    breadcrumb: "Projetos",
    iconName: "folder-kanban",
    group: "projects",
    visibleTo: ["admin", "operations", "cliente"],
  },
  {
    id: "obras",
    route: "/obras",
    label: "Obras",
    breadcrumb: "Obras",
    iconName: "hard-hat",
    group: "projects",
    visibleTo: ["admin", "operations", "cliente"],
  },
  // CONTEUDO
  {
    id: "drive",
    route: "/drive",
    label: "Drive",
    breadcrumb: "Drive",
    iconName: "folder",
    group: "content",
    visibleTo: ["admin", "operations", "cliente"],
  },
  {
    id: "comunicacao",
    route: "/comunicacao",
    label: "Comunicacao",
    breadcrumb: "Comunicacao",
    iconName: "message-square",
    group: "content",
    visibleTo: ["admin"],
  },
  // FERRAMENTAS
  {
    id: "propostas",
    route: "/propostas",
    label: "Gerador de Propostas",
    breadcrumb: "Propostas",
    iconName: "file-chart-line",
    group: "tools",
    visibleTo: ["admin", "commercial"],
  },
  {
    id: "tabela-de-precos",
    route: "/tabela-de-precos",
    label: "Tabela de Precos",
    breadcrumb: "Tabela de Precos",
    iconName: "table",
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
  cliente: "Cliente",
}
