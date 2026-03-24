import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/projects-data"
import { ProjectWorkTrackerPage } from "@/components/platform/projects/project-work-tracker-page"

interface PageProps {
  params: Promise<{ projectId: string }>
}

export default async function Page({ params }: PageProps) {
  const { projectId } = await params
  const project = getProjectById(projectId)

  if (!project) {
    notFound()
  }

  return <ProjectWorkTrackerPage project={project} />
}
