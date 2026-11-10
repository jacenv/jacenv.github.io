# Jacen Salvador — personal portfolio

An editorial portfolio for a new-grad software engineer. Built with Next.js and TypeScript, with a static export for GitHub Pages.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000. Typefaces (DM Sans, DM Mono, Instrument Serif) are pulled in through `next/font` and self-hosted in the build, so the published site makes no external font or image requests.

## Content

- `app/page.tsx`: introduction, selected work, smaller projects, about, and contact.
- `lib/data.ts`: project descriptions, technology lists, and external links.
- `app/globals.css`: responsive layout, typography, colors, and focus states.
- `public/jacen-resume.pdf`: downloadable resume, synced with the resume supplied for this redesign.

## Production

```sh
npm run build
```

The static site is written to `out/`. Existing domain configuration is retained in `CNAME`.
