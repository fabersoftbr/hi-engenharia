"use client"

import {
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileTypeIcon,
  ImageIcon,
} from "lucide-react"

import type { DriveFile, FileType } from "@/lib/drive-data"
import { FILE_TYPE_LABELS, formatFileSize } from "@/lib/drive-data"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"

// Map file types to lucide icons (larger for preview)
function getFileTypeIcon(type: FileType, large = false) {
  const sizeClass = large ? "size-16" : "size-4"
  switch (type) {
    case "pdf":
      return <FileTextIcon className={`${sizeClass} text-destructive`} />
    case "image":
      return <ImageIcon className={`${sizeClass} text-blue-500`} />
    case "word":
      return <FileTypeIcon className={`${sizeClass} text-blue-700`} />
    case "excel":
      return <FileSpreadsheetIcon className={`${sizeClass} text-green-600`} />
    default:
      return <FileIcon className={`${sizeClass} text-muted-foreground`} />
  }
}

interface DriveFilePreviewProps {
  file: DriveFile | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDownload: (file: DriveFile) => void
}

export function DriveFilePreview({
  file,
  open,
  onOpenChange,
  onDownload,
}: DriveFilePreviewProps) {
  const isMobile = useIsMobile()

  if (!file) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={isMobile ? "bottom" : "right"}>
        <SheetHeader>
          <SheetTitle>{file.name}</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 py-6">
          {/* File type icon area */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center">
              {getFileTypeIcon(file.type, true)}
            </div>
            <p className="text-sm text-muted-foreground">
              Preview nao disponivel
            </p>
          </div>

          <Separator />

          {/* Metadata section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">
                Nome
              </span>
              <span className="text-sm">{file.name}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">
                Tipo
              </span>
              <span className="text-sm">{FILE_TYPE_LABELS[file.type]}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">
                Tamanho
              </span>
              <span className="font-mono text-sm">
                {formatFileSize(file.size)}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">
                Data de upload
              </span>
              <span className="text-sm">
                {new Date(file.uploadedAt).toLocaleDateString("pt-BR")}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">
                Autor
              </span>
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarFallback>{file.author.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{file.author.name}</span>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" disabled className="flex-1">
                Abrir
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Preview nao disponivel para este tipo de arquivo
            </TooltipContent>
          </Tooltip>
          <Button className="flex-1" onClick={() => onDownload(file)}>
            Download
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
