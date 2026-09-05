
// Exercise the actual production bundle. Contact requests are mocked: no messages are sent.
import { JSDOM } from 'jsdom'
import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
const html = fs.readFileSync('dist/index.html', 'utf8')
const scriptPath = html.match(/src="\.\/([^\"]+\.js)"/)[1]
const bundle = fs.readFileSync(path.join('dist', scriptPath), 'utf8')
let checks = 0
function check(name, condition) { assert.ok(condition, name); checks++; console.log(`PASS ${name}`) }
for (const reduced of [false, true]) {
 const dom = new JSDOM(html.replace(/<script[^>]*><\/script>/g,''), {url:'https://raveesh-rajg.github.io/',runScripts:'outside-only',pretendToBeVisual:true})
 const {window:w} = dom
 w.matchMedia = q => ({matches:reduced && q.includes('reduced-motion'),media:q,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}})
 w.IntersectionObserver = class { constructor(cb){this.cb=cb} observe(target){this.cb([{isIntersecting:true,target}],this)} unobserve(){} disconnect(){} }
 w.ResizeObserver = class {observe(){} unobserve(){} disconnect(){}}
 w.scrollTo = () => {}
 const errors=[]; w.addEventListener('error',e=>errors.push(e.error || e.message))
 w.eval(bundle)
 const settle = () => new Promise(r=>setTimeout(r,60))
 await settle()
 const d=w.document; const root=d.getElementById('root');const all=s=>[...root.querySelectorAll(s)]
 check(`renders without runtime errors (reduced motion ${reduced})`,root.children.length>0 && errors.length===0)
 check('identity and hero',root.textContent.includes('Raveesh Raj Grandhi') && d.querySelector('h1').textContent.includes('Making datamean more.'))
 check('six featured repositories and evidence disclosures',all('.project-visual-link').length===6 && all('.evidence-link').length===6 && all('details').length===6)
 check('all twenty projects present',all('.archive-row').length===20)
 check('five role lenses',all('.role-lens-tabs button').length===5)
 check('profile and professional impact',d.querySelector('.profile-portrait img').alt==='Raveesh Raj Grandhi' && all('.profile-impact > div').length===4)
 check('all internal links resolve',all('a[href^="#"]').every(a=>d.getElementById(a.hash.slice(1))))
 check('resume and social preview retained',fs.existsSync('dist/resume.pdf') && fs.existsSync('dist/og-card.png'))
 check('hero visual is optimized',fs.statSync('dist/signal.webp').size<400000)
 check('five visible contact labels',all('.contact-form-shell label').length===5)
 check('Formspree and direct email retained',d.querySelector('form').action==='https://formspree.io/f/mlgqdlnd' && d.querySelector('form').method==='post' && d.querySelector('.contact-form-foot a').href==='mailto:raveeshraj26@gmail.com')
 const menu=d.querySelector('.menu-toggle');menu.click();await settle();check('mobile menu opens',menu.getAttribute('aria-expanded')==='true');w.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));await settle();check('Escape closes menu',menu.getAttribute('aria-expanded')==='false')
 all('.role-lens-tabs button')[3].click();await settle();check('healthcare role selects relevant repositories',d.querySelector('.role-panel').textContent.includes('Epic-connected reporting') && all('.role-lens-projects a').some(a=>a.href.endsWith('hospital-price-intelligence')))
 all('.archive-filters button').find(b=>b.textContent==='Healthcare').click();await settle();check('healthcare filter returns exactly two projects',all('.archive-row').length===2)
 all('.archive-filters button').find(b=>b.textContent==='All').click();await settle()
 const search=d.querySelector('input[type=search]');const setValue=Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype,'value').set
 setValue.call(search,'nonexistent-project-xyz');search.dispatchEvent(new w.Event('input',{bubbles:true}));await settle();check('search has an actionable empty state',all('.archive-row').length===0 && Boolean(d.querySelector('.archive-empty button')))
 d.querySelector('.archive-empty button').click();await settle();check('clear filters restores archive',all('.archive-row').length===20)
 setValue.call(search,'Hospital Rate');search.dispatchEvent(new w.Event('input',{bubbles:true}));await settle();check('search finds the matching project',all('.archive-row').length===1 && all('.archive-row')[0].textContent.includes('Hospital Rate'))
 const form=d.querySelector('form');let sent=null
 w.fetch=async(url,options)=>{sent={url,options};return {ok:false,json:async()=>({errors:[{message:'Please try again.'}]})}}
 form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await settle();check('contact failure is recoverable',Boolean(d.querySelector('[role=alert]')) && !d.querySelector('button[type=submit]').disabled)
 check('contact includes expected subject',sent.options.body.get('_subject')==='Portfolio inquiry for Raveesh Raj Grandhi')
 w.fetch=async()=>({ok:true});form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await settle();check('successful contact displays confirmation',Boolean(d.querySelector('.contact-success[role=status]')))
 d.querySelector('.contact-success button').click();await settle();check('contact form can be reused',Boolean(d.querySelector('form')))
 check('no interaction errors',errors.length===0)
 dom.window.close()
}
console.log(`${checks} checks passed. No external form submissions were made.`)
