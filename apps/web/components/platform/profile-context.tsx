"use client"

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  useMemo,
  type ReactNode,
} from "react"
import { type ProfileKey, PROFILE_LABELS } from "@/lib/platform-config"

/** Storage key for active profile persistence in localStorage. */
const ACTIVE_PROFILE_STORAGE_KEY = "hi-active-profile"
const ACTIVE_PROFILE_CHANGE_EVENT = "hi-active-profile-change"

/** Valid profile keys for validation. */
const VALID_PROFILES: ProfileKey[] = [
  "admin",
  "commercial",
  "partner",
  "operations",
  "cliente",
]

/** Context type for profile state only (sidebar state is handled by SidebarProvider). */
interface ProfileContextType {
  /** Currently active user profile. */
  activeProfile: ProfileKey
  /** Updates the active profile. */
  setActiveProfile: (profile: ProfileKey) => void
  /** Display label for the active profile. */
  profileLabel: string
}

/** Create context with undefined default for proper error handling. */
const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

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

function subscribeActiveProfile(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {}
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === ACTIVE_PROFILE_STORAGE_KEY) {
      callback()
    }
  }

  window.addEventListener("storage", handleStorage)
  window.addEventListener(ACTIVE_PROFILE_CHANGE_EVENT, callback)

  return () => {
    window.removeEventListener("storage", handleStorage)
    window.removeEventListener(ACTIVE_PROFILE_CHANGE_EVENT, callback)
  }
}

/** Props for the ProfileProvider component. */
export interface ProfileProviderProps {
  /** Child components to wrap with the provider. */
  children: ReactNode
  /** Initial profile to use if none is stored. */
  initialProfile?: ProfileKey
}

/** Provides profile state management via React Context. */
export function ProfileProvider({
  children,
  initialProfile = "admin",
}: ProfileProviderProps) {
  const activeProfile = useSyncExternalStore(
    subscribeActiveProfile,
    () => getInitialProfile(initialProfile),
    () => initialProfile
  )

  // Persist profile changes to localStorage
  const setActiveProfile = useCallback((profile: ProfileKey) => {
    if (typeof window === "undefined") return

    localStorage.setItem(ACTIVE_PROFILE_STORAGE_KEY, profile)
    window.dispatchEvent(new Event(ACTIVE_PROFILE_CHANGE_EVENT))
  }, [])

  // Get display label for active profile
  const profileLabel = PROFILE_LABELS[activeProfile]

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo<ProfileContextType>(
    () => ({
      activeProfile,
      setActiveProfile,
      profileLabel,
    }),
    [activeProfile, setActiveProfile, profileLabel]
  )

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

/** Custom hook to access the profile context. */
export function useActiveProfile(): ProfileContextType {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useActiveProfile must be used within a ProfileProvider")
  }
  return context
}
