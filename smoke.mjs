// Render the production bundle in jsdom and assert the portfolio's core
// content, navigation, archive, and evidence links survive bundling.
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
window.HTMLCanvasElement.prototype.getContext = () => ({
  clearRect(){}, fillRect(){}, setTransform(){}, beginPath(){}, arc(){}, fill(){},
  stroke(){}, moveTo(){}, lineTo(){},
  set fillStyle(v){}, set strokeStyle(v){}, set lineWidth(v){},
})

let crashed = null
window.addEventListener('error', e => { crashed = e.error || e.message })
try {
  window.eval(bundle)
} catch (e) { crashed = e }

await new Promise(r => setTimeout(r, 1800))
const root = window.document.getElementById('root')
const text = root ? root.textContent : ''
const assertions = {
  'root rendered': Boolean(root?.children.length),
  'identity rendered': text.includes('Raveesh Raj Grandhi'),
  'signature thesis rendered': text.includes('How do you know?'),
  'six evidence links rendered': root?.querySelectorAll('.exhibit-note > a').length === 6,
  'twenty archive rows rendered': root?.querySelectorAll('.archive-row').length === 20,
  'profile image has alt text': root?.querySelector('.profile-portrait img')?.getAttribute('alt') === 'Raveesh Raj Grandhi',
  'skip link exists': Boolean(root?.querySelector('.skip-link')),
}

console.log('crashed:', crashed ? String(crashed).slice(0, 300) : 'no')
Object.entries(assertions).forEach(([name, passed]) => console.log(`${name}:`, passed ? 'yes' : 'NO'))
const failed = crashed || Object.values(assertions).some(value => !value)
process.exit(failed ? 1 : 0)
