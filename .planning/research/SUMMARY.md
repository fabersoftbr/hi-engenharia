# Project Research Summary

**Project:** Plataforma Web Hi Engenharia
**Domain:** Frontend-only operational workspace UI
**Researched:** 2026-03-19
**Confidence:** HIGH

## Executive Summary

This project is best treated as a workspace-style operational frontend, not as a marketing site and not as a backend-heavy enterprise system. The strongest path is to use the brownfield Next.js 16 + React 19 + Tailwind 4 foundation already in the repo, then layer a shadcn-driven workspace shell, module routes, shared visual states, and realistic mock scenarios for the full commercial-to-obra journey.

Research strongly supports a route-based portal with a persistent shell, module-specific pages, and a consistent list/detail/pipeline/document grammar across the product. The existing shadcn ecosystem already covers the core building blocks needed for this: login blocks, sidebar shells, dashboard blocks, charts, tables, forms, breadcrumbs, drawers, empty states, and responsive overlays.

The main risk is not technical feasibility. It is scope discipline. If the project drifts into real authentication, Bitrix integration, file storage, or PDF logic, the first phase will lose focus. The roadmap should therefore front-load shell consistency, module IA, and visual-state coverage before any “real” system concerns are allowed in.

## Key Findings

### Recommended Stack

The current repo stack is already the right backbone for this phase. Next.js App Router gives the project the exact route-group and nested-layout patterns needed for a portal with login, workspace shell, and multiple modules. Tailwind CSS 4 fits the existing tokenized styling approach, and shadcn/ui is both a hard project rule and the best practical source for the dashboard, form, table, drawer, and sidebar components required here.

**Core technologies:**
- Next.js 16.1.6: route shell, nested layouts, module navigation — recommended because the repo already depends on App Router conventions
- Tailwind CSS 4.1.18: semantic theme tokens and responsive layout composition — recommended because the current shared `globals.css` pattern already matches it
- shadcn/ui + `@workspace/ui`: component composition and shared design system — recommended because it is mandatory here and has direct coverage for the needed product patterns

### Expected Features

The table stakes are clear: login, dashboard, persistent navigation, role-aware visual context, list/detail screens, pipeline boards, document navigation, and full visual-state coverage. The product will feel incomplete without those basics, even if every action is mocked.

**Must have (table stakes):**
- Workspace shell with sidebar, breadcrumbs, and role-aware menu
- Dashboard, list/detail/form flows, and pipeline views across Comercial, Anteprojetos, and Obras
- File navigation, communication mural, and visual-only feedback states

**Should have (competitive):**
- Strong Hi Engenharia visual identity instead of a generic admin clone
- Cross-module operational shortcuts and handoff clarity between commercial, proposal, project, and drive contexts
- Structured document experiences tied to oportunidades and obras

**Defer (v2+):**
- Real auth and permissions
- Real Bitrix/storage integrations
- Real PDF/proposal automation and operational automations

### Architecture Approach

The recommended architecture is a route-group workspace app with a shared shell, module-local screens, shared visual states, and a dedicated mock-data layer. Keep pages and layouts server-first, then isolate interactive filters, drawers, charts, and forms into client components. This keeps the codebase modular without turning the entire workspace into one large client-rendered app.

**Major components:**
1. Workspace shell — navigation, breadcrumbs, profile context, and global actions
2. Module views — dashboard, CRM, projects, drive, proposals, price table, and communication pages
3. Mock scenario layer — reusable fake records, pipeline fixtures, file trees, and role scenarios

### Critical Pitfalls

1. **Backend scope creep** — keep every external system visual-only in Phase 01
2. **Generic admin template syndrome** — define a distinct Hi Engenharia shell and visual hierarchy early
3. **Bitrix recreation instead of simplification** — redesign around user journeys, not vendor parity
4. **Inconsistent shell and state vocabulary** — build reusable shell/state components before module sprawl
5. **Missing visual states** — require empty/loading/success/error/restricted screens in every module

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Portal Foundation and Brand Shell
**Rationale:** Everything else depends on a stable workspace frame and shared visual vocabulary.
**Delivers:** Login simulation, workspace shell, role context, dashboard scaffold, shared states
**Addresses:** Unified portal access, role-aware navigation, brand direction
**Avoids:** Generic admin template syndrome and inconsistent module shells

### Phase 2: Commercial Entry and CRM Flow
**Rationale:** The operational journey starts with demand intake and opportunity tracking.
**Delivers:** Solicitação de orçamento list/form/detail screens, CRM opportunity list/detail, commercial funnel
**Uses:** Shared forms, tables, badges, drawer/detail patterns
**Implements:** The first end-to-end commercial visual journey

### Phase 3: Anteprojeto and Proposal Experience
**Rationale:** Proposal work and technical analysis are the bridge between sales and execution.
**Delivers:** Anteprojeto pipeline states, proposal builder flow, preview/export simulation, price-table screens
**Uses:** Multi-step form composition, review states, comparison tables
**Implements:** The pre-sales to proposal handoff

### Phase 4: Projects and Obras Workspace
**Rationale:** Once commercial and proposal flows are clear, execution views can inherit the same language.
**Delivers:** Project list/detail, obra lifecycle views, work status panels, linked file context
**Uses:** Shared status vocabulary and module shell patterns
**Implements:** The delivery-side operational model

### Phase 5: Drive and Document Structures
**Rationale:** Files become more meaningful after opportunities and works already have visible context.
**Delivers:** Folder navigation, file lists, metadata, simulated permissions, upload/download states
**Uses:** Breadcrumbs, file-tree patterns, drawers/panels, empty states
**Implements:** Oportunidades and Obras document organization

### Phase 6: Communication and Cross-Module Polish
**Rationale:** Communication, shortcut flow, and state polish work best after the core modules exist.
**Delivers:** Communication mural/detail/publication simulation, cross-module shortcuts, restricted-state messaging
**Uses:** Dashboard summaries, alerts, role scenarios, feed-style components
**Implements:** The workspace’s connective tissue

### Phase 7: Responsive and State Coverage Audit
**Rationale:** This is a fine-grained frontend project; visual resilience should be explicit, not implied.
**Delivers:** Mobile adjustments, loading/error/empty/success coverage across all modules, interaction polish
**Uses:** Shared state components, drawer/dialog responsiveness, table/card fallbacks
**Implements:** Final demo-readiness and reviewability

### Phase Ordering Rationale

- The shell and state system must come first, or every module will invent its own rules.
- Commercial, anteprojeto, and obra flows should follow the real business journey so the platform reads as one product.
- Drive and communication land better after users can already see which records, projects, and operations they belong to.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3:** Proposal assembly and pricing flow may need careful UX sequencing to avoid long, confusing forms
- **Phase 5:** File navigation needs deliberate hierarchy and metadata patterns so the drive module does not feel generic
- **Phase 7:** Responsive behavior across dense pipeline/table screens will need focused UX review

Phases with standard patterns (skip research-phase):
- **Phase 1:** Login, shell, sidebar, dashboard scaffold, and shared state blocks are well-supported by the current stack and shadcn ecosystem

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified against current official docs and current package versions |
| Features | HIGH | Strong overlap between user scope and established workspace/product expectations |
| Architecture | HIGH | The brownfield repo already points toward the recommended route-group + shared-shell approach |
| Pitfalls | HIGH | Risks are mostly scope and consistency risks, which are very clear from the project setup |

**Overall confidence:** HIGH

### Gaps to Address

- Exact Hi Engenharia visual direction beyond “not generic admin” still needs to be made concrete during the first design-focused phase
- Some module density decisions, especially for mobile pipeline/table views, should be validated during implementation instead of over-specified now

## Sources

### Primary (HIGH confidence)
- `/vercel/next.js/v16.1.6` — App Router layouts, nested routing, route-level architecture
- `/tailwindlabs/tailwindcss.com` — tokenized theming and responsive utility composition
- `/websites/ui_shadcn` — dashboard blocks, sidebar, drawer/dialog, responsive app patterns
- Current repo architecture and `.planning/codebase/*` — brownfield structure and stack baseline

### Secondary (MEDIUM confidence)
- `@shadcn` registry search — component/block availability for `dashboard-01`, `login-*`, `sidebar-*`, `chart`, `table`, `form`, `empty`, `breadcrumb`, `drawer`
- npm registry version checks — supporting library versions for future frontend phases

### Tertiary (LOW confidence)
- Product-pattern inference from HubSpot, Asana, Google Drive, and Slack reference models — useful for UX framing, but still needs project-specific interpretation

---
*Research completed: 2026-03-19*
*Ready for roadmap: yes*
