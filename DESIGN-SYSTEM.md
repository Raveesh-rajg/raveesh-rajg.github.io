# Static healthcare portfolio contract

Preserve charcoal, copper, sand evidence panels, DM Sans, Instrument Serif, the portrait, résumé, and contact form.

## Content

1. Static healthcare-data headline and quality-focused description.
2. Professional impact, followed immediately by the résumé/repository provenance line.
3. Claims quality, hospital prices, retention, experimentation; one link to the twenty-project directory.
4. Three capabilities with the biography folded into one three-line paragraph.
5. Existing contact form, unchanged except the section index.

Use Data Analyst consistently in the hero, biography, and structured metadata, matching the published résumé. Do not invent a different job title or claim LinkedIn was updated without an authenticated edit.

## Rendering

Prerender full HTML at build time. Hydrate only the contact form. Do not add a hero rotator, timers, scroll progress, scroll listeners, per-frame geometry reads, Framer Motion, or chart animation. One IntersectionObserver may add the is-visible class; content starts visible. The class does not animate. Only transform and opacity are permitted transition/keyframe properties. There are zero backdrop filters.

All sections below the hero use content-visibility: auto and contain-intrinsic-size: 800px. Printing restores normal content visibility. Never put essential chart values behind JavaScript, an animation, a disclosure, or a reading-mode switch.

The original form styles are extracted into contact-preserved.css in their original cascade order. The only removed declarations were motion/filter properties disallowed by the performance brief. Contact.jsx is otherwise unchanged apart from its section number.

## Evidence

Claims: 2,791 clean + 98 quarantined = 2,889 ingested; 98 of 98 planted defects isolated.
Prices: 93.75% charge-description mapping accuracy, 45 of 48 against a gold crosswalk.
Retention: 45.3% versus 18.2%, with activation defined by creating a project within three days, and the association caveat visible.
Experiments: 120 versus 6 false positives in 500 simulated tests; 24.0% versus 1.2%.

Preserve “Test data, not employer production work,” “Association, not proof of cause,” and “not savings achieved by a hospital.” Do not substitute test metrics for employer outcomes.
