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
import { registerAccount } from "@/app/(public)/cadastro/actions"
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
          Criando conta...
        </>
      ) : (
        "Criar conta"
      )}
    </Button>
  )
}

/**
 * Registration form component.
 * Mock implementation - accepts any data and simulates account creation.
 */
export function RegistrationForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Criar conta</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para criar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={registerAccount} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Seu nome"
              required
            />
          </div>

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
              placeholder="Crie uma senha"
              required
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              required
              minLength={6}
            />
          </div>

          <SubmitButton />

          <div className="pt-4 text-center text-sm text-muted-foreground">
            <p>
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Fazer login
              </Link>
            </p>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p className="rounded-md bg-muted/50 px-3 py-2">
              Este é um ambiente de demonstração. Nenhum dado será armazenado.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
