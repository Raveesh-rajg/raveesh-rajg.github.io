'use client'
/* Hero + HeroDataVisualization (live query terminal) + CredibilityStrip. */

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { AnimatedButton } from './ui'
import { GH, LI, queries } from '@/lib/content'

function Stat({ n, suffix, label }: { n: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, n, {
      duration: 1.4, ease: [0.16, 1, 0.3, 1],
      onUpdate: v => { if (ref.current) ref.current.textContent = String(Math.round(v)) },
    })
    return () => c.stop()
  }, [inView, n])
  return (
    <div className="relative bg-panel/90 px-6 py-5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-teal after:to-transparent after:opacity-50">
      <div className="font-display text-[32px] font-bold tracking-tight">
        <span ref={ref}>0</span>{suffix && <em className="not-italic text-teal text-[20px]">{suffix}</em>}
      </div>
      <div className="text-xs text-dim">{label}</div>
    </div>
  )
}

function LiveQuery() {
  const [qi, setQi] = useState(0)
  const [chars, setChars] = useState(0)
  const reduced = useMemo(
    () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  useEffect(() => {
    if (reduced) { setChars(queries[qi][0].length); return }
    const iv = setInterval(() => {
      if (document.hidden) return
      setChars(c => {
        if (c >= queries[qi][0].length + 30) { setQi(i => (i + 1) % queries.length); return 0 }
        return c + 1
      })
    }, 45)
    return () => clearInterval(iv)
  }, [qi, reduced])
  const [q, r] = queries[qi]
  const done = chars >= q.length
  return (
    <div className="glass-sub h-full min-h-[130px] p-5 font-mono text-[12.5px]" aria-hidden>
      <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-dim">
        live_query · {String(qi + 1).padStart(3, '0')}
        <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal shadow-[0_0_8px_#5eead4]" />
      </div>
      <div className="leading-7 text-muted break-words">
        <span className="text-teal">$ </span>{q.slice(0, chars)}
        <span className="ml-0.5 inline-block h-3.5 w-[7px] animate-pulse bg-teal align-[-2px]" />
        {done && <div className="mt-1.5 text-teal">{r}</div>}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <header className="flex min-h-svh items-center pt-40 pb-20" id="top">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.p initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 text-[13px] text-muted">
          <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal shadow-[0_0_10px_#5eead4]" />
          Business Analyst · Analytics Engineer · Data Storyteller — NYC
        </motion.p>
        <h1 className="mb-6 font-display font-bold leading-[1.04] tracking-[-0.035em] text-[clamp(42px,7.2vw,84px)]">
          {['I turn complex data', 'into decisions'].map((line, li) => (
            <span key={line} className="block">
              {line.split(' ').map((w, i) => (
                <motion.span key={w + i} className="inline-block"
                  initial={{ opacity: 0, y: '0.55em', rotate: 1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.12 + (li * 3 + i) * 0.08 }}>
                  {w}&nbsp;
                </motion.span>
              ))}
            </span>
          ))}
          <motion.span className="grad-text inline-block"
            initial={{ opacity: 0, y: '0.55em' }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.75 }}>
            people can trust.
          </motion.span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
          className="mb-9 max-w-2xl text-[clamp(16px,2vw,19px)] text-muted">
          I build reproducible analytics systems — from SQL models and data pipelines to dashboards,
          experimentation frameworks, and AI observability. Twenty public projects,{' '}
          <strong className="font-semibold text-body">190+ automated tests</strong>, and every metric on
          this page traces to a seeded, verifiable run.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          className="mb-14 flex flex-wrap gap-3.5">
          <AnimatedButton href="#projects" primary>Explore my work ↓</AnimatedButton>
          <AnimatedButton href={GH}>GitHub ↗</AnimatedButton>
          <AnimatedButton href={LI}>LinkedIn ↗</AnimatedButton>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }}
          className="grid max-w-5xl items-stretch gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="grid grid-cols-2 overflow-hidden rounded-glass border border-line sm:grid-cols-4 [&>*+*]:border-l [&>*]:border-line">
            <Stat n={20} label="tested projects" />
            <Stat n={190} suffix="+" label="automated tests" />
            <Stat n={8} label="industry domains" />
            <Stat n={15} suffix="+" label="tools in production" />
          </div>
          <LiveQuery />
        </motion.div>
      </div>
    </header>
  )
}

export function CredibilityStrip() {
  const items = ['Reproducible analytics', 'Tested data models', 'Decision-ready dashboards',
    'Experimentation', 'Causal inference', 'AI analytics', 'Healthcare depth', 'SQL at depth']
  return (
    <div className="overflow-hidden border-y border-line bg-white/[.015] py-4" aria-hidden>
      <div className="marquee">
        {[0, 1].map(k => (
          <div key={k} className="flex gap-14 whitespace-nowrap pr-14">
            {items.map(s => (
              <span key={s} className="font-mono text-[13px] tracking-wider text-dim after:ml-14 after:text-teal after:content-['·']">
                {s}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
