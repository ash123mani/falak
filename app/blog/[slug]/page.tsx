import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/contentful'
import RichTextRenderer from '@/components/blog-elements'
import GitalkComments from '@/components/gitalk-comments'
import ShareButtons from '@/components/share-buttons'
import ReadingProgress from '@/components/reading-progress'
import BackToTop from '@/components/back-to-top'
import { formatDateLong } from '@/lib/utils'
import type { Document } from '@contentful/rich-text-types'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) return {}

  const imageUrl = post.heroImage?.url

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      ...(imageUrl && { images: [{ url: imageUrl, width: 400, height: 300 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    },
  }
}

function calculateReadingTime(text: string) {
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) notFound()

  const bodyJson = post.body as Document
  const readingTime = calculateReadingTime(post.excerpt || '')
  const tags = (post.tags || '').split(' ').filter(Boolean)

  return (
    <>
      <ReadingProgress />
      <article className="py-8 max-md:py-4">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--link-color)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8L10 4" />
          </svg>
          Back to Blog
        </Link>

        <header className="mb-12 max-w-[75ch] mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--tag-bg)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="m-0 mb-4 text-[3.6rem] font-bold leading-tight tracking-tight max-md:text-[2.4rem]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-primary-light)]">
            <span>{formatDateLong(post.publishedDate)}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-primary-light)]" />
            <span>{readingTime}</span>
          </div>
        </header>

        <div className="mx-auto max-w-[75ch]">
          <RichTextRenderer document={bodyJson} />
        </div>

        <ShareButtons title={post.title} />

        <GitalkComments />
      </article>
      <BackToTop />
    </>
  )
}
