import type { ReactNode } from 'react'

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block w-fit rounded-lg bg-[var(--tag-bg)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors">
      {children}
    </span>
  )
}
