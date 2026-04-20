'use client'

import { useState } from 'react'
import AISummary from './AiSummary'

export default function SmartSummary({
  initialSummary,
  content,
  postId,
}: {
  initialSummary?: string[]
  content: string
  postId: string
}) {
  const [summary, setSummary] = useState(initialSummary || [])
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)

    const res = await fetch('/api/summary', {
      method: 'POST',
      body: JSON.stringify({ content, postId }),
    })

    const data = await res.json()
    setSummary(data.summary || [])

    setLoading(false)
  }

  return (
    <div className="ai-wrapper">
      <div className="ai-header">
        <span>AI Summary</span>

        <button onClick={generate} className="regen-btn">
          {loading ? 'Generating...' : 'Regenerate'}
        </button>
      </div>

      <AISummary summary={summary} />
    </div>
  )
}