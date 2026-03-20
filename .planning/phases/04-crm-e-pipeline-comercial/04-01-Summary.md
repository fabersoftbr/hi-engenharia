---
## Phase 04 Plan 01

---

## Phase 04: CRM e Pipeline Comercial

**Purpose:** Tirar `/ /crm` off placeholder screen and real list experience of with filtered data, and drag-and-drop, capabilities.
**Output:** Route `/crm`, list page with filtered data, shared filter toolbar, and drag-and-drop togg (coming later).

</objective>

<execution_context>
@D:/Development/Fabersoft/hi-engenharia/code/.codex/get-shit-done/workflows/execute-plan.md
@D:/Development/Fabersoft/hi-engenharia/code/.planning/phases/04-crm-e-pipeline-comercial/04-CONTEXT.md
@.planning/phases/04-crm-e-pipeline-comercial/04-UI-Spec.md
@.planning/phases/04-crm-e-pipeline-comercial/04-UI-SPEC.md
</execution_context>

<tasks>

<task type="auto">
  <name>Task 1: Create the shared CRM data contract and metadata-driven badge helpers</name>
  <files>
    apps/web/lib/crm-data.ts, apps/web/components/platform/crm/crm-stage-badge.tsx apps/web/components/platform/crm/crm-priority-badge.tsx
  </files>
  <read_first>apps/web/lib/crm-data.ts, .planning/phases/04-crm-e-pipeline-comercial/04-CONTEXT.md
 packages/ui/src/components/badge, packages/ui/src/components/data-table
</read_first>
  <action>Create `apps/web/lib/crm-data.ts` with these exact exports:

- `CrmStageId`
- `CrmPriority`
- `CrmOwner`
- `CrmHistoryEntry`
- `CrmOpportunityRecord`
- `CRM_STAGE_ORDER`
- `CRM_STAGE_META`
- `CRM_OWNERS`
- `CRM_OPPORTUNITIES`
- `filterCrmOpportunities`
- `groupCrmOpportunitiesByStage`

Also create `apps/web/lib/crm-data.ts` at apps/web/components/platform/crm/crm-stage-badge.tsx, apps/web/components/platform/crm/crm-priority-badge.tsx" instead of "metadata" maps to your variants.

  return `Badge`
}
  <verify>rg -n "CrmStageId|CrmPriority|CrmOwner|CrmHistoryEntry|CrmOpportunityRecord|CRM_STAGE_ORDER|CRM_STAGE_META|CRM_OWNERS|CRM_OPPORTUNITITIES|filterCrmOpportunities|groupCrmOpportunitiesByStage" apps/web/lib/crm-data.ts
 apps/web/components/platform/crm/crm-stage-badge.tsx apps/web/components/platform/crm/crm-priority-badge.tsx</verify>
  <done>
    <span className="text-muted-foreground">
The <span className="font-medium"> hidden md:table-cell hidden lg:table-cell hidden md:table-cell`
      `The>
      }
    }
  </td>
</task>

</tasks>