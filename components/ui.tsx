'use client'
/* Shared primitives: Section, SectionHeading, GlassPanel, AnimatedButton,
   ScrollProgress, Reveal. One file — they're small and always used together. */

import { motion, useScroll, useSpring } from 'framer-motion'
import { type ReactNode } from 'react'

export const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } },
}
export const stagger = { show: { transition: { staggerChildren: 0.07 } } }

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={rise} initial="hidden"
      whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  )
}

export function SectionHeading({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
      <motion.p className="kicker mb-4" variants={rise}>{kicker}</motion.p>
      <motion.h2 variants={rise}
        className="font-display font-semibold tracking-tight leading-[1.12] mb-4 text-[clamp(30px,4.4vw,46px)]">
        {title}
      </motion.h2>
      {sub && <motion.p variants={rise} className="text-muted max-w-2xl mb-12">{sub}</motion.p>}
    </motion.div>
  )
}

export function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

export function GlassPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass p-7 ${className}`}>{children}</div>
}

export function AnimatedButton({ href, children, primary = false, download = false }:
  { href: string; children: ReactNode; primary?: boolean; download?: boolean }) {
  const ext = href.startsWith('http')
  return (
    <motion.a href={href} download={download || undefined}
      target={ext ? '_blank' : undefined} rel={ext ? 'noopener' : undefined}
      whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
      className={`focus-ring inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold ${
        primary
          ? 'bg-gradient-to-br from-teal to-sky-400 text-[#04252b] shadow-[0_0_24px_rgba(94,234,212,.25)]'
          : 'border border-line bg-white/5 text-body'
      }`}>
      {children}
    </motion.a>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })
  return (
    <motion.div aria-hidden style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-teal via-sky-400 to-violet" />
  )
}
