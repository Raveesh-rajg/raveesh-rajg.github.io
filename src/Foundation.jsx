import { links } from "./content.js";
import { impact } from "./refinement-data.js";
import { Arrow } from "./ui.jsx";
import { currentTitle } from "./identity.js";
export function Navigation() {
  return (
    <header className="site-header">
      <div className="site-nav">
        <a
          className="brand"
          href="#top"
          aria-label="rrg ↗ — Raveesh Raj Grandhi, home"
        >
          rrg<span>↗</span>
        </a>
        <span className="nav-caption">DATA · INTELLIGENCE · DECISIONS</span>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded="false"
          aria-controls="navigation"
        >
          Menu +
        </button>
        <nav id="navigation" aria-label="Portfolio sections">
          <a href="#exhibits">Projects</a>
          <a href="#roles">Capabilities</a>
          <a href={links.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
          <a href="#contact" className="nav-contact">
            Let’s talk <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <input
        className="ambient-toggle"
        type="checkbox"
        id="ambient-motion"
        defaultChecked
      />
      <label className="ambient-control" htmlFor="ambient-motion">
        Ambient motion <span aria-hidden="true" />
      </label>
      <div className="orbital-field" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit-core">
          <span>FROM QUESTION</span>
          <strong>to clarity.</strong>
          <span>DEFINE · MODEL · EXPLAIN</span>
        </div>
        <span className="orbit-coordinate coordinate-top">
          BUSINESS CONTEXT
        </span>
        <span className="orbit-coordinate coordinate-bottom">
          ENGINEERING DISCIPLINE
        </span>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">01 / RAVEESH RAJ GRANDHI · NEW YORK</p>
        <p className="hero-roles">
          BI Engineer <span>·</span> Data Analyst <span>·</span> Business
          Analyst
        </p>
        <h1 id="hero-title">
          Reliable data.
          <br />
          <em>Clear decisions.</em>
        </h1>
        <p className="hero-description">
          I build data models, dashboards, and analyses that help teams
          understand performance, find what needs attention, and decide what to
          do next.
        </p>
        <p className="hero-support">
          {currentTitle} at NYC Health + Hospitals. Explore public work across
          commerce, finance, product, and healthcare.
        </p>
        <div className="hero-actions">
          <a className="pill primary" href="#exhibits">
            Explore selected work <Arrow diagonal />
          </a>
          <a
            className="text-link"
            href={links.resume}
            target="_blank"
            rel="noreferrer"
          >
            View résumé <Arrow diagonal />
          </a>
        </div>
        <p className="hero-tools">
          SQL · Python · Power BI · Tableau · PySpark
        </p>
      </div>
    </section>
  );
}
export function Impact() {
  return (
    <section
      className="impact-section"
      id="impact"
      aria-labelledby="impact-title"
    >
      <div className="impact-heading">
        <h2 id="impact-title">02 / Professional impact</h2>
        <a href={links.resume} target="_blank" rel="noreferrer">
          NYC Health + Hospitals · From my résumé ↗
        </a>
      </div>
      <div className="impact-grid">
        {impact.map((i) => (
          <div key={i.value}>
            <strong>{i.value}</strong>
            <p>{i.label}</p>
          </div>
        ))}
      </div>
      <p className="evidence-promise">
        Every number on this page is either from my résumé or reproducible from
        a public repository.
      </p>
    </section>
  );
}
export function Capabilities() {
  return (
    <section
      className="capabilities section"
      id="roles"
      aria-labelledby="capabilities-title"
    >
      <div className="section-heading">
        <p className="eyebrow">04 / CAPABILITIES</p>
        <h2 id="capabilities-title">
          Built for the data.
          <br />
          <em>Focused on the business.</em>
        </h2>
      </div>
      <div className="capability-grid">
        <div>
          <h3>BI Engineer</h3>
          <p>
            Build tested data models, consistent metric definitions, and
            reporting pipelines that make dashboards dependable.
          </p>
          <span>SQL · dbt · Snowflake · Power BI</span>
        </div>
        <div>
          <h3>Data Analyst</h3>
          <p>
            Investigate performance, compare customer behavior, and evaluate
            experiments with reproducible analysis and clear limitations.
          </p>
          <span>SQL · Python · Tableau · Statistics</span>
        </div>
        <div>
          <h3>Business Analyst</h3>
          <p>
            Turn stakeholder questions into KPI definitions, reporting
            requirements, and practical process improvements teams can act on.
          </p>
          <span>Requirements · KPIs · Excel · Power Query</span>
        </div>
      </div>
      <div className="about-inline">
        <img
          src="./profile.jpg"
          alt="Raveesh Raj Grandhi"
          width="112"
          height="140"
          loading="lazy"
          decoding="async"
        />
        <p>
          I bring a clinical background and an M.S. in Health Informatics from
          the University of Wisconsin–Milwaukee.
          <br />
          Today I work as {currentTitle} at NYC Health + Hospitals.
          <br />
          My approach travels across industries: understand the business,
          validate the data, and make the next decision clearer.
        </p>
      </div>
    </section>
  );
}
