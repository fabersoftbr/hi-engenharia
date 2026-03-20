"use client"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { CheckIcon } from "lucide-react"
import { useActiveProfile } from "./platform-shell-provider"
import { type ProfileKey } from "@/lib/platform-config"

// Profile labels in Portuguese (exact copy from plan requirement)
const PROFILE_OPTIONS: { key: ProfileKey; label: string }[] = [
  { key: "admin", label: "Administrador" },
  { key: "commercial", label: "Comercial interno" },
  { key: "partner", label: "Afiliado/Parceiro externo" },
  { key: "operations", label: "Engenharia/Operacao" },
]

export function ProfileSwitcher() {
  const { activeProfile, setActiveProfile, profileLabel } = useActiveProfile()

  const handleSelectProfile = (profileKey: ProfileKey) => {
    setActiveProfile(profileKey)
  }

  // Generate avatar initials from profile label
  const initials = profileLabel
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar size="sm">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Trocar perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {PROFILE_OPTIONS.map((option) => {
          const isActive = activeProfile === option.key
          return (
            <DropdownMenuItem
              key={option.key}
              onClick={() => handleSelectProfile(option.key)}
            >
              <span className="flex-1">{option.label}</span>
              {isActive && <CheckIcon className="size-4" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
