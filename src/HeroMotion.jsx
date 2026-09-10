import { useEffect } from "react";

export const statements = [
  "Connect the data. Answer the right question.",
  "Check the numbers before they reach a report.",
  "Build dashboards people can actually use.",
  "Automate the repeat work. Give teams time back.",
];

export function RotatingStatement({
  running,
  paused,
  onToggle,
  reduced,
  active,
  onChange,
}) {
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      onChange((index) => (index + 1) % statements.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [running, active, onChange]);

  return (
    <div className="rotating-statement" role="group" aria-label="My approach">
      <div className="statement-lines" aria-live="off">
        {statements.map((statement, index) => (
          <p
            key={statement}
            className={active === index ? "is-current" : ""}
            aria-hidden={active !== index}
          >
            {statement}
          </p>
        ))}
      </div>
      <div className="statement-controls">
        <div
          className="statement-dots"
          role="group"
          aria-label="Choose a statement"
        >
          {statements.map((statement, index) => (
            <button
              key={statement}
              type="button"
              aria-label={`Show statement ${index + 1}: ${statement}`}
              aria-pressed={active === index}
              onClick={() => onChange(index)}
            >
              <span />
            </button>
          ))}
        </div>
        {!reduced && (
          <button
            className="hero-motion-toggle"
            type="button"
            onClick={onToggle}
            aria-label={paused ? "Resume hero motion" : "Pause hero motion"}
          >
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
              {paused ? (
                <path d="M5 3L12 8L5 13Z" fill="currentColor" />
              ) : (
                <path
                  d="M5 3V13M11 3V13"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              )}
            </svg>
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
    </div>
  );
}

export function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <div className="ambient-halo" />
      <div className="orbital-field">
        <div className="orbit orbit-one">
          <i />
        </div>
        <div className="orbit orbit-two">
          <i />
        </div>
        <div className="orbit orbit-three">
          <i />
        </div>
      </div>
      <span className="ambient-spark spark-one" />
      <span className="ambient-spark spark-two" />
      <span className="ambient-spark spark-three" />
    </div>
  );
}
