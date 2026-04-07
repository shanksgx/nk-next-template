import { router, publicProcedure } from './trpc'
import { z } from 'zod'
import { env } from '@/env'

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
        appUrl: env.NEXT_PUBLIC_APP_URL
      }
    }),

  getEnvInfo: publicProcedure.query(() => {
    return {
      nodeEnv: process.env.NODE_ENV,
      appUrl: env.NEXT_PUBLIC_APP_URL
    }
  })
})

export type AppRouter = typeof appRouter
