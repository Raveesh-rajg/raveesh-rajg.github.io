# Portfolio site v3 — React + Vite + Framer Motion, futuristic redesign

v2's spring-physics foundation plus a full "data command-center" visual
layer (src/Fx.jsx + reworked src/styles.css):

- interactive particle constellation canvas (mouse-repel, self-heals if
  the tab loads hidden, disabled under prefers-reduced-motion)
- custom cursor with trailing glow ring; magnetic primary CTAs
- sub-second boot sequence (plays once per visit)
- floating pill nav with scrolled state + active-section highlighting,
  burger menu on mobile
- About bento section with spinning conic-ring photo (public/profile.jpg)
- Resume button (public/resume.pdf), noise + scanline overlays,
  glass cards with spotlight borders that track the mouse
- word-by-word hero entrance with spring physics
- scroll-linked top progress bar (spring-smoothed)
- hero parallax fade on scroll
- 3D tilt cards driven by useSpring motion values
- count-up stats via framer's animate()
- checklist ticks drawn with motion.path pathLength
- **AnimatePresence layout animations on the project filter** — cards
  spring in/out and re-flow when you switch domains (the one effect the
  CSS version genuinely couldn't do)

## Use it

```bash
npm install        # once
npm run dev        # local dev at localhost:5173
npm run build      # outputs dist/
```

`dist/` is committed pre-built — you can deploy it as-is without Node:
push the CONTENTS of dist/ to your raveesh-rajg.github.io repo, done.
(vite.config.js uses base:'./' so it works at any URL.)

## Which version to publish?

Both are in your folder — `portfolio-website/` (single file, zero deps,
zero maintenance) and this one (`portfolio-website-react/`, springier
motion, needs Node to modify). They look nearly identical at rest; this
one feels better in motion. Pick one, don't host both.

Files: src/App.jsx (page + components), src/Fx.jsx (particles, cursor,
boot, magnetic buttons), src/data.js (all 20 projects — edit content
here), src/styles.css (design system). Static assets (profile.jpg,
resume.pdf) live in public/ and are copied into dist/ on build.
