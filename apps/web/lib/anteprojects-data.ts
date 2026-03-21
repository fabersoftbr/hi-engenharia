/**
 * Anteprojects Data Contract
 * Shared mock data and helpers for the anteprojetos module.
 * Consumed by list, detail, and pipeline components.
 */

/**
 * Stage IDs for the anteprojects pipeline.
 */
export type AnteprojectStageId =
  | "solicitacao"
  | "analise-tecnica"
  | "em-revisao"
  | "retorno-comercial"
  | "aguardando-cliente"
  | "aprovado-ou-recusado"

/**
 * Priority levels for anteprojects.
 */
export type AnteprojectPriority = "alta" | "media" | "baixa"

/**
 * Attachment metadata for an anteproject.
 */
export interface AnteprojectAttachment {
  id: string
  name: string
  type: string
  size: number
}

/**
 * Timeline entry for anteproject history.
 */
export interface AnteprojectTimelineEntry {
  stage: AnteprojectStageId
  changedAt: string
  changedBy: string
  notes?: string
}

/**
 * Owner of an anteproject.
 */
export interface AnteprojectOwner {
  id: string
  name: string
  initials: string
}

/**
 * Full record for an anteproject.
 */
export interface AnteprojectRecord {
  id: string
  title: string
  clientName: string
  stage: AnteprojectStageId
  priority: AnteprojectPriority
  ownerId: string
  originCrmOpportunityId: string | null
  proposalId: string | null
  installationType: string
  monthlyConsumption: number | null
  technicalNotes: string
  isAwaitingInformation: boolean
  attachments: AnteprojectAttachment[]
  createdAt: string
  updatedAt: string
  timeline: AnteprojectTimelineEntry[]
}

/**
 * Ordered list of stage IDs for the pipeline.
 */
export const ANTEPROJECT_STAGE_ORDER: AnteprojectStageId[] = [
  "solicitacao",
  "analise-tecnica",
  "em-revisao",
  "retorno-comercial",
  "aguardando-cliente",
  "aprovado-ou-recusado",
]

/**
 * Metadata for each anteproject stage, including label and badge variant.
 */
export const ANTEPROJECT_STAGE_META: Record<
  AnteprojectStageId,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  solicitacao: { label: "Solicitacao", variant: "secondary" },
  "analise-tecnica": { label: "Analise tecnica", variant: "secondary" },
  "em-revisao": { label: "Em revisao", variant: "outline" },
  "retorno-comercial": { label: "Retorno comercial", variant: "outline" },
  "aguardando-cliente": { label: "Aguardando cliente", variant: "outline" },
  "aprovado-ou-recusado": { label: "Aprovado/Recusado", variant: "default" },
}

/**
 * Metadata for each priority level.
 */
export const ANTEPROJECT_PRIORITY_META: Record<
  AnteprojectPriority,
  {
    label: string
    variant: "default" | "secondary" | "destructive" | "outline"
  }
> = {
  alta: { label: "Alta", variant: "destructive" },
  media: { label: "Media", variant: "outline" },
  baixa: { label: "Baixa", variant: "secondary" },
}

/**
 * Seeded anteproject owners for the mock module.
 */
export const ANTEPROJECT_OWNERS: AnteprojectOwner[] = [
  { id: "owner-1", name: "Carlos Silva", initials: "CS" },
  { id: "owner-2", name: "Ana Santos", initials: "AS" },
  { id: "owner-3", name: "Bruno Lima", initials: "BL" },
]

/**
 * Seeded anteproject records for the mock module.
 * At least one record per stage.
 */
export const ANTEPROJECTS: AnteprojectRecord[] = [
  {
    id: "ant-2026-001",
    title: "Instalacao residencial - Zona Sul",
    clientName: "Familia Oliveira",
    stage: "solicitacao",
    priority: "media",
    ownerId: "owner-1",
    originCrmOpportunityId: "opp-2026-001",
    proposalId: null,
    installationType: "Residencial",
    monthlyConsumption: 450,
    technicalNotes:
      "Cliente interessado em instalacao solar residencial com capacidade para gerar cerca de 500 kWh/mes. Telhado com area suficiente para 15 modulos.",
    isAwaitingInformation: false,
    attachments: [
      {
        id: "att-001",
        name: "conta_energia_marco.pdf",
        type: "application/pdf",
        size: 245000,
      },
    ],
    createdAt: "2026-03-10T09:00:00Z",
    updatedAt: "2026-03-18T14:30:00Z",
    timeline: [
      {
        stage: "solicitacao",
        changedAt: "2026-03-10T09:00:00Z",
        changedBy: "owner-1",
        notes: "Solicitacao recebida via CRM",
      },
    ],
  },
  {
    id: "ant-2026-002",
    title: "Projeto comercial - Centro",
    clientName: "Comercio XYZ Ltda",
    stage: "analise-tecnica",
    priority: "alta",
    ownerId: "owner-2",
    originCrmOpportunityId: "opp-2026-002",
    proposalId: null,
    installationType: "Comercial",
    monthlyConsumption: 1200,
    technicalNotes:
      "Propriedade comercial com telhado grande. Necessario verificar estrutura para suportar os modulos. Aguardando visita tecnica para medicoes.",
    isAwaitingInformation: true,
    attachments: [
      {
        id: "att-002",
        name: "foto_telhado.jpg",
        type: "image/jpeg",
        size: 1200000,
      },
      {
        id: "att-003",
        name: "conta_energia_fev.pdf",
        type: "application/pdf",
        size: 198000,
      },
    ],
    createdAt: "2026-03-08T11:00:00Z",
    updatedAt: "2026-03-19T10:15:00Z",
    timeline: [
      {
        stage: "solicitacao",
        changedAt: "2026-03-08T11:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "analise-tecnica",
        changedAt: "2026-03-09T14:00:00Z",
        changedBy: "owner-2",
        notes: "Iniciada analise tecnica do projeto",
      },
    ],
  },
  {
    id: "ant-2026-003",
    title: "Fazenda solar - Interior",
    clientName: "Agro Rural SA",
    stage: "em-revisao",
    priority: "alta",
    ownerId: "owner-1",
    originCrmOpportunityId: null,
    proposalId: "prop-2026-001",
    installationType: "Rural",
    monthlyConsumption: 3500,
    technicalNotes:
      "Projeto de grande porte para fazenda. Sistema de bombeamento solar integrado. Estrutura ja aprovada pelo engenheiro responsavel.",
    isAwaitingInformation: false,
    attachments: [
      {
        id: "att-004",
        name: "planta_fazenda.pdf",
        type: "application/pdf",
        size: 2500000,
      },
    ],
    createdAt: "2026-03-05T08:00:00Z",
    updatedAt: "2026-03-17T16:45:00Z",
    timeline: [
      {
        stage: "solicitacao",
        changedAt: "2026-03-05T08:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "analise-tecnica",
        changedAt: "2026-03-06T10:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "em-revisao",
        changedAt: "2026-03-10T09:00:00Z",
        changedBy: "owner-1",
        notes: "Proposta gerada, aguardando revisao comercial",
      },
    ],
  },
  {
    id: "ant-2026-004",
    title: "Condominio residencial",
    clientName: "Condominio Jardim Verde",
    stage: "retorno-comercial",
    priority: "media",
    ownerId: "owner-3",
    originCrmOpportunityId: "opp-2026-004",
    proposalId: "prop-2026-002",
    installationType: "Condominio",
    monthlyConsumption: 2800,
    technicalNotes:
      "Condominio com 4 torres. Analise completa realizada. Proposta comercial enviada para sindico. Aguardando retorno da assembleia.",
    isAwaitingInformation: false,
    attachments: [
      {
        id: "att-005",
        name: "planta_condominio.pdf",
        type: "application/pdf",
        size: 3200000,
      },
      {
        id: "att-006",
        name: "atas_assembleia.pdf",
        type: "application/pdf",
        size: 450000,
      },
    ],
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-16T11:30:00Z",
    timeline: [
      {
        stage: "solicitacao",
        changedAt: "2026-03-01T10:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "analise-tecnica",
        changedAt: "2026-03-02T14:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "em-revisao",
        changedAt: "2026-03-05T09:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "retorno-comercial",
        changedAt: "2026-03-08T11:00:00Z",
        changedBy: "owner-3",
        notes: "Proposta enviada para analise do condominio",
      },
    ],
  },
  {
    id: "ant-2026-005",
    title: "Industria de alimentos",
    clientName: "Alimentos Premium Ltda",
    stage: "aguardando-cliente",
    priority: "alta",
    ownerId: "owner-2",
    originCrmOpportunityId: "opp-2026-005",
    proposalId: "prop-2026-003",
    installationType: "Industrial",
    monthlyConsumption: 8500,
    technicalNotes:
      "Projeto industrial de grande porte. Necessario aguardar aprovacao do conselho administrativo do cliente. Documentacao tecnica completa enviada.",
    isAwaitingInformation: true,
    attachments: [
      {
        id: "att-007",
        name: "estudo_viabilidade.pdf",
        type: "application/pdf",
        size: 4500000,
      },
    ],
    createdAt: "2026-02-25T09:00:00Z",
    updatedAt: "2026-03-15T09:00:00Z",
    timeline: [
      {
        stage: "solicitacao",
        changedAt: "2026-02-25T09:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "analise-tecnica",
        changedAt: "2026-02-26T11:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "em-revisao",
        changedAt: "2026-02-28T10:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "retorno-comercial",
        changedAt: "2026-03-02T14:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "aguardando-cliente",
        changedAt: "2026-03-10T16:00:00Z",
        changedBy: "owner-2",
        notes: "Proposta apresentada, aguardando decisao do cliente",
      },
    ],
  },
  {
    id: "ant-2026-006",
    title: "Escritorio corporativo",
    clientName: "Tech Solutions SA",
    stage: "aprovado-ou-recusado",
    priority: "media",
    ownerId: "owner-1",
    originCrmOpportunityId: "opp-2026-006",
    proposalId: "prop-2026-004",
    installationType: "Comercial",
    monthlyConsumption: 2200,
    technicalNotes:
      "Projeto aprovado pelo cliente. Contrato em fase de assinatura. Inicio da instalacao previsto para o proximo mes.",
    isAwaitingInformation: false,
    attachments: [
      {
        id: "att-008",
        name: "contrato_assinado.pdf",
        type: "application/pdf",
        size: 890000,
      },
    ],
    createdAt: "2026-02-20T10:00:00Z",
    updatedAt: "2026-03-18T15:00:00Z",
    timeline: [
      {
        stage: "solicitacao",
        changedAt: "2026-02-20T10:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "analise-tecnica",
        changedAt: "2026-02-22T09:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "em-revisao",
        changedAt: "2026-02-25T11:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "retorno-comercial",
        changedAt: "2026-02-28T14:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "aguardando-cliente",
        changedAt: "2026-03-05T10:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "aprovado-ou-recusado",
        changedAt: "2026-03-12T16:00:00Z",
        changedBy: "owner-1",
        notes: "Projeto aprovado! Iniciar processo de contratacao",
      },
    ],
  },
]

/**
 * Get all anteprojects.
 */
export function getAnteprojects(): AnteprojectRecord[] {
  return ANTEPROJECTS
}

/**
 * Get a single anteproject by ID.
 */
export function getAnteprojectById(
  anteprojectId: string
): AnteprojectRecord | undefined {
  return ANTEPROJECTS.find((ant) => ant.id === anteprojectId)
}

/**
 * Get stage options for select/filter components.
 */
export function getAnteprojectStageOptions(): Array<{
  value: AnteprojectStageId
  label: string
}> {
  return ANTEPROJECT_STAGE_ORDER.map((stageId) => ({
    value: stageId,
    label: ANTEPROJECT_STAGE_META[stageId].label,
  }))
}

/**
 * Get responsible options for select/filter components.
 */
export function getAnteprojectResponsibleOptions(): Array<{
  value: string
  label: string
}> {
  return [
    { value: "all", label: "Todos os responsaveis" },
    ...ANTEPROJECT_OWNERS.map((owner) => ({
      value: owner.id,
      label: owner.name,
    })),
  ]
}

/**
 * Get priority options for select/filter components.
 */
export function getAnteprojectPriorityOptions(): Array<{
  value: AnteprojectPriority | "all"
  label: string
}> {
  return [
    { value: "all", label: "Todas as prioridades" },
    { value: "alta", label: "Alta" },
    { value: "media", label: "Media" },
    { value: "baixa", label: "Baixa" },
  ]
}

/**
 * Filter input for anteprojects.
 */
export interface AnteprojectFilterInput {
  anteprojects?: AnteprojectRecord[]
  responsibleFilter: string
  priorityFilter: string
  searchQuery: string
  showAwaitingOnly?: boolean
}

/**
 * Filter anteprojects based on the provided filters.
 */
export function filterAnteprojects(
  input: AnteprojectFilterInput
): AnteprojectRecord[] {
  const source = input.anteprojects ?? ANTEPROJECTS
  return source.filter((ant) => {
    // Responsible filter
    if (
      input.responsibleFilter !== "all" &&
      ant.ownerId !== input.responsibleFilter
    ) {
      return false
    }

    // Priority filter
    if (
      input.priorityFilter !== "all" &&
      ant.priority !== input.priorityFilter
    ) {
      return false
    }

    // Awaiting information filter
    if (input.showAwaitingOnly && !ant.isAwaitingInformation) {
      return false
    }

    // Search filter
    if (input.searchQuery) {
      const query = input.searchQuery.toLowerCase()
      const matchesTitle = ant.title.toLowerCase().includes(query)
      const matchesClient = ant.clientName.toLowerCase().includes(query)
      if (!matchesTitle && !matchesClient) {
        return false
      }
    }

    return true
  })
}

/**
 * Group anteprojects by stage.
 */
export function groupAnteprojectsByStage(
  anteprojects: AnteprojectRecord[]
): Record<AnteprojectStageId, AnteprojectRecord[]> {
  const grouped: Partial<Record<AnteprojectStageId, AnteprojectRecord[]>> = {}

  for (const stageId of ANTEPROJECT_STAGE_ORDER) {
    grouped[stageId] = []
  }

  for (const ant of anteprojects) {
    if (grouped[ant.stage]) {
      grouped[ant.stage]!.push(ant)
    }
  }

  return grouped as Record<AnteprojectStageId, AnteprojectRecord[]>
}

/**
 * Get an owner by ID.
 */
export function getAnteprojectOwnerById(
  ownerId: string
): AnteprojectOwner | undefined {
  return ANTEPROJECT_OWNERS.find((owner) => owner.id === ownerId)
}
