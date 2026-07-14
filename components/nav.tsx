'use client'
/* Navbar + MobileMenu + active-section indicator + scroll opacity. */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github } from 'lucide-react'
import { GH } from '@/lib/content'

const LINKS = [
  ['#about', 'About'], ['#expertise', 'Expertise'], ['#projects', 'Projects'],
  ['#process', 'Process'], ['#contact', 'Contact'],
] as const

export function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' })
    LINKS.forEach(([h]) => { const el = document.querySelector(h); if (el) obs.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])

  return (
    <nav className={`fixed left-0 right-0 top-[25px] z-50 border-b border-line backdrop-blur-xl transition-colors ${solid ? 'bg-ink/85' : 'bg-ink/60'}`}
      aria-label="Main">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#" className="focus-ring font-display text-[17px] font-bold">
          raveesh<span className="text-teal">.</span>grandhi
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map(([h, label]) => (
            <a key={h} href={h}
              className={`focus-ring text-sm font-medium transition-colors ${active === h ? 'text-teal' : 'text-muted hover:text-body'}`}>
              {label}
            </a>
          ))}
          <a href={GH} target="_blank" rel="noopener" aria-label="GitHub profile"
            className="focus-ring text-muted hover:text-body"><Github size={18} /></a>
          <a href="/resume.pdf" download
            className="focus-ring rounded-full bg-gradient-to-br from-teal to-sky-400 px-5 py-2 text-sm font-semibold text-[#04252b]">
            Résumé
          </a>
        </div>
        <button className="focus-ring md:hidden" aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open} onClick={() => setOpen(o => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="border-t border-line bg-ink/95 px-6 py-4 md:hidden"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {LINKS.map(([h, label]) => (
              <a key={h} href={h} onClick={() => setOpen(false)}
                className="focus-ring block py-3 text-[15px] text-muted">{label}</a>
            ))}
            <a href="/resume.pdf" download className="focus-ring block py-3 text-[15px] text-teal">Download résumé</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
