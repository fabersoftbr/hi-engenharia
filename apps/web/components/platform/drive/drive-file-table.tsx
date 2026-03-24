"use client"

import * as React from "react"
import {
  ColumnDef,
  RowSelectionState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
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
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
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
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"

import { DriveEmptyState } from "./drive-empty-state"
import { DriveFileRowActions } from "./drive-file-row-actions"

// Map file types to lucide icons
function getFileTypeIcon(type: FileType) {
  switch (type) {
    case "pdf":
      return <FileTextIcon className="size-4 text-destructive" />
    case "image":
      return <ImageIcon className="size-4 text-blue-500" />
    case "word":
      return <FileTypeIcon className="size-4 text-blue-700" />
    case "excel":
      return <FileSpreadsheetIcon className="size-4 text-green-600" />
    default:
      return <FileIcon className="size-4 text-muted-foreground" />
  }
}

interface DriveFileTableProps {
  files: DriveFile[]
  onFileClick: (file: DriveFile) => void
  onSelectionChange: (selectedIds: string[]) => void
  onDeleteFile: (file: DriveFile) => void
  onDownload: (file: DriveFile) => void
  onRename?: (file: DriveFile) => void
  clearSelectionKey?: number
}

export function DriveFileTable({
  files,
  onFileClick,
  onSelectionChange,
  onDeleteFile,
  onDownload,
  onRename,
  clearSelectionKey,
}: DriveFileTableProps) {
  const isMobile = useIsMobile()
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [fileToDelete, setFileToDelete] = React.useState<DriveFile | null>(null)

  // Drive responsive column visibility via shared contract
  const columnVisibility: VisibilityState = React.useMemo(
    () => ({
      size: !isMobile,
      author: !isMobile,
    }),
    [isMobile]
  )

  // Notify parent when selection changes
  React.useEffect(() => {
    const selectedIds = Object.keys(rowSelection).filter(
      (key) => rowSelection[key]
    )
    onSelectionChange(selectedIds)
  }, [rowSelection, onSelectionChange])

  // Clear selection when parent changes clearSelectionKey
  React.useEffect(() => {
    if (clearSelectionKey !== undefined && clearSelectionKey > 0) {
      setRowSelection({})
    }
  }, [clearSelectionKey])

  // Handle single file delete confirmation
  const handleDeleteClick = (file: DriveFile) => {
    setFileToDelete(file)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (fileToDelete) {
      onDeleteFile(fileToDelete)
    }
    setDeleteDialogOpen(false)
    setFileToDelete(null)
  }

  // Column definitions
  const columns: ColumnDef<DriveFile>[] = [
    // Select column
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todos"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={(e) => e.stopPropagation()}
          aria-label="Selecionar linha"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // Nome column
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => {
        const name = row.getValue("name") as string
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="block max-w-[200px] cursor-pointer truncate">
                {name}
              </span>
            </TooltipTrigger>
            <TooltipContent>{name}</TooltipContent>
          </Tooltip>
        )
      },
    },
    // Tipo column
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => {
        const type = row.getValue("type") as FileType
        return (
          <div className="flex items-center gap-2">
            {getFileTypeIcon(type)}
            <span>{FILE_TYPE_LABELS[type]}</span>
          </div>
        )
      },
    },
    // Tamanho column - hidden on mobile via columnVisibility
    {
      accessorKey: "size",
      header: "Tamanho",
      cell: ({ row }) => {
        const size = row.getValue("size") as number
        return <span className="font-mono text-sm">{formatFileSize(size)}</span>
      },
    },
    // Data de upload column
    {
      accessorKey: "uploadedAt",
      header: "Data",
      cell: ({ row }) => {
        const uploadedAt = row.getValue("uploadedAt") as string
        return new Date(uploadedAt).toLocaleDateString("pt-BR")
      },
    },
    // Autor column - hidden on mobile via columnVisibility
    {
      accessorKey: "author",
      header: "Autor",
      cell: ({ row }) => {
        const file = row.original
        return (
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback>{file.author.initials}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline">{file.author.name}</span>
          </div>
        )
      },
    },
    // Acoes column
    {
      id: "actions",
      cell: ({ row }) => {
        const file = row.original
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <DriveFileRowActions
              file={file}
              onDownload={onDownload}
              onPreview={onFileClick}
              onRename={onRename ?? (() => {})}
              onDelete={handleDeleteClick}
            />
          </div>
        )
      },
    },
  ]

  // TanStack Table manages a mutable instance; React Compiler skipping
  // memoization here is expected for this local table object.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: files,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      rowSelection,
      columnVisibility,
    },
  })

  // Empty state
  if (files.length === 0) {
    return <DriveEmptyState variant="folder" onUpload={() => {}} />
  }

  return (
    <>
      <div className="rounded-4xl border border-input">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onFileClick(row.original)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Single file delete confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir arquivo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir{" "}
              <span className="font-medium">
                {fileToDelete?.name ?? "este arquivo"}
              </span>
              ? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
