import { notFound } from "next/navigation"
import { getProposalById } from "@/lib/proposals-data"
import { ProposalDetailPage } from "@/components/platform/proposals/proposal-detail-page"

interface ProposalDetailRouteProps {
  params: Promise<{ proposalId: string }>
}

export default async function ProposalDetailRoute({
  params,
}: ProposalDetailRouteProps) {
  const { proposalId } = await params
  const proposal = getProposalById(proposalId)

  if (!proposal) {
    notFound()
  }

  return <ProposalDetailPage proposal={proposal} />
}
