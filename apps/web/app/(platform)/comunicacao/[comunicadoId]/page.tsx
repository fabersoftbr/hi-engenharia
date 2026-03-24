import { notFound } from "next/navigation"

import { getComunicadoById } from "@/lib/comunicacao-data"
import { ComunicacaoDetailPage } from "@/components/platform/comunicacao/comunicacao-detail-page"

interface PageProps {
  params: Promise<{ comunicadoId: string }>
}

export default async function Page({ params }: PageProps) {
  const { comunicadoId } = await params
  const comunicado = getComunicadoById(comunicadoId)

  if (!comunicado) {
    notFound()
  }

  return <ComunicacaoDetailPage comunicado={comunicado} />
}
