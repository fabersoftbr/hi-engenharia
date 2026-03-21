"use client"

import { Badge } from "@workspace/ui/components/badge"
import { PROPOSAL_STATUS_META, type ProposalStatus } from "@/lib/proposals-data"

interface ProposalStatusBadgeProps {
  status: ProposalStatus
}

export function ProposalStatusBadge({ status }: ProposalStatusBadgeProps) {
  const meta = PROPOSAL_STATUS_META[status]
  return <Badge variant={meta.variant}>{meta.label}</Badge>
}
