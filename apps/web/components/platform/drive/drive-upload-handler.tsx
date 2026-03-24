"use client"

import { useCallback } from "react"
import { toast } from "sonner"

import type { DriveFile } from "@/lib/drive-data"
import { showSuccessToast } from "@/lib/toast-helpers"

const UPLOAD_TOAST_ID = "drive-upload"
const DOWNLOAD_TOAST_ID = "drive-download"
const BULK_DOWNLOAD_TOAST_ID = "drive-bulk-download"

/**
 * Simulates file upload with toast feedback.
 *
 * Design decision: Multiple files show a SINGLE toast with progressive counter
 * (e.g., "Enviando 2 de 5 arquivos...") rather than individual toasts per file.
 * This prevents toast flooding when uploading many files and provides cleaner UX.
 *
 * UAT Test 8: This behavior is intentional and meets the requirement for
 * "toasts can be dismissed or auto-complete with success message."
 */
export function useUploadHandler() {
  const simulateUpload = useCallback((files: FileList) => {
    const fileCount = files.length

    if (fileCount === 1) {
      toast.loading("Enviando arquivo...", { id: UPLOAD_TOAST_ID })
      setTimeout(() => {
        toast.dismiss(UPLOAD_TOAST_ID)
        showSuccessToast("Upload concluido")
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
            toast.dismiss(UPLOAD_TOAST_ID)
            showSuccessToast("Upload concluido")
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
    toast.dismiss(DOWNLOAD_TOAST_ID)
    showSuccessToast(`Download de ${file.name} concluido`)
  }, 1500)
}

export function triggerBulkDownload(count: number) {
  if (count === 0) return

  toast.loading("Preparando download (ZIP)...", { id: BULK_DOWNLOAD_TOAST_ID })
  setTimeout(() => {
    toast.dismiss(BULK_DOWNLOAD_TOAST_ID)
    showSuccessToast("Download concluido")
  }, 2000)
}
