import { useEffect, useRef, useState } from "react";
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
            ["Work", "exhibits"],
            ["Capabilities", "roles"],
            ["About", "profile"],
            ["Archive", "archive"],
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
      <ViewControls />
    </div>
  );
}
export function Hero() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
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
          <i className="status-dot" /> NEW YORK · BUSINESS & DATA
        </span>
        <span>RAVEESH RAJ GRANDHI / 2026</span>
      </div>
      <div className="hero-main">
        <div className="hero-copy">
          <p className="eyebrow">RAVEESH RAJ GRANDHI</p>
          <h1 id="hero-title">
            I build data systems <br />
            people can <em>trust.</em>
          </h1>
          <div className="hero-description">
            <p>
              Business intelligence. Business analysis.
              <br />
              Analytics engineering.
            </p>
            <RotatingStatement
              running={running}
              paused={paused}
              onToggle={() => setPaused(!paused)}
              reduced={reduced}
            />
            <p className="hero-support">
              Connecting business questions, reliable data, and reporting that
              moves teams forward.
            </p>
            <a className="pill primary" href="#exhibits">
              View selected work <Arrow diagonal />
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
        </div>
        <div
          className="signal-system"
          aria-label="Raw data becomes validated models and decision evidence"
        >
          <img
            src="./signal.webp"
            alt=""
            width="1536"
            height="1024"
            fetchpriority="high"
          />
          <div className="signal-step raw">
            <span>01 / RAW</span>
            <code>business events</code>
            <code>revenue</code>
            <code>source_format</code>
          </div>
          <div className="signal-step validate">
            <span>02 / VALIDATE</span>
            <b>Grain. Lineage. Quality.</b>
          </div>
          <div className="signal-step model">
            <span>03 / MODEL</span>
            <b>One metric definition.</b>
            <code>clean + quarantine = source</code>
          </div>
          <div className="signal-step decide">
            <span>04 / DECIDE</span>
            <b>Numbers that hold up.</b>
          </div>
          <p className="signal-caption">A working philosophy, illustrated.</p>
        </div>
      </div>
      <div className="hero-bottom">
        <div>
          <span className="small-label">CURRENTLY</span>
          <p>
            Clinical Business Analyst II
            <br />
            <strong>NYC Health + Hospitals</strong>
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
        title="One philosophy."
        italic="Three ways to apply it."
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
      "DECISION OWNER",
      "Where are we priced above market?",
      "Specify the payer, procedure, geography, and decision owner.",
    ],
    [
      "CANONICAL GRAIN",
      "Hospital × procedure × payer × plan",
      "Keep the source format attached to every normalized rate.",
    ],
    [
      "QUALITY GATE",
      "Does clean + quarantine equal source?",
      "Reject with a reason. Test definitions and reconcile totals.",
    ],
    [
      "DECISION OUTPUT",
      "A benchmark with its assumptions.",
      "Show the comparison, the evidence, and what the analysis cannot establish.",
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
          Clinical by context.
          <br />
          Analytical <em>by nature.</em>
        </h2>
        <ol className="career-thread">
          <li>
            <b>Clinician</b>
            <span>Understands the context</span>
          </li>
          <li>
            <b>Analyst</b>
            <span>Finds the signal</span>
          </li>
          <li>
            <b>Engineer</b>
            <span>Makes it repeatable</span>
          </li>
        </ol>
        <p>
          I started in clinical care. Today I build the systems behind clinical,
          operational, and financial decisions.
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
