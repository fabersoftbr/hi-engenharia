import { notFound } from "next/navigation"
import { getCrmOpportunityById } from "@/lib/crm-data"
import { CrmOpportunityDetailPage } from "@/components/platform/crm/crm-opportunity-detail-page"

interface PageProps {
  params: Promise<{ opportunityId: string }>
}

export default async function Page({ params }: PageProps) {
  const { opportunityId } = await params
  const opportunity = getCrmOpportunityById(opportunityId)

  if (!opportunity) {
    notFound()
  }

  return <CrmOpportunityDetailPage opportunity={opportunity} />
}
