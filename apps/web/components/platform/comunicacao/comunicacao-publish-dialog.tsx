"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { EyeIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Checkbox } from "@workspace/ui/components/checkbox"
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
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import {
  type ComunicadoCategory,
  getComunicadoCategoryOptions,
  COMUNICADO_CATEGORY_META,
  COMUNICADOS,
  COMUNICADO_AUTHORS,
} from "@/lib/comunicacao-data"

interface ComunicacaoPublishDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DRAFT_STORAGE_KEY = "hi-comunicado-draft"

interface DraftData {
  title: string
  category: ComunicadoCategory | ""
  content: string
  isDestaque: boolean
}

export function ComunicacaoPublishDialog({
  open,
  onOpenChange,
}: ComunicacaoPublishDialogProps) {
  const router = useRouter()
  const [step, setStep] = React.useState<1 | 2>(1)
  const [title, setTitle] = React.useState("")
  const [category, setCategory] = React.useState<ComunicadoCategory | "">("")
  const [content, setContent] = React.useState("")
  const [isDestaque, setIsDestaque] = React.useState(false)
  const [showPreview, setShowPreview] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [hasDraft, setHasDraft] = React.useState(false)

  // Load draft on mount
  React.useEffect(() => {
    if (open) {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (savedDraft) {
        try {
          const draft: DraftData = JSON.parse(savedDraft)
          setTitle(draft.title)
          setCategory(draft.category)
          setContent(draft.content)
          setIsDestaque(draft.isDestaque)
          setHasDraft(true)
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, [open])

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) {
      newErrors.title = "Titulo e obrigatorio"
    }
    if (!category) {
      newErrors.category = "Categoria e obrigatoria"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (!content.trim()) {
      newErrors.content = "Conteudo e obrigatorio"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSaveDraft = () => {
    const draft: DraftData = {
      title,
      category,
      content,
      isDestaque,
    }
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft))
    toast("Rascunho salvo")
  }

  const handlePublish = () => {
    if (!validateStep1() || !validateStep2()) {
      return
    }

    // Generate new mock ID
    const newId = "comunicado-" + Date.now()

    // Add to COMUNICADOS array
    COMUNICADOS.push({
      id: newId,
      title,
      summary: content.slice(0, 120),
      content,
      category: category as ComunicadoCategory,
      author: COMUNICADO_AUTHORS[0]!,
      publishedAt: new Date().toISOString(),
      isDestaque,
      isDraft: false,
    })

    // Clear draft
    localStorage.removeItem(DRAFT_STORAGE_KEY)
    setHasDraft(false)

    // Close dialog and navigate
    onOpenChange(false)
    toast.success("Comunicado publicado com sucesso")
    router.push(`/comunicacao/${newId}`)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset step and errors, but keep form data for draft recovery
      setStep(1)
      setErrors({})
    }
    onOpenChange(newOpen)
  }

  // Get category options without "all"
  const categoryOptions = getComunicadoCategoryOptions().filter(
    (opt) => opt.value !== "all"
  )

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-lg">
          {step === 1 && (
            <>
              <DialogHeader>
                <DialogTitle>Novo comunicado - Informacoes</DialogTitle>
                {hasDraft && (
                  <DialogDescription className="text-muted-foreground">
                    Rascunho recuperado
                  </DialogDescription>
                )}
              </DialogHeader>

              <FieldGroup className="mt-4">
                <Field data-invalid={!!errors.title}>
                  <FieldLabel htmlFor="comunicado-title">Titulo</FieldLabel>
                  <Input
                    id="comunicado-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    aria-invalid={!!errors.title}
                    placeholder="Digite o titulo do comunicado"
                  />
                  {errors.title && (
                    <FieldDescription className="text-destructive">
                      {errors.title}
                    </FieldDescription>
                  )}
                </Field>

                <Field data-invalid={!!errors.category}>
                  <FieldLabel htmlFor="comunicado-category">
                    Categoria
                  </FieldLabel>
                  <Select
                    value={category}
                    onValueChange={(value) =>
                      setCategory(value as ComunicadoCategory)
                    }
                  >
                    <SelectTrigger
                      id="comunicado-category"
                      aria-invalid={!!errors.category}
                    >
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
              </FieldGroup>

              <DialogFooter className="mt-6">
                <Button onClick={handleNext}>Proximo</Button>
              </DialogFooter>
            </>
          )}

          {step === 2 && (
            <>
              <DialogHeader>
                <DialogTitle>Novo comunicado - Conteudo</DialogTitle>
              </DialogHeader>

              <FieldGroup className="mt-4">
                <Field data-invalid={!!errors.content}>
                  <FieldLabel htmlFor="comunicado-content">Conteudo</FieldLabel>
                  <Textarea
                    id="comunicado-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    aria-invalid={!!errors.content}
                    placeholder="Digite o conteudo do comunicado"
                  />
                  {errors.content && (
                    <FieldDescription className="text-destructive">
                      {errors.content}
                    </FieldDescription>
                  )}
                </Field>

                <Field orientation="horizontal">
                  <Checkbox
                    id="comunicado-destaque"
                    checked={isDestaque}
                    onCheckedChange={(checked) =>
                      setIsDestaque(checked === true)
                    }
                  />
                  <FieldLabel
                    htmlFor="comunicado-destaque"
                    className="font-normal"
                  >
                    Marcar como destaque
                  </FieldLabel>
                </Field>
              </FieldGroup>

              <DialogFooter className="mt-6 flex-wrap gap-2">
                <Button variant="outline" onClick={handleBack}>
                  Voltar
                </Button>
                <Button variant="outline" onClick={handleSaveDraft}>
                  Salvar rascunho
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(true)}
                  disabled={!content.trim()}
                >
                  <EyeIcon data-icon="inline-start" />
                  Visualizar
                </Button>
                <Button onClick={handlePublish}>Publicar</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Visualizacao do comunicado</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{title || "Sem titulo"}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {category && (
                  <Badge variant={COMUNICADO_CATEGORY_META[category].variant}>
                    {COMUNICADO_CATEGORY_META[category].label}
                  </Badge>
                )}
                {isDestaque && <Badge variant="default">Destaque</Badge>}
              </div>
            </div>

            <Separator />

            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {content || "Sem conteudo"}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
