/**
 * Proposals Data Contract
 * Shared mock data and helpers for the proposals module.
 * Consumed by list, detail, and builder components.
 */

export { formatCurrency } from "@/lib/utils/format"

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
  {
    label: string
    variant: "default" | "secondary" | "outline" | "destructive"
  }
> = {
  rascunho: { label: "Rascunho", variant: "secondary" },
  "em-revisao": { label: "Em revisão", variant: "outline" },
  pronta: { label: "Pronta para envio", variant: "outline" },
  enviada: { label: "Enviada", variant: "default" },
  "em-analise-cliente": {
    label: "Em análise pelo cliente",
    variant: "outline",
  },
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
      "Projeto de grande porte para fazenda com sistema de bombeamento solar integrado. Capacidade de geração estimada em 3500 kWh/mês.",
    items: [
      {
        id: "item-001",
        itemCode: "SOL-IND-001",
        description: "Módulos solares 550W - Lote 50 unidades",
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
        description: "Estrutura de fixação solo - Completo",
        quantity: 1,
        unitPrice: 38000,
        totalPrice: 38000,
      },
      {
        id: "item-004",
        itemCode: "SER-INS-IND",
        description: "Serviço de instalação e comissionamento",
        quantity: 1,
        unitPrice: 25000,
        totalPrice: 25000,
      },
    ],
    commercialTerms:
      "Pagamento: 50% na assinatura, 30% na entrega dos materiais, 20% na conclusão.\nGarantia: 25 anos nos módulos, 10 anos no inversor, 5 anos na mão de obra.\nInício previsto: 15 dias após assinatura do contrato.\nPrazo de execução: 45 dias úteis.",
    validityDays: 30,
    createdAt: "2026-03-10T09:00:00Z",
    updatedAt: "2026-03-18T14:30:00Z",
  },
  {
    id: "prop-2026-002",
    title: "Proposta - Condomínio residencial",
    clientName: "Condomínio Jardim Verde",
    status: "enviada",
    origin: {
      type: "anteprojeto",
      id: "ant-2026-004",
      label: "Condomínio residencial",
    },
    projectDescription:
      "Sistema de energia solar para área comum do condomínio com 4 torres. Capacidade estimada de 2800 kWh/mês para iluminação e bombas.",
    items: [
      {
        id: "item-005",
        itemCode: "SOL-COM-001",
        description: "Módulos solares 550W - Lote 30 unidades",
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
        description: "Estrutura de fixação telhado - Completo",
        quantity: 1,
        unitPrice: 28000,
        totalPrice: 28000,
      },
      {
        id: "item-008",
        itemCode: "SER-INS-COM",
        description: "Serviço de instalação e comissionamento",
        quantity: 1,
        unitPrice: 18000,
        totalPrice: 18000,
      },
    ],
    commercialTerms:
      "Pagamento: 40% na assinatura, 40% na entrega, 20% na conclusão.\nGarantia: 25 anos nos módulos, 10 anos no inversor.\nInício previsto: 20 dias após assinatura.\nPrazo de execução: 30 dias úteis.",
    validityDays: 15,
    createdAt: "2026-03-05T11:00:00Z",
    updatedAt: "2026-03-16T11:30:00Z",
  },
  {
    id: "prop-2026-003",
    title: "Proposta - Indústria de alimentos",
    clientName: "Alimentos Premium Ltda",
    status: "em-analise-cliente",
    origin: {
      type: "oportunidade",
      id: "opp-2026-005",
      label: "Indústria de alimentos",
    },
    projectDescription:
      "Projeto industrial de grande porte com capacidade de geração de 8500 kWh/mês. Sistema com monitoramento remoto e integração com sistemas existentes.",
    items: [
      {
        id: "item-009",
        itemCode: "SOL-IND-002",
        description: "Módulos solares 580W - Lote 100 unidades",
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
        description: "Estrutura de fixação solo - Grande porte",
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
        description: "Serviço de instalação e comissionamento - Grande porte",
        quantity: 1,
        unitPrice: 48000,
        totalPrice: 48000,
      },
    ],
    commercialTerms:
      "Pagamento: Negociável conforme volume.\nGarantia: 25 anos nos módulos, 12 anos no inversor, 5 anos de mão de obra.\nTreinamento da equipe técnica incluído.\nPrazo de execução: 60 dias úteis.",
    validityDays: 30,
    createdAt: "2026-03-02T14:00:00Z",
    updatedAt: "2026-03-15T09:00:00Z",
  },
  {
    id: "prop-2026-004",
    title: "Proposta - Escritório corporativo",
    clientName: "Tech Solutions SA",
    status: "aceita",
    origin: {
      type: "oportunidade",
      id: "opp-2026-006",
      label: "Escritório corporativo",
    },
    projectDescription:
      "Sistema solar para escritório corporativo com foco em sustentabilidade e redução de custos operacionais. Capacidade de 2200 kWh/mês.",
    items: [
      {
        id: "item-014",
        itemCode: "SOL-COM-002",
        description: "Módulos solares 550W - Lote 24 unidades",
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
        description: "Estrutura de fixação telhado",
        quantity: 1,
        unitPrice: 22000,
        totalPrice: 22000,
      },
      {
        id: "item-017",
        itemCode: "SER-INS-COM-02",
        description: "Serviço de instalação e comissionamento",
        quantity: 1,
        unitPrice: 15000,
        totalPrice: 15000,
      },
    ],
    commercialTerms:
      "Pagamento: 50% assinatura, 50% conclusão.\nGarantia padrão: 25 anos módulos, 10 anos inversor.\nPrazo: 25 dias úteis.",
    validityDays: 15,
    createdAt: "2026-02-28T10:00:00Z",
    updatedAt: "2026-03-18T15:00:00Z",
  },
  {
    id: "prop-2026-005",
    title: "Proposta - Instalação residencial",
    clientName: "Família Oliveira",
    status: "rascunho",
    origin: {
      type: "anteprojeto",
      id: "ant-2026-001",
      label: "Instalação residencial - Zona Sul",
    },
    projectDescription:
      "Sistema solar residencial com capacidade de 450 kWh/mês. Projeto para telhado com área para 15 módulos.",
    items: [
      {
        id: "item-018",
        itemCode: "SOL-RES-001",
        description: "Módulos solares 550W - Lote 15 unidades",
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
        description: "Estrutura de fixação telhado residencial",
        quantity: 1,
        unitPrice: 6500,
        totalPrice: 6500,
      },
      {
        id: "item-021",
        itemCode: "SER-INS-RES",
        description: "Serviço de instalação residencial",
        quantity: 1,
        unitPrice: 4500,
        totalPrice: 4500,
      },
    ],
    commercialTerms:
      "Pagamento: A combinar.\nGarantia: 25 anos módulos, 15 anos microinversores.",
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
export function getProposalById(
  proposalId: string
): ProposalRecord | undefined {
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
    { value: "em-revisao", label: "Em revisão" },
    { value: "pronta", label: "Pronta para envio" },
    { value: "enviada", label: "Enviada" },
    { value: "em-analise-cliente", label: "Em análise pelo cliente" },
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
export function createProposalDraftFromOrigin(
  origin: ProposalOrigin
): Omit<ProposalRecord, "id" | "createdAt" | "updatedAt"> {
  return {
    title:
      origin.type === "cliente"
        ? "Nova proposta"
        : `Proposta - ${origin.label}`,
    clientName: "",
    status: "rascunho",
    origin,
    projectDescription: "",
    items: [],
    commercialTerms: "",
    validityDays: 30,
  }
}
