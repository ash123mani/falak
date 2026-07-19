'use client'

import { useEffect, useState } from 'react'
import type { TocItem } from '@/lib/types'

function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  return activeId
}

export function TableOfContentsSidebar({ items }: { items: TocItem[] }) {
  const activeId = useActiveHeading(items)

  if (items.length === 0) return null

  return (
    <nav className="w-56">
      <h4 className="m-0 mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary-light)]">
        On this page
      </h4>
      <ul className="m-0 list-none space-y-1 p-0">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              title={item.text}
              className={`block truncate rounded-md px-3 py-1.5 text-sm no-underline transition-colors ${
                activeId === item.id
                  ? 'bg-[var(--tag-bg)] font-medium text-[var(--link-color)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--color-primary)]'
              }`}
              style={{ paddingLeft: `${12 + (item.level - 2) * 12}px` }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function TableOfContentsInline({ items }: { items: TocItem[] }) {
  const activeId = useActiveHeading(items)

  if (items.length === 0) return null

  return (
    <details className="mb-8 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
      <summary className="cursor-pointer px-5 py-3 text-sm font-semibold text-[var(--color-primary)]">
        On this page
      </summary>
      <nav className="border-t border-[var(--border-color)] px-5 py-3">
        <ul className="m-0 list-none space-y-1 p-0">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-md px-3 py-1.5 text-sm no-underline transition-colors ${
                  activeId === item.id
                    ? 'font-medium text-[var(--link-color)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--color-primary)]'
                }`}
                style={{ paddingLeft: `${8 + (item.level - 2) * 12}px` }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  )
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <>
      <div className="xl:hidden">
        <TableOfContentsInline items={items} />
      </div>
      <div className="hidden xl:block">
        <div className="sticky top-28">
          <TableOfContentsSidebar items={items} />
        </div>
      </div>
    </>
  )
}
