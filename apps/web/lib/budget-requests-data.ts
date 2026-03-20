/**
 * Budget Requests Data Contract
 * Shared mock data and helpers for the orcamentos module.
 * Consumed by list, detail, and form components.
 */

/**
 * Status values for budget requests.
 */
export type BudgetRequestStatus = "novo" | "em-analise" | "aprovado" | "recusado"

/**
 * Metadata for each status, including label and badge variant.
 */
export const BUDGET_REQUEST_STATUS_META: Record<
  BudgetRequestStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  novo: { label: "Novo", variant: "default" },
  "em-analise": { label: "Em analise", variant: "secondary" },
  aprovado: { label: "Aprovado", variant: "outline" },
  recusado: { label: "Recusado", variant: "destructive" },
}

/**
 * Attachment metadata for a budget request.
 */
export interface BudgetRequestAttachment {
  id: string
  name: string
  type: string
  size: number
}

/**
 * Full record for a budget request.
 */
export interface BudgetRequestRecord {
  id: string
  clientName: string
  phone: string
  city: string
  requestedAt: string
  status: BudgetRequestStatus
  monthlyConsumption: number | null
  notes: string
  attachments: BudgetRequestAttachment[]
}

/**
 * Seeded budget request records for the mock module.
 */
export const BUDGET_REQUESTS: BudgetRequestRecord[] = [
  {
    id: "orc-2026-1001",
    clientName: "Maria Silva",
    phone: "(11) 99999-1234",
    city: "Sao Paulo",
    requestedAt: "2026-03-15T10:30:00Z",
    status: "novo",
    monthlyConsumption: 450,
    notes: "Cliente interessado em instalacao solar residencial.",
    attachments: [
      {
        id: "att-001",
        name: "conta_energia_marco.pdf",
        type: "application/pdf",
        size: 245000,
      },
    ],
  },
  {
    id: "orc-2026-1002",
    clientName: "Joao Santos",
    phone: "(21) 98888-5678",
    city: "Rio de Janeiro",
    requestedAt: "2026-03-14T14:15:00Z",
    status: "em-analise",
    monthlyConsumption: 780,
    notes: "Propriedade comercial com telhado grande. Aguardando visita tecnica.",
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
  },
  {
    id: "orc-2026-1003",
    clientName: "Ana Oliveira",
    phone: "(31) 97777-9012",
    city: "Belo Horizonte",
    requestedAt: "2026-03-13T09:45:00Z",
    status: "aprovado",
    monthlyConsumption: 320,
    notes: "Projeto aprovado. Aguardando assinatura do contrato.",
    attachments: [
      {
        id: "att-004",
        name: "planta_casa.pdf",
        type: "application/pdf",
        size: 890000,
      },
    ],
  },
  {
    id: "orc-2026-1004",
    clientName: "Carlos Ferreira",
    phone: "(41) 96666-3456",
    city: "Curitiba",
    requestedAt: "2026-03-12T16:20:00Z",
    status: "recusado",
    monthlyConsumption: 150,
    notes: "Consumo muito baixo para viabilizar o projeto.",
    attachments: [],
  },
  {
    id: "orc-2026-1005",
    clientName: "Patricia Lima",
    phone: "(51) 95555-7890",
    city: "Porto Alegre",
    requestedAt: "2026-03-11T11:00:00Z",
    status: "em-analise",
    monthlyConsumption: 620,
    notes: "Cliente com interesse em financiamento. Verificar opcoes.",
    attachments: [
      {
        id: "att-005",
        name: "documento_rg.pdf",
        type: "application/pdf",
        size: 156000,
      },
      {
        id: "att-006",
        name: "comprovante_renda.pdf",
        type: "application/pdf",
        size: 234000,
      },
    ],
  },
  {
    id: "orc-2026-9001",
    clientName: "Novo Cliente",
    phone: "(00) 00000-0000",
    city: "Cidade",
    requestedAt: "2026-03-20T00:00:00Z",
    status: "novo",
    monthlyConsumption: null,
    notes: "Solicitacao recem-enviada pelo formulario.",
    attachments: [],
  },
]

/**
 * Preview ID for the confirmation flow after form submission.
 */
export const PREVIEW_SUBMITTED_REQUEST_ID = "orc-2026-9001"

/**
 * Get all budget requests.
 */
export function getBudgetRequests(): BudgetRequestRecord[] {
  return BUDGET_REQUESTS
}

/**
 * Get a single budget request by ID.
 */
export function getBudgetRequestById(requestId: string): BudgetRequestRecord | undefined {
  return BUDGET_REQUESTS.find((req) => req.id === requestId)
}

/**
 * Get status options for select/filter components.
 */
export function getBudgetRequestStatusOptions(): Array<{
  value: BudgetRequestStatus
  label: string
}> {
  return Object.entries(BUDGET_REQUEST_STATUS_META).map(([value, meta]) => ({
    value: value as BudgetRequestStatus,
    label: meta.label,
  }))
}
