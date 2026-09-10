import { links } from "./content.js";
export const repoUrl = (repo) => `${links.github}/${repo}`;
export const sourceUrl = (repo, path = "README.md") =>
  `${repoUrl(repo)}/blob/main/${path}`;
export const impact = [
  {
    value: "20+",
    label: "Dashboards across three departments",
    context:
      "Tableau, Power BI, and Excel; KPI definitions through reporting specifications.",
  },
  {
    value: "88 → 94%",
    label: "Reporting accuracy",
    context: "Source-table investigation and validation before distribution.",
  },
  {
    value: "75%",
    label: "Less recurring report preparation",
    context:
      "4 hours → 1 hour through automated pulls, refreshes, and tracking.",
  },
  {
    value: "60%",
    label: "Faster dashboard refresh",
    context:
      "Snowflake SQL tuning, simplified joins, and fewer transformations.",
  },
];
export const capabilities = [
  {
    id: "build",
    label: "BI engineering",
    subtitle: "SQL, data models & automation",
    statement:
      "Build reliable models, pipelines, and automation so the same question produces a consistent answer.",
    signals: [
      "SQL & dimensional modeling",
      "dbt & Snowflake",
      "Pipelines & quality contracts",
      "Reporting automation",
    ],
    projects: [
      ["Commerce Analytics Warehouse", "dbt-snowflake-ecommerce"],
      ["Claims Quality & Utilization Lakehouse", "healthcare-claims-pipeline"],
      ["Governed LookML Semantic Layer", "looker-lookml-ecommerce"],
    ],
  },
  {
    id: "understand",
    label: "Business analysis",
    subtitle: "Requirements, KPIs & decisions",
    statement:
      "Translate business questions into measurable requirements, investigate what changed, and explain the options to stakeholders.",
    signals: [
      "Business requirements",
      "KPI definitions",
      "Financial analysis",
      "Experiment validity",
    ],
    projects: [
      ["Hospital Rate Intelligence", "hospital-price-intelligence"],
      ["Experiment Decision System", "ab-testing-framework"],
      ["Insurance Fraud Triage", "insurance-loss-analytics"],
    ],
  },
  {
    id: "communicate",
    label: "Dashboards & reporting",
    subtitle: "Power BI, Tableau & clear communication",
    statement:
      "Build dashboards and reports that help operations, finance, and leadership teams understand performance and decide what to do next.",
    signals: [
      "Tableau & Power BI",
      "Governed KPIs",
      "Executive reporting",
      "Stakeholder decision support",
    ],
    projects: [
      ["Executive Revenue Intelligence", "powerbi-dax-showcase"],
      ["Global Health Convergence Story", "tableau-storytelling"],
      ["Finance Data Automation", "excel-powerquery-casestudy"],
    ],
  },
];
export const provenance = {
  rates: {
    label: "Portfolio project · test data",
    text: "Fuzzy-matching baseline: 45 of 48 gold labels correct (93.75%). Three dialects, 360 parsed rows; eight project tests. Not a live hospital deployment.",
    repo: "hospital-price-intelligence",
    path: "tests/test_pricescope.py",
  },
  claims: {
    label: "Portfolio project · test data",
    text: "800 synthetic members; 50 duplicates + 23 negative payments + 25 orphan members = 98 quarantined. Twelve tests assert reconciliation and gold-layer calculations.",
    repo: "healthcare-claims-pipeline",
    path: "README.md",
  },
  experiment: {
    label: "Portfolio project · simulation",
    text: "500 A/A experiments, 14 interim looks. Naive false positives: 120/500 (24.0%); always-valid mSPRT: 6/500 (1.2%). Thirty-eight tests cover the framework.",
    repo: "ab-testing-framework",
    path: "examples/01_checkout_case_study.py",
  },
  assistant: {
    label: "Portfolio project · offline test",
    text: "14/14 heuristic routes and 8/8 retrieval hit@4 in a hermetic evaluation. Mock SQL evaluates execution plumbing, not live model-generation quality.",
    repo: "analytics-rag-agent",
    path: "eval/run_eval.py",
  },
  growth: {
    label: "Portfolio project · simulated users",
    text: "8,000 users, approximately 421k events. Week-four eligible cohorts exclude recent signups; activation is an association, not a causal estimate.",
    repo: "product-growth-analytics",
    path: "sql/activation_analysis.sql",
  },
  ops: {
    label: "Portfolio project · test data",
    text: "30-day scaled corpus: 27,683 spans. Prompt-v2 evaluation score rose 6.5 percentage points while cost per successful answer rose 1.35×. Nine tests pin planted patterns.",
    repo: "llm-ops-analytics",
    path: "src/tokenledger/findings.py",
  },
};
