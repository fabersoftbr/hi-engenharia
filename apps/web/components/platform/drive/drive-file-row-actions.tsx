"use client"

import {
  DownloadIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import type { DriveFile } from "@/lib/drive-data"

interface DriveFileRowActionsProps {
  file: DriveFile
  onDownload: (file: DriveFile) => void
  onPreview: (file: DriveFile) => void
  onRename: (file: DriveFile) => void
  onDelete: (file: DriveFile) => void
}

export function DriveFileRowActions({
  file,
  onDownload,
  onPreview,
  onRename,
  onDelete,
}: DriveFileRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontalIcon />
          <span className="sr-only">Acoes</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onDownload(file)}>
          <DownloadIcon />
          Download
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPreview(file)}>
          <EyeIcon />
          Visualizar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRename(file)}>
          <PencilIcon />
          Renomear
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => onDelete(file)}
        >
          <Trash2Icon />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
