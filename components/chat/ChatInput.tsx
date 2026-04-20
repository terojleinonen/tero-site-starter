'use client'

import { useState, KeyboardEvent } from 'react'

type Props = {
  onSend: (message: string) => Promise<void> | void
  loading?: boolean
}

export default function ChatInput({ onSend, loading }: Props) {
  const [value, setValue] = useState('')

  const handleSend = async () => {
    const trimmed = value.trim()
    if (!trimmed || loading) return

    await onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-input-wrapper">
      <textarea
        className="chat-input"
        value={value}
        placeholder="Ask something about this article..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={loading}
      />

      <button
        className="chat-send"
        onClick={handleSend}
        disabled={loading || !value.trim()}
      >
        {loading ? '...' : 'Send'}
      </button>
    </div>
  )
}