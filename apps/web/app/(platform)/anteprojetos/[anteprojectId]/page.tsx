import { notFound } from "next/navigation"
import { getAnteprojectById } from "@/lib/anteprojects-data"
import { AnteprojectDetailPage } from "@/components/platform/anteprojects/anteproject-detail-page"

interface PageProps {
  params: Promise<{ anteprojectId: string }>
}

export default async function Page({ params }: PageProps) {
  const { anteprojectId } = await params
  const anteproject = getAnteprojectById(anteprojectId)

  if (!anteproject) {
    notFound()
  }

  return <AnteprojectDetailPage anteproject={anteproject} />
}
