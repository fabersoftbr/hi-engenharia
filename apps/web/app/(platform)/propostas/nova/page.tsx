"use client"

import { Suspense } from "react"
import { ProposalBuilderPage } from "@/components/platform/proposals/proposal-builder-page"

function ProposalBuilderLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-muted-foreground">Carregando...</p>
    </div>
  )
}

export default function NovaPropostaPage() {
  return (
    <Suspense fallback={<ProposalBuilderLoader />}>
      <ProposalBuilderPage />
    </Suspense>
  )
}
