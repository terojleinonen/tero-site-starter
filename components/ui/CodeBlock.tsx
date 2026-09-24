'use client'

import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'

// PrismLight only bundles the languages registered here.
// Anything else renders as plain, unhighlighted text.
const languages = {
  bash, css, diff, javascript, json, jsx, markdown, markup, python, sql, tsx, typescript, yaml,
}

const aliases: Record<string, keyof typeof languages> = {
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  js: 'javascript',
  ts: 'typescript',
  html: 'markup',
  xml: 'markup',
  svg: 'markup',
  md: 'markdown',
  py: 'python',
  yml: 'yaml',
}

for (const [name, grammar] of Object.entries(languages)) {
  SyntaxHighlighter.registerLanguage(name, grammar)
}

function resolveLanguage(language: string) {
  const key = language.toLowerCase()
  return aliases[key] ?? key
}

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
          language={resolveLanguage(language)}
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