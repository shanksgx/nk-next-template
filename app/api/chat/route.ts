import { env } from '@/env'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { convertToModelMessages, streamText, type UIMessage } from 'ai'

type ChatModelIds =
  | 'meta-llama/Llama-3-70b-chat-hf'
  | 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo'
  | 'zai-org/GLM-5'
  | (string & {})

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const model = createOpenAICompatible<ChatModelIds, string, string, string>({
    name: 'gitcode',
    baseURL: env.GIT_CODE_URL,
    apiKey: env.GIT_CODE_API_KEY
  })

  const result = streamText({
    model: model.chatModel('zai-org/GLM-5'),
    system: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages)
  })

  return result.toUIMessageStreamResponse()
}
