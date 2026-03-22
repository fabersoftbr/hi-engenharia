import { cn } from "@workspace/ui/lib/utils"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image" // Will be used when logo files are available

interface BrandLogoProps {
  variant?: "full" | "mark"
  className?: string
}

/**
 * BrandLogo component for Hi Engenharia.
 * Renders the official logo when available, or a text fallback otherwise.
 *
 * Logo files expected at:
 * - /brand/hi-logo-full.svg (full logo with text)
 * - /brand/hi-logo-mark.svg (icon/symbol only)
 */
export function BrandLogo({ variant = "full", className }: BrandLogoProps) {
  // Check if logo files exist by attempting to load them
  // For now, render text fallback until logo files are provided
  // When logo files are available, uncomment the Image components below

  const isFullLogo = variant === "full"

  // Logo placeholder - text-only fallback until official logo files are provided
  // When logo files exist at public/brand/, uncomment the Image components below
  /*
  if (isFullLogo) {
    return (
      <Image
        src="/brand/hi-logo-full.svg"
        alt="HI Engenharia"
        width={120}
        height={40}
        className={cn("object-contain", className)}
        priority
      />
    )
  }

  return (
    <Image
      src="/brand/hi-logo-mark.svg"
      alt="HI Engenharia"
      width={32}
      height={32}
      className={cn("object-contain", className)}
      priority
    />
  )
  */

  // Text fallback - rendered while logo files are not available
  return (
    <span
      className={cn(
        "font-sans font-bold tracking-tight text-primary",
        isFullLogo ? "text-xl" : "text-base",
        className
      )}
    >
      {isFullLogo ? "HI Engenharia" : "HI"}
    </span>
  )
}
