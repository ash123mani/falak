import { createClient } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import type {
  BlogPost,
  AboutData,
  AboutDetailsData,
  InfoCardData,
  ContentfulAsset,
} from './types'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

function parseContentfulAsset(asset: any): ContentfulAsset | undefined {
  if (!asset?.fields) return undefined
  return {
    title: asset.fields.title || '',
    description: asset.fields.description || undefined,
    url: `https:${asset.fields.file.url}`,
    width: asset.fields.file.details?.image?.width || 0,
    height: asset.fields.file.details?.image?.height || 0,
    contentType: asset.fields.file.contentType || '',
  }
}

function parseInfoCard(item: any): InfoCardData {
  const fields = item.fields
  return {
    id: item.sys.id,
    info: fields.info,
    imageSrc: fields.imageSrc
      ? fields.imageSrc.map(parseContentfulAsset).filter(Boolean)
      : undefined,
    redirectUrl: fields.redirectUrl || undefined,
    knowMoreText: fields.knowMoreText || undefined,
    cardIdUsedForNavigation: fields.cardIdUsedForNavigation || undefined,
  }
}

function parseBlogPost(item: any): BlogPost {
  const fields = item.fields
  return {
    id: item.sys.id,
    slug: fields.slug || '',
    title: fields.homepage || '',
    body: fields.body,
    publishedDate: fields.publishedDate || '',
    tags: fields.tags || '',
    heroImage: fields.heroImage ? parseContentfulAsset(fields.heroImage) : undefined,
    excerpt: fields.excerpt || '',
    seoTitle: fields.seoTitle || undefined,
    seoDescription: fields.seoDescription || undefined,
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries({
    content_type: 'blogs',
    order: ['-fields.publishedDate'],
  })

  return entries.items.map(parseBlogPost)
}

export async function getBlogPostBySlug(rawSlug: string): Promise<BlogPost | null> {
  const slug = rawSlug.startsWith('/') ? rawSlug : `/${rawSlug}`
  const entries = await client.getEntries({
    content_type: 'blogs',
    'fields.slug': slug,
    limit: 1,
  })

  if (!entries.items.length) return null
  return parseBlogPost(entries.items[0])
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const entries = await client.getEntries({
    content_type: 'blogs',
    select: ['fields.slug'],
  })

  const slugs = entries.items.map((item) => item.fields.slug).filter(Boolean) as string[]
  return slugs.map((s) => (s.startsWith('/') ? s.slice(1) : s))
}

export async function getAboutData(): Promise<AboutData | null> {
  const entries = await client.getEntries({
    content_type: 'aboutPage',
    limit: 1,
    include: 2,
  })

  if (!entries.items.length) return null

  const fields = entries.items[0].fields as any

  const workExperience: InfoCardData[] = (fields.workExperience || [])
    .filter((exp: any) => exp?.fields)
    .map(parseInfoCard)

  return {
    seoTitle: fields.seoTitle || undefined,
    mySummary: fields.mySummary as Document,
    experienceSummary: fields.experienceSummary || { title: '', items: [] },
    workExperience,
  }
}

export async function getAboutDetailsBySlug(rawSlug: string): Promise<AboutDetailsData | null> {
  const slug = rawSlug.startsWith('/') ? rawSlug : `/${rawSlug}`
  const entries = await client.getEntries({
    content_type: 'aboutDetails',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  })

  if (!entries.items.length) return null

  const fields = entries.items[0].fields as any

  const infoCards: InfoCardData[] = (fields.infoCards || [])
    .filter((card: any) => card?.fields)
    .map(parseInfoCard)

  return {
    mainHeading: fields.mainHeading as Document,
    infoCards,
  }
}

export async function getAllAboutDetailSlugs(): Promise<string[]> {
  const entries = await client.getEntries({
    content_type: 'aboutDetails',
    select: ['fields.slug'],
  })

  const slugs = entries.items.map((item) => item.fields.slug).filter(Boolean) as string[]
  return slugs.map((s) => (s.startsWith('/') ? s.slice(1) : s))
}
