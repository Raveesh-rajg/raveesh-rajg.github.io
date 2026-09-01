export const links = {
  github: 'https://github.com/Raveesh-rajg',
  linkedin: 'https://www.linkedin.com/in/raveeshrajg/',
  resume: './resume.pdf',
  email: 'mailto:raveeshraj26@gmail.com',
}

export const roleLenses = [
  {
    id: 'bi-engineer',
    label: 'BI Engineer',
    statement: 'Build governed metric layers, dimensional models, and reporting systems that stay consistent from warehouse to executive review.',
    signals: ['Snowflake + dbt', 'Power BI + Tableau', 'Semantic governance'],
    projects: [
      ['Commerce Analytics Warehouse', 'dbt-snowflake-ecommerce'],
      ['Governed LookML Semantic Layer', 'looker-lookml-ecommerce'],
      ['Executive Revenue Intelligence', 'powerbi-dax-showcase'],
    ],
  },
  {
    id: 'data-analyst',
    label: 'Data Analyst',
    statement: 'Turn ambiguous questions into reproducible analysis, validated metrics, and concise decisions without overstating certainty.',
    signals: ['Advanced SQL', 'Python analysis', 'Statistical validation'],
    projects: [
      ['Experiment Decision System', 'ab-testing-framework'],
      ['Growth Accounting & Retention', 'product-growth-analytics'],
      ['Demand Forecasting & Serving', 'vertex-forecasting'],
    ],
  },
  {
    id: 'business-analyst',
    label: 'Business Analyst',
    statement: 'Translate stakeholder questions into KPI definitions, reporting specifications, workflow improvements, and decision-ready evidence.',
    signals: ['Requirements framing', 'KPI definition', 'Variance analysis'],
    projects: [
      ['Executive Revenue Intelligence', 'powerbi-dax-showcase'],
      ['Finance Data Automation', 'excel-powerquery-casestudy'],
      ['Global Health Convergence Story', 'tableau-storytelling'],
    ],
  },
  {
    id: 'healthcare-analyst',
    label: 'Healthcare Analyst',
    statement: 'Apply clinical context to claims, utilization, hospital rates, operational workflows, and the quality controls behind healthcare reporting.',
    signals: ['Epic-connected reporting', 'Claims + utilization', 'Price transparency'],
    projects: [
      ['Hospital Rate Intelligence', 'hospital-price-intelligence'],
      ['Claims Quality & Utilization Lakehouse', 'healthcare-claims-pipeline'],
      ['Insurance Fraud Triage', 'insurance-loss-analytics'],
    ],
  },
  {
    id: 'clinical-data-scientist',
    label: 'Clinical Data Scientist',
    statement: 'Connect clinical framing with reproducible modeling, causal reasoning, evaluation design, and explicit limits on what the evidence can support.',
    signals: ['Clinical research context', 'Causal inference', 'Model evaluation'],
    projects: [
      ['Causal Impact Measurement', 'causal-inference-casebook'],
      ['Experiment Decision System', 'ab-testing-framework'],
      ['Review Intelligence Pipeline', 'review-nlp-pipeline'],
    ],
  },
]

export const exhibits = [
  {
    id: 'rates',
    number: '01',
    code: 'RATE / INTELLIGENCE',
    discipline: 'Healthcare analytics',
    title: 'Hospital Rate Intelligence',
    statement:
      'Turns three incompatible CMS price-file dialects and dirty charge descriptions into comparable payer-rate evidence.',
    proof: '93.75%',
    proofLabel: 'charge descriptions mapped against a gold crosswalk',
    evidence: ['2.64× Medicare median', '7/7 planted defects quarantined', '$6.8M modeled exposure surfaced'],
    system: ['parse', 'quarantine', 'map', 'benchmark'],
    tools: ['Python', 'DuckDB', 'dbt', 'Evidence'],
    repo: 'hospital-price-intelligence',
    note:
      'The point was not another price dashboard. It was a defensible route from hostile public files to a negotiation question a finance leader could act on.',
  },
  {
    id: 'experiment',
    number: '02',
    code: 'EXPERIMENT / DECISION',
    discipline: 'Experimentation statistics',
    title: 'Experiment Decision System',
    statement:
      'Treats peeking, novelty, sample-ratio mismatch, and Simpson\'s paradox as first-class failure modes, not footnotes.',
    proof: '24.0 → 1.2%',
    proofLabel: 'false-positive rate, naive daily peeking versus always-valid mSPRT',
    evidence: ['500 A/A simulations', '38 tests', '3 planted traps detected'],
    system: ['design', 'validate', 'infer', 'decide'],
    tools: ['Python', 'SciPy', 'statsmodels', 'Streamlit'],
    repo: 'ab-testing-framework',
    note:
      'The framework blocks a confident answer when the experiment itself is untrustworthy. That gate is the product, not the p-value.',
  },
  {
    id: 'claims',
    number: '03',
    code: 'CLAIMS / QUALITY',
    discipline: 'Healthcare data engineering',
    title: 'Claims Quality & Utilization Lakehouse',
    statement:
      'Builds a bronze-to-gold claims path where every rejected row keeps a reason and every source count reconciles.',
    proof: '98 / 98',
    proofLabel: 'planted claim defects isolated with zero silent drops',
    evidence: ['2,889 source claims', '20.9% readmission rate', '12 tests'],
    system: ['land', 'validate', 'reconcile', 'serve'],
    tools: ['PySpark', 'Delta Lake', 'CMS DE-SynPUF', 'pytest'],
    repo: 'healthcare-claims-pipeline',
    note:
      'The quality contract is explicit: clean plus quarantine must equal source. No row vanishes because it was inconvenient.',
  },
  {
    id: 'assistant',
    number: '04',
    code: 'AI / GOVERNANCE',
    discipline: 'Applied AI engineering',
    title: 'Governed Analytics Assistant',
    statement:
      'Routes definition questions to cited documentation and quantitative questions to guarded, read-only SQL.',
    proof: '14 / 14',
    proofLabel: 'questions routed correctly in the offline evaluation',
    evidence: ['8/8 retrieval hit@4', '4 validation layers', '33 hermetic tests'],
    system: ['route', 'retrieve', 'guard', 'evidence'],
    tools: ['Python', 'LangChain', 'Chroma', 'DuckDB'],
    repo: 'analytics-rag-agent',
    note:
      'Prompts are not the security boundary. Statement validation, table allowlists, forced limits, and read-only execution live outside the model.',
  },
  {
    id: 'ops',
    number: '05',
    code: 'AI / OPERATIONS',
    discipline: 'AI observability',
    title: 'AI Spend & Reliability Control',
    statement:
      'Instruments an analytics agent so leaders can see what a successful answer costs, where quality moves, and where retries waste spend.',
    proof: '+6.5pp / 1.35×',
    proofLabel: 'quality gain versus cost increase after a prompt rollout',
    evidence: ['27,683 traced calls', 'retry anomaly z = 5.3', '9 tests'],
    system: ['trace', 'warehouse', 'compare', 'alert'],
    tools: ['OpenTelemetry', 'Python', 'DuckDB', 'Streamlit'],
    repo: 'llm-ops-analytics',
    note:
      'Cost per call hides failure. Cost per successful answer exposes it, which changes the denominator and the decision.',
  },
  {
    id: 'growth',
    number: '06',
    code: 'GROWTH / RETENTION',
    discipline: 'Product analytics',
    title: 'Growth Accounting & Retention',
    statement:
      'Separates new, retained, resurrected, and churned users so rising activity cannot disguise a leaking product.',
    proof: '45.3% vs 18.2%',
    proofLabel: 'week-four retention for activated versus non-activated users',
    evidence: ['421k events', 'quick ratio 1.6 → 0.8', '6 tests'],
    system: ['define', 'cohort', 'decompose', 'explain'],
    tools: ['SQL', 'DuckDB', 'Python', 'pytest'],
    repo: 'product-growth-analytics',
    note:
      'The activation result is presented as correlation, with right-censoring handled and the experiment named as the path to causality.',
  },
]

export const archive = [
  ['01', 'Hospital Rate Intelligence', 'Healthcare', '93.75% mapped', 'hospital-price-intelligence'],
  ['02', 'Claims Quality & Utilization Lakehouse', 'Healthcare', '98/98 defects isolated', 'healthcare-claims-pipeline'],
  ['03', 'Experiment Decision System', 'Decision science', '38 tests', 'ab-testing-framework'],
  ['04', 'Causal Impact Measurement', 'Decision science', '3 methods verified', 'causal-inference-casebook'],
  ['05', 'Growth Accounting & Retention', 'Product', '421k events', 'product-growth-analytics'],
  ['06', 'Governed Analytics Assistant', 'AI', '33 tests', 'analytics-rag-agent'],
  ['07', 'AI Spend & Reliability Control', 'AI', '27,683 traces', 'llm-ops-analytics'],
  ['08', 'Review Intelligence Pipeline', 'AI', '400/400 validated', 'review-nlp-pipeline'],
  ['09', 'Commerce Analytics Warehouse', 'Data engineering', '26 source tests', 'dbt-snowflake-ecommerce'],
  ['10', 'Digital Analytics Governance Platform', 'Data engineering', '10 guard tests', 'ga-bigquery-analytics'],
  ['11', 'Real-Time Customer Event Pipeline', 'Data engineering', '7 offline tests', 'gcp-streaming-pipeline'],
  ['12', 'Demand Forecasting & Serving', 'Decision science', '19 backtest folds', 'vertex-forecasting'],
  ['13', 'Insurance Fraud Triage & Loss Intelligence', 'Risk', '100% precision@50', 'insurance-loss-analytics'],
  ['14', 'Credit Complaint Early-Warning System', 'Risk', '5.2× surge found', 'credit-complaint-intelligence'],
  ['15', 'Marketing Attribution Reality Check', 'Decision science', '5 models graded', 'marketing-attribution-lab'],
  ['16', 'Executive Revenue Intelligence', 'BI', '69,868-row fact', 'powerbi-dax-showcase'],
  ['17', 'Global Health Convergence Story', 'BI', '6-point narrative', 'tableau-storytelling'],
  ['18', 'Governed LookML Semantic Layer', 'BI', '10-test CI', 'looker-lookml-ecommerce'],
  ['19', 'Finance Data Automation in Power Query', 'BI', '6 messy exports', 'excel-powerquery-casestudy'],
  ['20', 'SQL Systems & Performance Casebook', 'Data engineering', '8 edge cases', 'sql-puzzles'],
]

export const method = [
  {
    number: 'I',
    title: 'Define the decision',
    body: 'Start with the choice, owner, and cost of being wrong. A metric without a decision is decoration.',
  },
  {
    number: 'II',
    title: 'Engineer the evidence',
    body: 'Make lineage, grain, exclusions, and quality rules explicit before the visual layer earns attention.',
  },
  {
    number: 'III',
    title: 'Attack the answer',
    body: 'Plant defects, test assumptions, compare baselines, and keep failure cases as regression tests.',
  },
  {
    number: 'IV',
    title: 'Make it legible',
    body: 'Translate the system into an interface a clinical, operational, or executive audience can use confidently.',
  },
]
