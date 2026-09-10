# Portfolio art direction and motion contract

## Purpose

An editorial instrument for turning complex business data into confident decisions. The audience is recruiters and hiring managers for business intelligence engineering, business analysis, and analytics roles across industries.

This September 2026 refinement applies the process from the user-supplied *The $5K-$10K Animated Website Playbook*, especially composition and focal separation (pp. 4, 9), synchronized motion states (p. 13), the smallest suitable animation stack (p. 14), semantic controls over authored visual layers (p. 15), responsive composition (p. 16), and browser QA (pp. 17, 20, 22). The PDF is reference material and is not redistributed in this repository.

## Reference decomposition

| Reference | Principle | Original application here |
|---|---|---|
| [Brittany Chiang](https://brittanychiang.com/) | Clear professional identity, accessible navigation, evidence before ornament | BI/BA positioning remains visible; recruiters can skip directly to work, résumé, and contact |
| [Bruno Simon](https://bruno-simon.com/) | A recognizable authored focal subject and deliberate interaction states | Preserve this portfolio's original copper sculpture and make it an instrument for the analytical narrative |
| [GSAP showcase](https://gsap.com/showcase/) | Motion choreography and progression between states | Coordinate statement, caption, arc, and chapter feedback; preserve native scrolling and semantic controls |

These are references for principles, not copied layouts, media, identities, or source implementations. A game interface, forced loading sequence, scroll hijacking, and a second animation library do not serve this portfolio's recruiting purpose.

## Locked foundation

- Charcoal `#101112`, copper `#d7a17b`, off-white type, sand proof panel `#d4c8b6`, muted green evidence surfaces.
- DM Sans for interface and body; Instrument Serif for editorial emphasis. Fonts remain local with their OFL licenses.
- Original headline, rotating statements, real employment history, portrait, résumé, twenty project repositories, seeded evaluation caveats, search/filter behavior, reading modes, and Formspree endpoint.
- React 18, Vite 5, and Framer Motion. No new runtime dependencies.
- One main heading, native links/buttons/details, visible focus, and no essential labels baked into images.

## Hero composition

Desktop above 760px has two independent territories: copy on the left and a framed sculpture on the right. The artwork is decorative; the live caption explains the analytical stage below it. Important text and buttons do not sit on the sculpture.

At 760px and below the composition becomes a single column: identity, headline, positioning, statement, actions, then a shallower sculpture. At 500px and below the type and controls tighten, and the contact fields form one column. Both sides of 500px, 760px, 1050px, and 1600px are QA boundaries. Wide desktop clamps the asset to 680px. Short desktops at 700px height and below use an unpinned chapter visual to avoid trapping content in a small scroll panel.

## Shared hero state

`Hero` owns one integer stage, passed directly to both `RotatingStatement` and `SignalSculpture`. No separate visual timer can drift out of sync.

| Stage | Progress arc | Visual state | Meaning |
|---|---|---|---|
| 0 | 25% | Source | Start with the business question |
| 1 | 50% | Structure | Make definitions reliable |
| 2 | 75% | Signal | Find decision-relevant patterns |
| 3 | 100% | Decision | Make the next move clear |

- Statements advance every 6000ms. A manual selection starts a fresh reading interval.
- Arc interpolation: 1100ms. Caption transition: 500–700ms. Headline settles over 850ms; sculpture arrives over 1200ms.
- Sculpture drift: 18 seconds, ±4px vertically and ±1 degree. Fine mouse pointers can lean the framed asset by at most 4 degrees horizontally and 3 degrees vertically; leave resets it.
- Pause suspends automatic changes, ambient motion, and pointer response. Offscreen heroes and hidden tabs suspend work. Reduced motion disables automatic rotation, animation, and pointer transforms; manual statement selection remains available.
- Decorative SVG calibration ticks do not represent data or fabricated results.

## Case study and section motion

The six existing Hospital Rate Intelligence scenes keep their source evidence. IntersectionObserver selects the visible chapter. Six semantic buttons can navigate directly to a chapter and scroll it into view. The chapter number, active control, source link, and visual all share the same `active` state. Reduced-motion users get immediate scrolling. Mobile shows the visual inline with each scene.

Case visuals enter over 550ms with a small translate/mask reveal. Project cards receive a one-time 650ms viewport entrance; all content is visible before enhancement. Hover treatments use restrained border/shadow changes and a maximum 4px lift on fine-pointer devices. CTA labels remain live HTML over a simple sheen treatment. Focus remains visible outside the button surface.

## Asset map and preservation

| File | Role | Contract |
|---|---|---|
| `public/signal.webp` | Original generated copper hero sculpture | 1536 × 1024, unchanged file; protected by a CSS mask and independent frame |
| `public/profile.jpg` | User portrait | Original file and identity preserved; responsive 4:5 crop |
| `public/resume.pdf` | Résumé | Existing document preserved |
| `public/og-card.png` | Social preview | Existing asset preserved |
| `public/fonts/*.woff2` | Typography | Local delivery; matching OFL files retained |
| `src/SignalSculpture.jsx` | Authored calibration geometry and live captions | Vector/HTML implementation; no external media request |

No video is required by this direction. There is no poster mismatch, video seeking dependency, third-party generation account, audio autoplay, or extra asset-hosting service.

## Verification contract

`npm test` builds and exercises the actual production bundle, including normal/reduced motion, synchronized hero state, pause/resume, hidden-tab suspension, chapter navigation, all twenty projects, search/filtering, menu/focus, and mocked contact states. Browser QA checks first view, transitions, breakpoint edges, short height, readable captions, live assets, console output, and production preview. Lighthouse is a local lab measurement rather than field performance evidence.

GitHub Pages runs the same production tests before deployment. The public build and asset hashes are verified after publishing. External credentials and the reference PDF are excluded from the repository.
