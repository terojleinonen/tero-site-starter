'use client'

import { useSummary } from '@/hooks/useSummary'
import AISummary from './AISummary'

export default function AutoSummary({ content }: { content: string }) {
  const { summary, loading } = useSummary(content)

  if (loading) {
    return <div className="ai-summary">Generating summary...</div>
  }

  return <AISummary summary={summary} />
}