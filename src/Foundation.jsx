import { useEffect, useRef, useState } from "react";
import DecisionFlow from "./DecisionFlow.jsx";
import { useReducedMotion } from "framer-motion";
import { HeroAtmosphere, RotatingStatement } from "./HeroMotion.jsx";
import { links, method } from "./content.js";
import { impact, capabilities, repoUrl } from "./refinement-data.js";
import { Arrow, SectionHeading } from "./ui.jsx";
import { Evidence, useView, ViewControls } from "./ViewContext.jsx";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <div className="site-header">
      <header className="site-nav">
        <a
          className="brand"
          href="#top"
          aria-label="rrg ↗ — Raveesh Raj Grandhi, home"
        >
          rrg<span>↗</span>
        </a>
        <span className="nav-caption">BUSINESS INTELLIGENCE · ANALYTICS</span>
        <button
          ref={menuRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="navigation"
          className={open ? "is-open" : ""}
          aria-label="Portfolio sections"
        >
          {[
            ["Projects", "exhibits"],
            ["Skills", "roles"],
            ["About", "profile"],
            ["All projects", "archive"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <Arrow diagonal />
          </a>
        </nav>
      </header>
    </div>
  );
}
export function Hero() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [stage, setStage] = useState(0);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const heroRef = useRef(null);
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  const running = !reduced && !paused && visible && inView;
  return (
    <section
      ref={heroRef}
      className="hero refined-hero"
      aria-labelledby="hero-title"
      data-motion={running ? "running" : "paused"}
    >
      <HeroAtmosphere />
      <div className="hero-topline">
        <span>
          <i className="status-dot" /> NEW YORK · OPEN TO BI & ANALYST ROLES
        </span>
        <span>RAVEESH RAJ GRANDHI / 2026</span>
      </div>
      <div className="hero-main">
        <div className="hero-copy">
          <p className="eyebrow">RAVEESH RAJ GRANDHI</p>
          <p className="hero-role">
            Business intelligence &amp; business analysis
          </p>
          <h1 id="hero-title">
            <span className="hero-title-line">I build dashboards.</span>{" "}
            <span className="hero-title-line">
              I solve <em>business problems.</em>
            </span>
          </h1>
          <div className="hero-description">
            <p>
              I turn business questions into SQL analysis, clear dashboards, and
              reporting that saves teams time.
            </p>
            <div className="hero-skills" aria-label="Core skills">
              {["SQL", "Python", "Power BI", "Tableau", "Snowflake"].map(
                (skill) => (
                  <span key={skill}>{skill}</span>
                ),
              )}
            </div>
            <RotatingStatement
              running={running}
              paused={paused}
              onToggle={() => setPaused(!paused)}
              reduced={reduced}
              onChange={setStage}
              active={stage}
            />
            <div className="hero-actions">
              <a className="pill primary" href="#exhibits">
                Explore my projects <Arrow diagonal />
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
            <p className="hero-support">
              Currently Clinical Business Analyst II at NYC Health + Hospitals.
              My skills apply to operations, finance, and product teams.
            </p>
          </div>
        </div>
        <DecisionFlow stage={stage} running={running} />
      </div>
      <div className="hero-bottom">
        <div>
          <span className="small-label">WHAT I BRING</span>
          <p>
            Business requirements → SQL analysis → dashboards
            <br />
            <strong>From the business question to the finished report.</strong>
          </p>
        </div>
        <div className="hero-art-label">
          <span className="crosshair">+</span>
          <span>BUSINESS QUESTION → DATA SYSTEM → EVIDENCE → DECISION</span>
        </div>
        <a className="scroll-cue" href="#impact">
          <span>THE IMPACT</span>
          <span>↓</span>
        </a>
      </div>
    </section>
  );
}
export function Impact() {
  return (
    <section
      id="impact"
      className="impact-section"
      aria-labelledby="impact-title"
    >
      <div className="impact-heading">
        <h2 id="impact-title">Professional impact</h2>
        <span>NYC Health + Hospitals · From my résumé</span>
      </div>
      <div className="impact-grid">
        {impact.map((item) => (
          <div key={item.value}>
            <strong>{item.value}</strong>
            <p>{item.label}</p>
            <Evidence href={links.resume} label="Read résumé">
              {item.context}
            </Evidence>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Capabilities() {
  const [activeId, setActiveId] = useState("build");
  const active = capabilities.find((c) => c.id === activeId);
  return (
    <section id="roles" className="expertise section">
      <SectionHeading
        number="03"
        label="CAPABILITIES"
        title="Skills that turn into"
        italic="useful work."
      />
      <div className="expertise-layout">
        <div
          className="role-lens-tabs capability-tabs"
          role="group"
          aria-label="Explore capabilities"
        >
          {capabilities.map((c, i) => (
            <button
              key={c.id}
              aria-pressed={activeId === c.id}
              onClick={() => setActiveId(c.id)}
            >
              <span>0{i + 1}</span>
              <span className="capability-name">
                {c.label}
                <small>{c.subtitle}</small>
              </span>
              <Arrow diagonal />
            </button>
          ))}
        </div>
        <div className="role-panel" aria-live="polite">
          <h3>{active.statement}</h3>
          <div className="role-signals">
            {active.signals.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p className="small-label">SEE IT IN THE WORK</p>
          <div className="role-lens-projects">
            {active.projects.map(([name, repo]) => (
              <a
                key={repo}
                href={repoUrl(repo)}
                target="_blank"
                rel="noreferrer"
              >
                {name}
                <Arrow diagonal />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export function Disclosure({ id, title, description, children }) {
  const { mode } = useView();
  const [open, setOpen] = useState(mode === "deep");
  useEffect(() => setOpen(mode === "deep"), [mode]);
  return (
    <div id={id} className="depth-section">
      <details open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
        <summary>
          <span>
            <b>{title}</b>
            <small>{description}</small>
          </span>
          <span className="disclosure-action">
            {open ? "Close" : "Explore"}{" "}
            <i aria-hidden="true">{open ? "−" : "+"}</i>
          </span>
        </summary>
        {children}
      </details>
    </div>
  );
}
export function Practice() {
  const [step, setStep] = useState(0);
  const states = [
    [
      "1. UNDERSTAND THE QUESTION",
      "What decision does this report support?",
      "Agree on the business goal, audience, and measures of success.",
    ],
    [
      "2. DEFINE THE DATA",
      "What does one row represent?",
      "Define the measures, join the right sources, and document the assumptions.",
    ],
    [
      "3. CHECK THE NUMBERS",
      "Can every record be accounted for?",
      "Verify totals, find duplicates, and explain missing or rejected records.",
    ],
    [
      "4. DELIVER THE ANSWER",
      "A report people can act on.",
      "Explain what changed, why it matters, and what the team can do next.",
    ],
  ];
  return (
    <section className="practice section">
      <p className="eyebrow">04 / THE WAY I WORK</p>
      <h2>
        A useful answer can withstand
        <br />
        <em>“How do you know?”</em>
      </h2>
      <div className="method-system">
        <div
          className="method-choices"
          role="group"
          aria-label="Explore the analytical method"
        >
          {method.map((item, i) => (
            <button
              key={item.number}
              aria-pressed={step === i}
              onClick={() => setStep(i)}
            >
              <span>0{i + 1}</span>
              <b>{item.title}</b>
            </button>
          ))}
        </div>
        <div className="method-state" aria-live="polite">
          <span className="eyebrow">{states[step][0]}</span>
          <h3>{states[step][1]}</h3>
          <p>{states[step][2]}</p>
          <p className="method-principle">{method[step].body}</p>
        </div>
      </div>
    </section>
  );
}
export function Profile() {
  return (
    <section id="profile" className="profile section">
      <div className="profile-portrait">
        <img
          src="./profile.jpg"
          alt="Raveesh Raj Grandhi"
          width="800"
          height="1000"
          loading="lazy"
          decoding="async"
        />
        <span>RAVEESH RAJ GRANDHI / NEW YORK</span>
      </div>
      <div className="profile-copy">
        <p className="eyebrow">05 / THE PERSON BEHIND THE WORK</p>
        <h2>
          An analyst who connects
          <br />
          people, data, <em>and decisions.</em>
        </h2>
        <ol className="career-thread">
          <li>
            <b>Understand the people</b>
            <span>Understands the context</span>
          </li>
          <li>
            <b>Analyze the problem</b>
            <span>Finds the signal</span>
          </li>
          <li>
            <b>Automate the work</b>
            <span>Makes it repeatable</span>
          </li>
        </ol>
        <p>
          My clinical background taught me to ask clear questions and understand
          the people using a system. In my current analyst role, I translate
          business needs into dashboards, reporting requirements, and data
          checks. I want to bring that combination to BI engineering and
          business analysis teams across industries.
        </p>
        <div className="current-role">
          <span className="small-label">CURRENT ROLE</span>
          <h3>Clinical Business Analyst II</h3>
          <p>NYC Health + Hospitals</p>
        </div>
        <div className="profile-records">
          <div>
            <span>EDUCATION</span>
            <strong>M.S. Health Informatics</strong>
            <small>University of Wisconsin–Milwaukee</small>
          </div>
          <div>
            <span>RECOGNITION</span>
            <strong>NMDSI Student Scholar</strong>
            <small>Best NMDSI Poster Award</small>
          </div>
        </div>
        <a
          className="pill"
          href={links.resume}
          target="_blank"
          rel="noreferrer"
        >
          View full résumé <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
