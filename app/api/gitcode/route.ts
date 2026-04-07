import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/env'

export async function POST(request: NextRequest) {
  const { messages } = await request.json()

  const stream = await fetch(env.GIT_CODE_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.GIT_CODE_API_KEY!}`
    },
    body: JSON.stringify({
      model: 'Qwen/Qwen3.5-397B-A17B',
      messages: messages || [{ role: 'user', content: '你好' }],
      stream: true
      // enable_thinking: true
    })
  })

  return new NextResponse(stream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  })
}
