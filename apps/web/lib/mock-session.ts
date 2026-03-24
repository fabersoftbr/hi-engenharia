/**
 * Mock Session Management
 * Handles mock authentication state for the frontend-only prototype.
 * Uses cookies to persist session data across requests.
 */

import { cookies } from "next/headers"
import { ProfileKey } from "./platform-config"

/**
 * Cookie name for the mock session.
 */
export const SESSION_COOKIE_NAME = "hi_portal_session"

/**
 * Available mock profiles - must match ProfileKey from platform-config.
 */
export type MockProfile = ProfileKey

/**
 * Default profile when no session exists.
 */
export const DEFAULT_PROFILE: MockProfile = "admin"

/**
 * Session data structure stored in the cookie.
 */
export interface MockSession {
  authenticated: boolean
  email: string
  activeProfile: MockProfile
}

/**
 * Parse session from cookie value.
 * Returns null if the cookie is missing or malformed.
 */
export function parseSession(
  cookieValue: string | undefined
): MockSession | null {
  if (!cookieValue) {
    return null
  }

  try {
    const session = JSON.parse(cookieValue) as MockSession

    // Validate session has required fields with correct types
    if (
      typeof session.authenticated === "boolean" &&
      typeof session.email === "string" &&
      typeof session.activeProfile === "string"
    ) {
      return session
    }

    return null
  } catch {
    return null
  }
}

/**
 * Serialize session to cookie value.
 */
export function serializeSession(session: MockSession): string {
  return JSON.stringify(session)
}

/**
 * Create a default mock session with the given email and profile.
 */
export function createMockSession(
  email: string = "usuario@hiengenharia.com",
  profile: MockProfile = DEFAULT_PROFILE
): MockSession {
  return {
    authenticated: true,
    email,
    activeProfile: profile,
  }
}

/**
 * Get current session from cookies.
 * Server component helper for reading session state.
 */
export async function getMockSession(): Promise<MockSession | null> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return parseSession(cookieValue)
}

/**
 * Check if user is authenticated.
 * Server component helper for authentication check.
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getMockSession()
  return session?.authenticated ?? false
}

/**
 * Get current profile from session.
 * Server component helper for reading active profile.
 */
export async function getCurrentProfile(): Promise<MockProfile | null> {
  const session = await getMockSession()
  return session?.activeProfile ?? null
}

/**
 * Validate if a string is a valid profile key.
 */
export function isValidProfile(profile: string): profile is MockProfile {
  const validProfiles: MockProfile[] = [
    "admin",
    "commercial",
    "partner",
    "operations",
  ]
  return validProfiles.includes(profile as MockProfile)
}
