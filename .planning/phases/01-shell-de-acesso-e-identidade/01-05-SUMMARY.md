---
phase: 01-shell-de-acesso-e-identidade
plan: 05
subsystem: ui
tags: [icons, profile, serialization, client-components]

requires:
  - phase: 01-shell-de-acesso-e-identidade
    provides: platform shell and module navigation
provides:
  - Icon name pattern for serialization-safe icon resolution
  - Cliente profile with correct module visibility
  - All module placeholder pages loading without errors
affects: [dashboard, sidebar, module-pages]

tech-stack:
  added: []
  patterns:
    - "Icon name to component resolution via ICON_MAP lookup table"
    - "String-based iconName property in ModuleConfig for server/client serialization safety"

key-files:
  created: []
  modified:
    - apps/web/lib/platform-config.ts
    - apps/web/components/platform/module-placeholder-page.tsx
    - apps/web/components/platform/profile-switcher.tsx
    - apps/web/components/platform/app-sidebar.tsx
    - apps/web/lib/dashboard-data.ts
    - apps/web/app/(platform)/orcamentos/page.tsx
    - apps/web/app/(platform)/crm/page.tsx
    - apps/web/app/(platform)/anteprojetos/page.tsx
    - apps/web/app/(platform)/projetos/page.tsx
    - apps/web/app/(platform)/obras/page.tsx
    - apps/web/app/(platform)/drive/page.tsx
    - apps/web/app/(platform)/comunicacao/page.tsx
    - apps/web/app/(platform)/propostas/page.tsx
    - apps/web/app/(platform)/tabela-de-precos/page.tsx

key-decisions:
  - "Store icon names as strings instead of component references for serialization safety across Server/Client boundary"
  - "Resolve icons inside Client Components via ICON_MAP lookup"
  - "Cliente profile has visibility to portal, orcamentos, projetos, obras, drive (not crm, anteprojetos, comunicacao, propostas, tabela-de-precos)"

patterns-established:
  - "ICON_MAP lookup table pattern for serializable icon resolution"
  - "iconName: IconName property on ModuleConfig instead of icon: LucideIcon"
  - "ModuleLink helper component for sidebar icon resolution"

requirements-completed: [AUTH-01, ROLE-01, ROLE-02]

duration: 7min
completed: 2026-03-20
---

# Phase 01 Plan 05: Gap Closure - Icon Serialization and Cliente Profile Summary

**Fixed icon serialization errors by converting component references to string names, and added missing Cliente profile with correct module visibility.**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-20T14:49:19Z
- **Completed:** 2026-03-20T14:56:38Z
- **Tasks:** 4
- **Files modified:** 14

## Accomplishments

- Icon serialization error resolved - all module pages now load without React serialization errors
- Cliente profile added to ProfileKey type and PROFILE_LABELS
- Cliente profile has correct module visibility (portal, orcamentos, projetos, obras, drive)
- Profile switcher shows 5 options including Cliente
- Restricted state shown for modules Cliente cannot access (crm, anteprojetos, comunicacao, propostas, tabela-de-precos)

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert icon storage to string names** - `a1262e9` (feat)
2. **Task 2: Update ModulePlaceholderPage** - `474e4af` (feat)
3. **Task 3: Add Cliente to profile switcher** - `f9c3088` (feat)
4. **Task 4: Update all module pages and downstream consumers** - `748a8d5` (feat)

## Files Created/Modified

- `apps/web/lib/platform-config.ts` - Added ICON_MAP, IconName type, cliente profile
- `apps/web/components/platform/module-placeholder-page.tsx` - Changed to iconName prop with ICON_MAP resolution
- `apps/web/components/platform/profile-switcher.tsx` - Added cliente option
- `apps/web/components/platform/app-sidebar.tsx` - Added ModuleLink helper with ICON_MAP resolution
- `apps/web/lib/dashboard-data.ts` - Added cliente quick actions, fixed icon resolution
- `apps/web/app/(platform)/*/page.tsx` (9 files) - Changed icon prop to iconName

## Decisions Made

- **Icon serialization pattern:** Store icon names as strings (iconName) in config, resolve to components via ICON_MAP in Client Components. This avoids React serialization errors when passing props from Server to Client Components.
- **Cliente profile visibility:** Cliente can see portal, orcamentos, projetos, obras, drive. Cannot see crm, anteprojetos, comunicacao, propostas, tabela-de-precos (internal tools).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Updated app-sidebar.tsx to use ICON_MAP**
- **Found during:** Task 4 (typecheck revealed additional consumers of mod.icon)
- **Issue:** app-sidebar.tsx used `<mod.icon />` which no longer exists after icon to iconName change
- **Fix:** Added ICON_MAP import and created ModuleLink helper component to resolve icons
- **Files modified:** apps/web/components/platform/app-sidebar.tsx
- **Committed in:** 748a8d5 (Task 4 commit)

**2. [Rule 3 - Blocking] Updated dashboard-data.ts to use ICON_MAP and add cliente**
- **Found during:** Task 4 (typecheck revealed missing cliente key and icon reference)
- **Issue:** QUICK_ACTIONS_BY_PROFILE missing cliente key; getDashboardModulesForProfile used mod.icon
- **Fix:** Added cliente quick actions and changed to ICON_MAP[mod.iconName]
- **Files modified:** apps/web/lib/dashboard-data.ts
- **Committed in:** 748a8d5 (Task 4 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking issues)
**Impact on plan:** Both fixes were necessary downstream consumers of the icon pattern change. No scope creep - purely required for type correctness.

## Issues Encountered

None - all issues were auto-fixed via deviation rules.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Icon serialization pattern established and working across all module pages
- Cliente profile fully integrated with correct visibility
- Ready for continued module development

---

*Phase: 01-shell-de-acesso-e-identidade*
*Completed: 2026-03-20*
