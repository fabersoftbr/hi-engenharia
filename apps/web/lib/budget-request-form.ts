import { z } from "zod"

/**
 * Form schema for budget request creation.
 * Validates required client and consumption fields.
 */
export const budgetRequestFormSchema = z.object({
  clientName: z
    .string({ invalid_type_error: "Nome e obrigatorio" })
    .min(1, "Nome e obrigatorio"),
  phone: z
    .string({ invalid_type_error: "Telefone e obrigatorio" })
    .min(1, "Telefone e obrigatorio"),
  city: z
    .string({ invalid_type_error: "Cidade e obrigatoria" })
    .min(1, "Cidade e obrigatoria"),
  monthlyConsumption: z
    .number({ invalid_type_error: "Consumo mensal e obrigatorio" })
    .min(1, "Consumo mensal e obrigatorio"),
  notes: z.string().optional(),
})

export type BudgetRequestFormValues = z.infer<typeof budgetRequestFormSchema>

export const budgetRequestFormDefaultValues: Partial<BudgetRequestFormValues> = {
  clientName: "",
  phone: "",
  city: "",
  monthlyConsumption: undefined,
  notes: "",
}
