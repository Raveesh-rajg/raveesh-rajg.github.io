# Raveesh Raj Grandhi | Analytics that survives audit

The source for [raveesh-rajg.github.io](https://raveesh-rajg.github.io/), a single-file portfolio built around one rule: every analytical claim needs a visible path to evidence.

## Design direction

The site uses a quiet, dark instrumentation system with one electric-blue proof line. It includes:

- six verified results linked to their repositories
- three hand-authored inline SVG charts
- a recruiter-readable index of 20 public systems
- native scrolling, visible keyboard focus, and reduced-motion support
- a mail link with copy-to-clipboard enhancement

The page uses no framework or runtime package. Space Grotesk and IBM Plex Mono load through one Google Fonts request.

## Preview locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Deployment

Pushing to `main` runs the GitHub Pages workflow:

1. validate the six-block structure, inline charts, project index, accessibility hooks, and copy rules
2. copy `index.html` and the resume into the Pages artifact
3. deploy the static artifact

Every highlighted portfolio metric comes from the linked repository's seeded run, evaluation harness, source contract, or test suite.
