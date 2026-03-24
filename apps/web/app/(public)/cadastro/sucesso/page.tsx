import { CheckCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card"

interface PageProps {
  searchParams: Promise<{ email?: string; name?: string }>
}

/**
 * Registration success page.
 * Displays confirmation after account creation.
 */
export default async function RegistrationSuccessPage({
  searchParams,
}: PageProps) {
  const { email, name } = await searchParams

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="size-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Conta criada com sucesso!</CardTitle>
          <CardDescription>
            {name
              ? `Bem-vindo(a), ${name}! Sua conta foi criada.`
              : "Sua conta foi criada com sucesso."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {email && (
            <p className="text-center text-sm text-muted-foreground">
              E-mail cadastrado: <strong>{email}</strong>
            </p>
          )}

          <div className="rounded-md bg-muted/50 p-4 text-center text-sm text-muted-foreground">
            <p>
              Este é um ambiente de demonstração. Nenhum dado foi realmente
              armazenado.
            </p>
          </div>

          <Button asChild className="w-full">
            <Link href="/login">Ir para o login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
