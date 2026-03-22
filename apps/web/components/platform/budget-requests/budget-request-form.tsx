"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  budgetRequestFormSchema,
  budgetRequestFormDefaultValues,
  type BudgetRequestFormValues,
} from "@/lib/budget-request-form"
import { BudgetRequestAttachmentsField } from "./budget-request-attachments-field"
import { BudgetRequestSubmissionDialog } from "./budget-request-submission-dialog"

export function BudgetRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedFormData, setSubmittedFormData] =
    useState<BudgetRequestFormValues | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<BudgetRequestFormValues>({
    resolver: zodResolver(budgetRequestFormSchema),
    defaultValues: budgetRequestFormDefaultValues,
  })

  const onSubmit = async (data: BudgetRequestFormValues) => {
    // Simulated submit - no real persistence
    // Store submitted data for the confirmation dialog
    setSubmittedFormData(data)
    setIsSubmitted(true)
  }

  const handleNewRequest = () => {
    reset()
    // Also reset attachments via ref or callback pattern
  }

  const clientName = watch("clientName")
  const phone = watch("phone")
  const city = watch("city")

  return (
    <>
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {/* Section: Dados do cliente */}
            <section>
              <h2 className="mb-4 text-lg font-semibold">Dados do cliente</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clientName">
                    Nome <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="clientName"
                    placeholder="Nome completo"
                    aria-invalid={!!errors.clientName}
                    {...register("clientName")}
                  />
                  {errors.clientName && (
                    <p className="text-sm text-destructive">
                      {errors.clientName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Telefone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    type="tel"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="city">
                    Cidade <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    placeholder="Cidade"
                    aria-invalid={!!errors.city}
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Section: Consumo/Projeto */}
            <section>
              <h2 className="mb-4 text-lg font-semibold">Consumo/Projeto</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyConsumption">
                    Consumo medio mensal (kWh){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="monthlyConsumption"
                    type="number"
                    placeholder="Ex: 450"
                    aria-invalid={!!errors.monthlyConsumption}
                    {...register("monthlyConsumption", { valueAsNumber: true })}
                  />
                  {errors.monthlyConsumption && (
                    <p className="text-sm text-destructive">
                      {errors.monthlyConsumption.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observacoes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Detalhes adicionais sobre o pedido..."
                    className="min-h-32"
                    {...register("notes")}
                  />
                  {errors.notes && (
                    <p className="text-sm text-destructive">
                      {errors.notes.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Section: Anexos */}
            <section>
              <h2 className="mb-4 text-lg font-semibold">Anexos</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Adicione arquivos como contas de energia, fotos do local ou
                documentos relevantes.
              </p>
              <BudgetRequestAttachmentsField />
            </section>

            {/* Action buttons */}
            <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:justify-end">
              <Button variant="ghost" asChild>
                <Link href="/orcamentos">Voltar para a listagem</Link>
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !clientName || !phone || !city}
              >
                Enviar solicitacao
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <BudgetRequestSubmissionDialog
        isOpen={isSubmitted}
        onClose={() => setIsSubmitted(false)}
        onNewRequest={handleNewRequest}
        submittedData={submittedFormData ?? undefined}
      />
    </>
  )
}
