'use client'

import { GalleryVerticalEnd, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { LoginForm } from '@/components/login-form'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggleCircular } from '@/components/theme-toggle-circular'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export default function LoginPage() {
  const t = useTranslations('Login')
  const { theme, setTheme } = useTheme()

  return (
    <div className="grid min-h-svh lg:grid-cols-2 overflow-hidden">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggleCircular
              onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Button variant="outline" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </ThemeToggleCircular>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              t={{
                title: t('title'),
                description: t('description'),
                email: t('email'),
                emailPlaceholder: t('emailPlaceholder'),
                password: t('password'),
                forgotPassword: t('forgotPassword'),
                submit: t('submit'),
                orContinueWith: t('orContinueWith'),
                loginWithGithub: t('loginWithGithub'),
                noAccount: t('noAccount'),
                signUp: t('signUp')
              }}
            />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/bannerb.jpg"
          alt="Image"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
