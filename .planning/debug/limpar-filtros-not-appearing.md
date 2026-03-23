---
status: diagnosed
trigger: "Limpar filtros action button does not appear in empty state on Drive page when search/filters produce no results."
created: 2026-03-23T12:00:00.000Z
updated: 2026-03-23T12:00:00.000Z
---

## Current Focus

hypothesis: The `renderSearchResults` function in drive-page.tsx does not pass an `action` prop to `EmptyState` when search returns no results
test: Code inspection and comparison with similar implementations in projects-list-page.tsx
expecting: The EmptyState should receive an action prop with a "Limpar filtros" button that clears the search
next_action: Report root cause to caller (goal: find_root_cause_only)

## Symptoms

expected: Empty state component should display with icon, title, description, AND a "Limpar filtros" action button when search returns no results
actual: Empty state shows only title and description, no action button appears
errors: None - missing functionality
reproduction: 1) Navigate to Drive page 2) Enter a search term that matches no files/folders 3) Observe empty state - no "Limpar filtros" button
started: Always missing - feature was never implemented

## Eliminated

None

## Evidence

- timestamp: 2026-03-23T12:00:00.000Z
  checked: drive-page.tsx renderSearchResults function (lines 67-106)
  found: When searchResults.folders.length === 0 && searchResults.filesWithFolder.length === 0, the EmptyState component is rendered with only title and description - NO action prop
  implication: The "Limpar filtros" button is never rendered because it was never implemented

- timestamp: 2026-03-23T12:00:00.000Z
  checked: apps/web/components/platform/states/empty-state.tsx
  found: EmptyState component fully supports an action prop (line 8) that renders as ReactNode
  implication: The component infrastructure is ready, just not being used

- timestamp: 2026-03-23T12:00:00.000Z
  checked: apps/web/components/platform/projects/projects-list-page.tsx (lines 129-140)
  found: Reference implementation shows the correct pattern: EmptyState with action prop containing a Button that calls handleClearFilters
  implication: The fix pattern is established and consistent with other pages

- timestamp: 2026-03-23T12:00:00.000Z
  checked: apps/web/components/platform/states/__tests__/empty-states.test.tsx (lines 131-143)
  found: Test case "renders clear filters action button with Limpar filtros label" documents the expected behavior
  implication: The design system test confirms this is the expected UX pattern

- timestamp: 2026-03-23T12:00:00.000Z
  checked: drive-page.tsx state management
  found: setSearchQuery is already available in DrivePage component (line 231), and renderSearchResults receives handleFolderClick and handleFolderAction but NOT a clear search callback
  implication: Need to pass a clearSearch callback to renderSearchResults and use it in the action button

## Resolution

root_cause: In drive-page.tsx, the `renderSearchResults` function (lines 67-106) renders an `EmptyState` component without an `action` prop when search returns no results. The component is called with only `title` and `description`, missing the `action` prop that should contain a "Limpar filtros" button to clear the search query.
fix: Add an `onClearSearch` callback prop to `renderSearchResults` function and pass it a Button component with "Limpar filtros" label as the `action` prop to `EmptyState`. Follow the same pattern used in projects-list-page.tsx (lines 129-140).
verification: 1) Navigate to Drive page 2) Enter search term with no matches 3) Verify "Limpar filtros" button appears 4) Click button and verify search is cleared
files_changed: []
