import { cn } from "@workspace/ui/lib/utils"
import Image from "next/image"

interface BrandLogoProps {
  variant?: "full" | "mark"
  tone?: "auto" | "light" | "dark"
  className?: string
  imageClassName?: string
  priority?: boolean
}

/**
 * Renders the official HI Engenharia logo assets.
 * Use the light asset on dark surfaces and the dark asset on light surfaces.
 * `auto` follows the current theme using CSS-only dark mode selectors.
 */
export function BrandLogo({
  variant = "full",
  tone = "auto",
  className,
  imageClassName,
  priority = false,
}: BrandLogoProps) {
  const isFullLogo = variant === "full"
  const dimensions = isFullLogo
    ? { width: 1001, height: 249 }
    : { width: 238, height: 249 }
  const lightSrc = isFullLogo
    ? "/brand/hi-logo-full.png"
    : "/brand/hi-logo-mark.png"
  const darkSrc = isFullLogo
    ? "/brand/hi-logo-full-dark.png"
    : "/brand/hi-logo-mark-dark.png"

  if (tone === "light" || tone === "dark") {
    const src = tone === "light" ? lightSrc : darkSrc

    return (
      <span
        className={cn("inline-flex items-center justify-center", className)}
        aria-label="HI Engenharia"
        role="img"
      >
        <Image
          src={src}
          alt="HI Engenharia"
          width={dimensions.width}
          height={dimensions.height}
          priority={priority}
          className={cn(
            "h-auto object-contain",
            isFullLogo ? "w-44 sm:w-48" : "w-10",
            imageClassName
          )}
        />
      </span>
    )
  }

  return (
    <span
      className={cn("inline-flex items-center justify-center", className)}
      aria-label="HI Engenharia"
      role="img"
    >
      <Image
        src={darkSrc}
        alt="HI Engenharia"
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        className={cn(
          "h-auto object-contain dark:hidden",
          isFullLogo ? "w-44 sm:w-48" : "w-10",
          imageClassName
        )}
      />
      <Image
        src={lightSrc}
        alt="HI Engenharia"
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        className={cn(
          "hidden h-auto object-contain dark:block",
          isFullLogo ? "w-44 sm:w-48" : "w-10",
          imageClassName
        )}
      />
    </span>
  )
}
