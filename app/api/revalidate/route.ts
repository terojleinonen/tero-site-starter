import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Matches the webhook projection set up in Sanity:
// {_type, "slug": slug.current, "previousSlug": before().slug.current}
type WebhookPayload = {
  _type?: string
  slug?: string
  previousSlug?: string
}

const sections: Record<string, string> = {
  post: '/blog',
  note: '/notes',
  project: '/projects',
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (!secret) {
    return NextResponse.json(
      { error: 'SANITY_REVALIDATE_SECRET is not set' },
      { status: 500 }
    )
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true
    )

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const section = body?._type ? sections[body._type] : undefined

    if (!section) {
      return NextResponse.json(
        { error: `Unhandled document type: ${body?._type ?? 'missing'}` },
        { status: 400 }
      )
    }

    const paths = [section]

    // previousSlug covers renamed and deleted documents
    for (const slug of new Set([body?.slug, body?.previousSlug])) {
      if (slug) paths.push(`${section}/${slug}`)
    }

    paths.forEach((path) => revalidatePath(path))

    return NextResponse.json({ revalidated: paths, now: Date.now() })
  } catch (error) {
    console.error('Revalidate webhook failed:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
