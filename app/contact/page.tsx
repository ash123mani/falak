import { getAboutData } from '@/lib/contentful'
import AboutContent from '@/components/about-content'

export default async function ContactPage() {
  const about = await getAboutData()

  if (!about) {
    return <div className="py-16 text-center text-[var(--text-secondary)]">About data not found.</div>
  }

  return <AboutContent about={about} />
}
