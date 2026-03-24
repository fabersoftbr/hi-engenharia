"use client"

import { SearchIcon } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { getProposalStatusOptions } from "@/lib/proposals-data"

interface ProposalsToolbarProps {
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

export function ProposalsToolbar({
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchQueryChange,
}: ProposalsToolbarProps) {
  const statusOptions = [
    { value: "all", label: "Todos os status" },
    ...getProposalStatusOptions(),
  ]

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative flex-1">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder=""
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  )
}
