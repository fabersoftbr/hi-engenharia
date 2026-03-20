import { notFound } from "next/navigation"
import { getBudgetRequestById } from "@/lib/budget-requests-data"
import { BudgetRequestDetailPage } from "@/components/platform/budget-requests/budget-request-detail-page"

interface PageProps {
  params: Promise<{ requestId: string }>
}

export default async function Page({ params }: PageProps) {
  const { requestId } = await params
  const request = getBudgetRequestById(requestId)

  if (!request) {
    notFound()
  }

  return <BudgetRequestDetailPage request={request} />
}
