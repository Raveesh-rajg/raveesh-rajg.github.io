import { Arrow } from "./ui.jsx";
import { repoUrl } from "./refinement-data.js";
const Source = ({ repo }) => (
  <a
    className="text-link"
    href={repoUrl(repo)}
    target="_blank"
    rel="noreferrer"
  >
    Code, methods &amp; tests <Arrow diagonal />
  </a>
);
export default function HealthcareProjects() {
  return (
    <section
      id="exhibits"
      className="projects section"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <p className="eyebrow">03 / PROJECTS</p>
        <h2 id="projects-title">
          Healthcare first.
          <br />
          <em>Evidence throughout.</em>
        </h2>
        <p>Test data, not employer production work.</p>
      </div>
      <div className="project-grid">
        <article className="project-card reveal" id="claims-project">
          <p className="eyebrow">CLAIMS · DATA QUALITY</p>
          <h3>Claims quality pipeline</h3>
          <p>
            A PySpark pipeline that checks healthcare claims, separates invalid
            records, and accounts for every record before reporting.
          </p>
          <figure
            className="reconciliation-chart"
            aria-label="2,791 clean claims plus 98 quarantined claims equals 2,889 ingested claims"
          >
            <div>
              <strong>2,791</strong>
              <span>clean</span>
            </div>
            <b aria-hidden="true">+</b>
            <div>
              <strong>98</strong>
              <span>quarantined</span>
            </div>
            <b aria-hidden="true">=</b>
            <div>
              <strong>2,889</strong>
              <span>ingested</span>
            </div>
            <figcaption>Every source record is accounted for.</figcaption>
          </figure>
          <p className="result-copy">
            <strong>98 of 98</strong> planted defects quarantined, with 2,791
            clean + 98 quarantined reconciling exactly to 2,889 ingested. A test
            fails if it ever doesn't.
          </p>
          <p className="tool-line">PySpark · Delta Lake · Python · pytest</p>
          <Source repo="healthcare-claims-pipeline" />
        </article>
        <article className="project-card reveal" id="price-project">
          <p className="eyebrow">HOSPITAL PRICES · COMPARISON</p>
          <h3>Hospital price comparison</h3>
          <p>
            A Python and SQL pipeline that standardizes hospital price files and
            matches procedure descriptions so analysts can compare negotiated
            prices.
          </p>
          <figure
            className="mapping-chart"
            aria-label="93.75 percent charge-description mapping accuracy: 45 of 48 matched against a gold crosswalk"
          >
            <strong>
              93.75<span>%</span>
            </strong>
            <div className="bar-track">
              <span className="bar-value" style={{ width: "93.75%" }} />
            </div>
            <figcaption>45 of 48 descriptions matched correctly</figcaption>
          </figure>
          <p className="result-copy">
            <strong>93.75%</strong> charge-description mapping accuracy (45 of
            48 matched against a gold crosswalk)
          </p>
          <p className="honesty-label">
            Test results, not savings achieved by a hospital.
          </p>
          <p className="tool-line">Python · SQL · DuckDB · dbt</p>
          <Source repo="hospital-price-intelligence" />
        </article>
        <article className="project-card reveal" id="growth-project">
          <p className="eyebrow">PRODUCT ANALYTICS · RETENTION</p>
          <h3>Which users come back?</h3>
          <p>
            SQL analysis compares four-week return rates for users who created a
            project within three days of signup and those who did not.
          </p>
          <figure
            className="static-bars"
            aria-label="Four-week retention: activated users 45.3 percent, non-activated users 18.2 percent"
          >
            <div>
              <span>Activated</span>
              <strong>45.3%</strong>
              <i className="bar-track">
                <i className="bar-value" style={{ width: "45.3%" }} />
              </i>
            </div>
            <div>
              <span>Not activated</span>
              <strong>18.2%</strong>
              <i className="bar-track">
                <i className="bar-value secondary" style={{ width: "18.2%" }} />
              </i>
            </div>
            <figcaption>
              Simulated users. Recent signups are excluded.
            </figcaption>
          </figure>
          <p className="honesty-label">Association, not proof of cause</p>
          <p className="tool-line">SQL · DuckDB · Python</p>
          <Source repo="product-growth-analytics" />
        </article>
        <article className="project-card reveal" id="experiment-project">
          <p className="eyebrow">EXPERIMENTATION · VALIDATION</p>
          <h3>Can we trust an A/B test?</h3>
          <p>
            A Python framework checks experiment validity and measures false
            alarms caused by repeatedly checking results before a test ends.
          </p>
          <figure
            className="static-bars"
            aria-label="False-positive rates across 500 simulated tests: repeated checking 24 percent, always-valid testing 1.2 percent"
          >
            <div>
              <span>Repeated checking</span>
              <strong>24.0%</strong>
              <i className="bar-track">
                <i className="bar-value" style={{ width: "24%" }} />
              </i>
            </div>
            <div>
              <span>Always-valid testing</span>
              <strong>1.2%</strong>
              <i className="bar-track">
                <i className="bar-value secondary" style={{ width: "1.2%" }} />
              </i>
            </div>
            <figcaption>
              120 versus 6 false positives in 500 simulated tests.
            </figcaption>
          </figure>
          <p className="honesty-label">
            Test data, not employer production work.
          </p>
          <p className="tool-line">Python · SciPy · statsmodels</p>
          <Source repo="ab-testing-framework" />
        </article>
      </div>
      <div className="work-footer">
        <a className="text-link" href="./projects.html">
          All 20 projects <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
