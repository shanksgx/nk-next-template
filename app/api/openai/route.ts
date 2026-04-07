import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/env'
import { toOpenAiServerSentEventsStream } from '@/lib/openAiStream'

// export const runtime = 'edge'
export type aiMessageToUi = {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  const openai = new OpenAI({
    baseURL: env.SUPER_COMPUTING_OPEN_AI_URL!,
    apiKey: env.SUPER_COMPUTING_API_KEY!
  })
  const { messages } = await request.json()
  const filterMsgs = messages?.map(({ role, content }: aiMessageToUi) => ({
    role,
    content
  }))
  const abortController = new AbortController()

  const response = openai.chat.completions.stream({
    model: 'MiniMax-M2.5',
    stream: true,
    max_tokens: 4096,
    reasoning_effort: 'medium', //深度思考
    messages: filterMsgs || [{ role: 'user', content: '你好' }]
  })

  const stream = await toOpenAiServerSentEventsStream(response, abortController)

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  })
}
