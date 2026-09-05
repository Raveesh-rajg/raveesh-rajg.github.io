import { useState } from "react";
export function ClaimsVisual() {
  const [open, setOpen] = useState(false);
  return (
    <div className="project-visual visual-claims">
      <div className="visual-top">
        <span>CLAIMS / RECONCILIATION</span>
        <span>SEEDED RUN</span>
      </div>
      <div className="reconcile">
        <span>
          2,889<small>SOURCE CLAIMS</small>
        </span>
        <b aria-hidden="true">→</b>
        <div>
          <span>
            2,791<small>VALIDATED</small>
          </span>
          <button
            className="quarantine"
            aria-expanded={open}
            aria-controls="claim-reasons"
            onClick={() => setOpen(!open)}
          >
            98 <small>QUARANTINED {open ? "−" : "+"}</small>
          </button>
        </div>
      </div>
      <div id="claim-reasons" className="claim-reasons" hidden={!open}>
        <span>
          <b>50</b> duplicates
        </span>
        <span>
          <b>23</b> negative payments
        </span>
        <span>
          <b>25</b> orphan members
        </span>
      </div>
      <div className="visual-bottom">
        <span>Clean + quarantine = source.</span>
        <span>12 tests</span>
      </div>
    </div>
  );
}
export function ExperimentVisual() {
  const [valid, setValid] = useState(false);
  const count = valid ? 6 : 120;
  return (
    <div className="project-visual visual-experiment">
      <div className="visual-top">
        <span>EXPERIMENT / FALSE POSITIVES</span>
        <span>500 A/A RUNS</span>
      </div>
      <div
        className="experiment-selector"
        role="group"
        aria-label="Compare experiment methods"
      >
        <button aria-pressed={!valid} onClick={() => setValid(false)}>
          Naive peeking
        </button>
        <button aria-pressed={valid} onClick={() => setValid(true)}>
          Always-valid
        </button>
      </div>
      <div className="sampling-viz">
        <div>
          <strong>{valid ? "1.2" : "24.0"}%</strong>
          <span>{count} / 500 false positives</span>
        </div>
        <svg
          viewBox="0 0 250 200"
          role="img"
          aria-label={`${count} of 500 seeded experiments produced a false positive`}
        >
          {Array.from({ length: 500 }, (_, i) => (
            <rect
              key={i}
              x={(i % 25) * 10}
              y={Math.floor(i / 25) * 10}
              width="6"
              height="6"
              rx="1"
              className={i < count ? "false-positive" : "true-negative"}
            />
          ))}
        </svg>
      </div>
      <div className="visual-bottom">
        <span>
          Each mark = one experiment.
          <br />
          Grouped by outcome, not run order.
        </span>
        <span>14 interim looks</span>
      </div>
    </div>
  );
}
export function AssistantVisual() {
  const [type, setType] = useState("definition");
  return (
    <div className="project-visual visual-assistant">
      <div className="visual-top">
        <span>QUESTION / ROUTING</span>
        <span>OFFLINE EVAL</span>
      </div>
      <div
        className="question-choices"
        role="group"
        aria-label="Explore question routing"
      >
        <button
          aria-pressed={type === "definition"}
          onClick={() => setType("definition")}
        >
          What does clv_segment mean?
        </button>
        <button
          aria-pressed={type === "quantity"}
          onClick={() => setType("quantity")}
        >
          Top 3 states by customers?
        </button>
      </div>
      <div className="routing">
        <span className="routing-arrow" aria-hidden="true">
          ↓
        </span>
        <div>
          <span className={type === "definition" ? "route-active" : ""}>
            <small>DEFINITION</small>Cited retrieval
          </span>
          <span className={type === "quantity" ? "route-active" : ""}>
            <small>QUANTITATIVE</small>Guarded SQL
          </span>
        </div>
      </div>
      <div className="visual-bottom">
        <span>14 / 14 routed correctly</span>
        <span>Read-only by design</span>
      </div>
    </div>
  );
}
export function GrowthVisual() {
  return (
    <div className="project-visual visual-growth">
      <div className="visual-top">
        <span>COHORT / WEEK-FOUR RETENTION</span>
        <span>SYNTHETIC LOG</span>
      </div>
      <div className="cohort-viz">
        {[
          ["Activated", 45.3],
          ["Not activated", 18.2],
        ].map(([name, value]) => (
          <div key={name}>
            <div>
              <span>{name}</span>
              <strong>{value}%</strong>
            </div>
            <svg
              viewBox="0 0 500 42"
              role="img"
              aria-label={`${name}: ${value}% week-four retention`}
            >
              <rect
                x="0"
                y="6"
                width="500"
                height="28"
                className="cohort-base"
              />
              <rect
                x="0"
                y="6"
                width={value * 5}
                height="28"
                className="cohort-observed"
              />
              {Array.from({ length: 11 }, (_, i) => (
                <line key={i} x1={i * 50} x2={i * 50} y1="6" y2="34" />
              ))}
            </svg>
          </div>
        ))}
        <p>
          Eligible week-four cohorts only.
          <br />
          Recent signups are excluded.
        </p>
      </div>
      <div className="visual-bottom">
        <span>421k events</span>
        <span>Correlation ≠ causation</span>
      </div>
    </div>
  );
}
export function OpsVisual() {
  const [event, setEvent] = useState("rollout");
  return (
    <div className="project-visual visual-ops">
      <div className="visual-top">
        <span>TELEMETRY / 30-DAY CORPUS</span>
        <span>27,683 CALLS</span>
      </div>
      <div
        className="telemetry-line"
        role="group"
        aria-label="Inspect planted telemetry events"
      >
        <span>Start</span>
        <button
          aria-pressed={event === "rollout"}
          onClick={() => setEvent("rollout")}
        >
          Day 12
          <br />
          <b>Prompt v2</b>
        </button>
        <button
          aria-pressed={event === "retry"}
          onClick={() => setEvent("retry")}
        >
          Day 20
          <br />
          <b>Retry storm</b>
        </button>
        <span>End</span>
      </div>
      <div className="telemetry-readout" aria-live="polite">
        {event === "rollout" ? (
          <>
            <strong>
              +6.5pp <span>/ 1.35×</span>
            </strong>
            <p>
              Evaluation-score gain / cost per successful answer.
              <br />
              Better quality did not mean better value per dollar.
            </p>
          </>
        ) : (
          <>
            <strong>
              195 <span>failed calls</span>
            </strong>
            <p>
              Failure anomaly z = 5.3; raw-cost z = 0.5.
              <br />A spend total alone can hide a reliability problem.
            </p>
          </>
        )}
      </div>
      <div className="visual-bottom">
        <span>Planted events, not live telemetry</span>
        <span>9 tests</span>
      </div>
    </div>
  );
}
export default function ProjectVisual({ id }) {
  if (id === "claims") return <ClaimsVisual />;
  if (id === "experiment") return <ExperimentVisual />;
  if (id === "assistant") return <AssistantVisual />;
  if (id === "growth") return <GrowthVisual />;
  return <OpsVisual />;
}
