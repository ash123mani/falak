import type { Document } from '@contentful/rich-text-types'

export interface TocItem {
  id: string
  text: string
  level: number
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  body: Document
  publishedDate: string
  tags: string
  heroImage?: ContentfulAsset
  excerpt: string
  seoTitle?: string
  seoDescription?: string
  updatedDate?: string
}

export interface ContentfulAsset {
  title: string
  description?: string
  url: string
  width: number
  height: number
  contentType: string
}

export interface InfoCardData {
  id: string
  info: Document
  imageSrc?: ContentfulAsset[]
  redirectUrl?: string
  knowMoreText?: string
  cardIdUsedForNavigation?: string
}

export interface AboutData {
  seoTitle?: string
  mySummary: Document
  experienceSummary: {
    title: string
    items: { title: string; tags: string[] }[]
  }
  workExperience: InfoCardData[]
}

export interface AboutDetailsData {
  mainHeading: Document
  infoCards: InfoCardData[]
}
