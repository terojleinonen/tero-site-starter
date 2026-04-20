export default function AISummary({
  summary,
}: {
  summary?: string[]
}) {
  if (!summary || summary.length === 0) return null

  return (
    <div className="ai-summary">
      <div className="ai-label">AI Summary</div>

      <ul>
        {summary.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}