"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card"
import { requestPasswordRecovery } from "@/app/(public)/recuperar-senha/actions"
import Link from "next/link"

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
          Enviando...
        </>
      ) : (
        "Enviar link de recuperação"
      )}
    </Button>
  )
}

/**
 * Password recovery form component.
 * Mock implementation - accepts any email and simulates sending a recovery link.
 */
export function PasswordRecoveryForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Recuperar senha</CardTitle>
        <CardDescription>
          Digite seu e-mail para receber um link de recuperação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={requestPasswordRecovery} className="space-y-4">
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

          <SubmitButton />

          <div className="pt-4 text-center text-sm text-muted-foreground">
            <p>
              Lembrou sua senha?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Voltar para o login
              </Link>
            </p>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p className="rounded-md bg-muted/50 px-3 py-2">
              Este é um ambiente de demonstração. Nenhum e-mail será enviado.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
