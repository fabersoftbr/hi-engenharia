"use client"

import { useState } from "react"
import Link from "next/link"
import {
  UploadIcon,
  CheckCircleIcon,
  XCircleIcon,
  FileTextIcon,
  ArrowLeftIcon,
} from "lucide-react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"

// Mock version history
const VERSION_HISTORY = [
  {
    id: "v-003",
    filename: "tabela-precos-marco-2026.xlsx",
    uploadedAt: "2026-03-15T10:30:00Z",
    uploadedBy: "Maria Silva",
    status: "success" as const,
  },
  {
    id: "v-002",
    filename: "tabela-precos-fev-2026.xlsx",
    uploadedAt: "2026-02-10T14:20:00Z",
    uploadedBy: "Joao Santos",
    status: "success" as const,
  },
  {
    id: "v-001",
    filename: "tabela-precos-jan-2026.xlsx",
    uploadedAt: "2026-01-05T09:00:00Z",
    uploadedBy: "Maria Silva",
    status: "success" as const,
  },
]

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function PriceTableUploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const handleFileSelect = () => {
    // Simulate file selection
    setSelectedFile("tabela-precos-nova.xlsx")
    setUploadStatus("idle")
  }

  const handleSimulateUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Randomly succeed or fail for demo
    const success = Math.random() > 0.3

    setIsUploading(false)

    if (success) {
      setUploadStatus("success")
      toast.success("Tabela enviada com sucesso")
    } else {
      setUploadStatus("error")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tabela-de-precos">
                <ArrowLeftIcon className="size-4" />
                Voltar
              </Link>
            </Button>
          </div>
          <h1 className="text-2xl font-semibold">Enviar nova tabela</h1>
          <p className="text-sm text-muted-foreground">
            Faca o upload da nova tabela de precos para atualizar os valores
          </p>
        </div>
      </div>

      {/* Upload section */}
      <Card>
        <CardHeader>
          <CardTitle>Enviar nova tabela</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Dropzone area */}
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 text-center">
            <UploadIcon className="size-10 text-muted-foreground" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">
                {selectedFile || "Arraste o arquivo ou clique para selecionar"}
              </p>
              <p className="text-xs text-muted-foreground">
                Formatos aceitos: XLSX, CSV (max. 5MB)
              </p>
            </div>
          </div>

          {/* File selected */}
          {selectedFile && (
            <div className="flex items-center gap-3 rounded-md border p-3">
              <FileTextIcon className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">{selectedFile}</span>
            </div>
          )}

          {/* Status feedback */}
          {uploadStatus === "success" && (
            <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <CheckCircleIcon className="size-4" />
              Tabela enviada com sucesso
            </div>
          )}
          {uploadStatus === "error" && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <XCircleIcon className="size-4" />
              Nao foi possivel enviar a tabela
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleFileSelect}>
              Selecionar arquivo
            </Button>
            <Button
              onClick={handleSimulateUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Enviando..." : "Simular upload"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Version history */}
      <Card>
        <CardHeader>
          <CardTitle>Historico de versoes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {VERSION_HISTORY.map((version) => (
              <li
                key={version.id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex items-center gap-3">
                  <FileTextIcon className="size-4 text-muted-foreground" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                      {version.filename}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(version.uploadedAt)} por {version.uploadedBy}
                    </span>
                  </div>
                </div>
                <CheckCircleIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
