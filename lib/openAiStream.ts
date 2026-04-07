'use server'

import type { StreamState } from 'http2'
import type { ChatCompletionStream } from 'openai/lib/ChatCompletionStream.mjs'

export async function toOpenAiServerSentEventsStream(
  response: ChatCompletionStream<StreamState | null>,
  abortController: AbortController
) {
  const encoder = new TextEncoder()
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of response) {
          if (abortController?.signal.aborted) {
            break
          }
          // console.log("🚀 ~ toOpenAiServerSentEventsStream ~ chunk:", JSON.stringify(chunk))
          const content = chunk?.choices[0]?.delta || ''
          const done = chunk?.choices[0]?.finish_reason || ''
          if (content) {
            const text =
              done === 'stop'
                ? `data: [DONE]`
                : `data: ${JSON.stringify({ content })}\n\n`
            controller.enqueue(encoder.encode(text))
          }
        }
      } catch (error) {
        if (abortController?.signal.aborted) {
          controller.close()
          return
        }

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: 'RUN_ERROR',
              timestamp: Date.now(),
              error: JSON.stringify(error)
            })}\n\n`
          )
        )
        controller.close()
      } finally {
        controller.close()
      }
    },
    cancel() {
      if (abortController) {
        abortController.abort()
      }
    }
  })
}
