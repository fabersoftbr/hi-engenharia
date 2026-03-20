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

// Storage key for active profile persistence
const ACTIVE_PROFILE_STORAGE_KEY = "hi-active-profile"

// Valid profile keys for validation
const VALID_PROFILES: ProfileKey[] = ["admin", "commercial", "partner", "operations", "cliente"]

// Context type definition
interface PlatformShellContextType {
  activeProfile: ProfileKey
  setActiveProfile: (profile: ProfileKey) => void
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  profileLabel: string
}

// Create context with undefined default for proper error handling
const PlatformShellContext = createContext<PlatformShellContextType | undefined>(
  undefined
)

// Provider props
interface PlatformShellProviderProps {
  children: ReactNode
  initialProfile?: ProfileKey
}

// Validate profile key
function isValidProfile(profile: string): profile is ProfileKey {
  return VALID_PROFILES.includes(profile as ProfileKey)
}

// Get initial profile from localStorage or use default
function getInitialProfile(fallback: ProfileKey): ProfileKey {
  if (typeof window === "undefined") return fallback

  const stored = localStorage.getItem(ACTIVE_PROFILE_STORAGE_KEY)
  if (stored && isValidProfile(stored)) {
    return stored
  }
  return fallback
}

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

// Custom hook to use the shell context
export function usePlatformShell(): PlatformShellContextType {
  const context = useContext(PlatformShellContext)
  if (context === undefined) {
    throw new Error("usePlatformShell must be used within a PlatformShellProvider")
  }
  return context
}

// Hook for accessing just the active profile (lighter dependency)
export function useActiveProfile(): {
  activeProfile: ProfileKey
  setActiveProfile: (profile: ProfileKey) => void
  profileLabel: string
} {
  const { activeProfile, setActiveProfile, profileLabel } = usePlatformShell()
  return { activeProfile, setActiveProfile, profileLabel }
}

// Hook for accessing just sidebar state
export function useSidebarState(): {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
} {
  const { sidebarCollapsed, toggleSidebar } = usePlatformShell()
  return { sidebarCollapsed, toggleSidebar }
}

// Hook for accessing just mobile nav state
export function useMobileNav(): {
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
} {
  const { mobileNavOpen, setMobileNavOpen } = usePlatformShell()
  return { mobileNavOpen, setMobileNavOpen }
}
