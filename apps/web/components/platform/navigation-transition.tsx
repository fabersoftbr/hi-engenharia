"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@workspace/ui/lib/utils"

// Fade and slide transition on route change with scroll reset
export function NavigationTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [displayChildren, setDisplayChildren] =
    React.useState<React.ReactNode>(children)
  const previousPathname = React.useRef(pathname)

  React.useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname
      setIsTransitioning(true)

      // Reset scroll position on navigation
      window.scrollTo(0, 0)

      // Short fade-out then swap content and fade-in
      const timer = setTimeout(() => {
        setDisplayChildren(children)
        setIsTransitioning(false)
      }, 150)

      return () => clearTimeout(timer)
    } else {
      // Same pathname, update children immediately (e.g. state changes)
      setDisplayChildren(children)
    }
  }, [pathname, children])

  return (
    <div
      className={cn(
        "navigation-transition",
        isTransitioning && "navigation-transition-exit"
      )}
    >
      {displayChildren}
    </div>
  )
}
