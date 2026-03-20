import { redirect } from "next/navigation"
import { getMockSession } from "@/lib/mock-session"
import { AppSidebar } from "@/components/platform/app-sidebar"
import { AppHeader } from "@/components/platform/app-header"
import { SidebarProvider, SidebarInset } from "@workspace/ui/components/sidebar"

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getMockSession()

  // Redirect to login if no valid session exists
  if (!session?.authenticated) {
    redirect("/login")
  }

  const activeProfile = session.activeProfile

  return (
    <SidebarProvider>
      <AppSidebar activeProfile={activeProfile} />
      <SidebarInset>
        <AppHeader activeProfile={activeProfile} />
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
