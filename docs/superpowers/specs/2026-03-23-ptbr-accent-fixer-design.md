# Design: Corretor Automático de Acentuação pt-BR

**Data:** 2026-03-23
**Status:** Draft
**Autor:** Claude
**Versão Python:** 3.9+

## Problema

O frontend da aplicação contém textos em português brasileiro sem acentuação correta. Exemplos identificados:

- "Voce tem" → "Você tem"
- "pendencias" → "pendências"
- "modulos" → "módulos"
- "obrigatorio" → "obrigatório"

Isso afeta a qualidade e profissionalismo da interface do usuário.

## Solução

Implementar um script Python que corrige automaticamente a acentuação de palavras em português brasileiro, integrado como pre-commit hook para garantir que todo código commitado tenha a ortografia correta.

## Arquitetura

```
git commit
    │
    ▼
.pre-commit-config.yaml
    │
    ▼
scripts/fix-ptbr-accents.py
    │
    ├── Detecta arquivos staged (.tsx, .ts, .md)
    ├── Extrai texto e verifica ortografia com pyenchant
    ├── Substitui palavras incorretas
    └── Re-add arquivos modificados ao staging
    │
    ▼
.accent-whitelist.txt (nomes técnicos protegidos)
```

## Componentes

### 1. Script Python (`scripts/fix-ptbr-accents.py`)

Script principal que realiza a correção de acentuação.

**Funções principais:**

```python
def load_whitelist() -> set[str]:
    """Carrega palavras que não devem ser alteradas do arquivo .accent-whitelist.txt."""

def get_staged_files() -> list[Path]:
    """
    Retorna arquivos staged via 'git diff --cached --name-only --diff-filter=ACM'.
    Filtra internamente por extensões suportadas (.tsx, .ts, .md).
    """

def extract_text_content(file_path: Path) -> str:
    """Lê conteúdo do arquivo com encoding UTF-8."""

def find_words_to_check(text: str) -> list[tuple[str, int, int]]:
    """
    Encontra palavras candidatas para verificação.
    Retorna: [(palavra, inicio, fim), ...]
    Ignora: URLs, emails, paths, código inline, blocos de código.
    """

def check_and_correct(word: str, dictionary: enchant.Dict, whitelist: set[str]) -> str | None:
    """
    Verifica se palavra precisa de correção.
    Retorna correção ou None se não for necessária.
    """

def apply_corrections(text: str, corrections: list[tuple[int, int, str]]) -> str:
    """Aplica correções no texto por posição (inicio, fim, nova_palavra)."""

def process_file(file_path: Path, dictionary: enchant.Dict, whitelist: set[str]) -> bool:
    """Processa um arquivo. Retorna True se houve modificações."""

def main():
    """Orquestra: carrega whitelist, detecta staged files, processa, re-add ao staging."""
```

**Lógica de correção:**

1. Palavra é normalizada (remove acentos) e verificada no dicionário pt-BR
2. Se a palavra original JÁ existe no dicionário → não altera (está correta)
3. Se não existe, busca sugestões via `dictionary.suggest()`
4. Filtra sugestões cuja versão sem acentos bate com a palavra original
5. Se houver exatamente UMA sugestão válida → aplica correção
6. Se houver múltiplas sugestões ou nenhuma → mantém original (evita ambiguidade)

**Exemplo de ambiguidade não tratada:**
- "pelo" pode ser "pelo" (correto como está) ou ser confundido
- Por isso, primeiro verificamos se a palavra JÁ está correta no dicionário

**Critério de match:**
- Normalização Unicode (NFD + remove combining marks)
- Comparação case-insensitive
- Match exato após normalização

### 2. Whitelist (`.accent-whitelist.txt`)

Lista de palavras que não devem ser alteradas, mesmo que pareçam incorretas.

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

### 3. Pre-commit Hook (`.pre-commit-config.yaml`)

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

**Nota sobre `pass_filenames: false`:**
O script detecta arquivos staged internamente via `git diff --cached` para ter controle total sobre quais arquivos processar e como filtrá-los. Isso permite:
- Filtrar por extensão de forma consistente
- Aplicar lógica de ignore (blocos de código, etc.) antes de processar
- Garantir que apenas arquivos staged sejam modificados

### 4. Dependências

**Python (`requirements-dev.txt` na raiz do projeto):**
```
pyenchant>=3.2.0
```

**Requisitos:**
- Python 3.9+ (para type hints modernos como `set[str]`, `list[str]`)
- pyenchant 3.2+
- enchant library instalada no sistema

**Sistema (enchant):**
- Windows: `choco install enchant`
- macOS: `brew install enchant`
- Linux: `apt install libenchant-2-dev` ou equivalente

## Casos Especiais

### Strings dentro de código TypeScript/TSX

```tsx
const msg = "Voce tem pendencias"  // → "Você tem pendências"
const path = `/api/users/${id}`     // Não altera (contém variáveis)
```

### Comentários

```tsx
// comentario simples      →  // comentário simples
/* bloco de comentario */  →  /* bloco de comentário */
```

### Markdown

- Processa texto normal
- **Preserva blocos de código:** linhas entre ` ``` ` e ` ``` `
- **Preserva código inline:** texto entre backticks `` ` ``

Exemplo:
```markdown
Este texto sera corrigido.

```typescript
// Este comentario NAO e alterado
const msg = "Voce" // Tambem NAO alterado
```

Mas `codigo inline` tambem nao e alterado.
```

### Padrões ignorados automaticamente

| Padrão | Regex | Exemplo |
|--------|-------|---------|
| URLs | `https?://[^\s]+` | `https://exemplo.com` |
| Emails | `[^\s@]+@[^\s@]+\.[^\s@]+` | `user@domain.com` |
| Paths Unix | `/[\w/.-]+` | `/src/components/Button.tsx` |
| Paths Windows | `[A-Za-z]:\\[\w\\.-]+` | `C:\Users\name\file.txt` |
| Código inline | `` `[^`]+` `` | `` `codigo` `` |
| Palavras com números | `\w*\d+\w*` | `user123`, `proto3` |
| CamelCase/PascalCase | `[A-Z][a-z]+[A-Z]` | `TypeScript`, `Fabersoft` |

**Nota:** Palavras com hífens como `café-da-manhã` são processadas palavra por palavra.

### Arquivos JSON (escopo futuro)

Arquivos JSON **não são processados** na implementação inicial devido à complexidade de:
- Preservar formatação exata (indentação, vírgulas)
- Lidar com caracteres escapados em strings
- Manter rastreamento de posição

Podem ser adicionados em versão futura se necessário.

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| pyenchant não instalado | **Falha** com erro claro + instruções de instalação |
| Dicionário pt-BR ausente | **Falha** com instruções para instalar dicionário |
| Arquivo binário | Skip silencioso (detectado por content-type) |
| Encoding inválido | Log + skip do arquivo específico |
| Nenhuma sugestão válida | Mantém palavra original (não altera) |
| Múltiplas sugestões | Mantém palavra original (ambiguidade) |

**Por que falhar em vez de avisar?**
Se as dependências estiverem faltando, o hook não pode fazer seu trabalho. Avisos são facilmente ignorados e permitiriam código com erros de acentuação ser commitado. Falhar força a resolução do problema.

## Testes

### Testes Unitários (`tests/test_fix_ptbr_accents.py`)

```python
import pytest
from fix_ptbr_accents import check_and_correct, apply_corrections, load_whitelist
import enchant

@pytest.fixture
def dictionary():
    return enchant.Dict("pt_BR")

@pytest.fixture
def whitelist():
    return load_whitelist()

class TestCheckAndCorrect:
    def test_simple_correction(self, dictionary, whitelist):
        result = check_and_correct("voce", dictionary, whitelist)
        assert result == "você"

    def test_already_correct(self, dictionary, whitelist):
        result = check_and_correct("você", dictionary, whitelist)
        assert result is None

    def test_whitelist_word(self, dictionary, whitelist):
        result = check_and_correct("TypeScript", dictionary, whitelist)
        assert result is None

    def test_technical_acronym(self, dictionary, whitelist):
        result = check_and_correct("API", dictionary, whitelist)
        assert result is None

    def test_multiple_suggestions_ambiguous(self, dictionary, whitelist):
        # Palavras com múltiplas correções possíveis não são alteradas
        result = check_and_correct("para", dictionary, whitelist)
        # "para" já está correto no dicionário
        assert result is None

class TestApplyCorrections:
    def test_single_correction(self):
        text = "O usuario acessou o sistema"
        corrections = [(2, 10, "usuário")]
        result = apply_corrections(text, corrections)
        assert result == "O usuário acessou o sistema"

    def test_multiple_corrections(self):
        text = "Voce tem pendencias"
        corrections = [(0, 5, "Você"), (9, 18, "pendências")]
        result = apply_corrections(text, corrections)
        assert result == "Você tem pendências"

    def test_no_corrections(self):
        text = "Texto correto"
        corrections = []
        result = apply_corrections(text, corrections)
        assert result == "Texto correto"
```

### Arquivo de Teste (`tests/fixtures/sample-broken.tsx`)

```tsx
// Arquivo com erros conhecidos para validação do script
export const msg = "Voce tem pendencias abertas"
const titulo = "Modulo de administracao"
// Comentario sem acento deve ser corrigido
/* Bloco de comentario tambem */
```

**Resultado esperado:**
```tsx
// Arquivo com erros conhecidos para validação do script
export const msg = "Você tem pendências abertas"
const titulo = "Módulo de administração"
// Comentário sem acento deve ser corrigido
/* Bloco de comentário também */
```

### Validação Manual Inicial

Antes de confiar totalmente no hook:

1. `python scripts/fix-ptbr-accents.py` (roda em todos os arquivos)
2. Revisar diff gerado com atenção
3. Adicionar falsos positivos à whitelist
4. Commitar correções iniciais
5. Testar hook com novo commit

## Critérios de Sucesso

- [ ] Script roda sem erros em todo o codebase
- [ ] Nenhum falso positivo em nomes técnicos
- [ ] Pre-commit integrado e funcionando
- [ ] Documentação de instalação clara
- [ ] Testes unitários passando

## Estrutura de Arquivos

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
        └── sample-broken.tsx
```

## Instalação

```bash
# 1. Instalar enchant no sistema
# Windows:
choco install enchant
# macOS:
brew install enchant
# Linux (Ubuntu/Debian):
sudo apt install libenchant-2-dev

# 2. Instalar dependências Python
pip install -r requirements-dev.txt

# 3. Instalar pre-commit (se ainda não tiver)
pip install pre-commit

# 4. Instalar hooks
pre-commit install

# 5. Testar
echo "Teste de acentuacao" > test.txt
git add test.txt
git commit -m "test"
# Deve corrigir para "Teste de acentuação"
```

## Considerações Futuras

- **Fase 2:** Adicionar suporte a arquivos JSON
- **Fase 2:** Adicionar suporte a arquivos `.css` se necessário
- **Opcional:** Modo interativo para casos ambíguos (`--interactive`)
- **Opcional:** Integrar com editor (LSP) para correção em tempo real
