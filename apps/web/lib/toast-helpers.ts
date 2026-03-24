import { toast } from "sonner"

const TOAST_DURATIONS = {
  success: 3000,
  info: 4000,
  error: 5000,
} as const

export function showSuccessToast(message: string) {
  toast.success(message, { duration: TOAST_DURATIONS.success })
}

export function showInfoToast(message: string) {
  toast.info(message, { duration: TOAST_DURATIONS.info })
}

export function showErrorToast(message: string) {
  toast.error(message, { duration: TOAST_DURATIONS.error })
}

export function showUndoToast(message: string, onUndo: () => void) {
  toast(message, {
    duration: TOAST_DURATIONS.info,
    action: {
      label: "Desfazer",
      onClick: onUndo,
    },
  })
}

export function showPdfReadyToast(onDownload: () => void) {
  toast.success("PDF gerado com sucesso", {
    duration: TOAST_DURATIONS.success,
    action: {
      label: "Baixar",
      onClick: onDownload,
    },
  })
}
