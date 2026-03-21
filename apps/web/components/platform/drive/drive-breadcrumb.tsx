"use client"

import type { DriveSection } from "@/lib/drive-data"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"

interface DriveBreadcrumbProps {
  section: DriveSection | null
  folderName: string | null
  subfolderName: string | null
  onNavigateRoot: () => void
  onNavigateSection: () => void
  onNavigateFolder: () => void
}

export function DriveBreadcrumb({
  section,
  folderName,
  subfolderName,
  onNavigateRoot,
  onNavigateSection,
  onNavigateFolder,
}: DriveBreadcrumbProps) {
  const sectionLabel = section === "oportunidades" ? "Oportunidades" : "Obras"

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <button
              type="button"
              onClick={onNavigateRoot}
              className="cursor-pointer"
            >
              Drive
            </button>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {section && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {folderName ? (
                <BreadcrumbLink asChild>
                  <button
                    type="button"
                    onClick={onNavigateSection}
                    className="cursor-pointer"
                  >
                    {sectionLabel}
                  </button>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{sectionLabel}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {folderName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {subfolderName ? (
                <BreadcrumbLink asChild>
                  <button
                    type="button"
                    onClick={onNavigateFolder}
                    className="cursor-pointer"
                  >
                    {folderName}
                  </button>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{folderName}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {subfolderName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{subfolderName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
