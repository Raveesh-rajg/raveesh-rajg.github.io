import { useState, useRef } from 'react'
import {
  motion, useScroll, useSpring,
  useMotionValue, useInView, animate,
} from 'framer-motion'
import { featured, checklist, GH, LI, EMAIL } from './data.js'
import { LiveQuery, CommandPalette, StatusBar } from './Terminal.jsx'
import { CasePage } from './Case.jsx'
import { cases } from './cases.jsx'
import { ParticleField, Cursor, Boot, Magnetic } from './Fx.jsx'
import { useEffect } from 'react'

/* ---------- shared variants ---------- */
const rise = {
  hidden: { opacity: 0, y: 30, scale: 0.985 },
  show: (i = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 90, damping: 16, delay: i * 0.07 },
  }),
}
const stagger = { show: { transition: { staggerChildren: 0.07 } } }

function Section({ id, kicker, title, sub, children, style }) {
  return (
    <section id={id} style={style}>
      <div className="wrap">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.div className="kicker" variants={rise}>{kicker}</motion.div>
          <motion.h2 variants={rise}>{title}</motion.h2>
          {sub && <motion.p className="section-sub" variants={rise}>{sub}</motion.p>}
        </motion.div>
        {children}
      </div>
    </section>
  )
}

/* ---------- count-up stat ---------- */
function Stat({ n, suffix, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, n, {
      duration: 1.4, ease: [0.16, 1, 0.3, 1],
      onUpdate: v => { if (ref.current) ref.current.textContent = Math.round(v) },
    })
    return controls.stop
  }, [inView, n])
  return (
    <div className="stat">
      <div className="n"><span ref={ref}>0</span>{suffix && <em>{suffix}</em>}</div>
      <div className="l">{label}</div>
    </div>
  )
}

/* ---------- 3D tilt card ---------- */
const COARSE = typeof window !== 'undefined' && matchMedia('(pointer: coarse)').matches
function TiltCard({ children, flag }) {
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 18 })
  const sry = useSpring(ry, { stiffness: 200, damping: 18 })
  const glowX = useMotionValue('50%'), glowY = useMotionValue('0%')
  return (
    <motion.div
      className={`card${flag ? ' flag' : ''}`}
      variants={rise}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, '--mx': glowX, '--my': glowY }}
      whileHover={{ y: -5 }}
      onMouseMove={e => {
        if (COARSE) return
        const r = e.currentTarget.getBoundingClientRect()
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 6)
        rx.set(((e.clientY - r.top) / r.height - 0.5) * -6)
        glowX.set(e.clientX - r.left + 'px'); glowY.set(e.clientY - r.top + 'px')
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0) }}
    >{children}</motion.div>
  )
}

/* ---------- checklist tick with drawn path ---------- */
function Check({ b, i, idx }) {
  return (
    <motion.div className="check" variants={rise} custom={idx % 6}>
      <span className="tick">
        <svg viewBox="0 0 24 24">
          <motion.path d="M4 12.5l5 5L20 6.5"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 + (idx % 6) * 0.06 }} />
        </svg>
      </span>
      <div><b>{b}</b><i>{i}</i></div>
    </motion.div>
  )
}

/* ---------- contact form → Formspree ---------- */
const FORM_ENDPOINT = 'https://formspree.io/f/mlgqdlnd'
function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const sending = status === 'sending'
  const onSubmit = async e => {
    e.preventDefault()
    if (sending) return
    const form = e.currentTarget
    setStatus('sending')
    const abort = new AbortController()
    const timeout = setTimeout(() => abort.abort(), 12000)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        signal: abort.signal,
      })
      if (res.ok) { setStatus('sent'); form.reset() }
      else setStatus('error')
    } catch { setStatus('error') }
    finally { clearTimeout(timeout) }
  }
  return (
    <form className="cform" onSubmit={onSubmit} aria-describedby="form-status">
      {/* honeypot — Formspree silently drops submissions where bots fill this */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }} />
      <fieldset disabled={sending} className="cform-fields">
        <div className="cform-row">
          <label>Name
            <input name="name" required autoComplete="name" placeholder="Ada Lovelace" />
          </label>
          <label>Email
            <input type="email" name="email" required autoComplete="email" placeholder="ada@company.com" />
          </label>
        </div>
        <label>Message
          <textarea name="message" required rows="5"
            placeholder="We have three years of messy claims data and no trusted metrics…" />
        </label>
      </fieldset>
      <div className="cform-foot">
        <motion.button type="submit" className="btn btn-primary" disabled={sending}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
          {sending && <span className="spin" aria-hidden="true" />}
          {sending ? 'Sending…' : 'Send message'}
        </motion.button>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
      <p id="form-status" role="status" aria-live="polite" className={`cform-status${status === 'error' ? ' err' : ''}`}>
        {status === 'sending' && 'Sending your message…'}
        {status === 'sent' && "Message sent — thanks! I'll get back to you within a day."}
        {status === 'error' && <>Something went wrong — please email me directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</>}
      </p>
    </form>
  )
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menu, setMenu] = useState(false)
  const prevRoute = useRef(route)
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash
      // jump to top only when entering/leaving a case page — plain #section
      // anchors must keep their native scroll
      if (h.startsWith('#/case/') || prevRoute.current.startsWith('#/case/')) window.scrollTo(0, 0)
      prevRoute.current = h
      setRoute(h)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const caseSlug = route.startsWith('#/case/') ? route.slice(7) : null

  // per-page titles: case studies get their own, home restores the default
  useEffect(() => {
    const cs = caseSlug && cases[caseSlug]
    document.title = cs
      ? `${cs.title} — Raveesh Raj Grandhi`
      : 'Raveesh Raj Grandhi — Data & Analytics Professional'
  }, [caseSlug])

  // pill nav: scrolled state + active-section highlight
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (caseSlug) return
    const obs = new IntersectionObserver(es => {
      es.forEach(en => { if (en.isIntersecting) setActive(en.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    ;['about', 'expertise', 'checklist', 'work', 'experience', 'contact']
      .forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [caseSlug])
  useEffect(() => {
    document.body.classList.toggle('menu-open', menu)
    return () => document.body.classList.remove('menu-open')
  }, [menu])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  // Route branch AFTER every hook call — early returns before hooks
  // violate the rules of hooks (React #300; caught by smoke.mjs).
  if (caseSlug && cases[caseSlug]) {
    const slugs = Object.keys(cases)
    const nextSlug = slugs[(slugs.indexOf(caseSlug) + 1) % slugs.length]
    return (<>
      <ParticleField />
      <div className="mesh" /><div className="aurora" /><div className="grid-lines" />
      <div className="bg-noise" />
      <Cursor />
      <StatusBar />
      <CasePage cs={cases[caseSlug]} next={{ slug: nextSlug, title: cases[nextSlug].title }}
        onBack={() => { window.location.hash = '' }} />
    </>)
  }

  const words = ['I', 'turn', 'complex', 'data']
  const words2 = ['into', 'decisions']

  const NAV = [
    ['about', 'About'], ['experience', 'Experience'], ['work', 'Projects'],
    ['expertise', 'Expertise'], ['checklist', 'Checklist'], ['contact', 'Contact'],
  ]
  return (
    <>
      <Boot />
      <ParticleField />
      <div className="mesh" /><div className="aurora" /><div className="grid-lines" />
      <div className="bg-noise" />
      <Cursor />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <StatusBar />
      <CommandPalette />

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a className="logo" href="#">Raveesh Raj <span>Grandhi</span></a>
          <div className="nav-links">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>
            ))}
            <motion.a className="btn btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}
              href="./resume.pdf" download whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>Resume</motion.a>
          </div>
          <button className="burger" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(m => !m)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`m-menu${menu ? ' open' : ''}`}>
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>
        ))}
        <a href="./resume.pdf" download onClick={() => setMenu(false)} style={{ color: 'var(--accent)' }}>Resume ↓</a>
      </div>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <motion.div className="hero-badge" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <span className="dot" />Data Analyst @ NYC Health + Hospitals · Open to BI &amp; Analytics Engineering roles
          </motion.div>
          <h1>
            {words.map((w, i) => (
              <motion.span key={w} className="hw" initial={{ opacity: 0, y: '0.55em', rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.1 + i * 0.09 }}>{w}&nbsp;</motion.span>
            ))}
            <br />
            {words2.map((w, i) => (
              <motion.span key={w} className="hw" initial={{ opacity: 0, y: '0.55em', rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.4 + i * 0.09 }}>{w}&nbsp;</motion.span>
            ))}
            <motion.span className="hw grad" initial={{ opacity: 0, y: '0.55em' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.62 }}>people can trust.</motion.span>
          </h1>
          <motion.p className="lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            I'm <strong>Raveesh Raj Grandhi</strong> — I build reproducible analytics systems, from SQL
            models and data pipelines to dashboards, experimentation frameworks, and AI observability.
            Twenty public projects, <strong>190+ automated tests</strong>, and every metric on this page
            traces to a seeded, verifiable run.
          </motion.p>
          <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <Magnetic><motion.a className="btn btn-primary" href="#work" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>Explore my work ↓</motion.a></Magnetic>
            <motion.a className="btn btn-ghost" href="./resume.pdf" download whileHover={{ y: -3 }}>Download resume ↓</motion.a>
            <motion.a className="btn btn-ghost" href={GH} target="_blank" rel="noopener" whileHover={{ y: -3 }}>GitHub ↗</motion.a>
            <motion.a className="btn btn-ghost" href={LI} target="_blank" rel="noopener" whileHover={{ y: -3 }}>LinkedIn ↗</motion.a>
          </motion.div>
          <div className="hero-cols">
            <motion.div className="stats" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
              <Stat n={20} label="tested projects" />
              <Stat n={190} suffix="+" label="automated tests" />
              <Stat n={8} label="industry domains" />
              <Stat n={15} suffix="+" label="tools in production" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
              <LiveQuery />
            </motion.div>
          </div>
        </div>
      </header>

      <div className="strip">
        <div className="marquee">
          {[0, 1].map(k => (
            <div className="mq" key={k}>
              {['Reproducible analytics','Tested data models','Decision-ready dashboards','Experimentation','Causal inference','AI analytics','Healthcare depth','SQL at depth'].map(s => <span key={s}>{s}</span>)}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about" kicker="About"
        title={<>Turning messy data into<br />trustworthy decisions.</>}>
        <motion.div className="bento" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
          <motion.div className="glassbox b-bio" variants={rise}>
            <p>I'm a data and analytics professional who transforms complex, messy source data into trusted
            dashboards, governed metrics, and decision-ready insights. My work spans the full analytics
            lifecycle, from SQL, data modeling, and pipeline development to business intelligence,
            statistical analysis, and stakeholder communication.</p>
            <p>One principle guides every project: <strong>analytical claims should be reproducible,
            transparent, and tested</strong>. Instead of simply presenting a number, I document the logic,
            validate the underlying data, and build quality checks that allow others to inspect and
            reproduce the result. Explore the repositories to see the methodology, code, and evidence
            behind the insights.</p>
          </motion.div>
          <motion.div className="glassbox b-photo" variants={rise}>
            <div className="photo-ring">
              <img src="./profile.jpg" alt="Raveesh Raj Grandhi" width="180" height="222"
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }} />
              <div className="photo-fallback" aria-hidden="true">R</div>
            </div>
            <div className="socials">
              <a href={GH} target="_blank" rel="noopener" aria-label="GitHub">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              <a href={LI} target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A6 6 0 0 1 16 8z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href={`mailto:${EMAIL}`} aria-label="Email">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
            </div>
          </motion.div>
          <motion.div className="glassbox b-mini" variants={rise}>
            <h3>Currently</h3>
            <div className="big">Data Analyst @ NYC Health + Hospitals</div>
            <p>Woodhull Medical Center, New York City — open to Business Intelligence, Analytics Engineering, and Data Analyst roles.</p>
          </motion.div>
          <motion.div className="glassbox b-mini" variants={rise}>
            <h3>Education &amp; credentials</h3>
            <div className="big">M.S. Healthcare Informatics</div>
            <p>University of Wisconsin–Milwaukee · Chancellor's Award · Google Advanced Data Analytics certified.</p>
          </motion.div>
        </motion.div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" kicker="Background" title="Experience & education."
        sub="Clinical training → healthcare informatics → analytics in one of the largest public health systems in the U.S." style={{ paddingTop: 40 }}>
        <motion.div className="xp" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
          {[['OCT 2025 — PRESENT · NEW YORK, NY', 'Data Analyst', 'NYC Health + Hospitals · Woodhull Medical Center',
            '20+ Tableau, Power BI, and Excel dashboards for leadership reporting across Epic, Snowflake, and internal systems. Cut recurring report prep 75% through automation, raised reporting accuracy from 88% to 94%, and supported Epic go-live — training ~50 clinical and administrative staff.'],
            ['JUL 2024 — MAY 2025 · MILWAUKEE, WI', 'Graduate Research Analyst', 'Northwestern Mutual Data Science Institute',
            'Built an AI respiratory-disease classification model achieving 93.5% accuracy on 2,500+ clinical audio recordings — end-to-end Python pipeline with cross-validation, ROC analysis, and hypothesis testing. Best Poster Award, 2024.'],
            ['EDUCATION', 'M.S. Healthcare Informatics', "University of Wisconsin–Milwaukee · Chancellor's Graduate Student Award",
            'Preceded by a Bachelor of Dental Surgery — the clinical foundation behind the healthcare analytics work. Google Advanced Data Analytics certified.'],
          ].map(([when, h, org, p]) => (
            <motion.div className="xp-item" key={h} variants={rise}>
              <div className="when">{when}</div><h3>{h}</h3><div className="org">{org}</div><p>{p}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* FEATURED */}
      <Section id="work" kicker="Featured work" title="Six projects that carry the portfolio."
        sub="Each attacks a problem most portfolios avoid — hostile public data, statistical traps, AI systems that need governing — and every claim is pinned by an automated test."
        style={{ paddingTop: 30 }}>
        <motion.div className="feat-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
          {featured.map(f => (
            <TiltCard key={f.repo} flag={f.flag}>
              <span className={`chip ${f.cls}`}>{f.chip}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <div className="metric">{f.metric}</div>
              <div className="tags">{f.tags.map(t => <span key={t}>{t}</span>)}</div>
              <div className="card-links">
                <a className="card-link" href={`#/case/${f.repo}`}>Case study →</a>
                <a className="card-link dim" href={`${GH}/${f.repo}`} target="_blank" rel="noopener">
                  Code <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M7 17L17 7M7 7h10v10" /></svg>
                </a>
              </div>
            </TiltCard>
          ))}
        </motion.div>
        <motion.div className="more-proj" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ type: 'spring', stiffness: 90, damping: 16 }}>
          <p>Fourteen more tested projects span insurance risk, real-time streaming, forecasting,
          BI &amp; visualization, and marketing science.</p>
          <Magnetic><motion.a className="btn btn-primary" href={GH} target="_blank" rel="noopener"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>Explore all 20 repositories on GitHub →</motion.a></Magnetic>
        </motion.div>
      </Section>

      {/* EXPERTISE */}
      <Section id="expertise" kicker="Expertise"
        title="The stack, in production across 20 repos."
        sub="No proficiency percentages — every tool below is used in a public, tested project you can open."
        style={{ paddingTop: 30 }}>
        <motion.div className="skill-cols" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          {[
            ['BI & visualization', ['Power BI · DAX', 'Tableau', 'LookML', 'Looker Studio', 'Excel · Power Query', 'Evidence.dev', 'Streamlit']],
            ['SQL, modeling & warehousing', ['SQL', 'dbt Core', 'Snowflake', 'BigQuery', 'DuckDB', 'PostgreSQL', 'Kimball modeling']],
            ['Python & statistics', ['pandas', 'scipy', 'statsmodels', 'scikit-learn', 'A/B testing', 'causal inference', 'forecasting']],
            ['Data engineering & cloud', ['PySpark', 'Delta Lake', 'Databricks', 'Pub/Sub', 'Cloud Run', 'GitHub Actions CI']],
            ['AI & LLM systems', ['Claude API', 'Gemini', 'LangChain', 'RAG', 'eval harnesses', 'OpenTelemetry GenAI']],
            ['Engineering practice', ['pytest', 'Git · GitHub', 'seeded reproducibility', 'decision records', 'data-quality gates']],
          ].map(([h, tools]) => (
            <motion.div className="skill-group" key={h} variants={rise}>
              <h3>{h}</h3>
              <div className="tags">{tools.map(t => <span key={t}>{t}</span>)}</div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* CHECKLIST */}
      <Section id="checklist" kicker="Capabilities"
        title={<>Every capability,<br />with its <span className="grad">proof.</span></>}
        sub="Twelve things an analytics screen looks for. Each one names the tested, public project that demonstrates it.">
        <motion.div className="check-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          {checklist.map(([b, i], idx) => <Check key={b} b={b} i={i} idx={idx} />)}
        </motion.div>
      </Section>

      {/* PHILOSOPHY */}
      <Section id="approach" kicker="Philosophy"
        title={<>Every metric should be <span className="grad">reproducible, explainable, and tested.</span></>}
        sub="Analysis that doesn't change a decision is decoration. The same six-stage discipline runs through all twenty projects — and through my hospital reporting work."
        style={{ paddingTop: 40 }}>
        <motion.ol className="stages" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          {[['01', 'Raw data', 'Land it untouched, with audit columns — bronze is the record of what the source actually sent.'],
            ['02', 'Validation', 'Planted-defect testing, quarantine with reasons, reconciliation that must sum exactly. Nothing silently dropped.'],
            ['03', 'Modeling', 'Dimensional schemas and tested transformations — definitions live in one place, under version control and CI.'],
            ['04', 'Analysis', "The right method for the question: experiment when you can, quasi-experiment when you can't, and honest baselines always."],
            ['05', 'Visualization', 'Dashboards read pre-aggregated, governed marts — so "revenue" means the same thing on every chart.'],
            ['06', 'Decision', 'Every readout ends at an action, with its assumptions and confidence stated — not a chart dump.'],
          ].map(([n, h, p], i) => (
            <motion.li className="stage" key={n} variants={rise}>
              <span className="n">{n}</span><h3>{h}</h3><p>{p}</p>
              {i < 5 && <svg className="flow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>}
            </motion.li>
          ))}
        </motion.ol>
      </Section>

      {/* CONTACT */}
      <section id="contact" style={{ paddingTop: 30 }}>
        <div className="wrap">
          <motion.div className="contact-box" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ type: 'spring', stiffness: 80, damping: 16 }}>
            <div className="kicker" style={{ justifyContent: 'center' }}>Let's talk</div>
            <h2>Have a complex data problem?<br />Let's make it <span className="grad">decision-ready.</span></h2>
            <p>Open to Business Intelligence, Analytics Engineering, and Data Analyst roles. Every project on this site is public, tested, and ready to be discussed in depth.</p>
            <ContactForm />
            <div className="contact-links" style={{ marginTop: 30 }}>
              <motion.a className="btn btn-ghost" href="./resume.pdf" download whileHover={{ y: -3 }}>Download resume ↓</motion.a>
              <motion.a className="btn btn-ghost" href={GH} target="_blank" rel="noopener" whileHover={{ y: -3 }}>GitHub</motion.a>
              <motion.a className="btn btn-ghost" href={LI} target="_blank" rel="noopener" whileHover={{ y: -3 }}>LinkedIn</motion.a>
            </div>
          </motion.div>
          <footer>
            <div><b style={{ fontFamily: 'var(--font-display)', color: 'var(--muted)', fontWeight: 600 }}>Raveesh Raj Grandhi</b> — Data &amp; Analytics Professional · © 2026</div>
            <div><a href={GH} target="_blank" rel="noopener">GitHub</a> · <a href={LI} target="_blank" rel="noopener">LinkedIn</a> · <a href={`mailto:${EMAIL}`}>Email</a> · <a href="#">Back to top ↑</a></div>
            <div className="foot-sig">designed &amp; engineered with precision</div>
          </footer>
        </div>
      </section>
    </>
  )
}
