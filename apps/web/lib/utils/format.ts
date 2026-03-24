/**
 * Format a number as Brazilian Real currency.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

/**
 * Format file size in human-readable format.
 * Supports Bytes, KB, MB, GB with configurable precision.
 */

const KILOBYTE = 1024
const SIZE_UNITS = ["Bytes", "KB", "MB", "GB"] as const

export interface FormatFileSizeOptions {
  /** Decimal places, default 1 */
  precision?: number
  /** Label for 0 bytes, default "0 Bytes" */
  zeroLabel?: string
}

export function formatFileSize(
  bytes: number,
  options?: FormatFileSizeOptions
): string {
  const precision = options?.precision ?? 1
  const zeroLabel = options?.zeroLabel ?? "0 Bytes"

  if (bytes === 0) return zeroLabel

  const sizeIndex = Math.floor(Math.log(bytes) / Math.log(KILOBYTE))
  const value = bytes / Math.pow(KILOBYTE, sizeIndex)

  return `${parseFloat(value.toFixed(precision))} ${SIZE_UNITS[sizeIndex]}`
}
