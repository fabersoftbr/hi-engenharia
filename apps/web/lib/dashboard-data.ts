/**
 * Dashboard Data Contract
 * Shared mock data and helpers for the portal dashboard.
 * Consumed by PortalDashboard and section components.
 */

import {
  getModulesForProfile,
  PROFILE_LABELS,
  type ProfileKey,
  type ModuleConfig,
} from "@/lib/platform-config"
import {
  FileTextIcon,
  UsersIcon,
  FileCodeIcon,
  HardHatIcon,
  FolderKanbanIcon,
  FileChartLineIcon,
  TableIcon,
  FolderIcon,
  PlusIcon,
  EyeIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react"

// Types for dashboard data structures

export interface DashboardModuleStat {
  id: string
  label: string
  route: string
  icon: LucideIcon
  activeCount: number
  pendingCount: number
}

export interface DashboardQuickAction {
  label: string
  route: string
  icon: LucideIcon
}

export interface DashboardAnnouncement {
  id: string
  title: string
  date: string
  preview: string
}

export interface DashboardHighlight {
  id: string
  message: string
  moduleLabel: string
  moduleRoute: string
  urgent: boolean
}

// Quick actions per profile
const QUICK_ACTIONS_BY_PROFILE: Record<ProfileKey, DashboardQuickAction[]> = {
  admin: [
    {
      label: "Nova solicitacao de orcamento",
      route: "/orcamentos",
      icon: PlusIcon,
    },
    { label: "Nova oportunidade", route: "/crm", icon: PlusIcon },
    { label: "Novo anteprojeto", route: "/anteprojetos", icon: PlusIcon },
    { label: "Novo comunicado", route: "/comunicacao", icon: PlusIcon },
    {
      label: "Abrir tabela de precos",
      route: "/tabela-de-precos",
      icon: TableIcon,
    },
  ],
  commercial: [
    {
      label: "Nova solicitacao de orcamento",
      route: "/orcamentos",
      icon: PlusIcon,
    },
    { label: "Nova oportunidade", route: "/crm", icon: PlusIcon },
    { label: "Montar proposta", route: "/propostas", icon: FileChartLineIcon },
    {
      label: "Abrir tabela de precos",
      route: "/tabela-de-precos",
      icon: TableIcon,
    },
  ],
  partner: [
    {
      label: "Nova solicitacao de orcamento",
      route: "/orcamentos",
      icon: PlusIcon,
    },
    { label: "Ver meus orcamentos", route: "/orcamentos", icon: EyeIcon },
  ],
  operations: [
    { label: "Novo anteprojeto", route: "/anteprojetos", icon: PlusIcon },
    { label: "Abrir projetos", route: "/projetos", icon: FolderKanbanIcon },
    { label: "Acompanhar obras", route: "/obras", icon: HardHatIcon },
    { label: "Abrir drive", route: "/drive", icon: FolderIcon },
  ],
}

// Mock module stats (shared across all profiles, filtered by visibility)
const MOCK_MODULE_STATS: Record<
  string,
  { activeCount: number; pendingCount: number }
> = {
  orcamentos: { activeCount: 12, pendingCount: 3 },
  crm: { activeCount: 28, pendingCount: 5 },
  anteprojetos: { activeCount: 7, pendingCount: 2 },
  projetos: { activeCount: 15, pendingCount: 0 },
  obras: { activeCount: 4, pendingCount: 1 },
  drive: { activeCount: 156, pendingCount: 0 },
  comunicacao: { activeCount: 8, pendingCount: 2 },
  propostas: { activeCount: 6, pendingCount: 1 },
  "tabela-de-precos": { activeCount: 1, pendingCount: 0 },
}

// Announcements (global, not profile-specific)
export const DASHBOARD_ANNOUNCEMENTS: DashboardAnnouncement[] = [
  {
    id: "ann-1",
    title: "Planejamento comercial da semana",
    date: "2026-03-20",
    preview:
      "Confira as metas e prioridades da equipe comercial para esta semana.",
  },
  {
    id: "ann-2",
    title: "Janela de manutencao do portal",
    date: "2026-03-22",
    preview:
      "O portal ficara indisponivel no domingo das 6h as 8h para manutencao programada.",
  },
  {
    id: "ann-3",
    title: "Atualizacao da tabela de precos",
    date: "2026-03-19",
    preview:
      "Novos valores de materiais foram atualizados na tabela de precos oficial.",
  },
  {
    id: "ann-4",
    title: "Ritmo de aprovacao das obras",
    date: "2026-03-18",
    preview:
      "Veja o relatorio mensal sobre o ritmo de aprovacao dos projetos em andamento.",
  },
]

// Urgent highlights (filtered by profile visibility)
export const DASHBOARD_HIGHLIGHTS: DashboardHighlight[] = [
  {
    id: "high-1",
    message: "Orcamento #1234 aguarda aprovacao ha 3 dias",
    moduleLabel: "Orcamentos",
    moduleRoute: "/orcamentos",
    urgent: true,
  },
  {
    id: "high-2",
    message: "Cliente ABC Ltda. nao responde ha 5 dias",
    moduleLabel: "CRM",
    moduleRoute: "/crm",
    urgent: true,
  },
  {
    id: "high-3",
    message: "Anteprojeto #89 com revisao pendente",
    moduleLabel: "Anteprojetos",
    moduleRoute: "/anteprojetos",
    urgent: false,
  },
  {
    id: "high-4",
    message: "Obra Residencial Park - vistoria agendada",
    moduleLabel: "Obras",
    moduleRoute: "/obras",
    urgent: false,
  },
]

/**
 * Get dashboard module stats for a profile, excluding the portal module itself.
 */
export function getDashboardModulesForProfile(
  profile: ProfileKey
): DashboardModuleStat[] {
  const visibleModules = getModulesForProfile(profile)

  return visibleModules
    .filter((mod) => mod.id !== "portal")
    .map((mod) => {
      const stats = MOCK_MODULE_STATS[mod.id] || { activeCount: 0, pendingCount: 0 }
      return {
        id: mod.id,
        label: mod.label,
        route: mod.route,
        icon: mod.icon,
        activeCount: stats.activeCount,
        pendingCount: stats.pendingCount,
      }
    })
}

/**
 * Get quick actions for a profile.
 */
export function getDashboardQuickActionsForProfile(
  profile: ProfileKey
): DashboardQuickAction[] {
  return QUICK_ACTIONS_BY_PROFILE[profile] || []
}

/**
 * Get all announcements (global).
 */
export function getDashboardAnnouncements(): DashboardAnnouncement[] {
  return DASHBOARD_ANNOUNCEMENTS
}

/**
 * Get urgent highlights filtered by profile's visible modules.
 */
export function getDashboardHighlightsForProfile(
  profile: ProfileKey
): DashboardHighlight[] {
  const visibleModules = getModulesForProfile(profile)
  const visibleRoutes = new Set(visibleModules.map((mod) => mod.route))

  return DASHBOARD_HIGHLIGHTS.filter((highlight) =>
    visibleRoutes.has(highlight.moduleRoute)
  )
}

/**
 * Calculate total pending count across all modules.
 */
export function getTotalPendingCount(modules: DashboardModuleStat[]): number {
  return modules.reduce((total, mod) => total + mod.pendingCount, 0)
}

// Re-export PROFILE_LABELS for convenience
export { PROFILE_LABELS }
export type { ProfileKey, ModuleConfig }
