---
status: diagnosed
trigger: "Toggle buttons and filters on /crm page require horizontal scroll to be visible"
created: 2026-03-20T22:00:00Z
updated: 2026-03-20T22:10:00Z
---

## Current Focus

hypothesis: CONFIRMED - The header section in crm-workspace-page.tsx uses sm:flex-row which forces horizontal layout at 640px+, but the right-side container with toggle buttons and "Nova oportunidade" button lacks responsive wrapping, causing overflow on medium-width screens.
test: Compared with similar pages (budget-requests, anteprojects) that use the same pattern but have only one item on the right side.
expecting: Confirmed that the CRM page has TWO items on the right (toggle + button) while others have ONE.
next_action: Return root cause diagnosis.

## Symptoms

expected: Toggle buttons and filters should be visible without horizontal scroll on /crm page.
actual: User needs horizontal scroll to see options on the right side of the page.
errors: None reported
reproduction: Navigate to /crm page on a screen width between ~640px and ~900px and observe that the toggle buttons and "Nova oportunidade" button cause horizontal overflow.
started: Discovered during UAT on 2026-03-20

## Eliminated

- hypothesis: The toolbar component (CrmToolbar) causes the overflow
  evidence: Checked crm-toolbar.tsx and found it uses `flex flex-col gap-3 md:flex-row md:items-center md:gap-4` which correctly stacks on mobile and becomes a row at md breakpoint.
  timestamp: 2026-03-20T22:03:00Z

- hypothesis: The platform layout has overflow issues
  evidence: Checked apps/web/app/(platform)/layout.tsx and found standard SidebarInset with flex-1 and p-4 padding. No overflow issues in parent layout.
  timestamp: 2026-03-20T22:08:00Z

## Evidence

- timestamp: 2026-03-20T22:02:00Z
  checked: crm-workspace-page.tsx lines 86-119 (header section)
  found: The outer header container uses `flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`. The left side has the title "CRM". The right side (line 90) has `flex items-center gap-2` containing the toggle buttons and "Nova oportunidade" button.
  implication: At sm breakpoint (640px), the layout switches to horizontal. The right-side flex container has no wrapping, so both toggle buttons AND "Nova oportunidade" button must fit in one row.

- timestamp: 2026-03-20T22:03:00Z
  checked: crm-toolbar.tsx
  found: The toolbar uses `flex flex-col gap-3 md:flex-row md:items-center md:gap-4` which correctly handles responsive layout.
  implication: The toolbar itself is OK. The problem is in the header section of crm-workspace-page.tsx.

- timestamp: 2026-03-20T22:04:00Z
  checked: Toggle button container (lines 91-114)
  found: Fixed-width pill container with `flex rounded-4xl border border-input bg-input/30 p-1` containing two buttons. No responsive adjustments.
  implication: This container takes fixed space regardless of viewport width.

- timestamp: 2026-03-20T22:05:00Z
  checked: Button placement (lines 115-118)
  found: "Nova oportunidade" button sits next to toggle container in the same flex row with `gap-2`.
  implication: Combined width of toggle container + button + gap exceeds available space on medium-width viewports.

- timestamp: 2026-03-20T22:07:00Z
  checked: Similar pages (budget-requests-list-page.tsx, anteproject-list-page.tsx)
  found: Both use the same `sm:flex-row sm:justify-between` pattern BUT they only have ONE button on the right side (the toolbar is on the left). The CRM page puts the title on the left and BOTH toggle buttons AND the button on the right.
  implication: The CRM page has more content on the right side than other pages, which is why it overflows while others do not.

- timestamp: 2026-03-20T22:08:00Z
  checked: Platform layout (app/(platform)/layout.tsx)
  found: Standard layout with SidebarProvider, SidebarInset, and main content with `flex flex-1 flex-col gap-4 p-4`.
  implication: No overflow issues in parent layout. The issue is isolated to the CRM page header section.

## Resolution

root_cause: In apps/web/components/platform/crm/crm-workspace-page.tsx, the header section (lines 86-119) forces a horizontal layout at sm breakpoint (640px+) via `sm:flex-row sm:justify-between`. Unlike similar pages (budget-requests, anteprojects) which have only ONE item on the right side, the CRM page places BOTH the Kanban/Lista toggle buttons AND the "Nova oportunidade" button on the right side. The right-side container (line 90) uses `flex items-center gap-2` WITHOUT `flex-wrap` or responsive stacking. This means all elements must fit in a single row. On viewports between ~640px and ~900px, there is insufficient horizontal space, causing horizontal overflow/scroll.

fix: (not applied - diagnose-only mode)
verification: (not applied - diagnose-only mode)
files_changed: []
