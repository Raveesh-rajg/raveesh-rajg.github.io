
# Raveesh Raj Grandhi — Portfolio

Source for [raveesh-rajg.github.io](https://raveesh-rajg.github.io/).

A recruiter-focused portfolio for business intelligence engineering and business analysis. The opening explains the role, tools, and deliverables. An animated data-to-dashboard workflow illustrates the reporting automation result documented in the résumé. The existing twenty projects, portrait, résumé, and contact integration are preserved.

The default overview shows professional results, three direct BI/reporting project links, and two cross-industry project summaries. Optional reading controls sit with the projects. Technical detail expands the six-stage hospital-price case study, supporting projects, method, and archive. Sources exposes evidence annotations. Skills are grouped as BI engineering, business analysis, and dashboards/reporting.

## Development

React 18, Vite 5, Framer Motion, and custom responsive CSS. Dependencies and the existing lockfile are preserved.

```sh
npm ci
npm run dev
npm test
```

`npm test` builds the production bundle and runs 100 content and interaction checks in jsdom, with normal and reduced motion. It covers reading modes, source annotations, interactive project evidence, method and capability selection, filtering, search, mobile menu and focus behavior, internal links, native validation attributes, and contact success/error recovery. Hero checks cover automatic statement rotation, manual selection, pause/resume, hidden-tab suspension, and reduced-motion behavior. Automated form requests are mocked and never send email.

Pushes to `main` run the GitHub Pages workflow, test the production build, and deploy `dist/`.

## Content and assets

- Original project definitions and links: `src/content.js`.
- Professional impact, capabilities, and provenance: `src/refinement-data.js`.
- Page composition: `src/App.jsx`; reading modes and evidence: `src/ViewContext.jsx`.
- Flagship narrative: `src/Flagship.jsx`; project-specific visuals: `src/ProjectVisuals.jsx`.
- Hero workflow: `src/DecisionFlow.jsx`; rotating text: `src/HeroMotion.jsx`; recruiter hierarchy and animation: `src/recruiter.css`. Four shared six-second stages coordinate source cards, animated data transfer, validation, dashboard bars, and the work result. Pause, hidden/offscreen suspension, and reduced-motion support are retained.
- Contact behavior: `src/Contact.jsx`; archive search: `src/Archive.jsx`.
- Recruiter review: `RECRUITER-REVIEW.md`; current design contract: `DESIGN-SYSTEM.md`.
- Preserved theme: `src/styles.css`; responsive refinement: `src/refinement.css`.
- Retained original generated artwork (not used in the current hero): `public/signal.webp` (approximately 248 KiB).
- Existing portrait, résumé, and social card are preserved.
- Typography: DM Sans and Instrument Serif, locally served with system fallbacks. OFL licenses are included in `public/fonts/`.

Professional impact is transcribed from the existing résumé. Featured project metrics describe seeded data or offline evaluations, with links to source code and methods. No invented clients, time series, testimonials, or awards were added. The cohort comparison shows only the documented week-four observations; the experiment marks are grouped by outcome, not chronology.

## Contact

The form posts to `https://formspree.io/f/mlgqdlnd`. It includes native validation, a honeypot, a disabled sending state, success confirmation, recoverable errors, and direct email and LinkedIn fallbacks. No API credentials are required in the client.

## Design references

Research references, without copying their source or assets: [Dennis Snellenberg](https://dennissnellenberg.com/), [Bruno Simon](https://bruno-simon.com/), [Brittany Chiang](https://brittanychiang.com/), [Bruno's public repository](https://github.com/brunosimon/folio-2025), and [Framer's portfolio gallery](https://www.framer.com/marketplace/templates/categories/portfolio/).

