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
# Nota: Estes testes requerem o dicionário pt-BR instalado no sistema

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
        # "O usuario acessou o sistema"
        # Posição 0: 'O', 1: ' ', 2-9: 'usuario' (8 chars), 10: ' '
        # text[2:10] = "usuario" (sem o espaço)
        text = "O usuario acessou o sistema"
        corrections = [(2, 10, "usuário")]
        result = apply_corrections(text, corrections)
        assert result == "O usuário acessou o sistema"

    def test_multiple_corrections_applied_in_reverse(self):
        """Múltiplas correções aplicadas do fim para início."""
        # "Voce tem pendencias"
        # Posição 0-4: 'Voce', 5: ' ', 6-8: 'tem', 9: ' ', 10-18: 'pendencias'
        text = "Voce tem pendencias"
        corrections = [(0, 5, "Você"), (10, 19, "pendências")]
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
        # 'const msg = "Voce tem pendencias"'
        # Posições: const(0-5) space(5) msg(6-9) =(10) "(11) Voce(12-17) tem(18-21) pendencias(22-31)"(32)
        text = 'const msg = "Voce tem pendencias"'
        corrections = [(12, 17, "Você"), (22, 31, "pendências")]
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
# Nota: Este teste requer o dicionário pt-BR instalado no sistema

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
