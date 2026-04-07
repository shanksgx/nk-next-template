'use client'

import { GalleryVerticalEnd } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { SignupForm } from '@/components/signup-form'

export default function SignupPage() {
  const t = useTranslations('Signup')

  return (
    <div className="grid min-h-svh lg:grid-cols-2 overflow-hidden">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm
              t={{
                title: t('title'),
                description: t('description'),
                name: t('name'),
                namePlaceholder: t('namePlaceholder'),
                email: t('email'),
                emailPlaceholder: t('emailPlaceholder'),
                emailDescription: t('emailDescription'),
                password: t('password'),
                passwordDescription: t('passwordDescription'),
                confirmPassword: t('confirmPassword'),
                confirmPasswordDescription: t('confirmPasswordDescription'),
                submit: t('submit'),
                orContinueWith: t('orContinueWith'),
                signupWithGithub: t('signupWithGithub'),
                hasAccount: t('hasAccount'),
                signIn: t('signIn')
              }}
            />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/bannera.jpg"
          alt="Image"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
