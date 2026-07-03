'use client'

import { useEffect, useRef } from 'react'
import 'gitalk/dist/gitalk.css'

export default function GitalkComments() {
  const containerRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return
    initializedRef.current = true

    import('gitalk').then(({ default: Gitalk }) => {
      const gitalk = new Gitalk({
        clientID: process.env.NEXT_PUBLIC_GIT_CLIENT_ID || '',
        clientSecret: process.env.NEXT_PUBLIC_GIT_CLIENT_SECRET || '',
        repo: process.env.NEXT_PUBLIC_GIT_REPO || '',
        owner: 'ash123mani',
        admin: ['ash123mani'],
        id: window.location.pathname,
        distractionFreeMode: false,
      })
      gitalk.render(containerRef.current!)
    })
  }, [])

  return (
    <section className="mx-auto mt-8 max-w-[75ch] pt-8 max-md:max-w-full">
      <div ref={containerRef} id="gitalk-container" />
    </section>
  )
}
