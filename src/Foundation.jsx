import { links } from "./content.js";
import { impact } from "./refinement-data.js";
import { Arrow } from "./ui.jsx";
import { currentTitle } from "./identity.js";
export function Navigation() {
  return (
    <header className="site-header">
      <div className="site-nav">
        <a className="brand" href="#top" aria-label="rrg ↗ — Raveesh Raj Grandhi, home">
          rrg<span>↗</span>
        </a>
        <span className="nav-caption">
          HEALTHCARE DATA · BUSINESS INTELLIGENCE
        </span>
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
      <p className="eyebrow">01 / RAVEESH RAJ GRANDHI · NEW YORK</p>
      <h1 id="hero-title">
        Healthcare data,
        <br />
        <em>and the proof it holds up.</em>
      </h1>
      <p className="hero-description">
        I turn claims and EHR data into dashboards and analyses teams can act
        on, with the quality checks that make the numbers trustworthy.
      </p>
      <p className="hero-support">
        {currentTitle} at NYC Health + Hospitals. Twenty public projects, every
        result reproducible from a seeded run.
      </p>
      <div className="hero-actions">
        <a className="pill primary" href="#exhibits">
          View healthcare projects <Arrow diagonal />
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
      <p className="hero-tools">SQL · Python · Power BI · Tableau · PySpark</p>
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
          Healthcare context.
          <br />
          <em>Reliable analytical work.</em>
        </h2>
      </div>
      <div className="capability-grid">
        <div>
          <h3>Healthcare analytics</h3>
          <p>
            Claims quality, utilization reporting, EHR-connected dashboards, and
            hospital price comparisons.
          </p>
          <span>SQL · Python · healthcare data</span>
        </div>
        <div>
          <h3>BI development</h3>
          <p>
            Data models, reporting automation, and dashboards with consistent
            business definitions.
          </p>
          <span>Power BI · Tableau · Snowflake</span>
        </div>
        <div>
          <h3>Provable quality</h3>
          <p>
            Record reconciliation, explicit exclusions, repeatable tests, and
            results linked to their sources.
          </p>
          <span>PySpark · dbt · pytest</span>
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
          <br />I connect the people using a report with the data checks that
          make it dependable.
        </p>
      </div>
    </section>
  );
}
