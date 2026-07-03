'use client'

import Link from 'next/link'
import { FiGithub, FiMail, FiHeart } from 'react-icons/fi'
import { FadeInView } from './providers'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border-color)] bg-[var(--card-bg)] transition-colors max-md:mt-16">
      <div className="mx-auto max-w-[1120px] px-8 py-16 max-md:px-4 max-md:py-12">
        <FadeInView>
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="max-w-md">
              <div className="mb-4 flex h-11 w-[120px] items-center justify-center rounded-lg border border-[var(--border-color-bold)] bg-[var(--button-background)] max-md:h-9 max-md:w-[90px]">
                <span className="text-2xl font-bold text-[var(--page-bg)] max-md:text-base">
                  Falak
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Thoughts on front-end development, React, JavaScript, and the web platform.
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                Navigate
              </h4>
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="text-sm text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--link-color)]"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--link-color)]"
                >
                  About
                </Link>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                Connect
              </h4>
              <div className="flex gap-3">
                <a
                  href="mailto:copycutsave@gmail.com"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-all hover:border-[var(--link-color)] hover:text-[var(--link-color)]"
                  aria-label="Email"
                >
                  <FiMail size={16} />
                </a>
                <a
                  href="https://github.com/ash123mani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-all hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
                  aria-label="GitHub"
                >
                  <FiGithub size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-color)] pt-8">
            <p className="text-xs text-[var(--text-secondary)]">
              &copy; {new Date().getFullYear()} Falak. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              Built with <FiHeart size={12} className="text-red-500" /> using Next.js & Contentful
            </p>
          </div>
        </FadeInView>
      </div>
    </footer>
  )
}
