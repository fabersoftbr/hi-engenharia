/**
 * Journey Lineage Helpers
 * Shared functions for resolving upstream/downstream entity links
 * across the operational chain: Orcamento -> CRM -> Anteprojeto -> Proposta -> Projeto -> Obra/Drive.
 */

import { getBudgetRequestById } from "./budget-requests-data"
import { getCrmOpportunityById } from "./crm-data"
import { getAnteprojectById } from "./anteprojects-data"
import { getProposalById } from "./proposals-data"
import { getProjectById } from "./projects-data"
import { getDriveFolderById, DRIVE_FOLDERS } from "./drive-data"

/**
 * Link to a related entity in the journey chain.
 */
export interface JourneyLink {
  label: string
  href: string
  id: string
}

/**
 * Result of lineage resolution for a given entity.
 */
export interface JourneyLineage {
  /** The entity type being resolved */
  entityType:
    | "budget-request"
    | "crm-opportunity"
    | "anteproject"
    | "proposal"
    | "project"
  entityId: string
  /** Upstream entity (where this came from) */
  upstream: JourneyLink | null
  /** Downstream entity (where this leads to) */
  downstream: JourneyLink | null
  /** All related links for Registro section */
  registroLinks: JourneyLink[]
  /** Default back route when no upstream exists */
  defaultBackRoute: string
}

/**
 * Resolve the lineage for a budget request (Orcamento).
 * Budget requests are the start of the chain - no upstream, downstream is CRM opportunity.
 */
export function getBudgetRequestLineage(requestId: string): JourneyLineage {
  const request = getBudgetRequestById(requestId)

  // Find CRM opportunity that originated from this request
  const downstream = null // Will be created via CTA, not pre-linked

  return {
    entityType: "budget-request",
    entityId: requestId,
    upstream: null,
    downstream,
    registroLinks: [],
    defaultBackRoute: "/orcamentos",
  }
}

/**
 * Resolve the lineage for a CRM opportunity.
 * Upstream: Budget request (if any)
 * Downstream: Anteproject (if created)
 */
export function getCrmOpportunityLineage(
  opportunityId: string
): JourneyLineage {
  const opportunity = getCrmOpportunityById(opportunityId)
  const registroLinks: JourneyLink[] = []

  // Upstream: Budget request
  let upstream: JourneyLink | null = null
  if (opportunity?.originBudgetRequestId) {
    upstream = {
      label: `Solicitacao ${opportunity.originBudgetRequestId}`,
      href: `/orcamentos/${opportunity.originBudgetRequestId}`,
      id: opportunity.originBudgetRequestId,
    }
    registroLinks.push(upstream)
  }

  // Downstream: Find anteproject that came from this opportunity
  // Note: We need to import from anteprojects-data to check
  const downstream: JourneyLink | null = null // Would need to query anteprojects

  return {
    entityType: "crm-opportunity",
    entityId: opportunityId,
    upstream,
    downstream,
    registroLinks,
    defaultBackRoute: "/crm",
  }
}

/**
 * Resolve the lineage for an anteproject.
 * Upstream: CRM opportunity
 * Downstream: Proposal (if generated)
 */
export function getAnteprojectLineage(anteprojectId: string): JourneyLineage {
  const anteproject = getAnteprojectById(anteprojectId)
  const registroLinks: JourneyLink[] = []

  if (!anteproject) {
    return {
      entityType: "anteproject",
      entityId: anteprojectId,
      upstream: null,
      downstream: null,
      registroLinks: [],
      defaultBackRoute: "/anteprojetos",
    }
  }

  // Upstream: CRM opportunity
  let upstream: JourneyLink | null = null
  if (anteproject.originCrmOpportunityId) {
    upstream = {
      label: `Oportunidade ${anteproject.originCrmOpportunityId}`,
      href: `/crm/${anteproject.originCrmOpportunityId}`,
      id: anteproject.originCrmOpportunityId,
    }
    registroLinks.push(upstream)
  }

  // Downstream: Proposal
  let downstream: JourneyLink | null = null
  if (anteproject.proposalId) {
    downstream = {
      label: `Proposta ${anteproject.proposalId}`,
      href: `/propostas/${anteproject.proposalId}`,
      id: anteproject.proposalId,
    }
    registroLinks.push(downstream)
  }

  return {
    entityType: "anteproject",
    entityId: anteprojectId,
    upstream,
    downstream,
    registroLinks,
    defaultBackRoute: "/anteprojetos",
  }
}

/**
 * Resolve the lineage for a proposal.
 * Upstream: Anteproject or CRM opportunity
 * Downstream: Project (if won)
 */
export function getProposalLineage(proposalId: string): JourneyLineage {
  const proposal = getProposalById(proposalId)
  const registroLinks: JourneyLink[] = []

  if (!proposal) {
    return {
      entityType: "proposal",
      entityId: proposalId,
      upstream: null,
      downstream: null,
      registroLinks: [],
      defaultBackRoute: "/propostas",
    }
  }

  // Upstream: Anteproject or CRM opportunity based on origin
  let upstream: JourneyLink | null = null
  if (proposal.origin.type === "anteproject" && proposal.origin.id) {
    upstream = {
      label: `Anteprojeto ${proposal.origin.id}`,
      href: `/anteprojetos/${proposal.origin.id}`,
      id: proposal.origin.id,
    }
    registroLinks.push(upstream)
  } else if (proposal.origin.type === "oportunidade" && proposal.origin.id) {
    upstream = {
      label: `Oportunidade ${proposal.origin.id}`,
      href: `/crm/${proposal.origin.id}`,
      id: proposal.origin.id,
    }
    registroLinks.push(upstream)
  }

  // Downstream: Find project linked to this proposal
  const downstream: JourneyLink | null = null // Would need to query projects

  return {
    entityType: "proposal",
    entityId: proposalId,
    upstream,
    downstream,
    registroLinks,
    defaultBackRoute: "/propostas",
  }
}

/**
 * Resolve the lineage for a project.
 * Upstream: Proposal
 * Downstream: Drive folder / Obra
 */
export function getProjectLineage(projectId: string): JourneyLineage {
  const project = getProjectById(projectId)
  const registroLinks: JourneyLink[] = []

  if (!project) {
    return {
      entityType: "project",
      entityId: projectId,
      upstream: null,
      downstream: null,
      registroLinks: [],
      defaultBackRoute: "/projetos",
    }
  }

  // Upstream: Proposal
  let upstream: JourneyLink | null = null
  if (project.proposalId) {
    upstream = {
      label: `Proposta ${project.proposalId}`,
      href: `/propostas/${project.proposalId}`,
      id: project.proposalId,
    }
    registroLinks.push(upstream)
  }

  // Also link anteproject if available
  if (project.anteprojectId) {
    registroLinks.push({
      label: `Anteprojeto ${project.anteprojectId}`,
      href: `/anteprojetos/${project.anteprojectId}`,
      id: project.anteprojectId,
    })
  }

  // Downstream: Drive folder (Obras section)
  const driveFolder = DRIVE_FOLDERS.find(
    (f) => f.section === "obras" && f.entityId === projectId
  )
  let downstream: JourneyLink | null = null
  if (driveFolder) {
    downstream = {
      label: `Drive - ${driveFolder.name}`,
      href: `/drive?folderId=${driveFolder.id}&section=obras`,
      id: driveFolder.id,
    }
  }

  return {
    entityType: "project",
    entityId: projectId,
    upstream,
    downstream,
    registroLinks,
    defaultBackRoute: "/projetos",
  }
}

/**
 * Generic helper to get lineage for any entity by type.
 */
export function getJourneyLineage(
  entityType: JourneyLineage["entityType"],
  entityId: string
): JourneyLineage {
  switch (entityType) {
    case "budget-request":
      return getBudgetRequestLineage(entityId)
    case "crm-opportunity":
      return getCrmOpportunityLineage(entityId)
    case "anteproject":
      return getAnteprojectLineage(entityId)
    case "proposal":
      return getProposalLineage(entityId)
    case "project":
      return getProjectLineage(entityId)
    default:
      throw new Error(`Unknown entity type: ${entityType}`)
  }
}

/**
 * Get the Voltar (back) route for an entity.
 * Prefers upstream entity route if available, falls back to module list.
 */
export function getVoltarRoute(lineage: JourneyLineage): string {
  if (lineage.upstream) {
    return lineage.upstream.href
  }
  return lineage.defaultBackRoute
}

/**
 * Get drive deep link for a project or obra.
 */
export function getDriveDeepLink(projectId: string): string | null {
  const folder = DRIVE_FOLDERS.find(
    (f) => f.section === "obras" && f.entityId === projectId
  )
  if (!folder) return null
  return `/drive?folderId=${folder.id}&section=obras`
}
