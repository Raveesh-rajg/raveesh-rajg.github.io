/* Live-query hero widget + command palette — the two ideas worth taking
   from the Lovable concept, rebuilt with performance discipline:
   - typewriter runs on a setInterval that PAUSES when the tab is hidden
     and respects prefers-reduced-motion (no main-thread starvation)
   - every query/result pair is a REAL number from the portfolio */

import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, GH } from './data.js'

const QUERIES = [
  ["SELECT fpr FROM ab_tests WHERE method='naive_peeking';", "→ 24.0%  -- vs 1.2% always-valid"],
  ["SELECT accuracy FROM mrf_mapper WHERE eval='gold_crosswalk';", "→ 93.75%  (n=48)"],
  ["SELECT precision_at_50 FROM fraud_triage;", "→ 100%  -- vs 9.8% baseline"],
  ["SELECT w4_retention FROM cohorts GROUP BY activated;", "→ 45.3% vs 18.2%"],
  ["SELECT COUNT(*) FROM projects WHERE tested = TRUE;", "→ 20 rows  (190+ CI tests)"],
  ["SELECT lag_months FROM macro_leadlag ORDER BY r DESC LIMIT 1;", "→ 2  (r = 0.667, differenced)"],
]

export function LiveQuery() {
  const [qi, setQi] = useState(0)
  const [chars, setChars] = useState(0)
  const reduced = useMemo(() =>
    typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  useEffect(() => {
    if (reduced) { setChars(QUERIES[qi][0].length); return }
    const iv = setInterval(() => {
      if (document.hidden) return                    // pause off-screen
      setChars(c => {
        if (c >= QUERIES[qi][0].length + 30) {       // linger, then next
          setQi(i => (i + 1) % QUERIES.length)
          return 0
        }
        return c + 1
      })
    }, 45)
    return () => clearInterval(iv)
  }, [qi, reduced])

  const [q, r] = QUERIES[qi]
  const typed = q.slice(0, chars)
  const done = chars >= q.length
  return (
    <div className="livequery" aria-hidden="true">
      <div className="lq-head">LIVE_QUERY · {String(qi + 1).padStart(3, '0')}<span className="lq-dot" /></div>
      <div className="lq-body">
        <span className="lq-prompt">$ </span>{typed}<span className="lq-cursor" />
        {done && <div className="lq-result">{r}</div>}
      </div>
    </div>
  )
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)

  const items = useMemo(() => [
    ...projects.map(p => ({ label: p.title, hint: p.cat, url: `${GH}/${p.repo}` })),
    { label: 'Featured work', hint: 'section', url: '#work' },
    { label: 'The screening checklist', hint: 'section', url: '#checklist' },
    { label: 'Experience & education', hint: 'section', url: '#experience' },
    { label: 'Contact', hint: 'section', url: '#contact' },
  ], [])

  const hits = useMemo(() => {
    const s = q.toLowerCase().trim()
    if (!s) return items.slice(0, 8)
    return items.filter(i =>
      i.label.toLowerCase().includes(s) || i.hint.toLowerCase().includes(s)).slice(0, 8)
  }, [q, items])

  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setOpen(o => !o); setQ(''); setSel(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 40) }, [open])

  const go = (item) => {
    setOpen(false)
    if (item.url.startsWith('#')) document.querySelector(item.url)?.scrollIntoView({ behavior: 'smooth' })
    else window.open(item.url, '_blank', 'noopener')
  }

  return (
    <>
      <button className="palette-hint" onClick={() => setOpen(true)}>
        <kbd>Ctrl</kbd><kbd>K</kbd> query anything
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="palette-veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}>
            <motion.div className="palette" role="dialog" aria-label="Command palette"
              initial={{ opacity: 0, y: -14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              onClick={e => e.stopPropagation()}>
              <div className="palette-input">
                <span className="lq-prompt">$ </span>
                <input ref={inputRef} value={q} placeholder="SELECT * FROM portfolio WHERE ..."
                  onChange={e => { setQ(e.target.value); setSel(0) }}
                  onKeyDown={e => {
                    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, hits.length - 1)) }
                    if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)) }
                    if (e.key === 'Enter' && hits[sel]) go(hits[sel])
                  }} />
              </div>
              <div className="palette-list">
                {hits.map((h, i) => (
                  <div key={h.label} className={`palette-item${i === sel ? ' sel' : ''}`}
                    onMouseEnter={() => setSel(i)} onClick={() => go(h)}>
                    <span>{h.label}</span><span className="hint">{h.hint}</span>
                  </div>
                ))}
                {hits.length === 0 && <div className="palette-item"><span>0 rows returned</span></div>}
              </div>
              <div className="palette-foot">↑↓ navigate · ↵ open · esc close</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function StatusBar() {
  return (
    <div className="statusbar" aria-hidden="true">
      <span><b>raveesh.db</b> / portfolio.public</span>
      <span className="sb-right"><i className="lq-dot" /> LIVE · 20 projects · 190+ tests · NYC</span>
    </div>
  )
}
