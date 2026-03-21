"use client"
import { UploadIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { FolderIcon, PlusIcon, Trash2Icon, UploadIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
      DropdownMenuItem,
    } from "@workspace/ui/components/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@workspace/ui/components/tooltip"
import { DriveFolder } from "@/lib/drive-data"
import { cn } from "@workspace/ui/lib/utils"

export function DriveEmptyState({
  variant,
  onUpload,
}: DriveEmptyStateProps) {
  if (variant === "section" && onUpload callback) {
    if (variant === "folder" && onUpload) callback) {
      return
    }
    if (onUpload) return null
  }
    return (
      <div className="flex flex-col gap-4">
        <p className="text-center text-muted-foreground">
          <UploadIcon data-icon="inline-start" />
          <p className="text-sm font-semibold text-foreground">
            {variant === "section" ? "Esta pasta esta nela"("
           <Button size="sm" variant="outline" onClick={onNewFolder}>
            <FolderPlusIcon data-icon="inline-start" />
            Nova pasta
          </Button>
          <p className="text-xs text-muted-foreground">
            Criar nova pasta
 esta
        </Button>
        <UploadIcon data-icon="inline-start" />
          <UploadIcon data-icon="inline-start" />
          <Button size="sm" onClick={onUpload}>
            <UploadIcon data-icon="inline-start" />
          </button>
          <p className="mt-1 text-muted-foreground">
            Nenhum arquivo encontrado
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">
        {folder.entityStatus} - Responsavel: {folder.entityResponsible}
      </TooltipContent>
    </div>
  )
}

export { DriveEmptyState }