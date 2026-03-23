# Design: Corretor Automático de Acentuação pt-BR

**Data:** 2026-03-23
**Status:** Draft
**Autor:** Claude

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
    ├── Detecta arquivos staged (.tsx, .ts, .md, .json)
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
    """Carrega palavras que não devem ser alteradas."""

def get_staged_files() -> list[Path]:
    """Retorna arquivos staged via git diff --cached."""

def extract_text_content(file_path: Path) -> str:
    """Lê conteúdo do arquivo."""

def find_portuguese_words(text: str) -> list[tuple[str, int]]:
    """Encontra palavras que parecem português."""

def check_and_correct(word: str, dictionary: enchant.Dict) -> str | None:
    """Verifica se palavra está correta e retorna correção se aplicável."""

def apply_corrections(text: str, corrections: list[tuple[int, int, str]]) -> str:
    """Aplica correções no texto mantendo posições."""

def process_file(file_path: Path, dictionary: enchant.Dict, whitelist: set[str]) -> bool:
    """Processa um arquivo, retorna True se houve modificações."""

def main():
    """Orquestra todo o processo."""
```

**Lógica de correção:**

1. Palavra sem acento é verificada no dicionário pt-BR
2. Se não encontrada, busca sugestões via `dictionary.suggest()`
3. Filtra sugestões que são a versão acentuada da palavra original
4. Só aceita se for única sugestão válida (evita ambiguidade)

**Critério de match:**
- Ignora acentos na comparação (normalização Unicode)
- Compara case-insensitive
- Requer match exato desconsiderando acentos

### 2. Whitelist (`.accent-whitelist.txt`)

Lista de palavras que não devem ser alteradas.

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
        files: \.(tsx?|md|json)$
        pass_filenames: false
```

### 4. Dependências

**Python (`requirements-dev.txt`):**
```
pyenchant>=3.2.0
```

**Sistema (enchant):**
- Windows: `choco install enchant`
- macOS: `brew install enchant`
- Linux: `apt install libenchant-2-dev`

## Casos Especiais

### Strings dentro de código

```tsx
const msg = "Voce tem pendencias"  // → "Você tem pendências"
```

### Comentários

```tsx
// comentario simples  →  // comentário simples
/* bloco de comentario */  →  /* bloco de comentário */
```

### Arquivos JSON

- Processa apenas valores de strings
- Não altera chaves
- Preserva estrutura JSON válida

### Markdown

- Processa texto normal
- Preserva blocos de código (` ``` `)

### Ignorados automaticamente

- URLs (`https://...`)
- Emails (`usuario@dominio.com`)
- Paths de arquivos (`/src/components/...`)
- Palavras mistas com caracteres especiais

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| pyenchant não instalado | Aviso + skip do hook |
| Dicionário pt-BR ausente | Erro claro com instruções de instalação |
| Arquivo binário | Skip silencioso |
| Encoding inválido | Log + skip do arquivo |
| Nenhuma sugestão válida | Mantém palavra original |

## Testes

### Testes Unitários (`tests/test_fix_ptbr_accents.py`)

```python
def test_simple_correction():
    assert correct_word("voce") == "você"

def test_already_correct():
    assert correct_word("você") is None

def test_whitelist():
    assert correct_word("TypeScript") is None

def test_technical_term():
    assert correct_word("API") is None

def test_context_preservation():
    text = "O usuario acessou o sistema"
    result = apply_corrections(text)
    assert result == "O usuário acessou o sistema"
```

### Arquivo de Teste (`tests/fixtures/sample-broken.tsx`)

```tsx
// Arquivo com erros conhecidos para validação
export const msg = "Voce tem pendencias abertas"
// Comentario sem acento
```

### Validação Manual

1. Executar script sobre todo o codebase
2. Revisar diff gerado antes de commitar
3. Ajustar whitelist conforme necessário

## Critérios de Sucesso

- [ ] Script roda sem erros em todo o codebase
- [ ] Nenhum falso positivo em nomes técnicos
- [ ] Pre-commit integrado e funcionando
- [ ] Documentação de instalação clara

## Estrutura de Arquivos

```
code/
├── .pre-commit-config.yaml     # Hook configuration
├── .accent-whitelist.txt       # Protected words
├── scripts/
│   └── fix-ptbr-accents.py     # Main script
├── tests/
│   ├── test_fix_ptbr_accents.py
│   └── fixtures/
│       └── sample-broken.tsx
└── requirements-dev.txt        # Python dependencies
```

## Considerações Futuras

- Estender para arquivos `.css` se necessário
- Adicionar modo interativo para casos ambíguos
- Integrar com editor (LSP) para correção em tempo real
