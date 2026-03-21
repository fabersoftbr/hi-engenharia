"use client"

import {
  DownloadIcon,
  FolderPlusIcon,
  SearchIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

interface DriveToolbarProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onNewFolder: () => void
  onUpload: () => void
  selectionCount?: number
  onBulkDownload?: () => void
  onBulkDelete?: () => void
}

export function DriveToolbar({
  searchQuery,
  onSearchQueryChange,
  onNewFolder,
  onUpload,
  selectionCount = 0,
  onBulkDownload,
  onBulkDelete,
}: DriveToolbarProps) {
  // Selection mode toolbar
  if (selectionCount > 0) {
    return (
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <span className="text-sm font-medium text-foreground">
          {selectionCount} selecionado(s)
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onBulkDownload}>
            <DownloadIcon data-icon="inline-start" />
            Download
          </Button>
          <Button variant="destructive" size="sm" onClick={onBulkDelete}>
            <Trash2Icon data-icon="inline-start" />
            Excluir
          </Button>
        </div>
      </div>
    )
  }

  // Default toolbar
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <div className="relative flex-1">
        <SearchIcon
          data-icon="inline-start"
          className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Buscar em pastas e arquivos"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onNewFolder}>
          <FolderPlusIcon data-icon="inline-start" />
          Nova pasta
        </Button>
        <Button size="sm" onClick={onUpload}>
          <UploadIcon data-icon="inline-start" />
          Upload
        </Button>
      </div>
    </div>
  )
}
