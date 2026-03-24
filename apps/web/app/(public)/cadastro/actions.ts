"use server"

import { redirect } from "next/navigation"

/**
 * Server action for user registration.
 * Mock implementation - simulates account creation.
 */
export async function registerAccount(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  // Mock: Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Redirect to success page with email
  redirect(
    `/cadastro/sucesso?email=${encodeURIComponent(email || "usuario@exemplo.com")}&name=${encodeURIComponent(name || "Usuario")}`
  )
}
