/* Case-study content. Chart data is declarative so the page stays a
   server-component-friendly module; every figure is a measured result. */

export interface CaseStudy {
  slug: string; kicker: string; title: string; lede: string; stack: string[]
  problem: string; built: string
  chartCaption: string
  chart: { kind: 'bars'; unit: string; items: { label: string; v: number; color?: string }[] }
       | { kind: 'line'; points: number[]; labels: string[]; refLine?: number }
  facts: string[]; decisions: string[]
}

export const cases: Record<string, CaseStudy> = {
  'hospital-price-intelligence': {
    slug: 'hospital-price-intelligence', kicker: 'Healthcare · Policy · AI',
    title: 'PriceScope — Hospital Price Transparency Intelligence',
    lede: 'Turning the healthcare dataset everyone cites and nobody can use into payer-negotiation intelligence.',
    stack: ['DuckDB', 'Python', 'Claude API', 'Evidence.dev', '8 tests'],
    problem: 'Since 2021, CMS requires every US hospital to publish negotiated payer rates in machine-readable files. In practice the data is unusable: multi-GB files, three incompatible dialects, and free-text charge descriptions that defeat exact joins. Research documents ~91% posting compliance and near-zero analytical usability.',
    built: 'Dialect-detecting parsers landing in one canonical rate table; a data-quality gate that quarantines implausible rows with reasons; a charge-description mapper (normalization + fuzzy scoring, with a Claude-powered mapper behind the same measured eval); and market analytics: Medicare-multiple benchmarks, cross-hospital dispersion, negotiation-exposure rankings.',
    chartCaption: 'Cross-hospital price dispersion — p90/p10 ratio of negotiated rates, same procedure, same market:',
    chart: { kind: 'bars', unit: '×', items: [
      { label: 'Knee arthroscopy', v: 2.94 },
      { label: 'Total hip replacement', v: 2.7 },
      { label: 'Total knee replacement', v: 2.69, color: '#a78bfa' },
    ]},
    facts: [
      '360/360 fixture rows recovered across 3 format dialects, 6 hospitals',
      'Description→CPT mapping measured at 93.75% against a gold crosswalk (n=48)',
      'Median negotiated rate across the book: 2.64× Medicare',
      'Planted ortho outlier recovered as top negotiation exposure (~$6.8M modeled annual)',
      '7/7 planted data defects flagged and quarantined — never silently dropped',
    ],
    decisions: [
      'Why quarantine instead of dropping or fixing bad rows — audit trail beats convenience',
      'Why the mapper ships a fuzzy baseline AND an LLM slot behind one eval',
      'Why exposure modeling states its volume assumption instead of hiding it',
    ],
  },
  'ab-testing-framework': {
    slug: 'ab-testing-framework', kicker: 'Experimentation Statistics',
    title: 'expkit — A/B Testing & Experimentation Framework',
    lede: 'The three ways experiments quietly lie — peeking, novelty, Simpson’s paradox — planted in data and caught by code.',
    stack: ['Python', 'scipy', 'statsmodels', 'Streamlit', '38 tests'],
    problem: 'Most experiment write-ups end at p < 0.05. In practice experiments fail earlier and quieter: teams stop the test the first day the dashboard turns green, project launch-week lift forward, or read a pooled number every segment contradicts.',
    built: 'Power analysis with simulation cross-checks, a frequentist engine (Welch default, delta-method relative-lift CIs), a Bayesian engine (Beta-Binomial with expected-loss decisions), always-valid sequential inference (mSPRT), SRM gates that block corrupted readouts, and a worked case study where all three traps are planted and detected.',
    chartCaption: 'False-positive rate in A/A simulations (500 experiments, 14 looks each) — the cost of peeking, measured:',
    chart: { kind: 'bars', unit: '%', items: [
      { label: 'Nominal α', v: 5, color: '#5d6478' },
      { label: 'Naive daily peeking', v: 24, color: '#f87171' },
      { label: 'mSPRT always-valid', v: 1.2 },
    ]},
    facts: [
      'Novelty trap: full-period lift read +3.67% while last-5-days truth was +1.86% — flagged automatically',
      'Simpson’s trap: pooled −22.9% while BOTH segments improved ~+9.6% — detector blocks the pooled read',
      'CI coverage and null false-positive rates verified empirically in the test suite',
    ],
    decisions: [
      'Pooled vs unpooled standard errors — and why mixing them breaks consistency',
      'Expected loss as the Bayesian ship rule instead of a bare P(B>A) threshold',
      'Why mSPRT over group-sequential for dashboard-monitored experiments',
    ],
  },
  'causal-inference-casebook': {
    slug: 'causal-inference-casebook', kicker: 'Causal Inference',
    title: 'Causal Inference Casebook',
    lede: 'When you can’t run the experiment: three quasi-experimental methods, each proving itself against planted truth.',
    stack: ['Python', 'statsmodels', 'scipy', 'scikit-learn', '9 tests'],
    problem: 'Half of real business decisions can’t be randomized — the rollout already happened, only one unit was treated, or adoption self-selects. Knowing what replaces randomization, and what it costs, is the senior-analyst skill.',
    built: 'Difference-in-differences on a confounded store rollout (event-study pre-trends, placebo-in-time), synthetic control for a single treated unit (constrained weights, placebo-in-space permutation inference), and propensity stratification for self-selected adoption (with covariate-balance verification).',
    chartCaption: 'The DiD case: what a dashboard shows vs what the method recovers vs planted truth:',
    chart: { kind: 'bars', unit: '', items: [
      { label: 'Naive treated-vs-control', v: 44.2, color: '#f87171' },
      { label: 'DiD estimate (±0.35 SE)', v: 7.97 },
      { label: 'Planted truth', v: 8, color: '#a78bfa' },
    ]},
    facts: [
      'Synthetic control: pre-RMSE 1.9, ATT −9.1 vs planted −12, permutation p = 0.095',
      'Matching: naive $40.5 vs true $15 — stratification recovers $15.9; SMD halves within strata',
      'Every case computes the naive answer FIRST and shows it wrong',
    ],
    decisions: [
      'The NNLS renormalization bug — sum-to-one must live inside the solver; found by a failing test',
      'Why matching only handles observed confounding, and what that means for real data',
      'Placebo tests as the assumption made executable',
    ],
  },
  'product-growth-analytics': {
    slug: 'product-growth-analytics', kicker: 'Product & Growth Analytics',
    title: 'GrowthLedger — Growth Accounting & Retention',
    lede: 'The four questions every growth team circles, answered in SQL on a 421k-event log with planted mechanics.',
    stack: ['SQL', 'DuckDB', 'Python', '6 tests'],
    problem: 'MAU rising tells you nothing about whether growth is healthy — it can climb while the product leaks users, borrowed from acquisition spend. Blended retention averages hide cohort mix-shift; activation claims are usually selection bias in a causal costume.',
    built: 'Growth accounting decomposing MAU into new / retained / resurrected with quick ratio (flows sum exactly, by test); weekly cohort retention triangles in pure SQL; aha-moment activation analysis with right-censoring handled; the L28 power-user curve. The generator plants an activation effect, a channel-quality gap, and a curve-bending feature — all recovered.',
    chartCaption: 'Quick ratio by month — (new + resurrected) / churned. Above 1: earning growth. Below 1: borrowing it:',
    chart: { kind: 'line', points: [1.59, 1.32, 1.38, 0.77], labels: ['Mar', 'Apr', 'May', 'Jun'], refLine: 1 },
    facts: [
      'Week-4 retention: 45.3% for aha-moment users vs 18.2% — reported as correlation, with the experiment named as the causal path',
      'Week-0 “retention” is ~72%, not 100% — onboarding drop-off found by a test that assumed 1.0 and was wrong',
      'Organic retains >1.5× paid social at week 4 — the leaky-bucket acquisition story',
    ],
    decisions: [
      'Why the funnel counts sessions, not hits — the denominator IS the analysis',
      'Growth-accounting definitions stated precisely — the interview lives in the definitions',
      'Right-censoring: why recent signups must be excluded from week-4 claims',
    ],
  },
  'analytics-rag-agent': {
    slug: 'analytics-rag-agent', kicker: 'AI Engineering',
    title: 'Analytics RAG Agent — Chat With the Data Platform',
    lede: 'Not a chatbot demo: a governed analytics interface where every answer carries its evidence.',
    stack: ['Python', 'LangChain', 'Chroma', 'Claude API', 'DuckDB', '33 tests'],
    problem: 'Teams want to “chat with data,” but ungoverned text-to-SQL fabricates numbers and a doc chatbot can’t compute. The two need different engines, different guardrails, and different definitions of a good answer.',
    built: 'A router (heuristic-first, LLM tiebreak) sending definition questions to catalog RAG with cited sources and quantitative questions to guarded text-to-SQL — validation enforced in code (single statement, DDL/DML denylist, table allowlist, forced LIMIT, read-only connection), schema grounded by live introspection, plus a hermetic eval harness.',
    chartCaption: 'Offline evaluation — measured, reproducible, zero API cost:',
    chart: { kind: 'bars', unit: '%', items: [
      { label: 'Routing accuracy (14)', v: 100 },
      { label: 'Retrieval hit@4 (8)', v: 100 },
      { label: 'Hostile SQL blocked', v: 100, color: '#a78bfa' },
    ]},
    facts: [
      'Guards are the boundary — WITH…DELETE tricks, allowlist escapes, multi-statement injections all blocked by test',
      'Ambiguous routes default to docs: a wrong docs answer says “I don’t know”; wrong SQL fabricates',
      'A real retrieval failure (snake_case vs natural phrasing) fixed and kept as a regression test',
    ],
    decisions: [
      'Why guardrails live outside the model, layered with read-only execution',
      'Why offline eval grades plumbing and only --live grades the model',
      'TF-IDF baseline embeddings: hermetic CI now, neural drop-in when the corpus demands it',
    ],
  },
  'llm-ops-analytics': {
    slug: 'llm-ops-analytics', kicker: 'AI Operations · FinOps',
    title: 'TokenLedger — LLM Cost & Quality Analytics',
    lede: 'Analytics ON the AI: 27,683 traced calls answering what a successful answer costs and which prompts earn their spend.',
    stack: ['Python', 'DuckDB', 'OpenTelemetry GenAI', 'Streamlit', '9 tests'],
    problem: 'AI spend triples and nobody can say which features, prompts, or models earn it. Cost per call — the number everyone tracks — hides the waste that matters, because retries and failures spend tokens without producing answers.',
    built: 'A tracing wrapper emitting OpenTelemetry GenAI-convention spans from this portfolio’s own RAG agent, scaled by a seeded generator with planted incidents; a DuckDB trace warehouse; detectors for the three findings the tests pin: a cost/quality prompt trade, a retry storm invisible in cost charts, and route-specific latency drift.',
    chartCaption: 'Prompt v2 rollout: quality per dollar BY ROUTE — quality rose, efficiency fell. This chart is the rollout decision:',
    chart: { kind: 'bars', unit: '', items: [
      { label: 'Synthesis · v1 (eval/$)', v: 169, color: '#5d6478' },
      { label: 'Synthesis · v2 (eval/$)', v: 133, color: '#f87171' },
      { label: 'Text-to-SQL · v1 (eval/$)', v: 405, color: '#5d6478' },
      { label: 'Text-to-SQL · v2 (eval/$)', v: 352, color: '#f87171' },
    ]},
    facts: [
      'v2 prompt: +6.5pp eval score at 1.35× cost per success — a decision, not a verdict',
      'Retry storm: 195 failed calls, failure z = 5.3 while raw cost z = 0.5',
      'Spans emitted even when calls THROW — untraced failures are invisible spend (pinned by test)',
    ],
    decisions: [
      'Cost per SUCCESSFUL answer as the headline metric — the denominator argument, executable',
      'OTel GenAI field names so the schema drops into real collectors',
      'Pricing as data, not code — cost joins reproducible across pricing vintages',
    ],
  },
}
