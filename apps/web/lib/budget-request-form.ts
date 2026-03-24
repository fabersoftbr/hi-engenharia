import { z } from "zod"

/**
 * Form schema for budget request creation.
 * Validates required client and consumption fields.
 */
export const budgetRequestFormSchema = z.object({
  clientName: z
    .string({ invalid_type_error: "Nome é obrigatório" })
    .min(1, "Nome é obrigatório"),
  phone: z
    .string({ invalid_type_error: "Telefone é obrigatório" })
    .min(1, "Telefone é obrigatório"),
  city: z
    .string({ invalid_type_error: "Cidade é obrigatória" })
    .min(1, "Cidade é obrigatória"),
  monthlyConsumption: z
    .number({ invalid_type_error: "Consumo mensal é obrigatório" })
    .min(1, "Consumo mensal é obrigatório"),
  notes: z.string().optional(),
})

export type BudgetRequestFormValues = z.infer<typeof budgetRequestFormSchema>

export const budgetRequestFormDefaultValues: Partial<BudgetRequestFormValues> =
  {
    clientName: "",
    phone: "",
    city: "",
    monthlyConsumption: undefined,
    notes: "",
  }
