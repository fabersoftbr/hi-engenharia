/**
 * Drive Data Contract
 * Shared mock data and helpers for the Drive module.
 * Consumed by folder list, file list, and navigation components.
 */

/**
 * Section types for Drive navigation tabs.
 */
export type DriveSection = "oportunidades" | "obras"

/**
 * File type classification for icons and display.
 */
export type FileType = "pdf" | "image" | "word" | "excel" | "other"

/**
 * File upload/download status.
 */
export type FileStatus = "ok" | "error"

/**
 * Author of a file upload.
 */
export interface DriveAuthor {
  id: string
  name: string
  initials: string
}

/**
 * File record in the Drive.
 */
export interface DriveFile {
  id: string
  name: string
  type: FileType
  size: number
  uploadedAt: string
  author: DriveAuthor
  folderId: string
  subfolderId: string | null
  status: FileStatus
}

/**
 * Subfolder within an entity folder.
 */
export interface DriveSubfolder {
  id: string
  name: string
  folderId: string
  fileCount: number
}

/**
 * Entity folder (Oportunidade or Obra).
 */
export interface DriveFolder {
  id: string
  name: string
  section: DriveSection
  entityId: string
  entityStatus: string
  entityResponsible: string
  createdAt: string
  fileCount: number
  subfolders: DriveSubfolder[]
  files: DriveFile[]
}

/**
 * Default subfolders created in each entity folder.
 */
export const DEFAULT_SUBFOLDERS = ["Contratos", "Projetos", "Fotos"] as const

/**
 * Labels for file types in Portuguese.
 */
export const FILE_TYPE_LABELS: Record<FileType, string> = {
  pdf: "PDF",
  image: "Imagem",
  word: "Word",
  excel: "Excel",
  other: "Outro",
}

/**
 * Seeded authors for mock file uploads.
 */
export const DRIVE_AUTHORS: DriveAuthor[] = [
  { id: "author-1", name: "Carlos Silva", initials: "CS" },
  { id: "author-2", name: "Ana Santos", initials: "AS" },
  { id: "author-3", name: "Bruno Lima", initials: "BL" },
]

/**
 * Helper to get an author by index from the seeded authors array.
 * Throws an error if the index is out of bounds.
 */
function getDriveAuthor(index: number): DriveAuthor {
  const author = DRIVE_AUTHORS.at(index)
  if (!author) {
    throw new Error(`Drive author at index ${index} not found`)
  }
  return author
}

/**
 * Seeded Drive folders with mock data.
 */
export const DRIVE_FOLDERS: DriveFolder[] = [
  // Oportunidades section (4 folders)
  {
    id: "folder-opp-001",
    name: "Oportunidade - Residêncial Solar",
    section: "oportunidades",
    entityId: "opp-2026-001",
    entityStatus: "Em andamento",
    entityResponsible: "Carlos Silva",
    createdAt: "2025-01-10",
    fileCount: 5,
    subfolders: [
      {
        id: "sf-001-1",
        name: "Contratos",
        folderId: "folder-opp-001",
        fileCount: 1,
      },
      {
        id: "sf-001-2",
        name: "Projetos",
        folderId: "folder-opp-001",
        fileCount: 2,
      },
      {
        id: "sf-001-3",
        name: "Fotos",
        folderId: "folder-opp-001",
        fileCount: 2,
      },
    ],
    files: [],
  },
  {
    id: "folder-opp-002",
    name: "Oportunidade - Comércio XYZ",
    section: "oportunidades",
    entityId: "opp-2026-002",
    entityStatus: "Aguardando",
    entityResponsible: "Ana Santos",
    createdAt: "2025-01-12",
    fileCount: 3,
    subfolders: [
      {
        id: "sf-002-1",
        name: "Contratos",
        folderId: "folder-opp-002",
        fileCount: 0,
      },
      {
        id: "sf-002-2",
        name: "Projetos",
        folderId: "folder-opp-002",
        fileCount: 1,
      },
      {
        id: "sf-002-3",
        name: "Fotos",
        folderId: "folder-opp-002",
        fileCount: 2,
      },
    ],
    files: [],
  },
  {
    id: "folder-opp-003",
    name: "Oportunidade - Condomínio Jardim Verde",
    section: "oportunidades",
    entityId: "opp-2026-004",
    entityStatus: "Em andamento",
    entityResponsible: "Bruno Lima",
    createdAt: "2025-01-15",
    fileCount: 4,
    subfolders: [
      {
        id: "sf-003-1",
        name: "Contratos",
        folderId: "folder-opp-003",
        fileCount: 2,
      },
      {
        id: "sf-003-2",
        name: "Projetos",
        folderId: "folder-opp-003",
        fileCount: 1,
      },
      {
        id: "sf-003-3",
        name: "Fotos",
        folderId: "folder-opp-003",
        fileCount: 1,
      },
    ],
    files: [],
  },
  {
    id: "folder-opp-004",
    name: "Oportunidade - Fazenda Solar Interior",
    section: "oportunidades",
    entityId: "opp-2026-003",
    entityStatus: "Concluído",
    entityResponsible: "Carlos Silva",
    createdAt: "2025-01-08",
    fileCount: 6,
    subfolders: [
      {
        id: "sf-004-1",
        name: "Contratos",
        folderId: "folder-opp-004",
        fileCount: 3,
      },
      {
        id: "sf-004-2",
        name: "Projetos",
        folderId: "folder-opp-004",
        fileCount: 2,
      },
      {
        id: "sf-004-3",
        name: "Fotos",
        folderId: "folder-opp-004",
        fileCount: 1,
      },
    ],
    files: [],
  },
  // Obras section (3 folders)
  {
    id: "folder-obra-001",
    name: "Obra - Residência Medeiros",
    section: "obras",
    entityId: "obra-2026-001",
    entityStatus: "Em andamento",
    entityResponsible: "Carlos Silva",
    createdAt: "2025-02-01",
    fileCount: 8,
    subfolders: [
      {
        id: "sf-005-1",
        name: "Contratos",
        folderId: "folder-obra-001",
        fileCount: 2,
      },
      {
        id: "sf-005-2",
        name: "Projetos",
        folderId: "folder-obra-001",
        fileCount: 3,
      },
      {
        id: "sf-005-3",
        name: "Fotos",
        folderId: "folder-obra-001",
        fileCount: 3,
      },
    ],
    files: [],
  },
  {
    id: "folder-obra-002",
    name: "Obra - Shopping Center Plaza",
    section: "obras",
    entityId: "obra-2026-002",
    entityStatus: "Em andamento",
    entityResponsible: "Ana Santos",
    createdAt: "2025-02-10",
    fileCount: 4,
    subfolders: [
      {
        id: "sf-006-1",
        name: "Contratos",
        folderId: "folder-obra-002",
        fileCount: 1,
      },
      {
        id: "sf-006-2",
        name: "Projetos",
        folderId: "folder-obra-002",
        fileCount: 2,
      },
      {
        id: "sf-006-3",
        name: "Fotos",
        folderId: "folder-obra-002",
        fileCount: 1,
      },
    ],
    files: [],
  },
  {
    id: "folder-obra-003",
    name: "Obra - Condomínio Verde",
    section: "obras",
    entityId: "obra-2026-003",
    entityStatus: "Concluído",
    entityResponsible: "Bruno Lima",
    createdAt: "2025-01-20",
    fileCount: 7,
    subfolders: [
      {
        id: "sf-007-1",
        name: "Contratos",
        folderId: "folder-obra-003",
        fileCount: 3,
      },
      {
        id: "sf-007-2",
        name: "Projetos",
        folderId: "folder-obra-003",
        fileCount: 2,
      },
      {
        id: "sf-007-3",
        name: "Fotos",
        folderId: "folder-obra-003",
        fileCount: 2,
      },
    ],
    files: [],
  },
]

/**
 * Seeded Drive files with mock data (15+ files across folders).
 */
export const DRIVE_FILES: DriveFile[] = [
  // folder-opp-001 files
  {
    id: "file-001",
    name: "proposta_inicial.pdf",
    type: "pdf",
    size: 245000,
    uploadedAt: "2025-01-10",
    author: getDriveAuthor(0),
    folderId: "folder-opp-001",
    subfolderId: "sf-001-1",
    status: "ok",
  },
  {
    id: "file-002",
    name: "planta_telhado.pdf",
    type: "pdf",
    size: 1200000,
    uploadedAt: "2025-01-11",
    author: getDriveAuthor(1),
    folderId: "folder-opp-001",
    subfolderId: "sf-001-2",
    status: "ok",
  },
  {
    id: "file-003",
    name: "diagrama_eletrico.xlsx",
    type: "excel",
    size: 89000,
    uploadedAt: "2025-01-12",
    author: getDriveAuthor(0),
    folderId: "folder-opp-001",
    subfolderId: "sf-001-2",
    status: "ok",
  },
  {
    id: "file-004",
    name: "foto_fachada.jpg",
    type: "image",
    size: 2500000,
    uploadedAt: "2025-01-13",
    author: getDriveAuthor(2),
    folderId: "folder-opp-001",
    subfolderId: "sf-001-3",
    status: "ok",
  },
  {
    id: "file-005",
    name: "foto_telhado_01.jpg",
    type: "image",
    size: 3100000,
    uploadedAt: "2025-01-13",
    author: getDriveAuthor(2),
    folderId: "folder-opp-001",
    subfolderId: "sf-001-3",
    status: "ok",
  },
  // folder-opp-002 files
  {
    id: "file-006",
    name: "memorial_descritivo.docx",
    type: "word",
    size: 156000,
    uploadedAt: "2025-01-14",
    author: getDriveAuthor(1),
    folderId: "folder-opp-002",
    subfolderId: "sf-002-2",
    status: "ok",
  },
  {
    id: "file-007",
    name: "visita_tecnica_01.jpg",
    type: "image",
    size: 1800000,
    uploadedAt: "2025-01-15",
    author: getDriveAuthor(1),
    folderId: "folder-opp-002",
    subfolderId: "sf-002-3",
    status: "ok",
  },
  {
    id: "file-008",
    name: "visita_tecnica_02.jpg",
    type: "image",
    size: 2100000,
    uploadedAt: "2025-01-15",
    author: getDriveAuthor(1),
    folderId: "folder-opp-002",
    subfolderId: "sf-002-3",
    status: "ok",
  },
  // folder-opp-003 files
  {
    id: "file-009",
    name: "contrato_padrao.pdf",
    type: "pdf",
    size: 320000,
    uploadedAt: "2025-01-16",
    author: getDriveAuthor(2),
    folderId: "folder-opp-003",
    subfolderId: "sf-003-1",
    status: "ok",
  },
  {
    id: "file-010",
    name: "aditivo_01.pdf",
    type: "pdf",
    size: 180000,
    uploadedAt: "2025-01-17",
    author: getDriveAuthor(2),
    folderId: "folder-opp-003",
    subfolderId: "sf-003-1",
    status: "ok",
  },
  // folder-opp-004 files
  {
    id: "file-011",
    name: "orcamento_detalhado.xlsx",
    type: "excel",
    size: 45000,
    uploadedAt: "2025-01-18",
    author: getDriveAuthor(0),
    folderId: "folder-opp-004",
    subfolderId: "sf-004-2",
    status: "ok",
  },
  {
    id: "file-012",
    name: "cronograma.xlsx",
    type: "excel",
    size: 38000,
    uploadedAt: "2025-01-18",
    author: getDriveAuthor(0),
    folderId: "folder-opp-004",
    subfolderId: "sf-004-2",
    status: "ok",
  },
  // folder-obra-001 files
  {
    id: "file-013",
    name: "registro_instalacao_01.jpg",
    type: "image",
    size: 4500000,
    uploadedAt: "2025-02-01",
    author: getDriveAuthor(0),
    folderId: "folder-obra-001",
    subfolderId: "sf-005-3",
    status: "ok",
  },
  {
    id: "file-014",
    name: "art_projeto.pdf",
    type: "pdf",
    size: 560000,
    uploadedAt: "2025-02-02",
    author: getDriveAuthor(0),
    folderId: "folder-obra-001",
    subfolderId: "sf-005-2",
    status: "ok",
  },
  {
    id: "file-015",
    name: "nota_fiscal_001.pdf",
    type: "pdf",
    size: 78000,
    uploadedAt: "2025-02-03",
    author: getDriveAuthor(1),
    folderId: "folder-obra-001",
    subfolderId: null,
    status: "ok",
  },
  // folder-obra-002 files
  {
    id: "file-016",
    name: "plano_trabalho.docx",
    type: "word",
    size: 92000,
    uploadedAt: "2025-02-10",
    author: getDriveAuthor(1),
    folderId: "folder-obra-002",
    subfolderId: "sf-006-2",
    status: "ok",
  },
  // folder-obra-003 files
  {
    id: "file-017",
    name: "certificado_garantia.pdf",
    type: "pdf",
    size: 125000,
    uploadedAt: "2025-02-15",
    author: getDriveAuthor(2),
    folderId: "folder-obra-003",
    subfolderId: "sf-007-1",
    status: "ok",
  },
]

/**
 * Get folders filtered by section, sorted alphabetically by name.
 */
export function getDriveFolders(section: DriveSection): DriveFolder[] {
  return DRIVE_FOLDERS.filter((folder) => folder.section === section).sort(
    (a, b) => a.name.localeCompare(b.name)
  )
}

/**
 * Get a single folder by ID.
 */
export function getDriveFolderById(folderId: string): DriveFolder | undefined {
  return DRIVE_FOLDERS.find((folder) => folder.id === folderId)
}

/**
 * Get files in a folder, optionally filtered by subfolder.
 */
export function getFilesInFolder(
  folderId: string,
  subfolderId?: string | null
): DriveFile[] {
  return DRIVE_FILES.filter((file) => {
    if (file.folderId !== folderId) return false
    if (subfolderId === undefined) return true
    return file.subfolderId === subfolderId
  }).sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
}

/**
 * Format file size in human-readable format.
 * Returns values like "2.4 MB" or "156.0 KB".
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Search result with file and its parent folder.
 */
export interface DriveSearchResult {
  folders: DriveFolder[]
  filesWithFolder: Array<{ file: DriveFile; folder: DriveFolder }>
}

/**
 * Search folders and files by query string.
 */
export function searchDrive(
  query: string,
  section: DriveSection
): DriveSearchResult {
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) {
    return { folders: [], filesWithFolder: [] }
  }

  const sectionFolders = getDriveFolders(section)

  const matchingFolders = sectionFolders.filter((folder) =>
    folder.name.toLowerCase().includes(normalizedQuery)
  )

  const matchingFiles = DRIVE_FILES.filter((file) => {
    if (!sectionFolders.find((f) => f.id === file.folderId)) return false
    return file.name.toLowerCase().includes(normalizedQuery)
  })

  const filesWithFolder = matchingFiles.map((file) => ({
    file,
    folder: sectionFolders.find((f) => f.id === file.folderId)!,
  }))

  return {
    folders: matchingFolders,
    filesWithFolder,
  }
}
