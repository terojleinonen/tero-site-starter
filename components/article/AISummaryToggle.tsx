'use client'

import { useState } from 'react'

export default function AISummaryToggle({
  summary,
  summarySimple,
}: {
  summary?: string[]
  summarySimple?: string[]
}) {
  const [mode, setMode] = useState<'tech' | 'simple'>('tech')

  const data = mode === 'tech' ? summary : summarySimple

  if (!data || data.length === 0) return null

  return (
    <div className="ai-wrapper">
      <div className="ai-header">
        <span>
          {mode === 'tech' ? 'AI Summary' : 'Simple Summary'}
        </span>

        <div className="toggle">
          <button
            onClick={() => setMode('tech')}
            className={mode === 'tech' ? 'active' : ''}
          >
            Tech
          </button>

          <button
            onClick={() => setMode('simple')}
            className={mode === 'simple' ? 'active' : ''}
          >
            ELI5
          </button>
        </div>
      </div>

      <ul className="ai-list">
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}