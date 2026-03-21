/**
 * Price Table Data Contract
 * Shared mock data and helpers for the price table module.
 * Consumed by price table workspace and proposal builder.
 */

/**
 * Region labels for the price table.
 */
export type PriceRegionLabel = "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul"

/**
 * Consumption band labels for the price table.
 */
export type PriceConsumptionBandLabel =
  | "Ate 100 kWh"
  | "101-200 kWh"
  | "201-500 kWh"
  | "501-1000 kWh"
  | "Acima de 1000 kWh"

/**
 * Region data structure.
 */
export interface PriceRegion {
  id: string
  label: PriceRegionLabel
}

/**
 * Consumption band data structure.
 */
export interface PriceConsumptionBand {
  id: string
  label: PriceConsumptionBandLabel
}

/**
 * Pricing data for a specific region and consumption band combination.
 */
export interface PriceItemPricing {
  regionId: string
  consumptionBandId: string
  unitPrice: number
  conditions: string
}

/**
 * Full price table item with nested pricing data.
 */
export interface PriceTableItem {
  id: string
  code: string
  item: string
  description: string
  observations: string
  pricing: PriceItemPricing[]
}

/**
 * Available regions for filtering.
 */
export const PRICE_REGIONS: PriceRegion[] = [
  { id: "norte", label: "Norte" },
  { id: "nordeste", label: "Nordeste" },
  { id: "centro-oeste", label: "Centro-Oeste" },
  { id: "sudeste", label: "Sudeste" },
  { id: "sul", label: "Sul" },
]

/**
 * Available consumption bands for filtering.
 */
export const PRICE_CONSUMPTION_BANDS: PriceConsumptionBand[] = [
  { id: "ate-100", label: "Ate 100 kWh" },
  { id: "101-200", label: "101-200 kWh" },
  { id: "201-500", label: "201-500 kWh" },
  { id: "501-1000", label: "501-1000 kWh" },
  { id: "acima-1000", label: "Acima de 1000 kWh" },
]

/**
 * Seeded price table items with nested pricing data.
 * Each item contains pricing data for all region/band combinations.
 */
export const PRICE_TABLE_ITEMS: PriceTableItem[] = [
  {
    id: "pti-001",
    code: "SOL-RES-550W",
    item: "Modulo solar 550W residencial",
    description:
      "Modulo fotovoltaico monocristalino de 550W com eficiencia de 21.5%. Ideal para instalacoes residenciais com espaco limitado. Certificacao INMETRO.",
    observations:
      "Garantia de 25 anos de performance. Dimensoes: 2278x1134x35mm. Peso: 28.5kg.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 1350, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 1320, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 1290, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 1260, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 1230, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 1340, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 1310, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 1280, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 1250, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 1220, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 1330, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 1300, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 1270, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 1240, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 1210, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 1320, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 1290, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 1260, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 1230, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 1200, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 1335, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 1305, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 1275, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 1245, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 1215, conditions: "Preco por modulo. Lote minimo: 10 unidades." },
    ],
  },
  {
    id: "pti-002",
    code: "SOL-IND-580W",
    item: "Modulo solar 580W industrial",
    description:
      "Modulo fotovoltaico bifacial de 580W com eficiencia de 22.1%. Projetado para instalacoes industriais de grande porte. Maior captacao de luz pela parte traseira.",
    observations:
      "Garantia de 30 anos de performance. Dimensoes: 2384x1303x30mm. Peso: 33.5kg.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 1650, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 1620, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 1590, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 1560, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 1530, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 1640, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 1610, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 1580, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 1550, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 1520, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 1630, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 1600, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 1570, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 1540, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 1510, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 1620, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 1590, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 1560, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 1530, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 1500, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 1635, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 1605, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 1575, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 1545, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 1515, conditions: "Preco por modulo. Lote minimo: 50 unidades." },
    ],
  },
  {
    id: "pti-003",
    code: "INV-RES-10KW",
    item: "Inversor solar 10kW residencial",
    description:
      "Inversor string trifasico de 10kW com eficiencia de 98.5%. Interface WiFi integrada para monitoramento. Protecao IP65.",
    observations:
      "Garantia de 10 anos. Extensivel para 15 anos. Dimensoes: 475x395x165mm. Peso: 15kg.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 9200, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 9000, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 8800, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 8600, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 8400, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 9100, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 8900, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 8700, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 8500, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 8300, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 9050, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 8850, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 8650, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 8450, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 8250, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 8900, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 8700, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 8500, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 8300, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 8100, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 9000, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 8800, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 8600, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 8400, conditions: "Preco unitario. Inclui instalacao basica." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 8200, conditions: "Preco unitario. Inclui instalacao basica." },
    ],
  },
  {
    id: "pti-004",
    code: "INV-IND-100KW",
    item: "Inversor central 100kW industrial",
    description:
      "Inversor central trifasico de 100kW com eficiencia de 98.8%. Monitoramento avancado e protecoes integradas. Ideal para parques solares.",
    observations:
      "Garantia de 12 anos. Extensivel para 20 anos. Dimensoes: 1020x660x260mm. Peso: 85kg.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 52000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 51000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 50000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 49000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 48000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 51500, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 50500, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 49500, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 48500, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 47500, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 51000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 50000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 49000, conditions: "Preco unitario. Suporte tecnico inclusso." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 48000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 47000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 50000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 49000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 48000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 47000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 46000, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 50500, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 49500, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 48500, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 47500, conditions: "Preco unitario. Suporte tecnico incluso." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 46500, conditions: "Preco unitario. Suporte tecnico incluso." },
    ],
  },
  {
    id: "pti-005",
    code: "EST-RES-TLF",
    item: "Estrutura telhado fibrocimento",
    description:
      "Estrutura de aluminio anodizado para fixacao de modulos em telhados de fibrocimento. Inclui parafusos e acessorios de fixacao.",
    observations:
      "Garantia de 15 anos contra corrosao. Carga maxima: 200kg/m2. Acompanha manual de instalacao.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 180, conditions: "Preco por modulo. Kit completo." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 175, conditions: "Preco por modulo. Kit completo." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 170, conditions: "Preco por modulo. Kit completo." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 165, conditions: "Preco por modulo. Kit completo." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 160, conditions: "Preco por modulo. Kit completo." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 178, conditions: "Preco por modulo. Kit completo." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 173, conditions: "Preco por modulo. Kit completo." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 168, conditions: "Preco por modulo. Kit completo." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 163, conditions: "Preco por modulo. Kit completo." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 158, conditions: "Preco por modulo. Kit completo." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 176, conditions: "Preco por modulo. Kit completo." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 171, conditions: "Preco por modulo. Kit completo." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 166, conditions: "Preco por modulo. Kit completo." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 161, conditions: "Preco por modulo. Kit completo." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 156, conditions: "Preco por modulo. Kit completo." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 175, conditions: "Preco por modulo. Kit completo." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 170, conditions: "Preco por modulo. Kit completo." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 165, conditions: "Preco por modulo. Kit completo." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 160, conditions: "Preco por modulo. Kit completo." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 155, conditions: "Preco por modulo. Kit completo." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 177, conditions: "Preco por modulo. Kit completo." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 172, conditions: "Preco por modulo. Kit completo." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 167, conditions: "Preco por modulo. Kit completo." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 162, conditions: "Preco por modulo. Kit completo." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 157, conditions: "Preco por modulo. Kit completo." },
    ],
  },
  {
    id: "pti-006",
    code: "EST-IND-SOLO",
    item: "Estrutura solo industrial",
    description:
      "Estrutura galvanizada a fogo para instalacao em solo. Projetada para grandes parques solares. Inclui fundacoes e fixacoes.",
    observations:
      "Garantia de 25 anos. Resistente a ventos de ate 180km/h. Projeto estrutural incluso.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 320, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 315, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 310, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 305, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 300, conditions: "Preco por modulo. Projeto inclusso." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 315, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 310, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 305, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 300, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 295, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 310, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 305, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 300, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 295, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 290, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 305, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 300, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 295, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 290, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 285, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 312, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 307, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 302, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 297, conditions: "Preco por modulo. Projeto incluso." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 292, conditions: "Preco por modulo. Projeto incluso." },
    ],
  },
  {
    id: "pti-007",
    code: "MIC-INV-300W",
    item: "Microinversor 300W",
    description:
      "Microinversor de 300W para instalacoes modulares. Ideal para telhados com sombreamento parcial. Monitoramento individual por modulo.",
    observations:
      "Garantia de 25 anos. Certificacao UL/INMETRO. Facil instalacao plug-and-play.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 950, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 930, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 910, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 890, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 870, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 940, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 920, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 900, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 880, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 860, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 935, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 915, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 895, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 875, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 855, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 925, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 905, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 885, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 865, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 845, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 938, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 918, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 898, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 878, conditions: "Preco unitario. Cabos inclusos." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 858, conditions: "Preco unitario. Cabos inclusos." },
    ],
  },
  {
    id: "pti-008",
    code: "BAT-LIT-10KWH",
    item: "Bateria litio 10kWh",
    description:
      "Bateria de ion-litio com capacidade de 10kWh. Sistema BMS integrado para protecao e monitoramento. Ideal para backup residencial.",
    observations:
      "Garantia de 10 anos ou 6000 ciclos. Ciclagem: 90% DOD. Comunicacao CAN/RS485.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 24000, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 23500, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 23000, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 22500, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 22000, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 23800, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 23300, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 22800, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 22300, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 21800, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 23600, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 23100, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 22600, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 22100, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 21600, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 23200, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 22700, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 22200, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 21700, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 21200, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 23500, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 23000, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 22500, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 22000, conditions: "Preco unitario. Instalacao nao inclusa." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 21500, conditions: "Preco unitario. Instalacao nao inclusa." },
    ],
  },
  {
    id: "pti-009",
    code: "CAB-DC-6MM",
    item: "Cabos DC 6mm (100m)",
    description:
      "Cabos solares DC de 6mm de diametro. Dupla isolacao resistente a UV e intemperies. Certificacao TUV.",
    observations:
      "Temperatura de operacao: -40C a +90C. Vida util: 25 anos. Cor: vermelho e preto.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 520, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 510, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 500, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 490, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 480, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 515, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 505, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 495, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 485, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 475, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 510, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 500, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 490, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 480, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 470, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 500, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 490, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 480, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 470, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 460, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 508, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 498, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 488, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 478, conditions: "Rolo de 100m. Par vermelho/preto." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 468, conditions: "Rolo de 100m. Par vermelho/preto." },
    ],
  },
  {
    id: "pti-010",
    code: "SER-INS-RES",
    item: "Servico instalacao residencial",
    description:
      "Servico completo de instalacao residencial com equipe tecnica certificada. Inclui comissionamento e treinamento do cliente.",
    observations:
      "Prazo medio: 2-3 dias. Documentacao tecnica e ART inclusas. Garantia de 5 anos na mao de obra.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 5000, conditions: "Por sistema. Até 5kW." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 4800, conditions: "Por sistema. Até 5kW." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 4600, conditions: "Por sistema. Até 5kW." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 4400, conditions: "Por sistema. Até 5kW." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 4200, conditions: "Por sistema. Até 5kW." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 4900, conditions: "Por sistema. Até 5kW." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 4700, conditions: "Por sistema. Até 5kW." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 4500, conditions: "Por sistema. Até 5kW." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 4300, conditions: "Por sistema. Até 5kW." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 4100, conditions: "Por sistema. Até 5kW." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 4850, conditions: "Por sistema. Até 5kW." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 4650, conditions: "Por sistema. Até 5kW." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 4450, conditions: "Por sistema. Até 5kW." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 4250, conditions: "Por sistema. Até 5kW." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 4050, conditions: "Por sistema. Até 5kW." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 4750, conditions: "Por sistema. Até 5kW." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 4550, conditions: "Por sistema. Até 5kW." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 4350, conditions: "Por sistema. Até 5kW." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 4150, conditions: "Por sistema. Até 5kW." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 3950, conditions: "Por sistema. Até 5kW." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 4825, conditions: "Por sistema. Até 5kW." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 4625, conditions: "Por sistema. Até 5kW." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 4425, conditions: "Por sistema. Até 5kW." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 4225, conditions: "Por sistema. Até 5kW." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 4025, conditions: "Por sistema. Até 5kW." },
    ],
  },
  {
    id: "pti-011",
    code: "SER-INS-IND",
    item: "Servico instalacao industrial",
    description:
      "Servico completo de instalacao industrial com equipe especializada. Inclui projeto executivo, comissionamento e treinamento.",
    observations:
      "Prazo medio: 15-45 dias conforme porte. NR-10 e NR-12 aplicadas. Garantia de 5 anos na mao de obra.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 25000, conditions: "Valor base. Sob orcamento." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 24000, conditions: "Valor base. Sob orcamento." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 23000, conditions: "Valor base. Sob orcamento." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 22000, conditions: "Valor base. Sob orcamento." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 21000, conditions: "Valor base. Sob orcamento." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 24500, conditions: "Valor base. Sob orcamento." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 23500, conditions: "Valor base. Sob orcamento." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 22500, conditions: "Valor base. Sob orcamento." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 21500, conditions: "Valor base. Sob orcamento." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 20500, conditions: "Valor base. Sob orcamento." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 24250, conditions: "Valor base. Sob orcamento." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 23250, conditions: "Valor base. Sob orcamento." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 22250, conditions: "Valor base. Sob orcamento." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 21250, conditions: "Valor base. Sob orcamento." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 20250, conditions: "Valor base. Sob orcamento." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 23500, conditions: "Valor base. Sob orcamento." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 22500, conditions: "Valor base. Sob orcamento." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 21500, conditions: "Valor base. Sob orcamento." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 20500, conditions: "Valor base. Sob orcamento." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 19500, conditions: "Valor base. Sob orcamento." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 24000, conditions: "Valor base. Sob orcamento." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 23000, conditions: "Valor base. Sob orcamento." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 22000, conditions: "Valor base. Sob orcamento." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 21000, conditions: "Valor base. Sob orcamento." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 20000, conditions: "Valor base. Sob orcamento." },
    ],
  },
  {
    id: "pti-012",
    code: "MON-REMOTO",
    item: "Sistema monitoramento remoto",
    description:
      "Plataforma de monitoramento remoto com dashboard em tempo real. Alertas automaticos e relatorios de desempenho.",
    observations:
      "Licenca anual inclusa. App mobile disponivel. Suporte tecnico 24/7.",
    pricing: [
      { regionId: "norte", consumptionBandId: "ate-100", unitPrice: 1500, conditions: "Licenca anual. Até 10kW." },
      { regionId: "norte", consumptionBandId: "101-200", unitPrice: 1450, conditions: "Licenca anual. Até 10kW." },
      { regionId: "norte", consumptionBandId: "201-500", unitPrice: 1400, conditions: "Licenca anual. Até 10kW." },
      { regionId: "norte", consumptionBandId: "501-1000", unitPrice: 1350, conditions: "Licenca anual. Até 10kW." },
      { regionId: "norte", consumptionBandId: "acima-1000", unitPrice: 1300, conditions: "Licenca anual. Até 10kW." },
      { regionId: "nordeste", consumptionBandId: "ate-100", unitPrice: 1480, conditions: "Licenca anual. Até 10kW." },
      { regionId: "nordeste", consumptionBandId: "101-200", unitPrice: 1430, conditions: "Licenca anual. Até 10kW." },
      { regionId: "nordeste", consumptionBandId: "201-500", unitPrice: 1380, conditions: "Licenca anual. Até 10kW." },
      { regionId: "nordeste", consumptionBandId: "501-1000", unitPrice: 1330, conditions: "Licenca anual. Até 10kW." },
      { regionId: "nordeste", consumptionBandId: "acima-1000", unitPrice: 1280, conditions: "Licenca anual. Até 10kW." },
      { regionId: "centro-oeste", consumptionBandId: "ate-100", unitPrice: 1465, conditions: "Licenca anual. Até 10kW." },
      { regionId: "centro-oeste", consumptionBandId: "101-200", unitPrice: 1415, conditions: "Licenca anual. Até 10kW." },
      { regionId: "centro-oeste", consumptionBandId: "201-500", unitPrice: 1365, conditions: "Licenca anual. Até 10kW." },
      { regionId: "centro-oeste", consumptionBandId: "501-1000", unitPrice: 1315, conditions: "Licenca anual. Até 10kW." },
      { regionId: "centro-oeste", consumptionBandId: "acima-1000", unitPrice: 1265, conditions: "Licenca anual. Até 10kW." },
      { regionId: "sudeste", consumptionBandId: "ate-100", unitPrice: 1420, conditions: "Licenca anual. Até 10kW." },
      { regionId: "sudeste", consumptionBandId: "101-200", unitPrice: 1370, conditions: "Licenca anual. Até 10kW." },
      { regionId: "sudeste", consumptionBandId: "201-500", unitPrice: 1320, conditions: "Licenca anual. Até 10kW." },
      { regionId: "sudeste", consumptionBandId: "501-1000", unitPrice: 1270, conditions: "Licenca anual. Até 10kW." },
      { regionId: "sudeste", consumptionBandId: "acima-1000", unitPrice: 1220, conditions: "Licenca anual. Até 10kW." },
      { regionId: "sul", consumptionBandId: "ate-100", unitPrice: 1450, conditions: "Licenca anual. Até 10kW." },
      { regionId: "sul", consumptionBandId: "101-200", unitPrice: 1400, conditions: "Licenca anual. Até 10kW." },
      { regionId: "sul", consumptionBandId: "201-500", unitPrice: 1350, conditions: "Licenca anual. Até 10kW." },
      { regionId: "sul", consumptionBandId: "501-1000", unitPrice: 1300, conditions: "Licenca anual. Até 10kW." },
      { regionId: "sul", consumptionBandId: "acima-1000", unitPrice: 1250, conditions: "Licenca anual. Até 10kW." },
    ],
  },
]

/**
 * Flattened price table row for display.
 */
export interface PriceTableRow {
  id: string
  itemId: string
  code: string
  item: string
  region: string
  consumptionBand: string
  unitPrice: number
  conditions: string
}

/**
 * Get region options for select/filter components.
 */
export function getPriceRegionOptions(): Array<{ value: string; label: string }> {
  return [
    { value: "all", label: "Todas as regioes" },
    ...PRICE_REGIONS.map((region) => ({
      value: region.id,
      label: region.label,
    })),
  ]
}

/**
 * Get consumption band options for select/filter components.
 */
export function getPriceConsumptionBandOptions(): Array<{ value: string; label: string }> {
  return [
    { value: "all", label: "Todas as faixas" },
    ...PRICE_CONSUMPTION_BANDS.map((band) => ({
      value: band.id,
      label: band.label,
    })),
  ]
}

/**
 * Filter input for price table.
 */
export interface PriceTableFilterInput {
  regionId: string
  consumptionBandId: string
}

/**
 * Get flattened price table rows based on filters.
 */
export function getPriceTableRows(filters: PriceTableFilterInput): PriceTableRow[] {
  const rows: PriceTableRow[] = []

  for (const item of PRICE_TABLE_ITEMS) {
    for (const pricing of item.pricing) {
      // Apply region filter
      if (filters.regionId !== "all" && pricing.regionId !== filters.regionId) {
        continue
      }

      // Apply consumption band filter
      if (filters.consumptionBandId !== "all" && pricing.consumptionBandId !== filters.consumptionBandId) {
        continue
      }

      const region = PRICE_REGIONS.find((r) => r.id === pricing.regionId)
      const band = PRICE_CONSUMPTION_BANDS.find((b) => b.id === pricing.consumptionBandId)

      rows.push({
        id: `${item.id}-${pricing.regionId}-${pricing.consumptionBandId}`,
        itemId: item.id,
        code: item.code,
        item: item.item,
        region: region?.label ?? pricing.regionId,
        consumptionBand: band?.label ?? pricing.consumptionBandId,
        unitPrice: pricing.unitPrice,
        conditions: pricing.conditions,
      })
    }
  }

  return rows
}

/**
 * Get a single price table item by ID with full details.
 */
export function getPriceItemById(itemId: string): PriceTableItem | undefined {
  return PRICE_TABLE_ITEMS.find((item) => item.id === itemId)
}

/**
 * Format currency value in BRL.
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}
