"use client"

import { UploadIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

interface DriveEmptyStateProps {
  variant: "section" | "folder"
  onUpload: () => void
}

export function DriveEmptyState({ variant, onUpload }: DriveEmptyStateProps) {
  if (variant === "section") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-base font-medium text-foreground">
          Nenhum arquivo encontrado
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Faça upload do primeiro arquivo para iniciar.
        </p>
        <Button onClick={onUpload} className="mt-4">
          <UploadIcon data-icon="inline-start" />
          Fazer upload
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-base font-medium text-foreground">
        Esta pasta está vazia
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Faça upload de um arquivo para começar.
      </p>
      <Button onClick={onUpload} className="mt-4">
        <UploadIcon data-icon="inline-start" />
        Fazer upload
      </Button>
    </div>
  )
}
