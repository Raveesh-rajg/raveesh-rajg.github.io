import { useState, useRef } from 'react'
import {
  motion, AnimatePresence, useScroll, useSpring, useTransform,
  useMotionValue, useInView, animate,
} from 'framer-motion'
import { featured, projects, checklist, GH, LI, EMAIL } from './data.js'
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

const FILTERS = [
  ['all', 'All 20'], ['health', 'Healthcare'], ['data-eng', 'Data Engineering'],
  ['stats', 'Statistics & Causal'], ['ai', 'AI / LLM'], ['bi', 'BI & Visualization'],
  ['biz', 'Finance · Risk · Marketing'],
]
const PC = { gold: 'var(--gold)', v: 'var(--accent-2)', p: 'var(--accent-3)' }

export default function App() {
  const [filter, setFilter] = useState('all')
  const [route, setRoute] = useState(() => window.location.hash)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    const onHash = () => { setRoute(window.location.hash); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const caseSlug = route.startsWith('#/case/') ? route.slice(7) : null

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
    ;['about', 'checklist', 'work', 'projects', 'experience', 'contact']
      .forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [caseSlug])
  useEffect(() => {
    document.body.classList.toggle('menu-open', menu)
    return () => document.body.classList.remove('menu-open')
  }, [menu])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], [0, 120])
  const heroOpacity = useTransform(heroScroll, [0, 0.85], [1, 0.15])

  // Route branch AFTER every hook call — early returns before hooks
  // violate the rules of hooks (React #300; caught by smoke.mjs).
  if (caseSlug && cases[caseSlug]) {
    return (<>
      <ParticleField />
      <div className="mesh" /><div className="aurora" /><div className="grid-lines" />
      <div className="bg-noise" /><div className="scanline" />
      <Cursor />
      <StatusBar />
      <CasePage cs={cases[caseSlug]} onBack={() => { window.location.hash = '' }} />
    </>)
  }

  const shown = projects.filter(p => filter === 'all' || p.c === filter)
  const words = ['Analytics', 'that', 'survive']
  const words2 = ['contact', 'with']

  const NAV = [
    ['about', 'About'], ['checklist', 'Checklist'], ['work', 'Featured'],
    ['projects', 'Projects'], ['experience', 'Experience'], ['contact', 'Contact'],
  ]
  return (
    <>
      <Boot />
      <ParticleField />
      <div className="mesh" /><div className="aurora" /><div className="grid-lines" />
      <div className="bg-noise" /><div className="scanline" />
      <Cursor />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <StatusBar />
      <CommandPalette />

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a className="logo" href="#">raveesh<span>.grandhi</span></a>
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
      <header className="hero" ref={heroRef}>
        <motion.div className="wrap" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div className="hero-badge" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <span className="dot" />Data Analyst @ NYC Health + Hospitals · Open to BI / Analytics Engineering roles
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
              transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.62 }}>real data.</motion.span>
          </h1>
          <motion.p className="lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            I'm <strong>Raveesh Raj Grandhi</strong> — a data analyst who builds analytics platforms the way
            engineers build software: <strong>tested, documented, reproducible</strong>. Twenty projects across
            experimentation, causal inference, LLM systems, and modern data stacks — every metric on this page traces
            to a seeded, verifiable run.
          </motion.p>
          <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <Magnetic><motion.a className="btn btn-primary" href="#checklist" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>See the checklist ↓</motion.a></Magnetic>
            <motion.a className="btn btn-ghost" href={GH} target="_blank" rel="noopener" whileHover={{ y: -3 }}>GitHub ↗</motion.a>
            <motion.a className="btn btn-ghost" href={LI} target="_blank" rel="noopener" whileHover={{ y: -3 }}>LinkedIn ↗</motion.a>
          </motion.div>
          <div className="hero-cols">
            <motion.div className="stats" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
              <Stat n={20} label="production-grade projects" />
              <Stat n={190} suffix="+" label="automated tests passing" />
              <Stat n={8} label="industry domains" />
              <Stat n={15} suffix="+" label="tools in production use" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
              <LiveQuery />
            </motion.div>
          </div>
        </motion.div>
      </header>

      <div className="strip">
        <div className="marquee">
          {[0, 1].map(k => (
            <div className="mq" key={k}>
              {['SQL','Python','dbt','Snowflake','BigQuery','PySpark · Delta Lake','Tableau','Power BI · DAX','LookML','DuckDB','Claude API','Gemini','A/B Testing','Causal Inference','GitHub Actions CI','Streamlit'].map(s => <span key={s}>{s}</span>)}
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
            <h4>Currently</h4>
            <div className="big">Data Analyst @ NYC Health + Hospitals</div>
            <p>Woodhull Medical Center, New York City — open to Business Intelligence, Analytics Engineering, and Data Analyst roles.</p>
          </motion.div>
          <motion.div className="glassbox b-mini" variants={rise}>
            <h4>Operating principle</h4>
            <div className="big">No unverifiable claims</div>
            <p>Every number on this site is pinned by an automated test in a public repository. If it can't be reproduced, it isn't reported.</p>
          </motion.div>
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

      {/* FEATURED */}
      <Section id="work" kicker="Featured work" title="Six projects that carry the portfolio."
        sub="Each one attacks a problem most portfolios avoid — hostile public data, statistical traps, AI systems that need governing."
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
      </Section>

      {/* ALL PROJECTS with animated layout filter */}
      <Section id="projects" kicker="The full index" title="Fourteen more, one line each."
        sub="The featured six above go deep; the rest of the bench stays scannable — every line carries its headline number, every link is a tested repo."
        style={{ paddingTop: 40 }}>
        <div className="filter-row">
          {FILTERS.map(([f, label]) => (
            <motion.button key={f} className={`filter${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>{label}</motion.button>
          ))}
        </div>
        <motion.div className="index-list" layout>
          <AnimatePresence mode="popLayout">
            {shown.filter(p => !featured.some(f => f.repo === p.repo)).map(p => (
              <motion.a key={p.repo} layout className="prow" href={`${GH}/${p.repo}`} target="_blank" rel="noopener"
                style={{ '--pc': PC[p.pc] || 'var(--accent)' }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}>
                <span className="prow-cat">{p.cat}</span>
                <span className="prow-title">{p.title}</span>
                <span className="prow-m">{p.m}</span>
                <span className="prow-tests">{p.tests} ↗</span>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* APPROACH */}
      <Section id="approach" kicker="How I work" title="Three rules behind every project." style={{ paddingTop: 40 }}>
        <motion.div className="pillars" style={{ marginTop: 48 }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          {[['01 / TESTED', 'Claims are executable', 'Synthetic data gets defects and effects planted at known rates, so "the pipeline catches fraud" becomes precision@50 = 100% against ground truth — an assertion in CI, not a sentence in a README.'],
            ['02 / HONEST', 'The failure is the finding', 'ETS beats seasonal-naive by only 0.3 points — reported. Trending series correlate at every lag until you difference them — documented where I hit it.'],
            ['03 / DECIDED', 'Built for the decision', 'Cost per successful answer, not per call. Same-store sales, not blended growth. The denominator is the analysis — every project ends at the action it supports.'],
          ].map(([num, h, p]) => (
            <motion.div className="pillar" key={num} variants={rise}><div className="num">{num}</div><h3>{h}</h3><p>{p}</p></motion.div>
          ))}
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

      {/* CONTACT */}
      <section id="contact" style={{ paddingTop: 30 }}>
        <div className="wrap">
          <motion.div className="contact-box" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ type: 'spring', stiffness: 80, damping: 16 }}>
            <div className="kicker" style={{ justifyContent: 'center' }}>Let's talk</div>
            <h2>Looking for an analyst who<br />ships like an <span className="grad">engineer?</span></h2>
            <p>Open to Business Intelligence, Analytics Engineering, and Data Analyst roles. Every project on this site is public, tested, and ready to be discussed in depth.</p>
            <div className="contact-links">
              <Magnetic><motion.a className="btn btn-primary" href={`mailto:${EMAIL}`} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>{EMAIL}</motion.a></Magnetic>
              <motion.a className="btn btn-ghost" href={GH} target="_blank" rel="noopener" whileHover={{ y: -3 }}>GitHub</motion.a>
              <motion.a className="btn btn-ghost" href={LI} target="_blank" rel="noopener" whileHover={{ y: -3 }}>LinkedIn</motion.a>
            </div>
          </motion.div>
          <footer>
            <div>© 2026 Raveesh Raj Grandhi · React + Framer Motion, built by hand</div>
            <div><a href="#checklist">Checklist</a> · <a href="#projects">Projects</a> · <a href="#contact">Contact</a></div>
          </footer>
        </div>
      </section>
    </>
  )
}
