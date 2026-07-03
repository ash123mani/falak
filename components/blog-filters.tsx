'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useEffect, FormEvent } from 'react'
import { FiSearch, FiGrid, FiList } from 'react-icons/fi'

export default function BlogFilters({ tags }: { tags: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTag = searchParams.get('tag')
  const currentView = searchParams.get('view') || 'grid'

  const [input, setInput] = useState(searchParams.get('q') || '')

  useEffect(() => {
    setInput(searchParams.get('q') || '')
  }, [searchParams])

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (input) params.set('q', input)
      else params.delete('q')
      const newUrl = params.toString() ? `?${params.toString()}` : '/'
      router.replace(newUrl)
    }, 300)
    return () => clearTimeout(timer)
  }, [input, router, searchParams])

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(key, value)
      else params.delete(key)
      router.push(params.toString() ? `?${params.toString()}` : '/')
    },
    [router, searchParams],
  )

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="relative">
        <FiSearch
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)]"
        />
        <input
          type="text"
          placeholder="Search posts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] py-3 pl-11 pr-4 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-primary-light)] transition-colors focus:border-[var(--link-color)] focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setParam('tag', null)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              !currentTag
                ? 'bg-[var(--button-background)] text-[var(--page-bg)]'
                : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-color-bold)]'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setParam('tag', tag === currentTag ? null : tag)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                tag === currentTag
                  ? 'bg-[var(--button-background)] text-[var(--page-bg)]'
                  : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-color-bold)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-[var(--border-color)] p-1 max-md:hidden">
          <button
            onClick={() => setParam('view', 'grid')}
            className={`rounded-md p-2 transition-colors ${
              currentView === 'grid'
                ? 'bg-[var(--button-background)] text-[var(--page-bg)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--color-primary)]'
            }`}
            aria-label="Grid view"
          >
            <FiGrid size={16} />
          </button>
          <button
            onClick={() => setParam('view', 'list')}
            className={`rounded-md p-2 transition-colors ${
              currentView === 'list'
                ? 'bg-[var(--button-background)] text-[var(--page-bg)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--color-primary)]'
            }`}
            aria-label="List view"
          >
            <FiList size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
