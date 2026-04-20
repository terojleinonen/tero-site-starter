'use client'

import { highlightText } from '@/lib/content/highlight'

type Message = {
  role: 'user' | 'assistant'
  content: string
  quotes?: string[]
}

type Props = {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
      {/* 💬 MESSAGE BUBBLE */}
      <div className="chat-bubble">
        <div className="chat-content">
          {message.content}
        </div>

        {/* 🔍 SOURCES */}
        {!isUser && message.quotes && message.quotes.length > 0 && (
          <div className="chat-sources">
            <div className="chat-sources-label">Sources</div>

            {message.quotes.map((q, i) => (
              <div
                key={i}
                className="chat-quote"
                onClick={() => highlightText(q)}
              >
                {q}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}