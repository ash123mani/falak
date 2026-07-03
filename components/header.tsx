'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from './providers'

const navLinks = [
  { href: '/', label: 'Blog' },
  { href: '/contact', label: 'About' },
]

export default function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--page-bg)]/80 backdrop-blur-lg transition-colors">
      <div className="mx-auto flex h-20 max-w-[1120px] items-center justify-between px-8 max-md:h-16 max-md:px-4">
        <Link href="/" className="no-underline group">
          <div className="flex h-11 w-[120px] items-center justify-center rounded-lg border border-[var(--border-color-bold)] bg-[var(--button-background)] transition-all duration-300 group-hover:scale-105 group-hover:opacity-90 max-md:h-9 max-md:w-[90px]">
            <span className="m-0 text-2xl font-bold text-[var(--page-bg)] max-md:text-base">
              Falak
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 max-md:hidden">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-5 py-2.5 text-[1.5rem] font-medium no-underline transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--button-background)] text-[var(--page-bg)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--tag-bg)] hover:text-[var(--color-primary)]'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <button
            onClick={toggleTheme}
            className="ml-3 flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-[var(--tag-bg)] hover:text-[var(--color-primary)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </nav>

        <div className="hidden max-md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-color-bold)] hover:text-[var(--color-primary)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-color-bold)] hover:text-[var(--color-primary)]"
            aria-label="Open menu"
          >
            <HiMenu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 flex h-full w-64 flex-col border-l border-[var(--border-color)] bg-[var(--page-bg)] p-6 shadow-xl"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--color-primary)]"
                >
                  <HiX size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map(({ href, label }, i) => {
                  const isActive = pathname === href
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`block rounded-lg px-4 py-3 text-base font-medium no-underline transition-colors ${
                          isActive
                            ? 'bg-[var(--button-background)] text-[var(--page-bg)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--tag-bg)] hover:text-[var(--color-primary)]'
                        }`}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
