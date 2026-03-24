import { useSimulatedLoading as useSimulatedLoadingHook } from "@/hooks/use-simulated-loading"

const DEV_DELAY_MS = 800

/**
 * Development-only hook that simulates a loading delay.
 * In production builds, it resolves immediately (no delay).
 */
export function useSimulatedLoading(enabled = true): boolean {
  const { isLoading } = useSimulatedLoadingHook({
    developmentOnly: true,
    delayMs: DEV_DELAY_MS,
    autoStart: enabled,
  })
  return isLoading
}
