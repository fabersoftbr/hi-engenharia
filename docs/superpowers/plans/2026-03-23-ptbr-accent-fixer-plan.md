# pt-BR Accent Fixer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use @superpowers:subagent-driven-development (recommended) or @superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar corretor automático de acentuação pt-BR integrado como pre-commit hook

**Architecture:** Script Python com pyenchant detecta palavras sem acento, verifica contra dicionário pt-BR, e aplica correções. Pre-commit hook garante execução automática em cada commit.

**Tech Stack:** Python 3.9+, pyenchant, pre-commit framework, enchant (system library)

---

## Task 1: Criar estrutura de arquivos e whitelist

**Files:**
- Create: `.accent-whitelist.txt`
- Create: `requirements-dev.txt`

- [ ] **Step 1: Criar `.accent-whitelist.txt`**

Lista de palavras protegidas (tecnologias, produtos, siglas):

```
# Nomes de tecnologias e produtos
TypeScript
JavaScript
Next.js
React
Node.js
GitHub
GitLab

# Nomes da empresa/produto
Fabersoft
HI Engenharia

# Termos técnicos comuns
README
Changelog
LICENSE
TODO
FIXME

# Siglas e acrônimos
API
SDK
CLI
CSS
HTML
JSON

# Comandos e identificadores comuns
npm
pnpm
eslint
prettier
```

- [ ] **Step 2: Criar `requirements-dev.txt`**

```
pyenchant>=3.2.0
pytest>=7.0.0
pre-commit>=3.0.0
```

- [ ] **Step 3: Commit arquivos de configuração**

```bash
git add .accent-whitelist.txt requirements-dev.txt
git commit -m "chore: add pt-BR accent fixer config files"
```

---

## Task 2: Implementar script principal

**Files:**
- Create: `scripts/fix-ptbr-accents.py`

- [ ] **Step 1: Escrever testes falhando para `check_and_correct`**

Arquivo: `tests/test_fix_ptbr_accents.py`

```python
import pytest

class TestCheckAndCorrect:
    def test_simple_correction_returns_correction(self):
        """'voce' deve retornar 'você'"""
        pass

    def test_already_correct_returns_none(self):
        """Palavra já correta deve retornar None"""
        pass

    def test_whitelist_word_returns_none(self):
        """Palavras na whitelist não são alteradas"""
        pass

    def test_multiple_suggestions_returns_none(self):
        """Palavras ambíguas não são alteradas"""
        pass
```

- [ ] **Step 2: Escrever testes falhando para `apply_corrections`**

```python
class TestApplyCorrections:
    def test_single_correction_applies_correctly(self):
        """Uma correção deve ser aplicada na posição correta"""
        pass

    def test_multiple_corrections_applied_in_reverse(self):
        """Múltiplas correções aplicadas do fim para início (preserva posições)"""
        pass
```

- [ ] **Step 3: Implementar `load_whitelist()`**

Ler arquivo `.accent-whitelist.txt`, ignorar linhas vazias e comentários (#).

- [ ] **Step 4: Implementar `get_staged_files()`**

Executar `git diff --cached --name-only --diff-filter=ACM`, filtrar por `.tsx`, `.ts`, `.md`.

- [ ] **Step 5: Implementar `normalize_word()`**

Normalização Unicode (NFD) + remover combining marks para comparação.

- [ ] **Step 6: Implementar `check_and_correct()`**

Lógica:
1. Se palavra está na whitelist → None
2. Se palavra existe no dicionário → None (já correta)
3. Buscar sugestões
4. Filtrar sugestões cuja normalização bate com a palavra original
5. Se exatamente 1 sugestão → retornar sugestão
6. Senão → None

- [ ] **Step 7: Implementar `apply_corrections()`**

Aplicar correções em ordem reversa (do fim para início) para preservar posições.

- [ ] **Step 8: Implementar `find_words_to_check()`**

Regex para encontrar palavras, ignorando:
- URLs, emails, paths
- Código inline (backticks)
- Palavras com números
- CamelCase/PascalCase

- [ ] **Step 9: Implementar `process_file()`**

1. Ler arquivo
2. Encontrar palavras candidatas
3. Para cada palavra, verificar e coletar correções
4. Se houver correções, aplicar e reescrever arquivo
5. Retornar True se modificou

- [ ] **Step 10: Implementar `main()`**

1. Verificar dependências (pyenchant, dicionário pt-BR)
2. Carregar whitelist
3. Obter arquivos staged
4. Processar cada arquivo
5. Se houve modificações, re-add ao staging via `git add`
6. Print resumo

- [ ] **Step 11: Commit script principal**

```bash
git add scripts/fix-ptbr-accents.py tests/test_fix_ptbr_accents.py
git commit -m "feat: add pt-BR accent fixer script"
```

---

## Task 3: Criar test fixtures

**Files:**
- Create: `tests/fixtures/sample-broken.tsx`
- Create: `tests/fixtures/sample-fixed.tsx`

- [ ] **Step 1: Criar `sample-broken.tsx`**

```tsx
// Arquivo com erros conhecidos para validacao do script
export const msg = "Voce tem pendencias abertas"
const titulo = "Modulo de administracao"
// Comentario sem acento deve ser corrigido
/* Bloco de comentario tambem */
```

- [ ] **Step 2: Criar `sample-fixed.tsx`** (expected output)

```tsx
// Arquivo com erros conhecidos para validação do script
export const msg = "Você tem pendências abertas"
const titulo = "Módulo de administração"
// Comentário sem acento deve ser corrigido
/* Bloco de comentário também */
```

- [ ] **Step 3: Adicionar teste de integração**

```python
def test_sample_file_transformation():
    """Processar sample-broken.tsx deve produzir sample-fixed.tsx"""
    pass
```

- [ ] **Step 4: Commit fixtures**

```bash
git add tests/fixtures/
git commit -m "test: add sample fixtures for accent fixer"
```

---

## Task 4: Integrar pre-commit hook

**Files:**
- Create: `.pre-commit-config.yaml`

- [ ] **Step 1: Criar `.pre-commit-config.yaml`**

```yaml
repos:
  - repo: local
    hooks:
      - id: fix-ptbr-accents
        name: Fix pt-BR accents
        entry: python scripts/fix-ptbr-accents.py
        language: system
        types: [file]
        files: \.(tsx?|md)$
        pass_filenames: false
```

- [ ] **Step 2: Testar hook manualmente**

```bash
# Criar arquivo com erro
echo "Teste de acentuacao" > test-accent.txt
git add test-accent.txt

# O hook deve corrigir automaticamente
git commit -m "test: accent correction"
```

- [ ] **Step 3: Commit pre-commit config**

```bash
git add .pre-commit-config.yaml
git commit -m "chore: add pre-commit hook for pt-BR accent fixer"
```

---

## Task 5: Documentação e validação final

**Files:**
- Modify: `README.md` (se existir) ou criar `docs/accent-fixer.md`

- [ ] **Step 1: Adicionar seção de instalação na documentação**

```markdown
## Corretor de Acentuação pt-BR

O projeto inclui um corretor automático de acentuação para textos em português brasileiro.

### Instalação

1. Instale o enchant no sistema:
   - Windows: `choco install enchant`
   - macOS: `brew install enchant`
   - Linux: `sudo apt install libenchant-2-dev`

2. Instale as dependências Python:
   ```bash
   pip install -r requirements-dev.txt
   ```

3. Instale os hooks pre-commit:
   ```bash
   pre-commit install
   ```

### Uso

O hook roda automaticamente antes de cada commit, corrigindo acentuação em arquivos `.tsx`, `.ts` e `.md`.

Para rodar manualmente em todos os arquivos:
```bash
python scripts/fix-ptbr-accents.py
```
```

- [ ] **Step 2: Rodar script em todo codebase**

```bash
python scripts/fix-ptbr-accents.py
```

- [ ] **Step 3: Revisar diff gerado**

Verificar se não há falsos positivos.

- [ ] **Step 4: Ajustar whitelist se necessário**

Adicionar palavras que não devem ser alteradas.

- [ ] **Step 5: Commit correções iniciais**

```bash
git add -A
git commit -m "fix: correct pt-BR accents across codebase"
```

- [ ] **Step 6: Rodar testes unitários**

```bash
pytest tests/test_fix_ptbr_accents.py -v
```

- [ ] **Step 7: Commit documentação**

```bash
git add docs/accent-fixer.md
git commit -m "docs: add accent fixer documentation"
```

---

## Ordem de Execução

```
Task 1 (config files) → Task 2 (script + tests) → Task 3 (fixtures) → Task 4 (pre-commit) → Task 5 (docs + validation)
```

## Dependências entre Tasks

- Task 2 depende de Task 1 (whitelist)
- Task 3 depende de Task 2 (script implementado)
- Task 4 depende de Task 2 (script funcionando)
- Task 5 depende de todas as anteriores

## Critérios de Aceite

- [ ] Script roda sem erros
- [ ] Testes unitários passando
- [ ] Pre-commit hook funciona
- [ ] Correções aplicadas no codebase sem falsos positivos
- [ ] Documentação completa
