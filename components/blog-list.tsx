'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiGrid, FiList } from 'react-icons/fi'
import BlogCard from './blog-card'

export default function BlogList({ posts }: { posts: any[] }) {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach((p) => {
      p.tags.split(' ').filter(Boolean).forEach((t: string) => tags.add(t))
    })
    return Array.from(tags)
  }, [posts])

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase())
      const matchesTag = !selectedTag || p.tags.split(' ').includes(selectedTag)
      return matchesSearch && matchesTag
    })
  }, [posts, search, selectedTag])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex flex-col gap-4 mb-8">
        <div className="relative">
          <FiSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)]"
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] py-3 pl-11 pr-4 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-primary-light)] transition-colors focus:border-[var(--link-color)] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                !selectedTag
                  ? 'bg-[var(--button-background)] text-[var(--page-bg)]'
                  : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-color-bold)]'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  tag === selectedTag
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
              onClick={() => setView('grid')}
              className={`rounded-md p-2 transition-colors ${
                view === 'grid'
                  ? 'bg-[var(--button-background)] text-[var(--page-bg)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--color-primary)]'
              }`}
              aria-label="Grid view"
            >
              <FiGrid size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`rounded-md p-2 transition-colors ${
                view === 'list'
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

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <p className="text-lg font-medium text-[var(--text-secondary)]">
              No posts found
            </p>
            <p className="mt-1 text-sm text-[var(--color-primary-light)]">
              Try adjusting your search or filter
            </p>
          </motion.div>
        ) : view === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 max-md:flex max-md:flex-col max-md:gap-0"
          >
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
              >
                <BlogCard
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  publishDate={post.publishedDate}
                  tag={post.tags.split(' ')[0]}
                  index={i}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: 'easeOut' }}
              >
                <BlogCard
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  publishDate={post.publishedDate}
                  tag={post.tags.split(' ')[0]}
                  index={i}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
