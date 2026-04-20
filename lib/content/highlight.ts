export function highlightText(text: string) {
  if (!text || typeof window === 'undefined') return

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let node: Node | null

  while ((node = walker.nextNode())) {
    const value = node.nodeValue
    if (!value || !value.includes(text)) continue

    const parts = value.split(text)
    const fragment = document.createDocumentFragment()

    parts.forEach((part, index) => {
      fragment.appendChild(document.createTextNode(part))

      if (index < parts.length - 1) {
        const mark = document.createElement('mark')
        mark.className = 'source-highlight'
        mark.textContent = text
        fragment.appendChild(mark)

        setTimeout(() => {
          mark.classList.add('fade')
        }, 1200)
      }
    })

    node.parentNode?.replaceChild(fragment, node)

    const firstMark = document.querySelector('.source-highlight')
    if (firstMark instanceof HTMLElement) {
      firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    break
  }
}