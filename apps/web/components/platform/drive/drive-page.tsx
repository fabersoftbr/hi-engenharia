"use client"

import { useState } from "react"
import { FolderIcon } from "lucide-react"

import type { DriveSection, DriveFolder, DriveFile } from "@/lib/drive-data"
import {
  getDriveFolders,
  searchDrive,
  getFilesInFolder,
  getDriveFolderById,
} from "@/lib/drive-data"
import { useActiveProfile } from "@/components/platform/platform-shell-provider"
import { useSimulatedLoading } from "@/lib/use-simulated-loading"
import { TableSkeleton } from "@/components/platform/states/skeletons"
import { EmptyState } from "@/components/platform/states/empty-state"
import { showSuccessToast, showInfoToast } from "@/lib/toast-helpers"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { DriveBreadcrumb } from "./drive-breadcrumb"
import { DriveEmptyState } from "./drive-empty-state"
import { DriveFilePreview } from "./drive-file-preview"
import { DriveFileTable } from "./drive-file-table"
import { DriveFolderList } from "./drive-folder-list"
import { DriveToolbar } from "./drive-toolbar"
import {
  useUploadHandler,
  triggerDownload,
  triggerBulkDownload,
} from "./drive-upload-handler"

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
  const isLoading = useSimulatedLoading()
  const { activeProfile } = useActiveProfile()
  const visibleTabs = getVisibleTabsForProfile(activeProfile)
  const defaultSection = getDefaultSectionForProfile(activeProfile)
  const { triggerUpload } = useUploadHandler()

  const [currentSection, setCurrentSection] =
    useState<DriveSection>(defaultSection)
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [currentSubfolderId, setCurrentSubfolderId] = useState<string | null>(
    null
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [previewFile, setPreviewFile] = useState<DriveFile | null>(null)
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([])
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

  // Get current folder data
  const currentFolder: DriveFolder | undefined = currentFolderId
    ? getDriveFolderById(currentFolderId)
    : undefined

  // Get current subfolder name
  const currentSubfolder = currentFolder?.subfolders.find(
    (sf) => sf.id === currentSubfolderId
  )

  // Get files in current folder/subfolder
  const currentFiles =
    currentFolderId && currentSubfolderId
      ? getFilesInFolder(currentFolderId, currentSubfolderId)
      : currentFolderId
        ? getFilesInFolder(currentFolderId, currentSubfolderId)
        : []

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
    triggerUpload()
  }

  const handleNewFolder = () => {
    showInfoToast("Funcionalidade simulada")
  }

  const handleFolderAction = (folderId: string, action: string) => {
    // Placeholder for folder actions
    console.log(`Folder ${folderId} action: ${action}`)
  }

  const handleFileClick = (file: DriveFile) => {
    setPreviewFile(file)
  }

  const handlePreviewClose = (open: boolean) => {
    if (!open) {
      setPreviewFile(null)
    }
  }

  const handleDownload = (file: DriveFile) => {
    triggerDownload(file)
  }

  const handleDeleteFile = (file: DriveFile) => {
    // Simulated delete - in real app this would call an API
    showSuccessToast("Arquivo excluido")
  }

  const handleRename = (file: DriveFile) => {
    // Placeholder for rename functionality
    showInfoToast("Funcionalidade simulada")
  }

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedFileIds(selectedIds)
  }

  const handleBulkDownload = () => {
    triggerBulkDownload(selectedFileIds.length)
  }

  const handleBulkDelete = () => {
    setBulkDeleteDialogOpen(true)
  }

  const handleBulkDeleteConfirm = () => {
    setBulkDeleteDialogOpen(false)
    showSuccessToast(`${selectedFileIds.length} arquivos excluidos`)
    setSelectedFileIds([])
  }

  // Render content based on state
  const renderContent = () => {
    // Loading state
    if (isLoading) {
      return <TableSkeleton rows={8} />
    }

    // Search mode
    if (searchResults) {
      if (
        searchResults.folders.length === 0 &&
        searchResults.filesWithFolder.length === 0
      ) {
        return (
          <EmptyState
            title="Nenhum resultado para sua busca"
            description="Tente ajustar os termos de busca."
          />
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

    // Inside a folder with subfolder selected - show file table
    if (currentFolderId && currentSubfolderId) {
      return (
        <DriveFileTable
          files={currentFiles}
          onFileClick={handleFileClick}
          onSelectionChange={handleSelectionChange}
          onDeleteFile={handleDeleteFile}
          onDownload={handleDownload}
          onRename={handleRename}
        />
      )
    }

    // Inside a folder (show subfolders + files)
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
          <DriveFileTable
            files={currentFiles}
            onFileClick={handleFileClick}
            onSelectionChange={handleSelectionChange}
            onDeleteFile={handleDeleteFile}
            onDownload={handleDownload}
            onRename={handleRename}
          />
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
        selectionCount={selectedFileIds.length}
        onBulkDownload={handleBulkDownload}
        onBulkDelete={handleBulkDelete}
      />

      {/* Content */}
      {renderContent()}

      {/* File Preview Sheet */}
      <DriveFilePreview
        file={previewFile}
        open={previewFile !== null}
        onOpenChange={handlePreviewClose}
        onDownload={handleDownload}
      />

      {/* Bulk Delete Confirmation */}
      <AlertDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir arquivos</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir os {selectedFileIds.length}{" "}
              arquivos selecionados?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDeleteConfirm}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
