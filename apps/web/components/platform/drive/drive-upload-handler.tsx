"use client"

import { useCallback } from "react"
import { toast } from "sonner"

import type { DriveFile } from "@/lib/drive-data"

const UPLOAD_TOAST_ID = "drive-upload"
const DOWNLOAD_TOAST_ID = "drive-download"
const BULK_DOWNLOAD_TOAST_ID = "drive-bulk-download"

export function useUploadHandler() {
  const simulateUpload = useCallback((files: FileList) => {
    const fileCount = files.length

    if (fileCount === 1) {
      toast.loading("Enviando arquivo...", { id: UPLOAD_TOAST_ID })
      setTimeout(() => {
        toast.success("Upload concluido", { id: UPLOAD_TOAST_ID })
      }, 1500)
    } else {
      let current = 1
      toast.loading(`Enviando ${current} de ${fileCount} arquivos...`, {
        id: UPLOAD_TOAST_ID,
      })

      const interval = setInterval(() => {
        current++
        if (current <= fileCount) {
          toast.loading(`Enviando ${current} de ${fileCount} arquivos...`, {
            id: UPLOAD_TOAST_ID,
          })
        }
        if (current >= fileCount) {
          clearInterval(interval)
          setTimeout(() => {
            toast.success("Upload concluido", { id: UPLOAD_TOAST_ID })
          }, 800)
        }
      }, 800)
    }
  }, [])

  const triggerUpload = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = "*/*"

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        simulateUpload(files)
      }
    }

    input.click()
  }, [simulateUpload])

  return { triggerUpload, simulateUpload }
}

export function triggerDownload(file: DriveFile) {
  toast.loading("Preparando download...", { id: DOWNLOAD_TOAST_ID })
  setTimeout(() => {
    toast.success("Download concluido", { id: DOWNLOAD_TOAST_ID })
  }, 1500)
}

export function triggerBulkDownload(count: number) {
  if (count === 0) return

  toast.loading("Preparando download (ZIP)...", { id: BULK_DOWNLOAD_TOAST_ID })
  setTimeout(() => {
    toast.success("Download concluido", { id: BULK_DOWNLOAD_TOAST_ID })
  }, 2000)
}
