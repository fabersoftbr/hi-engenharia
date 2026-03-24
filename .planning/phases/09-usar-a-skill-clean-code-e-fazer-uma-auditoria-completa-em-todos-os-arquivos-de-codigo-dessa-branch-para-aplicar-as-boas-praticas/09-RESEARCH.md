# Phase 09: Clean Code Audit - Research

**Researched:** 2026-03-21
**Domain:** Clean Code / Code Quality / TypeScript React Best Practices
**Confidence:** HIGH

## Summary

This phase involves conducting a comprehensive clean code audit across all TypeScript/React code files in the Hi Engenharia web platform codebase. The codebase is a Turborepo monorepo with Next.js 16 frontend using shadcn/ui, TypeScript strict mode, and Tailwind CSS 4.

The clean-code skill referenced in the phase description does not exist in the repository. The audit should apply general Clean Code principles (Robert C. Martin's "Clean Code" book) adapted for TypeScript/React) along with the project-specific conventions defined in CLAUDE.md.

**Primary recommendation:** Structure the audit by module/area, prioritize by code smell severity, and apply incremental fixes with clear before/after verification.

## Standard Stack

### Core
| Library/Tool | Version | Purpose | Why Standard |
|-------------|---------|---------|---------------|
| ESLint | via eslint-config | Static analysis | Linting is built into the monorepo |
| Prettier | via prettier-plugin-tailwindcss | Code formatting | Auto-formats code on commit |
| TypeScript strict mode | via @workspace/typescript-config | Type safety | Catches errors at compile time |
| Turborepo | Monorepo | Build orchestration | Manages inter-package dependencies |

### Supporting
| Tool | Purpose | When to Use |
|------|---------|----------|
| `pnpm lint` | Run linting across all packages | Before committing changes |
| `pnpm typecheck` | Type-check all packages | Before committing changes |
| `pnpm format` | Format code with Prettier | Before committing changes |

## Architecture Patterns

### Codebase Structure (Files to Audit)

```
apps/web/
  app/                      # Next.js App Router pages
    (platform)/           # Authenticated platform routes
    (public)/            # Public routes (login)
  components/
    auth/                 # Authentication components
    platform/             # Platform-specific components by module
      anteprojects/
      budget-requests/
      crm/
      dashboard/
      price-table/
      proposals/
      projects/
      comunicacao/
    brand-logo.tsx
    theme-provider.tsx
  lib/                     # Data contracts, types, mock data
    anteprojects-data.ts
    budget-request-form.ts
    budget-requests-data.ts
    crm-data.ts
    dashboard-data.ts
    mock-session.ts
    platform-config.ts
    price-table-data.ts
    proposal-form.ts
    proposals-data.ts
    projects-data.ts
    drive-data.ts
    comunicacao-data.ts

packages/ui/
  src/components/        # shadcn/ui components (auto-generated)
  src/lib/utils.ts
  src/hooks/
    use-mobile.ts
```

### Pattern 1: Data Contract Pattern
**What:** Each `*-data.ts` file exports types, constants, and helper functions for a module
**When to use:** All mock data and business logic should live in lib files, not components
**Example:**
```typescript
// Source: apps/web/lib/crm-data.ts
export type CrmStageId =
  | "lead"
  | "em-contato"
  | "qualificado"
  // ... more stages

export interface CrmOpportunityRecord {
  id: string
  title: string
  company: string
  stage: CrmStageId
  // ... more fields
}

export function getCrmOpportunities(): CrmOpportunityRecord[] {
  return CRM_OPPORTUNITIES
}
```

### Pattern 2: Component Composition Pattern
**What:** Components receive typed props, use shadcn/ui primitives
**When to use:** All UI components
**Example:**
```typescript
// Source: apps/web/components/platform/crm/crm-pipeline-board.tsx
"use client"

import { useMemo } from "react"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"

interface CrmPipelineBoardProps {
  opportunities: CrmOpportunityRecord[]
  onDragEnd: (result: DropResult) => void
}

export function CrmPipelineBoard({
  opportunities,
  onDragEnd,
}: CrmPipelineBoardProps) {
  // ... component implementation
}
```

### Anti-Patterns to Avoid

- **Mixing mock data in components:** Data should be in `lib/*-data.ts` files, not embedded in components
- **Inline styles with `style={{}}`: Use Tailwind classes via `className`
- **Duplicating type definitions:** Types should be in lib files, redefined once
- **Using `any` type:** TypeScript strict mode should catch these

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation | Custom validation logic | Zod + react-hook-form with @hookform/resolvers/zod | Industry standard, type-safe |
| UI components | Custom styled divs | shadcn/ui components | Consistent design, accessible |
| Conditional classes | Template literal ternaries | `cn()` from @workspace/ui/lib/utils | Cleaner, more maintainable |
| Variant styling | Manual style objects | `cva()` from class-variance-authority | Type-safe variants |
| Drag-and-drop | Custom DnD implementation | @hello-pangea/dnd | Already in use, battle-tested |
| Icons | Custom SVG or icon components | lucide-react | Consistent icon library |

## Clean Code Principles (Audit Criteria)

### 1. Naming Conventions
| Category | Current Standard | Audit Check |
|----------|-----------------|-------------|
| Files | kebab-case (e.g., `crm-pipeline-board.tsx`) | Verify consistency |
| Components | PascalCase exports (e.g., `CrmPipelineBoard`) | Verify consistency |
| Functions | camelCase (e.g., `getCrmOpportunities`) | Verify consistency |
| Types | PascalCase with suffix (e.g., `CrmOpportunityRecord`) | Verify consistency |
| Constants | SCREAMING_SNAKE_CASE (e.g., `CRM_STAGE_ORDER`) | Verify consistency |
| Props interfaces | Component name + "Props" suffix | Verify consistency |

### 2. Function Quality
| Principle | What to Check |
|-----------|---------------|
| Single Responsibility | Each function does one thing |
| Size | Functions under 20-30 lines (exceptions for complex logic) |
| Parameters | Max 3-4 parameters, otherwise use options object |
| Return values | Consistent return types, no surprising undefined |
| Side effects | Pure functions preferred, side effects documented |

### 3. Comments Quality
| Principle | What to Check |
|-----------|---------------|
| JSDoc comments | All exported types and functions have documentation |
| Inline comments | Only explain "why", not "what" |
| TODO/FIXME | Should have issue references or be resolved |
| Dead comments | Remove commented-out code |

### 4. Error Handling
| Principle | What to Check |
|-----------|---------------|
| Null checks | Optional values handled with `?.` or null checks |
| Error boundaries | Critical sections have error handling |
| Async errors | Promises have try/catch or .catch() |
| User feedback | Errors shown to user via toast/dialog |

### 5. React/Next.js Specific
| Principle | What to Check |
|-----------|---------------|
| "use client" directive | Client components properly marked |
| Server vs Client | Server components used where possible |
| Hooks rules | Hooks called at top level, conditionally safe |
| Props spreading | Avoid spreading unnecessary props |
| Key props | List items have stable, unique keys |

### 6. TypeScript Specific
| Principle | What to Check |
|-----------|---------------|
| Explicit any | Avoid `any`, use `unknown` if needed |
| Type exports | Types re-exported from lib files |
| Const assertions | Use `as const` for literal types |
| Discriminated unions | Use for state machines |

## Common Pitfalls

### Pitfall 1: Console.log Statements
**What goes wrong:** Debug console.log statements left in production code
**Why it happens:** Developers forget to remove debug statements
**How to avoid:** Search for console.log and remove or replace with proper logging
**Warning signs:** Files with `console.log` that are not error/warn

### Pitfall 2: Unused Imports
**What goes wrong:** Imports that are imported but never used
**Why it happens:** Refactoring leaves dead imports
**How to avoid:** ESLint catches these, but verify with `pnpm lint`
**Warning signs:** IDE shows grayed-out imports

### Pitfall 3: Magic Numbers/Strings
**What goes wrong:** Hardcoded values without constants
**Why it happens:** Quick development, not extracting constants
**How to avoid:** Extract to named constants at file or module level
**Warning signs:** Numbers like `100`, `200` in business logic

### Pitfall 4: Prop Drilling
**What goes wrong:** Passing props through many component layers
**Why it happens:** Not using context when appropriate
**How to avoid:** Use React Context for cross-cutting concerns (already used for shell state)
**Warning signs:** Same prop passed through 3+ components

### Pitfall 5: Inconsistent Null Handling
**What goes wrong:** Sometimes using `!`, sometimes `??`, sometimes `||`
**Why it happens:** No team convention established
**How to avoid:** Establish pattern: `??` for nullish coalescing, `||` for falsy coalescing
**Warning signs:** Mix of null-handling operators in same file

## Code Examples

### Good Example: Well-documented data contract
```typescript
// Source: apps/web/lib/platform-config.ts (condensed example)

/**
 * Platform Configuration
 * Single source of truth for module routes, group labels, breadcrumb labels, and profile visibility.
 * Consumed by login, shell, and access-control plans.
 */

export type ProfileKey =
  | "admin"
  | "commercial"
  | "partner"
  | "operations"
  | "cliente"

export interface ModuleConfig {
  id: string
  route: string
  label: string
  breadcrumb: string
  iconName: IconName
  group: ModuleGroup
  visibleTo: ProfileKey[]
}

/**
 * Helper to get modules visible to a profile
 */
export function getModulesForProfile(profile: ProfileKey): ModuleConfig[] {
  return MODULES.filter((mod) => mod.visibleTo.includes(profile))
}
```

### Good Example: Clean component with typed props
```typescript
// Source: apps/web/components/platform/proposals/proposal-detail-page.tsx

interface ProposalDetailPageProps {
  proposal: ProposalRecord
}

export function ProposalDetailPage({ proposal }: ProposalDetailPageProps) {
  const [localStatus, setLocalStatus] = useState<ProposalStatus>(
    proposal.status
  )

  const canSendOrExport = localStatus === "pronta"

  const handleExportPdf = () => {
    toast.success("PDF gerado com sucesso")
  }

  // ... rest of component
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|-------|
| Class components | Function components with hooks | React 16.8 (2019) | Simpler, more testable |
| PropTypes | TypeScript interfaces | TypeScript 4.x | Compile-time safety |
| CSS-in-JS | Tailwind utility classes | Tailwind 3.x | Faster development |
| Redux for all state | React Context + local state | React 16.8 (2019) | Less boilerplate |

**Deprecated/outdated:**
- Class components: Use function components with hooks
- `defaultProps`: Use default values in destructuring
- `propTypes`: Use TypeScript interfaces

## Open Questions

1. **Console.log audit depth**
   - What we know: Some files have console.log for debugging
   - What's unclear: Should all be removed, or is there a logging strategy?
   - Recommendation: Remove all console.log except console.error for critical errors

2. **Comment language**
   - What we know: Code should be in English, UI in Portuguese (per CLAUDE.md)
   - What's unclear: Should comments follow same rule?
   - Recommendation: Comments in English to match code language

3. **Test file creation**
   - What we know: No test files exist in the codebase
   - What's unclear: Should this phase create tests or just audit for testability?
   - Recommendation: Audit for testability, defer test creation to separate phase

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected |
| Config file | None |
| Quick run command | `pnpm lint && pnpm typecheck` |
| Full suite command | `pnpm build` |

### Phase Requirements - Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CLEAN-01 | Code follows naming conventions | manual | `pnpm lint` | N/A - lint partially covers |
| CLEAN-02 | No console.log statements | manual | grep search | N/A |
| CLEAN-03 | Functions are well-typed | static | `pnpm typecheck` | N/A |
| CLEAN-04 | Components use shadcn/ui | manual | code review | N/A |

### Sampling Rate
- **Per task commit:** `pnpm lint`
- **Per wave merge:** `pnpm typecheck`
- **Phase gate:** `pnpm build` passes

### Wave 0 Gaps
- [ ] Test framework not detected - this is a frontend-only mock phase, tests deferred
- [ ] ESLint and TypeScript already configured - existing infrastructure sufficient for code quality

**Note:** Since this is a clean code audit phase, the primary validation is via automated linting/typecheck and manual code review. No test framework installation is required.

## Sources

### Primary (HIGH confidence)
- Repository code analysis - Direct file reading of apps/web and packages/ui
- CLAUDE.md - Project-specific conventions
- shadcn skill (`.agents/skills/shadcn/SKILL.md`) - UI component patterns

### Secondary (MEDIUM confidence)
- Turborepo documentation - Monorepo patterns
- Next.js App Router patterns - Standard conventions

### Tertiary (LOW confidence)
- General Clean Code principles (Robert C. Martin) - Adapted for TypeScript/React

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Direct repository analysis
- Architecture: HIGH - Direct file reading
- Pitfalls: MEDIUM - General clean code principles applied to this codebase

**Research date:** 2026-03-21
**Valid until:** 30 days (stable patterns)
