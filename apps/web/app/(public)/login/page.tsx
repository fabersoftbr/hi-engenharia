import { BrandLogo } from "@/components/brand-logo"
import { LoginForm } from "@/components/auth/login-form"

/**
 * Login page route at /login.
 * Desktop: split 50/50 layout with form on left, brand panel on right.
 * Mobile: single-column centered form.
 */
export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left panel - Form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="flex flex-col items-center gap-8">
          <BrandLogo
            variant="full"
            tone="auto"
            imageClassName="w-52 sm:w-56"
            priority
          />
          <LoginForm />
        </div>
      </div>

      {/* Right panel - Brand (hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-center lg:bg-primary lg:p-12">
        <div className="max-w-md text-center">
          <BrandLogo
            variant="full"
            tone="light"
            className="mb-6"
            imageClassName="w-72"
            priority
          />
          <p className="text-lg text-primary-foreground/80">
            Soluções inteligentes em engenharia para seu projeto.
          </p>
        </div>
      </div>
    </div>
  )
}
