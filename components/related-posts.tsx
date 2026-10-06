import Link from 'next/link'
import type { BlogPost } from '@/lib/types'

export default function RelatedPosts({ posts, currentSlug }: { posts: BlogPost[]; currentSlug: string }) {
  const filtered = posts.filter((p) => p.slug !== currentSlug)
  if (filtered.length === 0) return null

  return (
    <section className="mx-auto mt-16 max-w-[75ch]">
      <h2 className="m-0 mb-6 text-2xl font-bold text-[var(--color-primary)]">Related Posts</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 no-underline transition-all hover:-translate-y-0.5 hover:border-[var(--border-color-bold)] hover:shadow-md"
          >
            <h3 className="m-0 mb-2 text-sm font-semibold leading-snug text-[var(--color-primary)] transition-colors group-hover:text-[var(--link-color)] line-clamp-2">
              {post.title}
            </h3>
            <p className="m-0 text-xs leading-relaxed text-[var(--color-primary-light)] line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
