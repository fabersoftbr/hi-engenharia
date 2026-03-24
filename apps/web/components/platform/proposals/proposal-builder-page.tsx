"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SaveIcon } from "lucide-react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Separator } from "@workspace/ui/components/separator"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@workspace/ui/components/field"
import {
  proposalFormSchema,
  proposalFormDefaultValues,
  type ProposalFormValues,
  generateProposalItemId,
  calculateItemTotal,
  calculateItemsGrandTotal,
  VALIDITY_OPTIONS,
} from "@/lib/proposal-form"
import { formatCurrency, type ProposalOriginType } from "@/lib/proposals-data"
import { ProposalOriginDialog } from "./proposal-origin-dialog"
import { ProposalItemsSection } from "./proposal-items-section"

export function ProposalBuilderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const opportunityId = searchParams.get("opportunityId")
  const anteprojectId = searchParams.get("anteprojectId")

  const [originDialogDismissed, setOriginDialogDismissed] = useState(false)
  const [selectedOrigin, setSelectedOrigin] =
    useState<ProposalOriginType | null>(null)

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: proposalFormDefaultValues,
  })

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = form

  const {
    fields: itemFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "items",
  })

  const items = useWatch({ control, name: "items" }) ?? []
  const validityDays = useWatch({ control, name: "validityDays" })
  const grandTotal = calculateItemsGrandTotal(items)
  const showOriginDialog =
    !opportunityId && !anteprojectId && !originDialogDismissed

  const handleOriginSelect = useCallback(
    (originType: ProposalOriginType) => {
      setSelectedOrigin(originType)
      if (originType === "cliente") {
        // Pre-fill empty client form
        setValue("clientName", "")
        setValue("projectDescription", "")
      }
      // For oportunidade, we would fetch from CRM data, but for now keep it simple
    },
    [setValue]
  )

  const addItem = useCallback(() => {
    append({
      id: generateProposalItemId(),
      itemCode: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    })
  }, [append])

  const removeItem = useCallback(
    (index: number) => {
      remove(index)
    },
    [remove]
  )

  const updateItemTotal = useCallback(
    (index: number, quantity: number, unitPrice: number) => {
      const total = calculateItemTotal(quantity, unitPrice)
      setValue(`items.${index}.totalPrice`, total)
    },
    [setValue]
  )

  const handlePriceSelect = useCallback(
    (
      itemIndex: number,
      itemCode: string,
      description: string,
      unitPrice: number
    ) => {
      setValue(`items.${itemIndex}.itemCode`, itemCode)
      setValue(`items.${itemIndex}.description`, description)
      setValue(`items.${itemIndex}.unitPrice`, unitPrice)
      const quantity = getValues(`items.${itemIndex}.quantity`) || 1
      setValue(`items.${itemIndex}.totalPrice`, unitPrice * quantity)
    },
    [getValues, setValue]
  )

  const onSubmit = async () => {
    // Simulated submit - no real persistence
    // Show success and redirect
    router.push("/propostas")
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Page header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">Nova proposta</h1>
            {selectedOrigin && (
              <p className="text-sm text-muted-foreground">
                Origem:{" "}
                {selectedOrigin === "cliente" ? "Cliente" : "Oportunidade"}
              </p>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Dados do cliente */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Dados do cliente</h2>
              <FieldGroup>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field data-invalid={!!errors.title}>
                    <FieldLabel htmlFor="title">
                      Titulo <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="title"
                      placeholder="Titulo da proposta"
                      aria-invalid={!!errors.title}
                      {...register("title")}
                    />
                    {errors.title && (
                      <FieldDescription className="text-destructive">
                        {errors.title.message}
                      </FieldDescription>
                    )}
                  </Field>

                  <Field data-invalid={!!errors.clientName}>
                    <FieldLabel htmlFor="clientName">
                      Nome do cliente{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="clientName"
                      placeholder="Nome completo"
                      aria-invalid={!!errors.clientName}
                      {...register("clientName")}
                    />
                    {errors.clientName && (
                      <FieldDescription className="text-destructive">
                        {errors.clientName.message}
                      </FieldDescription>
                    )}
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* Descricao do projeto */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Descrição do projeto
              </h2>
              <FieldGroup>
                <Field data-invalid={!!errors.projectDescription}>
                  <FieldLabel htmlFor="projectDescription">
                    Descrição <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Textarea
                    id="projectDescription"
                    placeholder="Descreva o projeto e escopo da proposta..."
                    className="min-h-32"
                    aria-invalid={!!errors.projectDescription}
                    {...register("projectDescription")}
                  />
                  {errors.projectDescription && (
                    <FieldDescription className="text-destructive">
                      {errors.projectDescription.message}
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* Itens da proposta */}
          <Card>
            <CardContent className="p-6">
              <ProposalItemsSection
                itemFields={itemFields}
                control={control}
                register={register}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                onUpdateItemTotal={updateItemTotal}
                onPriceSelect={handlePriceSelect}
              />
            </CardContent>
          </Card>

          {/* Totais */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Totais</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total geral</span>
                  <span className="font-mono text-primary">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Condicoes comerciais */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Condicoes comerciais
              </h2>
              <div className="space-y-2">
                <Label htmlFor="commercialTerms">Condicoes</Label>
                <Textarea
                  id="commercialTerms"
                  placeholder="Pagamento, garantia, prazo de entrega, etc."
                  className="min-h-24"
                  {...register("commercialTerms")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Validade */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Validade</h2>
              <div className="space-y-2">
                <Label htmlFor="validityDays">Prazo de validade</Label>
                <Select
                  value={String(validityDays || "30")}
                  onValueChange={(value) =>
                    setValue("validityDays", Number(value))
                  }
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {VALIDITY_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:justify-end">
            <Button variant="ghost" asChild>
              <Link href="/propostas">Voltar para a listagem</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <SaveIcon className="size-4" />
              Salvar rascunho
            </Button>
          </div>
        </form>
      </div>

      <ProposalOriginDialog
        isOpen={showOriginDialog}
        onClose={() => setOriginDialogDismissed(true)}
        onSelect={handleOriginSelect}
      />
    </>
  )
}
