import { redirect } from "next/navigation"
import { getMockSession } from "@/lib/mock-session"
import { AppSidebar } from "@/components/platform/app-sidebar"
import { AppHeader } from "@/components/platform/app-header"
import { PlatformShellProvider } from "@/components/platform/platform-shell-provider"
import { SidebarProvider, SidebarInset } from "@workspace/ui/components/sidebar"
import { TooltipProvider } from "@workspace/ui/components/tooltip"

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
    <PlatformShellProvider initialProfile={activeProfile}>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </PlatformShellProvider>
  )
}
