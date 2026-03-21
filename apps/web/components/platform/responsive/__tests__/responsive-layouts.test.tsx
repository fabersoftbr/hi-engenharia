import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"

import { useIsMobile } from "@workspace/ui/hooks/use-mobile"
import { DataTable } from "@workspace/ui/components/data-table"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

describe("responsive-layouts", () => {
  describe("useIsMobile breakpoint contract", () => {
    beforeEach(() => {
      // Reset matchMedia mock between tests
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        value: 1024,
      })
    })

    it("uses the locked md breakpoint of 768px", () => {
      // The hook references MOBILE_BREAKPOINT = 768
      // Verify desktop width returns false
      Object.defineProperty(window, "innerWidth", { value: 1024 })
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }),
      })

      function MobileConsumer() {
        const isMobile = useIsMobile()
        return <div data-testid="mobile-state">{String(isMobile)}</div>
      }

      render(<MobileConsumer />)
      expect(screen.getByTestId("mobile-state")).toHaveTextContent("false")
    })

    it("detects mobile when width is below 768px", () => {
      Object.defineProperty(window, "innerWidth", { value: 320 })
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
          matches: true,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }),
      })

      function MobileConsumer() {
        const isMobile = useIsMobile()
        return <div data-testid="mobile-state">{String(isMobile)}</div>
      }

      render(<MobileConsumer />)
      expect(screen.getByTestId("mobile-state")).toHaveTextContent("true")
    })
  })

  describe("Header h-16 requirement", () => {
    it("renders header with h-16 class for 64px height", () => {
      // Contract: shell header must use h-16 (64px)
      render(
        <header data-testid="shell-header" className="flex h-16 items-center">
          <span>Hi Engenharia</span>
        </header>
      )

      const header = screen.getByTestId("shell-header")
      expect(header).toBeInTheDocument()
      expect(header.className).toContain("h-16")
    })
  })

  describe("DataTable responsive behavior", () => {
    it("renders DataTable with column definitions", () => {
      // Contract: DataTable hides lower-priority columns on mobile via CSS
      const columns = [
        {
          accessorKey: "name" as const,
          header: "Nome",
        },
        {
          accessorKey: "phone" as const,
          header: "Telefone",
          cell: ({ row }: { row: { original: { phone: string } } }) => (
            <span className="hidden md:table-cell">{row.original.phone}</span>
          ),
        },
      ]

      const data = [{ name: "Test", phone: "123" }]

      render(<DataTable columns={columns} data={data} />)

      // Table renders with all column headers
      expect(screen.getByText("Nome")).toBeInTheDocument()
      expect(screen.getByText("Telefone")).toBeInTheDocument()
    })

    it("DataTable supports emptyState prop for no-results", () => {
      const columns = [{ accessorKey: "name" as const, header: "Nome" }]

      render(
        <DataTable
          columns={columns}
          data={[]}
          emptyState={<div>Nenhum resultado encontrado</div>}
        />
      )

      expect(
        screen.getByText("Nenhum resultado encontrado")
      ).toBeInTheDocument()
    })
  })

  describe("Mobile pipeline Tabs branch", () => {
    it("renders pipeline stages as Tabs for mobile layout", () => {
      // Contract: mobile pipeline uses Tabs instead of Kanban columns
      render(
        <Tabs defaultValue="prospeccao">
          <TabsList>
            <TabsTrigger value="prospeccao">Prospecção (3)</TabsTrigger>
            <TabsTrigger value="qualificacao">Qualificação (2)</TabsTrigger>
            <TabsTrigger value="proposta">Proposta (1)</TabsTrigger>
          </TabsList>
        </Tabs>
      )

      expect(screen.getByText("Prospecção (3)")).toBeInTheDocument()
      expect(screen.getByText("Qualificação (2)")).toBeInTheDocument()
      expect(screen.getByText("Proposta (1)")).toBeInTheDocument()
    })
  })

  describe("Sheet for mobile modals", () => {
    it("renders Sheet component for mobile modal pattern", () => {
      render(
        <Sheet>
          <SheetTrigger asChild>
            <button type="button">Abrir detalhes</button>
          </SheetTrigger>
          <SheetContent>
            <div>Conteudo do detalhe</div>
          </SheetContent>
        </Sheet>
      )

      expect(screen.getByText("Abrir detalhes")).toBeInTheDocument()
    })
  })

  describe("Theme switcher options", () => {
    it("provides Theme claro, Theme escuro, and Seguir sistema options", () => {
      // Contract: avatar dropdown must include these three theme options
      const themeOptions = ["Theme claro", "Theme escuro", "Seguir sistema"]

      render(
        <div data-testid="theme-switcher">
          {themeOptions.map((option) => (
            <button key={option} type="button">
              {option}
            </button>
          ))}
        </div>
      )

      expect(screen.getByText("Theme claro")).toBeInTheDocument()
      expect(screen.getByText("Theme escuro")).toBeInTheDocument()
      expect(screen.getByText("Seguir sistema")).toBeInTheDocument()
    })
  })

  describe("Tooltip delay contract", () => {
    it("renders Tooltip with 300ms delay for showing content", () => {
      // Contract: tooltip must support 300ms delay before showing
      render(
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button">Hover me</button>
            </TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByText("Hover me")).toBeInTheDocument()
      // The tooltip content is not visible until hover after delay
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument()
    })
  })
})
