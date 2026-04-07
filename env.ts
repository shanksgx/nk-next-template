import { string, z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  server: {
    GIT_CODE_URL: string(),
    GIT_CODE_API_KEY: z.string(),
    SUPER_COMPUTING_API_KEY: z.string(),
    SUPER_COMPUTING_URL: z.string(),
    SUPER_COMPUTING_OPEN_AI_URL: z.string()
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string()
  },
  runtimeEnv: {
    SUPER_COMPUTING_OPEN_AI_URL: process.env.SUPER_COMPUTING_OPEN_AI_URL,
    SUPER_COMPUTING_URL: process.env.SUPER_COMPUTING_URL,
    SUPER_COMPUTING_API_KEY: process.env.SUPER_COMPUTING_API_KEY,
    GIT_CODE_URL: process.env.GIT_CODE_URL,
    GIT_CODE_API_KEY: process.env.GIT_CODE_API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
  }
})
