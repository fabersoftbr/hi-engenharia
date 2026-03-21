"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@workspace/ui/components/button"
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize?: number
  emptyState?: React.ReactNode
  onRowClick?: (row: Row<TData>) => void
  columnVisibility?: VisibilityState
  onColumnVisibilityChange?: (visibility: VisibilityState) => void
}

// Badge overflow helper: shows up to `max` items then "+N" with tooltip
export function BadgeOverflow({
  items,
  max = 3,
  renderBadge,
}: {
  items: string[]
  max?: number
  renderBadge: (item: string, index: number) => React.ReactNode
}) {
  const visible = items.slice(0, max)
  const overflow = items.slice(max)

  return (
    <div className="flex flex-wrap items-center gap-1">
      {visible.map((item, i) => renderBadge(item, i))}
      {overflow.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-default text-xs text-muted-foreground">
              +{overflow.length}
            </span>
          </TooltipTrigger>
          <TooltipContent>{overflow.join(", ")}</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  emptyState,
  onRowClick,
  columnVisibility: controlledVisibility,
  onColumnVisibilityChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [internalVisibility, setInternalVisibility] =
    React.useState<VisibilityState>({})

  // Support both controlled and uncontrolled column visibility
  const columnVisibility = controlledVisibility ?? internalVisibility
  const handleVisibilityChange = React.useCallback(
    (
      updaterOrValue:
        | VisibilityState
        | ((prev: VisibilityState) => VisibilityState)
    ) => {
      const newValue =
        typeof updaterOrValue === "function"
          ? updaterOrValue(columnVisibility)
          : updaterOrValue
      if (onColumnVisibilityChange) {
        onColumnVisibilityChange(newValue)
      } else {
        setInternalVisibility(newValue)
      }
    },
    [columnVisibility, onColumnVisibilityChange]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: handleVisibilityChange,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  const hasRows = table.getRowModel().rows?.length > 0

  if (!hasRows && emptyState) {
    return <div className="w-full">{emptyState}</div>
  }

  return (
    <div className="w-full space-y-4">
      <div className="rounded-4xl border border-input">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? "cursor-pointer" : ""}
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

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Pagina {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Proximo
          </Button>
        </div>
      </div>
    </div>
  )
}
