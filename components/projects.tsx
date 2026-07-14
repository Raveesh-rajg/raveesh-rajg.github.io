'use client'
/* FeaturedProjects + ProjectCard + compact index + Contact form. */

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading, AnimatedButton, stagger, rise } from './ui'
import { GH, EMAIL, FORM_ENDPOINT, featured, indexRows, type Featured } from '@/lib/content'

const chipColor: Record<Featured['accent'], string> = {
  teal: 'border-teal/30 text-teal',
  violet: 'border-violet/40 text-violet',
  fuchsia: 'border-fuchsia2/30 text-fuchsia2',
  gold: 'border-gold/40 text-gold',
}

function ProjectCard({ f }: { f: Featured }) {
  return (
    <motion.article variants={rise} whileHover={{ y: -5 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      className={`card-spot glass relative flex flex-col p-7 transition-colors hover:border-teal/30 ${f.accent === 'gold' ? 'border-gold/30' : ''}`}>
      <span className={`mb-4 w-fit rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[.14em] ${chipColor[f.accent]}`}>
        {f.chip}
      </span>
      <h3 className="mb-2.5 font-display text-[21px] font-semibold tracking-tight">{f.title}</h3>
      <p className="flex-1 text-[14.5px] text-muted">{f.body}</p>
      <p className="my-4 rounded-r-lg border-l-2 border-teal bg-teal/5 px-3.5 py-2.5 font-mono text-[13px] text-teal">
        {f.metric}
      </p>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {f.tags.map(t => (
          <span key={t} className="rounded-md border border-line px-2.5 py-0.5 font-mono text-[11.5px] text-dim">{t}</span>
        ))}
      </div>
      <div className="flex items-center gap-6 text-sm font-semibold">
        <Link href={`/projects/${f.slug}/`} className="focus-ring hover:text-teal">View case study →</Link>
        <a href={`${GH}/${f.slug}`} target="_blank" rel="noopener"
          className="focus-ring inline-flex items-center gap-1 font-medium text-muted hover:text-teal">
          Code <ArrowUpRight size={13} aria-hidden />
        </a>
      </div>
    </motion.article>
  )
}

export function FeaturedProjects() {
  return (
    <Section id="projects">
      <SectionHeading kicker="Featured work" title="Six projects that carry the portfolio."
        sub="Each attacks a problem most portfolios avoid — hostile public data, statistical traps, AI systems that need governing — and every claim is pinned by an automated test." />
      <motion.div className="grid gap-5 md:grid-cols-2"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
        {featured.map(f => <ProjectCard key={f.slug} f={f} />)}
      </motion.div>

      <div className="mt-16">
        <SectionHeading kicker="The full index" title="Fourteen more, one line each."
          sub="The featured six go deep; the bench stays scannable — every line carries its headline number, every link is a tested repo." />
        <motion.div className="overflow-hidden rounded-glass border border-line"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
          {indexRows.map(p => (
            <motion.a key={p.repo} variants={rise} href={`${GH}/${p.repo}`} target="_blank" rel="noopener"
              className="focus-ring grid grid-cols-[1fr_100px] items-center gap-4 border-b border-line bg-white/[.03] px-6 py-4 last:border-b-0 hover:bg-white/[.06] md:grid-cols-[170px_240px_1fr_95px]">
              <span className="font-mono text-[10px] uppercase tracking-[.14em] text-violet max-md:hidden">{p.cat}</span>
              <span className="font-display text-[14.5px] font-semibold">{p.title}</span>
              <span className="truncate font-mono text-[11.5px] text-muted max-md:hidden">{p.m}</span>
              <span className="whitespace-nowrap text-right font-mono text-[10.5px] text-dim">{p.tests} ↗</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [state, setState] = useState<FormState>('idle')
  const [err, setErr] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setState('error'); setErr('Add your name, a valid email, and a message.'); return
    }
    setState('sending'); setErr('')
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })
        if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`)
        setState('sent'); form.reset()
      } else {
        // No endpoint configured: fall back to the visitor's mail client.
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')')}`
        setState('sent')
      }
    } catch {
      setState('error'); setErr('Could not send right now — email me directly instead.')
    }
  }

  return (
    <Section id="contact">
      <div className="glass p-[clamp(28px,6vw,64px)] text-center">
        <p className="kicker mb-4 justify-center">Let&apos;s talk</p>
        <h2 className="mb-3 font-display text-[clamp(28px,4vw,42px)] font-semibold tracking-tight">
          Have a complex data problem?<br />Let&apos;s make it <span className="grad-text">decision-ready.</span>
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-muted">
          Open to Business Intelligence, Analytics Engineering, and Data Analyst roles.
          Every project on this site is public, tested, and ready to be discussed in depth.
        </p>
        <form onSubmit={onSubmit} noValidate className="mx-auto grid max-w-xl gap-3 text-left" aria-describedby="form-status">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs text-dim">Name
              <input name="name" required autoComplete="name"
                className="focus-ring rounded-xl border border-line bg-white/5 px-4 py-2.5 text-[15px] text-body placeholder:text-dim"
                placeholder="Ada Lovelace" />
            </label>
            <label className="grid gap-1.5 text-xs text-dim">Email
              <input name="email" type="email" required autoComplete="email"
                className="focus-ring rounded-xl border border-line bg-white/5 px-4 py-2.5 text-[15px] text-body placeholder:text-dim"
                placeholder="ada@company.com" />
            </label>
          </div>
          <label className="grid gap-1.5 text-xs text-dim">Message
            <textarea name="message" required rows={4}
              className="focus-ring rounded-xl border border-line bg-white/5 px-4 py-2.5 text-[15px] text-body placeholder:text-dim"
              placeholder="We have three years of messy claims data and no trusted metrics…" />
          </label>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
            <button type="submit" disabled={state === 'sending'}
              style={{ background: 'linear-gradient(135deg,#5eead4,#38bdf8)', color: '#04252b' }}
              className="focus-ring rounded-full px-7 py-2.5 text-sm font-semibold disabled:opacity-60">
              {state === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <a href={`mailto:${EMAIL}`} className="focus-ring text-sm text-muted hover:text-teal">{EMAIL}</a>
          </div>
          <p id="form-status" role="status" aria-live="polite"
            className={`min-h-5 text-sm ${state === 'error' ? 'text-red-400' : 'text-teal'}`}>
            {state === 'sent' && 'Message sent — thank you. I reply within a day.'}
            {state === 'error' && err}
          </p>
        </form>
      </div>
    </Section>
  )
}
