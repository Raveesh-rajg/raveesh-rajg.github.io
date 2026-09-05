
# Raveesh Raj Grandhi — Portfolio

Source for [raveesh-rajg.github.io](https://raveesh-rajg.github.io/).

An original charcoal and copper editorial design with an AI-generated metallic signal sculpture, subtle pointer parallax, scroll reveals, six featured project studies, five professional focus selectors, a searchable 20-project archive, profile, résumé, and contact form.

## Development

React 18, Vite 5, Framer Motion, and custom responsive CSS. Dependencies and the existing lockfile are preserved.

```sh
npm ci
npm run dev
npm test
```

`npm test` builds the production bundle and runs 46 content and interaction checks in jsdom, with normal and reduced motion. It covers project filtering and search, mobile menu behavior, role selection, accessible links and labels, and contact success/error recovery. All automated form requests are mocked and never send email.

Pushes to `main` run the GitHub Pages workflow, test the production build, and deploy `dist/`.

## Content and assets

- Project definitions, metrics, repository links, and professional focus data: `src/content.js`.
- Page composition and contact behavior: `src/App.jsx`.
- Theme and responsive layouts: `src/styles.css`.
- Optimized original generated hero artwork: `public/signal.webp` (approximately 248 KiB).
- Existing portrait, résumé, and social card are preserved.
- Typography: DM Sans and Instrument Serif, served by Google Fonts with system fallbacks.

Featured metrics describe seeded project data or offline evaluations, not production business outcomes. No invented clients, projects, testimonials, or awards were added.

## Contact

The form posts to `https://formspree.io/f/mlgqdlnd`. It includes native validation, a honeypot, a disabled sending state, success confirmation, recoverable errors, and direct email and LinkedIn fallbacks. No API credentials are required in the client.

## Design references

Research references, without copying their source or assets: [Dennis Snellenberg](https://dennissnellenberg.com/), [Bruno Simon](https://bruno-simon.com/), [Brittany Chiang](https://brittanychiang.com/), [Bruno's public repository](https://github.com/brunosimon/folio-2025), and [Framer's portfolio gallery](https://www.framer.com/marketplace/templates/categories/portfolio/).
