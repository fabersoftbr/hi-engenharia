/**
 * Projects Data Contract
 * Shared mock data and helpers for the projetos module.
 * Consumed by list, detail, pipeline, and acompanhamento components.
 */

/**
 * Project type IDs.
 */
export type ProjectType =
  | "residencial"
  | "comercial"
  | "industrial"
  | "rural"
  | "condominio"

/**
 * Project status IDs.
 */
export type ProjectStatus =
  | "contrato"
  | "em-andamento"
  | "concluido"
  | "pausado"
  | "cancelado"

/**
 * Work stage IDs for the obras pipeline (11 stages).
 */
export type WorkStageId =
  | "contrato"
  | "engenharia"
  | "aprovacoes"
  | "compras"
  | "mobilizacao"
  | "execucao"
  | "testes"
  | "aceite"
  | "documentacao"
  | "encerramento"
  | "entrega"

/**
 * Owner of a project.
 */
export interface ProjectOwner {
  id: string
  name: string
  initials: string
}

/**
 * Attachment metadata for a project.
 */
export interface ProjectAttachment {
  id: string
  name: string
  type: string
  size: number
}

/**
 * Milestone for obra acompanhamento.
 */
export interface ProjectMilestone {
  id: string
  name: string
  startDate: string
  endDate: string
  status: "concluido" | "em-andamento" | "pendente"
  responsibleId: string
  notes?: string
}

/**
 * Timeline entry for project history.
 */
export interface ProjectHistoryEntry {
  stage: WorkStageId
  changedAt: string
  changedBy: string
  notes?: string
}

/**
 * Full record for a project.
 */
export interface ProjectRecord {
  id: string
  title: string
  clientName: string
  type: ProjectType
  status: ProjectStatus
  ownerId: string
  stage: WorkStageId
  proposalId: string | null
  anteprojectId: string | null
  location: string
  powerKwp: number
  startDate: string
  plannedEndDate: string
  progressPercent: number
  attachments: ProjectAttachment[]
  milestones: ProjectMilestone[]
  history: ProjectHistoryEntry[]
}

/**
 * Metadata for each project type.
 */
export const PROJECT_TYPES: Record<
  ProjectType,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  residencial: { label: "Residencial", variant: "secondary" },
  comercial: { label: "Comercial", variant: "outline" },
  industrial: { label: "Industrial", variant: "default" },
  rural: { label: "Rural", variant: "outline" },
  condominio: { label: "Condominio", variant: "secondary" },
}

/**
 * Metadata for each project status.
 */
export const PROJECT_STATUS_META: Record<
  ProjectStatus,
  {
    label: string
    variant: "default" | "secondary" | "destructive" | "outline"
  }
> = {
  contrato: { label: "Contrato", variant: "secondary" },
  "em-andamento": { label: "Em andamento", variant: "default" },
  concluido: { label: "Concluido", variant: "default" },
  pausado: { label: "Pausado", variant: "outline" },
  cancelado: { label: "Cancelado", variant: "destructive" },
}

/**
 * Ordered list of work stage IDs for the pipeline.
 */
export const WORK_STAGE_ORDER: WorkStageId[] = [
  "contrato",
  "engenharia",
  "aprovacoes",
  "compras",
  "mobilizacao",
  "execucao",
  "testes",
  "aceite",
  "documentacao",
  "encerramento",
  "entrega",
]

/**
 * Metadata for each work stage.
 */
export const WORK_STAGE_META: Record<
  WorkStageId,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  contrato: { label: "Contrato", variant: "secondary" },
  engenharia: { label: "Engenharia", variant: "secondary" },
  aprovacoes: { label: "Aprovacoes", variant: "secondary" },
  compras: { label: "Compras", variant: "outline" },
  mobilizacao: { label: "Mobilizacao", variant: "outline" },
  execucao: { label: "Execucao", variant: "default" },
  testes: { label: "Testes", variant: "outline" },
  aceite: { label: "Aceite", variant: "outline" },
  documentacao: { label: "Documentacao", variant: "outline" },
  encerramento: { label: "Encerramento", variant: "outline" },
  entrega: { label: "Entrega", variant: "default" },
}

/**
 * Seeded project owners for the mock module.
 */
export const PROJECT_OWNERS: ProjectOwner[] = [
  { id: "owner-1", name: "Carlos Silva", initials: "CS" },
  { id: "owner-2", name: "Ana Santos", initials: "AS" },
  { id: "owner-3", name: "Bruno Lima", initials: "BL" },
]

/**
 * Seeded project records for the mock module.
 * At least one record per work stage (11 projects minimum).
 */
export const PROJECTS: ProjectRecord[] = [
  {
    id: "proj-2026-001",
    title: "Instalacao residencial - Zona Sul",
    clientName: "Familia Oliveira",
    type: "residencial",
    status: "em-andamento",
    ownerId: "owner-1",
    stage: "contrato",
    proposalId: "prop-2026-001",
    anteprojectId: "ant-2026-001",
    location: "Sao Paulo, SP",
    powerKwp: 8.5,
    startDate: "2026-03-15",
    plannedEndDate: "2026-05-15",
    progressPercent: 9,
    attachments: [
      {
        id: "att-001",
        name: "contrato_assinado.pdf",
        type: "application/pdf",
        size: 450000,
      },
    ],
    milestones: [
      {
        id: "ms-001-1",
        name: "Assinatura do contrato",
        startDate: "2026-03-15",
        endDate: "2026-03-15",
        status: "concluido",
        responsibleId: "owner-1",
      },
      {
        id: "ms-001-2",
        name: "Projeto eletrico",
        startDate: "2026-03-20",
        endDate: "2026-04-05",
        status: "pendente",
        responsibleId: "owner-1",
      },
    ],
    history: [
      {
        stage: "contrato",
        changedAt: "2026-03-15T10:00:00Z",
        changedBy: "owner-1",
        notes: "Contrato assinado",
      },
    ],
  },
  {
    id: "proj-2026-002",
    title: "Projeto comercial - Centro",
    clientName: "Comercio XYZ Ltda",
    type: "comercial",
    status: "em-andamento",
    ownerId: "owner-2",
    stage: "engenharia",
    proposalId: "prop-2026-002",
    anteprojectId: "ant-2026-002",
    location: "Campinas, SP",
    powerKwp: 25.0,
    startDate: "2026-03-01",
    plannedEndDate: "2026-06-30",
    progressPercent: 18,
    attachments: [
      {
        id: "att-002",
        name: "memorial_descritivo.pdf",
        type: "application/pdf",
        size: 890000,
      },
    ],
    milestones: [
      {
        id: "ms-002-1",
        name: "Estudo de viabilidade",
        startDate: "2026-03-01",
        endDate: "2026-03-10",
        status: "concluido",
        responsibleId: "owner-2",
      },
      {
        id: "ms-002-2",
        name: "Projeto estrutural",
        startDate: "2026-03-15",
        endDate: "2026-04-15",
        status: "em-andamento",
        responsibleId: "owner-2",
      },
    ],
    history: [
      {
        stage: "contrato",
        changedAt: "2026-03-01T09:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "engenharia",
        changedAt: "2026-03-10T14:00:00Z",
        changedBy: "owner-2",
        notes: "Iniciada fase de engenharia",
      },
    ],
  },
  {
    id: "proj-2026-003",
    title: "Fazenda solar - Interior",
    clientName: "Agro Rural SA",
    type: "rural",
    status: "em-andamento",
    ownerId: "owner-1",
    stage: "aprovacoes",
    proposalId: "prop-2026-003",
    anteprojectId: "ant-2026-003",
    location: "Ribeirao Preto, SP",
    powerKwp: 150.0,
    startDate: "2026-02-15",
    plannedEndDate: "2026-08-15",
    progressPercent: 27,
    attachments: [
      {
        id: "att-003",
        name: "art_projeto.pdf",
        type: "application/pdf",
        size: 320000,
      },
      {
        id: "att-004",
        name: "licenca_ambiental.pdf",
        type: "application/pdf",
        size: 560000,
      },
    ],
    milestones: [
      {
        id: "ms-003-1",
        name: "Aprovacao da concessionaria",
        startDate: "2026-03-01",
        endDate: "2026-04-15",
        status: "em-andamento",
        responsibleId: "owner-1",
      },
    ],
    history: [
      {
        stage: "contrato",
        changedAt: "2026-02-15T08:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "engenharia",
        changedAt: "2026-02-25T10:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "aprovacoes",
        changedAt: "2026-03-05T09:00:00Z",
        changedBy: "owner-1",
        notes: "Aguardando aprovacoes",
      },
    ],
  },
  {
    id: "proj-2026-004",
    title: "Condominio residencial",
    clientName: "Condominio Jardim Verde",
    type: "condominio",
    status: "em-andamento",
    ownerId: "owner-3",
    stage: "compras",
    proposalId: "prop-2026-004",
    anteprojectId: "ant-2026-004",
    location: "Santos, SP",
    powerKwp: 80.0,
    startDate: "2026-01-20",
    plannedEndDate: "2026-07-20",
    progressPercent: 36,
    attachments: [],
    milestones: [],
    history: [
      {
        stage: "contrato",
        changedAt: "2026-01-20T10:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "engenharia",
        changedAt: "2026-02-01T09:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "aprovacoes",
        changedAt: "2026-02-15T11:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "compras",
        changedAt: "2026-03-01T14:00:00Z",
        changedBy: "owner-3",
        notes: "Equipamentos em processo de aquisicao",
      },
    ],
  },
  {
    id: "proj-2026-005",
    title: "Industria de alimentos",
    clientName: "Alimentos Premium Ltda",
    type: "industrial",
    status: "em-andamento",
    ownerId: "owner-2",
    stage: "mobilizacao",
    proposalId: "prop-2026-005",
    anteprojectId: "ant-2026-005",
    location: "Sorocaba, SP",
    powerKwp: 200.0,
    startDate: "2025-12-10",
    plannedEndDate: "2026-06-10",
    progressPercent: 45,
    attachments: [],
    milestones: [],
    history: [
      {
        stage: "contrato",
        changedAt: "2025-12-10T08:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "engenharia",
        changedAt: "2025-12-20T10:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "aprovacoes",
        changedAt: "2026-01-10T09:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "compras",
        changedAt: "2026-01-25T11:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "mobilizacao",
        changedAt: "2026-02-20T14:00:00Z",
        changedBy: "owner-2",
        notes: "Equipe mobilizada para o canteiro de obras",
      },
    ],
  },
  {
    id: "proj-2026-006",
    title: "Escritorio corporativo",
    clientName: "Tech Solutions SA",
    type: "comercial",
    status: "em-andamento",
    ownerId: "owner-1",
    stage: "execucao",
    proposalId: "prop-2026-006",
    anteprojectId: "ant-2026-006",
    location: "Sao Paulo, SP",
    powerKwp: 45.0,
    startDate: "2025-11-01",
    plannedEndDate: "2026-05-01",
    progressPercent: 55,
    attachments: [],
    milestones: [],
    history: [
      {
        stage: "contrato",
        changedAt: "2025-11-01T08:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "engenharia",
        changedAt: "2025-11-10T09:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "aprovacoes",
        changedAt: "2025-11-25T10:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "compras",
        changedAt: "2025-12-10T11:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "mobilizacao",
        changedAt: "2025-12-20T14:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "execucao",
        changedAt: "2026-01-05T08:00:00Z",
        changedBy: "owner-1",
        notes: "Inicio da instalacao",
      },
    ],
  },
  {
    id: "proj-2026-007",
    title: "Hospital regional",
    clientName: "Hospital Saude Total",
    type: "comercial",
    status: "em-andamento",
    ownerId: "owner-3",
    stage: "testes",
    proposalId: "prop-2026-007",
    anteprojectId: null,
    location: "Guarulhos, SP",
    powerKwp: 120.0,
    startDate: "2025-09-15",
    plannedEndDate: "2026-04-15",
    progressPercent: 64,
    attachments: [],
    milestones: [],
    history: [
      {
        stage: "contrato",
        changedAt: "2025-09-15T08:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "engenharia",
        changedAt: "2025-09-25T09:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "aprovacoes",
        changedAt: "2025-10-10T10:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "compras",
        changedAt: "2025-10-25T11:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "mobilizacao",
        changedAt: "2025-11-05T14:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "execucao",
        changedAt: "2025-11-15T08:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "testes",
        changedAt: "2026-03-01T09:00:00Z",
        changedBy: "owner-3",
        notes: "Em fase de testes e comissionamento",
      },
    ],
  },
  {
    id: "proj-2026-008",
    title: "Escola particular",
    clientName: "Colegio Futuro Brilhante",
    type: "comercial",
    status: "em-andamento",
    ownerId: "owner-2",
    stage: "aceite",
    proposalId: "prop-2026-008",
    anteprojectId: null,
    location: "Sao Jose dos Campos, SP",
    powerKwp: 35.0,
    startDate: "2025-08-01",
    plannedEndDate: "2026-03-30",
    progressPercent: 73,
    attachments: [],
    milestones: [],
    history: [
      {
        stage: "contrato",
        changedAt: "2025-08-01T08:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "engenharia",
        changedAt: "2025-08-15T09:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "aprovacoes",
        changedAt: "2025-09-01T10:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "compras",
        changedAt: "2025-09-15T11:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "mobilizacao",
        changedAt: "2025-10-01T14:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "execucao",
        changedAt: "2025-10-15T08:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "testes",
        changedAt: "2026-02-01T09:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "aceite",
        changedAt: "2026-03-10T10:00:00Z",
        changedBy: "owner-2",
        notes: "Aguardando aceite final do cliente",
      },
    ],
  },
  {
    id: "proj-2026-009",
    title: "Shopping center - Area comum",
    clientName: "Shopping Center Plaza",
    type: "comercial",
    status: "em-andamento",
    ownerId: "owner-1",
    stage: "documentacao",
    proposalId: "prop-2026-009",
    anteprojectId: null,
    location: "Sao Paulo, SP",
    powerKwp: 180.0,
    startDate: "2025-06-01",
    plannedEndDate: "2026-04-01",
    progressPercent: 82,
    attachments: [],
    milestones: [],
    history: [
      {
        stage: "contrato",
        changedAt: "2025-06-01T08:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "engenharia",
        changedAt: "2025-06-15T09:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "aprovacoes",
        changedAt: "2025-07-01T10:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "compras",
        changedAt: "2025-07-15T11:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "mobilizacao",
        changedAt: "2025-08-01T14:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "execucao",
        changedAt: "2025-08-15T08:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "testes",
        changedAt: "2025-12-01T09:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "aceite",
        changedAt: "2026-01-15T10:00:00Z",
        changedBy: "owner-1",
      },
      {
        stage: "documentacao",
        changedAt: "2026-02-15T11:00:00Z",
        changedBy: "owner-1",
        notes: "Documentacao final em elaboracao",
      },
    ],
  },
  {
    id: "proj-2026-010",
    title: "Residencia de luxo - Alphaville",
    clientName: "Residencia Medeiros",
    type: "residencial",
    status: "em-andamento",
    ownerId: "owner-3",
    stage: "encerramento",
    proposalId: "prop-2026-010",
    anteprojectId: null,
    location: "Barueri, SP",
    powerKwp: 22.0,
    startDate: "2025-04-01",
    plannedEndDate: "2026-03-25",
    progressPercent: 91,
    attachments: [],
    milestones: [],
    history: [
      {
        stage: "contrato",
        changedAt: "2025-04-01T08:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "engenharia",
        changedAt: "2025-04-15T09:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "aprovacoes",
        changedAt: "2025-05-01T10:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "compras",
        changedAt: "2025-05-15T11:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "mobilizacao",
        changedAt: "2025-06-01T14:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "execucao",
        changedAt: "2025-06-15T08:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "testes",
        changedAt: "2025-10-01T09:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "aceite",
        changedAt: "2025-11-01T10:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "documentacao",
        changedAt: "2026-01-01T11:00:00Z",
        changedBy: "owner-3",
      },
      {
        stage: "encerramento",
        changedAt: "2026-02-01T14:00:00Z",
        changedBy: "owner-3",
        notes: "Encerramento contratual em andamento",
      },
    ],
  },
  {
    id: "proj-2026-011",
    title: "Fabrica de moveis",
    clientName: "Moveis Artesanais Ltda",
    type: "industrial",
    status: "concluido",
    ownerId: "owner-2",
    stage: "entrega",
    proposalId: "prop-2026-011",
    anteprojectId: null,
    location: "Bauru, SP",
    powerKwp: 95.0,
    startDate: "2025-01-15",
    plannedEndDate: "2026-02-15",
    progressPercent: 100,
    attachments: [],
    milestones: [],
    history: [
      {
        stage: "contrato",
        changedAt: "2025-01-15T08:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "engenharia",
        changedAt: "2025-02-01T09:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "aprovacoes",
        changedAt: "2025-03-01T10:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "compras",
        changedAt: "2025-03-15T11:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "mobilizacao",
        changedAt: "2025-04-01T14:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "execucao",
        changedAt: "2025-04-15T08:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "testes",
        changedAt: "2025-08-01T09:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "aceite",
        changedAt: "2025-09-01T10:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "documentacao",
        changedAt: "2025-10-01T11:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "encerramento",
        changedAt: "2025-11-01T14:00:00Z",
        changedBy: "owner-2",
      },
      {
        stage: "entrega",
        changedAt: "2026-02-15T09:00:00Z",
        changedBy: "owner-2",
        notes: "Projeto entregue com sucesso",
      },
    ],
  },
]

/**
 * Get all projects.
 */
export function getProjects(): ProjectRecord[] {
  return PROJECTS
}

/**
 * Get a single project by ID.
 */
export function getProjectById(projectId: string): ProjectRecord | undefined {
  return PROJECTS.find((proj) => proj.id === projectId)
}

/**
 * Get project type options for select/filter components.
 */
export function getProjectTypeOptions(): Array<{
  value: ProjectType | "all"
  label: string
}> {
  return [
    { value: "all", label: "Todos os tipos" },
    ...Object.entries(PROJECT_TYPES).map(([id, meta]) => ({
      value: id as ProjectType,
      label: meta.label,
    })),
  ]
}

/**
 * Get project status options for select/filter components.
 */
export function getProjectStatusOptions(): Array<{
  value: ProjectStatus | "all"
  label: string
}> {
  return [
    { value: "all", label: "Todos os status" },
    ...Object.entries(PROJECT_STATUS_META).map(([id, meta]) => ({
      value: id as ProjectStatus,
      label: meta.label,
    })),
  ]
}

/**
 * Get responsible options for select/filter components.
 */
export function getProjectResponsibleOptions(): Array<{
  value: string
  label: string
}> {
  return [
    { value: "all", label: "Todos os responsaveis" },
    ...PROJECT_OWNERS.map((owner) => ({
      value: owner.id,
      label: owner.name,
    })),
  ]
}

/**
 * Filter input for projects.
 */
export interface ProjectFilterInput {
  projects?: ProjectRecord[]
  typeFilter: string
  statusFilter: string
  responsibleFilter: string
  searchQuery: string
}

/**
 * Filter projects based on the provided filters.
 */
export function filterProjects(input: ProjectFilterInput): ProjectRecord[] {
  const source = input.projects ?? PROJECTS
  return source.filter((proj) => {
    // Type filter
    if (input.typeFilter !== "all" && proj.type !== input.typeFilter) {
      return false
    }

    // Status filter
    if (input.statusFilter !== "all" && proj.status !== input.statusFilter) {
      return false
    }

    // Responsible filter
    if (
      input.responsibleFilter !== "all" &&
      proj.ownerId !== input.responsibleFilter
    ) {
      return false
    }

    // Search filter
    if (input.searchQuery) {
      const query = input.searchQuery.toLowerCase()
      const matchesTitle = proj.title.toLowerCase().includes(query)
      const matchesClient = proj.clientName.toLowerCase().includes(query)
      if (!matchesTitle && !matchesClient) {
        return false
      }
    }

    return true
  })
}

/**
 * Group projects by work stage.
 */
export function groupProjectsByStage(
  projects: ProjectRecord[]
): Record<WorkStageId, ProjectRecord[]> {
  const grouped: Partial<Record<WorkStageId, ProjectRecord[]>> = {}

  for (const stageId of WORK_STAGE_ORDER) {
    grouped[stageId] = []
  }

  for (const proj of projects) {
    if (grouped[proj.stage]) {
      grouped[proj.stage]!.push(proj)
    }
  }

  return grouped as Record<WorkStageId, ProjectRecord[]>
}

/**
 * Get progress percentage based on work stage position.
 */
export function getProjectProgress(stageId: WorkStageId): number {
  const stageIndex = WORK_STAGE_ORDER.indexOf(stageId)
  if (stageIndex === -1) return 0
  return Math.round(((stageIndex + 1) / WORK_STAGE_ORDER.length) * 100)
}

/**
 * Get an owner by ID.
 */
export function getProjectOwnerById(ownerId: string): ProjectOwner | undefined {
  return PROJECT_OWNERS.find((owner) => owner.id === ownerId)
}
