# Raveesh Raj Grandhi | Evidence Room

The source for [raveesh-rajg.github.io](https://raveesh-rajg.github.io/), a portfolio built around one idea: an analytical claim is only as credible as the evidence path behind it.

## Design direction

This is an original light editorial system, not a template-based developer portfolio. It replaces generic project cards and decorative particles with:

- six full project exhibits with project-specific data visuals
- a spatial evidence field connecting source, model, verification, and decision layers
- a recruiter-readable index of 20 public systems
- measured results linked directly to reproducible repositories
- native scrolling, responsive layouts, keyboard focus, and reduced-motion support
- a compact opening sequence that runs once per browser session

The palette uses warm paper, near-black ink, verification blue, and an acid proof marker. Typography relies on a system editorial stack, so the site does not wait on external font files.

## Run locally

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm test
```

The test command builds the Vite bundle and renders it in jsdom to verify the identity, selected exhibits, archive count, accessible image text, and core navigation.

## Architecture

```text
src/App.jsx            page structure and interactions
src/content.js        verified project nomenclature and metrics
src/EvidenceField.jsx responsive spatial evidence canvas
src/Artifacts.jsx     six project-specific evidence visuals
src/styles.css        complete responsive design system
public/profile.jpg    profile image
public/resume.pdf     downloadable resume
```

React and Framer Motion handle state and restrained transitions. The spatial field uses a custom canvas renderer with a capped device-pixel ratio, visibility-aware animation, and a static reduced-motion mode. No scroll hijacking or decorative WebGL payload is required.

## Deployment

Pushing to `main` runs the GitHub Pages workflow:

1. install locked dependencies with `npm ci`
2. create the production bundle with `npm run build`
3. upload `dist/` as the Pages artifact
4. deploy to the public site

Every highlighted portfolio metric comes from the linked repository's seeded run, evaluation harness, source contract, or test suite.
