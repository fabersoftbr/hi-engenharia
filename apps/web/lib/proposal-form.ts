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
    .string({ invalid_type_error: "Código do item é obrigatório" })
    .min(1, "Código do item é obrigatório"),
  description: z
    .string({ invalid_type_error: "Descrição é obrigatória" })
    .min(1, "Descrição é obrigatória"),
  quantity: z
    .number({ invalid_type_error: "Quantidade é obrigatória" })
    .min(1, "Quantidade deve ser maior que zero"),
  unitPrice: z
    .number({ invalid_type_error: "Preço unitário é obrigatório" })
    .min(0, "Preço unitário deve ser maior ou igual a zero"),
  totalPrice: z
    .number({ invalid_type_error: "Preço total é obrigatório" })
    .min(0, "Preço total deve ser maior ou igual a zero"),
})

/**
 * Main proposal form schema.
 */
export const proposalFormSchema = z.object({
  title: z
    .string({ invalid_type_error: "Título é obrigatório" })
    .min(1, "Título é obrigatório"),
  clientName: z
    .string({ invalid_type_error: "Nome do cliente é obrigatório" })
    .min(1, "Nome do cliente é obrigatório"),
  projectDescription: z
    .string({ invalid_type_error: "Descrição do projeto é obrigatória" })
    .min(1, "Descrição do projeto é obrigatória"),
  commercialTerms: z.string().optional(),
  validityDays: z
    .number({ invalid_type_error: "Validade é obrigatória" })
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
export function calculateItemTotal(
  quantity: number,
  unitPrice: number
): number {
  return quantity * unitPrice
}

/**
 * Calculate the grand total for all items.
 */
export function calculateItemsGrandTotal(
  items: ProposalFormValues["items"]
): number {
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
