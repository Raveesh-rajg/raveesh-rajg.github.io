import { useState } from "react";
import { exhibits } from "./content.js";
import { Arrow, Reveal, SectionHeading } from "./ui.jsx";
import { repoUrl, sourceUrl, provenance } from "./refinement-data.js";
import { Evidence, useView } from "./ViewContext.jsx";
import ProjectVisual from "./ProjectVisuals.jsx";
function Project({ item }) {
  const proof = provenance[item.id];
  return (
    <Reveal className={"project-card card-" + item.id}>
      <ProjectVisual id={item.id} />
      <div className="project-meta">
        <span>{item.discipline}</span>
        <span className="proof-badge">{proof.label}</span>
      </div>
      <h3>
        <a href={repoUrl(item.repo)} target="_blank" rel="noreferrer">
          {item.title} <Arrow diagonal />
        </a>
      </h3>
      <p className="project-description">{item.statement}</p>
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
  const order = ["claims", "experiment", "assistant", "growth", "ops"];
  const items = order.map((id) => exhibits.find((e) => e.id === id));
  const expanded = mode === "deep" || more;
  return (
    <section className="selected-work section" id="systems">
      <SectionHeading
        number="02"
        label="SELECTED SYSTEMS"
        title="Different problems."
        italic="The same rigor."
      >
        Data quality and experiment validity first. Explore the AI and product
        systems when you want to go deeper.
      </SectionHeading>
      <div className="projects-grid">
        {items.slice(0, expanded ? 5 : 2).map((item) => (
          <Project key={item.id} item={item} />
        ))}
      </div>
      <div className="work-footer">
        <span>Five systems. Five analytical questions.</span>
        {mode !== "deep" && (
          <button
            className="more-systems"
            aria-expanded={expanded}
            onClick={() => setMore(!more)}
          >
            {more ? "Show fewer systems" : "Explore three more systems"}{" "}
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
