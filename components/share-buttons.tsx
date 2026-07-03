'use client'

import { usePathname } from 'next/navigation'
import { FiTwitter, FiLinkedin, FiLink } from 'react-icons/fi'
import { useState } from 'react'

export default function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname()
  const shareUrl = typeof window !== 'undefined' ? window.location.href : pathname
  const shareText = encodeURIComponent(title)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto mt-12 flex max-w-[75ch] flex-col items-center gap-4 border-t border-[var(--border-color)] pt-8">
      <span className="text-sm font-medium text-[var(--text-secondary)]">Share this post</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
              '_blank'
            )
          }
          className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-sky-500 hover:text-sky-500 hover:shadow-md"
        >
          <FiTwitter size={16} />
          Twitter
        </button>
        <button
          onClick={() =>
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')
          }
          className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-blue-700 hover:text-blue-700 hover:shadow-md"
        >
          <FiLinkedin size={16} />
          LinkedIn
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[var(--link-color)] hover:text-[var(--link-color)] hover:shadow-md"
        >
          <FiLink size={16} />
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  )
}
