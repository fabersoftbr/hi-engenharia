import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import {
  SESSION_COOKIE_NAME,
  parseSession,
} from "@/lib/mock-session"

export default async function Page() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value
  const session = parseSession(sessionCookie)

  if (session?.authenticated) {
    redirect("/portal")
  }

  redirect("/login")
}
