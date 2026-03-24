"use client"

import Link from "next/link"
import { Button } from "@workspace/ui/components/button"

// ilustracao inline SVG - erro amigavel com engrenagem quebrada
function ErrorIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Gear body */}
      <path
        d="M100 40 L112 52 L128 48 L132 64 L148 68 L144 84 L156 96 L144 108 L148 124 L132 128 L128 144 L112 140 L100 152 L88 140 L72 144 L68 128 L52 124 L56 108 L44 96 L56 84 L52 68 L68 64 L72 48 L88 52 Z"
        className="fill-muted stroke-muted-foreground/30"
        strokeWidth="2"
      />
      {/* Gear center circle */}
      <circle
        cx="100"
        cy="96"
        r="24"
        className="fill-background stroke-muted-foreground/30"
        strokeWidth="2"
      />
      {/* Crack line through gear */}
      <path
        d="M76 72 L92 96 L84 112 L108 120 L124 104"
        className="stroke-destructive/60"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small warning triangle */}
      <path
        d="M140 150 L160 182 L120 182 Z"
        className="fill-destructive/10 stroke-destructive/60"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Exclamation mark in triangle */}
      <line
        x1="140"
        y1="161"
        x2="140"
        y2="172"
        className="stroke-destructive/60"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="140" cy="177" r="1.5" className="fill-destructive/60" />
    </svg>
  )
}

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8 text-center">
      {/* ilustracao amigavel */}
      <ErrorIllustration className="size-48 opacity-80" />

      <div className="flex max-w-md flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Ops, algo deu errado
        </h1>
        <p className="text-base text-muted-foreground">
          Encontramos um problema inesperado. Não se preocupe, nossa equipe já
          foi notificada. Você pode tentar novamente ou voltar para a página
          inicial.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  )
}
