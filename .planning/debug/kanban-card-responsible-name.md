---
status: diagnosed
trigger: "Nao aparece o nome do responsavel, aparece um icone com as iniciais"
created: 2026-03-20T21:50:00Z
updated: 2026-03-20T21:52:00Z
---

## Current Focus

hypothesis: The CrmPipelineCard component is designed to show only an Avatar with initials fallback, without rendering the responsible person's name text.
test: Read the component implementation to see what it renders for the responsible person.
expecting: Either the name is available but not rendered, or the design intentionally shows only avatar.
next_action: ROOT CAUSE FOUND - Return diagnosis.

## Symptoms

expected: Card shows responsible person full name
actual: Card shows an icon with initials (avatar component with fallback showing initials like "CS")
errors: None reported
reproduction: View any card in Kanban view on /crm page
started: Discovered during UAT on 2026-03-20

## Eliminated

<!-- APPEND only - prevents re-investigating -->

## Evidence

<!-- APPEND only - facts discovered -->

- timestamp: 2026-03-20T21:50:00Z
  checked: UAT test 8 expected behavior
  found: Test specification says each card should display "responsible person name"
  implication: The name should be visible, not just an avatar

- timestamp: 2026-03-20T21:51:00Z
  checked: crm-pipeline-card.tsx lines 54-61
  found: |-
    The component renders the responsible person section as:
    ```tsx
    <div className="flex items-center gap-1">
      <Avatar size="sm">
        <AvatarFallback>{owner?.initials ?? "??"}</AvatarFallback>
      </Avatar>
    </div>
    ```
  implication: The Avatar is rendered but there is NO text element showing owner.name

- timestamp: 2026-03-20T21:51:30Z
  checked: crm-data.ts CrmOwner interface and CRM_OWNERS data
  found: |-
    CrmOwner interface (lines 30-34):
    - id: string
    - name: string (e.g., "Carlos Silva")
    - initials: string (e.g., "CS")

    CRM_OWNERS data has full names available:
    - owner-1: "Carlos Silva"
    - owner-2: "Ana Santos"
    - owner-3: "Bruno Lima"
  implication: The data IS available (owner.name exists) but the component only uses owner.initials

## Resolution

root_cause: The CrmPipelineCard component at apps/web/components/platform/crm/crm-pipeline-card.tsx renders ONLY the Avatar component with initials in the AvatarFallback, but never renders the owner.name text alongside it. The owner object has the name property available (e.g., "Carlos Silva"), but the component JSX at lines 54-59 does not include any text element to display it.
fix: Add a span or text element after the Avatar to display owner?.name (e.g., `<span className="ml-1 truncate">{owner?.name}</span>`)
verification:
files_changed: []
