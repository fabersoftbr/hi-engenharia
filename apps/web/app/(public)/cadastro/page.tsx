import { BrandLogo } from "@/components/brand-logo"
import { RegistrationForm } from "@/components/auth/registration-form"

/**
 * Registration page route at /cadastro.
 * Desktop: split 50/50 layout with form on left, brand panel on right.
 * Mobile: single-column centered form.
 */
export default function RegistrationPage() {
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
          <RegistrationForm />
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
            Solucoes inteligentes em engenharia para seu projeto.
          </p>
        </div>
      </div>
    </div>
  )
}
