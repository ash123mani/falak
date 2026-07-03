import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ThemeProvider } from '@/components/providers'

export const metadata: Metadata = {
  title: 'Falak - A curated list of blogs about front-end web development',
  description:
    'Falak - The blog and infrequent writings of Ashutosh Mani Tripathi about front-end web development.',
  keywords: 'Learn React, React Article, Redux Blogs, HTML Article, Learn JavaScript, Learn TypeScript',
  openGraph: {
    locale: 'en_US',
    siteName: 'Falak',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ashutos58989559',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Header />
          <main className="mx-auto w-full max-w-[1120px] flex-1 border-x border-[var(--border-color)] bg-[var(--page-bg)] px-8 min-h-[calc(100vh-var(--header-height))] max-md:border-x-0 max-md:px-4 max-md:min-h-[calc(100vh-64px)]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
