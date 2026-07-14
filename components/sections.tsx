'use client'
/* About · ExpertiseGrid · AnalyticsPhilosophy/DataPipeline · WorkProcess ·
   GitHubMetrics · Footer — the narrative sections. */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Github, Mail } from 'lucide-react'
import { Section, SectionHeading, GlassPanel, Reveal, stagger, rise } from './ui'
import { GH, LI, EMAIL, expertise, capabilities, pipeline, process } from '@/lib/content'

export function About() {
  return (
    <Section id="about">
      <SectionHeading kicker="About" title={<>Turning messy data into<br />trustworthy decisions.</>} />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <GlassPanel>
          <div className="space-y-4 text-[15.5px] leading-relaxed text-muted">
            <p>
              I&apos;m a data and analytics professional who transforms complex, messy source data into trusted
              dashboards, governed metrics, and decision-ready insights. My work spans the full analytics
              lifecycle, from SQL, data modeling, and pipeline development to business intelligence, statistical
              analysis, and stakeholder communication.
            </p>
            <p>
              One principle guides every project: <strong className="text-body">analytical claims should be
              reproducible, transparent, and tested</strong>. Instead of simply presenting a number, I document the
              logic, validate the underlying data, and build quality checks that allow others to inspect and
              reproduce the result. Explore the repositories to see the methodology, code, and evidence behind the
              insights.
            </p>
          </div>
        </GlassPanel>
        <GlassPanel className="flex flex-col items-center justify-center gap-4 text-center">
          <img
            src="./profile.jpg"
            alt="Raveesh Raj Grandhi"
            width={176}
            height={220}
            className="h-[220px] w-[176px] rounded-2xl border border-line object-cover object-top"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 176 220'%3E%3Crect width='176' height='220' rx='16' fill='%230b0e17' stroke='%23ffffff14'/%3E%3Ctext x='88' y='120' text-anchor='middle' font-family='monospace' font-size='56' fill='%235eead4'%3ERG%3C/text%3E%3C/svg%3E"
            }}
          />
          <div className="flex gap-3">
            <a className="focus-ring text-muted hover:text-teal" href={GH} target="_blank" rel="noopener" aria-label="GitHub"><Github size={18} /></a>
            <a className="focus-ring text-muted hover:text-teal" href={`mailto:${EMAIL}`} aria-label="Email"><Mail size={18} /></a>
          </div>
        </GlassPanel>
      </div>
    </Section>
  )
}

export function ExpertiseGrid() {
  return (
    <Section id="expertise">
      <SectionHeading kicker="Expertise" title="The stack, in production across 20 repos."
        sub="No proficiency percentages — every tool below is used in a public, tested project you can open." />
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
        {expertise.map(g => (
          <motion.div key={g.group} variants={rise} className="glass-sub p-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[.18em] text-teal">{g.group}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map(t => (
                <span key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16">
        <SectionHeading kicker="Capabilities" title={<>Every capability, with its <span className="grad-text">proof.</span></>}
          sub="Eight things an analytics screen looks for. Each names the tested, public project that demonstrates it." />
        <motion.div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          {capabilities.map(([b, note]) => (
            <motion.div key={b} variants={rise}
              className="flex items-start gap-3.5 rounded-card border border-line bg-white/[.035] p-4 transition-colors hover:border-teal/40">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-lg border border-teal/40 bg-teal/10 text-teal">
                <Check size={13} strokeWidth={3} aria-hidden />
              </span>
              <span>
                <b className="block text-sm font-semibold">{b}</b>
                <i className="font-mono text-[11.5px] not-italic text-dim">{note}</i>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

export function AnalyticsPhilosophy() {
  return (
    <Section id="philosophy">
      <SectionHeading kicker="Philosophy"
        title={<>Every metric should be <span className="grad-text">reproducible, explainable, and tested.</span></>}
        sub="Analysis that doesn't change a decision is decoration. The same six-stage discipline runs through all twenty projects — and through my hospital reporting work." />
      <motion.ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
        {pipeline.map((p, i) => (
          <motion.li key={p.stage} variants={rise} className="glass-sub relative p-6">
            <span className="font-mono text-xs text-teal">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 font-display text-lg font-semibold">{p.stage}</h3>
            <p className="mt-2 text-sm text-muted">{p.note}</p>
            {i < pipeline.length - 1 && (
              <ArrowRight aria-hidden size={16} className="absolute right-4 top-6 text-dim max-lg:hidden" />
            )}
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  )
}

export function WorkProcess() {
  return (
    <Section id="process">
      <SectionHeading kicker="Working process" title="Five stages, decision-first."
        sub="Analysis that doesn't change an action is decoration — so the decision comes first, literally." />
      <div className="relative border-l border-line pl-9">
        {process.map((p, i) => (
          <Reveal key={p.step} className="relative pb-10 last:pb-0">
            <span aria-hidden className="absolute -left-[41.5px] top-1.5 h-2.5 w-2.5 rounded-full bg-teal shadow-[0_0_12px_rgba(94,234,212,.6)]" />
            <p className="font-mono text-xs text-dim">STAGE {i + 1}</p>
            <h3 className="mt-1 font-display text-xl font-semibold">{p.step}</h3>
            <p className="mt-1 max-w-xl text-[15px] text-muted">{p.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

interface GhStats { repos: number | null; followers: number | null }

export function GitHubMetrics() {
  const [stats, setStats] = useState<GhStats>({ repos: null, followers: null })
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    fetch('https://api.github.com/users/Raveesh-rajg')
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(d => setStats({ repos: d.public_repos, followers: d.followers }))
      .catch(() => setFailed(true))
  }, [])
  return (
    <Section>
      <div className="glass flex flex-wrap items-center justify-between gap-6 p-8">
        <div>
          <p className="kicker mb-2">Live from GitHub</p>
          <p className="max-w-md text-sm text-muted">
            Fetched from the public GitHub API at page load — the same no-fake-counters rule the projects follow.
          </p>
        </div>
        <div className="flex gap-10 font-display">
          <div>
            <div className="text-4xl font-bold text-teal">{failed ? '—' : stats.repos ?? '…'}</div>
            <div className="text-xs text-dim">public repositories</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-teal">{failed ? '—' : stats.followers ?? '…'}</div>
            <div className="text-xs text-dim">followers</div>
          </div>
          <div>
            <div className="text-4xl font-bold">190<span className="text-teal">+</span></div>
            <div className="text-xs text-dim">CI tests (counted in repos)</div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line py-9 text-[13px] text-dim">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6">
        <div>
          <span className="font-display font-semibold text-muted">Raveesh Raj Grandhi</span> — Data & Analytics Professional
          <span className="mx-2">·</span>© {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-5">
          <a className="focus-ring hover:text-teal" href={GH} target="_blank" rel="noopener">GitHub</a>
          <a className="focus-ring hover:text-teal" href={LI} target="_blank" rel="noopener">LinkedIn</a>
          <a className="focus-ring hover:text-teal" href={`mailto:${EMAIL}`}>Email</a>
          <a className="focus-ring hover:text-teal" href="#top">Back to top ↑</a>
        </div>
        <div className="w-full text-right text-[11px] text-dim/70 sm:w-auto">Designed and engineered with precision.</div>
      </div>
    </footer>
  )
}
