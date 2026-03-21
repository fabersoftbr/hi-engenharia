import { toast } from "sonner"

// Duration presets (ms)
const DURATION_SUCCESS = 3000
const DURATION_INFO = 4000
const DURATION_ERROR = 5000

/**
 * Show a success toast with 3s duration.
 */
export function showSuccessToast(message: string, description?: string) {
  toast.success(message, {
    description,
    duration: DURATION_SUCCESS,
  })
}

/**
 * Show an info toast with 4s duration.
 */
export function showInfoToast(message: string, description?: string) {
  toast.info(message, {
    description,
    duration: DURATION_INFO,
  })
}

/**
 * Show an error toast with 5s duration.
 */
export function showErrorToast(message: string, description?: string) {
  toast.error(message, {
    description,
    duration: DURATION_ERROR,
  })
}

/**
 * Show an undo toast with action button and 5s duration.
 */
export function showUndoToast(
  message: string,
  onUndo: () => void,
  description?: string
) {
  toast(message, {
    description,
    duration: DURATION_ERROR,
    action: {
      label: "Desfazer",
      onClick: onUndo,
    },
  })
}

/**
 * Show a PDF-ready toast with a simulated download action.
 */
export function showPdfReadyToast(fileName?: string) {
  toast.success("PDF gerado com sucesso", {
    description: fileName,
    duration: DURATION_ERROR,
    action: {
      label: "Baixar",
      onClick: () => {
        // Simulated download - frontend-only
        showInfoToast("Download simulado", fileName)
      },
    },
  })
}
