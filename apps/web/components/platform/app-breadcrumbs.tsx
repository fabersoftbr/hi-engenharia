"use client"

import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { getModuleByRoute } from "@/lib/platform-config"
import { getProjectById } from "@/lib/projects-data"

export function AppBreadcrumbs() {
  const pathname = usePathname()

  // Extract module route (first segment after /)
  const segments = pathname.split("/").filter(Boolean)
  const moduleRoute = segments.length > 0 ? `/${segments[0]}` : "/portal"
  const currentModule = getModuleByRoute(moduleRoute)

  // Build breadcrumb items
  // Format: "Portal > Inicio" or "CRM > Detalhe"
  const moduleName = currentModule?.label ?? "Portal"

  // Determine page label based on route pattern
  let pageLabel = currentModule?.breadcrumb ?? "Inicio"

  // Handle dynamic CRM detail routes: /crm/{opportunityId}
  if (segments[0] === "crm" && segments.length >= 2) {
    pageLabel = "Detalhe"
  }

  // Handle dynamic anteproject detail routes: /anteprojetos/{anteprojectId}
  if (segments[0] === "anteprojetos" && segments.length >= 2) {
    pageLabel = "Detalhe"
  }

  // Handle dynamic proposal routes
  if (segments[0] === "propostas") {
    if (segments[1] === "nova") {
      pageLabel = "Nova proposta"
    } else if (segments.length >= 2) {
      pageLabel = "Detalhe"
    }
  }

  // Handle dynamic price table routes
  if (segments[0] === "tabela-de-precos") {
    if (segments[1] === "upload") {
      pageLabel = "Upload"
    } else if (segments.length >= 2) {
      pageLabel = "Detalhe"
    }
  }

  // Handle dynamic project routes: /projetos/{projectId}
  if (segments[0] === "projetos" && segments.length >= 2 && segments[1]) {
    const project = getProjectById(segments[1])
    pageLabel = project?.title ?? "Detalhe"
  }

  // Handle dynamic comunicacao routes
  if (segments[0] === "comunicacao") {
    if (segments.length >= 2) {
      pageLabel = "Detalhe"
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{moduleName}</BreadcrumbPage>
        </BreadcrumbItem>
        {segments.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
