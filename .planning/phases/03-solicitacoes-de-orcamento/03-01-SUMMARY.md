---
phase: 03-solicitacoes-de-orcamento
plan: 01
subsystem: orcamentos
tags: [data-contract, ui-primitives, list-page, filters, shadcn]
requires: [phase-01-shell, phase-02-dashboard]
provides: [budget-requests-data, data-table, table, select, status-badge]
affects: [orcamentos-module]
key_decisions:
  - Shared data contract pattern for budget requests module
  - DataTable component in @workspace/ui for reusable table behavior
  - Status badge variant mapping via BUDGET_REQUEST_STATUS_META
tech_stack:
  added:
    - "@tanstack/react-table"
    - "@radix-ui/react-select"
  patterns:
    - Mock data contract with typed interfaces
    - Generic DataTable with row click navigation
    - shadcn-based table and select primitives
key_files:
  created:
    - apps/web/lib/budget-requests-data.ts
    - apps/web/components/platform/budget-requests/budget-request-status-badge.tsx
    - apps/web/components/platform/budget-requests/budget-requests-list-page.tsx
    - apps/web/components/platform/budget-requests/budget-requests-toolbar.tsx
    - packages/ui/src/components/table.tsx
    - packages/ui/src/components/data-table.tsx
    - packages/ui/src/components/select.tsx
  modified:
    - apps/web/app/(platform)/orcamentos/page.tsx
    - packages/ui/package.json
metrics:
  duration: 12min
  tasks_completed: 3
  files_modified: 9
  completed_at: "2026-03-20T16:28:00Z"
---

# Phase 03 Plan 01: Budget Requests List Foundation

## One-liner

Budget requests list with shared data contract, DataTable/select UI primitives, filter toolbar, and empty-state handling.

## Summary

This plan establishes the foundational components for the orcamentos (budget requests) module by:

1. Creating a shared mock data contract (`budget-requests-data.ts`) with typed interfaces, status metadata, and seeded records
2. Adding reusable UI primitives (Table, DataTable, Select) to the `@workspace/ui` package
3. Replacing the placeholder page with a full list screen including filters, status badges, and row navigation

The `/orcamentos` route now renders a real list with 6 seeded budget request records, a filter bar with status select and search, and proper empty-state handling for both no-data and no-results scenarios.

## Changes Made

### Task 1: Data Contract and Status Badge

- Created `apps/web/lib/budget-requests-data.ts` with:
  - `BudgetRequestStatus` type union (novo, em-analise, aprovado, recusado)
  - `BudgetRequestAttachment` and `BudgetRequestRecord` interfaces
  - `BUDGET_REQUEST_STATUS_META` with label/variant mappings
  - `BUDGET_REQUESTS` array with 6 seeded records
  - `PREVIEW_SUBMITTED_REQUEST_ID` constant for confirmation flow
  - Helper functions: `getBudgetRequests()`, `getBudgetRequestById()`, `getBudgetRequestStatusOptions()`
- Created `budget-request-status-badge.tsx` component using Badge and status metadata

### Task 2: Shared UI Primitives

- Added dependencies to `packages/ui/package.json`:
  - `@tanstack/react-table` for table state management
  - `@radix-ui/react-select` for select primitives
- Created `packages/ui/src/components/table.tsx` with Table, TableHeader, TableBody, TableRow, TableHead, TableCell primitives
- Created `packages/ui/src/components/select.tsx` with Select, SelectTrigger, SelectContent, SelectItem, SelectValue exports
- Created `packages/ui/src/components/data-table.tsx` with generic DataTable component featuring:
  - Core, sorted, filtered, and pagination row models
  - `onRowClick` prop for row navigation
  - `emptyState` prop for custom empty content
  - `pageSize` prop with default of 10

### Task 3: List Page and Toolbar

- Replaced `apps/web/app/(platform)/orcamentos/page.tsx` to render `BudgetRequestsListPage` instead of `ModulePlaceholderPage`
- Created `budget-requests-list-page.tsx` with:
  - Column definitions for ID, Cliente, Telefone, Cidade, Status, Data
  - Status filter, search input, and "Pendentes" toggle
  - Row navigation via `onRowClick` to `/orcamentos/{id}`
  - Empty state for no requests with "Nova solicitacao" CTA
  - No-results state with "Limpar filtros" action
  - Mobile-responsive column visibility (hide Telefone, Cidade, Data on narrow screens)
- Created `budget-requests-toolbar.tsx` with filter controls

## Deviations from Plan

None - plan executed exactly as written.

## Acceptance Criteria Verified

- [x] `apps/web/lib/budget-requests-data.ts` contains `export type BudgetRequestStatus`
- [x] `apps/web/lib/budget-requests-data.ts` contains `export const BUDGET_REQUEST_STATUS_META`
- [x] `apps/web/lib/budget-requests-data.ts` contains the exact string `orc-2026-9001`
- [x] `apps/web/lib/budget-requests-data.ts` contains exact labels Novo, Em analise, Aprovado, Recusado
- [x] `packages/ui/package.json` contains `@tanstack/react-table`
- [x] `packages/ui/package.json` contains `@radix-ui/react-select`
- [x] `packages/ui/src/components/data-table.tsx` contains `getCoreRowModel`, `getFilteredRowModel`, `getPaginationRowModel`, `onRowClick`
- [x] `apps/web/app/(platform)/orcamentos/page.tsx` contains `BudgetRequestsListPage`
- [x] `apps/web/app/(platform)/orcamentos/page.tsx` does not contain `ModulePlaceholderPage`
- [x] List page contains exact CTA "Nova solicitacao"
- [x] Toolbar contains exact placeholder "Buscar por cliente ou telefone"
- [x] List page contains exact empty-state heading "Nenhuma solicitacao encontrada"
- [x] List page contains exact no-results heading "Nenhum resultado para sua busca"
- [x] List page contains exact reset action "Limpar filtros"

## Verification Commands

```bash
pnpm --filter web lint && pnpm --filter web typecheck
```

Result: PASSED (0 errors, 5 pre-existing warnings)

## Files Modified

| File | Action | Purpose |
|------|--------|---------|
| `apps/web/lib/budget-requests-data.ts` | Created | Mock data contract with types and helpers |
| `apps/web/components/platform/budget-requests/budget-request-status-badge.tsx` | Created | Status badge component |
| `apps/web/components/platform/budget-requests/budget-requests-list-page.tsx` | Created | List page with filters and navigation |
| `apps/web/components/platform/budget-requests/budget-requests-toolbar.tsx` | Created | Filter toolbar component |
| `apps/web/app/(platform)/orcamentos/page.tsx` | Modified | Replaced placeholder with list page |
| `packages/ui/src/components/table.tsx` | Created | Table primitives |
| `packages/ui/src/components/data-table.tsx` | Created | Generic DataTable wrapper |
| `packages/ui/src/components/select.tsx` | Created | Select primitives |
| `packages/ui/package.json` | Modified | Added tanstack/react-table and radix-ui/react-select |

## Next Steps

- Plan 03-02: New request form with validation and simulated attachments
- Plan 03-03: Detail page, status timeline, and confirmation modal
