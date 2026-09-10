import { useState } from "react";
import { exhibits } from "./content.js";
import { Arrow, Reveal, SectionHeading } from "./ui.jsx";
import { repoUrl, sourceUrl, provenance } from "./refinement-data.js";
import { Evidence, useView, ViewControls } from "./ViewContext.jsx";
import ProjectVisual from "./ProjectVisuals.jsx";
const summaries = {
  growth: {
    problem: "Which new users come back—and where does the product lose them?",
    built:
      "SQL analysis that groups users by signup date and compares their return rates after four weeks.",
  },
  experiment: {
    problem: "Can we trust an A/B test before deciding to launch a change?",
    built:
      "A Python framework that checks experiment quality and reduces false alarms caused by repeatedly checking results.",
  },
  claims: {
    problem: "Can an operations team trust the records behind its reporting?",
    built:
      "A PySpark pipeline that checks claims, separates invalid records, and verifies that no records disappear.",
  },
  assistant: {
    problem: "Can people ask questions about data without writing SQL?",
    built:
      "An assistant that finds documented definitions or routes numerical questions to controlled, read-only SQL.",
  },
  ops: {
    problem:
      "Is an AI feature getting better—and is the improvement worth its cost?",
    built:
      "A monitoring pipeline that compares answer quality, cost, failures, and retries after a prompt change.",
  },
};
function Project({ item }) {
  const proof = provenance[item.id];
  return (
    <Reveal className={"project-card card-" + item.id}>
      <div className="project-meta">
        <span>{item.discipline}</span>
        <span className="proof-badge">{proof.label}</span>
      </div>
      <h3>
        <a href={repoUrl(item.repo)} target="_blank" rel="noreferrer">
          {
            {
              growth: "User retention analysis",
              experiment: "A/B test validation",
              claims: "Claims data quality pipeline",
              assistant: "Business data assistant",
              ops: "AI cost & reliability monitoring",
            }[item.id]
          }{" "}
          <Arrow diagonal />
        </a>
      </h3>
      <p className="project-description">{summaries[item.id].problem}</p>
      <p className="project-contribution">
        <b>What I built</b> {summaries[item.id].built}
      </p>
      <ProjectVisual id={item.id} />
      <div className="tool-line">
        {item.tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <Evidence href={sourceUrl(proof.repo, proof.path)}>{proof.text}</Evidence>
      <details className="case-details">
        <summary>
          Behind the result <span>+</span>
        </summary>
        <div className="case-body">
          <p>{item.note}</p>
          <ul>
            {item.evidence.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <div className="system-chain">
            {item.system.map((s, i) => (
              <span key={s}>
                <small>0{i + 1}</small>
                {s}
              </span>
            ))}
          </div>
          <p className="evidence-context">
            Public project evidence from seeded data or offline evaluation.
            These are not production business outcomes.
          </p>
          <a
            className="evidence-link"
            href={repoUrl(item.repo)}
            target="_blank"
            rel="noreferrer"
          >
            Explore code & evidence <Arrow diagonal />
          </a>
        </div>
      </details>
    </Reveal>
  );
}
export default function SelectedWork() {
  const { mode } = useView();
  const [more, setMore] = useState(false);
  const order = ["growth", "experiment", "claims", "assistant", "ops"];
  const items = order.map((id) => exhibits.find((e) => e.id === id));
  const expanded = mode === "deep" || more;
  return (
    <section className="selected-work section" id="exhibits">
      <SectionHeading
        number="01"
        label="SELECTED PROJECTS"
        title="Business questions."
        italic="Working solutions."
      >
        Personal projects across product analytics, experiments, data quality,
        and AI. Results below come from test data—not employer production work.
      </SectionHeading>
      <div className="bi-projects" aria-label="BI and reporting projects">
        {[
          [
            "Power BI revenue reporting",
            "Dashboards & business measures",
            "powerbi-dax-showcase",
          ],
          [
            "Commerce data warehouse",
            "SQL models · dbt · Snowflake",
            "dbt-snowflake-ecommerce",
          ],
          [
            "Finance reporting automation",
            "Excel · Power Query",
            "excel-powerquery-casestudy",
          ],
        ].map(([title, detail, repo]) => (
          <a key={repo} href={repoUrl(repo)} target="_blank" rel="noreferrer">
            <span>{detail}</span>
            <strong>{title}</strong>
            <Arrow diagonal />
          </a>
        ))}
      </div>
      <details className="reading-options">
        <summary>Reading options &amp; source notes</summary>
        <ViewControls />
      </details>
      <div className="projects-grid">
        {items.slice(0, expanded ? 5 : 2).map((item) => (
          <Project key={item.id} item={item} />
        ))}
      </div>
      <div className="work-footer">
        <span>Product analytics · Decision-making · Data engineering</span>
        {mode !== "deep" && (
          <button
            className="more-systems"
            aria-expanded={expanded}
            onClick={() => setMore(!more)}
          >
            {more ? "Show fewer projects" : "Explore three more projects"}{" "}
            <Arrow />
          </button>
        )}
        <a href="#archive">
          All 20 projects <Arrow />
        </a>
      </div>
    </section>
  );
}
