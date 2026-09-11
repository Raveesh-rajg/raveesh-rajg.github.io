# Raveesh Raj Grandhi — BI, data, and business analysis

Source for https://raveesh-rajg.github.io/.

Five sections: Hero → Impact → Projects → Capabilities → Contact. The opening states the three target roles and concrete deliverables. Healthcare remains a source of professional experience alongside public commerce, finance, product, and experimentation work. The current employment title is Data Analyst, matching public/resume.pdf.

## Design and motion

Charcoal, copper, sand, and pale teal; DM Sans and Instrument Serif. The hero's orbital background moves two small decorative points using CSS transform only. A native Ambient motion checkbox pauses them without JavaScript. System reduced-motion preferences disable the animation and hide the redundant control. The headline, project content, and charts remain static.

The build prerenders the full home page and all four charts to HTML. Only the contact form is hydrated. One IntersectionObserver adds a class without reading layout. No custom scroll listeners, recurring JavaScript timers, backdrop filters, or animated paint/layout properties. Below-fold sections use content-visibility: auto and contain-intrinsic-size: 800px.

## Development

Run npm ci, then npm run dev. For a complete HTML preview, run npm run build followed by npm run preview. npm test builds and checks static HTML, motion constraints, project evidence, navigation, and contact recovery. Form tests are mocked and do not send messages.

The build runs Vite for the client and a temporary server-rendering entry, then prerender.mjs writes dist/index.html and dist/projects.html. Only dist is deployed. The twenty-project directory contains no JavaScript.

## Evidence and contact

Claims reconciliation, price mapping, retention, and experimentation results keep their denominators and limitations. Newly featured commerce, Power BI, and finance links explicitly describe implementation status or build specifications; no completed dashboard screenshot is implied. No employer work is fabricated.

Contact.jsx and contact-preserved.css retain the form's fields, validation, success state, recovery behavior, and Formspree endpoint. See DESIGN-SYSTEM.md and RECRUITER-REVIEW.md for the current contract and review.
