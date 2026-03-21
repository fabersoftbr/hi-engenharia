import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/projects-data"
import { ProjectDetailPage } from "@/components/platform/projects/project-detail-page"

interface PageProps {
  params: Promise<{ projectId: string }>
}

export default async function Page({ params }: PageProps) {
  const { projectId } = await params
  const project = getProjectById(projectId)

  if (!project) {
    notFound()
  }

  return <ProjectDetailPage project={project} />
}
