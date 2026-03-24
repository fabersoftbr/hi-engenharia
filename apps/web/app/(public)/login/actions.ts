"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import {
  createMockSession,
  serializeSession,
  SESSION_COOKIE_NAME,
  DEFAULT_PROFILE,
} from "@/lib/mock-session"

/**
 * Server action that handles the mock login flow.
 * Accepts any non-empty email and password, creates a mock session,
 * sets the session cookie, and redirects to the portal.
 */
export async function enterPortal(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Accept any non-empty values - no real credential validation
  // Form validation (required fields) is handled client-side
  const sessionEmail = email && password ? email : "usuario@hiengenharia.com"

  // Create the mock session with the default profile
  const session = createMockSession(sessionEmail, DEFAULT_PROFILE)

  // Set the session cookie
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, serializeSession(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  // Redirect to the portal
  redirect("/portal")
}
