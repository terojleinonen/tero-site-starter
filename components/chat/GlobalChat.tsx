'use client'

import { useState } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function GlobalChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]

    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat-global', {
      method: 'POST',
      body: JSON.stringify({ messages: newMessages }),
    })

    const data = await res.json()

    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: data.answer },
    ])

    setLoading(false)
  }

  return (
    <div className="global-chat">
      <h2>Ask the entire archive</h2>

      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>
            {m.content}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
      />

      <button onClick={send}>{loading ? '...' : 'Ask'}</button>
    </div>
  )
}