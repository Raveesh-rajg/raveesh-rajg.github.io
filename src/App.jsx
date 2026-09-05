
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { archive, exhibits, links, method, roleLenses } from './content.js'
const ease = [0.22, 1, 0.36, 1]
const repoUrl = name => `${links.github}/${name}`
function Arrow({ diagonal = false }) { return <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-7-7 7 7-7 7'} stroke="currentColor" strokeWidth="1.5" /></svg> }
function Reveal({ children, className = '' }) { const reduce = useReducedMotion(); return <motion.div className={className} initial={{ opacity: 0, y: reduce ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7, ease }}>{children}</motion.div> }
function Navigation() {
  const [open, setOpen] = useState(false)
  useEffect(() => { const close = e => { if(e.key === 'Escape') setOpen(false) }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [])
  return <header className="site-nav"><a className="brand" href="#top" aria-label="Raveesh Raj Grandhi, home">rrg<span>↗</span></a><span className="nav-caption">ANALYTICS & INTELLIGENCE</span><button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button><nav id="navigation" className={open ? 'is-open' : ''} aria-label="Portfolio sections">{[['Work','exhibits'],['Expertise','roles'],['About','profile']].map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setOpen(false)}>{label}</a>)}<a href="#contact" className="nav-contact" onClick={()=>setOpen(false)}>Let’s talk <Arrow diagonal /></a></nav></header>
}
function Hero() {
  const ref = useRef(null); const reduce = useReducedMotion()
  function move(e) { if(reduce || e.pointerType === 'touch') return; const r=e.currentTarget.getBoundingClientRect(); ref.current?.style.setProperty('--mx', `${(e.clientX-r.left-r.width/2)*.018}px`); ref.current?.style.setProperty('--my', `${(e.clientY-r.top-r.height/2)*.018}px`) }
  return <section className="hero" aria-labelledby="hero-title" onPointerMove={move} onPointerLeave={()=>{ref.current?.style.setProperty('--mx','0px');ref.current?.style.setProperty('--my','0px')}}>
    <div className="hero-topline"><span><i className="status-dot" /> NEW YORK · HEALTHCARE & DATA</span><span>PORTFOLIO / 2026</span></div>
    <div className="hero-art" ref={ref} aria-hidden="true"><img src="./signal.webp" alt="" fetchPriority="high" width="1536" height="1024" /></div>
    <div className="hero-copy"><motion.p className="eyebrow" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8}}>RAVEESH RAJ GRANDHI</motion.p><motion.h1 id="hero-title" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:1,ease}}>Making data<br/>mean <em>more.</em></motion.h1><motion.div className="hero-description" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.15,ease}}><p>I turn complex data into clear decisions.<br/>Clinical context. Engineering rigor. Human impact.</p><a className="pill primary" href="#exhibits">Explore selected work <Arrow diagonal /></a><a className="text-link" href={links.resume} target="_blank" rel="noreferrer">View résumé <Arrow diagonal /></a></motion.div></div>
    <div className="hero-bottom"><div><span className="small-label">CURRENTLY</span><p>Clinical Business Analyst II<br/><strong>NYC Health + Hospitals</strong></p></div><div className="hero-art-label"><span className="crosshair">+</span><span>COMPLEXITY → CLARITY<br/>THE THREAD THROUGH MY WORK</span></div><a className="scroll-cue" href="#exhibits"><span>SCROLL TO EXPLORE</span><span>↓</span></a></div>
  </section>
}
function SectionHeading({number, label, title, italic, children}) { return <div className="section-heading"><div><p className="eyebrow"><span>{number} /</span> {label}</p><h2>{title} <em>{italic}</em></h2></div>{children && <p className="section-aside">{children}</p>}</div> }
function ProjectVisual({item}) {
  return <div className={`project-visual visual-${item.id}`} aria-label={`${item.title}: ${item.proof}, ${item.proofLabel}`}>
    <div className="visual-top"><span>{item.code}</span><span className="visual-dot">●</span></div>
    {item.id==='rates' ? <><div className="visual-metric"><span>CHARGE MAPPING COVERAGE</span><strong>93.75<span>%</span></strong><small>Against a gold crosswalk</small></div><div className="coverage-track"><i/></div><div className="visual-bottom"><span>7 / 7 defects quarantined</span><span>2.64× Medicare median</span></div></>
    : item.id==='experiment' ? <><div className="comparison-title">Confidence needs<br/><em>a control.</em></div><div className="comparison-row"><span>Naive peeking</span><i style={{'--bar':'96%'}}/><b>24.0%</b></div><div className="comparison-row valid"><span>Always-valid</span><i style={{'--bar':'4.8%'}}/><b>1.2%</b></div><div className="visual-bottom"><span>FALSE-POSITIVE RATE</span><span>500 A/A simulations</span></div></>
    : item.id==='claims' ? <><div className="reconcile"><span>2,889<small>SOURCE CLAIMS</small></span><b>→</b><div><span>2,791<small>VALIDATED</small></span><span className="quarantine">98<small>QUARANTINED</small></span></div></div><div className="visual-bottom"><span>Every row accounted for</span><span>12 tests</span></div></>
    : item.id==='assistant' ? <><div className="routing"><span className="query-node">One question.</span><span className="routing-arrow">↓</span><div><span><small>DEFINITIONS</small>Cited retrieval</span><span><small>QUANTITATIVE</small>Guarded SQL</span></div></div><div className="visual-bottom"><span>14 / 14 routed correctly</span><span>Read-only by design</span></div></>
    : item.id==='ops' ? <><div className="visual-metric"><span>ANALYTICS AGENT TELEMETRY</span><strong>27,683</strong><small>Traced calls</small></div><div className="ops-summary"><span><b>+6.5pp</b> Quality gain</span><span><b>1.35×</b> Cost increase</span></div><div className="visual-bottom"><span>Prompt rollout comparison</span><span>9 tests</span></div></>
    : <><div className="comparison-title">Activation makes<br/><em>the difference.</em></div><div className="comparison-row valid"><span>Activated</span><i style={{'--bar':'90.6%'}}/><b>45.3%</b></div><div className="comparison-row"><span>Not activated</span><i style={{'--bar':'36.4%'}}/><b>18.2%</b></div><div className="visual-bottom"><span>WEEK-FOUR RETENTION</span><span>Correlation ≠ causation</span></div></>}
  </div>
}
function SelectedWork() { return <section className="selected-work section" id="exhibits"><SectionHeading number="01" label="SELECTED WORK" title="Complex questions." italic="Clear outcomes.">Six projects at the intersection of healthcare, engineering, and decision science.</SectionHeading><div className="projects-grid">{exhibits.map((item,i)=><Reveal key={item.id} className={`project-card card-${item.id}`}><a className="project-visual-link" href={repoUrl(item.repo)} target="_blank" rel="noreferrer" aria-label={`Open ${item.title} repository`}><ProjectVisual item={item}/><span className="project-open"><Arrow diagonal/></span></a><div className="project-meta"><span>{item.discipline}</span><span>0{i+1}</span></div><h3><a href={repoUrl(item.repo)} target="_blank" rel="noreferrer">{item.title}</a></h3><p className="project-description">{item.statement}</p><div className="tool-line">{item.tools.map(tool=><span key={tool}>{tool}</span>)}</div><details className="case-details"><summary>Behind the result <span>+</span></summary><div className="case-body"><p>{item.note}</p><ul>{item.evidence.map(e=><li key={e}>{e}</li>)}</ul><div className="system-chain">{item.system.map((s,i)=><span key={s}><small>0{i+1}</small>{s}</span>)}</div><p className="evidence-context">Results from the public project’s seeded data or offline evaluation; not production business outcomes.</p><a className="evidence-link" href={repoUrl(item.repo)} target="_blank" rel="noreferrer">Explore the code & evidence <Arrow diagonal/></a></div></details></Reveal>)}</div><div className="work-footer"><span>There’s more behind the work.</span><a href="#archive">Explore all 20 projects <Arrow/></a></div></section> }
function RoleLens(){const [activeId,setActiveId]=useState(roleLenses[0].id);const active=roleLenses.find(r=>r.id===activeId);return <section id="roles" className="expertise section"><SectionHeading number="02" label="EXPERTISE" title="Different lenses." italic="One standard.">The right evidence for the decision at hand.</SectionHeading><div className="expertise-layout"><div className="role-lens-tabs" role="group" aria-label="Choose a professional focus">{roleLenses.map((role,i)=><button key={role.id} aria-pressed={activeId===role.id} onClick={()=>setActiveId(role.id)}><span>0{i+1}</span>{role.label}<Arrow diagonal/></button>)}</div><div className="role-panel" aria-live="polite"><p className="eyebrow">{active.label.toUpperCase()}</p><h3>{active.statement}</h3><div className="role-signals">{active.signals.map(s=><span key={s}>{s}</span>)}</div><p className="small-label">A FEW PLACES TO START</p><div className="role-lens-projects">{active.projects.map(([name,repo])=><a key={repo} href={repoUrl(repo)} target="_blank" rel="noreferrer">{name}<Arrow diagonal/></a>)}</div></div></div></section>}
function Archive(){const[filter,setFilter]=useState('All');const[query,setQuery]=useState('');const filters=['All',...new Set(archive.map(item=>item[2]))];const items=archive.filter(item=>(filter==='All'||item[2]===filter)&&`${item[1]} ${item[2]} ${item[4]}`.toLowerCase().includes(query.toLowerCase()));return <section className="archive section" id="archive"><SectionHeading number="03" label="THE COMPLETE COLLECTION" title="Built to be" italic="explored."><span>20 public projects.<br/>Source code, methods, and reproducible results.</span></SectionHeading><div className="archive-controls"><div className="archive-filters" role="group" aria-label="Filter projects by field">{filters.map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div><label className="search-label"><span className="sr-only">Search projects</span><input type="search" placeholder="Search projects…" value={query} onChange={e=>setQuery(e.target.value)}/><span aria-hidden="true">⌕</span></label></div><div className="archive-table" aria-live="polite"><div className="archive-columns"><span>NO.</span><span>PROJECT</span><span>DISCIPLINE</span><span>EVIDENCE</span><span/></div>{items.map(item=><a className="archive-row" key={item[4]} href={repoUrl(item[4])} target="_blank" rel="noreferrer"><span>{item[0]}</span><strong>{item[1]}</strong><span>{item[2]}</span><span>{item[3]}</span><Arrow diagonal/></a>)}{items.length===0&&<div className="archive-empty"><p>No projects match this search.</p><button className="pill" onClick={()=>{setQuery('');setFilter('All')}}>Clear filters <Arrow/></button></div>}</div><div className="archive-end"><span>{items.length} / 20 projects</span><a href={`${links.github}?tab=repositories`} target="_blank" rel="noreferrer">All repositories <Arrow diagonal/></a></div></section>}
function Practice(){return <section className="practice section" id="practice"><Reveal><p className="eyebrow">04 / THE WAY I WORK</p><h2>Good analysis answers a question.<br/><span>Great analysis can answer</span><br/><em>“How do you know?”</em></h2></Reveal><div className="practice-steps">{method.map(item=><Reveal key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div></section>}
function Profile(){return <section className="profile section" id="profile"><div className="profile-portrait"><img src="./profile.jpg" alt="Raveesh Raj Grandhi" width="800" height="1000" loading="lazy" decoding="async"/><span>RAVEESH RAJ GRANDHI / NEW YORK</span></div><div className="profile-copy"><p className="eyebrow">05 / A LITTLE ABOUT ME</p><h2>Clinical by context.<br/>Analytical <em>by nature.</em></h2><p>I’m Raveesh, a Clinical Business Analyst II at NYC Health + Hospitals and a health informatics graduate. I started in clinical care. Today, I build the data systems behind better operational, financial, and clinical decisions.</p><p>That background shapes how I work: understand the people behind the data, ask the uncomfortable question, and make the answer reproducible.</p><div className="profile-records"><div><span>EDUCATION</span><strong>M.S. Health Informatics</strong><small>University of Wisconsin–Milwaukee</small></div><div><span>RECOGNITION</span><strong>NMDSI Student Scholar</strong><small>Best NMDSI Poster Award</small></div></div><div className="profile-impact" aria-label="Selected professional impact"><div><strong>88 → 94%</strong><span>Reporting accuracy</span></div><div><strong>4h → 1h</strong><span>Report preparation</span></div><div><strong>60%</strong><span>Faster dashboard refresh</span></div><div><strong>20+</strong><span>Dashboards in 3 departments</span></div></div><a className="pill" href={links.resume} target="_blank" rel="noreferrer">The full story, on paper <Arrow diagonal/></a></div></section>}
export default function App() {
  const { scrollYProgress } = useScroll(); const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <><motion.div className="scroll-progress" style={{scaleX:progress}}/><a className="skip-link" href="#exhibits">Skip to selected work</a><Navigation/><main id="top"><Hero/><div className="discipline-strip"><span>HEALTHCARE ANALYTICS</span><i>✳</i><span>BUSINESS INTELLIGENCE</span><i>✳</i><span>DATA ENGINEERING</span><i>✳</i><span>APPLIED AI</span></div><SelectedWork/><RoleLens/><Archive/><Practice/><Profile/><Contact/></main><footer className="site-footer"><a className="brand" href="#top">rrg<span>↗</span></a><span>© {new Date().getFullYear()} Raveesh Raj Grandhi</span><span>Thoughtful systems. Meaningful decisions.</span><a href="#top">Back to top ↑</a></footer></>
}

const CONTACT_SUBJECT = 'Portfolio inquiry for Raveesh Raj Grandhi'

function Contact() {
  const [formState, setFormState] = useState({ status: 'idle', message: '' })

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set('_subject', CONTACT_SUBJECT)
    setFormState({ status: 'sending', message: 'Sending your brief securely…' })

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
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
      <div className="contact-index">06 / GET IN TOUCH</div>
      <div className="contact-lead">
        <p>A GOOD CONVERSATION CHANGES THINGS.</p>
        <h2 id="contact-title">Let’s make it meaningful.</h2>
        <div className="contact-context">
          <p>Recruiters and hiring teams can send the role, the problem space, and what success needs to look like.</p>
          <span>Best aligned with clinical analytics, business intelligence, analytics engineering, decision science, and applied AI.</span>
        </div>
      </div>

      <div className="contact-form-shell">
        <div className="contact-form-head">
          <span>START A CONVERSATION</span>
          <span className="contact-status-dot">Accepting conversations</span>
        </div>

        {formState.status === 'success' ? (
          <div className="contact-success" role="status">
            <span>MESSAGE RECEIVED</span>
            <strong>Thank you.</strong>
            <p>{formState.message}</p>
            <button type="button" onClick={() => setFormState({ status: 'idle', message: '' })}>
              Send another brief <Arrow />
            </button>
          </div>
        ) : (
          <form action="https://formspree.io/f/mlgqdlnd" method="POST" onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="_subject"
              defaultValue={CONTACT_SUBJECT}
              ref={node => {
                if (!node) return
                node.value = CONTACT_SUBJECT
                node.setAttribute('value', CONTACT_SUBJECT)
              }}
            />
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
              <p>Your message goes directly to my inbox.</p>
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
          <a href={links.email}>Email <Arrow diagonal /></a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
          <span>Healthcare / Data / Decisions</span>
        </div>
      </div>
    </section>
  )
}


