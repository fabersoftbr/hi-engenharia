"use client"

import { useRef } from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { enterPortal } from "@/app/(public)/login/actions"

/**
 * Submit button with pending state using useFormStatus.
 */
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Entrando...
        </>
      ) : (
        "Entrar"
      )}
    </Button>
  )
}

/**
 * Login form component for the mock authentication flow.
 * Accepts any email and password, shows pending state during submission.
 */
export function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Entrar</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={enterPortal} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Sua senha"
              required
            />
          </div>

          <SubmitButton />

          <div className="flex flex-col gap-2 pt-2 text-center text-sm">
            <Link
              href="/recuperar-senha"
              className="text-primary hover:underline"
            >
              Esqueceu sua senha?
            </Link>
            <p className="text-muted-foreground">
              Ainda não tem conta?{" "}
              <Link href="/cadastro" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="space-y-2 pt-4 text-center text-sm text-muted-foreground">
            <p className="rounded-md bg-muted/50 px-3 py-2">
              Qualquer e-mail e senha funcionam nesta fase.
            </p>
            <p className="text-xs">
              Perfil inicial: <strong>Administrador</strong>
              <br />
              Troque de perfil dentro do portal.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
