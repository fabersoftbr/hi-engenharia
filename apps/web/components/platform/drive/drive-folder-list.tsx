"use client"

import { FolderIcon, MoreHorizontalIcon } from "lucide-react"

import type { DriveFolder } from "@/lib/drive-data"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

interface DriveFolderListProps {
  folders: DriveFolder[]
  onFolderClick: (folderId: string) => void
  onFolderAction: (folderId: string, action: string) => void
}

export function DriveFolderList({
  folders,
  onFolderClick,
  onFolderAction,
}: DriveFolderListProps) {
  if (folders.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      {folders.map((folder) => (
        <TooltipProvider key={folder.id} delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-secondary/50"
                onClick={() => onFolderClick(folder.id)}
              >
                <FolderIcon className="size-5 shrink-0 text-muted-foreground" />
                <div className="flex min-w-0 flex-1 flex-col md:flex-row md:items-center md:gap-4">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {folder.name}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>
                      {new Date(folder.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    <span>{folder.fileCount} arquivos</span>
                  </div>
                </div>
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onFolderAction(folder.id, "upload")}
                      >
                        Upload
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFolderAction(folder.id, "rename")}
                      >
                        Renomear
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onFolderAction(folder.id, "delete")}
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {folder.entityStatus} - {folder.entityResponsible}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}
