---
status: diagnosed
trigger: "Investigar issue de UX no módulo Comunicação - Campos de formulário inválidos não exibem estilização de erro (data-invalid no Field, aria-invalid no input) nos formulários de publicação/edição de comunicados"
created: 2026-03-23T12:00:00Z
updated: 2026-03-23T12:00:00Z
symptoms_prefilled: true
goal: find_root_cause_only
---

## Current Focus

hypothesis: CONFIRMED - SelectTrigger missing aria-invalid styles; Field data-invalid styling only affects text color
test: Reviewed Input, Textarea, SelectTrigger, and Field component implementations
expecting: Found that SelectTrigger lacks aria-invalid CSS and Field styling is minimal
next_action: Return diagnosis to caller

## Symptoms

expected: Invalid form fields should display error styling via data-invalid attribute on Field component and aria-invalid on input elements
actual: Invalid form fields do not display error styling - data-invalid and aria-invalid attributes not applied
errors: None reported
reproduction: Submit form with invalid data in comunicacao publish/edit forms
started: Unknown - testing during UAT phase 07

## Eliminated

- hypothesis: Forms not passing data-invalid/aria-invalid props
  evidence: Forms correctly pass data-invalid to Field and aria-invalid to inputs/selects
  timestamp: 2026-03-23T12:00:00Z

## Evidence

- timestamp: 2026-03-23T12:00:00Z
  checked: comunicacao-edit-page.tsx and comunicacao-publish-dialog.tsx
  found: Both forms correctly pass data-invalid={!!errors.field} to Field and aria-invalid={!!errors.field} to Input/Textarea/SelectTrigger
  implication: The issue is NOT in the form implementations

- timestamp: 2026-03-23T12:00:00Z
  checked: packages/ui/src/components/field.tsx fieldVariants
  found: fieldVariants uses "data-[invalid=true]:text-destructive" which only changes text color
  implication: Field wrapper gets visual error indication but it is minimal (just text color)

- timestamp: 2026-03-23T12:00:00Z
  checked: packages/ui/src/components/input.tsx
  found: Input has aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20
  implication: Input component HAS proper aria-invalid styling - this works correctly

- timestamp: 2026-03-23T12:00:00Z
  checked: packages/ui/src/components/textarea.tsx
  found: Textarea has aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20
  implication: Textarea component HAS proper aria-invalid styling - this works correctly

- timestamp: 2026-03-23T12:00:00Z
  checked: packages/ui/src/components/select.tsx SelectTrigger
  found: SelectTrigger has NO aria-invalid styling classes at all
  implication: SelectTrigger does NOT respond to aria-invalid attribute - category field will never show error styling

## Resolution

root_cause: Two issues found: (1) SelectTrigger component is missing aria-invalid CSS classes that Input and Textarea have; (2) Field component's data-invalid styling only changes text color, providing minimal visual feedback
fix: Add aria-invalid styling to SelectTrigger matching Input/Textarea pattern; optionally enhance Field data-invalid styling for more prominent visual feedback
verification:
files_changed: []
