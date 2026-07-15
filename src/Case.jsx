/* Case-study pages + animated SVG charts. No chart library — inline SVG
   with framer-motion keeps the bundle small and every pixel intentional.
   Every number rendered here is a measured result from the repo's tests. */

import { motion } from 'framer-motion'
import { GH } from './data.js'

/* ---------- animated bar comparison ---------- */
export function Bars({ items, unit = '%', max }) {
  const top = max ?? Math.max(...items.map(i => i.v)) * 1.15
  return (
    <div className="chart-bars">
      {items.map((it, i) => (
        <div className="cb-row" key={it.label}>
          <span className="cb-label">{it.label}</span>
          <div className="cb-track">
            <motion.div className="cb-fill" style={{ background: it.color || 'var(--accent)' }}
              initial={{ width: 0 }} whileInView={{ width: `${(it.v / top) * 100}%` }}
              viewport={{ once: true }} transition={{ type: 'spring', stiffness: 60, damping: 18, delay: i * 0.12 }} />
          </div>
          <span className="cb-value">{it.v}{unit}</span>
        </div>
      ))}
    </div>
  )
}

/* ---------- animated line (sparkline with axis labels) ---------- */
export function Line({ points, labels, unit = '', color = 'var(--accent)', refLine }) {
  const W = 520, H = 170, PAD = 28
  const max = Math.max(...points, refLine ?? -Infinity) * 1.15
  const min = Math.min(...points, refLine ?? Infinity) * 0.85
  const x = i => PAD + (i / (points.length - 1)) * (W - PAD * 2)
  const y = v => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2)
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-line" role="img">
      {refLine != null && (
        <line x1={PAD} x2={W - PAD} y1={y(refLine)} y2={y(refLine)}
          stroke="var(--dim)" strokeDasharray="4 5" strokeWidth="1" />
      )}
      <motion.path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
      {points.map((p, i) => (
        <g key={i}>
          <motion.circle cx={x(i)} cy={y(p)} r="4" fill={color}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.14 }} />
          <text x={x(i)} y={y(p) - 11} textAnchor="middle" className="cl-val">{p}{unit}</text>
          <text x={x(i)} y={H - 7} textAnchor="middle" className="cl-lab">{labels[i]}</text>
        </g>
      ))}
    </svg>
  )
}

/* ---------- the case-study page ---------- */
export function CasePage({ cs, onBack }) {
  return (
    <motion.main className="case" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 90, damping: 18 }}>
      <div className="wrap case-wrap">
        <button className="case-back" onClick={onBack}>← cd ~/portfolio</button>
        <div className="kicker">{cs.kicker}</div>
        <h1 className="case-title">{cs.title}</h1>
        <p className="case-lede">{cs.lede}</p>
        <div className="tags" style={{ margin: '18px 0 8px' }}>{cs.stack.map(t => <span key={t}>{t}</span>)}</div>

        <div className="case-grid">
          <section className="case-block">
            <h3>The problem</h3>
            <p>{cs.problem}</p>
          </section>
          <section className="case-block">
            <h3>What I built</h3>
            <p>{cs.built}</p>
          </section>
        </div>

        <section className="case-block case-results">
          <h3>Measured results</h3>
          <p className="case-chart-caption">{cs.chartCaption}</p>
          {cs.chart}
          <ul className="case-facts">{cs.facts.map(f => <li key={f}>{f}</li>)}</ul>
        </section>

        <section className="case-block">
          <h3>Decisions an interviewer should probe</h3>
          <ul className="case-facts">{cs.decisions.map(d => <li key={d}>{d}</li>)}</ul>
        </section>

        <div className="case-cta">
          <a className="btn btn-primary" href={`${GH}/${cs.repo}`} target="_blank" rel="noopener">Read the code & tests ↗</a>
          <button className="btn btn-ghost" onClick={onBack}>All projects</button>
        </div>
      </div>
    </motion.main>
  )
}
