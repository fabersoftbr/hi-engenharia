"use client"

import { useState } from "react"
import { FolderIcon } from "lucide-react"

import type { DriveSection, DriveFolder } from "@/lib/drive-data"
import { getDriveFolders, searchDrive } from "@/lib/drive-data"
import { useActiveProfile } from "@/components/platform/platform-shell-provider"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { DriveBreadcrumb } from "./drive-breadcrumb"
import { DriveEmptyState } from "./drive-empty-state"
import { DriveFolderList } from "./drive-folder-list"
import { DriveToolbar } from "./drive-toolbar"

// Helper to get default section based on profile
function getDefaultSectionForProfile(profile: string): DriveSection {
  // Operations only sees Obras
  if (profile === "operations") return "obras"
  // Admin, Cliente, and others see Oportunidades by default
  return "oportunidades"
}

// Helper to determine which tabs to show
function getVisibleTabsForProfile(profile: string): DriveSection[] {
  // Operations only sees Obras tab
  if (profile === "operations") return ["obras"]
  // Admin, Cliente, and others see both tabs
  return ["oportunidades", "obras"]
}

export function DrivePage() {
  const { activeProfile } = useActiveProfile()
  const visibleTabs = getVisibleTabsForProfile(activeProfile)
  const defaultSection = getDefaultSectionForProfile(activeProfile)

  const [currentSection, setCurrentSection] =
    useState<DriveSection>(defaultSection)
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [currentSubfolderId, setCurrentSubfolderId] = useState<string | null>(
    null
  )
  const [searchQuery, setSearchQuery] = useState("")

  // Get current folder data
  const currentFolder: DriveFolder | undefined = currentFolderId
    ? getDriveFolders(currentSection).find((f) => f.id === currentFolderId)
    : undefined

  // Get current subfolder name
  const currentSubfolder = currentFolder?.subfolders.find(
    (sf) => sf.id === currentSubfolderId
  )

  // Search results
  const searchResults = searchQuery.trim()
    ? searchDrive(searchQuery, currentSection)
    : null

  // Handlers
  const handleTabChange = (value: string) => {
    setCurrentSection(value as DriveSection)
    setCurrentFolderId(null)
    setCurrentSubfolderId(null)
    setSearchQuery("")
  }

  const handleFolderClick = (folderId: string) => {
    setCurrentFolderId(folderId)
    setCurrentSubfolderId(null)
  }

  const handleSubfolderClick = (subfolderId: string) => {
    setCurrentSubfolderId(subfolderId)
  }

  const handleNavigateRoot = () => {
    setCurrentFolderId(null)
    setCurrentSubfolderId(null)
  }

  const handleNavigateSection = () => {
    setCurrentFolderId(null)
    setCurrentSubfolderId(null)
  }

  const handleNavigateFolder = () => {
    setCurrentSubfolderId(null)
  }

  const handleUpload = () => {
    // Placeholder for upload functionality (Plan 07-02)
    console.log("Upload clicked")
  }

  const handleNewFolder = () => {
    // Placeholder for new folder functionality
    console.log("New folder clicked")
  }

  const handleFolderAction = (folderId: string, action: string) => {
    // Placeholder for folder actions
    console.log(`Folder ${folderId} action: ${action}`)
  }

  // Render content based on state
  const renderContent = () => {
    // Search mode
    if (searchResults) {
      if (
        searchResults.folders.length === 0 &&
        searchResults.filesWithFolder.length === 0
      ) {
        return (
          <div className="py-12 text-center">
            <p className="text-base font-medium text-foreground">
              Nenhum resultado para sua busca
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tente ajustar os termos de busca.
            </p>
          </div>
        )
      }

      return (
        <div className="flex flex-col gap-4">
          {searchResults.folders.length > 0 && (
            <DriveFolderList
              folders={searchResults.folders}
              onFolderClick={handleFolderClick}
              onFolderAction={handleFolderAction}
            />
          )}
          {searchResults.filesWithFolder.map(({ file, folder }) => (
            <div
              key={file.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-secondary/50"
            >
              <span className="truncate text-sm">{file.name}</span>
              <span className="text-xs text-muted-foreground">
                em {folder.name}
              </span>
            </div>
          ))}
        </div>
      )
    }

    // Inside a folder with subfolder selected
    if (currentFolderId && currentSubfolderId) {
      return (
        <div className="py-8 text-center text-muted-foreground">
          Listagem de arquivos sera implementada no plano 07-02
        </div>
      )
    }

    // Inside a folder (show subfolders + placeholder for files)
    if (currentFolderId && currentFolder) {
      const subfolders = currentFolder.subfolders

      return (
        <div className="flex flex-col gap-6">
          {subfolders.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {subfolders.map((sf) => (
                <Card
                  key={sf.id}
                  className="cursor-pointer hover:bg-secondary/50"
                  size="sm"
                  onClick={() => handleSubfolderClick(sf.id)}
                >
                  <CardContent className="flex items-center gap-3 py-3">
                    <FolderIcon className="size-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{sf.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {sf.fileCount} arquivos
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="py-8 text-center text-muted-foreground">
            Listagem de arquivos sera implementada no plano 07-02
          </div>
        </div>
      )
    }

    // Root view - show tabs with folder lists
    return (
      <Tabs value={currentSection} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          {visibleTabs.includes("oportunidades") && (
            <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
          )}
          {visibleTabs.includes("obras") && (
            <TabsTrigger value="obras">Obras</TabsTrigger>
          )}
        </TabsList>

        {visibleTabs.includes("oportunidades") && (
          <TabsContent value="oportunidades">
            {getDriveFolders("oportunidades").length === 0 ? (
              <DriveEmptyState variant="section" onUpload={handleUpload} />
            ) : (
              <DriveFolderList
                folders={getDriveFolders("oportunidades")}
                onFolderClick={handleFolderClick}
                onFolderAction={handleFolderAction}
              />
            )}
          </TabsContent>
        )}

        {visibleTabs.includes("obras") && (
          <TabsContent value="obras">
            {getDriveFolders("obras").length === 0 ? (
              <DriveEmptyState variant="section" onUpload={handleUpload} />
            ) : (
              <DriveFolderList
                folders={getDriveFolders("obras")}
                onFolderClick={handleFolderClick}
                onFolderAction={handleFolderAction}
              />
            )}
          </TabsContent>
        )}
      </Tabs>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <DriveBreadcrumb
        section={currentFolderId ? currentSection : null}
        folderName={currentFolder?.name ?? null}
        subfolderName={currentSubfolder?.name ?? null}
        onNavigateRoot={handleNavigateRoot}
        onNavigateSection={handleNavigateSection}
        onNavigateFolder={handleNavigateFolder}
      />

      {/* Toolbar */}
      <DriveToolbar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onNewFolder={handleNewFolder}
        onUpload={handleUpload}
      />

      {/* Content */}
      {renderContent()}
    </div>
  )
}
