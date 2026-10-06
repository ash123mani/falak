# Falak

> A fast, accessible blog about front-end web development — built with Next.js, TypeScript, Tailwind CSS, and Contentful.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Contentful](https://img.shields.io/badge/Contentful-CMS-2478CC?style=flat-square&logo=contentful&logoColor=white)](https://www.contentful.com)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Content Model](#content-model)
- [Available Scripts](#available-scripts)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [Deployment](#deployment)
- [Author](#author)

---

## Overview

**Falak** is a statically-exported Next.js blog powered by Contentful as a headless CMS. Articles are authored as Contentful rich text and rendered with a custom renderer that adds syntax-highlighted code blocks, a table of contents, image captions, and a reading-progress indicator.

The site is fully pre-rendered at build time (`output: 'export'`), ships no server runtime, and can be hosted on any static host. RSS, sitemap, and robots files are generated automatically from CMS content.

## Features

- **Static-first** — every page is pre-rendered to HTML at build time for fast loads and simple hosting.
- **Headless CMS** — content served from Contentful; no content lives in the repository.
- **Rich text renderer** — headings, ordered/unordered lists, blockquotes, images with captions, inline code, links, and horizontal rules.
- **Syntax highlighting** — [Shiki](https://shiki.style) (`github-dark`) with a line-number gutter, language badge, and copy-to-clipboard.
- **Table of contents** — auto-generated from document headings, with a sticky sidebar on desktop and a collapsible panel on mobile, plus scroll-spy active highlighting.
- **Dark / light theme** — persisted to `localStorage`, with a no-flash inline script to prevent theme flicker.
- **Search & filtering** — client-side search and tag filters on the index page, with grid and list views.
- **Reading UX** — reading-progress bar, estimated reading time, back-to-top, related posts by shared tags, and share buttons.
- **Comments** — GitHub-backed comments via [Gitalk](https://github.com/gitalk/gitalk).
- **SEO** — per-post metadata, Open Graph / Twitter cards, JSON-LD `Article` schema, RSS feed, and sitemap.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, static export) |
| UI | [React 19](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) (CSS-first config) |
| CMS | [Contentful](https://www.contentful.com) + [`@contentful/rich-text-react-renderer`](https://www.npmjs.com/package/@contentful/rich-text-react-renderer) |
| Code highlighting | [Shiki 4](https://shiki.style) |
| Animation | [Framer Motion 12](https://www.framer.com/motion/) |
| Comments | [Gitalk 1.8](https://github.com/gitalk/gitalk) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |

## Project Structure

```
falak-nextjs/
├── app/
│   ├── layout.tsx              # Root layout: header, footer, theme provider, metadata
│   ├── page.tsx                # Blog index
│   ├── globals.css             # Design tokens + global styles (Tailwind v4 @theme)
│   ├── blog/[slug]/page.tsx    # Article page (SSG)
│   ├── about/[slug]/page.tsx   # Experience detail pages (SSG)
│   ├── contact/page.tsx        # Contact / about page
│   ├── feed.xml/route.ts       # Generated RSS feed
│   ├── sitemap.ts              # Generated sitemap
│   ├── robots.ts               # Generated robots.txt
│   └── not-found.tsx
├── components/
│   ├── blog-elements.tsx       # Contentful rich-text renderer
│   ├── syntax-highlighter.tsx  # Shiki code block with copy button
│   ├── table-of-contents.tsx   # Sidebar + inline TOC with scroll-spy
│   ├── blog-card.tsx           # Post card
│   ├── blog-list.tsx           # Client-side search / tag filtering
│   ├── blog-filters.tsx        # Search input, tag chips, view toggle
│   ├── header.tsx / footer.tsx
│   ├── reading-progress.tsx / back-to-top.tsx
│   ├── share-buttons.tsx / gitalk-comments.tsx
│   ├── related-posts.tsx / author-bio.tsx / newsletter-cta.tsx
│   └── providers.tsx           # Theme + motion providers
├── lib/
│   ├── contentful.ts           # Contentful client and data access layer
│   ├── types.ts                # Shared TypeScript types
│   └── utils.ts                # Date formatting, slugs, TOC extraction
├── next.config.ts              # Static export configuration
└── netlify.toml                # Netlify build configuration
```

## Getting Started

### Prerequisites

- **Node.js** 20 or later
- A **Contentful** space with the content model described [below](#content-model)
- A **GitHub OAuth app** and a public repository (for Gitalk comments)

### Installation

```bash
git clone https://github.com/ash123mani/falak.git
cd falak-nextjs
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Contentful (required)
CONTENTFUL_SPACE_ID="your_space_id"
CONTENTFUL_ACCESS_TOKEN="your_delivery_access_token"

# Canonical site URL (optional — used for the sitemap and RSS feed)
NEXT_PUBLIC_SITE_URL="https://your-domain.com"

# Gitalk comments (optional — required only for comments)
NEXT_PUBLIC_GIT_CLIENT_ID="your_github_oauth_client_id"
NEXT_PUBLIC_GIT_CLIENT_SECRET="your_github_oauth_client_secret"
NEXT_PUBLIC_GIT_REPO="your_comments_repository"
```

| Variable | Required | Description |
| --- | --- | --- |
| `CONTENTFUL_SPACE_ID` | Yes | Contentful space ID |
| `CONTENTFUL_ACCESS_TOKEN` | Yes | Contentful Content Delivery API token |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL used in the sitemap and feed (falls back to a built-in default if unset) |
| `NEXT_PUBLIC_GIT_CLIENT_ID` | No | GitHub OAuth app client ID for Gitalk |
| `NEXT_PUBLIC_GIT_CLIENT_SECRET` | No | GitHub OAuth app client secret for Gitalk |
| `NEXT_PUBLIC_GIT_REPO` | No | Public GitHub repository used to store comment issues |

> **Note:** Never commit `.env.local`. The GitHub Client Secret is exposed to the browser by Gitalk's design — use a dedicated OAuth app and repository for comments.

### Running Locally

```bash
npm run dev
```

The dev server runs on **http://localhost:8001**.

To preview the production build (static export):

```bash
npm run build
npx serve out
```

## Content Model

Content is stored in Contentful under three content types.

**`blogs`** — a blog post

| Field | Type | Notes |
| --- | --- | --- |
| `homepage` | Short text | Post title |
| `slug` | Short text | URL segment (leading `/` is normalized) |
| `body` | Rich text | Article body |
| `excerpt` | Short text | Summary shown on cards and used for metadata |
| `publishedDate` | Date | Publication date |
| `updatedDate` | Date | Optional last-updated date |
| `tags` | Short text | Space-separated tags, e.g. `React TypeScript` |
| `heroImage` | Asset | Optional cover image |
| `seoTitle` / `seoDescription` | Short text | Optional SEO overrides |

**`aboutPage`** — the about page (`seoTitle`, `mySummary`, `experienceSummary`, `workExperience` references).

**`aboutDetails`** — experience detail pages (`mainHeading`, `infoCards` references).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 8001 |
| `npm run build` | Build and statically export the site to `out/` |
| `npm run start` | Start the Next.js server (not used for static export) |
| `npm run lint` | Run ESLint |

## Design System

Tokens are defined once in `app/globals.css` using Tailwind v4's CSS-first `@theme`. Because the root font size is `62.5%` (`1rem = 10px`), Tailwind's rem-based defaults are re-authored to their intended pixel values:

- **Type scale** — a 1.25 modular scale anchored at `1.6rem` (16px): `12 / 14 / 16 / 20 / 25 / 31 / 39`.
- **Spacing** — a 4px grid (`--spacing: 0.4rem`), so `p-6` = 24px, `gap-2` = 8px, etc.
- **Radii** — standard radius values at a 10px root.
- **Theming** — light and dark palettes are exposed as CSS custom properties and toggled via a `.dark` class on `<html>`.

## Accessibility

The UI targets **WCAG 2.1 AA**:

- **Text contrast** — all text/background pairings meet the 4.5:1 minimum in both themes.
- **Non-text contrast** — form controls and icon buttons use a dedicated `--border-control` token that meets the 3:1 minimum.
- **Focus visibility** — a global `:focus-visible` outline is provided for keyboard users.
- **Semantic markup** — landmark elements (`header`, `main`, `nav`, `article`), a logical heading hierarchy, and ARIA labels on icon-only controls.

## Deployment

The project is configured for [Netlify](https://www.netlify.com) via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "out"
```

Add the environment variables listed above in the Netlify dashboard. Because the site is a static export, it also deploys to any static host (GitHub Pages, Cloudflare Pages, Vercel, S3, etc.).

## Author

**Ashutosh Mani Tripathi**

- GitHub: [@ash123mani](https://github.com/ash123mani)
- X / Twitter: [@ashutos58989559](https://twitter.com/ashutos58989559)

---

_No license has been specified for this repository._