'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import BlogFilters from './blog-filters'
import BlogCard from './blog-card'

export default function BlogList({ posts }: { posts: any[] }) {
  const searchParams = useSearchParams()
  const search = searchParams.get('q') || ''
  const tag = searchParams.get('tag')
  const view = searchParams.get('view') || 'grid'

  const allTags = useMemo(
    () =>
      Array.from(new Set(posts.flatMap((p) => p.tags.split(' ').filter(Boolean)))),
    [posts],
  )

  const filtered = useMemo(
    () =>
      posts.filter((p) => {
        const matchesSearch =
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(search.toLowerCase())
        const matchesTag = !tag || p.tags.split(' ').includes(tag)
        return matchesSearch && matchesTag
      }),
    [posts, search, tag],
  )

  return (
    <div>
      <BlogFilters tags={allTags} />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-[var(--text-secondary)]">
            No posts found
          </p>
          <p className="mt-1 text-sm text-[var(--color-primary-light)]">
            Try adjusting your search or filter
          </p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 max-md:flex max-md:flex-col max-md:gap-0">
          {filtered.map((post, i) => (
            <BlogCard
              key={post.id}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              publishDate={post.publishedDate}
              tag={post.tags.split(' ')[0]}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((post, i) => (
            <BlogCard
              key={post.id}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              publishDate={post.publishedDate}
              tag={post.tags.split(' ')[0]}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  )
}
