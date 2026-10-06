'use client'

import { useState, type FormEvent } from 'react'

export default function NewsletterCta() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'subscribed'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('subscribed')
    setEmail('')
  }

  if (status === 'subscribed') {
    return (
      <div className="mx-auto mt-12 max-w-[75ch]">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 text-center">
          <p className="m-0 text-sm font-medium text-[var(--color-primary)]">
            You are subscribed!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-12 max-w-[75ch]">
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 text-center">
        <h3 className="m-0 text-lg font-bold text-[var(--color-primary)]">
          Stay in the loop
        </h3>
        <p className="mx-auto mt-2 mb-6 max-w-sm text-sm text-[var(--text-secondary)]">
          Get notified when I publish new articles. No spam, unsubscribe anytime.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm gap-3">
          <input
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-1 rounded-xl border border-[var(--border-color)] bg-[var(--page-bg)] px-4 py-2.5 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-primary-light)] transition-colors focus:border-[var(--link-color)] focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-[var(--button-background)] px-5 py-2.5 text-sm font-medium text-[var(--page-bg)] transition-opacity hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
