"use client"

import {
  ProfileProvider,
  useActiveProfile,
  type ProfileProviderProps,
} from "./profile-context"

/**
 * @deprecated Use ProfileProvider directly from "./profile-context"
 * This alias is kept for backward compatibility.
 */
export const PlatformShellProvider = ProfileProvider

/**
 * @deprecated Use useActiveProfile directly from "./profile-context"
 * This re-export is kept for backward compatibility.
 */
export { useActiveProfile }

/** @deprecated Use ProfileProviderProps from "./profile-context" */
export type PlatformShellProviderProps = ProfileProviderProps
