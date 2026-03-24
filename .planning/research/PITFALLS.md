# Pitfalls Research

**Domain:** Frontend-only operational portal for Hi Engenharia
**Researched:** 2026-03-19
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Backend Scope Creep Disguised as “Just One Integration”

**What goes wrong:**
The team starts wiring auth, Bitrix calls, upload handlers, or PDF export “just enough for the demo,” and the frontend phase turns into an unfinished full-stack phase.

**Why it happens:**
Operational products naturally invite integration thinking, especially when stakeholders see CRM, Drive, Messenger, and proposal flows on screen.

**How to avoid:**
Keep a hard boundary: every action is visual-only, every dataset is mocked, and every external dependency is represented by a fake adapter or a simulated success/error state.

**Warning signs:**
- New files appear for API routes, services, SDK clients, or auth middleware
- Screen implementation discussions start revolving around endpoints instead of flows
- Mock data is treated as temporary instead of intentional for Phase 01

**Phase to address:**
Phase 1, when the shell, module boundaries, and implementation rules are established

---

### Pitfall 2: Generic Admin Template Syndrome

**What goes wrong:**
The UI becomes a collection of generic cards and tables that could belong to any SaaS, with little signal that this is a Hi Engenharia platform for a specific operation.

**Why it happens:**
Dashboard templates are easy to copy, and teams often confuse “enterprise-looking” with “clear and useful.”

**How to avoid:**
Define the visual direction early: brand tokens, hierarchy rules, language patterns, module grouping, and a distinct dashboard rhythm tied to the company’s workflows.

**Warning signs:**
- The home dashboard could belong to any CRM product
- Branding is reduced to a logo in the corner
- Module pages use the same undifferentiated layout with no operational cues

**Phase to address:**
Phase 1 and the first dashboard phase

---

### Pitfall 3: Recreating Bitrix Instead of Simplifying the Experience

**What goes wrong:**
The UI mirrors Bitrix structures too literally and preserves the same fragmentation the new platform is supposed to solve.

**Why it happens:**
Bitrix is the familiar reference, so teams default to imitation instead of redesign.

**How to avoid:**
Treat Bitrix as a functional inventory only. Rebuild the screens around Hi Engenharia’s real navigation needs, not Bitrix page parity.

**Warning signs:**
- Pages are named or structured to match vendor screens instead of user outcomes
- Users still need too many clicks to move between opportunity, project, proposal, and files
- The roadmap keeps orbiting existing vendor modules instead of business journeys

**Phase to address:**
Phases covering dashboard, navigation, CRM, and project transitions

---

### Pitfall 4: Inconsistent Shell and Status Vocabulary Across Modules

**What goes wrong:**
Each module invents its own page header, filters, badges, stage names, spacing, and empty states, so the product feels stitched together.

**Why it happens:**
UI-heavy projects move quickly, and without a shared shell and reusable states, teams solve the same problems repeatedly in slightly different ways.

**How to avoid:**
Build the shell, navigation primitives, state components, and status language before expanding too deeply into module screens.

**Warning signs:**
- Different modules use different color meanings for status
- Empty/loading/error screens look unrelated
- Breadcrumbs and primary actions move around from module to module

**Phase to address:**
Shell foundation and shared-state phases

---

### Pitfall 5: Visual States Are Missing Until the End

**What goes wrong:**
Normal populated screens look good, but the first stakeholder review exposes no-result filters, loading transitions, empty dashboards, restricted areas, or failure states as afterthoughts.

**Why it happens:**
Design energy goes into the “happy path” and ignores how operational products are actually used.

**How to avoid:**
Treat visual states as first-class components from the beginning and require every module to render them.

**Warning signs:**
- Screens only exist with perfect mock data
- Filtered tables do not have a no-result state
- Restricted areas are hidden instead of intentionally represented

**Phase to address:**
The first module phase and the final polish phase

---

### Pitfall 6: Custom UI Primitives Slip In Despite the shadcn Rule

**What goes wrong:**
Developers begin handcrafting dialogs, dropdowns, forms, empty states, or badges because “it’s faster this once.”

**Why it happens:**
Screen work creates pressure to move quickly, and custom markup feels cheaper in the moment.

**How to avoid:**
Use MCP shadcn as the source of truth for component structure and keep custom work focused on composition, not primitive reinvention.

**Warning signs:**
- Styled `div`s start replacing cards, alerts, badges, or dialogs
- New forms ignore shadcn field composition patterns
- Two visually similar components exist with different markup

**Phase to address:**
Every frontend implementation phase

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline mock arrays inside pages | Fast first render | Hard to keep module data and states consistent | Only for one-off throwaway prototypes, not this repo |
| Hardcoded visual colors per module | Quick visual differentiation | Status meaning drifts and brand consistency breaks | Never; use semantic tokens |
| One-off layout wrappers per page | Faster local iteration | Repetition and inconsistent page rhythm | Only temporarily before the shell is established |
| Global client state for everything | Feels future-proof | Unnecessary complexity and larger bundles | Only when multiple distant screens truly share live state |
| Drag-and-drop interaction before static IA is validated | Impressive demo | Rework when stage/grouping decisions change | Rarely acceptable in Phase 01 |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Bitrix CRM | Building service layers or endpoint assumptions in the frontend phase | Use a mock opportunity model and stage fixtures only |
| Auth | Adding real login or session code because the app has a login screen | Keep entry fully simulated and role selection purely visual |
| Files / uploads | Pulling in upload handlers or storage SDKs for file screens | Simulate upload/download with local states and placeholders |
| PDF generation | Designing around real export libraries too early | Treat export as a fake action with a convincing preview/success flow |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Making the whole workspace a client layout | Large bundles, hydration cost, sluggish navigation | Keep the shell server-first and isolate interactive islands | Breaks early as modules multiply |
| Rendering dense tables without strategy | Jank, long paint times, unreadable mobile tables | Use pagination, compact cards on mobile, and introduce richer table tooling only where needed | Breaks when lists become operationally dense |
| Loading all module mock data everywhere | Slow initial route load, harder code ownership | Scope fixtures by module and scenario | Breaks as soon as the platform adds more modules and profiles |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Using real customer or operational data in mocks | Sensitive information leakage in source control and demos | Keep all fixtures synthetic and sanitized |
| Using fake credentials that look real | Creates compliance and trust issues | Use obvious placeholders and role personas, not realistic secrets |
| Making restricted screens disappear completely | Reviewers assume the feature was forgotten instead of intentionally limited | Use explicit locked/restricted UI states |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Overloaded dashboard | Users cannot tell what deserves attention first | Show focused KPIs, shortcuts, and notices, then push detail into modules |
| Pipeline boards without stage context | Users see cards but not decision meaning | Add stage descriptions, counts, and status legends |
| Drive screens without hierarchy cues | File navigation feels random and untrustworthy | Use breadcrumbs, folder grouping, metadata, and permission badges |
| Form screens that ignore guided flow | Long operational forms feel hostile | Break forms into clear sections with helper text and review states |
| Desktop-only interaction assumptions | Mobile access becomes a dead end | Design key actions and status reading for smaller screens from the start |

## "Looks Done But Isn't" Checklist

- [ ] **Login:** often missing loading, error, and role-selection context — verify entry states feel intentional
- [ ] **Dashboard:** often missing “what needs attention now” prioritization — verify shortcuts and alerts are not decorative only
- [ ] **List screens:** often missing no-result and filtered-empty states — verify every filter path has a visual outcome
- [ ] **Pipelines:** often missing legend, counts, and next-action cues — verify stages are understandable without narration
- [ ] **Drive:** often missing breadcrumbs, file types, and permission badges — verify hierarchy reads instantly
- [ ] **Proposal preview:** often missing confirmation and export feedback — verify the fake action still feels complete

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Backend scope creep | HIGH | Stop new integration work, strip back to mocks, and restate the phase boundary in PROJECT and requirements |
| Generic admin template look | MEDIUM | Revisit shell, typography, status design, and dashboard composition before more module screens are added |
| Inconsistent shell and states | MEDIUM | Create shared shell/state components and refactor module pages onto them |
| Missing visual states | LOW | Add a shared state library, then retrofit each module systematically |
| Custom primitives sneaking in | MEDIUM | Replace them with shadcn-based composition and centralize reusable pieces |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Backend scope creep | Phase 1: shell and implementation rules | No API/auth/integration files created for Phase 01 work |
| Generic admin template syndrome | Phase 1: branding and portal shell | Dashboard and login feel specific to Hi Engenharia |
| Bitrix recreation | Phase 2-4: module IA and workflow screens | Users can move through workflows more simply than in the reference tools |
| Inconsistent shell and vocabulary | Phase 1-2: shared shell and states | Headers, actions, badges, and states stay consistent across modules |
| Missing visual states | Phase 2 onward, plus final polish | Every module demonstrates loading, empty, success, error, and restricted states |
| Custom primitives instead of shadcn | Every frontend phase | New UI additions map back to shadcn components or documented shared composites |

## Sources

- PROJECT.md scope and constraints
- `/websites/ui_shadcn` and current registry search results
- `/vercel/next.js/v16.1.6`
- Existing repo architecture and brownfield context

---
*Pitfalls research for: frontend-only operational portal*
*Researched: 2026-03-19*
