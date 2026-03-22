"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import { type ProfileKey, PROFILE_LABELS } from "@/lib/platform-config"

/** Storage key for active profile persistence in localStorage. */
const ACTIVE_PROFILE_STORAGE_KEY = "hi-active-profile"

/** Valid profile keys for validation. */
const VALID_PROFILES: ProfileKey[] = [
  "admin",
  "commercial",
  "partner",
  "operations",
  "cliente",
]

/** Context type for the platform shell state. */
interface PlatformShellContextType {
  /** Currently active user profile. */
  activeProfile: ProfileKey
  /** Updates the active profile. */
  setActiveProfile: (profile: ProfileKey) => void
  /** Whether the sidebar is collapsed. */
  sidebarCollapsed: boolean
  /** Toggles the sidebar collapsed state. */
  toggleSidebar: () => void
  /** Whether mobile navigation is open. */
  mobileNavOpen: boolean
  /** Sets the mobile navigation open state. */
  setMobileNavOpen: (open: boolean) => void
  /** Display label for the active profile. */
  profileLabel: string
}

/** Create context with undefined default for proper error handling. */
const PlatformShellContext = createContext<
  PlatformShellContextType | undefined
>(undefined)

/** Props for the PlatformShellProvider component. */
interface PlatformShellProviderProps {
  /** Child components to wrap with the provider. */
  children: ReactNode
  /** Initial profile to use if none is stored. */
  initialProfile?: ProfileKey
}

/** Validates whether a string is a valid ProfileKey. */
function isValidProfile(profile: string): profile is ProfileKey {
  return VALID_PROFILES.includes(profile as ProfileKey)
}

/** Gets the initial profile from localStorage or returns the fallback. */
function getInitialProfile(fallback: ProfileKey): ProfileKey {
  if (typeof window === "undefined") return fallback

  const stored = localStorage.getItem(ACTIVE_PROFILE_STORAGE_KEY)
  if (stored && isValidProfile(stored)) {
    return stored
  }
  return fallback
}

/** Provides platform shell state management via React Context. */
export function PlatformShellProvider({
  children,
  initialProfile = "admin",
}: PlatformShellProviderProps) {
  // Initialize state with lazy initializer to read from localStorage on first render
  const [activeProfile, setActiveProfileState] = useState<ProfileKey>(() => {
    // On the client, try to read from localStorage first
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(ACTIVE_PROFILE_STORAGE_KEY)
      if (stored && isValidProfile(stored)) {
        return stored
      }
    }
    // Fall back to the initial profile from server session
    return initialProfile
  })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Sync with initialProfile prop when it changes (e.g., after navigation)
  useEffect(() => {
    const storedProfile = getInitialProfile(initialProfile)
    setActiveProfileState((current) =>
      current === storedProfile ? current : storedProfile
    )
  }, [initialProfile])

  // Persist profile changes to localStorage
  const setActiveProfile = useCallback((profile: ProfileKey) => {
    setActiveProfileState(profile)
    if (typeof window !== "undefined") {
      localStorage.setItem(ACTIVE_PROFILE_STORAGE_KEY, profile)
    }
  }, [])

  // Toggle sidebar collapsed state
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev)
  }, [])

  // Get display label for active profile
  const profileLabel = PROFILE_LABELS[activeProfile]

  const value: PlatformShellContextType = {
    activeProfile,
    setActiveProfile,
    sidebarCollapsed,
    toggleSidebar,
    mobileNavOpen,
    setMobileNavOpen,
    profileLabel,
  }

  return (
    <PlatformShellContext.Provider value={value}>
      {children}
    </PlatformShellContext.Provider>
  )
}

/** Custom hook to access the full platform shell context. */
export function usePlatformShell(): PlatformShellContextType {
  const context = useContext(PlatformShellContext)
  if (context === undefined) {
    throw new Error(
      "usePlatformShell must be used within a PlatformShellProvider"
    )
  }
  return context
}

/** Hook for accessing just the active profile (lighter dependency). */
export function useActiveProfile(): {
  activeProfile: ProfileKey
  setActiveProfile: (profile: ProfileKey) => void
  profileLabel: string
} {
  const { activeProfile, setActiveProfile, profileLabel } = usePlatformShell()
  return { activeProfile, setActiveProfile, profileLabel }
}

/** Hook for accessing just sidebar state. */
export function useSidebarState(): {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
} {
  const { sidebarCollapsed, toggleSidebar } = usePlatformShell()
  return { sidebarCollapsed, toggleSidebar }
}

/** Hook for accessing just mobile nav state. */
export function useMobileNav(): {
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
} {
  const { mobileNavOpen, setMobileNavOpen } = usePlatformShell()
  return { mobileNavOpen, setMobileNavOpen }
}
