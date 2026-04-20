'use client'

import { useEffect, useState } from 'react'

export default function TableOfContents({
  headings,
}: {
  headings: { text: string; id: string }[]
}) {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      const offsets = headings.map((h) => {
        const el = document.getElementById(h.id)
        if (!el) return null

        return {
          id: h.id,
          top: el.getBoundingClientRect().top,
        }
      })

      const visible = offsets
        .filter((o) => o && o.top < 200)
        .pop()

      if (visible) setActive(visible.id)
    }

    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [headings])

  return (
    <>
      {/* 📱 MOBILE BUTTON */}
      <button
        className="toc-toggle"
        onClick={() => setOpen(!open)}
      >
        Contents
      </button>

      {/* 📌 SIDEBAR */}
      <aside className={`toc ${open ? 'open' : ''}`}>
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={() => setOpen(false)}
            className={`toc-item ${active === h.id ? 'active' : ''}`}
          >
            {h.text}
          </a>
        ))}
      </aside>
    </>
  )
}