import { useState, useEffect } from "react"

interface UseSimulatedLoadingOptions {
  /** Whether this hook is enabled. Defaults to development mode only. */
  developmentOnly?: boolean
  /** Simulated delay in milliseconds. Defaults to 1500ms. */
  delayMs?: number
  /** Whether to trigger loading on mount. Defaults to true. */
  autoStart?: boolean
}

/**
 * Development-only hook that simulates a loading delay so skeleton
 * states can be visually verified during development.
 *
 * In production or when disabled, `isLoading` is always `false`.
 */
export function useSimulatedLoading({
  developmentOnly = true,
  delayMs = 1500,
  autoStart = true,
}: UseSimulatedLoadingOptions = {}) {
  const isDev = process.env.NODE_ENV === "development"
  const enabled = developmentOnly ? isDev : true

  const [isLoading, setIsLoading] = useState(enabled && autoStart)

  useEffect(() => {
    if (!enabled || !autoStart) return

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delayMs)

    return () => clearTimeout(timer)
  }, [enabled, delayMs, autoStart])

  const startLoading = () => {
    if (!enabled) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, delayMs)
  }

  return { isLoading, startLoading }
}
