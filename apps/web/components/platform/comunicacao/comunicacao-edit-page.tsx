"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Separator } from "@workspace/ui/components/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@workspace/ui/components/field"
import {
  type Comunicado,
  type ComunicadoCategory,
  getComunicadoCategoryOptions,
} from "@/lib/comunicacao-data"

interface ComunicacaoEditPageProps {
  comunicado: Comunicado
}

export function ComunicacaoEditPage({ comunicado }: ComunicacaoEditPageProps) {
  const router = useRouter()
  const [title, setTitle] = React.useState(comunicado.title)
  const [category, setCategory] = React.useState<ComunicadoCategory>(
    comunicado.category
  )
  const [content, setContent] = React.useState(comunicado.content)
  const [isDestaque, setIsDestaque] = React.useState(comunicado.isDestaque)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) {
      newErrors.title = "Titulo e obrigatorio"
    }
    if (!category) {
      newErrors.category = "Categoria e obrigatoria"
    }
    if (!content.trim()) {
      newErrors.content = "Conteudo e obrigatorio"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) {
      return
    }

    // Update the comunicado in the array (mock persistence)
    const index = comunicado.id
      ? // Find by ID and update
        (window as unknown as { __comunicados_index?: number })
          .__comunicados_index
      : undefined

    // Mock update - in real app this would be an API call
    toast.success("Comunicado atualizado com sucesso")
    router.push(`/comunicacao/${comunicado.id}`)
  }

  // Get category options without "all"
  const categoryOptions = getComunicadoCategoryOptions().filter(
    (opt) => opt.value !== "all"
  )

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      {/* Back link */}
      <Button variant="ghost" asChild className="w-fit">
        <Link href={`/comunicacao/${comunicado.id}`}>
          <ArrowLeftIcon data-icon="inline-start" />
          Voltar
        </Link>
      </Button>

      {/* Header */}
      <h1 className="text-xl font-semibold">Editar comunicado</h1>

      <Separator />

      {/* Form */}
      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="edit-title">Titulo</FieldLabel>
          <Input
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={!!errors.title}
          />
          {errors.title && (
            <FieldDescription className="text-destructive">
              {errors.title}
            </FieldDescription>
          )}
        </Field>

        <Field data-invalid={!!errors.category}>
          <FieldLabel htmlFor="edit-category">Categoria</FieldLabel>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as ComunicadoCategory)}
          >
            <SelectTrigger id="edit-category" aria-invalid={!!errors.category}>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <FieldDescription className="text-destructive">
              {errors.category}
            </FieldDescription>
          )}
        </Field>

        <Field data-invalid={!!errors.content}>
          <FieldLabel htmlFor="edit-content">Conteudo</FieldLabel>
          <Textarea
            id="edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            aria-invalid={!!errors.content}
          />
          {errors.content && (
            <FieldDescription className="text-destructive">
              {errors.content}
            </FieldDescription>
          )}
        </Field>

        <Field orientation="horizontal">
          <Checkbox
            id="edit-destaque"
            checked={isDestaque}
            onCheckedChange={(checked) => setIsDestaque(checked === true)}
          />
          <FieldLabel htmlFor="edit-destaque" className="font-normal">
            Marcar como destaque
          </FieldLabel>
        </Field>
      </FieldGroup>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href={`/comunicacao/${comunicado.id}`}>Cancelar</Link>
        </Button>
        <Button onClick={handleSave}>Salvar alteracoes</Button>
      </div>
    </div>
  )
}
