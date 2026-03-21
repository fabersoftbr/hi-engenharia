/**
 * Comunicacao Data Contract
 * Shared mock data and helpers for the Comunicacao module.
 * Consumed by mural, detail, and form components.
 */

/**
 * Category values for comunicados.
 */
export type ComunicadoCategory =
  | "geral"
  | "operacional"
  | "comercial"
  | "rh"
  | "ti"

/**
 * Period filter values for comunicados.
 */
export type ComunicadoPeriod = "all" | "today" | "week" | "month"

/**
 * Author of a comunicado.
 */
export interface ComunicadoAuthor {
  id: string
  name: string
  initials: string
}

/**
 * Full record for a comunicado.
 */
export interface Comunicado {
  id: string
  title: string
  summary: string
  content: string
  category: ComunicadoCategory
  author: ComunicadoAuthor
  publishedAt: string
  isDestaque: boolean
  isDraft: boolean
}

/**
 * Metadata for each category, including label and badge variant.
 */
export const COMUNICADO_CATEGORY_META: Record<
  ComunicadoCategory,
  {
    label: string
    variant: "default" | "secondary" | "outline" | "destructive"
    className?: string
  }
> = {
  geral: { label: "Geral", variant: "secondary" },
  operacional: { label: "Operacional", variant: "default" },
  comercial: { label: "Comercial", variant: "outline" },
  rh: {
    label: "RH",
    variant: "secondary",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
  ti: {
    label: "TI",
    variant: "secondary",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
}

/**
 * Seeded comunicado authors for the mock module.
 */
export const COMUNICADO_AUTHORS: ComunicadoAuthor[] = [
  { id: "author-1", name: "Carlos Silva", initials: "CS" },
  { id: "author-2", name: "Ana Santos", initials: "AS" },
  { id: "author-3", name: "Bruno Lima", initials: "BL" },
]

// Helper to get author by index (type-safe)
function getAuthor(index: number): ComunicadoAuthor {
  const author = COMUNICADO_AUTHORS[index]
  if (!author) {
    throw new Error(`Author at index ${index} not found`)
  }
  return author
}

/**
 * Seeded comunicado records for the mock module.
 * At least 2 must have isDestaque: true.
 * Mix all 5 categories.
 */
export const COMUNICADOS: Comunicado[] = [
  {
    id: "com-2026-001",
    title: "Novos procedimentos de seguranca",
    summary:
      "Implementamos novos procedimentos de seguranca para todas as obras. Todos os colaboradores devem seguir as orientacoes atualizadas para garantir a seguranca nos canteiros de obra.",
    content: `Prezados colaboradores,

Implementamos novos procedimentos de seguranca para todas as obras da Hi Engenharia. As mudancas entram em vigor a partir da proxima segunda-feira e devem ser seguidas por todos os colaboradores em campo.

Principais atualizacoes:
- Uso obrigatorio de EPI em todas as obras
- Novo checklist de seguranca diario
- Capacitacao sobre manuseio de equipamentos
- Procedimentos de emergencia atualizados

Contamos com a colaboracao de todos para manter um ambiente de trabalho seguro e saudavel.

Atenciosamente,
Equipe de Seguranca`,
    category: "operacional",
    author: getAuthor(0),
    publishedAt: "2026-03-20T10:00:00Z",
    isDestaque: true,
    isDraft: false,
  },
  {
    id: "com-2026-002",
    title: "Resultados do primeiro trimestre",
    summary:
      "Confira os metas alcancadas no primeiro trimestre de 2026. Superamos as expectativas em vendas e novos projetos, com destaque para a expansao da equipe comercial.",
    content: `Caros colaboradores,

Temos o orgulho de compartilhar os resultados do primeiro trimestre de 2026. A Hi Engenharia alcancou metas significativas em todas as areas:

Vendas:
- 45% acima da meta estabelecida
- 12 novos clientes conquistados
- Expansao para 3 novas regioes

Projetos:
- 8 obras entregues no prazo
- 15 novos projetos em andamento
- NPS (Net Promoter Score) de 92

Esses resultados so possiveis gracas ao dedicacao e esforco de toda a equipe. Vamos continuar trabalhando juntos para manter esse crescimento!

Parabens a todos pelo excelente trabalho.

Diretoria Comercial`,
    category: "comercial",
    author: COMUNICADO_AUTHORS[1],
    publishedAt: "2026-03-18T14:30:00Z",
    isDestaque: true,
    isDraft: false,
  },
  {
    id: "com-2026-003",
    title: "Atualizacao do sistema de gestao",
    summary:
      "Informamos que realizaremos uma atualizacao no sistema de gestao no proximo fim de semana. O sistema ficara indisponivel por algumas horas durante a madrugada.",
    content: `Prezados usuarios,

Informamos que realizaremos uma atualizacao importante no nosso sistema de gestao no proximo sábado, dia 22/03.

O sistema ficara indisponivel das 02:00 as 06:00 da manhca para realizacao da manutencao programada. Recomendamos que salvem qualquer trabalho em andamento antes desse horario.

Novidades da atualizacao:
- Melhoria na performance do sistema
- Correcao de bugs reportados
- Nova interface de relatorios
- Funcionalidades de exportacao de dados

Pedimos desculpas pelo inconveniente e agradecemos a compreensao.

Equipe de TI`,
    category: "ti",
    author: COMUNICADO_AUTHORS[2],
    publishedAt: "2026-03-17T09:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
  {
    id: "com-2026-004",
    title: "Politica de ferias 2026",
    summary:
      "Divulgamos a nova politica de ferias para 2026. Confiram o calendario e os procedimentos para solicitacao de ferias.",
    content: `Caros colaboradores,

Seguem as orientacoes para a politica de ferias de 2026:

Calendario:
- Ferias devem ser solicitadas com antecedencia minima de 30 dias
- Limite maximo de 15 dias consecutivos
- Preferencia para ferias em janeiro e julho

Procedimentos:
1. Acesse o portal do colaborador
2. Selecione "Solicitar Ferias"
3. Escolha as datas desejadas
4. Aguarde aprovacao do gestor

Qualquer duvida, entrem em contato com o RH.

Departamento de Recursos Humanos`,
    category: "rh",
    author: COMUNICADO_AUTHORS[0],
    publishedAt: "2026-03-15T11:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
  {
    id: "com-2026-005",
    title: "Treinamento de seguranca do trabalho",
    summary:
      "Lembramos que todos os colaboradores devem completar o treinamento de seguranca do trabalho ate o final do mes. O curso esta disponivel no portal.",
    content: `Prezados colaboradores,

Este e um lembrete de que todos os colaboradores devem completar o treinamento obrigatorio de seguranca do trabalho ate o dia 31/03.

O treinamento esta disponivel no Portal do Colaborador, na secao "Treinamentos". A duracao e de aproximadamente 2 horas e pode ser feito em etapas.

Apos a conclusao, o certificado estara disponivel para download. A nao conclusao do treinamento pode resultar em restricoes de acesso as obras.

Equipe de RH`,
    category: "rh",
    author: COMUNICADO_AUTHORS[0],
    publishedAt: "2026-03-12T09:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
  {
    id: "com-2026-006",
    title: "Novo parceiro de equipamentos",
    summary:
      "Anunciamos nossa nova parceria com SolarTech. Agora oferecemos equipamentos de ultima geracao com condicoes especiais de financiamento.",
    content: `Caros colaboradores,

Temos o prazer de anunciar nossa nova parceria estrategica com a SolarTech, lider no mercado de equipamentos fotovoltaicos.

Beneficios da parceria:
- Acesso a equipamentos de ultima geracao
- Precos competitivos
- Condicoes especiais de financiamento para clientes
- Suporte tecnico dedicado
- Garantia estendida de 5 anos

Essa parceria nos permite oferecer solucoes ainda mais completas para nossos clientes. A equipe comercial ja recebeu o material de apresentacao atualizado.

Diretoria Comercial`,
    category: "comercial",
    author: COMUNICADO_AUTHORS[1],
    publishedAt: "2026-03-10T16:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
  {
    id: "com-2026-007",
    title: "Manutencao preventiva dos veiculos",
    summary:
      "Comunicamos o cronograma de manutencao preventiva dos veiculos da frota para o proximo mes. Confiram quando seu veiculo esta agendado.",
    content: `Prezados colaboradores,

Segue o cronograma de manutencao preventiva dos veiculos da frota para abril/2026:

Semana 1 (01-07/04):
- Veiculo 1 (Placa ABC-1234)
- Veiculo 3 (Placa DEF-5678)

Semana 2 (08-14/04):
- Veiculo 2 (Placa GHI-9012)
- Veiculo 5 (Placa JKL-3456)

Semana 3 (15-21/04):
- Veiculo 4 (Placa MNO-7890)

Os colaboradores responsaveis pelos veiculos devem confirma a disponibilidade para a manutencao. Qualquer duvida, entrem em contato com a coordenacao.

Coordenacao Operacional`,
    category: "operacional",
    author: COMUNICADO_AUTHORS[2],
    publishedAt: "2026-03-08T08:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
  {
    id: "com-2026-008",
    title: "Boas-vindas aos novos colaboradores",
    summary:
      "Damos as boas-vindas aos novos colaboradores que se juntaram a equipe da Hi Engenharia neste mes. Bem-vindos ao time!",
    content: `Caros colaboradores,

Temos o prazer de dar as boas-vindas aos novos membros que se juntaram ao time da Hi Engenharia em marco de 2026:

Equipe Comercial:
- Fernanda Costa - Gerente Comercial Regional
- Ricardo Almeida - Executivo de Contas

Equipe Tecnica:
- Juliana Santos - Engenheira de Projetos
- Pedro Henrique - Tecnico de Instalacao

Equipe Operacional:
- Mariana Lima - Coordenadora de Obras

Pedimos a todos que recepcionem nossos novos colegas com calor. Estamos felizes em ter essas talentos ao nosso lado.

Diretoria`,
    category: "geral",
    author: COMUNICADO_AUTHORS[0],
    publishedAt: "2026-03-05T14:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
]

/**
 * Get all non-draft comunicados, sorted by destaque first, then by date descending.
 */
export function getComunicados(): Comunicado[] {
  return COMUNICADOS.filter((c) => !c.isDraft).sort((a, b) => {
    // Destaques first
    if (a.isDestaque !== b.isDestaque) {
      return a.isDestaque ? -1 : 1
    }
    // Then by date descending
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

/**
 * Get a single comunicado by ID.
 */
export function getComunicadoById(id: string): Comunicado | undefined {
  return COMUNICADOS.find((c) => c.id === id)
}

/**
 * Get category options for select/filter components.
 */
export function getComunicadoCategoryOptions(): Array<{
  value: string
  label: string
}> {
  return [
    { value: "all", label: "Todas as categorias" },
    ...Object.entries(COMUNICADO_CATEGORY_META).map(([value, meta]) => ({
      value,
      label: meta.label,
    })),
  ]
}

/**
 * Get period options for select/filter components.
 */
export function getComunicadoPeriodOptions(): Array<{
  value: ComunicadoPeriod
  label: string
}> {
  return [
    { value: "all", label: "Qualquer periodo" },
    { value: "today", label: "Hoje" },
    { value: "week", label: "Ultima semana" },
    { value: "month", label: "Ultimo mes" },
  ]
}

/**
 * Filter comunicados by category, period, and search query.
 * Always sorted by destaque first, then by date descending.
 */
export function filterComunicados(params: {
  category: string
  period: ComunicadoPeriod
  searchQuery: string
}): Comunicado[] {
  const allComunicados = getComunicados()

  return allComunicados.filter((c) => {
    // Category filter
    if (params.category !== "all" && c.category !== params.category) {
      return false
    }

    // Period filter
    if (params.period !== "all") {
      const publishedDate = new Date(c.publishedAt)
      const now = new Date()

      if (params.period === "today") {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        if (publishedDate < today) {
          return false
        }
      } else if (params.period === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        if (publishedDate < weekAgo) {
          return false
        }
      } else if (params.period === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        if (publishedDate < monthAgo) {
          return false
        }
      }
    }

    // Search filter
    if (params.searchQuery) {
      const query = params.searchQuery.toLowerCase()
      const matchesTitle = c.title.toLowerCase().includes(query)
      const matchesSummary = c.summary.toLowerCase().includes(query)
      if (!matchesTitle && !matchesSummary) {
        return false
      }
    }

    return true
  })
}
