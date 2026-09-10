# Recruiter clarity and motion review

This is a simulated senior technical recruiter review, not an official Google evaluation or a claim of employment at Google. Scores are editorial judgments against the rubric below, not a prediction of an interview or offer.

## First-glance verdict

**Before: 72/100. After: 93/100.**

Previously, the site looked carefully designed but did not quickly explain the candidate's likely contribution to a BI or business analysis team. The large abstract hero, healthcare-first project order, specialist terminology, and reading-mode controls created unnecessary interpretation work.

The revised opening answers four questions immediately: Who is this? What roles are relevant? What does this person build? What tools and outcomes support that claim? I would now continue to the projects and résumé. Role-specific hiring decisions still require reviewing the underlying work and discussing the candidate's ownership and experience.

## Scoring rubric

| Criterion | Maximum | Before | After | Reason |
|---|---:|---:|---:|---|
| First-glance clarity | 25 | 17 | 24 | Direct dashboard/business-problem headline, named disciplines, tools, visible actions |
| Relevance to BI/BA roles | 20 | 12 | 19 | BI reporting, commerce modeling, and finance automation precede broader case studies |
| Evidence and credibility | 20 | 17 | 18 | Work results link to résumé; project simulations and personal contributions are clearly distinguished |
| Scanning and navigation | 15 | 10 | 14 | One main header; reading options moved to projects; question and contribution precede charts |
| Motion and visual coherence | 10 | 7 | 9 | Animated workflow explains the job rather than relying on an abstract decorative object |
| Readability and accessibility | 10 | 9 | 9 | Larger body type, clearer labels, non-overlapping statements, pause and reduced-motion support |
| **Total** | **100** | **72** | **93** | |

## Flagged areas and implemented changes

| Area | What made it hard to understand | Change |
|---|---|---|
| Hero headline | “Data systems people can trust” described a philosophy without naming the deliverable | “I build dashboards. I solve business problems.” |
| Role fit | Recruiters had to infer BI/BA fit from several sentences and later sections | Business intelligence/business analysis and SQL, Python, Power BI, Tableau, Snowflake appear immediately |
| Hero artwork | A large sculpture suggested polish but did not explain the work | Replaced the hero focus with an animated source → checks → dashboard workflow; preserved the original artwork file |
| Motion | Small drift and subtle orbit effects were easy to miss | Visible moving data packets, validation sweep, perspective dashboard changes, growing bars, and result reveal |
| Rotating copy | Inspirational statements repeated abstract concepts | Four concrete statements about connecting sources, checking data, building usable dashboards, and automation |
| Text transitions | Crossfading sentences could briefly overlap | Only one visible caption at a time, with a short entrance |
| Top controls | Recruiter/Deep Dive/Evidence appeared before readers knew the candidate | Optional Overview/Technical detail/Sources controls moved into project reading options |
| First projects | Hospital pricing followed by claims suggested a healthcare-only portfolio | Three BI/reporting links lead; user-retention and A/B-test projects are the first detailed summaries |
| Project cards | Visuals and specialized names arrived before the business purpose | Plain project titles, a business question, and an explicit “What I built” explanation precede the visualization |
| Evidence labels | “Seeded,” “hermetic,” and “gold crosswalk” required specialist interpretation | Main summaries say test data, simulation, and “45 of 48 descriptions matched correctly”; detailed sources remain available |
| Retention chart | “Activated” was undefined | Defined as creating a project within three days of signup, matching the linked project README |
| Experiment chart | “Naive peeking” and “interim looks” were opaque | Repeated checking, safer testing, a false-positive definition, and “14 checks during each test” |
| Hospital case study | Technical processing steps obscured the analyst's purpose | Price-comparison/negotiation framing, a plain description of the pipeline, and readable chapter explanations |
| Skills | Build/Understand/Communicate required translation into a job description | BI engineering, Business analysis, Dashboards & reporting; relevant tools and project links stay attached |
| Working method | “Canonical grain” and “Attack the answer” were unnecessarily cryptic | Understand the question, define the data, check the numbers, deliver the answer |
| About | “Clinical by context” reinforced a narrow industry identity | Describes transferable stakeholder, reporting, and data-checking skills while preserving actual employment and education |
| Contact | “Brief” and “problem space” sounded like an agency intake form | Team-oriented invitation, Message, and Send message; endpoint and validation preserved |
| Small screens | Long hero composition delayed actions | Single-column layout, earlier project/résumé actions, compact workflow, readable body text |

## Motion contract

Hero statements and workflow use the same stage, advancing every six seconds. The sources lift, validation sweeps, dashboard bars reveal, and result moves forward in sequence. Continuous data packets make the connection between steps visible. The illustration does not imply a live employer dashboard. The 75% result and 4h/1h values come from the existing résumé.

Pause suspends automatic changes and animation. Hidden tabs and offscreen heroes stop their motion. Reduced-motion users see the complete static workflow and can select a statement manually. Essential meaning does not depend on watching the animation. No scroll hijacking, loading gate, autoplay audio, or additional animation library was introduced.

## What a 100/100 claim would hide

The site can present evidence clearly, but a self-review cannot establish how actual recruiters respond, independently verify every employer outcome, or prove an exact match for an unseen job description. The remaining points reflect those limits and the opportunity for real reader feedback—not defects to conceal with more animation. Do not publish a “perfect candidate” or “Google-approved” claim on the website.

## Validation

The production bundle passes 100 content and interaction checks across normal and reduced-motion settings. Form requests in the suite are mocked and do not send email. The suite covers synchronized motion, pause/resume, visibility handling, new hierarchy, twenty preserved projects, reading options, source notes, filtering, menus/focus, six case-study chapters, and contact success/error recovery.

The accompanying delivery review records browser checks, local Lighthouse measurements, and publication verification. Lighthouse scores are lab measurements and are separate from the editorial 93/100 score above.
