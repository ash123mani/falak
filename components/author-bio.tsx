export default function AuthorBio() {
  return (
    <div className="mx-auto mt-12 max-w-[75ch]">
      <div className="flex items-start gap-5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
          A
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="m-0 text-base font-semibold text-[var(--color-primary)]">
            Ashutosh Mani Tripathi
          </h4>
          <p className="m-0 mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
            Front-end web developer writing about React, JavaScript, TypeScript, and the web platform.
          </p>
          <div className="mt-3 flex gap-4">
            <a
              href="https://github.com/ash123mani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[var(--link-color)] no-underline hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/ashutos58989559"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[var(--link-color)] no-underline hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
