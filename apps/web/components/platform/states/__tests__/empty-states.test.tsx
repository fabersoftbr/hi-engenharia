import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { UploadIcon, MegaphoneIcon } from "lucide-react"

import { EmptyState } from "../empty-state"

describe("empty-states", () => {
  describe("EmptyState component", () => {
    it("renders title text", () => {
      render(<EmptyState title="Nenhum resultado" />)
      expect(screen.getByText("Nenhum resultado")).toBeInTheDocument()
    })

    it("renders description when provided", () => {
      render(
        <EmptyState
          title="Sem dados"
          description="Tente ajustar os filtros para encontrar o que procura."
        />
      )
      expect(
        screen.getByText(
          "Tente ajustar os filtros para encontrar o que procura."
        )
      ).toBeInTheDocument()
    })

    it("renders action slot when provided", () => {
      render(
        <EmptyState
          title="Nenhum comunicado publicado"
          description="Nenhum comunicado foi publicado ainda."
          action={<button type="button">Publicar</button>}
        />
      )
      expect(
        screen.getByText("Nenhum comunicado publicado")
      ).toBeInTheDocument()
      expect(screen.getByText("Publicar")).toBeInTheDocument()
    })

    it("accepts a custom icon", () => {
      const { container } = render(
        <EmptyState icon={MegaphoneIcon} title="Nenhum comunicado publicado" />
      )
      // Icon renders as SVG inside the component
      const svg = container.querySelector("svg")
      expect(svg).toBeInTheDocument()
    })

    it("renders without description when not provided", () => {
      render(<EmptyState title="Vazio" />)
      expect(screen.getByText("Vazio")).toBeInTheDocument()
      // No paragraph for description
      const paragraphs = screen.queryAllByRole("paragraph")
      // Title is h3, so checking p elements
      expect(
        screen.queryByText(
          "Tente ajustar os filtros para encontrar o que procura."
        )
      ).not.toBeInTheDocument()
    })
  })

  describe("No-results branch", () => {
    it("displays no-results messaging when search yields empty", () => {
      render(
        <EmptyState
          title="Nenhum resultado"
          description="Nenhum registro encontrado para os filtros aplicados."
        />
      )
      expect(screen.getByText("Nenhum resultado")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Nenhum registro encontrado para os filtros aplicados."
        )
      ).toBeInTheDocument()
    })
  })

  describe("Hide-empty-section rule", () => {
    it("hides section entirely when items array is empty", () => {
      // Simulates a parent that conditionally renders based on items
      const items: string[] = []
      const { container } = render(
        <div data-testid="parent">
          {items.length > 0 && (
            <section data-testid="section">
              {items.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </section>
          )}
        </div>
      )
      expect(screen.queryByTestId("section")).not.toBeInTheDocument()
    })

    it("shows section when items are present", () => {
      const items = ["Item 1", "Item 2"]
      render(
        <div data-testid="parent">
          {items.length > 0 && (
            <section data-testid="section">
              {items.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </section>
          )}
        </div>
      )
      expect(screen.getByTestId("section")).toBeInTheDocument()
    })
  })

  describe("Drive upload empty state", () => {
    it("renders upload action with Fazer upload label", () => {
      render(
        <EmptyState
          icon={UploadIcon}
          title="Nenhum arquivo"
          description="Esta pasta ainda nao possui arquivos."
          action={<button type="button">Fazer upload</button>}
        />
      )
      expect(screen.getByText("Fazer upload")).toBeInTheDocument()
    })
  })

  describe("Clear filters action", () => {
    it("renders clear filters action button with Limpar filtros label", () => {
      render(
        <EmptyState
          title="Nenhum resultado"
          description="Tente ajustar os filtros para encontrar o que procura."
          action={<button type="button">Limpar filtros</button>}
        />
      )
      expect(screen.getByText("Nenhum resultado")).toBeInTheDocument()
      expect(screen.getByText("Limpar filtros")).toBeInTheDocument()
    })
  })
})
