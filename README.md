# Futureframe Blog

Premium, bilingual (EN/FI) personal technology blog built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Futuristic, minimal design with glassmorphism and animated gradients
- Dark mode by default with light mode toggle
- English/Finnish language switcher in navbar
- Localized routes: `/en` and `/fi`
- Homepage sections: hero, featured, latest posts, categories, newsletter, footer
- Blog list + detailed article pages
- Article metadata: cover image, author, date, reading time, tags, share actions
- SEO setup: metadata, canonical tags, robots, sitemap
- Mobile-first responsive layout

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- next-themes
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en)

## Project Structure

- `app/` pages, layouts, metadata routes
- `components/` reusable UI components
- `data/` localized categories and post data
- `lib/` i18n helpers, shared types, utilities
- `providers/` theme provider
- `public/images/` author and blog cover assets
