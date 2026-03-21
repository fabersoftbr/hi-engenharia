import { z } from "zod"

/**
 * Form schema for proposal creation/editing.
 * Validates proposal sections and items.
 */

/**
 * Schema for a single proposal item.
 */
const proposalItemSchema = z.object({
  id: z.string(),
  itemCode: z
    .string({ invalid_type_error: "Codigo do item e obrigatorio" })
    .min(1, "Codigo do item e obrigatorio"),
  description: z
    .string({ invalid_type_error: "Descricao e obrigatoria" })
    .min(1, "Descricao e obrigatoria"),
  quantity: z
    .number({ invalid_type_error: "Quantidade e obrigatoria" })
    .min(1, "Quantidade deve ser maior que zero"),
  unitPrice: z
    .number({ invalid_type_error: "Preco unitario e obrigatorio" })
    .min(0, "Preco unitario deve ser maior ou igual a zero"),
  totalPrice: z
    .number({ invalid_type_error: "Preco total e obrigatorio" })
    .min(0, "Preco total deve ser maior ou igual a zero"),
})

/**
 * Main proposal form schema.
 */
export const proposalFormSchema = z.object({
  title: z
    .string({ invalid_type_error: "Titulo e obrigatorio" })
    .min(1, "Titulo e obrigatorio"),
  clientName: z
    .string({ invalid_type_error: "Nome do cliente e obrigatorio" })
    .min(1, "Nome do cliente e obrigatorio"),
  projectDescription: z
    .string({ invalid_type_error: "Descricao do projeto e obrigatoria" })
    .min(1, "Descricao do projeto e obrigatoria"),
  commercialTerms: z.string().optional(),
  validityDays: z
    .number({ invalid_type_error: "Validade e obrigatoria" })
    .min(1, "Validade deve ser maior que zero"),
  items: z.array(proposalItemSchema).min(1, "Adicione pelo menos um item"),
})

export type ProposalFormValues = z.infer<typeof proposalFormSchema>

/**
 * Default values for a new proposal form.
 */
export const proposalFormDefaultValues: Partial<ProposalFormValues> = {
  title: "",
  clientName: "",
  projectDescription: "",
  commercialTerms: "",
  validityDays: 30,
  items: [],
}

/**
 * Generate a unique ID for a proposal item.
 */
export function generateProposalItemId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Calculate total price for an item.
 */
export function calculateItemTotal(quantity: number, unitPrice: number): number {
  return quantity * unitPrice
}

/**
 * Calculate the grand total for all items.
 */
export function calculateItemsGrandTotal(items: ProposalFormValues["items"]): number {
  return items.reduce((sum, item) => sum + item.totalPrice, 0)
}

/**
 * Validity options for the select dropdown.
 */
export const VALIDITY_OPTIONS = [
  { value: 7, label: "7 dias" },
  { value: 15, label: "15 dias" },
  { value: 30, label: "30 dias" },
]
