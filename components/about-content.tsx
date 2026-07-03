'use client'

import type { Document } from '@contentful/rich-text-types'
import RichTextRenderer from './blog-elements'
import InfoCard from './info-card'
import Badge from './badge'
import { FadeInView, StaggerContainer, StaggerItem } from './providers'
import { FiMail, FiGithub } from 'react-icons/fi'

export default function AboutContent({
  about,
}: {
  about: {
    mySummary: Document
    experienceSummary: { title: string; items: { title: string; tags: string[] }[] }
    workExperience: any[]
  }
}) {
  const experienceSummary = about.experienceSummary
  const workExperience = about.workExperience || []

  return (
    <div className="py-8 max-md:py-4">
      <FadeInView>
        <h1 className="m-0 text-[3.6rem] font-extrabold leading-tight tracking-tight max-md:text-[2.4rem]">
          About
        </h1>
        <p className="mt-2 text-base text-[var(--text-secondary)] max-md:text-sm">
          Developer, builder, writer
        </p>
      </FadeInView>

      <section className="mt-10 max-w-[75ch]">
        <FadeInView>
          <RichTextRenderer document={about.mySummary} />
        </FadeInView>
      </section>

      <div className="my-12 flex flex-wrap gap-4">
        <FadeInView delay={0.1}>
          <a
            href="mailto:copycutsave@gmail.com"
            className="group flex items-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-5 py-3 text-sm font-medium text-[var(--text-secondary)] no-underline transition-all hover:-translate-y-0.5 hover:border-[var(--link-color)] hover:text-[var(--link-color)] hover:shadow-md"
          >
            <FiMail size={16} />
            copycutsave@gmail.com
          </a>
        </FadeInView>
        <FadeInView delay={0.15}>
          <a
            href="https://github.com/ash123mani"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-5 py-3 text-sm font-medium text-[var(--text-secondary)] no-underline transition-all hover:-translate-y-0.5 hover:border-gray-500 hover:text-gray-800 hover:shadow-md dark:hover:text-gray-200"
          >
            <FiGithub size={16} />
            ash123mani
          </a>
        </FadeInView>
      </div>

      {experienceSummary?.items?.length > 0 && (
        <FadeInView>
          <section className="my-16 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 max-md:p-5">
            <h2 className="m-0 mb-8 text-2xl font-bold tracking-tight">
              {experienceSummary.title}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {experienceSummary.items.map((item) => (
                <div key={item.title}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeInView>
      )}

      {workExperience.length > 0 && (
        <StaggerContainer className="mt-8 flex flex-col gap-8">
          <h2 className="m-0 text-2xl font-bold tracking-tight">Experience</h2>
          {workExperience.map((exp: any, index: number) => {
            const direction: 'row' | 'reverse' = index % 2 === 0 ? 'row' : 'reverse'
            const imageSrc = exp.imageSrc?.[0] || null

            return (
              <StaggerItem key={exp.id}>
                <div
                  id={exp.cardIdUsedForNavigation}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 max-md:p-5"
                >
                  <InfoCard
                    richTextJson={exp.info as Document}
                    imageSrc={imageSrc}
                    redirectUrl={`/about${exp.redirectUrl}`}
                    knowMoreText={exp.knowMoreText || 'Know More ->'}
                    direction={direction}
                    showRedirect={!!exp.redirectUrl}
                  />
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      )}
    </div>
  )
}
