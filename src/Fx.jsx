/* Futuristic effects layer — particle constellation, custom cursor, boot
   sequence, magnetic buttons. All vanilla rAF inside effects (no library
   needed), all gated on prefers-reduced-motion and pointer capability,
   and the canvas self-heals if the page loads in a hidden/0-size tab. */

import { useEffect, useRef, useState } from 'react'

const reduced = () =>
  typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = () =>
  typeof window !== 'undefined' && matchMedia('(pointer: fine)').matches

/* ---------- interactive particle constellation ---------- */
export function ParticleField() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced()) return
    const cv = ref.current
    const ctx = cv.getContext('2d')
    if (!ctx) return
    // DPR capped at 1.5 and a smaller particle count: the O(N²) link pass
    // is the main per-frame cost, and it must never starve the cursor rAF.
    const DPR = Math.min(devicePixelRatio || 1, 1.5)
    let W = 0, H = 0, N = 0, pts = [], mx = -9999, my = -9999, t = 0
    let rafId = null, running = !document.hidden

    const resize = () => {
      W = innerWidth; H = innerHeight
      cv.width = W * DPR; cv.height = H * DPR
      cv.style.width = W + 'px'; cv.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      N = W < 760 ? 36 : 72
      pts = Array.from({ length: N }, () => ({
        x: Math.random() * W, y: Math.random() * H, z: 0.3 + Math.random() * 0.7,
        vx: (Math.random() - 0.5) * 0.24, vy: (Math.random() - 0.5) * 0.24,
        hue: Math.random(),
      }))
    }
    const color = (h, a) =>
      h < 0.55 ? `rgba(94,234,212,${a})` : h < 0.82 ? `rgba(129,140,248,${a})` : `rgba(232,121,249,${a})`

    const loop = () => {
      if (!running) { rafId = null; return }
      if (W !== innerWidth || H !== innerHeight) resize()
      t += 0.003
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < N; i++) {
        const p = pts[i]
        p.x += p.vx * p.z + Math.sin(t + i) * 0.06
        p.y += p.vy * p.z + Math.cos(t * 1.3 + i) * 0.06
        const dx = p.x - mx, dy = p.y - my
        let d = dx * dx + dy * dy
        if (d < 22500 && d > 1) { d = Math.sqrt(d); p.x += dx / d * 0.6; p.y += dy / d * 0.6 }
        if (p.x < -30) p.x = W + 30; if (p.x > W + 30) p.x = -30
        if (p.y < -30) p.y = H + 30; if (p.y > H + 30) p.y = -30
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.1 * p.z + 0.3, 0, 6.2832)
        ctx.fillStyle = color(p.hue, 0.28 + p.z * 0.3)
        ctx.fill()
      }
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const p = pts[i], q = pts[j]
        const dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy
        if (d < 13000) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
          ctx.strokeStyle = color(p.hue, (1 - d / 13000) * 0.11)
          ctx.stroke()
        }
      }
      rafId = requestAnimationFrame(loop)
    }

    const onMove = e => { mx = e.clientX; my = e.clientY }
    const onVis = () => {
      running = !document.hidden
      if (running) { if (rafId !== null) cancelAnimationFrame(rafId); loop() }
    }
    resize()
    addEventListener('resize', resize)
    addEventListener('pointermove', onMove)
    document.addEventListener('visibilitychange', onVis)
    loop()
    return () => {
      running = false
      if (rafId !== null) cancelAnimationFrame(rafId)
      removeEventListener('resize', resize)
      removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])
  return <canvas ref={ref} className="field" aria-hidden="true" />
}

/* ---------- custom cursor: dot + trailing ring ---------- */
export function Cursor() {
  const dotRef = useRef(null), ringRef = useRef(null)
  useEffect(() => {
    if (reduced() || !finePointer()) return
    let cx = -100, cy = -100, rx = -100, ry = -100, rafId = null
    const onMove = e => {
      cx = e.clientX; cy = e.clientY
      // move the dot on the input event itself so it never trails the OS pointer
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${cx - 3}px,${cy - 3}px,0)`
    }
    const loop = () => {
      rx += (cx - rx) * 0.38; ry += (cy - ry) * 0.38
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 17}px,${ry - 17}px,0)`
      rafId = requestAnimationFrame(loop)
    }
    const over = e => {
      if (e.target.closest('a,button,input,textarea,.card')) document.body.classList.add('cur-hover')
    }
    const out = e => {
      if (e.target.closest('a,button,input,textarea,.card')) document.body.classList.remove('cur-hover')
    }
    addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    loop()
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
    }
  }, [])
  if (typeof window !== 'undefined' && (!finePointer() || reduced())) return null
  return (<>
    <div ref={dotRef} className="cur-dot" aria-hidden="true" />
    <div ref={ringRef} className="cur-ring" aria-hidden="true" />
  </>)
}

/* ---------- sub-second boot sequence (plays once per visit) ---------- */
let bootedOnce = false
export function Boot() {
  const [done, setDone] = useState(() => reduced() || bootedOnce)
  useEffect(() => {
    if (done) { bootedOnce = true; return }
    const t = setTimeout(() => setDone(true), 950)
    const kill = () => setDone(true)
    window.addEventListener('keydown', kill, { once: true })
    return () => { clearTimeout(t); window.removeEventListener('keydown', kill) }
  }, [done])
  return (
    <div className={`boot${done ? ' done' : ''}`} aria-hidden="true">
      <div className="boot-mark">R:\&gt;</div>
      <div className="boot-bar"><i /></div>
      <div className="boot-label">initializing analytics engine</div>
    </div>
  )
}

/* ---------- magnetic pull for primary CTAs ---------- */
export function Magnetic({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced() || !finePointer()) return
    const el = ref.current
    if (!el) return
    const onMove = e => {
      const r = el.getBoundingClientRect()
      el.style.transform =
        `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`
    }
    const onLeave = () => { el.style.transform = '' }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])
  return <span ref={ref} className="mag">{children}</span>
}
