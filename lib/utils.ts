import type { Document } from '@contentful/rich-text-types'
import type { TocItem } from './types'

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const d = date.getDate()
  const m = date.getMonth() + 1
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

export function formatDateLong(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function extractTextFromContent(content: any[]): string {
  return content.map((node: any) => {
    if (node.nodeType === 'text') return node.value
    if (node.content) return extractTextFromContent(node.content)
    return ''
  }).join('')
}

const HEADING_NODES = ['heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6']

export function extractHeadingsFromDocument(doc: Document): TocItem[] {
  const items: TocItem[] = []
  for (const node of doc.content) {
    const nodeType = (node as any).nodeType
    if (HEADING_NODES.includes(nodeType)) {
      const text = extractTextFromContent((node as any).content).trim()
      if (!text) continue
      const level = parseInt(nodeType.split('-')[1], 10)
      const id = slugify(text)
      items.push({ id, text, level })
    }
  }
  return items
}
