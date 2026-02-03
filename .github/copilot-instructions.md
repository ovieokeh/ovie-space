# AI Coding Guidelines for ovie-space

## Architecture Overview

This is a Next.js 16 app with Payload CMS for content management. Payload handles dynamic content (blog posts, books, media, videos, projects) while static content lives in `/content`. The app uses server components for data fetching and client components for interactivity.

## Key Patterns

- **Data Fetching**: Server components call functions from `lib/payload.ts` (e.g., `getPosts()`) to fetch from Payload collections, then pass data to client components
- **Rich Text Handling**: Use `extractTextFromRichText()` helper to convert Lexical rich text to plain text for previews
- **Slug Generation**: Posts collection auto-generates URL-friendly slugs from titles via `beforeValidate` hook
- **Component Structure**: Cards use `motion.div` with `cardVariants` from `/styling/variants.ts` for consistent animations
- **Styling**: Tailwind v4 with custom CSS variables in `globals.css`. Use `cn()` utility from `lib/utils.ts` for class merging. `GlassCard` component provides backdrop-blur panels

## Development Workflow

- **Start dev server**: `pnpm dev` (uses Turbopack)
- **Seed database**: `pnpm seed` populates Payload with content from `/content` files
- **Access admin**: Payload admin interface at `/admin` for content management
- **Build**: `pnpm build` for production builds

## Component Conventions

- **Cards**: Extend base card components (`BookCard`, `MediaCard`) for new content types
- **Pages**: Server component fetches data, passes to client component (e.g., `BlogPage` → `BlogPageClient`)
- **Animations**: Use `sectionVariants` for page sections, `cardVariants` for individual items
- **Images**: Use Next.js `Image` component with error fallbacks to placeholder images

## Content Management

- **Collections**: Define in `/collections/` with Payload config in `payload.config.ts`
- **Static Content**: Edit files in `/content/` for homepage, hobbies, etc.
- **Uploads**: Use `uploads` collection for images, reference via `relationTo: "uploads"`

## Deployment

Configured for Vercel with Payload integration. Images allow remote HTTPS sources and SVGs.
