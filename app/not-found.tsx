import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height))] w-full flex-col items-center justify-center px-8 text-center">
      <span className="text-8xl font-extrabold tracking-tight text-[var(--border-color)] max-md:text-6xl">
        404
      </span>
      <h1 className="-mt-4 mb-2 text-2xl font-bold max-md:text-xl">
        Page not found
      </h1>
      <p className="mb-8 text-sm text-[var(--text-secondary)] max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-color-bold)] bg-[var(--button-background)] px-5 py-3 text-sm font-medium text-[var(--page-bg)] no-underline transition-all hover:opacity-90"
      >
        <FiArrowLeft size={16} />
        Go Back Home
      </Link>
    </div>
  )
}
