---
status: complete
phase: 03-solicitacoes-de-orcamento
source: [03-01-SUMMARY.md, 03-02-SUMMARY.md, 03-03-SUMMARY.md]
started: 2026-03-20T19:00:00Z
updated: 2026-03-20T19:15:00Z
---

## Current Test

[testing complete]

## Tests

### 1. View Budget Requests List
expected: Navigate to /orcamentos. See a data table with 6 budget request records showing columns: ID, Cliente, Telefone, Cidade, Status, Data. Status badges display in Portuguese (Novo, Em analise, Aprovado, Recusado) with appropriate colors.
result: pass

### 2. Filter by Status
expected: Use o dropdown de filtro de status. Selecione um status (ex: "Novo"). A tabela filtra para mostrar apenas registros correspondentes. Selecionar "Todos" mostra todos os registros novamente.
result: pass

### 3. Search Requests
expected: Digite no campo de busca "Buscar por cliente ou telefone". Resultados correspondentes aparecem instantaneamente (nome do cliente ou telefone). Registros não correspondentes são ocultados.
result: pass

### 4. Navigate to Detail from List
expected: Clique em qualquer linha da tabela. O navegador navega para /orcamentos/{request-id}. A página de detalhes carrega com as informações da solicitação selecionada.
result: pass

### 5. No Results State
expected: Busque por um termo que não corresponde a nenhum registro (ex: "ZZZZZ"). Veja o título "Nenhum resultado para sua busca" e um botão/link "Limpar filtros".
result: pass

### 6. Clear Filters Action
expected: Enquanto estiver no estado "Nenhum resultado", clique em "Limpar filtros". A busca é limpa e a tabela mostra todos os registros novamente.
result: pass

### 7. View New Request Form
expected: Navegue até /orcamentos/nova. Veja um formulário com três seções: "Dados do cliente", "Consumo/Projeto", "Anexos". Campos obrigatórios mostram asterisco (*).
result: pass

### 8. Required Field Validation
expected: No formulário de nova solicitação, clique em "Enviar solicitação" com campos obrigatórios vazios. Veja erros de validação inline abaixo de cada campo obrigatório vazio (Nome do cliente, Telefone, Cidade, Consumo mensal).
result: issue
reported: "Os erros aparecem em en-us, devem aparecer em pt-br"
severity: major

### 9. Fill and Submit Form
expected: Preencha todos os campos obrigatórios (Nome do cliente, Telefone, Cidade, Consumo mensal). O botão "Enviar solicitação" fica habilitado. Clique em enviar.
result: pass

### 10. Submission Confirmation Dialog
expected: Após enviar o formulário, veja um diálogo com título "Solicitação enviada" com três ações: "Ver solicitação", "Nova solicitação", "Voltar para a listagem".
result: pass

### 11. Attachment Add and Remove
expected: Na seção Anexos, clique em "Adicionar anexo". O seletor de arquivos abre. Selecione um arquivo. O arquivo aparece na lista com nome, tamanho, ações "Visualizar" e "Remover". Clique em "Remover" para remover o arquivo.
result: pass

### 12. View Request Detail
expected: Navegue até /orcamentos/orc-2026-9001. Veja página de detalhes com duas colunas no desktop: à esquerda informações do cliente (Nome, Telefone, Cidade), consumo (Consumo mensal) e observações; à direita timeline de status e ações.
result: pass

### 13. Status Timeline
expected: Na página de detalhes, veja uma timeline horizontal com 4 etapas: Novo, Em análise, Aprovado, Recusado. A etapa do status atual está destacada com ícone de check. Outras etapas aparecem como incompletas.
result: pass

### 14. Change Status Dialog
expected: Na página de detalhes, clique no botão "Alterar status". Um diálogo abre com opções de status. Selecione um novo status e clique em "Aplicar status". O diálogo fecha (mudança de status é logada no console em modo mock).
result: pass

### 15. Navigation from Confirmation
expected: Após envio do formulário, no diálogo de confirmação, clique em "Ver solicitação" para navegar para o detalhe da solicitação enviada, ou "Voltar para a listagem" para retornar a /orcamentos, ou "Nova solicitação" para permanecer no formulário.
result: issue
reported: "Navega para o detalhe da solicitacao mas nao aparece nenhum dado que foi preenchido no formulario, navega para essa solicitacao: orcamentos/orc-2026-9001, parece que o botao leva para essa solicitacao que ja existe e nao para nova criada através do formulario"
severity: major

## Summary

total: 15
passed: 13
issues: 2
pending: 0
skipped: 0

## Gaps

- truth: "Mensagens de erro de validação devem aparecer em português (pt-BR)"
  status: failed
  reason: "User reported: Os erros aparecem em en-us, devem aparecer em pt-br"
  severity: major
  test: 8
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Botão 'Ver solicitação' deve mostrar os dados preenchidos no formulário"
  status: failed
  reason: "User reported: Navega para o detalhe da solicitacao mas nao aparece nenhum dado que foi preenchido no formulario, navega para essa solicitacao: orcamentos/orc-2026-9001, parece que o botao leva para essa solicitacao que ja existe e nao para nova criada através do formulario"
  severity: major
  test: 15
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
