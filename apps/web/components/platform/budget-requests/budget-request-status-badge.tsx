import { Badge } from "@workspace/ui/components/badge"
import {
  BUDGET_REQUEST_STATUS_META,
  type BudgetRequestStatus,
} from "@/lib/budget-requests-data"

interface BudgetRequestStatusBadgeProps {
  status: BudgetRequestStatus
}

export function BudgetRequestStatusBadge({
  status,
}: BudgetRequestStatusBadgeProps) {
  const meta = BUDGET_REQUEST_STATUS_META[status]

  return <Badge variant={meta.variant}>{meta.label}</Badge>
}
