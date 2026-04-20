'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const scrolled = (scrollTop / height) * 100
      setProgress(scrolled)
    }

    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="reading-bar"
      style={{ width: `${progress}%` }}
    />
  )
}