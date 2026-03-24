"use server"

import { redirect } from "next/navigation"

/**
 * Server action for password recovery.
 * Mock implementation - simulates sending a recovery email.
 */
export async function requestPasswordRecovery(formData: FormData) {
  const email = formData.get("email") as string

  // Mock: Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Redirect to confirmation page with email
  redirect(
    `/recuperar-senha/confirmacao?email=${encodeURIComponent(email || "usuario@exemplo.com")}`
  )
}
