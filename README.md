
# Raveesh Raj Grandhi — Portfolio

Source for [raveesh-rajg.github.io](https://raveesh-rajg.github.io/).

A charcoal and copper editorial portfolio built around a clear narrative: data systems people can trust. The original typography, portrait, artwork, twenty projects, résumé, and contact integration are preserved.

Recruiter mode offers professional impact, a concise Hospital Rate Intelligence flagship, and two supporting systems. Deep Dive expands the six-stage flagship story, all five supporting systems, the analytical method, and the searchable project archive. An independent Evidence switch exposes source annotations. Three capability pillars — Build, Understand, Communicate — connect the work to practical hiring needs.

## Development

React 18, Vite 5, Framer Motion, and custom responsive CSS. Dependencies and the existing lockfile are preserved.

```sh
npm ci
npm run dev
npm test
```

`npm test` builds the production bundle and runs 86 content and interaction checks in jsdom, with normal and reduced motion. It covers reading modes, source annotations, interactive project evidence, method and capability selection, filtering, search, mobile menu and focus behavior, internal links, native validation attributes, and contact success/error recovery. Hero checks cover automatic statement rotation, manual selection, pause/resume, hidden-tab suspension, and reduced-motion behavior. Automated form requests are mocked and never send email.

Pushes to `main` run the GitHub Pages workflow, test the production build, and deploy `dist/`.

## Content and assets

- Original project definitions and links: `src/content.js`.
- Professional impact, capabilities, and provenance: `src/refinement-data.js`.
- Page composition: `src/App.jsx`; reading modes and evidence: `src/ViewContext.jsx`.
- Flagship narrative: `src/Flagship.jsx`; project-specific visuals: `src/ProjectVisuals.jsx`.
- Industry-neutral opening, four rotating statements, and lightweight CSS orbit motion: `src/HeroMotion.jsx` and `src/HeroMotion.css`. Statements rotate every six seconds; motion pauses when the hero is offscreen, the tab is hidden, or the reader selects Pause. Reduced-motion preferences disable automatic rotation and animation.
- Contact behavior: `src/Contact.jsx`; archive search: `src/Archive.jsx`.
- Preserved theme: `src/styles.css`; responsive refinement: `src/refinement.css`.
- Optimized original generated hero artwork: `public/signal.webp` (approximately 248 KiB).
- Existing portrait, résumé, and social card are preserved.
- Typography: DM Sans and Instrument Serif, locally served with system fallbacks. OFL licenses are included in `public/fonts/`.

Professional impact is transcribed from the existing résumé. Featured project metrics describe seeded data or offline evaluations, with links to source code and methods. No invented clients, time series, testimonials, or awards were added. The cohort comparison shows only the documented week-four observations; the experiment marks are grouped by outcome, not chronology.

## Contact

The form posts to `https://formspree.io/f/mlgqdlnd`. It includes native validation, a honeypot, a disabled sending state, success confirmation, recoverable errors, and direct email and LinkedIn fallbacks. No API credentials are required in the client.

## Design references

Research references, without copying their source or assets: [Dennis Snellenberg](https://dennissnellenberg.com/), [Bruno Simon](https://bruno-simon.com/), [Brittany Chiang](https://brittanychiang.com/), [Bruno's public repository](https://github.com/brunosimon/folio-2025), and [Framer's portfolio gallery](https://www.framer.com/marketplace/templates/categories/portfolio/).
