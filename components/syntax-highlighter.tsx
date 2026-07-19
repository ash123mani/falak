'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { createHighlighter, type Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: [
        'javascript', 'typescript', 'jsx', 'tsx',
        'python', 'ruby', 'bash', 'css', 'html',
        'json', 'markdown', 'sql', 'yaml', 'go',
        'rust', 'java', 'kotlin', 'swift', 'dart',
      ],
    })
  }
  return highlighterPromise
}

const LANG_LABELS: Record<string, string> = {
  javascript: 'JS',
  typescript: 'TS',
  jsx: 'JSX',
  tsx: 'TSX',
  python: 'Py',
  bash: 'Bash',
  css: 'CSS',
  html: 'HTML',
  json: 'JSON',
  markdown: 'MD',
  sql: 'SQL',
  yaml: 'YAML',
  go: 'Go',
  rust: 'Rust',
  java: 'Java',
  kotlin: 'Kt',
  swift: 'Swift',
  dart: 'Dart',
  ruby: 'Rb',
}

export function SyntaxHighlighter({
  language,
  code,
}: {
  language: string
  code: string
}) {
  const [html, setHtml] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    getHighlighter().then((hl) => {
      if (!mounted.current) return
      const normalizedLang = hl.getLoadedLanguages().includes(language as any) ? language : 'javascript'
      const result = hl.codeToHtml(code, {
        lang: normalizedLang,
        theme: 'github-dark',
      })
      setHtml(result)
    })
    return () => { mounted.current = false }
  }, [language, code])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  const showLineNumbers = code.split('\n').length > 3
  const langLabel = LANG_LABELS[language] || language

  return (
    <div className="group relative my-8 overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-between border-b border-[#21262d] px-4 py-2.5">
        <span className="rounded-md bg-[#21262d] px-2.5 py-0.5 text-xs font-medium text-[#8b949e]">
          {langLabel}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-[#8b949e] transition-all hover:bg-[#21262d] hover:text-[#c9d1d9]"
        >
          {copied ? (
            <>
              <FiCheck size={14} /> Copied
            </>
          ) : (
            <>
              <FiCopy size={14} /> Copy
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        {html ? (
          <div
            className={`shiki-root${showLineNumbers ? ' line-numbers' : ''}`}
            style={{
              padding: showLineNumbers ? '1.25rem 0' : '1.25rem 1.5rem',
              fontSize: '1.4rem',
              lineHeight: '1.6',
              backgroundColor: '#24292e',
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre
            style={{
              padding: '1.25rem 1.5rem',
              fontSize: '1.4rem',
              lineHeight: '1.6',
              color: '#c9d1d9',
              fontFamily: "SF Mono, Fira Code, monospace",
            }}
          >
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
