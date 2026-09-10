import { useEffect, useRef, useState } from "react";
import { Arrow } from "./ui.jsx";
import { Evidence, useView } from "./ViewContext.jsx";
import { repoUrl, sourceUrl } from "./refinement-data.js";
const repo = "hospital-price-intelligence";
const scenes = [
  {
    label: "The problem",
    title: "Public data. Almost impossible to use.",
    body: "Three hospital pricing dialects describe the same idea in incompatible shapes. Before comparing prices, the files have to agree on what a row means.",
    source: "src/pricescope/parse.py",
  },
  {
    label: "Normalization",
    title: "Different shapes. One grain.",
    body: "Parse nested payers, skip metadata headers, and unpivot payer columns. Preserve the source format as rows converge into one canonical rate table.",
    source: "src/pricescope/parse.py",
  },
  {
    label: "The hard join",
    title: "The difficult part is the description.",
    body: "“TKA - KNEE JOINT REPLC” cannot rely on an exact text join. A fuzzy baseline is scored against a gold crosswalk before a more complex mapper earns its place.",
    source: "fixtures/gold_description_map.csv",
  },
  {
    label: "Data quality",
    title: "Reject the row. Keep the reason.",
    body: "Missing codes, non-positive rates, and rates above 100× Medicare are flagged and quarantined. They do not quietly enter the benchmark.",
    source: "tests/test_pricescope.py",
  },
  {
    label: "Market signal",
    title: "A rate means more with a reference.",
    body: "Compare negotiated prices against a Medicare anchor. The median across the seeded book is 2.64× Medicare; it is a project result, not a claim about the national market.",
    source: "src/pricescope/marts.py",
  },
  {
    label: "The decision",
    title: "Where are we priced above market, by payer and procedure?",
    body: "The output is a defensible negotiation question, with its source, exclusions, matching performance, and benchmark attached.",
    source: "README.md",
  },
];
export function RateScene({ step }) {
  if (step === 0)
    return (
      <div className="source-dialects">
        {[
          [
            "JSON · TALL",
            "standard_charge_information",
            "standard_charges",
            "payers_information",
          ],
          [
            "CSV · TALL",
            "metadata header",
            "payer_name",
            "standard_charge_negotiated_dollar",
          ],
          [
            "CSV · WIDE",
            "description + code",
            "negotiated_*",
            "one column per payer",
          ],
        ].map(([label, ...fields]) => (
          <div key={label}>
            <span>{label}</span>
            {fields.map((f) => (
              <code key={f}>{f}</code>
            ))}
          </div>
        ))}
      </div>
    );
  if (step === 1)
    return (
      <div className="canonical-viz">
        <div className="source-chips">
          <span>JSON tall</span>
          <span>CSV tall</span>
          <span>CSV wide</span>
        </div>
        <svg viewBox="0 0 500 100" aria-hidden="true">
          <path d="M70 0V30Q70 50 100 50H230Q250 50 250 75V100M250 0V100M430 0V30Q430 50 400 50H270Q250 50 250 75V100" />
        </svg>
        <div className="canonical-table">
          <span>CANONICAL RATE TABLE</span>
          <b>Hospital × description × code × payer × plan</b>
          <div>
            <code>negotiated_rate</code>
            <code>gross_charge</code>
            <code>cash_price</code>
            <code>source_format</code>
          </div>
        </div>
        <p>360 / 360 rows parsed · 6 fixture hospitals</p>
      </div>
    );
  if (step === 2)
    return (
      <div className="mapping-viz">
        <span className="small-label">SOURCE DESCRIPTION</span>
        <code>TKA - KNEE JOINT REPLC</code>
        <span className="map-arrow">↓</span>
        <span className="small-label">GOLD CROSSWALK</span>
        <b>27447</b>
        <span>Total knee arthroplasty</span>
        <div className="scene-metric">
          <strong>93.75%</strong>
          <p>
            fuzzy-baseline accuracy
            <br />
            45 / 48 labels correctly matched
          </p>
        </div>
      </div>
    );
  if (step === 3)
    return (
      <div className="quality-viz">
        <span className="small-label">ROW-LEVEL VALIDATION</span>
        <div className="quality-rule">
          <code>missing_code</code>
          <code>zero_rate</code>
          <code>implausible_rate</code>
        </div>
        <div className="quality-split">
          <div>
            <span>VALID</span>
            <b>To analytics</b>
            <small>Retains source lineage</small>
          </div>
          <div>
            <span>QUARANTINED</span>
            <b>7 / 7</b>
            <small>Planted defects caught</small>
          </div>
        </div>
        <p>
          Flagged rows retain a <code>dq_reason</code>.
        </p>
      </div>
    );
  if (step === 4)
    return (
      <div className="benchmark-viz">
        <span className="small-label">MEDIAN NEGOTIATED RATE / MEDICARE</span>
        <strong>2.64×</strong>
        <svg
          viewBox="0 0 500 150"
          role="img"
          aria-label="Medicare reference 1.00 times; seeded negotiated median 2.64 times on a zero to four scale"
        >
          <line x1="20" y1="65" x2="480" y2="65" className="benchmark-axis" />
          {[0, 1, 2, 3, 4].map((v) => (
            <g key={v}>
              <line
                x1={20 + v * 115}
                x2={20 + v * 115}
                y1="60"
                y2="72"
                className="benchmark-axis"
              />
              <text x={20 + v * 115} y="102" textAnchor="middle">
                {v}×
              </text>
            </g>
          ))}
          <circle cx="135" cy="65" r="5" className="benchmark-reference" />
          <line
            x1="135"
            x2="323.6"
            y1="65"
            y2="65"
            className="benchmark-distance"
          />
          <circle cx="323.6" cy="65" r="7" className="benchmark-point" />
          <text x="323.6" y="30" textAnchor="middle">
            2.64×
          </text>
          <text x="135" y="135" textAnchor="middle">
            Medicare
          </text>
        </svg>
        <p>Median of the seeded rate book.</p>
      </div>
    );
  return (
    <div className="decision-viz">
      <span className="small-label">THE DECISION SURFACE</span>
      <h3>
        Compare the market.
        <br />
        <em>Question the outlier.</em>
      </h3>
      <div>
        <span>By payer</span>
        <span>By procedure</span>
        <span>By hospital</span>
      </div>
      <p>Source → quality → matching → benchmark</p>
      <a href={repoUrl(repo)} target="_blank" rel="noreferrer">
        Explore methodology & code <Arrow diagonal />
      </a>
    </div>
  );
}
export default function Flagship() {
  const { mode } = useView();
  const [expanded, setExpanded] = useState(mode === "deep");
  const [active, setActive] = useState(0);
  const sceneRefs = useRef([]);
  useEffect(() => setExpanded(mode === "deep"), [mode]);
  useEffect(() => {
    if (!expanded) return;
    let observer;
    const observeScenes = () => {
      observer?.disconnect();
      // Percentage root margins use viewport width; use height-based pixels
      // so the reading band stays valid on wide and short screens.
      observer = new IntersectionObserver(
        () => {
          const center = window.innerHeight / 2;
          const visible = sceneRefs.current
            .filter(Boolean)
            .map((el) => ({ el, rect: el.getBoundingClientRect() }))
            .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight)
            .sort((a, b) =>
              Math.abs((a.rect.top + a.rect.bottom) / 2 - center) -
              Math.abs((b.rect.top + b.rect.bottom) / 2 - center),
            );
          if (visible.length) setActive(Number(visible[0].el.dataset.scene));
        },
        {
          rootMargin: `-${window.innerHeight * 0.25}px 0px -${window.innerHeight * 0.45}px 0px`,
          threshold: 0,
        },
      );
      sceneRefs.current.forEach((el) => el && observer.observe(el));
    };
    observeScenes();
    window.addEventListener("resize", observeScenes);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observeScenes);
    };
  }, [expanded]);
  const chooseStage = (i) => {
    setActive(i);
    sceneRefs.current[i]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  };
  return (
    <section id="exhibits" className="flagship section">
      <div className="flagship-heading">
        <p className="eyebrow">01 / FLAGSHIP CASE STUDY</p>
        <span className="proof-badge">Seeded evaluation · 8 tests</span>
      </div>
      <div className="flagship-overview">
        <div>
          <h2>
            Hospital Rate
            <br />
            <em>Intelligence.</em>
          </h2>
          <p>
            From incompatible price files to a payer-rate comparison that holds
            up.
          </p>
          <a
            className="text-link"
            href={repoUrl(repo)}
            target="_blank"
            rel="noreferrer"
          >
            Methodology & code <Arrow diagonal />
          </a>
        </div>
        <div className="flagship-result">
          <strong>93.75%</strong>
          <span>Matching accuracy · 48-label gold crosswalk</span>
          <p>
            360 rows parsed across three dialects.
            <br />7 / 7 planted defects quarantined.
          </p>
          <Evidence href={sourceUrl(repo, "tests/test_pricescope.py")}>
            A fuzzy baseline evaluated on seeded fixtures; 45 of 48 labels
            correct. The linked tests pin parsing, mapping, quality, and
            benchmark results.
          </Evidence>
        </div>
      </div>
      <details
        className="flagship-story"
        open={expanded}
        onToggle={(e) => setExpanded(e.currentTarget.open)}
      >
        <summary>
          <span>
            {expanded ? "The evidence, step by step" : "Follow the evidence"}
            <small>Raw data → quality → model → market signal → decision</small>
          </span>
          <b>{expanded ? "−" : "+"}</b>
        </summary>
        {expanded && (
          <div className="story-layout" data-chapter={active}>
            <div className="story-visual">
              <div className="story-stage-label">
                <span>0{active + 1} / 06</span>
                <span>{scenes[active].label}</span>
              </div>
              <div
                className="story-chapter-controls"
                role="group"
                aria-label="Case study chapters"
              >
                {scenes.map((scene, i) => (
                  <button
                    key={scene.label}
                    type="button"
                    onClick={() => chooseStage(i)}
                    aria-pressed={active === i}
                    aria-label={`Go to chapter ${i + 1}: ${scene.label}`}
                  >
                    <span>0{i + 1}</span>
                    <i />
                  </button>
                ))}
              </div>
              <div className="scene-art" key={active}>
                <RateScene step={active} />
              </div>
              <a
                className="scene-source"
                href={sourceUrl(repo, scenes[active].source)}
                target="_blank"
                rel="noreferrer"
              >
                Inspect this stage’s source ↗
              </a>
            </div>
            <div className="story-scenes">
              {scenes.map((s, i) => (
                <article
                  key={s.label}
                  className={`story-scene ${active === i ? "active" : ""}`}
                  data-scene={i}
                  ref={(el) => (sceneRefs.current[i] = el)}
                >
                  <p className="eyebrow">
                    0{i + 1} / {s.label.toUpperCase()}
                  </p>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <div className="mobile-scene">
                    <RateScene step={i} />
                  </div>
                  <button
                    className="scene-select"
                    aria-pressed={active === i}
                    onClick={() => setActive(i)}
                  >
                    Inspect stage 0{i + 1} <Arrow />
                  </button>
                  <Evidence href={sourceUrl(repo, s.source)}>
                    Repository source: {s.source}. All displayed quantities
                    describe the seeded project.
                  </Evidence>
                </article>
              ))}
            </div>
          </div>
        )}
      </details>
      <p className="flagship-footnote">
        Public project evidence · High-fidelity fixtures reproduce CMS file
        formats. The repository documents the path to live MRFs.
      </p>
    </section>
  );
}
