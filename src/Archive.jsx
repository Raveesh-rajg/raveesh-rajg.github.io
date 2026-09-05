import { useState } from "react";
import { archive, links } from "./content.js";
import { Arrow, SectionHeading } from "./ui.jsx";
import { repoUrl } from "./refinement-data.js";
export default function Archive() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filters = ["All", ...new Set(archive.map((item) => item[2]))];
  const items = archive.filter(
    (item) =>
      (filter === "All" || item[2] === filter) &&
      `${item[1]} ${item[2]} ${item[4]}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <section className="archive section" id="archive-content">
      <SectionHeading
        number="06"
        label="THE COMPLETE COLLECTION"
        title="Built to be"
        italic="explored."
      >
        <span>
          20 public projects.
          <br />
          Source code, methods, and reproducible results.
        </span>
      </SectionHeading>
      <div className="archive-controls">
        <div
          className="archive-filters"
          role="group"
          aria-label="Filter projects by field"
        >
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="search-label">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>
      <div className="archive-table" aria-live="polite">
        <div className="archive-columns">
          <span>NO.</span>
          <span>PROJECT</span>
          <span>DISCIPLINE</span>
          <span>EVIDENCE</span>
          <span />
        </div>
        {items.map((item) => (
          <a
            className="archive-row"
            key={item[4]}
            href={repoUrl(item[4])}
            target="_blank"
            rel="noreferrer"
          >
            <span>{item[0]}</span>
            <strong>{item[1]}</strong>
            <span>{item[2]}</span>
            <span>{item[3]}</span>
            <Arrow diagonal />
          </a>
        ))}
        {items.length === 0 && (
          <div className="archive-empty">
            <p>No projects match this search.</p>
            <button
              className="pill"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
            >
              Clear filters <Arrow />
            </button>
          </div>
        )}
      </div>
      <div className="archive-end">
        <span>{items.length} / 20 projects</span>
        <a
          href={`${links.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          All repositories <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
