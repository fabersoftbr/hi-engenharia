# Feature Research

**Domain:** Frontend-only operational portal for Hi Engenharia
**Researched:** 2026-03-19
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these makes the platform feel unfinished even in a frontend-only phase.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Unified portal shell with persistent navigation | Multi-module operational tools are expected to feel like one workspace, not separate pages | MEDIUM | Sidebar, top actions, breadcrumbs, and clear module grouping are foundational |
| Login and user entry screen | Even a mocked platform needs a believable entry point and user context | LOW | Can be fully simulated, but must establish the role and platform tone |
| Dashboard with summaries and shortcuts | Users expect a landing page that answers “what needs attention now?” | MEDIUM | Cards, charts, recent activity, alerts, and shortcut actions are table stakes |
| List/detail/form pattern across modules | CRM, projects, proposals, and drive tools always rely on browse → inspect → act flows | MEDIUM | This should be consistent across opportunity, project, file, and communication modules |
| Clear pipeline visualization | Commercial and operational funnels need stage visibility at a glance | MEDIUM | Static boards, stage counts, and status badges are enough for this phase |
| Empty, loading, success, and error states | Operational products feel fake or broken without state coverage | LOW | Use reusable visual state blocks, not ad hoc markup |
| Responsive workspace behavior | Internal users still expect usable mobile access for quick checks and approvals | MEDIUM | Desktop-first is fine, but mobile cannot collapse into unusable admin sludge |
| Role-based visual differences | Menu differences and locked areas help users understand “what this version of the product is for me” | LOW | Must remain obviously simulated, not a real permission system |
| File navigation and document context | Drive-like modules need folders, file rows, metadata, and apparent access cues | MEDIUM | Mock upload/download is enough, but hierarchy and status must read clearly |

### Differentiators (Competitive Advantage)

Features that make this portal more useful than a generic admin shell.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Hi Engenharia-branded operational workspace | Makes the platform feel owned by the business, not borrowed from a template or Bitrix clone | MEDIUM | Branding should influence layout, hierarchy, typography, and tone, not just logo placement |
| Cross-module operational shortcuts | Helps users jump from commercial intake to project or proposal context quickly | MEDIUM | Strong value for dashboard and module headers |
| Unified visibility across Comercial, Anteprojetos, and Obras | Creates one mental model across the full customer-to-delivery journey | HIGH | Big UX payoff because it reduces fragmentation between teams |
| Contextual role views | Helps each profile feel intentionally served without real authorization logic | MEDIUM | Best done through menu curation, banners, and access-state cards |
| Proposal assembly preview flow | Gives commercial teams a concrete visual process even before real automation exists | MEDIUM | Especially valuable for stakeholder demos and requirements validation |
| Structured document experience for Oportunidades and Obras | Strongly supports the company’s operational model and future platform evolution | MEDIUM | File grouping by lifecycle stage is more valuable than generic file lists |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Real-time everything in Phase 01 | Feels modern and “advanced” | Pulls the project into backend and state-sync complexity before the UI is even validated | Use static states, fake updates, and timed transitions only where they improve the demo |
| Drag-and-drop workflow engine from day one | Feels natural for pipelines | High interaction complexity with low value before the stage model and screen hierarchy are proven | Use readable stage boards and detail drill-down first |
| Pixel-perfect Bitrix replication | Seems safer because teams already know Bitrix | Recreates the same complexity and prevents a clearer Hi Engenharia UX | Keep the functional reference, redesign the experience |
| Huge mega-dashboard with every metric | Stakeholders often ask for all information on the first screen | Produces noise and weakens task prioritization | Use a focused home dashboard plus module-level dashboards |
| Fake “real” integrations for demo effect | Makes the product look advanced in the short term | Creates misleading expectations and scope creep | Be explicit that actions are visual simulations |

## Feature Dependencies

```text
Portal shell and navigation
    └──requires──> login and role context
                       └──supports──> dashboard shortcuts

Dashboard summaries
    └──requires──> module data models and visual states

CRM / pipeline boards
    └──requires──> list/detail/form pattern
                       └──supports──> proposal and project handoff

Drive and file structures
    └──requires──> shared detail panels, metadata rows, and permission badges

Role-based views
    └──enhances──> portal shell, module access cards, and empty/restricted states
```

### Dependency Notes

- **Portal shell requires login and role context:** the rest of the platform feels disconnected if role identity is not established early.
- **Dashboard requires shared data models and visual states:** summary cards and alerts break down if each module invents its own status vocabulary.
- **CRM supports proposal and project handoff:** these flows should not be designed as isolated products.
- **Drive requires shared detail patterns:** file previews, permission badges, and breadcrumbs should reuse the same visual grammar across Oportunidades and Obras.
- **Role-based views enhance shell and modules:** the value is cumulative, not isolated to one page.

## MVP Definition

### Launch With (v1)

- [ ] Portal shell with mocked login, dashboard, shortcuts, and global navigation — establishes the product frame
- [ ] Commercial intake and CRM opportunity views — covers the first operational entry point
- [ ] Pipeline screens for Comercial, Anteprojetos, and Obras — validates the end-to-end operational narrative
- [ ] Project and work detail views with status and files — connects pipeline progress to execution context
- [ ] Drive-like document organization for Oportunidades and Obras — supports a core day-to-day need
- [ ] Proposal generator flow with preview and fake export action — makes the commercial process concrete
- [ ] Role-based menu/access states and full empty/loading/error/success coverage — makes the UI believable and reviewable

### Add After Validation (v1.x)

- [ ] Global command/search palette — add after module IA and navigation pain points are confirmed
- [ ] Personalization of dashboard widgets per profile — add after role usage patterns are clearer
- [ ] Deeper analytics panels — add after stakeholders agree on the KPI hierarchy

### Future Consideration (v2+)

- [ ] Real authentication and permissions — defer until the frontend workflow is validated
- [ ] Real Bitrix and storage integrations — defer until navigation and information architecture are stable
- [ ] Real proposal/PDF automation — defer until the proposal experience is signed off visually
- [ ] Operational automations and notifications — defer until the platform owns the workflows, not just the screens

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Portal shell and dashboard | HIGH | MEDIUM | P1 |
| Commercial request screens | HIGH | MEDIUM | P1 |
| CRM list/detail/funnel | HIGH | MEDIUM | P1 |
| Pipeline visualization across 3 flows | HIGH | MEDIUM | P1 |
| Project and obra details | HIGH | MEDIUM | P1 |
| Drive navigation and file detail patterns | HIGH | MEDIUM | P1 |
| Proposal assembly and preview | HIGH | MEDIUM | P1 |
| Price table screens | MEDIUM | LOW | P2 |
| Communication mural and detail | MEDIUM | LOW | P2 |
| Command palette | MEDIUM | MEDIUM | P3 |
| Advanced analytics views | MEDIUM | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Competitor A | Competitor B | Our Approach |
|---------|--------------|--------------|--------------|
| Pipeline and deal tracking | HubSpot emphasizes deal stages and responsible owners | Asana treats workflow as project work rather than sales funnel | Use a cleaner stage-first visual model that bridges sales, anteprojeto, and obra in one language |
| Project status visibility | HubSpot is secondary here | Asana is strong on project views, status, and structured work organization | Build project detail and status surfaces that feel operational, not task-software generic |
| File navigation | Google Drive excels at folder/file hierarchy and sharing cues | Slack is weak for structured document navigation | Create a drive module that borrows the clarity of Drive while keeping context tied to opportunities and works |
| Internal communication | Slack is strong on channelized updates and announcement-style communication | Google Drive is document-first, not message-first | Build a communication mural focused on notices, recency, filters, and reading flow rather than chat complexity |

## Sources

- Hi Engenharia scope prompt and PROJECT.md
- Official/current product references used as comparison anchors: HubSpot, Asana, Google Drive, Slack
- Current shadcn registry search results for dashboard, sidebar, form, table, empty state, login, breadcrumb, and drawer patterns

---
*Feature research for: frontend-only operational portal*
*Researched: 2026-03-19*
