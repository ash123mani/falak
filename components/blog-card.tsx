'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCalendar, FiTag } from 'react-icons/fi'

export default function BlogCard({
  slug,
  title,
  excerpt,
  publishDate,
  tag,
  index = 0,
}: {
  slug: string
  title: string
  excerpt: string
  publishDate: string
  tag: string
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Link
        href={`/blog${slug.startsWith('/') ? slug : '/' + slug}`}
        className="group relative flex h-full flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 no-underline transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-color-bold)] hover:shadow-lg max-md:rounded-xl max-md:border-x-0 max-md:border-b max-md:border-t max-md:p-5 max-md:hover:-translate-y-0 max-md:hover:shadow-none"
      >
        <div className="flex flex-1 flex-col">
          <h2 className="m-0 mb-2 text-xl font-semibold leading-snug tracking-tight text-[var(--color-primary)] transition-colors duration-200 group-hover:text-[var(--link-color)] max-md:text-lg">
            {title}
          </h2>
          <p className="m-0 mb-4 flex-1 text-sm leading-relaxed text-[var(--color-primary-medium)] line-clamp-3">
            {excerpt}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-4">
          <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary-light)]">
            <FiCalendar size={12} />
            {publishDate}
          </span>
          {tag && (
            <span className="flex items-center gap-1.5 rounded-full bg-[var(--tag-bg)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
              <FiTag size={11} />
              {tag}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
