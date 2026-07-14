import Link from 'next/link'
import type { Metadata } from 'next'
import { cases } from '@/lib/cases'
import { GH } from '@/lib/content'
import { Bars, Line } from '@/components/charts'
import { Footer } from '@/components/sections'

export function generateStaticParams() {
  return Object.keys(cases).map(slug => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = cases[params.slug]
  return cs ? { title: `${cs.title} — Raveesh Raj Grandhi`, description: cs.lede } : {}
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const cs = cases[params.slug]
  if (!cs) return <main className="p-24 font-mono">Case not found. <Link className="text-teal" href="/">← home</Link></main>
  return (
    <>
      <main className="min-h-screen py-28">
        <div className="mx-auto max-w-3xl px-6">
          <Link href="/" className="focus-ring font-mono text-[13px] text-dim hover:text-teal">← cd ~/portfolio</Link>
          <p className="kicker mb-4 mt-9">{cs.kicker}</p>
          <h1 className="font-display text-[clamp(30px,4.6vw,46px)] font-bold leading-[1.1] tracking-tight">{cs.title}</h1>
          <p className="mt-3.5 max-w-2xl text-lg text-muted">{cs.lede}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {cs.stack.map(t => <span key={t} className="rounded-md border border-line px-2.5 py-0.5 font-mono text-[11.5px] text-dim">{t}</span>)}
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <section className="glass-sub p-6">
              <h2 className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-teal">The problem</h2>
              <p className="text-[15px] text-muted">{cs.problem}</p>
            </section>
            <section className="glass-sub p-6">
              <h2 className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-teal">What I built</h2>
              <p className="text-[15px] text-muted">{cs.built}</p>
            </section>
          </div>

          <section className="glass-sub mt-5 p-6">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-teal">Measured results</h2>
            <p className="mb-4 text-[15px] text-muted">{cs.chartCaption}</p>
            {cs.chart.kind === 'bars'
              ? <Bars items={cs.chart.items} unit={cs.chart.unit} />
              : <Line points={cs.chart.points} labels={cs.chart.labels} refLine={cs.chart.refLine} />}
            <ul className="mt-4">
              {cs.facts.map(f => (
                <li key={f} className="relative border-b border-dashed border-white/5 py-2 pl-6 text-[14.5px] text-muted last:border-b-0 before:absolute before:left-0.5 before:text-teal before:content-['▸']">{f}</li>
              ))}
            </ul>
          </section>

          <section className="glass-sub mt-5 p-6">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-teal">Decisions an interviewer should probe</h2>
            <ul>
              {cs.decisions.map(d => (
                <li key={d} className="relative border-b border-dashed border-white/5 py-2 pl-6 text-[14.5px] text-muted last:border-b-0 before:absolute before:left-0.5 before:text-teal before:content-['▸']">{d}</li>
              ))}
            </ul>
          </section>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <a href={`${GH}/${cs.slug}`} target="_blank" rel="noopener"
              style={{ background: 'linear-gradient(135deg,#5eead4,#38bdf8)', color: '#04252b' }}
              className="focus-ring rounded-full px-6 py-2.5 text-sm font-semibold">
              Read the code & tests ↗
            </a>
            <Link href="/" className="focus-ring rounded-full border border-line bg-white/5 px-6 py-2.5 text-sm font-semibold">All projects</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
