/**
 * CRM Data Contract
 * Shared mock data and helpers for the CRM module.
 * Consumed by list, detail, and pipeline components.
 */

/**
 * Stage IDs for the CRM pipeline.
 */
export type CrmStageId =
  | "lead"
  | "em-contato"
  | "qualificado"
  | "visita-tecnica"
  | "proposta-enviada"
  | "negociacao"
  | "revisao"
  | "aguardando-aprovacao"
  | "contrato-assinado"
  | "fechado"

/**
 * Priority levels for CRM opportunities.
 */
export type CrmPriority = "alta" | "media" | "baixa"

/**
 * Owner of a CRM opportunity.
 */
export interface CrmOwner {
  id: string
  name: string
  initials: string
}

/**
 * History entry for stage changes.
 */
export interface CrmHistoryEntry {
  stage: CrmStageId
  changedAt: string
  changedBy: string
  notes?: string
}

/**
 * Full record for a CRM opportunity.
 */
export interface CrmOpportunityRecord {
  id: string
  title: string
  company: string
  stage: CrmStageId
  priority: CrmPriority
  ownerId: string
  estimatedValue: number
  createdAt: string
  lastContactAt: string
  originBudgetRequestId: string | null
  history: CrmHistoryEntry[]
}

/**
 * Ordered list of stage IDs for the pipeline.
 */
export const CRM_STAGE_ORDER: CrmStageId[] = [
  "lead",
  "em-contato",
  "qualificado",
  "visita-tecnica",
  "proposta-enviada",
  "negociacao",
  "revisao",
  "aguardando-aprovacao",
  "contrato-assinado",
  "fechado",
]

/**
 * Metadata for each CRM stage, including label and badge variant.
 */
export const CRM_STAGE_META: Record<
  CrmStageId,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  lead: { label: "Lead", variant: "secondary" },
  "em-contato": { label: "Em Contato", variant: "secondary" },
  qualificado: { label: "Qualificado", variant: "secondary" },
  "visita-tecnica": { label: "Visita Tecnica", variant: "secondary" },
  "proposta-enviada": { label: "Proposta Enviada", variant: "outline" },
  negociacao: { label: "Negociacao", variant: "outline" },
  revisao: { label: "Revisao", variant: "outline" },
  "aguardando-aprovacao": { label: "Aguardando Aprovacao", variant: "outline" },
  "contrato-assinado": { label: "Contrato Assinado", variant: "default" },
  fechado: { label: "Fechado", variant: "default" },
}

/**
 * Metadata for each priority level.
 */
export const CRM_PRIORITY_META: Record<
  CrmPriority,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  alta: { label: "Alta", variant: "destructive" },
  media: { label: "Media", variant: "outline" },
  baixa: { label: "Baixa", variant: "secondary" },
}

/**
 * Seeded CRM owners for the mock module.
 */
export const CRM_OWNERS: CrmOwner[] = [
  { id: "owner-1", name: "Carlos Silva", initials: "CS" },
  { id: "owner-2", name: "Ana Santos", initials: "AS" },
  { id: "owner-3", name: "Bruno Lima", initials: "BL" },
]

/**
 * Seeded CRM opportunity records for the mock module.
 * At least one record per stage.
 */
export const CRM_OPPORTUNITIES: CrmOpportunityRecord[] = [
  {
    id: "opp-2026-001",
    title: "Instalacao residencial - Zona Sul",
    company: "Familia Oliveira",
    stage: "lead",
    priority: "media",
    ownerId: "owner-1",
    estimatedValue: 45000,
    createdAt: "2026-03-10T09:00:00Z",
    lastContactAt: "2026-03-18T14:30:00Z",
    originBudgetRequestId: "orc-2026-1001",
    history: [
      { stage: "lead", changedAt: "2026-03-10T09:00:00Z", changedBy: "owner-1" },
    ],
  },
  {
    id: "opp-2026-002",
    title: "Projeto comercial - Centro",
    company: "Comercio XYZ Ltda",
    stage: "em-contato",
    priority: "alta",
    ownerId: "owner-2",
    estimatedValue: 120000,
    createdAt: "2026-03-08T11:00:00Z",
    lastContactAt: "2026-03-19T10:15:00Z",
    originBudgetRequestId: "orc-2026-1002",
    history: [
      { stage: "lead", changedAt: "2026-03-08T11:00:00Z", changedBy: "owner-2" },
      { stage: "em-contato", changedAt: "2026-03-09T14:00:00Z", changedBy: "owner-2" },
    ],
  },
  {
    id: "opp-2026-003",
    title: "Fazenda solar - Interior",
    company: "Agro Rural SA",
    stage: "qualificado",
    priority: "alta",
    ownerId: "owner-1",
    estimatedValue: 350000,
    createdAt: "2026-03-05T08:00:00Z",
    lastContactAt: "2026-03-17T16:45:00Z",
    originBudgetRequestId: null,
    history: [
      { stage: "lead", changedAt: "2026-03-05T08:00:00Z", changedBy: "owner-1" },
      { stage: "em-contato", changedAt: "2026-03-06T10:00:00Z", changedBy: "owner-1" },
      { stage: "qualificado", changedAt: "2026-03-10T09:00:00Z", changedBy: "owner-1" },
    ],
  },
  {
    id: "opp-2026-004",
    title: "Condominio residencial",
    company: "Condominio Jardim Verde",
    stage: "visita-tecnica",
    priority: "media",
    ownerId: "owner-3",
    estimatedValue: 280000,
    createdAt: "2026-03-01T10:00:00Z",
    lastContactAt: "2026-03-16T11:30:00Z",
    originBudgetRequestId: "orc-2026-1003",
    history: [
      { stage: "lead", changedAt: "2026-03-01T10:00:00Z", changedBy: "owner-3" },
      { stage: "em-contato", changedAt: "2026-03-02T14:00:00Z", changedBy: "owner-3" },
      { stage: "qualificado", changedAt: "2026-03-05T09:00:00Z", changedBy: "owner-3" },
      { stage: "visita-tecnica", changedAt: "2026-03-08T11:00:00Z", changedBy: "owner-3" },
    ],
  },
  {
    id: "opp-2026-005",
    title: "Industria de alimentos",
    company: "Alimentos Premium Ltda",
    stage: "proposta-enviada",
    priority: "alta",
    ownerId: "owner-2",
    estimatedValue: 520000,
    createdAt: "2026-02-25T09:00:00Z",
    lastContactAt: "2026-03-15T09:00:00Z",
    originBudgetRequestId: null,
    history: [
      { stage: "lead", changedAt: "2026-02-25T09:00:00Z", changedBy: "owner-2" },
      { stage: "em-contato", changedAt: "2026-02-26T11:00:00Z", changedBy: "owner-2" },
      { stage: "qualificado", changedAt: "2026-02-28T10:00:00Z", changedBy: "owner-2" },
      { stage: "visita-tecnica", changedAt: "2026-03-02T14:00:00Z", changedBy: "owner-2" },
      { stage: "proposta-enviada", changedAt: "2026-03-10T16:00:00Z", changedBy: "owner-2" },
    ],
  },
  {
    id: "opp-2026-006",
    title: "Escritorio corporativo",
    company: "Tech Solutions SA",
    stage: "negociacao",
    priority: "media",
    ownerId: "owner-1",
    estimatedValue: 180000,
    createdAt: "2026-02-20T10:00:00Z",
    lastContactAt: "2026-03-18T15:00:00Z",
    originBudgetRequestId: null,
    history: [
      { stage: "lead", changedAt: "2026-02-20T10:00:00Z", changedBy: "owner-1" },
      { stage: "em-contato", changedAt: "2026-02-22T09:00:00Z", changedBy: "owner-1" },
      { stage: "qualificado", changedAt: "2026-02-25T11:00:00Z", changedBy: "owner-1" },
      { stage: "visita-tecnica", changedAt: "2026-02-28T14:00:00Z", changedBy: "owner-1" },
      { stage: "proposta-enviada", changedAt: "2026-03-05T10:00:00Z", changedBy: "owner-1" },
      { stage: "negociacao", changedAt: "2026-03-12T16:00:00Z", changedBy: "owner-1" },
    ],
  },
  {
    id: "opp-2026-007",
    title: "Hospital regional",
    company: "Hospital Saude Total",
    stage: "revisao",
    priority: "alta",
    ownerId: "owner-3",
    estimatedValue: 750000,
    createdAt: "2026-02-15T08:00:00Z",
    lastContactAt: "2026-03-19T11:00:00Z",
    originBudgetRequestId: null,
    history: [
      { stage: "lead", changedAt: "2026-02-15T08:00:00Z", changedBy: "owner-3" },
      { stage: "em-contato", changedAt: "2026-02-17T10:00:00Z", changedBy: "owner-3" },
      { stage: "qualificado", changedAt: "2026-02-20T09:00:00Z", changedBy: "owner-3" },
      { stage: "visita-tecnica", changedAt: "2026-02-24T14:00:00Z", changedBy: "owner-3" },
      { stage: "proposta-enviada", changedAt: "2026-03-01T16:00:00Z", changedBy: "owner-3" },
      { stage: "negociacao", changedAt: "2026-03-08T11:00:00Z", changedBy: "owner-3" },
      { stage: "revisao", changedAt: "2026-03-15T14:00:00Z", changedBy: "owner-3" },
    ],
  },
  {
    id: "opp-2026-008",
    title: "Escola particular",
    company: "Colegio Futuro Brilhante",
    stage: "aguardando-aprovacao",
    priority: "baixa",
    ownerId: "owner-2",
    estimatedValue: 95000,
    createdAt: "2026-02-10T09:00:00Z",
    lastContactAt: "2026-03-14T10:30:00Z",
    originBudgetRequestId: null,
    history: [
      { stage: "lead", changedAt: "2026-02-10T09:00:00Z", changedBy: "owner-2" },
      { stage: "em-contato", changedAt: "2026-02-12T11:00:00Z", changedBy: "owner-2" },
      { stage: "qualificado", changedAt: "2026-02-15T10:00:00Z", changedBy: "owner-2" },
      { stage: "visita-tecnica", changedAt: "2026-02-18T14:00:00Z", changedBy: "owner-2" },
      { stage: "proposta-enviada", changedAt: "2026-02-25T16:00:00Z", changedBy: "owner-2" },
      { stage: "negociacao", changedAt: "2026-03-03T09:00:00Z", changedBy: "owner-2" },
      { stage: "revisao", changedAt: "2026-03-08T11:00:00Z", changedBy: "owner-2" },
      { stage: "aguardando-aprovacao", changedAt: "2026-03-12T15:00:00Z", changedBy: "owner-2" },
    ],
  },
  {
    id: "opp-2026-009",
    title: "Shopping center - Area comum",
    company: "Shopping Center Plaza",
    stage: "contrato-assinado",
    priority: "media",
    ownerId: "owner-1",
    estimatedValue: 420000,
    createdAt: "2026-01-20T08:00:00Z",
    lastContactAt: "2026-03-17T09:00:00Z",
    originBudgetRequestId: null,
    history: [
      { stage: "lead", changedAt: "2026-01-20T08:00:00Z", changedBy: "owner-1" },
      { stage: "em-contato", changedAt: "2026-01-22T10:00:00Z", changedBy: "owner-1" },
      { stage: "qualificado", changedAt: "2026-01-25T09:00:00Z", changedBy: "owner-1" },
      { stage: "visita-tecnica", changedAt: "2026-01-28T14:00:00Z", changedBy: "owner-1" },
      { stage: "proposta-enviada", changedAt: "2026-02-05T16:00:00Z", changedBy: "owner-1" },
      { stage: "negociacao", changedAt: "2026-02-15T11:00:00Z", changedBy: "owner-1" },
      { stage: "revisao", changedAt: "2026-02-22T14:00:00Z", changedBy: "owner-1" },
      { stage: "aguardando-aprovacao", changedAt: "2026-02-28T10:00:00Z", changedBy: "owner-1" },
      { stage: "contrato-assinado", changedAt: "2026-03-10T09:00:00Z", changedBy: "owner-1" },
    ],
  },
  {
    id: "opp-2026-010",
    title: "Residencia de luxo - Alphaville",
    company: "Residencia Medeiros",
    stage: "fechado",
    priority: "alta",
    ownerId: "owner-3",
    estimatedValue: 185000,
    createdAt: "2026-01-10T09:00:00Z",
    lastContactAt: "2026-03-05T16:00:00Z",
    originBudgetRequestId: null,
    history: [
      { stage: "lead", changedAt: "2026-01-10T09:00:00Z", changedBy: "owner-3" },
      { stage: "em-contato", changedAt: "2026-01-12T11:00:00Z", changedBy: "owner-3" },
      { stage: "qualificado", changedAt: "2026-01-15T10:00:00Z", changedBy: "owner-3" },
      { stage: "visita-tecnica", changedAt: "2026-01-18T14:00:00Z", changedBy: "owner-3" },
      { stage: "proposta-enviada", changedAt: "2026-01-25T16:00:00Z", changedBy: "owner-3" },
      { stage: "negociacao", changedAt: "2026-02-01T09:00:00Z", changedBy: "owner-3" },
      { stage: "revisao", changedAt: "2026-02-05T11:00:00Z", changedBy: "owner-3" },
      { stage: "aguardando-aprovacao", changedAt: "2026-02-10T15:00:00Z", changedBy: "owner-3" },
      { stage: "contrato-assinado", changedAt: "2026-02-15T10:00:00Z", changedBy: "owner-3" },
      { stage: "fechado", changedAt: "2026-03-01T14:00:00Z", changedBy: "owner-3" },
    ],
  },
]

/**
 * Get all CRM opportunities.
 */
export function getCrmOpportunities(): CrmOpportunityRecord[] {
  return CRM_OPPORTUNITIES
}

/**
 * Get a single CRM opportunity by ID.
 */
export function getCrmOpportunityById(opportunityId: string): CrmOpportunityRecord | undefined {
  return CRM_OPPORTUNITIES.find((opp) => opp.id === opportunityId)
}

/**
 * Get stage options for select/filter components.
 */
export function getCrmStageOptions(): Array<{ value: CrmStageId; label: string }> {
  return CRM_STAGE_ORDER.map((stageId) => ({
    value: stageId,
    label: CRM_STAGE_META[stageId].label,
  }))
}

/**
 * Get responsible options for select/filter components.
 */
export function getCrmResponsibleOptions(): Array<{ value: string; label: string }> {
  return [
    { value: "all", label: "Todos os responsaveis" },
    ...CRM_OWNERS.map((owner) => ({
      value: owner.id,
      label: owner.name,
    })),
  ]
}

/**
 * Get priority options for select/filter components.
 */
export function getCrmPriorityOptions(): Array<{ value: CrmPriority | "all"; label: string }> {
  return [
    { value: "all", label: "Todas as prioridades" },
    { value: "alta", label: "Alta" },
    { value: "media", label: "Media" },
    { value: "baixa", label: "Baixa" },
  ]
}

/**
 * Filter input for CRM opportunities.
 */
export interface CrmFilterInput {
  responsibleFilter: string
  priorityFilter: string
  searchQuery: string
}

/**
 * Filter CRM opportunities based on the provided filters.
 */
export function filterCrmOpportunities(input: CrmFilterInput): CrmOpportunityRecord[] {
  return CRM_OPPORTUNITIES.filter((opp) => {
    // Responsible filter
    if (input.responsibleFilter !== "all" && opp.ownerId !== input.responsibleFilter) {
      return false
    }

    // Priority filter
    if (input.priorityFilter !== "all" && opp.priority !== input.priorityFilter) {
      return false
    }

    // Search filter
    if (input.searchQuery) {
      const query = input.searchQuery.toLowerCase()
      const matchesTitle = opp.title.toLowerCase().includes(query)
      const matchesCompany = opp.company.toLowerCase().includes(query)
      if (!matchesTitle && !matchesCompany) {
        return false
      }
    }

    return true
  })
}

/**
 * Group CRM opportunities by stage.
 */
export function groupCrmOpportunitiesByStage(
  opportunities: CrmOpportunityRecord[]
): Record<CrmStageId, CrmOpportunityRecord[]> {
  const grouped: Partial<Record<CrmStageId, CrmOpportunityRecord[]>> = {}

  for (const stageId of CRM_STAGE_ORDER) {
    grouped[stageId] = []
  }

  for (const opp of opportunities) {
    if (grouped[opp.stage]) {
      grouped[opp.stage]!.push(opp)
    }
  }

  return grouped as Record<CrmStageId, CrmOpportunityRecord[]>
}

/**
 * Get an owner by ID.
 */
export function getCrmOwnerById(ownerId: string): CrmOwner | undefined {
  return CRM_OWNERS.find((owner) => owner.id === ownerId)
}
