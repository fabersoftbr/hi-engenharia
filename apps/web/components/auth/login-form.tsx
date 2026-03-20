"use client"

import { useActionState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { enterPortal } from "@/app/(public)/login/actions"

const initialState = {
  message: "",
}

/**
 * Login form component for the mock authentication flow.
 * Accepts any email and password, shows pending state during submission.
 */
export function LoginForm() {
  const [state, formAction, isPending] = useActionState(enterPortal, initialState)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Entrar</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              disabled={isPending}
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
              disabled={isPending}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>

          {state.message && (
            <p className="text-center text-sm text-destructive">{state.message}</p>
          )}

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
