'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { trpc } from '@/app/_trpc/client'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'

export default function Home() {
  const t = useTranslations('HomePage')
  const tTheme = useTranslations('Theme')
  const tComponents = useTranslations('Components')

  const {
    data: helloData,
    isLoading: helloLoading,
    refetch: refetchHello
  } = trpc.hello.useQuery({ text: 'tRPC' })
  const { data: envData, refetch: refetchEnv } = trpc.getEnvInfo.useQuery()

  const handleTest = () => {
    refetchHello()
    refetchEnv()
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end gap-2 p-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('trpcTest.title')}</CardTitle>
            <CardDescription>{t('trpcTest.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button onClick={handleTest} disabled={helloLoading}>
                {helloLoading ? 'Loading...' : t('testButton')}
              </Button>
            </div>
            {helloData && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {t('greeting')}: {helloData.greeting}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('appUrl')}: {helloData.appUrl}
                </p>
              </div>
            )}
            {envData && (
              <div className="space-y-2 pt-2 border-t">
                <p className="text-sm font-medium">{t('envInfo')}:</p>
                <p className="text-sm text-muted-foreground">
                  {t('nodeEnv')}: {envData.nodeEnv}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('appUrl')}: {envData.appUrl}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{tTheme('switching')}</CardTitle>
              <CardDescription>{tTheme('description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {tTheme('support')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{tComponents('title')}</CardTitle>
              <CardDescription>{tComponents('description')}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button variant="default">{tComponents('default')}</Button>
              <Button variant="secondary">{tComponents('secondary')}</Button>
              <Button variant="outline">{tComponents('outline')}</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
