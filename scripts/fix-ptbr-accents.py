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
