export function getChatKey(slug: string) {
  return `chat:${slug}`
}

export function loadMessages(slug: string) {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(getChatKey(slug))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveMessages(slug: string, messages: any[]) {
  try {
    localStorage.setItem(getChatKey(slug), JSON.stringify(messages))
  } catch {}
}

export function clearMessages(slug: string) {
  localStorage.removeItem(getChatKey(slug))
}