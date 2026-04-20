export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

export function extractPlainText(blocks: any[] = []): string {
  return blocks
    .map((block) => {
      if (!block || block._type !== 'block' || !Array.isArray(block.children)) {
        return ''
      }

      return block.children
        .map((child: any) => child?.text ?? '')
        .join('')
    })
    .filter(Boolean)
    .join('\n')
}

export function extractHeadings(blocks: any[] = []) {
  return blocks
    .filter(
      (block) =>
        block &&
        block._type === 'block' &&
        (block.style === 'h2' || block.style === 'h3') &&
        Array.isArray(block.children)
    )
    .map((block) => {
      const text = block.children.map((child: any) => child?.text ?? '').join('')
      return {
        text,
        id: slugify(text),
        level: block.style,
      }
    })
}