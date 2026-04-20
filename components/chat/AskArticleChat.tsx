'use client'

import { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import {
  loadMessages,
  saveMessages,
  clearMessages,
} from '@/lib/chat/storage'

type Message = {
  role: 'user' | 'assistant'
  content: string
  quotes?: string[]
}

type Props = {
  content: string
  slug: string
}

export default function AskArticleChat({ content, slug }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  /* 🔥 LOAD SAVED CHAT */
  useEffect(() => {
    const stored = loadMessages(slug)
    if (stored?.length) {
      setMessages(stored)
    }
  }, [slug])

  /* 💾 SAVE CHAT */
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(slug, messages)
    }
  }, [messages, slug])

  /* 🚀 SEND MESSAGE */
  const send = async (text: string) => {
    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          content,
        }),
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data?.answer || 'No response',
          quotes: data?.quotes || [],
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Something went wrong.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  /* 🧹 RESET CHAT */
  const reset = () => {
    clearMessages(slug)
    setMessages([])
  }

  return (
    <div className="chat-container">
      {/* 🔝 HEADER */}
      <div className="chat-header">
        <h3 className="chat-title">Ask this article</h3>

        {messages.length > 0 && (
          <button onClick={reset} className="chat-reset">
            Reset
          </button>
        )}
      </div>

      {/* 💬 MESSAGES */}
      <div className="chat-messages">
        {messages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}

        {loading && (
          <div className="chat-message assistant">
            <div className="chat-bubble">
              <div className="chat-content">Thinking...</div>
            </div>
          </div>
        )}
      </div>

      {/* ✍️ INPUT */}
      <ChatInput onSend={send} loading={loading} />
    </div>
  )
}