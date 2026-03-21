import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { JourneyPage } from "../journey-page"
import { JourneyTimeline } from "../journey-timeline"
import { getJourneyModules, getVisibleJourneyModules } from "@/lib/journey-data"

describe("JourneyPage", () => {
  it("renders the journey page with title and description", () => {
    render(<JourneyPage />)

    expect(screen.getByRole("heading", { name: "Jornada" })).toBeInTheDocument()
    expect(screen.getByText(/fluxo operacional completo/)).toBeInTheDocument()
  })

  it("renders the journey timeline component", () => {
    render(<JourneyPage />)

    // Check that at least one module card is rendered (modules with activeCount > 0)
    const modules = getVisibleJourneyModules()
    if (modules.length > 0) {
      const detailLinks = screen.getAllByText("Ver detalhes")
      expect(detailLinks.length).toBeGreaterThan(0)
    }
  })
})

describe("JourneyTimeline", () => {
  it("renders all visible modules in order", () => {
    const modules = getVisibleJourneyModules()
    render(<JourneyTimeline modules={modules} />)

    // Check that module labels are rendered in the expected order
    const expectedOrder = [
      "Orcamento",
      "CRM",
      "Anteprojeto",
      "Proposta",
      "Projeto",
      "Obra",
    ]
    const visibleLabels = modules.map((m) => m.label)

    for (const label of visibleLabels) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }

    // Verify order is maintained
    const renderedLabels = visibleLabels.filter((l) =>
      expectedOrder.includes(l)
    )
    const sortedLabels = [...renderedLabels].sort(
      (a, b) => expectedOrder.indexOf(a) - expectedOrder.indexOf(b)
    )
    expect(renderedLabels).toEqual(sortedLabels)
  })

  it("hides modules with zero active items", () => {
    const allModules = getJourneyModules()
    const visibleModules = getVisibleJourneyModules()

    // Visible modules should be a subset of all modules
    expect(visibleModules.length).toBeLessThanOrEqual(allModules.length)

    // All visible modules should have activeCount > 0
    for (const mod of visibleModules) {
      expect(mod.activeCount).toBeGreaterThan(0)
    }

    // Modules with activeCount === 0 should not be in visible list
    const zeroCountModules = allModules.filter((m) => m.activeCount === 0)
    for (const zeroMod of zeroCountModules) {
      expect(visibleModules.find((m) => m.id === zeroMod.id)).toBeUndefined()
    }
  })

  it("renders empty state when no modules have active items", () => {
    render(<JourneyTimeline modules={[]} />)

    expect(
      screen.getByText("Nenhum modulo com itens ativos no momento.")
    ).toBeInTheDocument()
  })

  it("renders Ver detalhes link for each visible module", () => {
    const modules = getVisibleJourneyModules()
    render(<JourneyTimeline modules={modules} />)

    if (modules.length > 0) {
      const detailLinks = screen.getAllByText("Ver detalhes")
      expect(detailLinks.length).toBe(modules.length)
    }
  })
})

describe("Journey Data Contract (PIPE-04)", () => {
  it("exposes module labels in the correct order", () => {
    const modules = getJourneyModules()

    const expectedOrder = [
      "Orcamento",
      "CRM",
      "Anteprojeto",
      "Proposta",
      "Projeto",
      "Obra",
    ]

    const actualOrder = modules.map((m) => m.label)
    expect(actualOrder).toEqual(expectedOrder)
  })

  it("exposes routes for all modules", () => {
    const modules = getJourneyModules()

    const expectedRoutes = [
      "/orcamentos",
      "/crm",
      "/anteprojetos",
      "/propostas",
      "/projetos",
      "/obras",
    ]

    const actualRoutes = modules.map((m) => m.route)
    expect(actualRoutes).toEqual(expectedRoutes)
  })

  it("filters out modules with zero active count in getVisibleJourneyModules", () => {
    const allModules = getJourneyModules()
    const visibleModules = getVisibleJourneyModules()

    // All visible modules should have activeCount > 0
    for (const mod of visibleModules) {
      expect(mod.activeCount).toBeGreaterThan(0)
    }

    // Count should match
    const expectedVisible = allModules.filter((m) => m.activeCount > 0)
    expect(visibleModules.length).toBe(expectedVisible.length)
  })
})
