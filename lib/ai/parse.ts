export function parseSummaryLines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean)
}

export function parseJsonAnswer(raw: string): { answer: string; quotes: string[] } {
  try {
    const parsed = JSON.parse(raw)
    return {
      answer: parsed?.answer ?? 'No response',
      quotes: Array.isArray(parsed?.quotes) ? parsed.quotes : [],
    }
  } catch {
    return {
      answer: raw || 'No response',
      quotes: [],
    }
  }
}