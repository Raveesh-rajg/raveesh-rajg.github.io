# Raveesh Raj Grandhi | Evidence Room

The source for [raveesh-rajg.github.io](https://raveesh-rajg.github.io/), an editorial portfolio about the evidence path behind analytical decisions.

## Creative direction

The portfolio combines editorial composition, clinical precision, data-system diagrams, and restrained cinematic motion. Its central metaphor is a four-stage proof path:

`SOURCE → MODEL → VERIFY → DECIDE`

The experience includes:

- a recruiter lens for BI Engineer, Data Analyst, Business Analyst, Healthcare Analyst, and Clinical Data Scientist roles
- six evidence-led flagship case studies with custom data artifacts
- a filterable public index preserving all 20 projects
- a professional record with verified work impact
- a Formspree recruiter brief and direct email fallback
- reduced-motion and Save-Data behavior
- a custom social card, metadata, structured data, and redirecting 404

## Stack

- React 18
- Vite 5
- Framer Motion
- custom CSS and canvas instrumentation
- no UI component framework

## Local development

```bash
npm ci
npm run dev
```

## Validation

```bash
npm test
```

The test command builds the production bundle and checks the six flagship repositories, the 20-project archive, the five recruiter lenses, professional impact, contact fallback, Formspree configuration, semantic structure, and profile accessibility.

## Deployment

Pushes to `main` run the GitHub Pages workflow, build the locked Vite project, execute the smoke test, and deploy `dist/`.
