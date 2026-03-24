---
status: diagnosed
trigger: "Upload de múltiplos arquivos mostra um único toast com contagem interna em vez de toasts individuais para cada arquivo"
created: 2026-03-23T10:30:00.000Z
updated: 2026-03-23T10:35:00.000Z
---

## Current Focus
hypothesis: CONFIRMED - O handler de upload foi implementado com toast unico para multiplos arquivos
test: Analise do codigo-fonte completa
expecting: Achados documentados
next_action: Retornar diagnostico estruturado

## Symptoms
expected: Cada arquivo no upload múltiplo deve mostrar um toast individual de sucesso/falha
actual: Upload de múltiplos arquivos mostra um único toast com contagem interna
errors: Nenhum erro - problema de UX
reproduction: Fazer upload de múltiplos arquivos no Drive e observar os toasts
started: Sempre existiu (testado na fase 07)
started: Fase 07-drive-e-comunica-o, teste 8, severidade minor

## Eliminated

## Evidence
- timestamp: 2026-03-23T10:32:00Z
  checked: apps/web/components/platform/drive/drive-upload-handler.tsx
  found: Funcao `simulateUpload` trata upload de multiplos arquivos (fileCount > 1) com um UNICO toast que atualiza progresso "Enviando X de Y arquivos..." usando o mesmo ID (UPLOAD_TOAST_ID). Ao final, mostra apenas UM toast de sucesso "Upload concluido".
  implication: O comportamento atual eh intencional no codigo - usa-se o mesmo toast ID para evitar multiplos toasts, atualizando o conteudo em vez de criar novos.

- timestamp: 2026-03-23T10:33:00Z
  checked: Linhas 23-44 do drive-upload-handler.tsx
  found: Logica de multiplos uploads usa setInterval para simular progresso arquivo por arquivo, mas mantem o mesmo toast ID, resultando em apenas 1 toast final de sucesso.
  implication: Para mostrar toasts individuais, seria necessario remover o uso de ID constante ou criar uma abordagem diferente de feedback.

- timestamp: 2026-03-23T10:34:00Z
  checked: apps/web/lib/toast-helpers.ts
  found: showSuccessToast nao aceita ID, sempre cria novo toast.
  implication: A lib sonner suporta toasts multiplos sem ID, mas o codigo atual usa ID para controle de loading state.

## Resolution
root_cause: A funcao `simulateUpload` em `drive-upload-handler.tsx` foi implementada com um design de toast unico que atualiza progresso (de 1 a N) e entao mostra um unico toast de sucesso ao final. O uso de `UPLOAD_TOAST_ID` constante faz com que o sonner atualize o mesmo toast em vez de criar novos. Isso eh um design intencional que prioriza uma UX limpa (sem spam de toasts) sobre feedback individual por arquivo.
fix:
verification:
files_changed: []
