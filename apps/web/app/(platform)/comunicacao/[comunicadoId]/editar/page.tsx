import { notFound } from "next/navigation"

import { getComunicadoById } from "@/lib/comunicacao-data"
import { ComunicacaoEditPage } from "@/components/platform/comunicacao/comunicacao-edit-page"

interface PageProps {
  params: Promise<{ comunicadoId: string }>
}

export default async function EditarComunicadoPage({ params }: PageProps) {
  const { comunicadoId } = await params
  const comunicado = getComunicadoById(comunicadoId)

  if (!comunicado) {
    notFound()
  }

  return <ComunicacaoEditPage comunicado={comunicado} />
}
