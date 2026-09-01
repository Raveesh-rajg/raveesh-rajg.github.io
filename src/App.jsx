import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { EvidenceField } from './EvidenceField.jsx'
import { ProjectArtifact } from './Artifacts.jsx'
import { archive, exhibits, links, method } from './content.js'

const repoUrl = repo => `${links.github}/${repo}`
const ease = [0.22, 1, 0.36, 1]

function Arrow({ diagonal = false }) {
  return (
    <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d={diagonal ? 'M4 16L16 4M7 4h9v9' : 'M3 10h14M12 5l5 5-5 5'} />
    </svg>
  )
}

function IntroGate() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    try { return !window.sessionStorage.getItem('evidence-intro') }
    catch { return true }
  })

  useEffect(() => {
    if (!visible) return undefined
    const duration = reduce ? 120 : 1550
    const timer = window.setTimeout(() => {
      setVisible(false)
      try { window.sessionStorage.setItem('evidence-intro', 'seen') } catch { /* no-op */ }
    }, duration)
    return () => window.clearTimeout(timer)
  }, [reduce, visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-gate"
          initial={{ opacity: 1 }}
          exit={{ y: '-102%', transition: { duration: reduce ? 0.01 : 0.8, ease } }}
          aria-hidden="true"
        >
          <div className="intro-mark">R / RG</div>
          <div className="intro-sequence">
            {['SOURCE RECEIVED', 'LOGIC AUDITED', 'DECISION READY'].map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 1, 0.35] }}
                transition={{ duration: reduce ? 0 : 0.5, delay: index * 0.28 }}
              >
                <span>0{index + 1}</span>{label}
              </motion.div>
            ))}
          </div>
          <motion.div className="intro-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduce ? 0 : 1.25, ease }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Navigation() {
  return (
    <header className="site-nav">
      <a className="site-mark" href="#top" aria-label="Raveesh Raj Grandhi, back to top">
        <span>R</span><i /> <span>RG</span>
      </a>
      <nav aria-label="Portfolio sections">
        <a href="#exhibits">Exhibits</a>
        <a href="#archive">Index</a>
        <a href="#practice">Practice</a>
        <a href="#profile">Profile</a>
      </nav>
      <a className="nav-contact" href="#contact">Discuss a role <Arrow /></a>
    </header>
  )
}

function Hero() {
  return (
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-rail" aria-hidden="true">
          <span>RAVEESH RAJ GRANDHI</span>
          <span>CLINICAL ANALYTICS / DATA SYSTEMS</span>
          <span>EDITION 2026</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow"><span>Evidence room</span> Selected systems and the proof behind them</p>
          <h1 id="hero-title">
            The work is not
            <span>the dashboard.</span>
          </h1>
          <div className="hero-thesis">
            <p>The work is making every decision traceable back to a source, a definition, a test, and an honest limitation.</p>
            <div className="hero-byline">
              <span>Built by</span>
              <strong>Raveesh Raj Grandhi</strong>
              <small>Clinical Business Analyst + Analytics Engineer</small>
            </div>
          </div>
        </div>
        <div className="hero-field"><EvidenceField /></div>
        <div className="hero-ledger" aria-label="Portfolio proof points">
          <div><b>20</b><span>public systems</span></div>
          <div><b>190+</b><span>tests and checks</span></div>
          <div><b>01</b><span>rule: prove the claim</span></div>
          <a href="#exhibits"><span>Enter the evidence</span><Arrow /></a>
        </div>
      </section>
  )
}

function Thesis() {
  return (
    <section className="thesis" aria-labelledby="thesis-title">
      <div className="thesis-label">OPERATING THESIS / 00</div>
      <div className="thesis-copy">
        <h2 id="thesis-title">I build analytical systems that can survive one uncomfortable question:</h2>
        <blockquote>“How do you know?”</blockquote>
      </div>
      <div className="thesis-notes">
        <p>That question changes the architecture. It asks for reproducible data, precise definitions, visible assumptions, measured baselines, and interfaces that do not overstate certainty.</p>
        <p>The result is work that moves from SQL and data modeling through AI, statistical reasoning, BI, and stakeholder-ready decisions without losing the evidence in between.</p>
      </div>
    </section>
  )
}

function Exhibit({ exhibit, index }) {
  return (
    <article className={`exhibit exhibit-${exhibit.id}`} id={index === 0 ? 'exhibits' : undefined}>
      <div className="exhibit-index" aria-hidden="true">
        <span>{exhibit.number}</span>
        <i />
        <small>06</small>
      </div>
      <div className="exhibit-heading">
        <div className="exhibit-code"><span>{exhibit.code}</span><span>{exhibit.discipline}</span></div>
        <motion.h2
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8, ease }}
        >
          {exhibit.title}
        </motion.h2>
        <p>{exhibit.statement}</p>
      </div>

      <div className="exhibit-artifact">
        <ProjectArtifact id={exhibit.id} />
      </div>

      <div className="exhibit-proof">
        <span className="proof-label">Measured signal</span>
        <strong>{exhibit.proof}</strong>
        <p>{exhibit.proofLabel}</p>
      </div>

      <div className="exhibit-evidence">
        {exhibit.evidence.map((item, itemIndex) => (
          <div key={item}><span>0{itemIndex + 1}</span><p>{item}</p></div>
        ))}
      </div>

      <div className="system-chain" aria-label="System stages">
        {exhibit.system.map((item, itemIndex) => (
          <div key={item}>
            <span>{String(itemIndex + 1).padStart(2, '0')}</span>
            <b>{item}</b>
            {itemIndex < exhibit.system.length - 1 && <Arrow />}
          </div>
        ))}
      </div>

      <div className="exhibit-note">
        <p>{exhibit.note}</p>
        <div className="tool-line">{exhibit.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
        <a href={repoUrl(exhibit.repo)} target="_blank" rel="noreferrer">
          Inspect the repository <Arrow diagonal />
        </a>
      </div>
    </article>
  )
}

function ExhibitCollection() {
  return (
    <section className="exhibit-collection" aria-label="Selected project case studies">
      <div className="collection-intro">
        <p>SELECTED EVIDENCE / 01 / 06</p>
        <h2>Six systems. Six decisions. No ornamental case studies.</h2>
        <span>Each result below is tied to a seeded run, evaluation harness, data contract, or test suite in the linked repository.</span>
      </div>
      {exhibits.map((exhibit, index) => <Exhibit exhibit={exhibit} index={index} key={exhibit.id} />)}
    </section>
  )
}

function Archive() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Healthcare', 'AI', 'Decision science', 'Data engineering', 'BI', 'Risk', 'Product']
  const items = useMemo(() => filter === 'All' ? archive : archive.filter(item => item[2] === filter), [filter])

  return (
    <section className="archive" id="archive" aria-labelledby="archive-title">
      <div className="archive-head">
        <div>
          <p>FULL PUBLIC INDEX / 20 SYSTEMS</p>
          <h2 id="archive-title">The repository names now say what the work actually does.</h2>
        </div>
        <span>Filter by field, then open the proof.</span>
      </div>
      <div className="archive-filters" role="group" aria-label="Filter projects by field">
        {filters.map(item => (
          <button key={item} className={filter === item ? 'is-active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>
            {item}
          </button>
        ))}
      </div>
      <div className="archive-table" aria-live="polite">
        <div className="archive-columns" aria-hidden="true"><span>No.</span><span>System</span><span>Field</span><span>Proof marker</span><span>Open</span></div>
        {items.map(item => (
          <a href={repoUrl(item[4])} target="_blank" rel="noreferrer" className="archive-row" key={item[4]}>
            <span>{item[0]}</span>
            <strong>{item[1]}</strong>
            <span>{item[2]}</span>
            <span>{item[3]}</span>
            <Arrow diagonal />
          </a>
        ))}
      </div>
      <a className="archive-all" href={`${links.github}?tab=repositories`} target="_blank" rel="noreferrer">Browse the complete GitHub archive <Arrow /></a>
    </section>
  )
}

function Practice() {
  return (
    <section className="practice" id="practice" aria-labelledby="practice-title">
      <div className="practice-intro">
        <p>PRACTICE / HOW THE WORK HOLDS UP</p>
        <h2 id="practice-title">A repeatable way to move from a messy question to a trusted decision.</h2>
      </div>
      <div className="practice-steps">
        {method.map((item, index) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease }}
          >
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </motion.div>
        ))}
      </div>
      <div className="practice-spectrum">
        <span>Clinical operations</span><i />
        <span>Analytics engineering</span><i />
        <span>Decision science</span><i />
        <span>Applied AI</span><i />
        <span>Executive communication</span>
      </div>
    </section>
  )
}

function Profile() {
  return (
    <section className="profile" id="profile" aria-labelledby="profile-title">
      <div className="profile-portrait">
        <img src="./profile.jpg" alt="Raveesh Raj Grandhi" />
        <span>IDENTITY RECORD / RRG</span>
      </div>
      <div className="profile-copy">
        <p>PROFILE / THE PERSON BEHIND THE SYSTEMS</p>
        <h2 id="profile-title">Clinical context. Engineering discipline. Executive clarity.</h2>
        <div className="profile-body">
          <p>I am a Clinical Business Analyst II at NYC Health + Hospitals and a health informatics graduate. My background began in clinical care and expanded into the data systems behind operational, financial, and clinical decisions.</p>
          <p>I work across SQL, Python, Snowflake, Tableau, Power BI, Epic data, automation, and applied AI. The tools change. The obligation to make the result reproducible does not.</p>
        </div>
        <div className="profile-records">
          <div><span>Current field</span><b>Clinical business analytics</b><small>NYC Health + Hospitals</small></div>
          <div><span>Education</span><b>M.S. Health Informatics</b><small>University of Wisconsin, Milwaukee</small></div>
          <div><span>Recognition</span><b>NMDSI Student Scholar</b><small>Best NMDSI Poster Award</small></div>
        </div>
        <div className="profile-links">
          <a href={links.resume} download>Read the resume <Arrow /></a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [formState, setFormState] = useState({ status: 'idle', message: '' })

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.currentTarget
    setFormState({ status: 'sending', message: 'Sending your brief securely…' })

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        form.reset()
        setFormState({
          status: 'success',
          message: 'Brief received. Raveesh will reply using the email you provided.',
        })
        return
      }

      let payload = null
      try { payload = await response.json() } catch { /* Formspree may return a non-JSON error */ }
      const message = payload?.errors?.map(error => error.message).filter(Boolean).join(' ')
      setFormState({
        status: 'error',
        message: message || 'The brief could not be sent. Please retry or use LinkedIn below.',
      })
    } catch {
      setFormState({
        status: 'error',
        message: 'The network interrupted the submission. Please retry or use LinkedIn below.',
      })
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-index">END / BEGIN</div>
      <div className="contact-lead">
        <p>THE NEXT QUESTION / YOURS</p>
        <h2 id="contact-title">Bring me the difficult question.</h2>
        <div className="contact-context">
          <p>Recruiters and hiring teams can send the role, the problem space, and what success needs to look like.</p>
          <span>Best aligned with clinical analytics, business intelligence, analytics engineering, decision science, and applied AI.</span>
        </div>
      </div>

      <div className="contact-form-shell">
        <div className="contact-form-head">
          <span>OUTREACH BRIEF / 01</span>
          <span className="contact-status-dot">Accepting conversations</span>
        </div>

        {formState.status === 'success' ? (
          <div className="contact-success" role="status">
            <span>TRANSMISSION COMPLETE</span>
            <strong>Thank you.</strong>
            <p>{formState.message}</p>
            <button type="button" onClick={() => setFormState({ status: 'idle', message: '' })}>
              Send another brief <Arrow />
            </button>
          </div>
        ) : (
          <form action="https://formspree.io/f/mlgqdlnd" method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" defaultValue="Portfolio inquiry for Raveesh Raj Grandhi" />
            <input className="contact-trap" type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" />

            <div className="contact-field-grid">
              <label>
                <span><i>01</i> Name</span>
                <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
              </label>
              <label>
                <span><i>02</i> Work email</span>
                <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
              </label>
            </div>

            <div className="contact-field-grid">
              <label>
                <span><i>03</i> Organization</span>
                <input name="organization" type="text" autoComplete="organization" placeholder="Company or team" />
              </label>
              <label>
                <span><i>04</i> Reason</span>
                <select name="reason" defaultValue="" required>
                  <option value="" disabled>Select one</option>
                  <option>Recruiting conversation</option>
                  <option>Hiring manager introduction</option>
                  <option>Analytics collaboration</option>
                  <option>Speaking or research</option>
                  <option>Other</option>
                </select>
              </label>
            </div>

            <label className="contact-message">
              <span><i>05</i> The brief</span>
              <textarea name="message" rows="5" minLength="20" maxLength="2000" placeholder="Role, problem space, and what you need this person to change…" required />
            </label>

            <div className="contact-submit-row">
              <p>Sent securely through Formspree. No account required.</p>
              <button type="submit" disabled={formState.status === 'sending'}>
                <span>{formState.status === 'sending' ? 'Sending brief…' : 'Send the brief'}</span><Arrow diagonal />
              </button>
            </div>

            {formState.message && (
              <p className={`contact-form-message is-${formState.status}`} role={formState.status === 'error' ? 'alert' : 'status'} aria-live="polite">
                {formState.message}
              </p>
            )}
          </form>
        )}

        <div className="contact-form-foot">
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
          <span>Healthcare / Data / Decisions</span>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  useEffect(() => {
    document.title = 'Raveesh Raj Grandhi | Evidence-Driven Analytics Systems'
  }, [])

  return (
    <>
      <IntroGate />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <a className="skip-link" href="#exhibits">Skip to selected work</a>
      <Navigation />
      <main id="top">
        <Hero />
        <Thesis />
        <ExhibitCollection />
        <Archive />
        <Practice />
        <Profile />
        <Contact />
      </main>
      <footer className="site-footer">
        <span>© 2026 Raveesh Raj Grandhi</span>
        <span>Built around evidence, not effects.</span>
        <a href="#top">Return to top ↑</a>
      </footer>
    </>
  )
}
