---
status: diagnosed
trigger: "Botão \"Nova Pasta\" na toolbar do Drive mostra \"Funcionalidade Simulada\" em vez de criar pasta funcional"
created: 2026-03-23T00:00:00.000Z
updated: 2026-03-23T00:00:00.000Z
symptoms_prefilled: true
goal: find_root_cause_only
---

## Current Focus

hypothesis: Button handler is showing a placeholder toast instead of calling actual folder creation logic
test: Read drive-toolbar.tsx to find the button implementation
expecting: Find toast call with "Funcionalidade Simulada" text
next_action: Read drive-toolbar.tsx component

## Symptoms

expected: Botão "Nova Pasta" deve criar uma pasta funcional
actual: Botão mostra mensagem "Funcionalidade Simulada" e não cria pasta
errors: Nenhum erro, apenas UX incorreta
reproduction: Clicar no botão "Nova Pasta" na toolbar do Drive
started: Desde implementação inicial

## Eliminated

## Evidence

- timestamp: 2026-03-23T00:00:00.000Z
  checked: drive-toolbar.tsx
  found: Button "Nova Pasta" correctly calls `onNewFolder` prop with onClick handler (line 71)
  implication: Toolbar component is properly wired

- timestamp: 2026-03-23T00:00:00.000Z
  checked: drive-page.tsx lines 290-292
  found: |
    const handleNewFolder = () => {
      showInfoToast("Funcionalidade simulada")
    }
  implication: ROOT CAUSE - Handler only shows a toast, does not create any folder

- timestamp: 2026-03-23T00:00:00.000Z
  checked: apps/web/lib/drive-data.ts
  found: No mutation functions exist. Only read-only helpers: getDriveFolders, getDriveFolderById, getFilesInFolder, searchDrive. Data is hardcoded in DRIVE_FOLDERS and DRIVE_FILES constants.
  implication: No infrastructure exists to create folders - would require implementing mutation functions and state management

- timestamp: 2026-03-23T00:00:00.000Z
  checked: drive-page.tsx state management
  found: State uses useState for local UI state. No persistence layer or global store.
  implication: Even if folder creation logic was added, it would not persist across sessions without backend integration

## Resolution

root_cause: |
  The "Nova Pasta" button handler in drive-page.tsx (lines 290-292) is implemented as a placeholder that only calls showInfoToast("Funcionalidade simulada") without any folder creation logic.

  The entire Drive module uses static mock data from drive-data.ts with no mutation infrastructure:
  - No createFolder/addFolder function exists
  - Data is hardcoded in DRIVE_FOLDERS and DRIVE_FILES constants
  - State management is local (useState) with no persistence mechanism

  The button is correctly wired in the UI (drive-toolbar.tsx passes onNewFolder prop) but the handler does nothing.
fix:
verification:
files_changed: []
