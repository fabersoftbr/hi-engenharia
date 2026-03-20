---
phase: 03-solicitacoes-de-orcamento
plan: 02
subsystem: orcamentos
tags: [form, validation, react-hook-form, zod, attachments, shadcn]
requires: [phase-03-01]
provides: [budget-request-form, budget-request-form-schema, attachments-field]
affects: [orcamentos-module]
key_decisions:
  - React Hook Form with Zod resolver for typed form validation
  - Single-page commercial form layout with three locked sections
  - Simulated attachments with add/preview/remove actions (no real upload)
tech_stack:
  added:
    - "react-hook-form"
    - "@hookform/resolvers"
    - "zod"
  patterns:
    - Zod schema with inferred TypeScript types
    - Form sections: Dados do cliente, Consumo/Projeto, Anexos
    - Inline validation errors below invalid fields
key_files:
  created:
    - packages/ui/src/components/textarea.tsx
    - apps/web/lib/budget-request-form.ts
    - apps/web/components/platform/budget-requests/budget-request-form.tsx
    - apps/web/components/platform/budget-requests/budget-request-attachments-field.tsx
  modified:
    - apps/web/app/(platform)/orcamentos/nova/page.tsx
    - apps/web/package.json
metrics:
  duration: 15min
  tasks_completed: 3
  files_modified: 6
  completed_at: "2026-03-20T17:10:00Z"
---

# Phase 03 Plan 02: New Budget Request Form

## One-liner

Single-page commercial intake form with typed validation, three locked sections, and simulated attachments.

## Summary

This plan delivers the new budget request creation flow by:

1. Adding the Textarea primitive to `@workspace/ui` and app-level form dependencies (react-hook-form, @hookform/resolvers, zod)
2. Creating a typed form schema with Zod for clientName, phone, city, monthlyConsumption, and notes fields
3. Building a single-page form with three sections (Dados do cliente, Consumo/Projeto, Anexos) and inline validation
4. Implementing simulated attachments with add/preview/remove actions

The `/orcamentos/nova` route now renders a complete intake form with required field indicators (*), inline validation errors, and a simulated attachment area.

## Changes Made

### Task 1: Textarea and Form Dependencies

- Created `packages/ui/src/components/textarea.tsx` following Input styling conventions
- Added dependencies to `apps/web/package.json`:
  - `react-hook-form` for form state management
  - `@hookform/resolvers` for Zod integration
  - `zod` for schema validation

### Task 2: Form Schema and Shell

- Created `apps/web/lib/budget-request-form.ts` with:
  - `budgetRequestFormSchema` with Zod validation
  - Fields: clientName, phone, city, monthlyConsumption (required), notes (optional)
  - `BudgetRequestFormValues` type inference
  - `budgetRequestFormDefaultValues` for initial state
- Updated `apps/web/app/(platform)/orcamentos/nova/page.tsx` to render BudgetRequestForm
- Created `budget-request-form.tsx` with three section layout:
  - Dados do cliente (clientName, phone, city)
  - Consumo/Projeto (monthlyConsumption, notes)
  - Anexos (attachment field)

### Task 3: Inline Validation and Attachments

- Added inline validation errors below each form field
- Required fields show visible asterisk (*) in labels
- Created `budget-request-attachments-field.tsx` with:
  - Hidden file input with click trigger
  - Simulated file list with name and size
  - "Visualizar" action (simulated alert)
  - "Remover" action (removes from list)
  - "Adicionar anexo" button
- Submit button disabled until required fields filled
- "Voltar para a listagem" navigation link

## Deviations from Plan

- Added `zod` dependency (missed in initial commit, fixed in follow-up)

## Acceptance Criteria Verified

- [x] `packages/ui/src/components/textarea.tsx` contains `function Textarea`
- [x] `apps/web/package.json` contains `react-hook-form`
- [x] `apps/web/package.json` contains `@hookform/resolvers`
- [x] `apps/web/package.json` contains `zod`
- [x] `apps/web/lib/budget-request-form.ts` contains `budgetRequestFormSchema`
- [x] `apps/web/lib/budget-request-form.ts` contains exact field names: clientName, phone, city, monthlyConsumption, notes
- [x] `apps/web/app/(platform)/orcamentos/nova/page.tsx` contains `BudgetRequestForm`
- [x] `apps/web/components/platform/budget-requests/budget-request-form.tsx` contains section titles: Dados do cliente, Consumo/Projeto, Anexos
- [x] `apps/web/components/platform/budget-requests/budget-request-form.tsx` contains visible `*` for required fields
- [x] `apps/web/components/platform/budget-requests/budget-request-attachments-field.tsx` contains `Adicionar anexo`
- [x] `apps/web/components/platform/budget-requests/budget-request-attachments-field.tsx` contains `Visualizar` and `Remover`
- [x] `apps/web/components/platform/budget-requests/budget-request-form.tsx` contains `Enviar solicitacao`
- [x] `apps/web/components/platform/budget-requests/budget-request-form.tsx` contains `Voltar para a listagem`

## Verification Commands

```bash
pnpm lint && pnpm typecheck
```

Result: PASSED (0 errors, pre-existing warnings only)

## Files Modified

| File | Action | Purpose |
|------|--------|---------|
| `packages/ui/src/components/textarea.tsx` | Created | Textarea primitive matching Input styling |
| `apps/web/lib/budget-request-form.ts` | Created | Zod schema and form types |
| `apps/web/components/platform/budget-requests/budget-request-form.tsx` | Created | Single-page form with three sections |
| `apps/web/components/platform/budget-requests/budget-request-attachments-field.tsx` | Created | Simulated attachment field |
| `apps/web/app/(platform)/orcamentos/nova/page.tsx` | Modified | Renders BudgetRequestForm |
| `apps/web/package.json` | Modified | Added react-hook-form, @hookform/resolvers, zod |

## Next Steps

- Plan 03-03: Detail page, status timeline, status change dialog, and submission confirmation
