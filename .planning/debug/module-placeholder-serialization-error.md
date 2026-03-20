---
status: diagnosed
trigger: "Module placeholder pages fail with 'Only plain objects can be passed to Client Components from Server Components' error when passing `icon` prop."
created: 2026-03-20T00:00:00.000Z
updated: 2026-03-20T00:00:00.000Z
symptoms_prefilled: true
---

## Current Focus

hypothesis: Lucide React icon components are being passed from Server Components to Client Components via props. React components cannot be serialized across the Server/Client boundary.
test: Read the affected files to confirm icon components are being passed as props
expecting: Confirm MODULES config passes icon components directly, and ModulePlaceholderPage is a Client Component
next_action: Read the three affected files to gather evidence

## Symptoms

expected: Module placeholder pages should render with icons without errors
actual: Error "Only plain objects can be passed to Client Components from Server Components" when rendering module pages
errors: "Only plain objects can be passed to Client Components from Server Components. icon: {$typeof: Symbol(react.element), render: ...}"
reproduction: Navigate to any module placeholder page (e.g., /crm)
started: After module placeholder pages were created with icon props

## Eliminated

<!-- APPEND only -->

## Evidence

- timestamp: 2026-03-20T00:00:00.000Z
  checked: apps/web/components/platform/module-placeholder-page.tsx
  found: File has "use client" directive at line 1, making it a Client Component. The `icon` prop is typed as `LucideIcon` and rendered as `<Icon />` at line 46.
  implication: ModulePlaceholderPage is a Client Component that receives icon as a prop.

- timestamp: 2026-03-20T00:00:00.000Z
  checked: apps/web/lib/platform-config.ts
  found: MODULES config (lines 53-148) defines `icon: LucideIcon` as actual React component references (e.g., `icon: UsersIcon` at line 78), not serializable data.
  implication: Icons are React component objects, not plain serializable data.

- timestamp: 2026-03-20T00:00:00.000Z
  checked: apps/web/app/(platform)/crm/page.tsx
  found: Server Component page passes `icon={mod.icon}` to ModulePlaceholderPage at line 14. The page has no "use client" directive, making it a Server Component by default.
  implication: Server Component is attempting to pass a React component object to a Client Component, which violates React's serialization rules.

- timestamp: 2026-03-20T00:00:00.000Z
  checked: All module placeholder pages in apps/web/app/(platform)/
  found: 10 pages all have identical pattern: orcamentos, crm, anteprojetos, projetos, obras, drive, comunicacao, propostas, tabela-de-precos, portal
  implication: All 10 module placeholder pages are affected by this serialization issue.

## Resolution

root_cause: React component objects (Lucide icons) cannot be passed from Server Components to Client Components because they are not serializable. The `icon` property in MODULES config stores actual React component references (e.g., `UsersIcon`), and Server Component pages attempt to pass these as props to the Client Component `ModulePlaceholderPage`.
fix:
verification:
files_changed: []
