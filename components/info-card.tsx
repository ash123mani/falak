'use client'

import Link from 'next/link'
import Image from 'next/image'
import RichTextRenderer from './blog-elements'
import type { ContentfulAsset } from '@/lib/types'
import type { Document } from '@contentful/rich-text-types'
import { FiArrowRight } from 'react-icons/fi'

export default function InfoCard({
  richTextJson,
  imageSrc,
  knowMoreText,
  redirectUrl,
  direction,
  showRedirect,
}: {
  richTextJson: Document
  imageSrc?: ContentfulAsset | null
  knowMoreText?: string
  redirectUrl?: string
  direction: 'row' | 'reverse'
  showRedirect: boolean
}) {
  const content = (
    <div className="flex-[1.5] min-w-[280px]">
      <RichTextRenderer document={richTextJson} />
      {showRedirect && redirectUrl && (
        <Link
          href={redirectUrl}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--link-color)] no-underline transition-colors hover:text-[var(--link-hover)] max-md:hidden"
        >
          {knowMoreText || 'Know More'} <FiArrowRight size={14} />
        </Link>
      )}
    </div>
  )

  const media = (
    <div className="flex min-h-[280px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--tag-bg)] max-md:min-h-[200px]">
      {imageSrc && (
        <Image
          src={imageSrc.url}
          alt={imageSrc.title || 'Content image'}
          width={imageSrc.width || 800}
          height={imageSrc.height || 600}
          className="h-full max-h-[280px] w-full object-contain transition-transform duration-500 hover:scale-105 max-md:max-h-[200px]"
        />
      )}
      {showRedirect && redirectUrl && (
        <Link
          href={redirectUrl}
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--link-color)] no-underline md:hidden"
        >
          {knowMoreText || 'Know More'} <FiArrowRight size={14} />
        </Link>
      )}
    </div>
  )

  return (
    <div
      className={`flex w-full flex-wrap items-start gap-10 max-md:flex-col ${
        direction === 'reverse' ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {content}
      {media}
    </div>
  )
}
