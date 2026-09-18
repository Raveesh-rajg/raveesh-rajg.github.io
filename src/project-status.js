export const projectStatus = {
  "hospital-price-intelligence": {
    "evidence": "8 tests \u00b7 45/48 mappings",
    "status": "Local pipeline verified",
    "boundary": "Live MRFs and Evidence dashboard pending",
    "checks": "https://github.com/Raveesh-rajg/hospital-price-intelligence/actions"
  },
  "healthcare-claims-pipeline": {
    "evidence": "12 tests \u00b7 exact reconciliation",
    "status": "PySpark CI verified",
    "boundary": "Delta/Databricks validation pending",
    "checks": "https://github.com/Raveesh-rajg/healthcare-claims-pipeline/actions"
  },
  "ab-testing-framework": {
    "evidence": "38 tests \u00b7 simulation checks",
    "status": "Local framework verified",
    "boundary": "Synthetic experiments",
    "checks": "https://github.com/Raveesh-rajg/ab-testing-framework/actions"
  },
  "causal-inference-casebook": {
    "evidence": "9 tests \u00b7 three methods",
    "status": "Local methods verified",
    "boundary": "Synthetic causal cases",
    "checks": "https://github.com/Raveesh-rajg/causal-inference-casebook/actions"
  },
  "product-growth-analytics": {
    "evidence": "6 tests \u00b7 SQL reconciliation",
    "status": "Local analysis verified",
    "boundary": "Synthetic events; association, not causation",
    "checks": "https://github.com/Raveesh-rajg/product-growth-analytics/actions"
  },
  "analytics-rag-agent": {
    "evidence": "42 tests \u00b7 guarded SQL",
    "status": "Offline agent verified",
    "boundary": "Live LLM quality unverified",
    "checks": "https://github.com/Raveesh-rajg/analytics-rag-agent/actions"
  },
  "llm-ops-analytics": {
    "evidence": "9 tests \u00b7 trace and cost checks",
    "status": "Local analytics verified",
    "boundary": "Synthetic scaled traces; estimated spend",
    "checks": "https://github.com/Raveesh-rajg/llm-ops-analytics/actions"
  },
  "review-nlp-pipeline": {
    "evidence": "21 tests \u00b7 resumable ingestion",
    "status": "Local pipeline verified",
    "boundary": "Live extraction quality unverified",
    "checks": "https://github.com/Raveesh-rajg/review-nlp-pipeline/actions"
  },
  "dbt-snowflake-ecommerce": {
    "evidence": "17 models \u00b7 73 dbt + 9 Python tests",
    "status": "Local dbt build verified",
    "boundary": "Live Snowflake validation pending",
    "checks": "https://github.com/Raveesh-rajg/dbt-snowflake-ecommerce/actions"
  },
  "ga-bigquery-analytics": {
    "evidence": "20 tests \u00b7 SQL guards and funnel",
    "status": "Local checks verified",
    "boundary": "BigQuery build and Looker Studio pending",
    "checks": "https://github.com/Raveesh-rajg/ga-bigquery-analytics/actions"
  },
  "gcp-streaming-pipeline": {
    "evidence": "11 tests \u00b7 retry and buffering",
    "status": "Local streaming logic verified",
    "boundary": "GCP streaming validation pending",
    "checks": "https://github.com/Raveesh-rajg/gcp-streaming-pipeline/actions"
  },
  "vertex-forecasting": {
    "evidence": "9 tests \u00b7 backtest and API",
    "status": "Local API verified",
    "boundary": "Cloud Run deployment pending",
    "checks": "https://github.com/Raveesh-rajg/vertex-forecasting/actions"
  },
  "insurance-loss-analytics": {
    "evidence": "12 tests \u00b7 loss and referral analytics",
    "status": "Local pipeline verified",
    "boundary": "Synthetic data; native BI report pending",
    "checks": "https://github.com/Raveesh-rajg/insurance-loss-analytics/actions"
  },
  "credit-complaint-intelligence": {
    "evidence": "5 tests \u00b7 planted signal checks",
    "status": "Local analytics verified",
    "boundary": "Live CFPB ingestion and report pending",
    "checks": "https://github.com/Raveesh-rajg/credit-complaint-intelligence/actions"
  },
  "marketing-attribution-lab": {
    "evidence": "5 tests \u00b7 five models",
    "status": "Local methods verified",
    "boundary": "Synthetic journeys",
    "checks": "https://github.com/Raveesh-rajg/marketing-attribution-lab/actions"
  },
  "powerbi-dax-showcase": {
    "evidence": "4 pages \u00b7 5 file/data checks",
    "status": "Power BI project authored",
    "boundary": "Desktop refresh and advanced interactions pending",
    "checks": "https://github.com/Raveesh-rajg/powerbi-dax-showcase/actions"
  },
  "tableau-storytelling": {
    "evidence": "4 worksheets \u00b7 4 checks",
    "status": "Tableau workbook authored",
    "boundary": "Native rendering and interactive story pending",
    "checks": "https://github.com/Raveesh-rajg/tableau-storytelling/actions"
  },
  "looker-lookml-ecommerce": {
    "evidence": "15 tests \u00b7 dbt schema contract",
    "status": "LookML contracts verified",
    "boundary": "Live Looker validation pending",
    "checks": "https://github.com/Raveesh-rajg/looker-lookml-ecommerce/actions"
  },
  "excel-powerquery-casestudy": {
    "evidence": "Workbook \u00b7 6 cleaning tests",
    "status": "Formula workbook verified",
    "boundary": "Native Power Query/Power Pivot refresh pending",
    "checks": "https://github.com/Raveesh-rajg/excel-powerquery-casestudy/actions"
  },
  "sql-puzzles": {
    "evidence": "8 executable SQL exercises",
    "status": "DuckDB execution verified",
    "boundary": "Vendor portability is documented, not runtime-tested",
    "checks": "https://github.com/Raveesh-rajg/sql-puzzles/actions"
  }
};
