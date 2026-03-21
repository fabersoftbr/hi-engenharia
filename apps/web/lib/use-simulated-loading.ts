import { useState, useEffect } from "react"

const DEV_DELAY_MS = 800

/**
 * Development-only hook that simulates a loading delay.
 * In production builds, it resolves immediately (no delay).
 */
export function useSimulatedLoading(enabled = true): boolean {
  const [isLoading, setIsLoading] = useState(enabled)

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    const isDev = process.env.NODE_ENV === "development"
    if (!isDev) {
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => setIsLoading(false), DEV_DELAY_MS)
    return () => clearTimeout(timer)
  }, [enabled])

  return isLoading
}
