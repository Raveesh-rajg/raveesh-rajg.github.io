import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

function Frame({ label, children }) {
  return (
    <div className="artifact-frame">
      <div className="artifact-topline">
        <span>{label}</span>
        <span>LIVE PROOF / SEEDED RUN</span>
      </div>
      {children}
    </div>
  )
}

function RateArtifact() {
  const bars = [34, 47, 72, 89]
  return (
    <Frame label="RATE DISPERSION / MEDICARE = 1.00">
      <div className="rate-viz" aria-hidden="true">
        <div className="rate-axis"><span>4×</span><span>3×</span><span>2×</span><span>1×</span></div>
        <div className="rate-bars">
          {bars.map((height, index) => (
            <div className="rate-column" key={height}>
              <motion.div
                className={index === 2 ? 'rate-bar is-focus' : 'rate-bar'}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: index * 0.08, ease }}
              >
                <span>{['1.34×', '1.88×', '2.64×', '3.42×'][index]}</span>
              </motion.div>
              <small>{['P10', 'P25', 'P50', 'P90'][index]}</small>
            </div>
          ))}
        </div>
        <div className="artifact-callout">Negotiated median</div>
      </div>
    </Frame>
  )
}

function ExperimentArtifact() {
  return (
    <Frame label="A/A FALSE POSITIVES / 500 SIMULATIONS">
      <div className="experiment-viz" aria-hidden="true">
        <div className="experiment-row">
          <span>Naive daily peeking</span>
          <div className="experiment-track">
            <motion.i initial={{ width: 0 }} whileInView={{ width: '96%' }} viewport={{ once: true }} transition={{ duration: 1, ease }} />
          </div>
          <strong>24.0%</strong>
        </div>
        <div className="experiment-row is-valid">
          <span>Always-valid mSPRT</span>
          <div className="experiment-track">
            <motion.i initial={{ width: 0 }} whileInView={{ width: '4.8%' }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.18, ease }} />
          </div>
          <strong>1.2%</strong>
        </div>
        <div className="experiment-threshold"><span>Nominal alpha</span><b>5.0%</b></div>
      </div>
    </Frame>
  )
}

function ClaimsArtifact() {
  return (
    <Frame label="CLAIM RECONCILIATION / NO SILENT DROPS">
      <div className="claims-viz" aria-hidden="true">
        <div className="claim-source">
          {Array.from({ length: 24 }).map((_, index) => <i key={index} className={index % 7 === 0 ? 'bad' : ''} />)}
        </div>
        <div className="claim-arrow"><span>2,889</span></div>
        <div className="claim-destinations">
          <div><b>2,791</b><span>validated</span></div>
          <div className="claim-quarantine"><b>98</b><span>reasoned quarantine</span></div>
        </div>
        <div className="claim-equation">2,791 + 98 = 2,889</div>
      </div>
    </Frame>
  )
}

function AssistantArtifact() {
  return (
    <Frame label="QUESTION ROUTING / GUARDED EXECUTION">
      <div className="assistant-viz" aria-hidden="true">
        <div className="question-node">question</div>
        <svg viewBox="0 0 600 210" preserveAspectRatio="none">
          <motion.path d="M300 20 C300 70 145 60 145 120" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} />
          <motion.path d="M300 20 C300 70 455 60 455 120" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease }} />
        </svg>
        <div className="assistant-branch is-docs"><small>DEFINITION</small><b>Cited catalog RAG</b><span>8 / 8 hit@4</span></div>
        <div className="assistant-branch is-sql"><small>QUANTITATIVE</small><b>Guarded SQL</b><span>read-only</span></div>
        <div className="guard-strip"><i /> single statement <i /> allowlist <i /> forced limit <i /> read-only</div>
      </div>
    </Frame>
  )
}

function OpsArtifact() {
  return (
    <Frame label="FAILED CALLS / ANOMALY WINDOW">
      <div className="ops-viz" aria-hidden="true">
        <div className="ops-axis"><span>200</span><span>100</span><span>0</span></div>
        <svg viewBox="0 0 600 250" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ops-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1f37ff" stopOpacity=".24" />
              <stop offset="1" stopColor="#1f37ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="ops-fill" d="M0 225 L0 214 L40 219 L80 207 L120 216 L160 211 L200 204 L240 215 L280 209 L320 205 L360 25 L400 199 L440 213 L480 207 L520 215 L560 206 L600 211 L600 225 Z" />
          <motion.path className="ops-line" d="M0 214 L40 219 L80 207 L120 216 L160 211 L200 204 L240 215 L280 209 L320 205 L360 25 L400 199 L440 213 L480 207 L520 215 L560 206 L600 211" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.25, ease }} />
          <circle cx="360" cy="25" r="6" />
        </svg>
        <div className="ops-alert"><span>RETRY STORM</span><b>z = 5.3</b><small>raw cost z = 0.5</small></div>
      </div>
    </Frame>
  )
}

function GrowthArtifact() {
  return (
    <Frame label="WEEKLY RETENTION / ACTIVATION COHORTS">
      <div className="growth-viz" aria-hidden="true">
        <svg viewBox="0 0 600 270" preserveAspectRatio="none">
          <g className="growth-grid">
            <line x1="0" x2="600" y1="50" y2="50" />
            <line x1="0" x2="600" y1="120" y2="120" />
            <line x1="0" x2="600" y1="190" y2="190" />
            <line x1="0" x2="600" y1="250" y2="250" />
          </g>
          <motion.path className="growth-line is-aha" d="M0 32 C95 55 130 80 200 94 S350 116 420 126 S530 142 600 149" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease }} />
          <motion.path className="growth-line" d="M0 32 C80 92 140 135 200 160 S330 194 420 207 S520 218 600 224" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.12, ease }} />
          <circle className="growth-dot is-aha" cx="600" cy="149" r="6" />
          <circle className="growth-dot" cx="600" cy="224" r="6" />
        </svg>
        <div className="growth-label aha"><b>45.3%</b><span>activated</span></div>
        <div className="growth-label base"><b>18.2%</b><span>not activated</span></div>
        <div className="growth-weeks"><span>W0</span><span>W1</span><span>W2</span><span>W3</span><span>W4</span></div>
      </div>
    </Frame>
  )
}

export function ProjectArtifact({ id }) {
  if (id === 'rates') return <RateArtifact />
  if (id === 'experiment') return <ExperimentArtifact />
  if (id === 'claims') return <ClaimsArtifact />
  if (id === 'assistant') return <AssistantArtifact />
  if (id === 'ops') return <OpsArtifact />
  return <GrowthArtifact />
}
