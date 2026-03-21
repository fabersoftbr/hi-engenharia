---
phase: 09
slug: usar-a-skill-clean-code-e-fazer-uma-auditoria-completa-em-todos-os-arquivos-de-codigo-dessa-branch-para-aplicar-as-boas-praticas
status: planned
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-21
---

# Phase 09 — Validation Strategy

> Per-phase validation contract for clean code audit feedback sampling.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | ESLint + TypeScript (existing) |
| **Config file** | `eslint.config.js`, `tsconfig.json` |
| **Quick run command** | `pnpm lint` |
| **Full suite command** | `pnpm lint && pnpm typecheck && pnpm build` |
| **Estimated runtime** | ~60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm lint`
- **After every plan wave:** Run `pnpm lint && pnpm typecheck`
- **Before `/gsd:verify-work`:** `pnpm build` must pass
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 09-01-01 | 01 | 1 | CLEAN-01 | manual | grep naming patterns | N/A | pending |
| 09-01-02 | 01 | 1 | CLEAN-01, CLEAN-04 | static | `pnpm lint && pnpm typecheck` | N/A | pending |
| 09-02-01 | 02 | 1 | CLEAN-02 | manual | grep console.log | N/A | pending |
| 09-02-02 | 02 | 1 | CLEAN-02 | manual | grep TODO/FIXME | N/A | pending |
| 09-03-01 | 03 | 2 | CLEAN-03 | manual | function length audit | N/A | pending |
| 09-03-02 | 03 | 2 | CLEAN-03 | static | `pnpm lint && pnpm typecheck` | N/A | pending |
| 09-04-01 | 04 | 2 | CLEAN-04 | manual | component structure audit | N/A | pending |
| 09-04-02 | 04 | 2 | CLEAN-04 | static | `pnpm lint && pnpm typecheck` | N/A | pending |

*Status: pending · green · red · flaky*

---

## Wave 0 Requirements

- [x] ESLint configured — existing infrastructure
- [x] TypeScript strict mode — existing infrastructure
- [x] Prettier configured — existing infrastructure

*Existing infrastructure covers all phase requirements. No Wave 0 setup needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Naming convention consistency | CLEAN-01 | Subjective quality assessment | Review each file for clear, pronounceable names |
| Comment quality and language | CLEAN-02 | Requires judgment | Verify comments explain "why" not "what", in English |
| Function length and complexity | CLEAN-03 | No cyclomatic complexity tool configured | Review functions >40 lines for refactoring opportunities |
| Component structure | CLEAN-04 | Pattern matching requires human review | Verify components follow shadcn/ui patterns |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: lint/typecheck after each commit
- [x] Wave 0 covers all dependencies (ESLint, TypeScript)
- [x] No watch-mode flags
- [x] Feedback latency < 60s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
