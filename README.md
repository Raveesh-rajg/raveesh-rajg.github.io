# Raveesh Raj Grandhi — portfolio (Next.js)

Production build of the portfolio: Next.js 14 App Router · TypeScript · Tailwind ·
Framer Motion · Lucide icons · static export (`output: 'export'`) so it deploys to
**Vercel or GitHub Pages** unchanged. Brand line: *turning messy data into
trustworthy decisions* — and every metric on the site is a measured result from a
public, tested repo (no invented numbers; the two placeholders are marked).

## Structure

```
app/
  layout.tsx            fonts, metadata, OG, JSON-LD Person schema, background layers
  page.tsx              section assembly
  globals.css           design tokens, glass system, background layers, a11y focus
  projects/[slug]/      six static case-study pages (charts + facts + decisions)
  sitemap.ts robots.ts
components/
  ui.tsx                Section, SectionHeading, GlassPanel, AnimatedButton, ScrollProgress
  nav.tsx               Navbar + MobileMenu + active-section observer + scroll opacity
  hero.tsx              Hero, live-SQL HeroDataVisualization, count-up stats, CredibilityStrip
  sections.tsx          About, ExpertiseGrid + capability proof, Philosophy pipeline,
                        WorkProcess, GitHubMetrics (live API w/ graceful failure), Footer
  projects.tsx          FeaturedProjects, ProjectCard, compact 14-row index, Contact form
  charts.tsx            animated SVG Bars/Line (deliberately no chart lib — lighter)
lib/
  content.ts            ALL site copy/data, typed — edit content here only
  cases.ts              case-study content, typed, chart data declarative
```

## Run / build / deploy

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in out/
```

**Vercel:** push the repo, import in Vercel — zero config (it detects Next).
**GitHub Pages:** push the CONTENTS of `out/` to the `raveesh-rajg.github.io` repo,
or add an Actions workflow that runs `npm run build` and publishes `out/`.

After deploying, set `SITE_URL` in `lib/content.ts` to the real domain (canonical,
OG, sitemap all read it).

## The two placeholders to replace

1. **Résumé** — put your real PDF at `public/resume.pdf` (a `.txt` marker sits
   there now so the button target is obvious).
2. **Profile photo** — the About section shows an "RG" monogram; swap the
   monogram div in `components/sections.tsx` for `next/image` with your photo in
   `public/`.

## Contact form

No secrets in frontend code. Set `NEXT_PUBLIC_FORM_ENDPOINT` (e.g. a Formspree
form URL) in `.env.local` / Vercel env — the form POSTs JSON there with loading,
success, and error states. Without the env var it falls back to opening the
visitor's mail client, so the form never dead-ends. Template: see `.env.example`.

## GitHub data

`GitHubMetrics` fetches `api.github.com/users/Raveesh-rajg` client-side at page
load; on failure or rate-limit it renders an em-dash — never a fake counter.

## Fonts note

Fonts load via `<link>` because this was built in an environment that couldn't
reach Google Fonts at build time. On your machine, prefer `next/font/google`
(self-hosted, better CLS): restore the import block noted in `app/layout.tsx`.

## Accessibility & performance

Semantic landmarks, keyboard-visible focus rings (`.focus-ring`), labeled form
fields with `role="status"` announcements, `aria-label`ed charts,
`prefers-reduced-motion` disables the aurora/marquee/typewriter, mobile menu with
`aria-expanded`. Static export, 87.5 kB shared JS, no chart library, fonts
preconnected. Run Lighthouse after deploy; the structure targets 90+/95+.
