# Raveesh Raj Grandhi — Healthcare data portfolio

Source for https://raveesh-rajg.github.io/.

Five sections: Hero → Impact → Projects → Capabilities → Contact. Healthcare claims and hospital prices lead the work, followed by product analytics and experimentation. The twenty-project directory is a separate static page linked once at the end of Projects.

## Rendering and performance

The build prerenders the full home page and all four charts to HTML. JavaScript hydrates only the existing contact form; the rest of the page does not depend on client rendering. Framer Motion and the old rotator, animated workflow, scroll progress, repeated disclosures, and per-component observers have been removed from the client graph and source components.

One IntersectionObserver adds one CSS class without reading layout. Charts are visible before it runs and with JavaScript disabled. There are no custom scroll listeners, no recurring timers, no backdrop filters, and no animated paint/layout properties. Below-fold sections use content-visibility: auto and contain-intrinsic-size: 800px. Only hover arrows transition, using transform.

## Development

Run npm ci, then npm run dev for authoring. The complete HTML preview is produced with npm run build followed by npm run preview. npm test builds and checks the prerendered HTML, safe CSS, healthcare-first evidence, no-JavaScript directory, menu, form hydration, and contact recovery behavior. Form tests are mocked and do not send messages.

The build runs Vite for the client and a temporary server-rendering entry, then prerender.mjs writes dist/index.html and dist/projects.html. Only dist is deployed. .prerender is ignored.

## Facts and contact

The current job title is Data Analyst, matching public/resume.pdf. The LinkedIn page requires sign-in, so its title could not be verified or changed in this session. The contact component is preserved except for its section number changing from 07 to 05. Its endpoint remains https://formspree.io/f/mlgqdlnd.

The 98-defect reconciliation belongs to the claims pipeline. The 93.75% mapping result belongs to the hospital-price project. Test-data and causality labels remain explicit. No employer screenshot was supplied or fabricated.

See DESIGN-SYSTEM.md for the current constraints and RECRUITER-REVIEW.md for implementation status.
