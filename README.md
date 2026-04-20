# Tero Site Starter

Cinematic personal site starter built with Next.js App Router and Sanity CMS.

## What is included

- Home page with a custom visual system instead of a generic portfolio look
- Blog for long-form writing
- Notes / releases section for shorter updates and announcements
- Project case studies with stack tags and external links
- Embedded Sanity Studio at `/studio`
- Works even before Sanity is configured: pages render empty states instead of crashing

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Sanity CMS
- next-sanity

## Getting started

1. Install dependencies

```bash
npm install
```

2. Copy environment variables

```bash
cp .env.example .env.local
```

3. Add your Sanity values to `.env.local`

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-01
SANITY_API_READ_TOKEN=
```

4. Run the app

```bash
npm run dev
```

Open `http://localhost:3000`

## Create a Sanity project

Use Sanity CLI or the dashboard to create a project and dataset, then copy the values into `.env.local`.

```bash
npm create sanity@latest
```

You can also keep Studio embedded inside this repo at `/studio`.

## Suggested first content

- One `siteSettings` document
- One `author`
- Two `category` documents
- One `post`
- One `note`
- One `project`

## Suggested first edits for your own style

- Replace the hero copy in `components/site/hero.tsx`
- Replace the About page text in `app/about/page.tsx`
- Tune glow, grids, glass, and panel contrast in `app/globals.css`
- Add your own favicon, OG image, and structured data later

## Nice next upgrades

- Reading time for blog posts
- Search / filtering by tag
- RSS feed
- Dynamic OG image generation
- View transitions / motion polish
- Local draft preview
- Multi-language support
