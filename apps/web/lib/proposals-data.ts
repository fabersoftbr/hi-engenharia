/**
 * Proposals Data Contract
 * Shared mock data and helpers for the proposals module.
 * Consumed by list, detail, and builder components.
 */

/**
 * Status IDs for proposals.
 */
export type ProposalStatus =
  | "rascunho"
  | "em-revisao"
  | "pronta"
  | "enviada"
  | "em-analise-cliente"
  | "aceita"
  | "recusada"

/**
 * Origin types for proposals.
 */
export type ProposalOriginType = "cliente" | "oportunidade" | "anteprojeto"

/**
 * Origin reference for a proposal.
 */
export interface ProposalOrigin {
  type: ProposalOriginType
  id: string | null
  label: string
}

/**
 * Item in a proposal.
 */
export interface ProposalItem {
  id: string
  itemCode: string
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

/**
 * Full record for a proposal.
 */
export interface ProposalRecord {
  id: string
  title: string
  clientName: string
  status: ProposalStatus
  origin: ProposalOrigin
  projectDescription: string
  items: ProposalItem[]
  commercialTerms: string
  validityDays: number
  createdAt: string
  updatedAt: string
}

/**
 * Metadata for each proposal status.
 */
export const PROPOSAL_STATUS_META: Record<
  ProposalStatus,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  rascunho: { label: "Rascunho", variant: "secondary" },
  "em-revisao": { label: "Em revisao", variant: "outline" },
  pronta: { label: "Pronta para envio", variant: "outline" },
  enviada: { label: "Enviada", variant: "default" },
  "em-analise-cliente": { label: "Em analise pelo cliente", variant: "outline" },
  aceita: { label: "Aceita", variant: "default" },
  recusada: { label: "Recusada", variant: "destructive" },
}

/**
 * Seeded proposal records for the mock module.
 */
export const PROPOSALS: ProposalRecord[] = [
  {
    id: "prop-2026-001",
    title: "Proposta comercial - Fazenda solar",
    clientName: "Agro Rural SA",
    status: "em-revisao",
    origin: {
      type: "oportunidade",
      id: "opp-2026-003",
      label: "Fazenda solar - Interior",
    },
    projectDescription:
      "Projeto de grande porte para fazenda com sistema de bombeamento solar integrado. Capacidade de geracao estimada em 3500 kWh/mes.",
    items: [
      {
        id: "item-001",
        itemCode: "SOL-IND-001",
        description: "Modulos solares 550W - Lote 50 unidades",
        quantity: 1,
        unitPrice: 125000,
        totalPrice: 125000,
      },
      {
        id: "item-002",
        itemCode: "INV-IND-001",
        description: "Inversor central 100kW",
        quantity: 1,
        unitPrice: 45000,
        totalPrice: 45000,
      },
      {
        id: "item-003",
        itemCode: "EST-IND-001",
        description: "Estrutura de fixacao solo - Completo",
        quantity: 1,
        unitPrice: 38000,
        totalPrice: 38000,
      },
      {
        id: "item-004",
        itemCode: "SER-INS-IND",
        description: "Servico de instalacao e comissionamento",
        quantity: 1,
        unitPrice: 25000,
        totalPrice: 25000,
      },
    ],
    commercialTerms:
      "Pagamento: 50% na assinatura, 30% na entrega dos materiais, 20% na conclusao.\nGarantia: 25 anos nos modulos, 10 anos no inversor, 5 anos na mao de obra.\nInicio previsto: 15 dias apos assinatura do contrato.\nPrazo de execucao: 45 dias uteis.",
    validityDays: 30,
    createdAt: "2026-03-10T09:00:00Z",
    updatedAt: "2026-03-18T14:30:00Z",
  },
  {
    id: "prop-2026-002",
    title: "Proposta - Condominio residencial",
    clientName: "Condominio Jardim Verde",
    status: "enviada",
    origin: {
      type: "anteprojeto",
      id: "ant-2026-004",
      label: "Condominio residencial",
    },
    projectDescription:
      "Sistema de energia solar para area comum do condominio com 4 torres. Capacidade estimada de 2800 kWh/mes para iluminacao e bombas.",
    items: [
      {
        id: "item-005",
        itemCode: "SOL-COM-001",
        description: "Modulos solares 550W - Lote 30 unidades",
        quantity: 1,
        unitPrice: 75000,
        totalPrice: 75000,
      },
      {
        id: "item-006",
        itemCode: "INV-COM-001",
        description: "Inversor string 60kW",
        quantity: 2,
        unitPrice: 22000,
        totalPrice: 44000,
      },
      {
        id: "item-007",
        itemCode: "EST-COM-001",
        description: "Estrutura de fixacao telhado - Completo",
        quantity: 1,
        unitPrice: 28000,
        totalPrice: 28000,
      },
      {
        id: "item-008",
        itemCode: "SER-INS-COM",
        description: "Servico de instalacao e comissionamento",
        quantity: 1,
        unitPrice: 18000,
        totalPrice: 18000,
      },
    ],
    commercialTerms:
      "Pagamento: 40% na assinatura, 40% na entrega, 20% na conclusao.\nGarantia: 25 anos nos modulos, 10 anos no inversor.\nInicio previsto: 20 dias apos assinatura.\nPrazo de execucao: 30 dias uteis.",
    validityDays: 15,
    createdAt: "2026-03-05T11:00:00Z",
    updatedAt: "2026-03-16T11:30:00Z",
  },
  {
    id: "prop-2026-003",
    title: "Proposta - Industria de alimentos",
    clientName: "Alimentos Premium Ltda",
    status: "em-analise-cliente",
    origin: {
      type: "oportunidade",
      id: "opp-2026-005",
      label: "Industria de alimentos",
    },
    projectDescription:
      "Projeto industrial de grande porte com capacidade de geracao de 8500 kWh/mes. Sistema com monitoramento remoto e integracao com sistemas existentes.",
    items: [
      {
        id: "item-009",
        itemCode: "SOL-IND-002",
        description: "Modulos solares 580W - Lote 100 unidades",
        quantity: 1,
        unitPrice: 280000,
        totalPrice: 280000,
      },
      {
        id: "item-010",
        itemCode: "INV-IND-002",
        description: "Inversor central 250kW",
        quantity: 1,
        unitPrice: 95000,
        totalPrice: 95000,
      },
      {
        id: "item-011",
        itemCode: "EST-IND-002",
        description: "Estrutura de fixacao solo - Grande porte",
        quantity: 1,
        unitPrice: 85000,
        totalPrice: 85000,
      },
      {
        id: "item-012",
        itemCode: "MON-IND-001",
        description: "Sistema de monitoramento remoto",
        quantity: 1,
        unitPrice: 12000,
        totalPrice: 12000,
      },
      {
        id: "item-013",
        itemCode: "SER-INS-IND-GRP",
        description: "Servico de instalacao e comissionamento - Grande porte",
        quantity: 1,
        unitPrice: 48000,
        totalPrice: 48000,
      },
    ],
    commercialTerms:
      "Pagamento: Negociavel conforme volume.\nGarantia: 25 anos nos modulos, 12 anos no inversor, 5 anos mao de obra.\nTreinamento da equipe tecnica incluido.\nPrazo de execucao: 60 dias uteis.",
    validityDays: 30,
    createdAt: "2026-03-02T14:00:00Z",
    updatedAt: "2026-03-15T09:00:00Z",
  },
  {
    id: "prop-2026-004",
    title: "Proposta - Escritorio corporativo",
    clientName: "Tech Solutions SA",
    status: "aceita",
    origin: {
      type: "oportunidade",
      id: "opp-2026-006",
      label: "Escritorio corporativo",
    },
    projectDescription:
      "Sistema solar para escritorio corporativo com foco em sustentabilidade e reducao de custos operacionais. Capacidade de 2200 kWh/mes.",
    items: [
      {
        id: "item-014",
        itemCode: "SOL-COM-002",
        description: "Modulos solares 550W - Lote 24 unidades",
        quantity: 1,
        unitPrice: 60000,
        totalPrice: 60000,
      },
      {
        id: "item-015",
        itemCode: "INV-COM-002",
        description: "Inversor string 50kW",
        quantity: 1,
        unitPrice: 35000,
        totalPrice: 35000,
      },
      {
        id: "item-016",
        itemCode: "EST-COM-002",
        description: "Estrutura de fixacao telhado",
        quantity: 1,
        unitPrice: 22000,
        totalPrice: 22000,
      },
      {
        id: "item-017",
        itemCode: "SER-INS-COM-02",
        description: "Servico de instalacao e comissionamento",
        quantity: 1,
        unitPrice: 15000,
        totalPrice: 15000,
      },
    ],
    commercialTerms:
      "Pagamento: 50% assinatura, 50% conclusao.\nGarantia padrao: 25 anos modulos, 10 anos inversor.\nPrazo: 25 dias uteis.",
    validityDays: 15,
    createdAt: "2026-02-28T10:00:00Z",
    updatedAt: "2026-03-18T15:00:00Z",
  },
  {
    id: "prop-2026-005",
    title: "Proposta - Instalacao residencial",
    clientName: "Familia Oliveira",
    status: "rascunho",
    origin: {
      type: "anteprojeto",
      id: "ant-2026-001",
      label: "Instalacao residencial - Zona Sul",
    },
    projectDescription:
      "Sistema solar residencial com capacidade de 450 kWh/mes. Projeto para telhado com area para 15 modulos.",
    items: [
      {
        id: "item-018",
        itemCode: "SOL-RES-001",
        description: "Modulos solares 550W - Lote 15 unidades",
        quantity: 1,
        unitPrice: 22500,
        totalPrice: 22500,
      },
      {
        id: "item-019",
        itemCode: "INV-RES-001",
        description: "Microinversores - Kit 15 unidades",
        quantity: 1,
        unitPrice: 12000,
        totalPrice: 12000,
      },
      {
        id: "item-020",
        itemCode: "EST-RES-001",
        description: "Estrutura de fixacao telhado residencial",
        quantity: 1,
        unitPrice: 6500,
        totalPrice: 6500,
      },
      {
        id: "item-021",
        itemCode: "SER-INS-RES",
        description: "Servico de instalacao residencial",
        quantity: 1,
        unitPrice: 4500,
        totalPrice: 4500,
      },
    ],
    commercialTerms:
      "Pagamento: A combinar.\nGarantia: 25 anos modulos, 15 anos microinversores.",
    validityDays: 7,
    createdAt: "2026-03-19T09:00:00Z",
    updatedAt: "2026-03-19T09:00:00Z",
  },
]

/**
 * Get all proposals.
 */
export function getProposals(): ProposalRecord[] {
  return PROPOSALS
}

/**
 * Get a single proposal by ID.
 */
export function getProposalById(proposalId: string): ProposalRecord | undefined {
  return PROPOSALS.find((prop) => prop.id === proposalId)
}

/**
 * Get status options for select/filter components.
 */
export function getProposalStatusOptions(): Array<{
  value: ProposalStatus
  label: string
}> {
  return [
    { value: "rascunho", label: "Rascunho" },
    { value: "em-revisao", label: "Em revisao" },
    { value: "pronta", label: "Pronta para envio" },
    { value: "enviada", label: "Enviada" },
    { value: "em-analise-cliente", label: "Em analise pelo cliente" },
    { value: "aceita", label: "Aceita" },
    { value: "recusada", label: "Recusada" },
  ]
}

/**
 * Filter input for proposals.
 */
export interface ProposalFilterInput {
  proposals?: ProposalRecord[]
  statusFilter: string
  searchQuery: string
}

/**
 * Filter proposals based on the provided filters.
 */
export function filterProposals(input: ProposalFilterInput): ProposalRecord[] {
  const source = input.proposals ?? PROPOSALS
  return source.filter((prop) => {
    // Status filter
    if (input.statusFilter !== "all" && prop.status !== input.statusFilter) {
      return false
    }

    // Search filter
    if (input.searchQuery) {
      const query = input.searchQuery.toLowerCase()
      const matchesTitle = prop.title.toLowerCase().includes(query)
      const matchesClient = prop.clientName.toLowerCase().includes(query)
      if (!matchesTitle && !matchesClient) {
        return false
      }
    }

    return true
  })
}

/**
 * Calculate total value of a proposal.
 */
export function calculateProposalTotal(items: ProposalItem[]): number {
  return items.reduce((sum, item) => sum + item.totalPrice, 0)
}

/**
 * Create a draft proposal from an origin.
 */
export function createProposalDraftFromOrigin(origin: ProposalOrigin): Omit<ProposalRecord, "id" | "createdAt" | "updatedAt"> {
  return {
    title: origin.type === "cliente" ? "Nova proposta" : `Proposta - ${origin.label}`,
    clientName: "",
    status: "rascunho",
    origin,
    projectDescription: "",
    items: [],
    commercialTerms: "",
    validityDays: 30,
  }
}
