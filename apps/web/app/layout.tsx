import type { Metadata } from "next"
import { Geist_Mono, Raleway } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"

const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "HI Engenharia",
    template: "%s | HI Engenharia",
  },
  description: "Soluções inteligentes em engenharia para seu projeto.",
  icons: {
    icon: [
      {
        url: "/brand/hi-logo-mark-dark.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/brand/hi-logo-mark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        raleway.variable
      )}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
