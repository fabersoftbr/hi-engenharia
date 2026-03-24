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
  searchParams: Promise<{ email?: string }>
}

/**
 * Password recovery confirmation page.
 * Displays success message after password recovery request.
 */
export default async function PasswordRecoveryConfirmationPage({
  searchParams,
}: PageProps) {
  const { email } = await searchParams

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="size-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">E-mail enviado!</CardTitle>
          <CardDescription>
            Se o e-mail informado estiver cadastrado, você receberá instruções
            para redefinir sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {email && (
            <p className="text-center text-sm text-muted-foreground">
              Enviamos para: <strong>{email}</strong>
            </p>
          )}

          <div className="rounded-md bg-muted/50 p-4 text-center text-sm text-muted-foreground">
            <p>
              Este é um ambiente de demonstração. Nenhum e-mail foi realmente
              enviado.
            </p>
          </div>

          <Button asChild className="w-full">
            <Link href="/login">Voltar para o login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
