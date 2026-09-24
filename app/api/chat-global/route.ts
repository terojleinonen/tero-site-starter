import { NextResponse } from 'next/server'
import { getOpenAI } from '@/lib/ai/openai'
import { parseJsonAnswer } from '@/lib/ai/parse'
import { getAllPostContents } from '@/lib/sanity/queries'
import { buildGlobalContext } from '@/lib/content/contextBuilder'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const posts = await getAllPostContents()
    const context = buildGlobalContext(posts)

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: `
You answer based on MULTIPLE articles.

Return JSON:
{
  "answer": "...",
  "sources": ["post title", "..."]
}

Rules:
- Use ONLY given content
- Reference which articles you used
- Be concise
`,
        },
        {
          role: 'user',
          content: `CONTENT:\n${context}`,
        },
        ...messages,
      ],
    })

    const raw = completion.choices[0]?.message?.content || ''
    const parsed = parseJsonAnswer(raw)

    return NextResponse.json(parsed)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}