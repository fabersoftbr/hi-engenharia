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

/**
 * Helper to get an author by index from the seeded authors array.
 * Throws an error if the index is out of bounds.
 */
function getAuthor(index: number): ComunicadoAuthor {
  const author = COMUNICADO_AUTHORS.at(index)
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
    title: "Novos procedimentos de segurança",
    summary:
      "Implementamos novos procedimentos de segurança para todas as obras. Todos os colaboradores devem seguir as orientações atualizadas para garantir a segurança nos canteiros de obra.",
    content: `Prezados colaboradores,

Implementamos novos procedimentos de segurança para todas as obras da HI Engenharia. As mudanças entram em vigor a partir da próxima segunda-feira e devem ser seguidas por todos os colaboradores em campo.

Principais atualizações:
- Uso obrigatório de EPI em todas as obras
- Novo checklist de segurança diario
- Capacitação sobre manuseio de equipamentos
- Procedimentos de emergência atualizados

Contamos com a colaboração de todos para manter um ambiente de trabalho seguro e saudável.

Aténciosamente,
Equipe de Segurança`,
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
      "Confira os metas alcançadas no primeiro trimestre de 2026. Superamos as expectativas em vendas e novos projetos, com destaque para a expansão da equipe comercial.",
    content: `Caros colaboradores,

Temos o orgulho de compartilhar os resultados do primeiro trimestre de 2026. A HI Engenharia alcançou metas significativas em todas as áreas:

Vendas:
- 45% acima da meta estabelecida
- 12 novos clientes conquistados
- Expansao para 3 novas regioes

Projetos:
- 8 obras entregues no prazo
- 15 novos projetos em andamento
- NPS (Net Promoter Score) de 92

Esses resultados so possiveis graças ao dedicação e esforço de toda a equipe. Vamos continuar trabalhando juntos para manter esse crescimento!

Parabéns a todos pelo excelente trabalho.

Diretoria Comercial`,
    category: "comercial",
    author: getAuthor(1),
    publishedAt: "2026-03-18T14:30:00Z",
    isDestaque: true,
    isDraft: false,
  },
  {
    id: "com-2026-003",
    title: "Atualização do sistema de gestão",
    summary:
      "Informamos que realizaremos uma atualização no sistema de gestão no próximo fim de semana. O sistema ficará indisponível por algumas horas durante a madrugada.",
    content: `Prezados usuários,

Informamos que realizaremos uma atualização importante no nosso sistema de gestão no próximo sábado, dia 22/03.

O sistema ficará indisponível das 02:00 às 06:00 da manhã para realização da manutenção programada. Recomendamos que salvem qualquer trabalho em andamento antes desse horário.

Novidades da atualização:
- Melhoria na performance do sistema
- Correcao de bugs reportados
- Nova interface de relatórios
- Funcionalidades de exportação de dados

Pedimos desculpas pelo inconveniente e agradecemos a compreensão.

Equipe de TI`,
    category: "ti",
    author: getAuthor(2),
    publishedAt: "2026-03-17T09:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
  {
    id: "com-2026-004",
    title: "Política de férias 2026",
    summary:
      "Divulgamos a nova política de férias para 2026. Confiram o calendário e os procedimentos para solicitação de férias.",
    content: `Caros colaboradores,

Seguem as orientações para a política de férias de 2026:

Calendario:
- Férias devem ser solicitadas com antecedência mínima de 30 dias
- Limite máximo de 15 dias consecutivos
- Preferência para férias em janeiro e julho

Procedimentos:
1. Acesse o portal do colaborador
2. Selecione "Solicitar Férias"
3. Escolha as datas desejadas
4. Aguarde aprovação do gestor

Qualquer dúvida, entrem em contato com o RH.

Departamento de Recursos Humanos`,
    category: "rh",
    author: getAuthor(0),
    publishedAt: "2026-03-15T11:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
  {
    id: "com-2026-005",
    title: "Treinamento de segurança do trabalho",
    summary:
      "Lembramos que todos os colaboradores devem completar o treinamento de segurança do trabalho até o final do mês. O curso está disponível no portal.",
    content: `Prezados colaboradores,

Este e um lembrete de que todos os colaboradores devem completar o treinamento obrigatório de segurança do trabalho ate o dia 31/03.

O treinamento esta disponível no Portal do Colaborador, na seção "Treinamentos". A duração e de apróximadamente 2 horas e pode ser feito em etapas.

Após a conclusão, o certificado estará disponível para download. A não conclusão do treinamento pode resultar em restrições de acesso às obras.

Equipe de RH`,
    category: "rh",
    author: getAuthor(0),
    publishedAt: "2026-03-12T09:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
  {
    id: "com-2026-006",
    title: "Novo parceiro de equipamentos",
    summary:
      "Anunciamos nossa nova parceria com SolarTech. Agora oferecemos equipamentos de última geração com condições especiais de financiamento.",
    content: `Caros colaboradores,

Temos o prazer de anunciar nossa nova parceria estratégica com a SolarTech, líder no mercado de equipamentos fotovoltaicos.

Beneficios da parceria:
- Acesso a equipamentos de última geração
- Preços competitivos
- Condicoes especiais de financiamento para clientes
- Suporte técnico dedicado
- Garantia estendida de 5 anos

Essa parceria nos permite oferecer soluções ainda mais completas para nossos clientes. 

Diretoria Comercial`,
    category: "comercial",
    author: getAuthor(1),
    publishedAt: "2026-03-10T16:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
  {
    id: "com-2026-007",
    title: "Manutenção preventiva dos veículos",
    summary:
      "Comunicamos o cronograma de manutenção preventiva dos veículos da frota para o próximo mês. Confiram quando seu veículo está agendado.",
    content: `Prezados colaboradores,

Segue o cronograma de manutenção preventiva dos veículos da frota para abril/2026:

Semana 1 (01-07/04):
- Veiculo 1 (Placa ABC-1234)
- Veiculo 3 (Placa DEF-5678)

Semana 2 (08-14/04):
- Veiculo 2 (Placa GHI-9012)
- Veiculo 5 (Placa JKL-3456)

Semana 3 (15-21/04):
- Veiculo 4 (Placa MNO-7890)

Os colaboradores responsáveis pelos veículos devem confirmar a disponibilidade para a manutenção. Qualquer dúvida, entrem em contato com a coordenação.

Coordenacao Operacional`,
    category: "operacional",
    author: getAuthor(2),
    publishedAt: "2026-03-08T08:00:00Z",
    isDestaque: false,
    isDraft: false,
  },
  {
    id: "com-2026-008",
    title: "Boas-vindas aos novos colaboradores",
    summary:
      "Damos as boas-vindas aos novos colaboradores que se juntaram à equipe da HI Engenharia neste mês. Bem-vindos ao time!",
    content: `Caros colaboradores,

Temos o prazer de dar as boas-vindas aos novos membros que se juntaram ao time da HI Engenharia em março de 2026:

Equipe Comercial:
- Fernanda Costa - Gerente Comercial Regional
- Ricardo Almeida - Executivo de Contas

Equipe Técnica:
- Juliana Santos - Engenheira de Projetos
- Pedro Henrique - Técnico de Instalação

Equipe Operacional:
- Mariana Lima - Coordenadora de Obras

Pedimos a todos que recepcionem nossos novos colegas com calor. Estamos felizes em ter essas talentos ao nosso lado.

Diretoria`,
    category: "geral",
    author: getAuthor(0),
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
    { value: "month", label: "Último mês" },
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
