---
plan: 05-06
phase: 05-anteprojetos-propostas-e-pre-os
status: complete
completed_at: 2026-03-23T12:00:00Z
commit: dabf01b
---

## Summary

Fixed two UAT-reported UX issues in Phase 5.

## Changes

### Task 1: Filter Placeholder Clarity

**Files modified:**
- `apps/web/lib/anteprojects-data.ts`
- `apps/web/components/platform/anteprojects/anteproject-toolbar.tsx`

**Changes:**
- Changed "Todos os responsaveis" to "Selecione um responsavel..."
- Changed "Todas as prioridades" to "Selecione a prioridade..."
- Updated SelectValue placeholders to match the new option labels

### Task 2: Price Item Detail Dialog Height

**Files modified:**
- `apps/web/components/platform/price-table/price-item-detail-dialog.tsx`

**Changes:**
- Added `max-h-[85vh] flex flex-col` to DialogContent for desktop
- Wrapped content in scrollable div with `overflow-y-auto`
- Dialog now has constrained height and scrollable content when pricing table has many rows

## Verification

- [x] Typecheck passed
- [x] Lint passed (0 errors)
- [x] Filter shows clear placeholder prompting user to select
- [x] Dialog has max-height constraint with scrollable content

## Key Files

### Created
- None

### Modified
- `apps/web/lib/anteprojects-data.ts`
- `apps/web/components/platform/anteprojects/anteproject-toolbar.tsx`
- `apps/web/components/platform/price-table/price-item-detail-dialog.tsx`

## UAT Gaps Closed

| Test | Issue | Severity | Resolution |
|------|-------|----------|------------|
| 5 | Filter "Responsavel" UX - no clear prompt | major | Changed placeholder to "Selecione um responsavel..." |
| 11 | Price item detail dialog too tall | cosmetic | Added max-h-[85vh] with scrollable content |

## Issues

None - both fixes applied cleanly.
