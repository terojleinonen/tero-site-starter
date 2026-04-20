'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeBlock({
  code,
  language = 'javascript',
}: {
  code: string
  language?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="code-wrapper">
      {/* HEADER */}
      <div className="code-header">
        <span className="code-lang">{language}</span>

        <button onClick={handleCopy} className="copy-btn">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* CODE */}
      <div className="code-body">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            background: 'transparent',
            margin: 0,
            padding: 0,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}