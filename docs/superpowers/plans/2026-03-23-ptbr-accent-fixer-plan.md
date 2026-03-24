# pt-BR Accent Fixer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use @superpowers:subagent-driven-development (recommended) or @superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar corretor automático de acentuação pt-BR integrado como pre-commit hook

**Architecture:** Script Python com pyenchant detecta palavras sem acento, verifica contra dicionário pt-BR, e aplica correções. Pre-commit hook garante execução automática em cada commit.

**Tech Stack:** Python 3.9+, pyenchant, pre-commit framework, enchant (system library)

---

## Estrutura de Arquivos Final

```
code/
├── .pre-commit-config.yaml     # Hook configuration
├── .accent-whitelist.txt       # Protected words
├── requirements-dev.txt        # Python dependencies
├── scripts/
│   └── fix-ptbr-accents.py     # Main script
└── tests/
    ├── test_fix_ptbr_accents.py
    └── fixtures/
        ├── sample-broken.tsx
        └── sample-fixed.tsx
```

---

## Task 1: Setup - Criar arquivos de configuração

**Files:**
- Create: `.accent-whitelist.txt`
- Create: `requirements-dev.txt`

- [ ] **Step 1: Criar `.accent-whitelist.txt`**

```txt
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

```txt
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

## Task 2: Criar estrutura de testes e fixtures

**Files:**
- Create: `tests/__init__.py`
- Create: `tests/fixtures/sample-broken.tsx`
- Create: `tests/fixtures/sample-fixed.tsx`
- Create: `tests/test_fix_ptbr_accents.py` (testes COMPLETOS, não stubs)

- [ ] **Step 1: Criar diretórios e `tests/__init__.py`**

```bash
mkdir -p tests/fixtures
touch tests/__init__.py
```

- [ ] **Step 2: Criar `tests/fixtures/sample-broken.tsx`**

```tsx
// Arquivo com erros conhecidos para validação do script
export const msg = "Voce tem pendencias abertas"
const titulo = "Modulo de administracao"
// Comentario sem acento deve ser corrigido
/* Bloco de comentario tambem */
```

- [ ] **Step 3: Criar `tests/fixtures/sample-fixed.tsx`**

```tsx
// Arquivo com erros conhecidos para validação do script
export const msg = "Você tem pendências abertas"
const titulo = "Módulo de administração"
// Comentário sem acento deve ser corrigido
/* Bloco de comentário também */
```

- [ ] **Step 4: Criar `tests/test_fix_ptbr_accents.py` com testes COMPLETOS**

```python
"""Testes unitários para o corretor de acentuação pt-BR."""
import pytest
from pathlib import Path
import sys

# Adicionar scripts ao path para import
sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))
from fix_ptbr_accents import (
    load_whitelist,
    normalize_word,
    check_and_correct,
    apply_corrections,
    find_words_to_check,
    preserve_case,
)

import enchant


# ============ FIXTURES ============

@pytest.fixture
def dictionary():
    """Dicionário pt-BR para testes."""
    return enchant.Dict("pt_BR")


@pytest.fixture
def whitelist():
    """Whitelist carregada do arquivo."""
    return load_whitelist()


@pytest.fixture
def sample_broken() -> str:
    """Conteúdo do arquivo com erros."""
    return (Path(__file__).parent / "fixtures" / "sample-broken.tsx").read_text(encoding="utf-8")


@pytest.fixture
def sample_fixed() -> str:
    """Conteúdo esperado após correção."""
    return (Path(__file__).parent / "fixtures" / "sample-fixed.tsx").read_text(encoding="utf-8")


# ============ TESTES: load_whitelist ============

class TestLoadWhitelist:
    def test_loads_non_empty_set(self, whitelist):
        """Whitelist deve retornar um set não vazio."""
        assert isinstance(whitelist, set)
        assert len(whitelist) > 0

    def test_contains_expected_words(self, whitelist):
        """Whitelist deve conter palavras técnicas conhecidas."""
        assert "TypeScript" in whitelist
        assert "JavaScript" in whitelist
        assert "React" in whitelist
        assert "API" in whitelist

    def test_is_case_insensitive(self, whitelist):
        """Whitelist deve ser case-insensitive na comparação."""
        # A função deve normalizar para comparação
        assert "typescript" in {w.lower() for w in whitelist}


# ============ TESTES: normalize_word ============

class TestNormalizeWord:
    def test_removes_acutes(self):
        """Remove acentos agudos."""
        assert normalize_word("você") == "voce"
        assert normalize_word("administração") == "administracao"

    def test_removes_tildes(self):
        """Remove til."""
        assert normalize_word("pendências") == "pendencias"
        assert normalize_word("módulo") == "modulo"

    def test_removes_cedilla(self):
        """Remove cedilha."""
        assert normalize_word("correção") == "correcao"

    def test_handles_mixed_case(self):
        """Lida com maiúsculas e minúsculas."""
        assert normalize_word("Você").lower() == "voce"
        assert normalize_word("ADMINISTRAÇÃO").lower() == "administracao"

    def test_returns_lowercase(self):
        """Retorna em minúsculas para comparação."""
        assert normalize_word("VoCe").islower()


# ============ TESTES: preserve_case ============

class TestPreserveCase:
    def test_preserves_all_caps(self):
        """Palavras em MAIÚSCULAS mantêm o padrão."""
        assert preserve_case("VOCE", "você") == "VOCÊ"

    def test_preserves_capitalized(self):
        """Palavras Capitalizadas mantêm capitalização."""
        assert preserve_case("Voce", "você") == "Você"

    def test_preserves_lowercase(self):
        """Palavras minúsculas permanecem minúsculas."""
        assert preserve_case("voce", "você") == "você"


# ============ TESTES: check_and_correct ============

class TestCheckAndCorrect:
    def test_simple_correction_returns_correction(self, dictionary, whitelist):
        """'voce' deve retornar 'você'."""
        result = check_and_correct("voce", dictionary, whitelist)
        assert result == "você"

    def test_already_correct_returns_none(self, dictionary, whitelist):
        """Palavra já correta deve retornar None."""
        result = check_and_correct("você", dictionary, whitelist)
        assert result is None

    def test_whitelist_word_returns_none(self, dictionary, whitelist):
        """Palavras na whitelist não são alteradas."""
        result = check_and_correct("TypeScript", dictionary, whitelist)
        assert result is None

    def test_technical_acronym_returns_none(self, dictionary, whitelist):
        """Acrônimos técnicos não são alterados."""
        result = check_and_correct("API", dictionary, whitelist)
        assert result is None

    def test_multiple_suggestions_returns_none(self, dictionary, whitelist):
        """Palavras com múltiplas sugestões possíveis não são alteradas."""
        # "para" já está correto no dicionário
        result = check_and_correct("para", dictionary, whitelist)
        assert result is None

    def test_case_preserved_in_correction(self, dictionary, whitelist):
        """Correção preserva case da palavra original."""
        result = check_and_correct("Voce", dictionary, whitelist)
        assert result == "Você"


# ============ TESTES: apply_corrections ============

class TestApplyCorrections:
    def test_single_correction_applies_correctly(self):
        """Uma correção aplicada na posição correta."""
        text = "O usuario acessou o sistema"
        corrections = [(2, 10, "usuário")]
        result = apply_corrections(text, corrections)
        assert result == "O usuário acessou o sistema"

    def test_multiple_corrections_applied_in_reverse(self):
        """Múltiplas correções aplicadas do fim para início."""
        text = "Voce tem pendencias"
        corrections = [(0, 5, "Você"), (9, 18, "pendências")]
        result = apply_corrections(text, corrections)
        assert result == "Você tem pendências"

    def test_no_corrections_returns_original(self):
        """Lista vazia de correções retorna texto original."""
        text = "Texto correto"
        corrections = []
        result = apply_corrections(text, corrections)
        assert result == "Texto correto"

    def test_preserves_surrounding_text(self):
        """Correções não afetam texto ao redor."""
        text = 'const msg = "Voce tem pendencias"'
        corrections = [(14, 19, "Você"), (23, 32, "pendências")]
        result = apply_corrections(text, corrections)
        assert result == 'const msg = "Você tem pendências"'


# ============ TESTES: find_words_to_check ============

class TestFindWordsToCheck:
    def test_finds_simple_words(self):
        """Encontra palavras simples."""
        text = "Voce tem pendencias"
        words = find_words_to_check(text)
        word_texts = [w[0] for w in words]
        assert "Voce" in word_texts
        assert "tem" in word_texts
        assert "pendencias" in word_texts

    def test_ignores_urls(self):
        """Ignora URLs."""
        text = "Visite https://exemplo.com para mais informacao"
        words = find_words_to_check(text)
        word_texts = [w[0] for w in words]
        assert "https" not in word_texts
        assert "exemplo" not in word_texts
        assert "informacao" in word_texts  # esta deve ser encontrada

    def test_ignores_inline_code(self):
        """Ignora código entre backticks."""
        text = "Use `const x = 1` para inicializar"
        words = find_words_to_check(text)
        word_texts = [w[0] for w in words]
        assert "const" not in word_texts
        assert "para" in word_texts

    def test_ignores_camel_case(self):
        """Ignora identificadores CamelCase."""
        text = "TypeScript e React sao frameworks"
        words = find_words_to_check(text)
        word_texts = [w[0] for w in words]
        # TypeScript e React devem ser ignorados (CamelCase)
        # "sao" deve ser encontrado para correção
        assert "sao" in word_texts


# ============ TESTES DE INTEGRAÇÃO ============

class TestIntegration:
    def test_sample_file_transformation(self, sample_broken, sample_fixed, dictionary, whitelist):
        """Processar sample-broken deve produzir sample-fixed."""
        words = find_words_to_check(sample_broken)
        corrections = []

        for word, start, end in words:
            correction = check_and_correct(word, dictionary, whitelist)
            if correction:
                corrections.append((start, end, preserve_case(word, correction)))

        result = apply_corrections(sample_broken, corrections)
        assert result == sample_fixed
```

- [ ] **Step 5: Verificar que testes falham (esperado - funções não implementadas)**

```bash
pip install -r requirements-dev.txt
pytest tests/test_fix_ptbr_accents.py -v
```

Esperado: Todos os testes falham com "module not found" ou "function not defined"

- [ ] **Step 6: Commit arquivos de teste**

```bash
git add tests/
git commit -m "test: add complete test suite for pt-BR accent fixer"
```

---

## Task 3: Implementar funções auxiliares (TDD cycle)

**Files:**
- Create: `scripts/fix-ptbr-accents.py`

- [ ] **Step 1: Criar estrutura inicial do script**

```python
"""Corretor automático de acentuação pt-BR."""
import re
import subprocess
import sys
import unicodedata
from pathlib import Path

# Constantes
REPO_ROOT = Path(__file__).parent.parent
WHITELIST_PATH = REPO_ROOT / ".accent-whitelist.txt"
SUPPORTED_EXTENSIONS = {".tsx", ".ts", ".md"}
```

- [ ] **Step 2: Implementar `load_whitelist()`**

```python
def load_whitelist() -> set[str]:
    """Carrega palavras que não devem ser alteradas do arquivo .accent-whitelist.txt."""
    if not WHITELIST_PATH.exists():
        raise FileNotFoundError(
            f"Whitelist não encontrada em {WHITELIST_PATH}. "
            "Crie o arquivo com as palavras protegidas."
        )

    whitelist = set()
    for line in WHITELIST_PATH.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            whitelist.add(line)

    return whitelist
```

- [ ] **Step 3: Rodar testes de whitelist**

```bash
pytest tests/test_fix_ptbr_accents.py::TestLoadWhitelist -v
```

Esperado: PASS

- [ ] **Step 4: Implementar `normalize_word()`**

```python
def normalize_word(word: str) -> str:
    """
    Normaliza palavra removendo acentos e convertendo para minúsculas.

    Usa normalização Unicode NFD e remove combining marks.
    """
    # Normaliza para NFD (decompõe caracteres acentuados)
    normalized = unicodedata.normalize("NFD", word)
    # Remove combining marks (acentos)
    without_accents = "".join(
        char for char in normalized
        if unicodedata.category(char) != "Mn"
    )
    return without_accents.lower()
```

- [ ] **Step 5: Rodar testes de normalize**

```bash
pytest tests/test_fix_ptbr_accents.py::TestNormalizeWord -v
```

Esperado: PASS

- [ ] **Step 6: Implementar `preserve_case()`**

```python
def preserve_case(original: str, correction: str) -> str:
    """
    Preserva o case da palavra original na correção.

    - MAIÚSCULAS → MAIÚSCULAS
    - Capitalizado → Capitalizado
    - minúsculas → minúsculas
    """
    if original.isupper():
        return correction.upper()
    elif original[0].isupper():
        return correction.capitalize()
    return correction.lower()
```

- [ ] **Step 7: Rodar testes de preserve_case**

```bash
pytest tests/test_fix_ptbr_accents.py::TestPreserveCase -v
```

Esperado: PASS

- [ ] **Step 8: Commit funções auxiliares**

```bash
git add scripts/fix-ptbr-accents.py
git commit -m "feat: add helper functions for accent normalization and case preservation"
```

---

## Task 4: Implementar funções principais (TDD cycle)

**Files:**
- Modify: `scripts/fix-ptbr-accents.py`

- [ ] **Step 1: Implementar `check_and_correct()`**

```python
def check_and_correct(
    word: str,
    dictionary: "enchant.Dict",
    whitelist: set[str]
) -> str | None:
    """
    Verifica se palavra precisa de correção e retorna a correção.

    Returns:
        str: Correção aplicável, ou None se não for necessária.

    Lógica:
    1. Se na whitelist → None
    2. Se já existe no dicionário → None (correta)
    3. Buscar sugestões
    4. Filtrar sugestões cuja normalização bate com a palavra
    5. Se exatamente 1 sugestão → retorna com case preservado
    6. Senão → None (ambíguo ou sem sugestão)
    """
    # Verificar whitelist (case-insensitive)
    if word in whitelist or normalize_word(word) in {normalize_word(w) for w in whitelist}:
        return None

    # Se a palavra já existe no dicionário, está correta
    if dictionary.check(word):
        return None

    # Buscar sugestões
    suggestions = dictionary.suggest(word)
    if not suggestions:
        return None

    # Filtrar sugestões cuja normalização bate com a palavra original
    word_normalized = normalize_word(word)
    matching_suggestions = [
        s for s in suggestions
        if normalize_word(s) == word_normalized
    ]

    # Se houver exatamente uma sugestão válida, aplicar
    if len(matching_suggestions) == 1:
        return preserve_case(word, matching_suggestions[0])

    # Múltiplas sugestões = ambíguo, não alterar
    return None
```

- [ ] **Step 2: Rodar testes de check_and_correct**

```bash
pytest tests/test_fix_ptbr_accents.py::TestCheckAndCorrect -v
```

Esperado: PASS

- [ ] **Step 3: Implementar `apply_corrections()`**

```python
def apply_corrections(
    text: str,
    corrections: list[tuple[int, int, str]]
) -> str:
    """
    Aplica correções no texto por posição (início, fim, nova_palavra).

    Correções são aplicadas do fim para início para preservar índices.
    """
    if not corrections:
        return text

    # Ordenar por posição decrescente
    sorted_corrections = sorted(corrections, key=lambda c: c[0], reverse=True)

    result = text
    for start, end, new_word in sorted_corrections:
        result = result[:start] + new_word + result[end:]

    return result
```

- [ ] **Step 4: Rodar testes de apply_corrections**

```bash
pytest tests/test_fix_ptbr_accents.py::TestApplyCorrections -v
```

Esperado: PASS

- [ ] **Step 5: Implementar `find_words_to_check()`**

```python
def find_words_to_check(text: str) -> list[tuple[str, int, int]]:
    """
    Encontra palavras candidatas para verificação.

    Returns:
        Lista de tuplas (palavra, início, fim).

    Ignora:
    - URLs, emails, paths
    - Código inline (backticks)
    - Palavras com números
    - CamelCase/PascalCase (tecnologias)
    """
    # Padrões a ignorar (serão removidos do texto antes de buscar palavras)
    ignore_patterns = [
        r'https?://[^\s]+',           # URLs
        r'[^\s@]+@[^\s@]+\.[^\s@]+',  # Emails
        r'/[\w/.-]+',                 # Paths Unix
        r'[A-Za-z]:\\[\w\\.-]+',      # Paths Windows
        r'`[^`]+`',                   # Código inline
    ]

    # Criar máscara de caracteres a ignorar
    ignore_mask = [False] * len(text)

    for pattern in ignore_patterns:
        for match in re.finditer(pattern, text):
            for i in range(match.start(), match.end()):
                if i < len(ignore_mask):
                    ignore_mask[i] = True

    # Padrão de palavra (inclui caracteres acentuados)
    word_pattern = r'[a-zA-ZàáâãéêíóôõúüçÀÁÂÃÉÊÍÓÔÕÚÜÇ]+'

    words = []
    for match in re.finditer(word_pattern, text):
        word = match.group()
        start, end = match.start(), match.end()

        # Verificar se está na área ignorada
        if any(ignore_mask[i] for i in range(start, min(end, len(ignore_mask)))):
            continue

        # Ignorar palavras com números
        if any(c.isdigit() for c in word):
            continue

        # Ignorar CamelCase/PascalCase (tecnologias)
        if re.match(r'[A-Z][a-z]+[A-Z]', word):
            continue

        words.append((word, start, end))

    return words
```

- [ ] **Step 6: Rodar testes de find_words_to_check**

```bash
pytest tests/test_fix_ptbr_accents.py::TestFindWordsToCheck -v
```

Esperado: PASS

- [ ] **Step 7: Rodar teste de integração**

```bash
pytest tests/test_fix_ptbr_accents.py::TestIntegration -v
```

Esperado: PASS

- [ ] **Step 8: Commit funções principais**

```bash
git add scripts/fix-ptbr-accents.py
git commit -m "feat: implement core accent correction functions"
```

---

## Task 5: Implementar processamento de arquivos e CLI

**Files:**
- Modify: `scripts/fix-ptbr-accents.py`

- [ ] **Step 1: Implementar `get_staged_files()`**

```python
def get_staged_files() -> list[Path]:
    """
    Retorna arquivos staged via git diff.

    Filtra por extensões suportadas (.tsx, .ts, .md).
    """
    try:
        result = subprocess.run(
            ["git", "diff", "--cached", "--name-only", "--diff-filter=ACM"],
            capture_output=True,
            text=True,
            check=True,
            cwd=REPO_ROOT,
        )
    except subprocess.CalledProcessError:
        return []

    files = []
    for line in result.stdout.strip().splitlines():
        if not line:
            continue
        path = REPO_ROOT / line
        if path.suffix in SUPPORTED_EXTENSIONS:
            files.append(path)

    return files
```

- [ ] **Step 2: Implementar `process_file()`**

```python
def process_file(
    file_path: Path,
    dictionary: "enchant.Dict",
    whitelist: set[str]
) -> bool:
    """
    Processa um arquivo aplicando correções de acentuação.

    Returns:
        True se o arquivo foi modificado, False caso contrário.
    """
    try:
        content = file_path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, IOError):
        # Skip arquivos com problemas de encoding
        return False

    words = find_words_to_check(content)
    corrections = []

    for word, start, end in words:
        correction = check_and_correct(word, dictionary, whitelist)
        if correction:
            corrections.append((start, end, correction))

    if not corrections:
        return False

    new_content = apply_corrections(content, corrections)
    file_path.write_text(new_content, encoding="utf-8")
    return True
```

- [ ] **Step 3: Implementar `re_add_to_staging()`**

```python
def re_add_to_staging(files: list[Path]) -> None:
    """Re-adiciona arquivos modificados ao staging area."""
    if not files:
        return

    try:
        subprocess.run(
            ["git", "add", *[str(f.relative_to(REPO_ROOT)) for f in files]],
            check=True,
            cwd=REPO_ROOT,
        )
    except subprocess.CalledProcessError as e:
        print(f"Erro ao re-adicionar arquivos ao staging: {e}", file=sys.stderr)
```

- [ ] **Step 4: Implementar `main()`**

```python
def main() -> int:
    """
    Função principal do corretor de acentuação.

    Returns:
        0 se sucesso, 1 se erro.
    """
    # Verificar dependências
    try:
        import enchant
    except ImportError:
        print("ERRO: pyenchant não está instalado.", file=sys.stderr)
        print("Instale com: pip install pyenchant", file=sys.stderr)
        return 1

    # Verificar dicionário pt-BR
    try:
        dictionary = enchant.Dict("pt_BR")
    except enchant.errors.DictNotFoundError:
        print("ERRO: Dicionário pt-BR não encontrado.", file=sys.stderr)
        print("Instale o dicionário:", file=sys.stderr)
        print("  - Ubuntu/Debian: sudo apt-get install hunspell-pt-br", file=sys.stderr)
        print("  - macOS: brew install hunspell", file=sys.stderr)
        print("  - Windows: baixe de https://github.com/LibreOffice/dictionaries", file=sys.stderr)
        return 1

    # Carregar whitelist
    try:
        whitelist = load_whitelist()
    except FileNotFoundError as e:
        print(f"ERRO: {e}", file=sys.stderr)
        return 1

    # Obter arquivos staged
    staged_files = get_staged_files()
    if not staged_files:
        # Nenhum arquivo relevante, sucesso silencioso
        return 0

    # Processar arquivos
    modified_files = []
    for file_path in staged_files:
        if process_file(file_path, dictionary, whitelist):
            modified_files.append(file_path)
            print(f"Corrigido: {file_path.relative_to(REPO_ROOT)}")

    # Re-adicionar arquivos modificados ao staging
    if modified_files:
        re_add_to_staging(modified_files)
        print(f"\n{len(modified_files)} arquivo(s) corrigido(s) e re-adicionado(s) ao staging.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 5: Rodar todos os testes**

```bash
pytest tests/test_fix_ptbr_accents.py -v
```

Esperado: Todos PASS

- [ ] **Step 6: Testar script manualmente**

```bash
# Criar arquivo de teste
echo "Teste de acentuacao" > test-manual.md
git add test-manual.md

# Rodar script
python scripts/fix-ptbr-accents.py

# Verificar se corrigiu
cat test-manual.md
# Esperado: "Teste de acentuação"

# Limpar
git reset HEAD test-manual.md
rm test-manual.md
```

- [ ] **Step 7: Commit processamento de arquivos**

```bash
git add scripts/fix-ptbr-accents.py
git commit -m "feat: complete pt-BR accent fixer with file processing"
```

---

## Task 6: Integrar com pre-commit

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

**Nota:** `pass_filenames: false` é intencional. O script detecta arquivos staged internamente via `git diff --cached` para ter controle total sobre o processamento.

- [ ] **Step 2: Instalar pre-commit hook**

```bash
pip install pre-commit
pre-commit install
```

- [ ] **Step 3: Testar hook end-to-end**

```bash
# Criar arquivo com erro
cp tests/fixtures/sample-broken.tsx test-hook.tsx
git add test-hook.tsx

# Commit (hook deve corrigir automaticamente)
git commit -m "test: verify pre-commit hook"

# Verificar se arquivo foi corrigido
cat test-hook.tsx
# Deve conter "Você tem pendências" em vez de "Voce tem pendencias"

# Limpar
git rm test-hook.tsx
git commit -m "test: cleanup hook test"
```

- [ ] **Step 4: Commit pre-commit config**

```bash
git add .pre-commit-config.yaml
git commit -m "feat: add pre-commit hook for pt-BR accent fixing"
```

---

## Task 7: Documentação

**Files:**
- Create: `docs/accent-fixer.md`

- [ ] **Step 1: Criar `docs/accent-fixer.md`**

```markdown
# Corretor de Acentuação pt-BR

O projeto inclui um corretor automático de acentuação para textos em português brasileiro.

## Instalação

### 1. Instalar enchant no sistema

**Windows:**
```bash
choco install enchant
```

**macOS:**
```bash
brew install enchant
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install libenchant-2-dev hunspell-pt-br
```

### 2. Instalar dependências Python

```bash
pip install -r requirements-dev.txt
```

### 3. Instalar hooks pre-commit

```bash
pre-commit install
```

## Uso

### Automático (recomendado)

O hook roda automaticamente antes de cada commit, corrigindo acentuação em arquivos `.tsx`, `.ts` e `.md`.

### Manual

Para rodar em todos os arquivos staged:

```bash
python scripts/fix-ptbr-accents.py
```

## Whitelist

Palavras técnicas que não devem ser alteradas estão em `.accent-whitelist.txt`. Adicione novas palavras conforme necessário.

## Fluxo do Hook

Quando o hook faz correções:
1. O commit é processado
2. Arquivos são modificados in-place
3. Arquivos são re-adicionados ao staging
4. O commit prossegue

## Troubleshooting

### "Dicionário pt-BR não encontrado"

Instale o dicionário hunspell para português brasileiro.

### "pyenchant não está instalado"

```bash
pip install pyenchant
```
```

- [ ] **Step 2: Commit documentação**

```bash
git add docs/accent-fixer.md
git commit -m "docs: add pt-BR accent fixer documentation"
```

---

## Ordem de Execução

```
Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6 → Task 7
```

## Critérios de Aceite

- [ ] Script roda sem erros
- [ ] Todos os testes unitários passando
- [ ] Pre-commit hook funciona end-to-end
- [ ] Documentação completa
- [ ] Código segue padrões do projeto
