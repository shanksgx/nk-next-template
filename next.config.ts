import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  distDir: 'dist',
  turbopack: {
    root: process.cwd()
  }
}

const config = withNextIntl(nextConfig)

export default config
