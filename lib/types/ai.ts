export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  quotes?: string[]
}