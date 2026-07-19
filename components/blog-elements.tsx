import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { SyntaxHighlighter } from './syntax-highlighter'
import { slugify, extractTextFromContent } from '@/lib/utils'
import type { Document, Block, Inline } from '@contentful/rich-text-types'
import type { ReactNode } from 'react'

const LANG_MAP: Record<string, string> = {
  js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
  py: 'python', rb: 'ruby', sh: 'bash', bash: 'bash',
  css: 'css', html: 'html', json: 'json', md: 'markdown',
  sql: 'sql', yml: 'yaml', yaml: 'yaml', go: 'go',
  rust: 'rust', rs: 'rust', java: 'java', kt: 'kotlin',
  swift: 'swift', dart: 'dart',
}

function detectLanguage(value: string): string | null {
  const firstLine = value.trim().split('\n')[0]
  const match = firstLine.match(/^\/\/\s*lang:\s*(\w+)/i) || firstLine.match(/^#\s*lang:\s*(\w+)/i)
  if (match && LANG_MAP[match[1]]) return LANG_MAP[match[1]]
  if (match) return match[1]
  return null
}

function cleanCodeContent(value: string): string {
  const lines = value.split('\n')
  if (lines[0].match(/^\/\/\s*lang:/) || lines[0].match(/^#\s*lang:/)) {
    return lines.slice(1).join('\n').trim()
  }
  return value.trim()
}

function getRawCode(node: Block | Inline): string {
  if ('content' in node) {
    return (node.content as any[]).map((n: any) => n.value).join('\n')
  }
  return ''
}

function isMultiLineCode(child: any): boolean {
  return child.marks?.some((m: any) => m.type === 'code') && (child.value || '').includes('\n')
}

function extractCodeBlocks(doc: Document): Document {
  const newContent = doc.content.flatMap((node: any) => {
    if (node.nodeType === BLOCKS.PARAGRAPH && node.content?.some(isMultiLineCode)) {
      const result: any[] = []
      let textBuffer: any[] = []
      let prevWasCode = false

      for (const child of node.content) {
        if (isMultiLineCode(child)) {
          if (textBuffer.length > 0) {
            const last = textBuffer[textBuffer.length - 1]
            if (last.value) {
              last.value = last.value.replace(/\n+$/, '')
            }
            result.push({ ...node, content: textBuffer })
            textBuffer = []
          }
          result.push({
            nodeType: BLOCKS.PARAGRAPH,
            content: [
              {
                nodeType: 'text',
                value: child.value,
                marks: [{ type: 'code' }],
              },
            ],
          })
          prevWasCode = true
        } else {
          if (prevWasCode && child.value) {
            child.value = child.value.replace(/^\n+/, '')
          }
          textBuffer.push(child)
          prevWasCode = false
        }
      }

      if (textBuffer.length > 0) {
        result.push({ ...node, content: textBuffer })
      }

      return result
    }
    return [node]
  })

  return { ...doc, content: newContent }
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  return <SyntaxHighlighter language={language} code={code} />
}

function HeadingBox({ as: Tag, headingId, children }: { as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; headingId: string; children: ReactNode }) {
  return (
    <Tag id={headingId} className="group relative scroll-mt-24" style={{ margin: '3rem 0 1.5rem 0' }}>
      <a href={`#${headingId}`} className="absolute -left-6 opacity-0 group-hover:opacity-100 text-[var(--color-primary-light)] font-normal transition-opacity max-md:hidden" aria-label={`Link to this section`}>
        #
      </a>
      {children}
    </Tag>
  )
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-[#1e1e2e] px-1.5 py-0.5 font-mono text-[0.85em] text-[#e1e4e8] break-words">
      {children}
    </code>
  )
}

function RichTextLink({ href, children }: { href: string; children: ReactNode }) {
  const isAnchor = href.startsWith('#')
  return (
    <a href={href} target={isAnchor ? '_self' : '_blank'} rel={isAnchor ? undefined : 'noopener noreferrer'}
      className="text-[var(--link-color)] no-underline border-b border-transparent transition-[border-color,color] duration-200 hover:border-[var(--link-color)] hover:text-[var(--link-hover)]">
      {children}
    </a>
  )
}

function RichTextImage(node: any) {
  let alt = '', url = '', caption = ''
  if (node.data?.target?.fields) {
    alt = node.data.target.fields.title?.['en-US'] || ''
    url = node.data.target.fields.file?.['en-US']?.url || ''
    caption = node.data.target.fields.description?.['en-US'] || ''
  }
  if (!url) return null
  return (
    <figure className="my-12 text-center">
      <img src={url} alt={alt} loading="lazy"
        className="w-full h-auto rounded-xl border border-[var(--border-color)] max-h-[500px] object-cover object-center shadow-sm" />
      {caption && <figcaption className="mt-3 text-sm text-[var(--color-primary-light)] italic text-center">{caption}</figcaption>}
    </figure>
  )
}

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, _children: ReactNode) => {
      if (node.content?.length === 1 && node.content[0]?.marks?.some((m: any) => m.type === 'code')) {
        const rawCode = getRawCode(node)
        const language = detectLanguage(rawCode) || 'javascript'
        const code = cleanCodeContent(rawCode)
        return <CodeBlock code={code} language={language} />
      }

      return (
        <p className="my-6 text-[1.7rem] leading-relaxed text-[var(--text-body)] max-md:text-[1.6rem] max-md:my-5">
          {_children}
        </p>
      )
    },
    [BLOCKS.HEADING_1]: (node: any, children: ReactNode) => <HeadingBox as="h1" headingId={slugify(extractTextFromContent(node.content))}>{children}</HeadingBox>,
    [BLOCKS.HEADING_2]: (node: any, children: ReactNode) => <HeadingBox as="h2" headingId={slugify(extractTextFromContent(node.content))}>{children}</HeadingBox>,
    [BLOCKS.HEADING_3]: (node: any, children: ReactNode) => <HeadingBox as="h3" headingId={slugify(extractTextFromContent(node.content))}>{children}</HeadingBox>,
    [BLOCKS.HEADING_4]: (node: any, children: ReactNode) => <HeadingBox as="h4" headingId={slugify(extractTextFromContent(node.content))}>{children}</HeadingBox>,
    [BLOCKS.HEADING_5]: (node: any, children: ReactNode) => <HeadingBox as="h5" headingId={slugify(extractTextFromContent(node.content))}>{children}</HeadingBox>,
    [BLOCKS.HEADING_6]: (node: any, children: ReactNode) => <HeadingBox as="h6" headingId={slugify(extractTextFromContent(node.content))}>{children}</HeadingBox>,
    [BLOCKS.OL_LIST]: (_: any, children: ReactNode) => <ol className="my-8 pl-8 space-y-2">{children}</ol>,
    [BLOCKS.UL_LIST]: (_: any, children: ReactNode) => <ul className="my-8 pl-8 space-y-2">{children}</ul>,
    [BLOCKS.LIST_ITEM]: (_: any, children: ReactNode) => (
      <li className="text-[1.7rem] leading-relaxed text-[var(--text-body)] marker:text-[var(--color-primary-medium)] max-md:text-[1.6rem]">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_: any, children: ReactNode) => (
      <blockquote className="my-8 border-l-[3px] border-[var(--blockquote-border)] bg-[var(--blockquote-bg)] py-4 px-6 italic rounded-r-xl">{children}</blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-12 border-0 border-t border-[var(--border-color)]" />,
    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => <RichTextLink href={node.data.uri}>{children}</RichTextLink>,
    'embedded-asset-block': RichTextImage,
  },
  renderText: (text: string) => {
    const trimmed = text.replace(/\n+$/, '')
    if (!trimmed) return text
    const segments = trimmed.split('\n')
    if (segments.length === 1) return segments[0]
    return segments.reduce((children: ReactNode[], textSegment: string, index: number) => {
      return [...children, index > 0 && <br key={index} />, textSegment] as ReactNode[]
    }, [])
  },
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: ReactNode) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text: ReactNode) => <u>{text}</u>,
    [MARKS.CODE]: (text: ReactNode) => <InlineCode>{text}</InlineCode>,
  },

}

export default function RichTextRenderer({ document }: { document: Document }) {
  const processed = extractCodeBlocks(document)
  return <>{documentToReactComponents(processed, options)}</>
}
