import { describe, it, expect, vi } from "vitest"
import { render, screen, act } from "@testing-library/react"

import {
  TableSkeleton,
  CardGridSkeleton,
  PipelineSkeleton,
  DetailSkeleton,
} from "../skeletons"

import {
  showSuccessToast,
  showInfoToast,
  showErrorToast,
  showUndoToast,
  showPdfReadyToast,
} from "@/lib/toast-helpers"

import { useSimulatedLoading } from "@/lib/use-simulated-loading"

// Mock sonner to verify toast helper calls without rendering <Toaster>
vi.mock("sonner", () => {
  const success = vi.fn()
  const info = vi.fn()
  const error = vi.fn()
  const toast = Object.assign(vi.fn(), { success, info, error })
  return { toast }
})

describe("loading-and-feedback", () => {
  describe("Typed Skeletons", () => {
    it("renders TableSkeleton with default row count", () => {
      render(<TableSkeleton />)
      expect(screen.getByTestId("table-skeleton")).toBeInTheDocument()
    })

    it("renders TableSkeleton with custom row count", () => {
      render(<TableSkeleton rows={3} />)
      const container = screen.getByTestId("table-skeleton")
      // 1 header row + 3 data rows = 4 child divs
      const rows = container.querySelectorAll(":scope > div")
      expect(rows.length).toBe(4)
    })

    it("renders CardGridSkeleton with default card count", () => {
      render(<CardGridSkeleton />)
      expect(screen.getByTestId("card-grid-skeleton")).toBeInTheDocument()
    })

    it("renders CardGridSkeleton with custom card count", () => {
      render(<CardGridSkeleton cards={2} />)
      const container = screen.getByTestId("card-grid-skeleton")
      const cards = container.querySelectorAll(":scope > div")
      expect(cards.length).toBe(2)
    })

    it("renders PipelineSkeleton with default stage count", () => {
      render(<PipelineSkeleton />)
      expect(screen.getByTestId("pipeline-skeleton")).toBeInTheDocument()
    })

    it("renders PipelineSkeleton with custom stage count", () => {
      render(<PipelineSkeleton stages={3} />)
      const container = screen.getByTestId("pipeline-skeleton")
      const stages = container.querySelectorAll(":scope > div")
      expect(stages.length).toBe(3)
    })

    it("renders DetailSkeleton with two-column layout", () => {
      render(<DetailSkeleton />)
      const container = screen.getByTestId("detail-skeleton")
      expect(container).toBeInTheDocument()
      // Should have main content and sidebar columns
      const columns = container.querySelectorAll(":scope > div")
      expect(columns.length).toBe(2)
    })
  })

  describe("Toast Helpers", () => {
    it("showSuccessToast calls toast.success with correct duration", async () => {
      const { toast } = await import("sonner")
      showSuccessToast("Operacao concluida")
      expect(toast.success).toHaveBeenCalledWith("Operacao concluida", {
        duration: 3000,
      })
    })

    it("showInfoToast calls toast.info with correct duration", async () => {
      const { toast } = await import("sonner")
      showInfoToast("Informacao importante")
      expect(toast.info).toHaveBeenCalledWith("Informacao importante", {
        duration: 4000,
      })
    })

    it("showErrorToast calls toast.error with correct duration", async () => {
      const { toast } = await import("sonner")
      showErrorToast("Algo deu errado")
      expect(toast.error).toHaveBeenCalledWith("Algo deu errado", {
        duration: 5000,
      })
    })

    it("showUndoToast calls toast with undo action label", async () => {
      const { toast } = await import("sonner")
      const onUndo = vi.fn()
      showUndoToast("Etapa alterada", onUndo)
      expect(toast).toHaveBeenCalledWith("Etapa alterada", {
        duration: 4000,
        action: { label: "Desfazer", onClick: onUndo },
      })
    })

    it("showPdfReadyToast calls toast.success with download action", async () => {
      const { toast } = await import("sonner")
      const onDownload = vi.fn()
      showPdfReadyToast(onDownload)
      expect(toast.success).toHaveBeenCalledWith("PDF gerado com sucesso", {
        duration: 3000,
        action: { label: "Baixar", onClick: onDownload },
      })
    })
  })

  describe("useSimulatedLoading", () => {
    function LoadingConsumer({ enabled = true }: { enabled?: boolean }) {
      const isLoading = useSimulatedLoading(enabled)
      return (
        <div data-testid="loading-state">{isLoading ? "loading" : "ready"}</div>
      )
    }

    it("starts in loading state when enabled in development", () => {
      vi.stubEnv("NODE_ENV", "development")

      render(<LoadingConsumer enabled />)
      // Initial state is true; dev delay keeps it loading before timeout
      expect(screen.getByTestId("loading-state")).toHaveTextContent("loading")

      vi.unstubAllEnvs()
    })

    it("resolves to ready when disabled", () => {
      render(<LoadingConsumer enabled={false} />)
      expect(screen.getByTestId("loading-state")).toHaveTextContent("ready")
    })

    it("resolves to ready in non-development environment", async () => {
      vi.stubEnv("NODE_ENV", "production")

      render(<LoadingConsumer enabled />)

      // In production, should resolve immediately
      await act(async () => {
        await new Promise((r) => setTimeout(r, 50))
      })
      expect(screen.getByTestId("loading-state")).toHaveTextContent("ready")

      vi.unstubAllEnvs()
    })
  })
})
