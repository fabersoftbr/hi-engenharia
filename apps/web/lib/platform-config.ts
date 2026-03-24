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
} from "lucide-react"

/**
 * Icon name to component mapping for Client Component resolution.
 * Used to serialize icon references in Server Components and resolve them in Client Components.
 */
export const ICON_MAP = {
  "layout-dashboard": LayoutDashboardIcon,
  "file-text": FileTextIcon,
  users: UsersIcon,
  "file-code": FileCodeIcon,
  "folder-kanban": FolderKanbanIcon,
  "hard-hat": HardHatIcon,
  folder: FolderIcon,
  "message-square": MessageSquareIcon,
  "file-chart-line": FileChartLineIcon,
  table: TableIcon,
} as const

export type IconName = keyof typeof ICON_MAP

/**
 * Profile keys for user access control.
 * Each profile has different module visibility.
 */
export type ProfileKey =
  | "admin"
  | "commercial"
  | "partner"
  | "operations"
  | "cliente"

/**
 * Configuration for a single module in the platform.
 */
export interface ModuleConfig {
  id: string
  route: string
  label: string
  breadcrumb: string
  iconName: IconName
  group: ModuleGroup
  visibleTo: ProfileKey[]
}

/**
 * Module group identifiers for organizing the sidebar.
 */
export type ModuleGroup = "operation" | "projects" | "content" | "tools"

/**
 * Configuration for a module group in the sidebar.
 */
export interface GroupConfig {
  id: ModuleGroup
  label: string
  order: number
}

/**
 * Module group definitions with labels and ordering.
 */
export const MODULE_GROUPS: Record<ModuleGroup, GroupConfig> = {
  operation: { id: "operation", label: "OPERAÇÃO", order: 1 },
  projects: { id: "projects", label: "PROJETOS", order: 2 },
  content: { id: "content", label: "CONTEÚDO", order: 3 },
  tools: { id: "tools", label: "FERRAMENTAS", order: 4 },
}

/**
 * Module definitions with profile visibility.
 * Each module specifies which profiles can see and access it.
 */
export const MODULES: ModuleConfig[] = [
  // OPERAÇÃO
  {
    id: "portal",
    route: "/portal",
    label: "Portal",
    breadcrumb: "Início",
    iconName: "layout-dashboard",
    group: "operation",
    visibleTo: ["admin", "commercial", "partner", "operations", "cliente"],
  },
  {
    id: "orcamentos",
    route: "/orcamentos",
    label: "Orçamentos",
    breadcrumb: "Orçamentos",
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
  {
    id: "jornada",
    route: "/jornada",
    label: "Jornada",
    breadcrumb: "Jornada",
    iconName: "folder-kanban",
    group: "operation",
    visibleTo: ["admin", "commercial", "operations", "partner", "cliente"],
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
  // CONTEÚDO
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
    label: "Comunicação",
    breadcrumb: "Comunicação",
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
    label: "Tabela de Preços",
    breadcrumb: "Tabela de Preços",
    iconName: "table",
    group: "tools",
    visibleTo: ["admin", "commercial"],
  },
]

/**
 * Get all modules visible to a specific profile.
 * Filters the MODULES list by the profile's access permissions.
 */
export function getModulesForProfile(profile: ProfileKey): ModuleConfig[] {
  return MODULES.filter((mod) => mod.visibleTo.includes(profile))
}

/**
 * Get modules grouped by sidebar section for a specific profile.
 * Returns a record mapping group IDs to their visible modules.
 * Empty groups are removed from the result.
 */
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

/**
 * Get a module configuration by its route path.
 * Returns undefined if no module matches the route.
 */
export function getModuleByRoute(route: string): ModuleConfig | undefined {
  return MODULES.find((mod) => mod.route === route)
}

/**
 * Human-readable labels for each profile key.
 * Used in the profile switcher and user display.
 */
export const PROFILE_LABELS: Record<ProfileKey, string> = {
  admin: "Administrador",
  commercial: "Comercial interno",
  partner: "Afiliado/Parceiro externo",
  operations: "Engenharia/Operação",
  cliente: "Cliente",
}
