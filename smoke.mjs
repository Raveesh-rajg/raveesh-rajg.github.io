// Render the PRODUCTION bundle in jsdom — the "does it crash outside the
// editor" test. Shims only what jsdom lacks.
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const distHtml = fs.readFileSync('dist/index.html', 'utf8')
const jsFile = fs.readdirSync('dist/assets').find(f => f.endsWith('.js'))
const bundle = fs.readFileSync(path.join('dist/assets', jsFile), 'utf8')

const dom = new JSDOM(distHtml.replace(/<script[^>]*><\/script>/, ''), {
  url: 'https://raveesh-rajg.github.io/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
})
const { window } = dom
window.matchMedia = q => ({ matches: false, media: q, addEventListener(){}, removeEventListener(){}, addListener(){}, removeListener(){} })
window.IntersectionObserver = class { constructor(cb){this.cb=cb} observe(el){ this.cb([{isIntersecting:true,target:el}], this) } unobserve(){} disconnect(){} }
window.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} }
window.scrollTo = () => {}

let crashed = null
window.addEventListener('error', e => { crashed = e.error || e.message })
try {
  window.eval(bundle)
} catch (e) { crashed = e }

await new Promise(r => setTimeout(r, 1500))
const root = window.document.getElementById('root')
const text = root ? root.textContent : ''
console.log('crashed:', crashed ? String(crashed).slice(0, 300) : 'no')
console.log('root children:', root ? root.children.length : 'NO ROOT')
console.log('has name:', text.includes('Raveesh Raj'))
console.log('has checklist:', text.includes('Every capability'))
console.log('has 20 projects:', (text.match(/View|Case study/g) || []).length > 0)
// case route
window.location.hash = '#/case/ab-testing-framework'
window.dispatchEvent(new window.Event('hashchange'))
await new Promise(r => setTimeout(r, 800))
const caseText = root.textContent
console.log('case page renders:', caseText.includes('Experimentation Framework') && caseText.includes('Naive daily peeking'))
process.exit(crashed ? 1 : 0)
