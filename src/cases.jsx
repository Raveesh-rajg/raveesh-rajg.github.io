/* Case-study content — every figure below is a measured, seeded result
   from the named repo's test suite or verified run. */

import { Bars, Line } from './Case.jsx'

export const cases = {
  'hospital-price-intelligence': {
    repo: 'hospital-price-intelligence',
    kicker: 'Healthcare · Policy · AI',
    title: 'PriceScope — Hospital Price Transparency Intelligence',
    lede: 'Turning the healthcare dataset everyone cites and nobody can use into payer-negotiation intelligence.',
    stack: ['DuckDB', 'Python', 'Claude API', 'Evidence.dev', '8 tests'],
    problem: "Since 2021, CMS requires every US hospital to publish its negotiated payer rates in machine-readable files. In practice the data is unusable: multi-GB files, at least three incompatible format dialects, and free-text charge descriptions ('TKA - KNEE JOINT REPLC') that defeat any exact join. Research literature documents ~91% posting compliance and near-zero analytical usability.",
    built: 'Dialect-detecting parsers (CMS v2.2 JSON-tall, CSV-tall with junk metadata headers, CSV-wide with per-payer columns) landing in one canonical rate table; a data-quality gate that quarantines implausible rows with reasons; a charge-description mapper (normalization + fuzzy scoring, with a Claude-powered mapper behind the same measured eval); and market analytics: Medicare-multiple benchmarks, cross-hospital dispersion, and negotiation-exposure rankings.',
    chartCaption: 'Cross-hospital price dispersion — p90/p10 ratio of negotiated rates, same procedure, same payers, same market:',
    chart: <Bars unit="×" items={[
      { label: 'Knee arthroscopy', v: 2.94 },
      { label: 'Total hip replacement', v: 2.70 },
      { label: 'Total knee replacement', v: 2.69, color: 'var(--accent-2)' },
    ]} />,
    facts: [
      '360/360 fixture rows recovered across 3 format dialects, 6 hospitals',
      'Description→CPT mapping measured at 93.75% against a gold crosswalk (n=48); misses are cross-modality confusions — the LLM mapper’s case',
      'Median negotiated rate across the book: 2.64× Medicare',
      'Planted ortho outlier recovered as top negotiation exposure (~$6.8M modeled annual)',
      '7/7 planted data defects flagged and quarantined — never silently dropped',
    ],
    decisions: [
      'Why quarantine instead of dropping or fixing bad rows (audit trail beats convenience)',
      'Why the mapper ships a fuzzy baseline AND an LLM slot behind one eval — measured swap, not hoped swap',
      'Why exposure modeling states its volume assumption instead of hiding it',
    ],
  },

  'ab-testing-framework': {
    repo: 'ab-testing-framework',
    kicker: 'Experimentation Statistics',
    title: 'A/B Testing & Experimentation Framework',
    lede: 'The three ways experiments quietly lie — peeking, novelty, Simpson’s paradox — planted in data and caught by code.',
    stack: ['Python', 'scipy', 'statsmodels', 'Streamlit', '38 tests'],
    problem: 'Most experiment write-ups end at "p < 0.05." In practice experiments fail earlier and quieter: teams stop the test the first day the dashboard turns green (peeking), project launch-week lift forward (novelty), or read a pooled number that every segment contradicts (Simpson’s paradox).',
    built: 'A full experimentation stack: power analysis with simulation cross-checks, frequentist engine (Welch default, delta-method relative-lift CIs), Bayesian engine (Beta-Binomial with expected-loss decisions), always-valid sequential inference (mSPRT), SRM gates that block corrupted readouts, and a worked case study where all three traps are planted and detected.',
    chartCaption: 'False-positive rate in A/A simulations (500 experiments, 14 looks each) — the cost of peeking, measured:',
    chart: <Bars unit="%" items={[
      { label: 'Nominal α', v: 5, color: 'var(--dim)' },
      { label: 'Naive daily peeking', v: 24, color: '#f87171' },
      { label: 'mSPRT always-valid', v: 1.2 },
    ]} />,
    facts: [
      'Novelty trap: full-period lift read +3.67% while last-5-days truth was +1.86% — flagged automatically',
      'Simpson’s trap: pooled −22.9% (p<1e-47) while BOTH segments improved ~+9.6% — detector blocks the pooled read',
      'CI coverage and null false-positive rates verified empirically in the test suite',
    ],
    decisions: [
      'Pooled vs unpooled standard errors — and why mixing them breaks CI/p-value consistency',
      'Expected loss as the Bayesian ship rule instead of a bare P(B>A) threshold',
      'Why mSPRT over group-sequential for dashboard-monitored experiments',
    ],
  },

  'causal-inference-casebook': {
    repo: 'causal-inference-casebook',
    kicker: 'Causal Inference',
    title: 'Causal Inference Casebook',
    lede: 'When you can’t run the experiment: three quasi-experimental methods, each proving itself against planted truth.',
    stack: ['Python', 'statsmodels', 'scipy', 'scikit-learn', '9 tests'],
    problem: 'Half of real business decisions can’t be randomized — the rollout already happened, only one unit was treated, or adoption self-selects. The difference between an analyst and a dashboard operator is knowing what replaces randomization and what it costs.',
    built: 'Three complete cases with known ground truth: difference-in-differences on a confounded store rollout (with event-study pre-trend checks and placebo-in-time), synthetic control for a single treated unit (constrained-weights fit, placebo-in-space permutation inference), and propensity stratification for self-selected feature adoption (with covariate-balance verification).',
    chartCaption: 'The DiD case: what a dashboard shows vs what the method recovers vs planted truth:',
    chart: <Bars unit="" items={[
      { label: 'Naive treated-vs-control gap', v: 44.2, color: '#f87171' },
      { label: 'DiD estimate (±0.35 SE)', v: 7.97 },
      { label: 'Planted truth', v: 8.0, color: 'var(--accent-2)' },
    ]} />,
    facts: [
      'Synthetic control: pre-period RMSE 1.9, ATT −9.1 vs planted −12, permutation p = 0.095 (honest 21-unit inference)',
      'Matching case: naive gap $40.5 vs true effect $15 — stratification recovers $15.9; SMD halves within strata',
      'Every case computes the naive answer FIRST and shows it wrong',
    ],
    decisions: [
      'The NNLS renormalization bug: sum-to-one must live inside the solver — found by a failing test, kept as the lesson',
      'Why matching only handles observed confounding, and what that caveat means for real data',
      'Placebo tests as the assumption made executable',
    ],
  },

  'product-growth-analytics': {
    repo: 'product-growth-analytics',
    kicker: 'Product & Growth Analytics',
    title: 'GrowthLedger — Growth Accounting & Retention',
    lede: 'The four questions every growth team circles, answered in SQL on a 421k-event log with planted mechanics.',
    stack: ['SQL', 'DuckDB', 'Python', '6 tests'],
    problem: 'MAU going up tells you nothing about whether growth is healthy — it can rise while the product leaks users, borrowed from acquisition spend. Blended retention averages hide cohort mix-shift. Activation claims are usually selection bias wearing a causal costume.',
    built: 'Growth accounting decomposing MAU into new / retained / resurrected with quick ratio (flows sum exactly, by test); weekly cohort retention triangles in pure SQL; aha-moment activation analysis with right-censoring handled correctly; and the L28 power-user curve. The generator plants an activation effect, a channel-quality gap, and a feature that bends the churn curve — all recovered.',
    chartCaption: 'Quick ratio by month — (new + resurrected) / churned. Above 1: earning growth. Below 1: borrowing it:',
    chart: <Line points={[1.59, 1.32, 1.38, 0.77]} labels={['Mar', 'Apr', 'May', 'Jun']} refLine={1} />,
    facts: [
      'Week-4 retention: 45.3% for users hitting the aha-moment within 3 days vs 18.2% without — reported as correlation, with the experiment (sibling A/B project) named as the causal path',
      'Week-0 "retention" is ~72%, not 100% — onboarding drop-off found by a test that assumed 1.0 and was wrong',
      'Organic retains >1.5× paid_social at week 4 (the leaky-bucket acquisition story)',
    ],
    decisions: [
      'Why the funnel counts sessions, not hits — the denominator IS the analysis',
      'Growth accounting definitions stated precisely (retained vs resurrected) — the interview is in the definitions',
      'Right-censoring: why recent signups must be excluded from week-4 claims',
    ],
  },

  'analytics-rag-agent': {
    repo: 'analytics-rag-agent',
    kicker: 'AI Engineering',
    title: 'Analytics RAG Agent — Chat With the Data Platform',
    lede: 'Not a chatbot demo: a governed analytics interface where every answer carries its evidence.',
    stack: ['Python', 'LangChain', 'Chroma', 'Claude API', 'DuckDB', '33 tests'],
    problem: 'Teams want to "chat with data," but ungoverned text-to-SQL fabricates numbers and a doc chatbot can’t compute. The two need different engines, different guardrails, and different definitions of a good answer.',
    built: 'A router (heuristic-first, LLM tiebreak) sending definition questions to catalog RAG with cited sources and quantitative questions to guarded text-to-SQL — validation layers enforced in code (single statement, DDL/DML denylist, table allowlist, forced LIMIT, read-only connection), schema grounded by live introspection, plus a hermetic eval harness with a mock provider so CI runs free.',
    chartCaption: 'Offline evaluation — measured, reproducible, zero API cost:',
    chart: <Bars unit="%" items={[
      { label: 'Routing accuracy (14 cases)', v: 100 },
      { label: 'Retrieval hit@4 (8 cases)', v: 100 },
      { label: 'Hostile SQL blocked (guard suite)', v: 100, color: 'var(--accent-2)' },
    ]} />,
    facts: [
      'Guards are the security boundary — prompts are a courtesy; WITH...DELETE tricks, allowlist escapes, and multi-statement injections all blocked by test',
      'Ambiguous routes default to the docs path: a wrong docs answer says "I don’t know," a wrong SQL answer fabricates a number',
      'A real retrieval failure (snake_case vs natural phrasing) fixed and kept as a regression test',
    ],
    decisions: [
      'Why guardrails live outside the model, layered with read-only execution as defense in depth',
      'Why the offline eval grades plumbing and only --live grades the model — and why that distinction is the credibility',
      'TF-IDF baseline embeddings: hermetic CI now, neural drop-in when the corpus demands it',
    ],
  },

  'llm-ops-analytics': {
    repo: 'llm-ops-analytics',
    kicker: 'AI Operations · FinOps',
    title: 'TokenLedger — LLM Cost & Quality Analytics',
    lede: 'Analytics ON the AI: 27,683 traced calls answering what a successful answer costs and which prompts earn their spend.',
    stack: ['Python', 'DuckDB', 'OpenTelemetry GenAI', 'Streamlit', '9 tests'],
    problem: 'AI spend triples and nobody can say which features, prompts, or models earn it. Cost per call — the number everyone tracks — hides exactly the waste that matters, because retries and failures spend tokens without producing answers.',
    built: 'A tracing wrapper emitting OpenTelemetry GenAI-convention spans from this portfolio’s own RAG agent (real call patterns, scaled by a seeded generator with planted operational incidents), a DuckDB trace warehouse, and detectors for the three findings the tests pin: a prompt rollout that trades cost for quality, a retry storm invisible in cost charts, and route-specific latency drift.',
    chartCaption: 'Prompt v2 rollout: quality per dollar BY ROUTE — quality rose, efficiency fell. This table is the rollout decision:',
    chart: <Bars unit="" items={[
      { label: 'Synthesis · v1 (eval/$)', v: 169, color: 'var(--dim)' },
      { label: 'Synthesis · v2 (eval/$)', v: 133, color: '#f87171' },
      { label: 'Text-to-SQL · v1 (eval/$)', v: 405, color: 'var(--dim)' },
      { label: 'Text-to-SQL · v2 (eval/$)', v: 352, color: '#f87171' },
    ]} />,
    facts: [
      'v2 prompt: +6.5pp eval score at 1.35× cost per success — a decision, not a verdict',
      'Retry storm day: 195 failed calls, failure z = 5.3 while raw cost z = 0.5 — waste a cost chart cannot see',
      'Spans emitted even when calls THROW — untraced failures are invisible spend (pinned by test)',
    ],
    decisions: [
      'Cost per SUCCESSFUL answer as the headline metric — the denominator argument, executable',
      'OTel GenAI field names so the schema drops into real collectors',
      'Pricing as data, not code — cost joins reproducible across pricing vintages',
    ],
  },
}
