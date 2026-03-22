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
import { CheckIcon, SunIcon, MoonIcon, MonitorIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useActiveProfile } from "./platform-shell-provider"
import { type ProfileKey } from "@/lib/platform-config"

/** Profile option for the dropdown menu. */
interface ProfileOption {
  /** Unique profile key. */
  key: ProfileKey
  /** Display label for the profile. */
  label: string
}

/** Theme option for the dropdown menu. */
interface ThemeOption {
  /** Theme value (light, dark, system). */
  value: "light" | "dark" | "system"
  /** Display label for the theme. */
  label: string
  /** Icon component for the theme. */
  icon: typeof SunIcon
}

/** Profile labels in Portuguese for the dropdown menu. */
const PROFILE_OPTIONS: ProfileOption[] = [
  { key: "admin", label: "Administrador" },
  { key: "commercial", label: "Comercial interno" },
  { key: "partner", label: "Afiliado/Parceiro externo" },
  { key: "operations", label: "Engenharia/Operacao" },
  { key: "cliente", label: "Cliente" },
]

/** Theme options for the appearance section. */
const THEME_OPTIONS: ThemeOption[] = [
  { value: "light", label: "Tema claro", icon: SunIcon },
  { value: "dark", label: "Tema escuro", icon: MoonIcon },
  { value: "system", label: "Seguir sistema", icon: MonitorIcon },
]

/** Renders a dropdown menu for switching profiles and theme appearance. */
export function ProfileSwitcher() {
  const { activeProfile, setActiveProfile, profileLabel } = useActiveProfile()
  const { theme, setTheme } = useTheme()

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
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Aparencia</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {THEME_OPTIONS.map((option) => {
          const isActive = theme === option.value
          const Icon = option.icon
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
            >
              <Icon className="size-4" />
              <span className="flex-1">{option.label}</span>
              {isActive && <CheckIcon className="size-4" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
