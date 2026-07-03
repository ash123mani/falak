import { getAllBlogPosts } from '@/lib/contentful'
import BlogList from '@/components/blog-list'
import { formatDate } from '@/lib/utils'

export default async function HomePage() {
  const posts = await getAllBlogPosts()

  const formatted = posts.map((p) => ({
    ...p,
    publishedDate: formatDate(p.publishedDate),
  }))

  return (
    <div className="py-8 max-md:py-4">
      <div className="mb-10 max-md:mb-6">
        <h1 className="m-0 text-[3.6rem] font-extrabold leading-tight tracking-tight max-md:text-[2.4rem]">
          Blog
        </h1>
        <p className="mt-2 text-base text-[var(--text-secondary)] max-md:text-sm">
          Thoughts on front-end development, React, and the web platform
        </p>
      </div>
      <BlogList posts={formatted} />
    </div>
  )
}
