const steps = [
  [
    "Connect",
    "Bring the right sources together.",
    "SQL tables · spreadsheets · business requirements",
  ],
  [
    "Check",
    "Make sure the numbers are right.",
    "Clear definitions · matching totals · no missing records",
  ],
  [
    "Visualize",
    "Build a dashboard that answers the question.",
    "Power BI · Tableau · useful business measures",
  ],
  [
    "Improve",
    "Give the team time back.",
    "Automated reporting · fewer manual steps",
  ],
];

export default function DecisionFlow({ stage, running }) {
  return (
    <figure
      className="decision-flow"
      data-stage={stage}
      data-running={running}
      aria-label="How I turn data into useful reporting"
    >
      <div className="flow-heading">
        <span>FROM QUESTION TO DASHBOARD</span>
        <span className="flow-live">
          <i /> HOW I WORK
        </span>
      </div>
      <div className="flow-scene">
        <div className="flow-inputs" aria-label="Data sources">
          {["SQL tables", "Spreadsheets", "Business questions"].map(
            (label, i) => (
              <div key={label} style={{ "--i": i }}>
                <span className="input-icon" aria-hidden="true">
                  {i === 0 ? "≡" : i === 1 ? "▦" : "?"}
                </span>
                {label}
                <i aria-hidden="true" />
              </div>
            ),
          )}
        </div>
        <div className="flow-transit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="flow-model">
          <span className="model-check" aria-hidden="true">
            ✓
          </span>
          <div>
            <b>Clean data. Clear definitions.</b>
            <span>SQL · data checks · shared KPIs</span>
          </div>
          <span className="model-scan" aria-hidden="true" />
        </div>
        <div className="flow-transit transit-output" aria-hidden="true">
          <i />
        </div>
        <div className="flow-dashboard">
          <div className="dashboard-top">
            <span>REPORTING AUTOMATION</span>
            <span>WORK RESULT</span>
          </div>
          <div className="dashboard-main">
            <div
              className="time-chart"
              role="img"
              aria-label="Recurring report preparation decreased from four hours to one hour, a 75 percent reduction, as reported in my résumé."
            >
              <div>
                <span>Before</span>
                <i style={{ "--bar": "100%" }} />
                <b>4h</b>
              </div>
              <div>
                <span>After</span>
                <i style={{ "--bar": "25%" }} />
                <b>1h</b>
              </div>
              <small>Recurring report preparation time</small>
            </div>
            <div className="flow-result">
              <strong>
                75<span>%</span>
              </strong>
              <span>less preparation time</span>
              <i aria-hidden="true">↗</i>
            </div>
          </div>
          <a href="./resume.pdf" target="_blank" rel="noreferrer">
            From my résumé · NYC Health + Hospitals{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <figcaption>
        <ol className="flow-steps">
          {steps.map(([label], i) => (
            <li key={label} className={stage === i ? "active" : ""}>
              <span>0{i + 1}</span>
              {label}
              <i aria-hidden="true" />
            </li>
          ))}
        </ol>
        <div className="flow-captions">
          {steps.map(([, title, detail], i) => (
            <div
              key={title}
              aria-hidden={stage !== i}
              className={stage === i ? "active" : ""}
            >
              <strong>{title}</strong>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
