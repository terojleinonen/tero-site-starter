import { getOpenAI } from '@/lib/ai/openai'
import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const postId = body._id
    const blocks = body.body || []

    const text = blocks
      .map((b: any) =>
        b.children?.map((c: any) => c.text).join('')
      )
      .join('\n')

    // 🔥 TECH SUMMARY
    const tech = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Summarize into 3-5 concise bullet points.',
        },
        { role: 'user', content: text },
      ],
    })

    const summary = tech.choices[0].message.content
      ?.split('\n')
      .map((l) => l.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean)

    // 🔥 ELI5 SUMMARY
    const simple = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Explain like I am 5 years old. Use simple language and short sentences.',
        },
        { role: 'user', content: text },
      ],
    })

    const summarySimple = simple.choices[0].message.content
      ?.split('\n')
      .map((l) => l.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean)

    await sanity.patch(postId).set({
      summary,
      summarySimple,
    }).commit()

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}