"use client"

import { useState, useRef } from "react"
import { Button } from "@workspace/ui/components/button"
import { Upload } from "lucide-react"

interface Attachment {
  id: string
  name: string
  type: string
  size: number
}

export function BudgetRequestAttachmentsField() {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: Attachment[] = Array.from(files).map((file) => ({
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: file.name,
      type: file.type || "unknown",
      size: file.size,
    }))

    setAttachments((prev) => [...prev, ...newFiles])
    // Reset input so the same file can be selected again
    e.target.value = ""
  }

  const handlePreview = (attachment: Attachment) => {
    // Simulated preview - in a real app this would open the file
    window.alert(`Visualizar: ${attachment.name}`)
  }

  const handleRemove = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Attachment list */}
      {attachments.length > 0 && (
        <ul className="space-y-2">
          {attachments.map((attachment) => (
            <li
              key={attachment.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-2">
                <span className="truncate text-sm">{attachment.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round(attachment.size / 1024)} KB)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => handlePreview(attachment)}
                >
                  Visualizar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => handleRemove(attachment.id)}
                >
                  Remover
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add button */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileSelect}
      />
      <Button
        variant="outline"
        type="button"
        onClick={handleAddClick}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        Adicionar anexo
      </Button>
    </div>
  )
}
