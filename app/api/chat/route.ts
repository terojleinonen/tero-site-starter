import { NextResponse } from 'next/server'
import { openai } from '@/lib/ai/openai'
import { ARTICLE_CHAT_SYSTEM_PROMPT } from '@/lib/ai/prompts'
import { parseJsonAnswer } from '@/lib/ai/parse'

export async function POST(req: Request) {
  try {
    const { messages, content } = await req.json()

    if (!content) {
      return NextResponse.json({ error: 'Missing content' }, { status: 400 })
    }

    const history =
      messages?.map((m: any) => ({
        role: m.role,
        content: m.content,
      })) || []

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: ARTICLE_CHAT_SYSTEM_PROMPT },
        { role: 'user', content: `ARTICLE:\n${content}` },
        ...history,
      ],
    })

    const raw = completion.choices[0]?.message?.content || ''
    const parsed = parseJsonAnswer(raw)

    return NextResponse.json(parsed)
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}