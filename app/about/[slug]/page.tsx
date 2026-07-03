import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAboutDetailsBySlug, getAllAboutDetailSlugs } from '@/lib/contentful'
import RichTextRenderer from '@/components/blog-elements'
import InfoCard from '@/components/info-card'
import BackToTop from '@/components/back-to-top'
import type { Document } from '@contentful/rich-text-types'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllAboutDetailSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getAboutDetailsBySlug(slug)
  if (!data) return {}
  const text =
    (data.mainHeading as any)?.content?.[0]?.content?.[0]?.value || 'About'
  return { title: text }
}

export default async function AboutDetailsPage({ params }: Props) {
  const { slug } = await params
  const data = await getAboutDetailsBySlug(slug)

  if (!data) notFound()

  const mainHeadingJson = data.mainHeading as Document
  const infoCards = data.infoCards || []

  return (
    <div className="py-8 max-md:py-4">
      <Link
        href="/contact"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--link-color)]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 12L6 8L10 4" />
        </svg>
        Back to About
      </Link>

      <section className="max-w-[75ch]">
        <RichTextRenderer document={mainHeadingJson} />
      </section>

      {infoCards.map((card, index) => {
        const richTextJson = card.info as Document
        const direction: 'row' | 'reverse' = index % 2 === 0 ? 'row' : 'reverse'
        const imageSrc = card.imageSrc?.[0] || null

        return (
          <section
            key={card.id}
            id={card.cardIdUsedForNavigation}
            className="my-12 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 max-md:p-5"
          >
            <InfoCard
              richTextJson={richTextJson}
              imageSrc={imageSrc}
              knowMoreText={card.knowMoreText}
              direction={direction}
              showRedirect={false}
            />
          </section>
        )
      })}

      <BackToTop />
    </div>
  )
}
