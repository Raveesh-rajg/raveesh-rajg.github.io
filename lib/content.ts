/* Central typed content — edit here, never in components.
   Every metric is a measured result from the named repo's tests. */

export const GH = 'https://github.com/Raveesh-rajg'
export const LI = 'https://www.linkedin.com/in/raveeshrajg/'
export const EMAIL = 'raveeshraj26@gmail.com'
export const SITE_URL = 'https://raveesh-rajg.github.io'

// Contact form backend. A static site has no server, so the form must POST to
// a third-party service. Create a FREE form at https://formspree.io (2 min),
// paste its endpoint here (looks like https://formspree.io/f/abcdwxyz), rebuild,
// and messages land in your inbox. Until this is set, the form uses a mailto
// fallback (opens the visitor's mail app). See README > Contact form.
export const FORM_ENDPOINT = 'https://formspree.io/f/mlgqdlnd'

export interface Featured {
  slug: string; chip: string; accent: 'teal' | 'violet' | 'fuchsia' | 'gold'
  title: string; body: string; metric: string; tags: string[]
}

export const featured: Featured[] = [
  { slug: 'hospital-price-intelligence', chip: 'Healthcare · Flagship', accent: 'gold',
    title: 'PriceScope — Hospital Price Transparency Intelligence',
    body: 'CMS forces hospitals to publish negotiated rates in files that are famously public-but-unusable. PriceScope parses the three real format dialects, quarantines bad rows, and maps dirty charge descriptions with a measured LLM-assisted pipeline.',
    metric: '93.75% description-mapping accuracy · 2.64× Medicare median · planted outlier recovered as top exposure',
    tags: ['DuckDB', 'Python', 'Claude API', 'Evidence.dev', '8 tests'] },
  { slug: 'ab-testing-framework', chip: 'Experimentation', accent: 'violet',
    title: 'expkit — A/B Testing & Experimentation Framework',
    body: 'Frequentist + Bayesian + always-valid sequential inference, built around the three ways experiments actually fail: peeking, novelty effects, and Simpson’s paradox — each planted in simulated data and caught.',
    metric: 'Naive daily peeking: 24% false positives · mSPRT always-valid: 1.2% · 38 tests',
    tags: ['Python', 'scipy', 'statsmodels', 'Streamlit'] },
  { slug: 'causal-inference-casebook', chip: 'Causal Inference', accent: 'violet',
    title: 'Causal Inference Casebook',
    body: 'When you can’t run the experiment: DiD, synthetic control, and propensity stratification — each case computes the naive answer first, shows it wrong, recovers the planted truth, and tests its own assumption.',
    metric: 'Naive +44 vs truth +8 → DiD recovers 7.97 ± 0.35 · placebo tests null',
    tags: ['Python', 'statsmodels', 'scipy', '9 tests'] },
  { slug: 'product-growth-analytics', chip: 'Product Analytics', accent: 'fuchsia',
    title: 'GrowthLedger — Growth Accounting & Retention',
    body: 'The analytics vocabulary of growth teams, done with rigor: MAU decomposition with quick ratio, SQL cohort triangles, aha-moment activation analysis, and the L28 power-user curve on a 421k-event log.',
    metric: 'Activated users: 45.3% week-4 retention vs 18.2% — recovered by SQL, pinned by tests',
    tags: ['SQL', 'DuckDB', 'Python', '6 tests'] },
  { slug: 'analytics-rag-agent', chip: 'AI Engineering', accent: 'teal',
    title: 'Analytics RAG Agent — Chat With the Data Platform',
    body: 'Routes questions between documentation retrieval (with cited sources) and guarded text-to-SQL. Guardrails enforced outside the model: statement validation, table allowlists, read-only execution.',
    metric: 'Routing 14/14 · retrieval hit@4 8/8 · SQL guard suite green · 33 tests',
    tags: ['LangChain', 'Chroma', 'Claude API', 'DuckDB'] },
  { slug: 'llm-ops-analytics', chip: 'AI Operations', accent: 'teal',
    title: 'TokenLedger — LLM Cost & Quality Analytics',
    body: 'Analytics on AI systems: every LLM call traced to OpenTelemetry GenAI conventions, warehoused, and read out as cost-per-successful-answer, prompt-version economics, and failure-aware anomaly detection.',
    metric: 'v2 prompt +6.5pp quality at 1.35× cost · retry storm caught at failure z=5.3',
    tags: ['Python', 'DuckDB', 'OpenTelemetry', '9 tests'] },
]

export interface IndexRow { c: string; cat: string; tests: string; title: string; m: string; repo: string }

export const indexRows: IndexRow[] = [
  { c: 'health', cat: 'Healthcare · Spark', tests: '12 tests', title: 'Claims Medallion Pipeline',
    m: '2,889 claims → 98/98 planted defects quarantined · 20.9% readmission rate', repo: 'healthcare-claims-pipeline' },
  { c: 'ai', cat: 'NLP · LLM Pipeline', tests: '13 tests', title: 'Review Intelligence Pipeline',
    m: '400/400 extractions validated · budget guard aborts at cap by test', repo: 'review-nlp-pipeline' },
  { c: 'data-eng', cat: 'Modern Data Stack', tests: '26 source tests', title: 'Olist Analytics Platform',
    m: '1.5M+ rows · SCD2 · ephemeral-schema CI · zero broken deploys', repo: 'dbt-snowflake-ecommerce' },
  { c: 'data-eng', cat: 'BigQuery · Gemini', tests: '10 tests', title: 'GA Analytics Platform',
    m: 'NL-to-SQL with 200MB dry-run cost gate · marts-only allowlist', repo: 'ga-bigquery-analytics' },
  { c: 'data-eng', cat: 'Streaming · GCP', tests: '7 tests', title: 'Real-time Streaming Pipeline',
    m: 'p50/p95 pipeline latency as a first-class metric · dual dedup', repo: 'gcp-streaming-pipeline' },
  { c: 'stats', cat: 'Forecasting · MLOps', tests: '9 tests', title: 'Demand Forecasting + Serving',
    m: 'ETS 9.92% sMAPE vs naive 10.23% — the honest margin', repo: 'vertex-forecasting' },
  { c: 'biz', cat: 'Insurance · Risk', tests: '8 tests', title: 'LossLens — Fraud & Loss Analytics',
    m: 'Precision@50 = 100% vs 9.8% baseline · loss triangles', repo: 'insurance-loss-analytics' },
  { c: 'biz', cat: 'Fintech · Risk', tests: '5 tests', title: 'CreditPulse — Complaint Intelligence',
    m: 'Surge caught at 5.2× velocity · lag-2 macro link r=0.667', repo: 'credit-complaint-intelligence' },
  { c: 'biz', cat: 'Marketing Science', tests: '5 tests', title: 'Marketing Attribution Lab',
    m: 'Last-click over-credits paid search 2.7× · removal-effect halves error', repo: 'marketing-attribution-lab' },
  { c: 'bi', cat: 'Power BI · DAX', tests: 'star schema', title: 'Power BI / DAX Showcase',
    m: '69,868-row fact · calc groups · same-store sales · RLS', repo: 'powerbi-dax-showcase' },
  { c: 'bi', cat: 'Tableau · Story', tests: '6 story points', title: 'The Great Convergence',
    m: '1.1% → 61.4% of humanity in 70+ life-expectancy countries', repo: 'tableau-storytelling' },
  { c: 'bi', cat: 'Semantic Layer', tests: '10 tests', title: 'LookML Semantic Model',
    m: 'Structural CI on the lkml parser — the repo reviews itself', repo: 'looker-lookml-ecommerce' },
  { c: 'bi', cat: 'Excel · Power Query', tests: 'M contracts', title: 'Power Query Case Study',
    m: 'Six hostile exports → Refresh All · every defect mapped to its defeat', repo: 'excel-powerquery-casestudy' },
  { c: 'data-eng', cat: 'SQL Depth', tests: 'CI-verified', title: 'SQL Puzzles Showcase',
    m: '8 hard problems, solutions executed & asserted · 1.54× optimization win', repo: 'sql-puzzles' },
]

export const capabilities: [string, string][] = [
  ['Advanced SQL', 'window fns · recursive CTEs · optimization → SQL Puzzles'],
  ['Experimentation & A/B statistics', 'Bayesian · sequential · peeking → expkit'],
  ['Causal inference', 'DiD · synthetic control · matching → Casebook'],
  ['Product & growth analytics', 'growth accounting · cohorts · activation → GrowthLedger'],
  ['Data modeling & modern stack', 'Kimball · SCD2 · dbt · CI/CD → Olist Platform'],
  ['Cloud & big data', 'Snowflake · BigQuery · PySpark · streaming → 5 projects'],
  ['BI tool fluency', 'Tableau · Power BI · LookML · Excel → 4 projects'],
  ['LLM engineering with evals', 'RAG · guardrails · measured accuracy → RAG Agent'],
  ['AI operations & FinOps', 'OTel GenAI tracing · cost/quality → TokenLedger'],
  ['Forecasting & backtesting', 'rolling-origin · honest baselines → Forecasting'],
  ['Domain depth', 'healthcare · insurance · fintech · marketing → 6 projects'],
  ['Testing & reproducibility', '190+ CI tests · seeded runs · decision docs → all repos'],
]

export const expertise: { group: string; items: string[] }[] = [
  { group: 'BI & visualization', items: ['Power BI · DAX', 'Tableau', 'LookML', 'Looker Studio', 'Excel · Power Query', 'Evidence.dev', 'Streamlit'] },
  { group: 'SQL, modeling & warehousing', items: ['SQL', 'dbt Core', 'Snowflake', 'BigQuery', 'DuckDB', 'PostgreSQL', 'Kimball modeling'] },
  { group: 'Python & statistics', items: ['pandas', 'scipy', 'statsmodels', 'scikit-learn', 'A/B testing', 'causal inference', 'forecasting'] },
  { group: 'Data engineering & cloud', items: ['PySpark', 'Delta Lake', 'Databricks', 'Pub/Sub', 'Cloud Run', 'GitHub Actions CI'] },
  { group: 'AI & LLM systems', items: ['Claude API', 'Gemini', 'LangChain', 'RAG', 'eval harnesses', 'OpenTelemetry GenAI'] },
  { group: 'Engineering practice', items: ['pytest', 'Git · GitHub', 'seeded reproducibility', 'decision records', 'data-quality gates'] },
]

export const queries: [string, string][] = [
  ["SELECT fpr FROM ab_tests WHERE method='naive_peeking';", '→ 24.0%  -- vs 1.2% always-valid'],
  ["SELECT accuracy FROM mrf_mapper WHERE eval='gold';", '→ 93.75%  (n=48)'],
  ['SELECT precision_at_50 FROM fraud_triage;', '→ 100%  -- vs 9.8% baseline'],
  ['SELECT w4_retention FROM cohorts GROUP BY activated;', '→ 45.3% vs 18.2%'],
  ['SELECT COUNT(*) FROM projects WHERE tested = TRUE;', '→ 20 rows  (190+ CI tests)'],
]

export const pipeline: { stage: string; note: string }[] = [
  { stage: 'Raw data', note: 'Land it untouched, with audit columns — bronze is the record of what the source actually sent.' },
  { stage: 'Validation', note: 'Planted-defect testing, quarantine with reasons, reconciliation that must sum exactly. Nothing silently dropped.' },
  { stage: 'Modeling', note: 'Dimensional schemas and tested transformations — definitions live in one place, under version control and CI.' },
  { stage: 'Analysis', note: 'The right method for the question: experiment when you can, quasi-experiment when you can’t, and honest baselines always.' },
  { stage: 'Visualization', note: 'Dashboards read pre-aggregated, governed marts — so "revenue" means the same thing on every chart.' },
  { stage: 'Decision', note: 'Every readout ends at an action, with its assumptions and confidence stated — not a chart dump.' },
]

export const process: { step: string; note: string }[] = [
  { step: 'Understand the decision', note: 'What action will this analysis change? If none, stop.' },
  { step: 'Audit the data', note: 'Profile it, break it, quarantine what fails — before any modeling.' },
  { step: 'Model & validate', note: 'Tested transformations, seeded reproducibility, defined metrics.' },
  { step: 'Analyze & visualize', note: 'Methods matched to questions; charts matched to decisions.' },
  { step: 'Communicate & iterate', note: 'Executive-ready readouts, assumptions on the table, follow-ups tracked.' },
]
